import { openDB } from 'idb';

const initdb = async () =>

  // Creates a new database named 'jate' and sets version of database to 1.
  openDB('jate', 1, {

    // Add database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      // Create a new object store for the data and give it an key 
      // name of 'id' which needs to increment automatically.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) =>
  {
    console.log('Add (PUT) data into the database');
    
    // Create connection to the database and version we want to use.
    const textDB = await openDB ("jate", 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = textDB.transaction("jate", "readwrite");

    // open up the object store.
    const store = tx.objectStore("jate");

    // Use the .put() method and pass into the content.
    const request = store.put({id: id, jate: content});

    // Confirm the request.
    const result = await request;
    console.log('👍 jate database has been updated.', result);
  };


  
// Add logic for a method that gets all the content from the database
export const getDb = async () => 
  {  
    console.log('GET from the database');

    // Create a connection to the database database and version we want to use.
    const textDB = await openDB ("jate", 1);
    
    // Create a new transaction and specify the database and data privileges.
    const tx = textDB.transaction("jate", "readonly");
    
    // Open up the desired object store.
    const store = tx.objectStore("jate");

    // method to get all data in the database.
    const request = store.getAll();

    // Confirm the request.
    const result = await request;
    console.log('result.value', result);
    return result;
  };

// Initialises (starts) the database.
initdb();
