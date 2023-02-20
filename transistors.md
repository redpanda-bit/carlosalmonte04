# JavaScript and Transistors
This text you are reading right now is stored somewhere in your device. Somewhere in the RAM there is a sequence of on/off elements that represent this blog post. And just how you read content on a piece of paper, you read the contents of your RAM through the screen. This is so seamless that we forget how physical this process is.

There is no magic behind it, this text is indeed physical just like the pages of a book, instead of ink and paper the contents are written into very tiny containers called transistors.

Transistors store electricity in different voltage levels depending on the content they store. In the 7400 chip for example, when a transistor voltage is between 0–0.8v it signifies a logical 0 or off state, if a transistor voltage is between 2–5v it signifies a logical 1 or on state [1]. Intel has created a very insightful video of the evolution of transistors, please feel free to watch it below.

[https://www.youtube.com/watch?v=Z7M8etXUEUU](https://www.youtube.com/watch?v=Z7M8etXUEUU)

When coding your next React Native component, don't forget that you are controlling how electricity is stored in transistors. Even though we have little control over transistors from the JavaScript side, good engineering principles will also be reflected on the amount of transistors we use and the amount of clock cycles - also a very important concept that determines speed of execution - needed to execute an operation.

In terms of CPU clock cycle, it may help to think of it similar to how smart contracts use "gas" to perform different tasks[2,3]. However, it is difficult to get a sense of clock cycles needed to run our JavaScript code without first seeing the machine code.

To get the machine code translation of our JavaScript we can use a lower level debugging tool such as LLDB lldb[4]. For security reasons, lldb only allows to see the virtual space of the RAM and not the physical space. Nonetheless, it is a very valuable tool that enables steping into machine code and matching each of the instructions to their required amount of clock Cycles. Please refer to intel reference at the bottom to see an example of an instruction-performance table.

In conclusion, knowing what goes beyond coding JavaScript can help understanding the physics of the content we consume on our devices. It is such a seamless process that we take for granted all the technology that goes behind it. The transistor is such a revolutionary element in information technology, its ability to hold electrons in the CPU allows us to store information and pass it along using electricity. Furthermore, we can use tools such as LLDB and CPU instruction-performance tables to take a closer look at JavaScript code in the virtual RAM space which can help us conceptualize the transistor values inside our devices.

## References:

1. Petzold, C. (2023). Code: The hidden language of computer hardware and software. Pearson Education, Inc. Page 253.
2. https://ethereum.org/en/developers/docs/gas/.
3. https://www.intel.com/content/www/us/en/docs/programmable/683620/current/instruction-performance-29083.html.
4. https://lldb.llvm.org/index.html.
