import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type   FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks);
    }

    const addTask = (taskTitle: string) => {
       const newTask = {
            id: v1(),
            title: taskTitle,
            isDone: false,
       }
       setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newStatusValue: boolean) => {
        setTasks(tasks.map( task => task.id === taskId ? {...task, isDone: newStatusValue} : task))
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                date={'30.01.2024'}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
