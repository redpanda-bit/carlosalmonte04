![tools with emoji-like texture as main post image](https://cdn-images-1.medium.com/max/800/1*L_cBCqPkdlCNbHJ5gtSwpw.png)

# Frames in react native - iOS
LINK TO MEDIUM POST

When an animation experiences a noticeable interruption in the sequence of frames is called a hitch. A hitch takes place when the calculation of the new frame takes longer than expected, causing the new frame to be displayed past the deadline. These calculations can take place during the commit phase or render phase of the render loop (=user event - > user event handled by the application to determine UI changes - > new frame with UI changes created by the operating system to be displayed on the screen -> wait for user event).

![render loop iOS](https://cdn-images-1.medium.com/max/800/1*_xIPTZJDQ3Uv6juxZTqlEg.png)

The commit phase happens inside our application in response to user events. This can be native react native code, including the native code that communicates with the JavaScript side of the app. If there is faulty code blocking the flow of the animation in the JavaScript code we write, this can subsequently affect the length of the commit phase.

The render phase has to do with GPU related code, technically outside of our direct control. However, we can speed up the render phase by avoiding the usage of styles that are more difficult to calculate such as visual effects, dynamic shadows, and rounded rectangles. These use what is called offscreen render and this makes the render phase take extra time to compute required styling by rendering the layer somewhere else and then copying it over to the final texture. These are probably more noticeable as the app grows in complexity.

**Be mindful that Instruments will not tell you the specific line of code that need investigation but the phase that caused the animation hitch. Thorough investigation may be needed in order to successfully debug the hitch. **


![Homer Simpson using scare tactics to cure Marge :)](https://media.giphy.com/media/3o6MbehxBdCnpDxOWA/giphy.gif)

---

## Instruments, hitches

1. Build your react native application on xcode for profiling by selecting Product > Profile.

![build using the profile option, Product tab option and Profile option highlighted](https://cdn-images-1.medium.com/max/800/1*-sUMtoce8pXmdPRz5-OZVA.png)

Instruments will open automatically after the build is finished.

2. Select the Animation Hitches template and click Choose. This panel opens when the build is finish otherwise, select File > New on Instruments.

![new profile session template selector, Animation Hitches option and Choose button highlighted](https://cdn-images-1.medium.com/max/800/1*-sUMtoce8pXmdPRz5-OZVA.png)

3. Start recording by pressing the red circle at the top left hand corner and wait for Instruments to automatically start the app.

![timeline waiting for events to be recorded, recording button highlighted](https://cdn-images-1.medium.com/max/800/1*WD674XgcdikYdAciAh3cuw.png)

4. Once the app has launched, start using using the app, especially around screens that are prone to experiencing hitches.
5. Stop recording on Instruments by pressing the gray square at the top left hand side. If your app experienced hitches, you should end up with a timeline similar to this.

![timeline after succesfully recording events, positive checkmark](https://cdn-images-1.medium.com/max/800/1*CXcIM2lsx6vV0ajlV1q2tw.png)

My app experienced three hitches as you can see in the table at the bottom. It had three timelines; a) Hitches, b) Display 1, c) and Display 2
a) The hitches timeline shows the hitches
b and c) I am not sure why there are two Display timelines. However, the Display timeline shows the frames that were actually shown on display along with the red colored VSYNCs at the bottom. Here is a zoomed in picture:

![VSYNCs highlighted](https://cdn-images-1.medium.com/max/800/1*0wSFUGPpRQySR0wW6vlpoA.png)

VSYNC seems to be the equivalent of vertical retrace, when the screens finishes drawing at the bottom line and zips from the lower right corner of the screen to the upper left corner to start drawing the next frame. I counted the lines and they are about 60/second, (= refresh rate of 60Hz)
Here is my hitches timeline.

![hitch with 1 frame of latency due to pre-commit latency, length of precommit latency and expected frame location highlighted](https://cdn-images-1.medium.com/max/800/1*dUNAVNV7uxZBvLLtKkfzAA.png)

In my example above, I would explore methods related to the input event processed by the application. I do not know if this can be caused by the way react native is handling input events or by the way the operating system is handling. However, I would start by cleaning up user input handlers on the JavaScript side - my example app is very small and new, therefore the latency can either be in the native side of react native or the operating system, either iOS or MacOS since I ran the app on an emulator.

Unfortunately, this does not tell the specific code that is causing the delay. These timeline elements serve as a guideline on what to explore in order to enhance the performance of our app.

## Conclusion

Your react native iOS app is prone to experiencing interruptions on its animations, these hitches can occur either during the commit phase or render phase of the iOS render loop. Commit hitches are usually found in the application, either natively, however by definition it also means JavaScript can cause commit hitches by making the native side wait too long for messages.

Hitches in the render phase are caused by computationally expensive styling such as shadows, filters such as blur, and rounded squares. These all require offscreen passes where the renderer needs to create the layer separately off of the final texture and copy it back to the final texture.

![offscreen pass as a result from using shadows from apple](https://developer.apple.com/videos/play/tech-talks/10857/Hitch) type is one of the most important pieces of information you will receive from Instruments. This will guide you to whether look into the JavaScript code in event handlers, styling code or possible limitations of framework or operating system.

## References:
1. https://developer.apple.com/videos/play/tech-talks/10855
2. https://developer.apple.com/videos/play/tech-talks/10856
