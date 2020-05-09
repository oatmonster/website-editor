import { app, BrowserWindow, Menu } from 'electron';

let mainWindow: BrowserWindow;

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

  Menu.setApplicationMenu( menu );

  mainWindow = new BrowserWindow( {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  } );

  // mainWindow.loadURL( `file://${__dirname}/../editor/index.html` );
  mainWindow.loadURL( 'http://localhost:4200' );

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