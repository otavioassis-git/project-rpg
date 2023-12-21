import {
  app,
  BrowserWindow,
  screen,
  ipcRenderer,
  ipcMain,
  MessageBoxOptions,
  dialog,
  BrowserView,
} from 'electron';
import { createMainWindow } from './createMainWindow';
import { autoUpdater } from 'electron-updater';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
const contextMenu = require('electron-context-menu');

const args = process.argv.slice(1),
  serve = args.some((val) => ['--serve', '--local'].includes(val));

let mainWin: BrowserWindow = null;
let previousBounds;

function App() {
  createCommonFolder();
  // is serve register for angular
  if (serve) {
    writeFileSync(
      resolve(__dirname, '../', 'src', 'assets', 'isServe.json'),
      JSON.stringify({ serve }),
      'utf-8'
    );
  } else {
    writeFileSync(
      resolve(
        app.getPath('exe'),
        '../',
        'resources',
        'app',
        'assets',
        'isServe.json'
      ),
      JSON.stringify({ serve }),
      'utf-8'
    );
  }

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
    const window = BrowserWindow.getFocusedWindow();
    if (window.isMaximized()) window.unmaximize();
    else window.maximize();
  });

  ipcMain.on('closeWindow', () => {
    BrowserWindow.getFocusedWindow().close();
  });

  ipcMain.on('openGoogle', (event, bounds) => {
    const win = BrowserWindow.getFocusedWindow();
    const view = new BrowserView();

    win.addBrowserView(view);
    view.setBounds(bounds);
    view.webContents.loadURL('https://www.google.com/imghp');

    contextMenu({
      window: view,
      showSaveImageAs: true,
      showCopyImageAddress: true,
      showCopyImage: false,
      showInspectElement: false,
      showSelectAll: false,
    });
  });

  ipcMain.on('closeGoogle', () => {
    const win = BrowserWindow.getFocusedWindow();
    const view = win.getBrowserView();

    if (view) win.removeBrowserView(view);
  });

  ipcMain.on('repositionGoogleWindow', (event, bounds) => {
    const win = BrowserWindow.getFocusedWindow();
    const view = win.getBrowserView();

    view.setBounds(bounds);
  });

  ipcMain.on('saveRoute', (event, route) => {
    if (serve) {
      writeFileSync(
        resolve(__dirname, '../', 'src', 'assets', 'route.json'),
        JSON.stringify(route),
        'utf-8'
      );
    } else {
      writeFileSync(
        resolve(
          app.getPath('exe'),
          '../',
          'resources',
          'app',
          'assets',
          'route.json'
        ),
        JSON.stringify(route),
        'utf-8'
      );
    }
  });

  ipcMain.on('saveTutorials', (event, tutorial) => {
    if (serve) {
      writeFileSync(
        resolve(__dirname, '../', 'src', 'assets', 'tutorials.json'),
        JSON.stringify(tutorial),
        'utf-8'
      );
    } else {
      writeFileSync(
        resolve(
          app.getPath('exe'),
          '../',
          '../',
          'Project-RPG-common',
          'tutorials.json'
        ),
        JSON.stringify(tutorial),
        'utf-8'
      );
    }
  });
}

function createCommonFolder() {
  var dir = resolve(app.getPath('exe'), '../', '../', 'Project-RPG-common');
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}
