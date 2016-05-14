/* jshint esnext: true, moz: true */
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

var led = {
  action: function (state, cb) {
    if (state !== 0 || state !== 1) cb(false);

    //var led = spawn('uvcdynctrl', ['-s', '"LED1 Mode"', state.toString()]);
    var led = exec('uvcdynctrl -s "LED1 Mode" ' + state);

    led.stdout.on('data', function (data) {
      console.log('stdout: ${data}', data.toString());
    });
    led.stderr.on('data', function (data) {
      console.log('stderr: ${data}', data.toString());
    });
    led.on('close', function (data) {
      console.log('child process exited with code', data.toString());
    });
  }
};


led.action(0, function (res) {
  console.log('done', res);
  led.action(1, function (res) {
    console.log('done', res);
  });
});
