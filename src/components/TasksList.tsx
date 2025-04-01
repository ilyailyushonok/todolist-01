import {TaskType} from "./TodolistItem.tsx";
import {EditableSpan} from './EditableSpan.tsx';

type TasksListPropsType = {
    tasks: Array<TaskType>
    deleteTask: (taskId:string) => void
    changeTaskStatus: (taskId:string,isDone:boolean) => void
    changeTaskTitle:(taskId:string,title:string) => void
}

export const TasksList = ({tasks,deleteTask,changeTaskStatus,changeTaskTitle}: TasksListPropsType) => {

    const taskList=tasks.length===0
        ?<span>Ваш список пуст</span>
        : <ul>{tasks.map((task: TaskType) => {
                return (
                    <li>
                        <input type="checkbox" checked={task.isDone} onChange={()=>changeTaskStatus(task.taskId,task.isDone)}/>
                        <EditableSpan changeTitle={(title:string)=>changeTaskTitle(task.taskId,title)} title={task.title}  classNames={task.isDone?'taskDone':'task'}/>
                        <button  onClick={()=>deleteTask(task.taskId)}>x</button>
                    </li>
                )})
            }</ul>

    return (
        <>
            {taskList}
        </>

    )
}