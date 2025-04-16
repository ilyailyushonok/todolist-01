import {TaskStateType} from '../App.tsx';
import {createTodolistAC, deleteTodolistAC} from './TodolistsReducer.ts';


type ActionType = ReturnType<typeof deleteTodolistAC> | ReturnType<typeof createTodolistAC>

export const tasksReducer = (tasks: TaskStateType = {}, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'create_todolist': {
            const {id} = action.payload;
            return {...tasks, [id]: []}
        }
        case "delete_todolist": {
            const {id} = action.payload;
            const copyTasks={...tasks};
            delete copyTasks[id]
            return copyTasks;
        }
        default:
            return tasks
    }

};

