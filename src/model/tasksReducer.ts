import {TaskStateType} from '../App.tsx';
import {createTodolistAC, deleteTodolistAC} from './TodolistsReducer.ts';
import {v1} from 'uuid';


type ActionType = ReturnType<typeof deleteTodolistAC> |
    ReturnType<typeof createTodolistAC>|
    ReturnType<typeof deleteTaskAC>|
    ReturnType<typeof createItemAC>|
    ReturnType<typeof addNewTodolistTasksAC>|
    ReturnType<typeof changeTaskTitleAC>|
    ReturnType<typeof changeTaskStatusAC>

export const tasksReducer = (tasks: TaskStateType = {}, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'create_todolist': {
            const {id} = action.payload;
            return {...tasks, [id]: []}
        }
        case 'delete_todolist': {
            const {id} = action.payload;
            const copyTasks={...tasks};
            delete copyTasks[id]
            return copyTasks;
        }
            case 'delete_task':{
                const {taskId,todolistId} = action.payload ;
                return {
                    ...tasks,
                    [todolistId]: tasks[todolistId].filter(t => t.taskId !== taskId)
                }}
                case 'create_item_task':{
                    const {todolistId, title} = action.payload;
                    return {
                        ...tasks,
                        [todolistId]: [{taskId: v1(), title, isDone: false}, ...tasks[todolistId]]
                    }
                }
        case 'add_new_todolist_tasks':{
            const {todolistId} = action.payload;
               return  {...tasks, [todolistId]: []}
        }
        case 'change_task_title':{
            const {todolistId,title,taskId}=action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map((t) => {
                    return t.taskId === taskId ? {...t, title} : t})
            }}
        case 'change_task_status': {
            const { taskId, todolistId } = action.payload;
            return {...tasks, [todolistId]: tasks[todolistId].map((t) => {
                    return t.taskId === taskId ? { ...t, isDone: !t.isDone } : t })
            }}
        default:
            return tasks
    }
};

export const deleteTaskAC=(taskId: string, todolistId: string)=>{
   return{type:'delete_task' ,payload:{todolistId,taskId}} as const
}
export const createItemAC=(title: string, todolistId: string)=>{
   return{type:'create_item_task' ,payload:{todolistId,title}} as const
}
export const addNewTodolistTasksAC=( newTodolistId: string)=>{
    return{type:'add_new_todolist_tasks' ,payload:{todolistId:newTodolistId}} as const
}
export const changeTaskTitleAC=({taskId,todolistId,title}:{taskId: string, todolistId: string, title: string})=>{
    return{type:'change_task_title' ,payload:{todolistId,title,taskId}} as const
}

export const changeTaskStatusAC=({taskId,todolistId}:{taskId: string, todolistId: string})=>{
    return{type:'change_task_status' ,payload:{todolistId,taskId}} as const
}
