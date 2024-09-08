import {Button} from "./Button";
import React, {ChangeEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string) => void;
}


export  const AddItemForm = ({addItem}: AddItemFormType) => {

    const [itemTitle, setItemTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addItemHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addItemHandler()
        }
    }


    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <Button title={'+'} onClick={addItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}