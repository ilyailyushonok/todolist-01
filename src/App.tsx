import './App.css'
import {TaskType, TodolistItem} from "./components/TodolistItem.tsx";
import {useReducer, useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm.tsx';
import AppBar from '@mui/material/AppBar';
import {
    Box,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {NavButton} from './components/NavButton.tsx';
import {green, purple} from '@mui/material/colors';
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from './model/TodolistsReducer.ts';
import {
    addNewTodolistTasksAC, changeTaskStatusAC,
    changeTaskTitleAC,
    createItemAC,
    deleteTaskAC,
    tasksReducer
} from './model/tasksReducer.ts';


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

    const initialTodolistsState: TodolistType[] = [
        {id: todolistId_1, title: 'todolist', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ]
    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, initialTodolistsState)

    // const [tasks, setTasks] = useState<TaskStateType>({
    //         [todolistId_1]: [
    //             {taskId: v1(), title: "HTML", isDone: true},
    //             {taskId: v1(), title: "CSS", isDone: true},
    //             {taskId: v1(), title: "TS", isDone: false},
    //         ],
    //         [todolistId_2]: [
    //             {taskId: v1(), title: "Meat", isDone: true},
    //             {taskId: v1(), title: "Beer", isDone: true},
    //             {taskId: v1(), title: "Cucumber", isDone: false},
    //         ]
    //     }
    // )
    const initialTasksState:TaskStateType={
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
const [tasks,dispatchTasks]=useReducer(tasksReducer,initialTasksState)
    const deleteTask = (taskId: string, todolistId: string) => {
        // const todolistTasks:Array<TaskType>=tasks[todolistId]
        // const  filteredTasks:Array<TaskType>=todolistTasks.filter(t=>t.id!==taskId)
        // const nextState:TaskStateType={...tasks,[todolistId]:tasks[todolistId]:filteredTasks}
        // setTasks(nextState);
        //сокращенно=>
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].filter(t => t.taskId !== taskId)
        // })
        dispatchTasks(deleteTaskAC(taskId, todolistId))
    };

    const createItem = (title: string, todolistId: string) => {
        //     setTasks({
        //         ...tasks,
        //         [todolistId]: [{taskId: v1(), title, isDone: false}, ...tasks[todolistId]]
        //     })
        // }
        dispatchTasks(createItemAC(title, todolistId))
    }
    //update status
    const changeTaskStatus = (taskId: string, todolistId: string) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map((t) => {
        //         return t.taskId === taskId ? {...t, isDone: !t.isDone} : t;
        //     })
        // })
        dispatchTasks(changeTaskStatusAC({taskId, todolistId}))
    };


    const changeTodolistFilter = (newFilterValue: FilteredType, todolistId: string) => {
        dispatchTodoLists(changeTodolistFilterAC({filter: newFilterValue, id: todolistId}))
    }
//delete todolist
    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchTodoLists(action)
        delete tasks[todolistId]
    }
    //create todolist
    const createTodolist = (title: string) => {
        const newTodolistId = v1()
        const action = createTodolistAC(title, newTodolistId)
        dispatchTodoLists(action)
        // setTasks({...tasks, [newTodolistId]: []})
dispatchTasks(addNewTodolistTasksAC(newTodolistId))
    }
    //update task title
    const changeTaskTitle = (taskId: string, todolistId: string, title: string) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map((t) => {
        //         return t.taskId === taskId ? {...t, title} : t;
        //     })
        // })
        dispatchTasks(changeTaskTitleAC({taskId,todolistId,title}))
    }
    //update todolist title
    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatchTodoLists(changeTodolistTitleAC({title, id: todolistId}))
    }

    const todoListsComponents = todoLists.map(tl => {
        let filteredTasks: Array<TaskType> = tasks[tl.id]; //[]

        if (tl.filter === 'active') {
            filteredTasks = tasks[tl.id].filter(task => !task.isDone)
        }
        if (tl.filter === 'completed') {
            filteredTasks = tasks[tl.id].filter(task => task.isDone)
        }
        return (
            <Grid key={tl.id}>
                <Paper elevation={8} sx={{p: '15px'}}> {/*sx - атрибут для стилей css*/}
                    <TodolistItem title={tl.title}
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
                </Paper>
            </Grid>
        )
    })
    //UI-Read
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    const theme = createTheme({
        palette: {
            primary: purple,
            secondary: green,
            mode: isDarkMode ? 'dark' : 'light',
        }
    })
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <Box>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton backGround={theme.palette.secondary.dark}>FAQ</NavButton>
                                <Switch color={'secondary'} onChange={() => setIsDarkMode(!isDarkMode)}/>
                            </Box>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container sx={{p: '15px 0'}}> {/*sx - атрибут для стилей css*/}
                        <AddItemForm createItem={createTodolist} maxTitleLength={10}/>
                    </Grid>
                    <Grid container spacing={2}>
                        {todoListsComponents}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default App