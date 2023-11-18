import { parseStringPromise } from 'xml2js';

class ArxivService {
    async fetchArticles(query: string, maxResults: number = 10, startIndex: number = 0): Promise<any> {
        const url = `http://export.arxiv.org/api/query?search_query=${query}&start=${startIndex}&max_results=${maxResults}`;
        try {
            const response = await axios.get(url);
            const result = await parseStringPromise(response.data);
            const articles = result.feed.entry.map((entry: any) => {
                return {
                    id: entry.id[0],
                    title: entry.title[0],
                    summary: entry.summary[0],
                    authors: entry.author.map((author: any) => author.name[0]),
                    links: entry.link.map((link: any) => ({ href: link.$.href, rel: link.$.rel })),
                    // Extract other fields as needed
                };
            });
            return articles;
        } catch (error) {
            console.error('Error fetching articles from arXiv:', error);
            throw error;
        }
    }
}

export default new ArxivService()