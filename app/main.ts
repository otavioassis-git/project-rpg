import {
  app,
  BrowserWindow,
  screen,
  ipcRenderer,
  ipcMain,
  MessageBoxOptions,
  dialog,
} from 'electron';
import { createMainWindow } from './createMainWindow';
import { autoUpdater } from 'electron-updater';

let mainWin: BrowserWindow = null;
let previousBounds;

function App() {
  mainWin = createMainWindow();
  previousBounds = mainWin.getBounds();
  loadEvents();
  autoUpdater.checkForUpdates();
}

autoUpdater.on('update-downloaded', () => {
  const dialogOpts: MessageBoxOptions = {
    type: 'info',
    buttons: ['Later', 'Install'],
    title: 'A new version is ready to install!',
    message:
      "If you choose to install later you'll need to close and open the application again to search for updates.",
  };
  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 1) {
      autoUpdater.quitAndInstall();
    }
  });
});

autoUpdater.on('error', (err) => {
  const dialogOpts: MessageBoxOptions = {
    type: 'error',
    buttons: ['Ok'],
    title: 'Auto-Updater Error - ' + err.name,
    message: err.message + '\n' + err.stack,
  };
  dialog.showMessageBox(dialogOpts);
});

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(App, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWin === null) {
      createMainWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}

function loadEvents() {
  ipcMain.on('minimizeWindow', () => {
    BrowserWindow.getFocusedWindow().minimize();
  });

  ipcMain.on('toogleWindowSize', () => {
    if (
      BrowserWindow.getFocusedWindow().getBounds().width ==
      screen.getPrimaryDisplay().workAreaSize.width
    ) {
      BrowserWindow.getFocusedWindow().setBounds(previousBounds);
    } else {
      previousBounds = BrowserWindow.getFocusedWindow().getBounds();
      BrowserWindow.getFocusedWindow().maximize();
    }
  });

  ipcMain.on('closeWindow', () => {
    BrowserWindow.getFocusedWindow().close();
  });
}
