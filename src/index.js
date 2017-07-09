import activeWin from 'active-win';
import { Keyboard, Mouse } from './handlers';
// import { app, BrowserWindow } from 'electron';

let activeWindow = '';

Keyboard.init((key) => {
  activeWin().then(result => {
    console.log(result.app, key);
  });
});

Mouse.init((event) => {
  activeWin().then(result => {
    console.log(result.app, event.type);
  });
});
