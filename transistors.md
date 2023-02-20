# JavaScript and Transistors

This text you are reading right now is stored somewhere in your device. Somewhere in the RAM there is a sequence of on/off elements that represent this blog post. And just how you read content on a piece of paper, you read the contents of your RAM through the screen. This is so seamless that we forget how physical this process is.

There is no magic behind it, this text is indeed physical just like the pages of a book, instead of ink and paper the contents are written into very tiny containers called transistors.

Transistors store electricity in different voltage levels depending on the content they store. In the 7400 chip for example, when a transistor voltage is between 0–0.8v it signifies a logical 0 or off state, if a transistor voltage is between 2–5v it signifies a logical 1 or on state [1]. Intel has created a very insightful video of the evolution of transistors, please feel free to watch it below.

[https://www.youtube.com/watch?v=Z7M8etXUEUU](https://www.youtube.com/watch?v=Z7M8etXUEUU)

When coding your next React Native component, don’t forget that you are controlling how electricity is stored in transistors. Even though we have little control over transistors from the JavaScript side, good engineering principles will also be reflected on the amount of transistors we use and the amount of clock cycles needed to execute an operation.

Similar to how ethereum smart contracts need a necessary amount of “gas” to perform an operation[3], CPUs need clock cycles to perform different tasks[2]. Once our JavaScript code gets eventually transformed into Assembly code, we are able to see the instructions and from there, if available in the CPU docs, we can determine the amount of clock cycles needed for each Assembly instruction. In the reference section below there is an example of how an Intel CPU cycle per instruction table looks like. Given this table you should be able to use a lower level debugging tool to see the Assembly instruction for your given JavaScript code and find the number of cycle given the different Assembly instructions.

The LLDB debugger `lldb` [4] is a useful tool that can be used to see the Assembly instructions we code using JavaScript. It helps us see all the work our JavaScript runtime is doing under the hood. For security reasons, we are only able to see the virtual space of the RAM and not the physical space. Nonetheless, it is a very valuable tool that enables conceptualizing the actual physics work that our JavaScript code creates inside our devices’ circuits.

In conclusion, knowing what goes beyond coding JavaScript can help understanding the physics of the content we consume on our devices. It is such a seamless process that we take for granted all and very small technology that goes behind it. The transistor is such a revolutionary element in information technology, its ability to hold electrons in the CPU allows us to store information and pass it along using electricity. We can use tools such as LLDB and CPU instruction performance tables to take a closer look at these actions in the virtual RAM space. This can help us see a representation of JavaScript code turned Assembly code with access to memory addresses and values which we can then conceptualize into transistors values.

## References:

Petzold, C. (2023). Code: The hidden language of computer hardware and software. Pearson Education, Inc. Page 253.
https://www.intel.com/content/www/us/en/docs/programmable/683620/current/instruction-performance-29083.html.
https://ethereum.org/en/developers/docs/gas/.
https://lldb.llvm.org/index.html.
