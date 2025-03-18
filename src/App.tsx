import './App.css'
import {TaskType, TodolistItem} from "./todolistItem/TodolistItem.tsx";
import {useState} from 'react';
import {v1} from 'uuid';


export type FilteredType = 'all' | 'active' | 'completed'


function App() {
    console.log('renderApp')
    const todoListItem_1 = "What to learn";

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ])
    const deleteTask = (taskId: string) => {
        const nextState: Array<TaskType> = tasks.filter((task: TaskType) => task.id !== taskId);
        setTasks(nextState);
    };
    const [filter, setFilter] = useState<FilteredType>('all');
    let filteredTasks: Array<TaskType> = [];

    if (filter === 'all') {
        filteredTasks = tasks
    }
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }


    const changeTodolistFilter = (newFilterValue: FilteredType) => {
        setFilter(newFilterValue);
    }

    const createTask = (title: string) => {
        setTasks([ {id:v1(), title, isDone: false},...tasks])
    }


    //update status
    const changeTaskStatus = (taskId:string) => {
    const nextState:Array<TaskType>=tasks.map((t)=>{
    return t.id===taskId?{...t,isDone:!t.isDone}:t
})
        setTasks(nextState)
    }



    return (
        <div className="app">
            <TodolistItem title={todoListItem_1}
                          tasks={filteredTasks}
                          deleteTask={deleteTask}
                          changeTodolistFilter={changeTodolistFilter}
                          createTask={createTask}
                          changeTaskStatus={changeTaskStatus}
                          activeFilter={filter}
            />
        </div>
    )
}

export default App