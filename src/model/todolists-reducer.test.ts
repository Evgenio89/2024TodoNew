import {v1} from "uuid";
import {TodolistType} from "../App";
import {todolistsReducer} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const  startState: TodolistType[] = [
        { todoId: todolistId1, title: 'What to learn', filter: 'all' },
        { todoId: todolistId2, title: 'What to buy', filter: 'all' },
    ]
    const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoId: todolistId1,
        },
    }
    const endState = todolistsReducer(startState, action)


    expect(endState.length).toBe(1);

    expect(endState[0].todoId).toBe(todolistId2);

})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { todoId: todolistId1, title: 'What to learn', filter: 'all' },
        { todoId: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const action = {
        type: 'ADD-TODOLIST',
        payload: {
            title: 'New Todolist',
        },
    }
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(action.payload.title)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()


    const startState: TodolistType[] = [
        { todoId: todolistId1, title: 'What to learn', filter: 'all' },
        { todoId: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoId: todolistId2,
            title: 'New Todolist',
        },
    }
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(action.payload.title)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { todoId: todolistId1, title: 'What to learn', filter: 'all' },
        { todoId: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoId: todolistId2,
            filter: 'completed',
        },
    }
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(action.payload.filter)
})

