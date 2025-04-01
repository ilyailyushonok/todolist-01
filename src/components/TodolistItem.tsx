import {AddItemForm} from "./AddItemForm.tsx"
import {TasksList} from "./TasksList.tsx";
import {FilterButtons} from "./FilterButtons.tsx";
import { TodoListTitle} from "./TodoListTitile.tsx";
import {FilteredType} from '../App.tsx';

type TodoListItemPropsType = {
    title:string
    tasks: Array<TaskType>
    deleteTask: (taskId:string,todolistId:string) => void
    changeTodolistFilter:(newFilterValue:FilteredType,todolistId:string)=>void
    createItem:(title:string,todolistId:string) => void
    changeTaskStatus:(taskId:string,todolistId:string) => void
    activeFilter:FilteredType
    deleteTodolist:(todolistId:string)=>void
    id:string
    changeTaskTitle:( id:string ,todolistId: string, title:string) => void
    changeTodolistTitle:(title: string, todolistId: string)=>void
}
export type TaskType={
    taskId:string
    title:string
    isDone:boolean
}


export const TodolistItem = ({changeTodolistTitle,changeTaskTitle,id,title,tasks,deleteTask,activeFilter,changeTodolistFilter,createItem,changeTaskStatus,deleteTodolist}:TodoListItemPropsType) => {
    return (
        <div>
            <TodoListTitle changeTodoTitle={(title:string)=>{changeTodolistTitle(title,id)}}  title={title} deleteTodoListCallback={()=>deleteTodolist(id)}/>
            <AddItemForm  createItem={(title:string)=>createItem(title,id)} maxTitleLength={12} />
            <TasksList changeTaskTitle={(taskId:string, title:string)=>changeTaskTitle(taskId,id,title)} tasks={tasks} deleteTask={(taskId:string)=>deleteTask(taskId,id)}
                       changeTaskStatus={(taskId:string)=>changeTaskStatus(taskId,id)}/>
            <FilterButtons activeFilter={activeFilter} changeTodolistFilter={(filter:FilteredType)=>changeTodolistFilter(filter,id)}/>
        </div>
    )
}