import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

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
    } as const
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))


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
    } as const
    const endState = todolistsReducer(startState, addTodolistAC(action.payload.title))

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
    } as const
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, action.payload.title))

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
    } as const
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, action.payload.filter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(action.payload.filter)
})

