const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

function isDev() {
  return process.env.NODE_ENV === 'development';
}

let win;
function createWindow() {
  if (!win) {
    win = new BrowserWindow({ width: 800, height: 600 });
    if (isDev()) {
      const host = process.env.HOST || '127.0.0.1';
      const port = process.env.PORT || '8000';
      // 这里的url换成你所使用框架开发时的url
      win.loadURL(`http://${host}:${port}/`);
    } else {
      // win.loadFile('./dist/index.html');
      win.loadURL(
        url.format({
          pathname: path.join(__dirname, './dist/index.html'),
          protocol: 'file:',
          slashes: true,
        })
      );
    }
    win.webContents.openDevTools();
  }
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
