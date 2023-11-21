/**
 * Author.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    arxivId: { type: 'string', required: true, unique: true },
    title: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    authors: { type: 'json', columnType: 'array', required: true },
    publishedDate: { type: 'ref', columnType: 'datetime' },
    updatedDate: { type: 'ref', columnType: 'datetime' },
    links: { type: 'json', columnType: 'array' },
    // Add other fields as necessary
  },
};
