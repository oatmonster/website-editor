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

  mainWindow.on( 'close', function ( e ) {
    if ( dirty ) {
      var choice = require( 'electron' ).dialog.showMessageBoxSync( this,
        {
          type: 'question',
          buttons: [ 'Yes', 'No' ],
          title: 'Confirm',
          message: 'Are you sure you want to quit?'
        } );
      if ( choice == 1 ) {
        e.preventDefault();
      }
    }
  } );

  mainWindow.on( 'closed', function () {
    mainWindow = null;
  } );
}

ipcMain.on( 'formDirty', () => {
  dirty = true;
} );

ipcMain.on( 'formClean', () => {
  dirty = false;
} );

app.on( 'ready', createWindow );

app.on( 'window-all-closed', function () {
  if ( process.platform !== 'darwin' ) app.quit();
} );

app.on( 'activate', function () {
  if ( mainWindow === null ) createWindow();
} );