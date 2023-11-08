const electron = require("electron");
const path = require("path");
const fs = require('fs');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  // and load the index.html of the app.
  console.log(__dirname);
  mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

ipcMain.on('open-directory-dialog', (event) => {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  }).then(result => {
    if (!result.canceled) {
      const directoryPath = result.filePaths[0];
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          console.log(err);
        } else {
          const mp3AndWavFiles = files.filter(file => path.extname(file).toLowerCase() === '.mp3' || path.extname(file).toLowerCase() === '.wav');
          event.sender.send('selected-directory', directoryPath, mp3AndWavFiles);
        }
      });
    }
  }).catch(err => {
    console.log(err);
  });
});