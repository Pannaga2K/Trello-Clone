import { Client, ID, Storage, Account, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64b3fb8c1bfc73a7ee18');

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export {client, account, databases, storage, ID};
