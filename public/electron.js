const electron = require("electron");
const path = require("path");
const fs = require('fs');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

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
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

ipcMain.on('read-directory', (event, directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      const mp3Files = files.filter(file => path.extname(file).toLowerCase() === '.mp3');
      event.sender.send('directory-files', mp3Files);
    }
  });
});

ipcMain.handle('is-directory', async (event, filePath) => {
  try {
    const stat = fs.statSync(filePath);
    return stat.isDirectory();
  } catch (err) {
    console.log(err);
    return false;
  }
});