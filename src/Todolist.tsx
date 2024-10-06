import {FilterValuesType, TaskType} from "./App";

import React, {ChangeEvent, useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { Checkbox } from '@mui/material';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'


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
               <IconButton onClick={removeTodolistHandler}>
                   <DeleteIcon />
               </IconButton>
            </div>

        <AddItemForm addItem={addTaskCallback} />

            {tasks.length === 0 ? (
                <p>Тасок нет !</p>
            ) : (
                <List>
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
                            <ListItem
                                key={task.id}
                                disableGutters
                                disablePadding
                                className={task.isDone ? 'is-done' : ''}
                            >
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                {/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <div>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterTasksHandler('all')}
                >
                    All
                </Button>

                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterTasksHandler('active')}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterTasksHandler('completed')}
                >
                    Completed
                </Button>
            </div>
            <div>{date}</div>
        </div>
    )
}