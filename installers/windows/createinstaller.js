var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: "./release/package/Alan Files' Electron Timer-win32-x64",
    outputDirectory: './release/installer',
    authors: 'Alan Files',
    exe: "Alan Files' Electron Timer.exe"
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));