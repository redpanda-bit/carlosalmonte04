![lego blocks](https://miro.medium.com/v2/resize:fit:720/format:webp/1*bt_ay7Sdqalm9ljtd1rNzA.png)

# React components
https://medium.com/@carlosalmonte04/react-components-bd84591ef965


For many years, web developers used HTML for content, CSS for designs and JavaScript for logic, as logic and design increasingly became more complex and deterministic of content there was an increasing need to group all of these elements into a single place called components.

React components allow to have all the content, style, and logic needed in a single place. In addition to grouping these together, React components allow for the ‘modularization’ of these elements, meaning that React components can be reused in multiple parts of the code, therefore not needing to copy and paste the same code in different parts of the codebase.

React components are like the lego blocks in web development, each can either create their own logic for content or just serve as presentational elements that are solely responsible for displaying the content and not for running the logic to determine the content.

The distinction between presentational components and logic-responsible components was a while back called dumb vs smart components respectively. As React grew older and more experienced it favored presentational components over smart components, to the point that smart components are now considered the wrong way of creating React components.

Along with the Object properties and methods inherited from JavaScript, smart components also carry extended functions and properties from React component classes, many of which are usually not needed. Dumb components also carry less code boilerplate since they are just regular functions that return JSX markup.

Here is a quick comparison on how they look in code:

```
// dumb component
type MyProps = {
  name: string;
};
```
```
function Welcome(props: MyProps): JSX.Element {
  return <h1>Hello, {props.name}</h1>;
}
// smart component
type MyProps = {};
type MyState = {
  name: string;
};
class Welcome extends React.Component<MyProps, MyState> {
  state: MyState = {
    name: 'Alice',
  };

  render() {
    return <h1>Hello, {this.state.name}</h1>;
  }
}
```
One of the main reasons one might have chosen smart vs dumb components in the past could have been determined by need to use state, however, React hooks were created to allow dumb components to use state, therefore, eliminating one of the major reasons one might have chosen to create a smart component.

```
// from smart component
type MyProps = {};
type MyState = {
  name: string;
};
class Welcome extends React.Component<MyProps, MyState> {
  state: MyState = {
    name: 'Alice',
  };

  render() {
    return <h1>Hello, {this.state.name}</h1>;
  }
}
```
```
// to dumb component
function Welcome(): JSX.Element {
  const [name, setName] = useState<string>('Alice');
  return <h1>Hello, {this.state.name}</h1>;
}
```
Overall, React components provide a nice solution to the increasing complexity, visually and logically, of the content that we consume through our devices. React components also provide ‘modularization’, or simply put they allow for code to be reused in multiple parts of the codebase as opposed to copying and pasting the same and possibly extensive content on different parts of the codebase. React has also grown to favor the usage of dumb components to the point that dumb components are expected to be the most common type of component used in the codebase.

https://www.buymeacoffee.com/carlosalmonte04.

Reference: 

1. https://beta.reactjs.org/learn/writing-markup-with-jsx
