import { openDB } from 'idb';

// initiliaze IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        // check if database exists
        console.log('jate database already exists');
        return;
      }
      // create new object store if it doesn't exist
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// store content in IndexedDB
export const putDb = async (content) => {
  const jateDb = await openDB();
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // add content to object store
  const request = store.put({ content });

  // wait for transaction to complete
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
// retrieve all contetnt from IndexedDB
export const getDb = async () => {
  // connection to database and version to use
  const jateDb = await openDB('jate', 1);
  // new transaction and specify database and privileges
  const tx = jateDb.transaction('jate', 'readonly');
  // open object store
  const store = tx.objectStore('jate');

  // retrieve all contetnt from object store
  const request = store.getAll();

  // wait for the transaction to complete
  const result = await request;
  console.log('🚀 - data read from database', result);

  // return the retrieved content
  return result.value;
};

// initialize database when app starts
initdb();
