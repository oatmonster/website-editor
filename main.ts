import { app, BrowserWindow, Menu } from 'electron';
import * as url from 'url';
import * as path from 'path';

let mainWindow: BrowserWindow;

function createWindow() {

  let menu = Menu.buildFromTemplate( [
    {
      label: 'File',
      submenu: [
        { label: 'New Blog Post' },
        { label: 'New Project' },
        { type: 'separator' },
        {
          label: 'Exit',
          role: 'quit'
        }
      ]
    }
  ] );

  Menu.setApplicationMenu( menu );

  mainWindow = new BrowserWindow( {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    }
  } );

  mainWindow.loadURL(
    url.format( {
      pathname: path.join( __dirname, '../editor/index.html' ),
      protocol: 'file:',
      slashes: true
    } )
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on( 'closed', function () {
    mainWindow = null;
  } );
}

app.on( 'ready', createWindow );

app.on( 'window-all-closed', function () {
  if ( process.platform !== 'darwin' ) app.quit();
} );

app.on( 'activate', function () {
  if ( mainWindow === null ) createWindow();
} );