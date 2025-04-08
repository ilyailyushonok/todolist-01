import DeleteForever from '@mui/icons-material/DeleteForever';
import {EditableSpan} from './EditableSpan.tsx';
import {IconButton} from '@mui/material';


type TodoListTitlePropsType = {
    title: string
    deleteTodoListCallback: () => void
    changeTodoTitle: (title: string) => void
}

export const TodoListTitle = (props: TodoListTitlePropsType) => {
    return (
        <h3>
            <EditableSpan title={props.title} classNames={''} changeTitle={props.changeTodoTitle}/>
            <IconButton aria-label={'delete'}
                        size={'small'}
                        onClick={props.deleteTodoListCallback}>
                <DeleteForever/>
            </IconButton>
        </h3>

    )
}