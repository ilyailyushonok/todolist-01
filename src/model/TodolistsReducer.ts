
import {FilteredType, TodolistType} from '../App.tsx';

const initialState: TodolistType[] = []

export type DeleteTodolistAction = {
    type: 'delete_todolist'
    payload: {
        id: string
    }
}

export type CreateTodolistAction = {
    type: 'create_todolist'
    payload: {
        id: string
        title: string
    }
}
export type ChangeTodolistTitle = {
    type: 'change_todolist_title'
    payload: {
        id: string
        title: string
    }
}
export type ChangeTodolistFilter = {
    type: 'change_todolist_filter';
    payload: {
        id: string;
        filter: FilteredType;
    };
};


 export type TodolistActions = ReturnType<typeof deleteTodolistAC>|ReturnType<typeof createTodolistAC>|ReturnType<typeof ChangeTodolistTitleAC>|ReturnType<typeof ChangeTodolistFilterAC>


export const todolistsReducer = (
    state: TodolistType[] = initialState,
    action: TodolistActions
): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'create_todolist':
            return [...state, { id: action.payload.id, title: action.payload.title, filter: 'all' }]
        case 'change_todolist_title':
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'change_todolist_filter':
            return state.map(tl =>
                tl.id === action.payload.id
                    ? {...tl, filter: action.payload.filter} : tl);
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string): DeleteTodolistAction => ({
    type: 'delete_todolist',
    payload: { id }
}as const)

export const createTodolistAC = (title: string, id: string ): CreateTodolistAction => ({
    type: 'create_todolist',
    payload: { id, title }
}as const)

export const ChangeTodolistTitleAC=({title,id}:{title: string, id: string}):ChangeTodolistTitle=>(
    {type:'change_todolist_title',
        payload:{title,id}
    }as const
)
export const ChangeTodolistFilterAC=({filter,id}:{filter: FilteredType, id: string}):ChangeTodolistFilter=>(
    {type:'change_todolist_filter',
        payload:{filter,id}
    }as const
)

