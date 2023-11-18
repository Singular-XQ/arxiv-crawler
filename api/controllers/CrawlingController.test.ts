// FILEPATH: /home/error/devel/sxq/sails-crawler/api/controllers/CrawlingController.test.ts
import { Request, Response } from 'express';
import { CrawlingController } from './CrawlingController';
import ArxivService from '../services/ArxivService';
const Article = require('../models/Article');

jest.mock('../services/ArxivService');
jest.mock('../models/Article');

describe('CrawlingController', () => {
    let controller: CrawlingController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        controller = new CrawlingController();
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn(),
            view: jest.fn(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('fetchStoredArticles', () => {
        it('should fetch stored articles and return them', async () => {
            const mockArticles = [{ id: 1, title: 'Test Article' }];
            Article.find.mockResolvedValue(mockArticles);

            await controller.fetchStoredArticles(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.json).toHaveBeenCalledWith(mockArticles);
        });

        it('should return 500 if there is an error', async () => {
            Article.find.mockRejectedValue(new Error('Test error'));

            await controller.fetchStoredArticles(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.send).toHaveBeenCalledWith('Error fetching stored articles');
        });
    });

    // Similar tests can be written for showArticlesPage and fetchAndStoreArticles
});