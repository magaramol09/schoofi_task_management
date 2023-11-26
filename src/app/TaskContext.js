import React, { useReducer, useContext } from 'react';
import { ActionTypes } from '../constants/ActionType';
const generateId = () => Date.now().toString();


const addTaskItem = (state, payload) => {
  return {
    ...state,
    taskList: {
      ...state.taskList,
      'To Do': [
        ...(Array.isArray(state.taskList['To Do']) ? state.taskList['To Do'] : []),
        { ...payload, id: generateId() },
      ],
    },
  };
};

const editTaskItem = (state, payload) => {
  const { id, title, description } = payload;

  const updatedLists = Object.keys(state.taskList).reduce((updated, key) => {
    updated[key] = state.taskList[key].map(task =>
      task.id === id ? { ...task, title, description } : task
    );
    return updated;
  }, {});

  return {
    ...state,
    taskList: updatedLists,
  };
};

const deleteTaskItem = (state, payload) => {
  const { id } = payload;

  const updatedLists = Object.keys(state.taskList).reduce((updated, key) => {
    updated[key] = state.taskList[key].filter(task => task.id !== id);
    return updated;
  }, {});

  return {
    ...state,
    taskList: updatedLists,
  };
};

const onTaskDragTaskItem = (state, { source, destination }) => {
  const [removed] = state.taskList[source.droppableId].splice(source.index, 1);
  state.taskList[destination.droppableId].splice(destination.index, 0, removed);
  return {
    ...state
  }
}

// const onSearchTaskItem = (state, keyword) => {

// }

const reducer = (state, action) => {
  switch (action.type) {

    case ActionTypes.ADD_TASK_ITEM:
      return addTaskItem(state, action.payload); 

    case ActionTypes.EDIT_TASK_ITEM:
      return editTaskItem(state, action.payload); 

    case ActionTypes.DELETE_TASK_ITEM:
      return deleteTaskItem(state, action.payload); 
    
    case ActionTypes.ON_TASK_DRAG:
      return onTaskDragTaskItem(state, action.payload); 

    default:
      return state; // Return the original state for unknown actions
  }
};


export const TaskContext = React.createContext();

const initialState = {
  taskList:{
    ['To Do']:[],
    ['In Progress']: [],
    ['Done'] : [],
  }
};

function TaskProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TaskContext.Provider value={[state, dispatch]}>
            {props.children}
        </TaskContext.Provider>
    );
}

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export default TaskProvider;
