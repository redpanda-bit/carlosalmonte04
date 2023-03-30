![detox-done-right](https://user-images.githubusercontent.com/25206487/228909029-043cbba8-2e16-4916-a391-0a41e7a59e79.jpeg)

# Testing react native apps
https://medium.com/@carlosalmonte04/testing-react-native-apps-6fa76d238097

Best case scenario your application is the most reliable application ever. It loads the data it needs to load and fails gracefully when it can't. Easier said than done. Having your application deliver what it promises at the speed you expect is a very difficult task.
"But it was working on my computer", of course, your environment is the only one with <insert unique tool that you also had to patch to have your app work>. _- if you have experienced try using containers._
  
In order to have your app work as expected, consistently and everywhere you have to test it.

Francine Smith from American Dad testing fan by inserting carrot through one end subsequently breaking the fanI recently created a codebase that should inspire scalability - either by leading as a good or bad example. I used typescript, common components, module-resolver to avoid complicated relative imports ../../../components, screens under routes and components under src/components, I am also expecting to add a frontend tool such as react-native-paper or another ui-components library that I choose from https://results.stateofreactnative.com/component-libraries/, you name it, even though it is in early stages I want this codebase to be an example of simplicity and scalability. But most importantly, I want this codebase to highlight the usage of test driven development using Detox. **It does not support iOS devices testing**. _However, I have worked on large scale apps that have released successfully using detox._
  
Detox is used for e2e testing and it works fairly well, it can mimic taps, tap and hold, drag into view and many other. These are called actions and you can find all the supported ones here https://wix.github.io/Detox/docs/api/actions and here below.

```
// {Expect}
// Detox uses matchers to find UI elements in your app 
// and actions to simulate user interaction with those elements.

.tap()
.multiTap()
.longPress()
.longPressAndDrag() iOS only
.swipe()
.pinch() iOS only
.scrollToIndex() Android only
.scroll()
  whileElement()
.scrollTo()
.typeText()
.replaceText()
.clearText()
.tapReturnKey()
.tapBackspaceKey()
.setColumnToValue() iOS only
.setDatePickerDate()
.adjustSliderToPosition()
.getAttributes()
.takeScreenshot(name)
 ```
  
If you would like to install Detox I highly recommend following their docs here, the tool is also recommended by the react native docs and I personally found detox docs to be very human-centric. They clearly state the steps needed to be taken to have the first test up and running, and they also account for common errors. 

---

## Conclusion
In order to have a scalable, production ready codebase testing is needed. I created a react native project that I am hoping to turn into my project-to-turn-to when creating new react native applications. As things in the react native world evolve, this project will need to be updated, there may be another hook introduced or maybe no hooks at all. On top of all, in this project I would like to emphasize the usage of detox in a test-driven development environment; create failing test, create code to pass the test and repeat cycle. Detox allows for many user actions and it has proven itself useful, however, keep it mind that it does not have support for ios physical devices.
  
After all, one thing that remains a bit ambiguous to me is how to have e2e and unit tests together in the same codebase. Some apps use the e2e directory to save all the detox related files and <unit>/__tests__ to save unit tests. Both testing approaches live in separate directories. More to come on this topic.

## References
1. https://github.com/carlosalmonte04/upgraded-octo-adventure
2. https://wix.github.io/Detox/docs/19.x/api/expect
3. https://results.stateofreactnative.com/component-libraries
4. https://reactnative.dev/docs/testing-overview#end-to-end-tests
