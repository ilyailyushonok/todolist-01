import './App.css'
import {TaskType, TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm.tsx';


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
                {taskId: v1(), title: "HTML", isDone: true},
                {taskId: v1(), title: "CSS", isDone: true},
                {taskId: v1(), title: "TS", isDone: false},
            ],
            [todolistId_2]: [
                {taskId: v1(), title: "Meat", isDone: true},
                {taskId: v1(), title: "Beer", isDone: true},
                {taskId: v1(), title: "Cucumber", isDone: false},
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
            [todolistId]: tasks[todolistId].filter(t => t.taskId !== taskId)
        })
    };

    const createItem = (title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: [{taskId: v1(), title, isDone: false}, ...tasks[todolistId]]
        })
    }

    //update status
    const changeTaskStatus = (taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((t) => {
                return t.taskId === taskId ? {...t, isDone: !t.isDone} : t;
            })
        })
    };


    const changeTodolistFilter = (newFilterValue: FilteredType, todolistId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter: newFilterValue} : tl));
    }

    const deleteTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
    //create todolist
    const createTodolist = (title: string) => {
        const newTodolistId = v1()
        setTodoLists([...todoLists, {id: newTodolistId, title, filter: 'all'}])
        setTasks({...tasks, [newTodolistId]: []})

    }
    //update task title
    const changeTaskTitle =(taskId: string, todolistId: string, title:string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((t) => {
                return t.taskId === taskId ? {...t, title} : t;
            })
        })
    }
    //update todolist title
    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, title} : tl));
    }

    const todoListsComponents = todoLists.map(tl => {
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
        return (
            <TodolistItem title={tl.title}
                          key={tl.id}
                          activeFilter={tl.filter}
                          tasks={filteredTasks}
                          id={tl.id}
                          deleteTask={deleteTask}
                          changeTodolistFilter={changeTodolistFilter}
                          createItem={createItem}
                          changeTaskStatus={changeTaskStatus}
                          deleteTodolist={deleteTodolist}
                          changeTaskTitle={changeTaskTitle}
                          changeTodolistTitle={changeTodolistTitle}
            />
        )
    })


    return (
        <div className="app">
            <AddItemForm createItem={createTodolist} maxTitleLength={10}/>
            {todoListsComponents}
        </div>
    )
}

export default App