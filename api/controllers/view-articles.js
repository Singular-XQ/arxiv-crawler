module.exports = {


  friendlyName: 'View articles',


  description: 'Display "Articles" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/articles'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
