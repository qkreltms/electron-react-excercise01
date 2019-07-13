const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let imageWindow;

function createWindow() {
  // 개발용으로 보안 해제
  mainWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: { webSecurity: false, nodeIntegration: true } });
  imageWindow = new BrowserWindow({ width: 600, height: 600, parent: mainWindow, show: false, webPreferences: { nodeIntegration: true } });

  // routers
  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  );
  imageWindow.loadURL(
    isDev ? "http://localhost:3000/image" : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
  imageWindow.on('close', (e) => {
    e.preventDefault();
    imageWindow.hide();
  })
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// imagePage 띄움
ipcMain.on("toggle-image", (event, arg) => {
  imageWindow.show();
  imageWindow.webContents.send("image", arg);
});
