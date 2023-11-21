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
        try {
            const query = inputs.query as string;
            const articles = await ArxivService.fetchArticles(query);

            // Loop through articles and save them to the database
            for (const article of articles) {
                await sails.models.article.create({
                    arxivId: article.id,
                    title: article.title,
                    summary: article.summary,
                    authors: article.authors,
                    links: article.links,
                    // Set other fields as necessary
                }).fetch();
            }

            return exits.success();
        } catch (error) {
            return exits.serverError();
        }
    }
};
