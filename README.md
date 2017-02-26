# For Build
npm run android
npm start
Go to : http://localhost:8081/debugger-ui

https://facebook.github.io/react-native/releases/0.23/docs/debugging.html#live-reload

https://facebook.github.io/react-native/releases/0.27/docs/running-on-device-android.html#configure-your-app-to-connect-to-the-local-dev-server-via-wi-fi
adb shell input keyevent 82

npm run build -- --watch

## watchman
$ git clone https://github.com/facebook/watchman.git
$ cd watchman
$ git checkout v4.7.0  # the latest stable release
$ ./autogen.sh
$ ./configure
$ make
$ sudo make install
