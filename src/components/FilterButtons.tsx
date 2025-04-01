import {FilteredType} from '../App.tsx';

type FilterButtonsPropsType={
    changeTodolistFilter:(newFilterValue:FilteredType)=>void
    activeFilter:FilteredType
}
 export const FilterButtons=({changeTodolistFilter,activeFilter}:FilterButtonsPropsType)=>{
    return (
        <div>
            <button className={activeFilter==='all'?'btnAll':''}
                    onClick={()=>changeTodolistFilter('all')}>All</button>
            <button className={activeFilter==='active'?'btnActive':''}
                    onClick={()=>changeTodolistFilter('active')}>Active</button>
            <button className={activeFilter==='completed'?'btnCompleted':''}
                    onClick={()=>changeTodolistFilter('completed')}>Completed</button>
        </div>

    )
 }