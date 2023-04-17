![tic-tac-toe with animation keyframes as circles https://dribbble.com/shots/5536601-Tic-Tac-Toe](https://cdn-images-1.medium.com/max/800/1*uajloqjAHUBCVKC8RQ2lhw.png)

# Frames in react native - Android
https://medium.com/@carlosalmonte04/frames-in-react-native-android-7b5c4429378e

Animations are a bunch of images displayed in order at such speed that it seems like a fluid motion. When it takes too long to figure out the next image will be, the animation experiences a noticeable interruption by appearing as if the fluid motion was stuck. This experience is a result of the same frame being displayed for longer than expected.

Devices have a predetermined **refresh rate** which is the speed different images can be shown to the user. This speed is measured in Hertz and it is equivalent to times per second; 60Hertz = 60 times per second. In react native, just as with any other mobile frameworks, a new frame must be displayed at a speed of at least 24Hertz. This is near the lower edge of what is comfortably viewable without noticeable interruption. 

Here is a gif with overlapping frames that might help deliver the idea, feel free to skip it if it does not make sense. More noticeable in the actor's left hand leaving a trace very fast, frame-by-frame-look-a-like.

![animation frames overlapping to give a sense of high speed](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTA3YjM5NTZlYWIxMGY2YWZiN2ZjZTNmZGRiOWE2Y2E1NGM0YmYxYiZjdD1n/8LbYKVeqQkKRi/giphy.gif)

There is enough margin of error between the visual perception of a faulty motion, 24Hertz, and the common refresh rate of 60Hertz. This allows for lifecycle events such as shouldComponentUpdate or any other animation-related lifecycle events to run and not affect the animation enough to be noticeable to our eyes.

'**Janky frames**' and '**hitches**' are the names for moments in the animation where the next frame was not displayed at the expected time, resulting in a janky frame on Android or a hitch on iOS.

To debug these faulty animations on react native you will need the Profiler on Android Studio for Android and Instruments for iOS. I will leave Instruments for iOS for another post.

## Android Profiler

Use the Android profiler to detect janky frames on android.

1. On Android studio go on View -> Tool Windows -> Profiler.

![View, Tool Windows, Profiler highlighted](https://cdn-images-1.medium.com/max/800/1*eSUlbmFIJ8890QaMr5Yrfw.png)

2. With an emulator or device open proceed to start a new session by attaching a process.

![plus sign on sessions, emulator and target process highlighted](https://cdn-images-1.medium.com/max/800/1*ZjwMVc2-jmNqK6wCrXbfUQ.png)

3. Click anywhere in the **CPU timeline** to bring up different recording options. You will need to record some interactions in the phone/emulator soon.

![CPU timeline highlighted](https://cdn-images-1.medium.com/max/800/1*fLJs0CEGgVW0oKj6nPgP4g.png)

4. This will bring up different recording options **Select System Trace**, prepare yourself to record some interactions, have the emulator or device ready, then **hit record**.

![new recording session, System Trace and Record highlighted](https://cdn-images-1.medium.com/max/800/1*RRz6XZ4igxcvO5ZoulXRyg.png)

5. When you have recorded the interactions you need to debug **press Stop**.

![Stop recording highlighted](https://cdn-images-1.medium.com/max/800/1*w5j2sgVJCCdwYWCkNAQsqw.png)

You should now be able to **see Janky frames** under Display.

![Janky frames timeline highlighted after recording parsed](https://cdn-images-1.medium.com/max/800/1*kiAJSNkWC8NUPG9SFghr3A.png)

If Janky frames do not show, it is probably because no Janky frames were recorded. Make sure you record some interactions in the emulator/device running your app.

6. Click on any of the Janky frames and there you will see frame information along with expected and actual duration. Pay close attention to long events in the thread of your application and also in the RenderThread. Zoom in using W to see the names of the native events.

![function traversal selected to show function going over expected VSYNC](https://cdn-images-1.medium.com/max/800/1*p-pkQ_G6lj1Wj9rerypCNQ.png)

In the example above I would consider investigating why traversal is and its child function calls that are causing traversal to use more than one VSYNC - the gray/black divisions where refreshes take place. This function, traversal which I did not write, takes place in the application thread as opposed to the RenderThread thread. This traversal function seems to be called within this [Android provided API](https://medium.com/r/?url=https%3A%2F%2Fcs.android.com%2Fandroid%2Fplatform%2Fsuperproject%2F%2B%2Fmaster%3Aframeworks%2Fbase%2Fcore%2Fjava%2Fandroid%2Fview%2FChoreographer.java%3Bl%3D742).

Next up I would suggest understanding what these long functions do and how to alter their behavior, if possible, so that one can make them run faster and deliver the next frames before their deadline. However, there may be the case where one might not have control such long running functions from the JavaScript side.

# Conclusion
Animations are a sequence of images displayed one after the other. This sequence is determined real time as the animations take place. And if the speed of the animation falls to 24 frames/second or lower the user will experience a Janky frame which is an interruption in the fluid motion.

There are multiple reasons as to why a Janky frame might occur, upon investigation, you should be able to determine what function is taking longer than expected, and also if this function is taking place in the application thread or the RenderThread thread. Also, debugging any of these long running functions regardless of the thread requires knowledge react native developers might not be used to, myself included. Nonetheless, there exist the possibility of not having direct control over the identified long running function from the JavaScript side. And this may thus require to visit the Kotlin/Java/C++ side of the react native app, including operating system code APIs such as [Choreographer](https://medium.com/r/?url=https%3A%2F%2Fdeveloper.android.com%2Freference%2Fandroid%2Fview%2FChoreographer).

There are many things in this post that are blurry to me, like why aren't the function rectangles right next to each other if functions are supposed to be in continuous execution right after another.
