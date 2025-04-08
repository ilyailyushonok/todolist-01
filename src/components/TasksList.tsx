import {TaskType} from "./TodolistItem.tsx";
import {EditableSpan} from './EditableSpan.tsx';
import {Box, Checkbox, IconButton, ListItem} from '@mui/material';
import DeleteForever from "@mui/icons-material/DeleteForever";
import {getListItemSx} from './TasksList.styles';

type TasksListPropsType = {
    tasks: Array<TaskType>
    deleteTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}
export const TasksList = ({tasks, deleteTask, changeTaskStatus, changeTaskTitle}: TasksListPropsType) => {

    const taskList = tasks.length === 0
        ? <span>Ваш список пуст</span>
        : <ul>{tasks.map((task: TaskType) => {
            return (
                <ListItem key={task.taskId} disablePadding sx={getListItemSx(task.isDone)}>
                    <Box>
                        <Checkbox size={'small'} checked={task.isDone}
                                  onChange={() => changeTaskStatus(task.taskId, task.isDone)}/>
                        <EditableSpan changeTitle={(title: string) => changeTaskTitle(task.taskId, title)}
                                      title={task.title} classNames={task.isDone ? 'taskDone' : 'task'}/>
                    </Box>
                    <IconButton aria-label={'delete'}
                                size={'small'}
                                onClick={() => deleteTask(task.taskId)}>
                        <DeleteForever fontSize={'small'}/>
                    </IconButton>
                </ListItem>
            )
        })
        }</ul>

    return (
        <>
            {taskList}
        </>

    )
}