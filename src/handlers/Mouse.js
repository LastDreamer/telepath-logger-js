import ioHook from 'iohook';

const mouse = (callback) => {
  // ioHook.on("mousemove", event => {
  //   callback(event);
  // });

  // ioHook.on("mouseup", event => {
  //   callback(event);
  // });

  // ioHook.on("mousewheel", event => {
  //   callback(event);
  // });

  ioHook.on('mousedoubleclick', (event) => {
    callback(event);
  });

  ioHook.on('mouseclick', (event) => {
    callback(event);
  });

  ioHook.start();
};

// Catch exit
process.stdin.resume();
process.on('exit', (code) => {
  ioHook.stop();
  ioHook.unload();
  process.exit(code);
});
process.on('SIGINT', () => {
  process.exit(0);
});
process.on('uncaughtException', (err) => {
  console.dir(err, { depth: null }); //eslint-disable-line
  process.exit(1);
});

export default mouse;
