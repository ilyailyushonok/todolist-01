import { v1 } from 'uuid'
import { expect, test } from 'vitest'
import type { TodolistType } from '../App'
import { createTodolistAC, deleteTodolistAC, todolistsReducer } from './TodolistsReducer.ts'

let todolistId1: string
let todolistId2: string

let startState: TodolistType[] =[]
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
     startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})



test('correct todolist should be deleted', () => {
    // const todolistId1 = v1()
    // const todolistId2 = v1()

    // 1. Стартовый state
    // const startState: TodolistType[] = [
    //     { id: todolistId1, title: 'What to learn', filter: 'all' },
    //     { id: todolistId2, title: 'What to buy', filter: 'all' },
    // ]

    // 2. Действие
    //   const action: DeleteTodolistActionType = {
    //     type: 'delete_todolist',
    //     payload: {
    //       id: todolistId1,
    //     },
    //   }
    //   const action = DeleteTodolistAC(todolistId1)
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    // const todolistId1 = v1()
    // const todolistId2 = v1()
    //
    // const startState: TodolistType[] = [
    //     { id: todolistId1, title: 'What to learn', filter: 'all' },
    //     { id: todolistId2, title: 'What to buy', filter: 'all' },
    // ]

    const title = 'New todolist'
    const endState = todolistsReducer(startState, createTodolistAC(title, v1()))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})