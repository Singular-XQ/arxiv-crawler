import { parseStringPromise } from 'xml2js';
import axios from 'axios';
import { Model } from 'typed-sails';


class ArxivService {

    _activeSearchs: Record<string, any> = {};
    started: boolean = false;

    async init() {
        let searches = await sails.models.scrapingpointer.find()
        for (let search of searches) {
            await this.startSearch(search.searchTerm)
        }
    }

    get models(): Record<string, Model> {
        return {
            article: sails.models.article,
            articlePointer: sails.models.scrapingpointer
        }
    }

    async startSearch(query: string, maxResults: number = 10): Promise<any> {
        console.log('starting', query, 'search')
        if (!this.started) {
            this.started = true
            await this.init()
        }
        if (this._activeSearchs[query]) {
            return;
        }
        // jump start everything before we hand it off.
        await this.fetchAndSaveArticles(query, maxResults)
        return this._activeSearchs[query] = setInterval(async () => {
            await this.fetchAndSaveArticles(query, maxResults)
        }, 10000);
    }
    async stopSearch(query: string): Promise<any> {
        if (!this._activeSearchs[query]) {
            return;
        }
        clearInterval(this._activeSearchs[query]);
    }
    async fetchAndSaveArticles(query: string, maxResults: number = 10) {
        // Loop through articles and save them to the database
        console.log("locating or creating search pointer for", query)
        const { startIndex } = await this.models.articlePointer.findOrCreate(
            { searchTerm: query },
            { searchTerm: query, startIndex: 0 }
        );
        console.log("pointer for", query, "is", startIndex)
        const articles = await this.fetchArticles(query, maxResults, startIndex);
        console.log("We have articles", articles)
        for (const article of articles) {
            try {
                await sails.models.article.create({
                    arxivId: article.id,
                    title: article.title,
                    summary: article.summary,
                    authors: article.authors,
                    links: article.links,
                    // Set other fields as necessary
                }).fetch();
            } catch (error) {
                console.log("skipping duplicate article")
            }

        }
        await this.models.articlePointer
            .update(
                { searchTerm: query },
                { startIndex: startIndex + articles.length - 1 }
            );
        return {
            articles,
            startIndex
        }
    }
    async fetchArticles(query: string, maxResults: number = 10, startIndex: number = 0): Promise<any> {
        const url = `http://export.arxiv.org/api/query?search_query=${query}&start=${startIndex}&max_results=${maxResults}`;
        try {
            const response = await axios.get(url);
            const result = await parseStringPromise(response.data);
            const articles = result?.feed?.entry?.map((entry: any) => {
                return {
                    id: entry.id[0],
                    title: entry.title[0],
                    summary: entry.summary[0],
                    authors: entry.author.map((author: any) => author.name[0]),
                    links: entry.link.map((link: any) => ({ href: link.$.href, rel: link.$.rel })),
                    // Extract other fields as needed
                };
            }) ?? [];
            return articles;
        } catch (error) {
            console.error('Error fetching articles from arXiv:', error);
            throw error;
        }
    }
}
export default new ArxivService();