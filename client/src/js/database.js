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
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // add content to object store
  const id = await store.add({ content });

  // wait for transaction to complete
  await tx.done;
  console.log(`Content with ID ${id} added to IndexedDB`);
};

// TODO: Add logic for a method that gets all the content from the database
// retrieve all contetnt from IndexedDB
export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // retrieve all contetnt from object store
  const content = await store.getAll();

  // wait for the transaction to complete
  await tx.done;
  console.log('Retrieved content from IndexedDB', content);

  // return the retrieved content
  return content;
};

// initialize database when app starts
initdb();
