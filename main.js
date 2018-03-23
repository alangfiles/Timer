const electron = require('electron')

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, tray;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      width: 800,
      height: 600,
      minHeight: 400,
      minWidth: 600,
      backgroundColor: '#CCCCCC',
      show: false,
      icon: path.join(__dirname, 'assets/icons/png/Timer2.png_128x128.png'),
      skipTaskbar: true
    })
  //mainWindow.setFullScreen(true);
  mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('ready-to-show', () => mainWindow.show());
}


function createTray() {
  tray = new electron.Tray(path.join(__dirname,'assets/icons/png/64x64.png'));
  const contextMenu = electron.Menu.buildFromTemplate([
    { label: '1 minute', click() { mainWindow.webContents.send('addTime', 1) } },
    { label: '5 minutes', click() { mainWindow.webContents.send('addTime', 5) } },
    { label: '20 minutes', click() { mainWindow.webContents.send('addTime', 20) } }
  ])
  tray.setToolTip('Timer Application');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', () => {
  createWindow();
  createTray();
})


app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.close();
    tray.close();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
