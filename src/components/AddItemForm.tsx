import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';
import Button from '@mui/material/Button';

type AddItemFormPropsType = {
    createItem: (title: string) => void
    maxTitleLength: number
}

export const AddItemForm = ({createItem, maxTitleLength}: AddItemFormPropsType) => {
    const [taskInput, setTaskInput] = useState('')
    const [error, setError] = useState(false)

    const isAddDisabled = !taskInput || taskInput.length > 10

    const onKeyDownHandler = () => {
        const trimmedTitle = taskInput.trim()
        if (trimmedTitle) {
            createItem(taskInput)
            setTaskInput('')
        } else {
            setError(true)
        }
    }
    const setItemInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskInput(e.currentTarget.value)
    }
    const onKeyDownItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isAddDisabled) {
            onKeyDownHandler()
        }
    }


    return (
        <div>
            <TextField variant={'outlined'} size={'small'}
                       label={`${maxTitleLength} символов максимум`} value={taskInput}
                       onKeyDown={onKeyDownItemHandler}
                       onChange={setItemInputHandler}
                       className={error ? 'error' : ''}
                       helperText={taskInput.length > maxTitleLength &&
                           <div style={{color: 'red'}}>избыточное количество символов</div>}
            />

            <Button variant={'contained'}
                    disabled={isAddDisabled}
                    onClick={onKeyDownHandler}
            >+
            </Button>

            {error && <div style={{color: 'red'}}>пустая строка!</div>}
            {/*{taskInput && <div>максимум {maxTitleLength} символов</div>}*/}
            {/*{taskInput.length > maxTitleLength && <div style={{color: 'red'}}>избыточное количество символов</div>}*/}
        </div>
    )
}

// export const AddItemForm = ({createItem}: AddItemFormPropsType) => {
//     const inputRef = useRef<HTMLInputElement>(null);
//     return (
//         <div>
//             <input ref={inputRef}/>
//             <button onClick={() => {
//                 if (inputRef.current && inputRef.current.value!=='') {
//                     createItem(inputRef.current.value)
//                     inputRef.current.value = ''
//                 }
//             }}>+
//             </button>
//         </div>
//     )
// }