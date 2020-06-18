import { app, BrowserWindow, Menu, MenuItem, ipcMain } from 'electron';

let mainWindow: BrowserWindow;
let dirty: boolean;

function createWindow() {
  // Clear default menu
  Menu.setApplicationMenu( null );

  mainWindow = new BrowserWindow( {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      spellcheck: true
    }
  } );

  mainWindow.loadURL( `file://${__dirname}/../editor/index.html` );

  // Right click menu
  mainWindow.webContents.on( 'context-menu', ( event, params ) => {
    const contextMenu = new Menu();

    let copy = new MenuItem( {
      label: 'Copy',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    } );

    let cut = new MenuItem( {
      label: 'Cut',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    } );

    let paste = new MenuItem( {
      label: 'Paste',
      accelerator: 'CmdOrCtrl+P',
      role: 'paste'
    } );

    contextMenu.append( copy );
    contextMenu.append( cut );
    contextMenu.append( paste );

    if ( !params.editFlags.canCopy ) {
      copy.enabled = false;
    }

    if ( !params.editFlags.canCut ) {
      cut.enabled = false;
    }

    if ( !params.isEditable ) {
      paste.enabled = false;
    }

    if ( params.dictionarySuggestions.length > 0 ) {
      contextMenu.append(
        new MenuItem( {
          type: 'separator'
        } )
      );
    }

    // Add each spelling suggestion
    for ( const suggestion of params.dictionarySuggestions ) {
      contextMenu.append( new MenuItem( {
        label: suggestion,
        click: () => mainWindow.webContents.replaceMisspelling( suggestion )
      } ) );
    }

    // Allow users to add the misspelled word to the dictionary
    if ( params.misspelledWord ) {
      contextMenu.append(
        new MenuItem( {
          label: 'Add to dictionary',
          click: () => mainWindow.webContents.session.addWordToSpellCheckerDictionary( params.misspelledWord )
        } )
      );
    }

    contextMenu.popup();
  } );

  mainWindow.on( 'close', function ( event ) {
    if ( dirty ) {
      var choice = require( 'electron' ).dialog.showMessageBoxSync( this,
        {
          type: 'question',
          buttons: [ 'Yes', 'No' ],
          title: 'Confirm',
          message: 'Discard unsaved changes?'
        } );
      if ( choice === 1 ) {
        event.preventDefault();
      }
    }
  } );

  mainWindow.on( 'closed', () => {
    mainWindow = null;
  } );
}

// A form has been modified
ipcMain.on( 'formDirty', () => {
  dirty = true;
} );

// Form is clean
ipcMain.on( 'formClean', () => {
  dirty = false;
} );

// Popup a dialog and return the choice to the caller
ipcMain.on( 'dialog', ( event, message ) => {
  var choice = require( 'electron' ).dialog.showMessageBoxSync( mainWindow,
    {
      type: 'question',
      buttons: [ 'Yes', 'No' ],
      title: 'Confirm',
      message: message
    } );
  event.returnValue = choice === 0;
} );

app.on( 'ready', createWindow );

app.on( 'window-all-closed', () => {
  if ( process.platform !== 'darwin' ) app.quit();
} );

app.on( 'activate', () => {
  if ( mainWindow === null ) createWindow();
} );