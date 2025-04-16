import {FilteredType, TodolistType} from '../App.tsx';

const initialState: TodolistType[] = []
export type TodolistActions = ReturnType<typeof deleteTodolistAC>|ReturnType<typeof createTodolistAC>|ReturnType<typeof changeTodolistTitleAC>|ReturnType<typeof changeTodolistFilterAC>

export const todolistsReducer = (
    todolists: TodolistType[] = initialState, action: TodolistActions): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist': {
            const {id} = action.payload
            return todolists.filter(tl => tl.id !== id)
        }
        case 'create_todolist': {
            const {id, title} = action.payload
            return [...todolists, {id, title, filter: 'all'}]
        }
        case 'change_todolist_title': {
            const {id, title} = action.payload
            return todolists.map(tl => tl.id === id ? {...tl, title} : tl)
        }
        case 'change_todolist_filter': {
            const {id, filter} = action.payload
            return todolists.map(tl =>
                tl.id === id ? {...tl, filter} : tl);
        }
        default:
            return todolists
    }
}

export const deleteTodolistAC = (id: string) => ({
    type: 'delete_todolist', payload: { id }}as const)

export const createTodolistAC = (title: string, id: string ) => ({
    type: 'create_todolist', payload: { id, title }}as const)

export const changeTodolistTitleAC=({title,id}:{title: string, id: string})=>(
    {type:'change_todolist_title', payload:{title,id}}as const)

export const changeTodolistFilterAC=({filter,id}:{filter: FilteredType, id: string})=>(
    {type:'change_todolist_filter', payload:{filter,id}}as const)

