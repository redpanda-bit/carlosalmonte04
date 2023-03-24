# JavaScript

JavaScript is a bit of a complex language compared to more human-oriented languages such as ruby and python, or who knows, but maybe it feels that way because of the curly braces. Nonetheless, it is a pretty versatile language, it can be used in the frontend and backend.

Needless to say, there are tons of tools that depend on the language, react, react native, angular, vue, node, express, and so many more.

The common story out there is that its lack of typings makes it an unsafe language to use and it also increases the chances of developing buggy applications, I hate to spread this statement but if you are in software development you will probably hear it from somewhere else.

My argument to JS not being a strongly typed language is that not needing types makes it a lot easier to learn. Typed languages can be daunting to learn and require many more characters and required knowledge before seeing the effects of your code on the screen, to someone that has short attention span it can be very difficult. 

This is how a hello world example looks in C:
```c++
#include <stdio.h>
void main()
{
   printf("Hello World!\n");
}
```
Here is the same hello world in JS:
```javascript
const main = () => {
  console.log("Hello World!")
};
```

Not the best example but as you can see, no need to include stdio.h, no need for the type nor the return of 0 - not sure if the return 0 is needed in C but that's how IBM has it in their website.

This is just a hello world example, a backend that performs create/read/update/delete operations can have a significant amount of difference between the two implementations, enough that can hinder development time not only in writing but also in understanding for new software engineers.

# Conclusion
I continue sticking to JavaScript, even after 5 years of using the language as a primary source of work, I pair it with typescript and the fear of bugs goes away. I still have yet to understand its different engines and interpreters such as v8 and babel at source code level. Tools such as lldb provide lower level access to javascript but it is difficult getting around the source code provided by lldb without dynamic symbols files.
