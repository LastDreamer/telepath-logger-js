import GK from 'global-keypress';
export const Keyboard = new GK();

Keyboard.init = (callback) => {
  Keyboard.start();

  Keyboard.on('press', data => {
    callback(data.data);
  });
};
