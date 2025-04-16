import { beforeEach, expect, test } from 'vitest'
import type {TaskStateType} from '../App'
import {createTodolistAC, deleteTodolistAC} from './TodolistsReducer.ts';
import {tasksReducer} from './tasksReducer.ts';
import {v1} from 'uuid';

let startState: TaskStateType = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {taskId: '1', title: 'CSS', isDone: false},
            {taskId: '2', title: 'JS', isDone: true},
            {taskId: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {taskId: '1', title: 'bread', isDone: false},
            {taskId: '2', title: 'milk', isDone: true},
            {taskId: '3', title: 'tea', isDone: false},
        ],
    }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodolistAC('New todolist',v1()))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    // expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})