import {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddTaskFormPropsType = {
    createTask: (title: string) => void
    maxTitleLength: number
}

export const AddTaskForm = ({createTask,maxTitleLength}: AddTaskFormPropsType) => {
    const [taskInput, setTaskInput] = useState('')
    const [error, setError] = useState(false)

    const isAddDisabled = !taskInput || taskInput.length > 10

    const onKeyDownHandler = () => {
        const trimmedTitle = taskInput.trim()
        if (trimmedTitle) {
            createTask(taskInput)
            setTaskInput('')
        } else {
            setError(true)
        }
    }
    const setTaskInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error&&setError(false)
        setTaskInput(e.currentTarget.value)
    }
    const onKeyDownTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isAddDisabled) {
            onKeyDownHandler()
        }
    }


    return (
        <div>
            <input placeholder={'Add Task'} value={taskInput}
                   onKeyDown={onKeyDownTaskHandler}
                   onChange={setTaskInputHandler}
                   className={error ? 'error' : ''}
            />

            <button disabled={isAddDisabled}
                    onClick={onKeyDownHandler}
            >+</button>

            {error && <div style={{color: 'red'}}>пустая строка!</div>}
            {taskInput && <div>максимум {maxTitleLength} символов</div>}
            {taskInput.length > maxTitleLength && <div style={{color: 'red'}}>избыточное количество символов</div>}
        </div>
    )
}

// export const AddTaskForm = ({createTask}: AddTaskFormPropsType) => {
//     const inputRef = useRef<HTMLInputElement>(null);
//     return (
//         <div>
//             <input ref={inputRef}/>
//             <button onClick={() => {
//                 if (inputRef.current && inputRef.current.value!=='') {
//                     createTask(inputRef.current.value)
//                     inputRef.current.value = ''
//                 }
//             }}>+
//             </button>
//         </div>
//     )
// }