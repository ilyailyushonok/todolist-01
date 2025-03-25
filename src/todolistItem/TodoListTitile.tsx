

type TodoListTitilePropsType={
    title: string
    deleteTodoListCallback:()=>void
}

 export const TodoListTitile=(props:TodoListTitilePropsType)=>{
    return (
        <h3>{props.title}
        <button onClick={props.deleteTodoListCallback}>x</button>
        </h3>

    )
 }