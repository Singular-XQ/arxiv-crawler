import { Request, Response } from "express";
import ArxivService from "../services/ArxivService";

// import Article from '../models/Article'; // Import the Article model
const Article = require('../models/Article');

export class CrawlingController {
    public async fetchStoredArticles(req: Request, res: Response): Promise<void> {
        try {
            const articles = await Article.find();
            res.json(articles);
        } catch (error) {
            res.status(500).send('Error fetching stored articles');
        }
    }

    public async showArticlesPage(req: Request, res: Response): Promise<void> {
        const articles = await Article.find();
        res.view('pages/articles', { articles });
    }

    public async fetchAndStoreArticles(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query.query as string;
            const articles = await ArxivService.fetchArticles(query);

            // Loop through articles and save them to the database
            for (const article of articles) {
                await Article.create({
                    arxivId: article.id,
                    title: article.title,
                    summary: article.summary,
                    authors: article.authors,
                    links: article.links,
                    // Set other fields as necessary
                }).fetch();
            }

            res.json({ message: 'Articles fetched and stored successfully' });
        } catch (error) {
            res.status(500).send('Error fetching and storing articles');
        }
    }
}
