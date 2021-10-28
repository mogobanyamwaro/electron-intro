const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
const ffmpeg = require('fluent-ffmpeg');
// untill the app is initialized
app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

// receive the path from fronted
ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
  });
});
