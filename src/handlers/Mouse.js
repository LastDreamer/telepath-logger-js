import ioHook from 'iohook';

export const Mouse = {
  init : callback => {
    console.log('Mouse initj');
    ioHook.on("mousemove", event => {
      callback(event);
    });

    ioHook.on("mouseup", event => {
      callback(event);
    });

    ioHook.on("mousewheel", event => {
      callback(event);
    });

    ioHook.on('mouseclick', event => {
      callback(event);
    });

    ioHook.start();
  }
}

// Catch exit
process.stdin.resume();
process.on('exit', function(code) {
  //код сюда
  console.log('exit');
  ioHook.stop();
  ioHook.unload();
  process.exit(code);
});
process.on('SIGINT', function() {
  process.exit(0);
});
process.on('uncaughtException', function(err) {
  console.dir(err, { depth: null });
  process.exit(1);
});
