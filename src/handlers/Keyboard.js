import GK from 'global-keypress';

const Keyboard = new GK();

const keyboard = (callback) => {
  Keyboard.start();

  Keyboard.on('press', (data) => {
    let key = data.data;
    switch (key) {
      case '<Space>':
        key = '␣';
        break;
      case '<LCommand>':
      case '<RCommand>':
        key = '↓⌘';
        break;
      case '[released <LCommand>]':
      case '[released <RCommand>]':
        key = '↑⌘';
        break;
      case '<Up>':
        key = '↑';
        break;
      case '<Down>':
        key = '↓';
        break;
      case '<Left>':
        key = '←';
        break;
      case '<Right>':
        key = '→';
        break;
      case '<LShift>':
      case '<RShift>':
        key = '⇧';
        break;
      case '<Enter>':
        key = '↵';
        break;
      case '<LOption>':
      case '<ROption>':
        key = '⌥';
        break;
      case '<LCtrl>':
      case '<RCtrl>':
        key = '^';
        break;
      case '<ESC>':
        key = '⎋';
        break;
      case '<Delete>':
        key = '⌫';
        break;
      case '<Tab>':
        key = '⇥';
        break;
      case '[released <LShift>]':
      case '[released <RShift>]':
      case '[released <LOption>]':
      case '[released <ROption>]':
      case '[released <LCtrl>]':
      case '[released <RCtrl>]':
        key = '';
        break;
    }
    callback(key);
  });
};

export default keyboard;
