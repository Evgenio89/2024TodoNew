
import React, {ChangeEvent, useState} from "react";
import {Button} from "@mui/material";
import { TextField } from '@mui/material';


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
            <TextField
                label={'Enter a title'}
                variant={'outlined'}
                value={itemTitle}
                size={'small'}
                error={!!error}
                helperText={error}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            {/*<Button title={'+'} onClick={addItemHandler}/>*/}
            <Button variant="contained" onClick={addItemHandler}>
                +
            </Button>
        </div>
    )
}