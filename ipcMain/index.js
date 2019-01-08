const { ipcMain } = require('electron');
const userController = require('./controller/user');

Object.keys(userController).forEach(channel => {
  ipcMain.on(channel, userController[channel]);
});
