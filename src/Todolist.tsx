import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import React, {ChangeEvent, useState} from "react";


export type TodolistType = {
    title: string
    tasks: Array<TaskType>
    date?: string
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}


export const Todolist = ({
                             title,
                             tasks,
                             date,
                             removeTask,
                             changeFilter,
                             addTask,
                         }: TodolistType) => {

    const [taskTitle, setTaskTitle] = useState("")

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>  ) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id)
                        }

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => changeFilterTasksHandler('all')}/>
                <Button title={'Active'} onClick={() => changeFilterTasksHandler('active')}/>
                <Button title={'Completed'} onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}