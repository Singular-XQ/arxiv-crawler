module.exports = {


  friendlyName: 'View search manager',


  description: 'Display "Search manager" page.',


  inputs: {
  },


  exits: {

    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/search-manager'
    },
  },


  fn: async function (inputs, exits) {
    const searches = await sails.models.scrapingpointer.find();
    return exits.success({ searches });
  }
};
