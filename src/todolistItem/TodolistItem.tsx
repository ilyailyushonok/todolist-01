import {AddTaskForm} from "./AddTaskForm.tsx";
import {TasksList} from "./TasksList.tsx";
import {FilterButtons} from "./FilterButtons.tsx";
import {TodoListTitile} from "./TodoListTitile.tsx";
import {FilteredType} from '../App.tsx';

type TodoListItemPropsType = {
    title:string
    tasks: Array<TaskType>
    deleteTask: (taskId:string) => void
    changeTodolistFilter:(newFilterValue:FilteredType)=>void
    createTask:(title:string) => void
    changeTaskStatus:(taskId:string) => void
    activeFilter:FilteredType

}
export type TaskType={
    id:string
    title:string
    isDone:boolean
}


export const TodolistItem = ({title,tasks,deleteTask,activeFilter,changeTodolistFilter,createTask,changeTaskStatus}:TodoListItemPropsType) => {
    return (
        <div>
            <TodoListTitile title={title}/>
            <AddTaskForm createTask={createTask} maxTitleLength={14} />
            <TasksList tasks={tasks} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
            <FilterButtons activeFilter={activeFilter} changeTodolistFilter={changeTodolistFilter}/>
        </div>
    )
}