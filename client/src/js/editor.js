
// Import methods to save and get data from the indexedDB 
// database in "./database.js"

import { getDb, putDb } from "./database";
import { header } from "./header";

export default class {

  constructor() {
    
    let localData;
    
    if ( ( localStorage.getItem( "content" ) === undefined ) || ( localStorage.getItem( "content" ) === null ) ) {
      console.log("Initialising - nothing stored in localStorage or indexedDB");
      localStorage.setItem( "content", header );
      putDb( 1, localStorage.getItem( "content" ) );
      localData = localStorage.getItem( "content" );
    } else {
    localData = localStorage.getItem( "content" );
    }

    // check if CodeMirror is loaded
    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded");
    }

    this.editor = CodeMirror(document.querySelector("#main"), {
      value: "",
      mode: "javascript",
      theme: "lucario",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
      viewportMargin: Infinity,
    });

    // code mirror was occupying top third of viewing height only.  
    // this seems to fix it.
    // I tried so many alternatives in CSS and in the index.js file
    // This works.
    this.editor.setSize( null, "100%" );

    // When the editor is ready, set the value to whatever is 
    // stored in indexedDB.
    // Fall back to localStorage if nothing is stored in indexeddb, 
    // and if neither is available, set the value to header.
    
    getDb()
      .then( data => {
        
        console.info( "Loaded data from IndexedDB, injecting into editor" );
        
        // using Regular Expression syntax to see if stored data is not only
        // carriage returns (i.e. no data)
        const regExp  = new RegExp(/.+/g);

        if ( ( !data[0].content ) || ( !localStorage.getItem( "content" ) ) ) {
          console.log( "This was triggered: !data[0].content ");
          this.editor.setValue( header );

        } else if ( regExp.test( data[0].content ) ) {
          
          console.log( "This was triggered: regExp.test(data[0].content ) ");
          this.editor.setValue( data[0].content );
        
        } else if ( !regExp.test( localStorage.getItem( "content" ) ) ) {
          console.log( `This was triggered: !regExp.test( localStorage.getItem( "content" ) ) `);
          this.editor.setValue( header );

        } else {
          console.log( "Got to the Last condition - sets local data");
          this.editor.setValue( localData );
        }

        this.editor.setCursor(this.editor.lastLine() );
        
      });


    this.editor.on( "change", () => {
      localStorage.setItem( "content", this.editor.getValue() );
    });


    // Save the content of the editor when the editor itself 
    // loses focus.

    this.editor.on( "blur", () => {
      console.log( "The editor has lost focus" );
      putDb( 1, localStorage.getItem( "content" ) );
    });
  }
}
