import { BrowserWindow, protocol, screen } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

export function createMainWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  let win = new BrowserWindow({
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: 'rgb(30, 31, 34)',
      symbolColor: '#fff',
      height: 37,
    },
    width: 1200,
    height: 700,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      // devTools: false,
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false, // false if you want to run e2e test with Spectron
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const ref = url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true,
    });
    win.loadURL(ref);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}
