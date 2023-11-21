import ArxivService from "../services/ArxivService";
module.exports = {

  friendlyName: 'Start search',
  description: '',
  inputs: {
    query: {
      type: 'string',
      required: true,
      description: 'Search query for arXiv API'
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/search-manager'
    },
  },


  fn: async function (inputs: any, exits: any) {
    await (ArxivService.startSearch)(inputs.query);
    const searches = await sails.models.scrapingpointer.find();
    return exits.success({ searches });
  }
};
