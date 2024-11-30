import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string,
    payload: any
}

let todolistID1 = v1()
let todolistID2 = v1()



const initialState: TodolistType[] = [
    { todoId: todolistID1, title: 'What to learn', filter: 'all' },
    { todoId: todolistID2, title: 'What to buy', filter: 'all' },
]

export  const todolistsReducer  = (state: TodolistType[] = initialState, action: ActionType) => {
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
            throw new Error(`Unknown action type ${action.type}`)
    }
}

