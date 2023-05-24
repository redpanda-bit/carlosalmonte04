import * as React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';


import TodoList from './components/TodoList'
import Form from "./components/Form"


const DATA = [
  {title: "shift notes", originalTitle: "shift notes"},
  {title: "security check", originalTitle: "security check"},
  {title: "packages", originalTitle: "packages"},
  {title: "inventory", originalTitle: "inventory"},
];

const reducer = (state, action) => {
  switch(action.type) {
    case "complete":
      return {
        ...state,
        data: state.data.map(task => {
          if(task.title === action.payload) {
            return {...task, status: "completed"}
          }
          return task;
        })
      }
    case "incomplete":
      return {
        ...state,
        data: state.data.map(task => {
          if(task.title === action.payload) {
            return {...task, status: "incomplete"}
          }
          return task;
        })
      }
    case "duplicate": {
      const task = state.data.find(task => task.title === action.payload);
      const getTitle = (title) => {
        if(state.data.find(task => task.title === title)) {
          const num = (task.repeated || 0) + 1;
          task.repeated++
          return getTitle(title + num)
        }
        return title
      }
      return {
        ...state,
        data: [...state.data.map(task => {
          if(task.title === action.payload) {
            return {
              ...task,
              repeated: task.repeated + 1
            }
          }
          return task
        }), {title: getTitle(task.originalTitle), originalTitle: task.originalTitle}]
      }
    }
    case "add":
      return {
        ...state,
        data: [...state.data, {title: action.payload, originalTitle: action.payload}]
      }
    case "delete":
      return {
        ...state,
        data: state.data.filter(task => task.title !== action.payload)
      }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {data: DATA});
  const onAction = React.useCallback((title, actionType) => {
    dispatch({type: actionType, payload: title})
  },[])
   
  return (
    <>
      <TodoList
        data={state.data}
        onAction={onAction}
      />
      <Form onAction={onAction} />
    </>
  );
}
