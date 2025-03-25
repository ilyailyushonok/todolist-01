import {AddTaskForm} from "./AddTaskForm.tsx";
import {TasksList} from "./TasksList.tsx";
import {FilterButtons} from "./FilterButtons.tsx";
import {TodoListTitile} from "./TodoListTitile.tsx";
import {FilteredType} from '../App.tsx';

type TodoListItemPropsType = {
    title:string
    tasks: Array<TaskType>
    deleteTask: (taskId:string,todolistId:string) => void
    changeTodolistFilter:(newFilterValue:FilteredType,todolistId:string)=>void
    createTask:(title:string,todolistId:string) => void
    changeTaskStatus:(taskId:string,todolistId:string) => void
    activeFilter:FilteredType
    deleteTodolist:(todolistId:string)=>void
    id:string
    key?:string
}
export type TaskType={
    id:string
    title:string
    isDone:boolean
}


export const TodolistItem = ({id,title,tasks,deleteTask,activeFilter,changeTodolistFilter,createTask,changeTaskStatus,deleteTodolist}:TodoListItemPropsType) => {
    return (
        <div>
            <TodoListTitile  title={title} deleteTodoListCallback={()=>deleteTodolist(id)}/>
            <AddTaskForm createTask={(title:string)=>createTask(title,id)} maxTitleLength={12} />
            <TasksList tasks={tasks} deleteTask={(taskId:string)=>deleteTask(taskId,id)}
                       changeTaskStatus={(taskId:string)=>changeTaskStatus(taskId,id)}/>
            <FilterButtons activeFilter={activeFilter} changeTodolistFilter={(filter:FilteredType)=>changeTodolistFilter(filter,id)}/>
        </div>
    )
}