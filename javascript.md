![javascript logo](https://miro.medium.com/v2/resize:fit:720/format:webp/1*382SpalMtZi337KjWyMQMA.png)
# JavaScript
https://medium.com/@carlosalmonte04/javascript-5c2966d2ff79

JavaScript is a bit of a complex language compared to more human readable languages such as ruby and python, but maybe it feels that way because of the curly braces. Nonetheless, it is a pretty versatile language, it can be used in the frontend and the backend.

Needless to say, there are tons of tools that depend on the language, react, react native, angular, vue, node, express, and so many more that are being written as I write this post. Some people might have negative opinions about the language, but there is a clear majority that are in favor.

The common story out there is that its lack of typings makes the language unsafe, unsafe in the sense that it increases the chances of developing buggy applications. And I hate to spread this negative statement but if you are in software development, if you don’t hear it from me you will most likely hear it from someone else.

My argument to JS not being a strongly typed language is that not using types makes it a lot easier to learn. Typed languages can be daunting to understand and require many more characters and required knowledge before seeing the effects of your code on the screen. To someone that has a short attention span it can be very difficult.

This is how a hello world example looks in C:
```C
/* C */
#include <stdio.h>
main()
{
  printf("Hello World!\n");
}
```
Here is the same hello world in JS:
```javascript
// javascript
const main = () => {
  console.log("Hello World!")
};
```
Not the best example, those two above look almost the same. The difference in these two languages is clearer once we see something like a full frontend/backend codebase or an algorithmic solution. However, to dig just a little bit deeper here is how with my JavaScript knowledge I thought about creating a function that returns a string:
```C
/* C */
#include <stdio.h>
main()
{
  printf("Hello World!\n");
  return "this is a string";
}
```
The code above would compile with two warnings:
```
hello.c:2:1: warning: type specifier missing, defaults to 'int' [-Wimplicit-int]
main()
^
hello.c:5:10: warning: incompatible pointer to integer conversion returning 'char [17]' from a function with result type 'int' [-Wint-conversion]
  return "this is a string";
         ^~~~~~~~~~~~~~~~~~
2 warnings generated.
```
This is what I end up doing to return a string from a function without any warnings:
```C
/* C */
#include <stdio.h>
const char* function()
{
  return "this is a string";
}

int main()
{
  printf("Hello World!\n");
  function();
  return 0;
}
```
_Quite an accomplishment for a JavaScript Engineer._

![Andy Bernard from The Office turning around to wink at the camera](https://media.giphy.com/media/B9KKBuOIp4zqI7Cll0/giphy-downsized-large.gif)

This is the JavaScript equivalent:
```javascript
// javascript
const functionJS = () => {
  return "this is a string";
}
functionJS();
```
The complexity in understanding the code for new engineers like myself is significant. To write the code above I had to learn what a string was in C, I had a few warnings about type specifier missing for main. To write more complex C code I would need to learn about pointers, reference values, different types, methods for a given type. And to be clear, these elements are crucial to develop good quality JavaScript code, however, JavaScript allows us to get by without needing to learn many of these elements.

## Conclusion
I continue sticking to JavaScript, even after 5 years of using the language as a primary source of work, I pair it with typescript and the fear of bugs goes away. I still have yet to understand its different engines and interpreters such as v8 and babel at source code level, however, I have gotten by without needing to learn JavaScript internals. In addition, tools such as lldb provide lower level access to JavaScript's execution during runtime but it is difficult getting around the source code provided by lldb, at least without debug symbol files. I recommend learning the language if you are even remotely thinking about becoming a web developer. We have AI tools that generate JS using a web interface, but I still thinking the community has not accepted them enough to rely on those tools 100% without needing some JavaScript knowledge.
