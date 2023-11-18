/**
 * CrawlerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

import { Request, Response } from 'express';
import ArxivService from '../services/ArxivService';

export class CrawlingController {
    public async fetchArticles(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query.query as string; // Example: "quantum computing"
            const maxResults = parseInt(req.query.maxResults as string) || 10;
            const startIndex = parseInt(req.query.startIndex as string) || 0;

            const articles = await ArxivService.fetchArticles(query, maxResults, startIndex);
            res.json(articles);
        } catch (error) {
            res.status(500).send('Error fetching articles from arXiv');
        }
    }
}
