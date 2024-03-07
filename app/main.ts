import {
  app,
  BrowserWindow,
  ipcMain,
  MessageBoxOptions,
  dialog,
  BrowserView,
} from 'electron';
import { createMainWindow } from './createMainWindow';
import { autoUpdater } from 'electron-updater';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFile,
  writeFileSync,
} from 'fs';
import { resolve } from 'path';
import { createMapProjectionWindow } from './createMapProjectionWindow';
const contextMenu = require('electron-context-menu');

const args = process.argv.slice(1),
  serve = args.some((val) => ['--serve', '--local'].includes(val));

let mainWin: BrowserWindow = null;
let mapWin: BrowserWindow = null;
let showDevTools = serve;
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

  mainWin = createMainWindow(showDevTools);
  if (showDevTools)
    contextMenu({
      window: mainWin,
      showCopyImage: false,
      showInspectElement: true,
      showSelectAll: false,
    });
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
      mainWin = createMainWindow();
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

  ipcMain.on('toggleDevTools', () => {
    mainWin.close();
    showDevTools = !showDevTools;
    mainWin = createMainWindow(showDevTools);
    if (showDevTools)
      contextMenu({
        window: mainWin,
        showCopyImage: false,
        showInspectElement: true,
        showSelectAll: false,
      });
  });

  ipcMain.on('projectMap', (event, image) => {
    if (mapWin != null && !mapWin.isDestroyed()) mapWin.close();
    const base64Data = image.replace(/^data:image\/png;base64,/, '');
    if (serve) {
      writeFileSync(
        resolve(__dirname, '../', 'src', 'assets', 'projection.png'),
        base64Data,
        'base64'
      );
    } else {
      writeFileSync(
        resolve(
          app.getPath('exe'),
          '../',
          'resources',
          'app',
          'assets',
          'projection.png'
        ),
        base64Data,
        'base64'
      );
    }
    mapWin = createMapProjectionWindow(showDevTools);
  });

  ipcMain.on('stopProjection', () => {
    if (mapWin != null && !mapWin.isDestroyed()) mapWin.close();
  });

  ipcMain.on('openGoogle', (event, bounds) => {
    const view = new BrowserView();

    mainWin.addBrowserView(view);
    view.setBounds(bounds);
    view.webContents.loadURL('https://www.google.com/imghp');

    contextMenu({
      window: view,
      showSaveImageAs: true,
      showCopyImageAddress: true,
      showCopyImage: false,
      showInspectElement: showDevTools,
      showSelectAll: false,
    });
  });

  ipcMain.on('closeGoogle', () => {
    const view = mainWin.getBrowserView();

    if (view) mainWin.removeBrowserView(view);
  });

  ipcMain.on('repositionGoogleWindow', (event, bounds) => {
    const view = mainWin.getBrowserView();

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

  ipcMain.on('saveImageHistory', (event, imageHistory) => {
    if (serve) {
      writeFileSync(
        resolve(__dirname, '../', 'src', 'assets', 'image-history.json'),
        JSON.stringify(imageHistory),
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
          'image-history.json'
        ),
        JSON.stringify(imageHistory),
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

  ipcMain.on('saveLogin', (event, login) => {
    if (serve) {
      writeFileSync(
        resolve(__dirname, '../', 'src', 'assets', 'login.json'),
        JSON.stringify(login),
        'utf-8'
      );
    } else {
      writeFileSync(
        resolve(
          app.getPath('exe'),
          '../',
          '../',
          'Project-RPG-common',
          'login.json'
        ),
        JSON.stringify(login),
        'utf-8'
      );
    }
  });
}

ipcMain.on('saveEnv', (event, env) => {
  if (serve) {
    writeFileSync(
      resolve(__dirname, '../', 'src', 'assets', 'env.json'),
      JSON.stringify(env),
      'utf-8'
    );
  } else {
    writeFileSync(
      resolve(
        app.getPath('exe'),
        '../',
        '../',
        'Project-RPG-common',
        'env.json'
      ),
      JSON.stringify(env),
      'utf-8'
    );
  }
});

function createCommonFolder() {
  var dir = resolve(app.getPath('exe'), '../', '../', 'Project-RPG-common');
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}
