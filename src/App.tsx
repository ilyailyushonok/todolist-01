import './App.css'
import {TaskType, TodolistItem} from "./todolistItem/TodolistItem.tsx";
import {useState} from 'react';
import {v1} from 'uuid';


export type FilteredType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilteredType
}

export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {
    console.log('renderApp')

    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'todolist', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
            [todolistId_1]: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "TS", isDone: false},
            ],
            [todolistId_2]: [
                {id: v1(), title: "Meat", isDone: true},
                {id: v1(), title: "Beer", isDone: true},
                {id: v1(), title: "Cucumber", isDone: false},
            ]
        }
    )

    const deleteTask = (taskId: string, todolistId: string) => {
        // const todolistTasks:Array<TaskType>=tasks[todolistId]
        // const  filteredTasks:Array<TaskType>=todolistTasks.filter(t=>t.id!==taskId)
        // const nextState:TaskStateType={...tasks,[todolistId]:tasks[todolistId]:filteredTasks}
        // setTasks(nextState);
        //сокращенно=>
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })};

    const createTask = (title: string,todolistId:string) => {
        setTasks({...tasks,
            [todolistId]:[{id: v1(), title, isDone: false},...tasks[todolistId]]})
    }

    //update status
    const changeTaskStatus = (taskId: string,todolistId:string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((t) => {
                return t.id === taskId ? { ...t, isDone: !t.isDone } : t;
            })
        })};


    const changeTodolistFilter = (newFilterValue: FilteredType,todolistId:string) => {
        setTodoLists(todoLists.map(tl=>tl.id===todolistId?{...tl,filter:newFilterValue}:tl));
    }

const deleteTodolist=(todolistId:string)=>{
    setTodoLists(todoLists.filter(tl=>tl.id!==todolistId))
    delete tasks[todolistId]
}


const todoListsComponents=todoLists.map(tl=>{
    let filteredTasks: Array<TaskType> = tasks[tl.id]; //[]
    // if (tl.filter === 'all') {
    //     filteredTasks = tasks[tl.id]
    // }
    if (tl.filter === 'active') {
        filteredTasks = tasks[tl.id].filter(task => !task.isDone)
    }
    if (tl.filter === 'completed') {
        filteredTasks = tasks[tl.id].filter(task => task.isDone)
    }
    return(
        <TodolistItem title={tl.title}
                      key={tl.id}
                      activeFilter={tl.filter}
                      tasks={filteredTasks}
                      id={tl.id}
                      deleteTask={deleteTask}
                      changeTodolistFilter={changeTodolistFilter}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      deleteTodolist={deleteTodolist}
        />
    )
})

    return (
        <div className="app">
            {todoListsComponents}
        </div>
    )
}

export default App