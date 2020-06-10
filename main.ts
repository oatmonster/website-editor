import { app, BrowserWindow, Menu, ipcMain } from 'electron';

let mainWindow: BrowserWindow;
let dirty: boolean;

function createWindow() {

  let menu = Menu.buildFromTemplate( [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Blog Post',
          click: async () => {
            mainWindow.webContents.send( 'newBlog', null );
          }
        },
        {
          label: 'New Project',
          click: async () => {
            mainWindow.webContents.send( 'newProject', null );
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          role: 'quit'
        }
      ]
    }
  ] );

  Menu.setApplicationMenu( null );

  mainWindow = new BrowserWindow( {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  } );

  mainWindow.loadURL( `file://${__dirname}/../editor/index.html` );

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

ipcMain.on( 'formDirty', () => {
  dirty = true;
} );

ipcMain.on( 'formClean', () => {
  dirty = false;
} );

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