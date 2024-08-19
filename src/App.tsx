import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TodolistType = {
    todoId: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}
export type   FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { todoId: todolistID1, title: 'What to learn', filter: 'all' },
        { todoId: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })



    const changeFilter = (filter: FilterValuesType, todoId: string) => {
        setTodolists(todolists.map(tl => (tl.todoId === todoId ? {...tl, filter} : tl)))
    }


    const removeTask = (taskId: string, todoId: string) => {
        setTasks({...tasks,
        [todoId]: tasks[todoId].filter(task => task.id !== taskId)
        })
    }

    const addTask = (taskTitle: string, todoId: string) => {
       const newTask = {
            id: v1(),
            title: taskTitle,
            isDone: false,
       }
       setTasks({...tasks,
           [todoId]: [newTask, ...tasks[todoId]]
       })

    }

    const changeTaskStatus = (taskId: string, newStatusValue: boolean, todoId: string) => {
       setTasks({...tasks,
           [todoId] : tasks[todoId].map(task => (task.id === taskId ? {...task, isDone: newStatusValue} : task))
       })
    }

    const removeTodolist = (todoId: string) => {
        setTodolists(todolists.filter(todo => todo.todoId !== todoId))
        delete  tasks[todoId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todolists.map(todolist => {
                    const allTodolistTasks = tasks[todolist.todoId]
                    let tasksForTodolist = allTodolistTasks
                    if (todolist.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(task => task.isDone === false)
                    }
                    if (todolist.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(task => task.isDone === true)
                    }
                    return (
                        <Todolist
                            todolistId={todolist.todoId}
                            key={todolist.todoId}
                            title={todolist.title}
                            tasks={tasksForTodolist}
                            date={'30.01.2024'}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={todolist.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
