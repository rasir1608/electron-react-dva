const { ipcMain } = require('electron');

ipcMain.on('create', (event, person) => {
  const os = require('os'); // not be : var os = require('os')
  console.log('creating-person-hot101', person); // 输出："creating snowtest"
  event.sender.send('born', os.cpus());
});
