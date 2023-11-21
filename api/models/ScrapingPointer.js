// api/models/ScrapingPointer.js
module.exports = {
    attributes: {
        searchTerm: { type: 'string', required: true, unique: true },
        startIndex: { type: 'number', defaultsTo: 0 }, // The last index from which articles were fetched
        // You can also add fields for timestamps or statuses if needed
    },
};
