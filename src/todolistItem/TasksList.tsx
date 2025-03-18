import {TaskType} from "./TodolistItem.tsx";

type TasksListPropsType = {
    tasks: Array<TaskType>
    deleteTask: (taskId:string) => void
    changeTaskStatus: (taskId:string) => void
}

export const TasksList = ({tasks,deleteTask,changeTaskStatus}: TasksListPropsType) => {

    const taskList=tasks.length===0
        ?<span>Ваш список пуст</span>
        : <ul>{tasks.map((task: TaskType) => {
                return (
                    <li>
                        <input type="checkbox" checked={task.isDone} onChange={()=>changeTaskStatus(task.id)}/>
                        <span className={task.isDone?'taskDone':'task'}>{task.title}</span>
                        <button  onClick={()=>deleteTask(task.id)}>{task.title}</button>
                    </li>
                )})
            }</ul>

    return (
        <>
            {taskList}
        </>

    )
}