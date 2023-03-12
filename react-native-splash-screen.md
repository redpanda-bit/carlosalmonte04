![elegant-colorful-splash-watercolor-background-free-vector](https://user-images.githubusercontent.com/25206487/224523226-5ff09764-b158-4f06-826d-4640cf9a7df5.jpeg)
# React Native App Not Loading Bundle, react-native-splash-screen

There is an issue implementing react native splash screen on the latest versions of react native. The app freezes at the splash screen and does not show any signs of loading on metro bundler. 

![Metro bundler at the terminal with no signs of loading bundle](https://user-images.githubusercontent.com/25206487/224523259-e77ef7a2-2138-49f8-8a3e-b6c667aa4b21.png)

The new react native launch process was abstracted into its own file, RCTAppDelegate.m, where the bridge and rootView are instantiated, new architecture is enabled and the app window is made visible. My assumption is that AppDelegate.m kept getting larger and larger after the addition of new architecture code, so abstracting many of the statements seemed like the correct thing to do - according to good engineering principles.

Before, when all of these app launch statements lived in AppDelegate.m, we had the opportunity to instantiate third party modules after the JavaScript communication had been established. Now there is less opportunity to instantiate modules anywhere in the launch process since all of the important steps were abstracted into a single method and packaged within the react-native module.

**All of this:**

```objective-c
// RCTAppDelegate.m#application
/*
  A lot of these statements used to live in AppDelegate.m
*/
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  BOOL enableTM = NO;
#if RCT_NEW_ARCH_ENABLED
  enableTM = self.turboModuleEnabled;
#endif

  RCTAppSetupPrepareApp(application, enableTM);

  if (!self.bridge) {
    self.bridge = [self createBridgeWithDelegate:self launchOptions:launchOptions];
  }
#if RCT_NEW_ARCH_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
  self.bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:self.bridge
                                                               contextContainer:_contextContainer];
  self.bridge.surfacePresenter = self.bridgeAdapter.surfacePresenter;
#endif

  NSDictionary *initProps = [self prepareInitialProps];
  UIView *rootView = [self createRootViewWithBridge:self.bridge moduleName:self.moduleName initProps:initProps];

  if (@available(iOS 13.0, *)) {
    rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
    rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [self createRootViewController];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}
```

**Got taken away from our control and turned into a single function call, like this:**

```objective-c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"GrabFormInputExample";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

 /* Like this */ return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
```
![Michael Scott from the office walking out the door, shouting and raising arms and hands](https://user-images.githubusercontent.com/25206487/224523220-dcc0d17c-feed-4184-af9d-f925cfb73372.gif)

This is a lot less code we no longer need to worry about, but modules like react-native-splash-screen need the JavaScript to run before their instantiation.
```objective-c
// Before - does not work
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"AwesomeProject";
  /* Ignore the next two lines of comments, they're provided by react-native */
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  /* First */
  [RNSplashScreen show];
  /* Second */
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
```
```objective-c
// After - Works
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"AwesomeProject";
  /* Ignore the next two lines of comments, they're provided by react-native */
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  /* First */
  BOOL didFinishLaunchingWithOptions = [super application:application didFinishLaunchingWithOptions:launchOptions];

  /* Second */
  [RNSplashScreen show];

  /* Third */
  return didFinishLaunchingWithOptions;
}
```
The temporary thread-block caused by [RNSplashScreen show] would be removed from the JavaScript side using RNSplashScreen.hide();, I know we generally avoid blocking the thread, at least from my JavaScript knowledge, however, this thread-block a seems to be safe. It shows the splash screen, blocks the thread by executing a while loop inside the react-native-splash-screen module, and it waits for JavaScript to stop the while loop and hide the splash screen. Again, sounds like a legitimate need for a thread-block.

But in the "Before" case above, JavaScript is not launched until the [super application:application didFinishLaunchingWithOptions:launchOptions] call, which happens after the [RNSplashScreen show] call. Therefore, the app freezes with a splash screen that has no JavaScript ready to remove the thread-block.

While we wait for fixes at the modules level or from react native, please have a look again at a temporary fixes below, use at your discretion as its results might be different depending on your needs.

Option 1: change AppDelegate.m as opposed to the next option, this option will remain in place even after running npm install or yarn.
```objective-c
// Before - does not work
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"AwesomeProject";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  /* First */
  [RNSplashScreen show];
  /* Second */
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
```
```objective-c
// After - Works
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"AwesomeProject";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  /* First */
  BOOL didFinishLaunchingWithOptions = [super application:application didFinishLaunchingWithOptions:launchOptions];

  /* Second */
  [RNSplashScreen show];

  /* Third */
  return didFinishLaunchingWithOptions;
}
```

Option 2: change react-native-splash-screen remember to use something like https://www.npmjs.com/package/patch-package to keep changes through npm install or yarn.

Within node_modules/react-native-splash-screen/ios/NSplashScreen.m#show remove the while loop and change the dateWithTimeIntervalSinceNow:0.1time to a custom amount of seconds. 
```objective-c
// node_modules/react-native-splash-screen/ios/RNSplashScreen.m#show
// Before
+ (void)show {
    if (!addedJsLoadErrorObserver) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(jsLoadError:) name:RCTJavaScriptDidFailToLoadNotification object:nil];
        addedJsLoadErrorObserver = true;
    }

    while (waiting) { // remove
        NSDate* later = [NSDate dateWithTimeIntervalSinceNow:0.1];
        [[NSRunLoop mainRunLoop] runUntilDate:later];
    } // remove
}
```
```objective-c
// After
+ (void)show {
    if (!addedJsLoadErrorObserver) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(jsLoadError:) name:RCTJavaScriptDidFailToLoadNotification object:nil];
        addedJsLoadErrorObserver = true;
    }

    NSDate* later = [NSDate dateWithTimeIntervalSinceNow:3]; // 3 seconds timer
    [[NSRunLoop mainRunLoop] runUntilDate:later];
}
```
## Conclusion

I personally recommend option 1 even if it is just temporarily. I say temporarily because I am still not sure of all the implications of launching the splash screen after the startup processes, however, I have checked older apps and they do instantiate third party modules after instantiating the rootView and the bridge. Also, there is the new architecture during launch time that may have some relevance here, perhaps they need to be launched before any third party modules are initialized.

## References
1. https://www.npmjs.com/package/patch-package
2. https://www.buymeacoffee.com/carlosalmonte04
