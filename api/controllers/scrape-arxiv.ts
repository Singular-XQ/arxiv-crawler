import ArxivService from "../services/ArxivService";

module.exports = {
    friendlyName: 'Fetch and Store Articles',

    description: 'Fetch articles from arXiv API and store them in the database.',

    inputs: {
        query: {
            type: 'string',
            required: true,
            description: 'Search query for arXiv API'
        }
    },

    exits: {
        success: {
            description: 'Articles were fetched and stored successfully.'
        },
        serverError: {
            description: 'Failed to fetch or store articles.'
        }
    },

    fn: async function (inputs: any, exits: any) {
        console.log("scraping?", inputs.query)
        try {
            const query = inputs.query as string;
            await ArxivService.fetchAndSaveArticles(query);
            return exits.success();
        } catch (error) {
            console.log('fail', error)
            return exits.serverError();
        }
    }
};
