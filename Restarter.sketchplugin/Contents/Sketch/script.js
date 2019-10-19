let shouldRestartKey = "com.abynim.Restarter.ShouldRestartOnTermination";
// use a unique key specific to your plugin

var onRun = function(context) {
  NSUserDefaults.standardUserDefaults().setObject_forKey(true, shouldRestartKey);
  NSApp.terminate(nil);
};

var onStartup = function(context) {
  NSUserDefaults.standardUserDefaults().setObject_forKey(false, shouldRestartKey);
};

var onShutdown = function(context) {

  let shouldRestart = NSUserDefaults.standardUserDefaults().boolForKey(shouldRestartKey);
  
  if(shouldRestart) {

    let restartArgs = `sleep 1.0; open "${NSBundle.mainBundle().bundlePath()}"`;
    // sleep for 1 second, then open the currently running app

    let task = NSTask.alloc().init();
    task.setLaunchPath("/bin/sh");
    task.setArguments(["-c", restartArgs]);
    task.launch();
  }
};