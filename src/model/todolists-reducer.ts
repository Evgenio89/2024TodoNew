import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";



let todolistID1 = v1()
let todolistID2 = v1()



const initialState: TodolistType[] = [
    { todoId: todolistID1, title: 'What to learn', filter: 'all' },
    { todoId: todolistID2, title: 'What to buy', filter: 'all' },
]

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todoId: string
    },
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        todoId: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        todoId: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export  const todolistsReducer  = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todo => todo.todoId !== action.payload.todoId)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = { todoId: v1(), title: action.payload.title, filter: 'all' }

            return ([...state, newTodolist])
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todo => todo.todoId === action.payload.todoId ? {...todo, title: action.payload.title} : todo)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todo => todo.todoId === action.payload.todoId ? { ...todo, filter: action.payload.filter} : todo)
        }
        default:
            throw new Error(`Unknown action type ${typeof action}`)
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', payload: { todoId: todolistId } } as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', payload: { title } } as const
}

export  const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return  { type: 'CHANGE-TODOLIST-TITLE', payload: { todoId: todolistId, title} }as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return  {type: 'CHANGE-TODOLIST-FILTER', payload: {todoId: todolistId, filter: filter} }as const
}

