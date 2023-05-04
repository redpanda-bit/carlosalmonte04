---
![Mario Brothers graphic displayed within MacOS application](https://miro.medium.com/v2/resize:fit:720/format:webp/1*WRrcFK7-t_eIxsU6fjtGyQ.jpeg)

# Notes - Graphics revolution - Frontend Depths
https://medium.com/@carlosalmonte04/notes-graphics-revolution-frontend-depths-2024d4befcb3

As frontend developers, we rely on so much abstraction that is stripped from our understanding. We learn writing code that tells devices how an animation should look like, as opposed to telling devices how to achieve such animation. In order to gain more knowledge of these abstractions I decided to post my notes related to how screens work, how they are able to display frames and also how they produce the impression of motion.

These notes are almost all from the book Code: The Hidden Language of Computer Hardware and Software.

https://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0735611319

_**Warning: in order to hack the frame that is currently displaying you need a jailbroken device with access to the framebuffer. The following post was very helpful in understanding more about 'hacking' the framebuffer: https://bellis1000.medium.com/exploring-the-ios-screen-frame-buffer-a-kernel-reversing-experiment-6cbf9847365.**_

## How do screens work?

## Static frame
Frames are made up of pixels, each carrying a value representing a color. Subsequently, most real-world colors are a combination of various levels of red, green and blue. In practice, pixel values can be stored using 2 bytes per pixel, this way you could allocate 5 bits for each primary color (with 1 bit left over; 5 bits x 3 colors = 15bits + 1bit left over). This scheme is often referred to as high-color or thousands of colors. 15 bits allows for 32,768 possible color variations.

The next step is to use 3 bytes per pixel or 1 byte for each primary. This encoding scheme results in 256 colors of red, 256 colors of blue and 256 colors of red. This is often referred to as full color or millions of colors; 3 bytes allow for 16,777,216 (256³) color variations to be precise.

The number of bits per pixels is called color-depth or color resolution.

We usually use the full color scheme in frontend development when declaring colors. It is common to see them being represented as 6 hexadecimals characters, each representing 4 bits which are equivalent to 3 bytes or 24 bits, giving us the full color or millions of colors variations.

Here is a useful picture showing pixel and their RGB values.

![RGB pixel values for a given picture](https://miro.medium.com/v2/resize:fit:720/format:webp/1*gWN-uIMvW2V71TkWD7mKwg.png)

The very first pixel in the picture has a value red: 34, green: 32, and blue: 79 can be represented as red: 0b00100010=34, green: 0b00100000=32, and blue: 0b01001111=79. Altogether: 0b001000100010000001001111=2,236,495 or in hex #22204f. Somewhere in our devices there is a data structure containing this binary number, one for each pixel in the screen, this location in our device is called the framebuffer and usually its values are transferred to the screen driver where they are converted to analog voltages mapped to the different colors.

Timing parameters for the 640x480 resolution along with RGB values for a horizontal line of pixelsIf you wanted to hack the device's screen and draw/write on top of existing frames, the framebuffer is a good starting place. See this post if you would like some knowledge on modifying the framebuffer. - for security reasons, the framebuffer is unreachable unless you jailbreak your device.

This explains static images, what happens when something in the screen moves?

## Motion
The image of a video display is actually components of a single continuous beam of light that sweeps across the screen very rapidly. It begins in the upper left corner and moves across the screen to the right, whereupon it zips back to the left to begin the second line. Each horizontal line is known as the scan line. The movement back to the beginning of each of those lines is known as the horizontal retrace. When the beam finishes at the bottom line, it zips from the lower right corner of the screen to the upper left corner, this movement is known as the vertical retrace and it is the last event of the frame drawing before the process starts over.

![the process of drawing a frame](https://miro.medium.com/v2/resize:fit:640/format:webp/1*_sYCxKo5UaLA6PeRRxEnvQ.jpeg)

This process allows the display of a new frame 60 times per second. Each new frame independent from the last one. Each frame carried by a process fast enough that it appear as a fluid motion on the screen.

![Cece, Coach and Nick from New Girl - Coach shaking shoulders - reverse loop](https://giphy.com/gifs/foxtv-new-girl-coach-ylyUQniEurdl6EmhwI)

I don't have a technical fun picture for motion hacking. Sorry.

---

Knowing all of this information is entertaining and useful for educational purposes. The APIs that are given to us by operating systems and mobile languages such as swift and kotlin are already extensible enough that we rarely run into a case where more features are needed. However, having access to framebuffer can enable reading contents of other  apps currently on display which can be useful for app-to-app communication, "when the user is on instagram and a picture of x type shows, present a message from an instagram independent app".

Furthermore, having access to the framebuffer can be security risk. If all the contents on the screen are accessible from an app, any other app can steal sensitive information that is shown in the screen. Which is one of the reason why operating systems do not expose the framebuffer by default.

# Conclusion
Knowing the hardware limitations and understanding how screen works might give you an advantage over other engineers who do not know the hardware. There are ways to jailbreak devices and have access to what is known as the framebuffer. This data structure is what determines the frame on the screen at a given point in time. Making modifications to the framebuffer will reflect on the contents of the screen. Lastly, accessing the framebuffer is a security risk given that it may expose the contents of another private information carrying app such as banking or health related apps.
References
1. https://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0735611319
Exploring the iOS screen frame-buffer– a kernel reversing experiment
It's been over two years since I last published a blog, so I thought I'd give this another go in 2020 and kick it off…bellis1000.medium.com
