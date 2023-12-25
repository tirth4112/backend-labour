const { MongoClient } = require('mongodb');

async function ConnectionStart(Auth_User, collectionName) {
    const { url, databaseName } = Auth_User;

    const client = new MongoClient(url);
    await client.connect();

    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    return collection;
}

module.exports = ConnectionStart;
