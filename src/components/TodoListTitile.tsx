import {EditableSpan} from './EditableSpan.tsx';


type TodoListTitlePropsType={
    title: string
    deleteTodoListCallback:()=>void
    changeTodoTitle:(title:string) => void
}

 export const TodoListTitle=(props:TodoListTitlePropsType)=>{
    return (
        <h3>
            <EditableSpan title={props.title} classNames={''} changeTitle={props.changeTodoTitle}/>
        <button onClick={props.deleteTodoListCallback}>x</button>
        </h3>

    )
 }