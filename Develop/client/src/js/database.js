
import { openDB } from "idb";

const initdb = async () =>

  // Creates a new database named 'jate' and sets version of database to 1.
  openDB( "jate", 1, {

    // Add database schema if it has not already been initialized.
    upgrade( db ) {
      if ( db.objectStoreNames.contains( "jate" )) {
        console.log( "jate database already exists" );
        return;
      }

      // Create a new object store for the data and give it a key 
      // name of 'id'.  As the id remains 1 throughout, I've removed
      // autoincrement.
      db.createObjectStore( "jate", { keyPath: "id" });
      console.log( "jate database created" );
    },
  });


// Logic that accepts content and adds it to the database.
export const putDb = async ( id, content ) =>
  {
    console.log('Add (PUT) data into the database');
    
    // Create connection to the database and version we want to use.
    const textDB  = await openDB ("jate", 1);

    // Create a new transaction and specify the database and data privileges.
    const tx      = textDB.transaction("jate", "readwrite");

    // open up the object store.
    const store   = tx.objectStore("jate");

    // Use the .put() method and pass in content.
    const request = store.put({ id, content: content });

    // Confirm the request.
    const result  = await request;

    console.log( "👍 JATE database has been updated: \n", result );
  };


  
// Logic that gets all the content from the database.
export const getDb = async () => 
  {  
    console.log('GET from the database');

    // Create a connection to the database database and version we want to use.
    const textDB  = await openDB ("jate", 1);
    
    // Create a new transaction and specify the database and data privileges.
    const tx      = textDB.transaction("jate", "readonly");
    
    // Open up the desired object store.
    const store   = tx.objectStore("jate");

    // method to get all data in the database.
    const request = store.getAll();

    // Confirm the request.
    const result  = await request;

    console.log( "👍 JATE data stored in indexedDB: \n", result[0].content );
    return result;
  };

// Initialises (starts) the database.
initdb();
