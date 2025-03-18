

type TodoListTitilePropsType={
    title: string
}

 export const TodoListTitile=(props:TodoListTitilePropsType)=>{
    return (
        <h3>{props.title}</h3>

    )
 }