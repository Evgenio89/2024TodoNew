import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import React, {ChangeEvent, useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TodolistType = {
    todolistId: string,
    title: string
    tasks: Array<TaskType>
    date?: string
    removeTask: (taskId: string, todoId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (taskTitle: string, todoId: string) => void
    changeTaskStatus: (taskId: string, newStatusValue: boolean, todoId: string) => void
    filter: FilterValuesType
    removeTodolist: (todoId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}


export const Todolist = ({
                             title,
                             tasks,
                             date,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             todolistId,
                             removeTodolist,
                             updateTask,
                             updateTodolist,
                         }: TodolistType) => {



    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskCallback = (title: string) => {
        addTask(title, todolistId)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }


    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3>
                    <EditableSpan value={title} onChange={updateTodolistHandler}/>
                </h3>
                <Button title={'x'} onClick={removeTodolistHandler} />
            </div>

        <AddItemForm addItem={addTaskCallback} />

            {tasks.length === 0 ? (
                <p>Тасок нет !</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id, todolistId)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, todolistId)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todolistId, task.id, title)
                        }

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                <Button title={'X'} onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => changeFilterTasksHandler('all')}
                />
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => changeFilterTasksHandler('active')}
                />
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => changeFilterTasksHandler('completed')}
                />
            </div>
            <div>{date}</div>
        </div>
    )
}