module.exports = {
    friendlyName: 'Show Articles Page',

    description: 'Display the page with articles.',

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/article-pdfs'
        },
        notFound: {
            description: 'No articles found.',
            responseType: 'notFound'
        }
    },

    fn: async function (_: unknown, exits: any) {
        // Logic for showing articles page
        const articles = (await sails.models.article.find())
            .map((a: any) => a.links
                .find((link: any) => link.rel === 'related').href);

        return exits.success({ articles });
    }
};
