module.exports = {
    friendlyName: 'Show Articles Page',

    description: 'Display the page with articles.',

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/articles'
        },
        notFound: {
            description: 'No articles found.',
            responseType: 'notFound'
        }
    },

    fn: async function (_: unknown, exits: any) {
        // Logic for showing articles page
        const articles = await sails.models.article.find();

        return exits.success({ articles });
    }
};
