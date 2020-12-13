

module.exports = {
    getDBUri: function(env) {
        const password = `YHZ_hg2ua`;
        const db = `bobanweb`;
        return `mongodb+srv://admin:${password}@devconnector.sf0oa.mongodb.net/${db}?retryWrites=true&w=majority`;
    }
};