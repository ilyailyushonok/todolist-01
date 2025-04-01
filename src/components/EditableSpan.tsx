import {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string,
    classNames: string,
    changeTitle:(title: string) => void,
}

export const EditableSpan = ({title, classNames,changeTitle}: EditableSpanPropsType) => {
    const [titleInput, setTitleInput] = useState('')
    const [isEitMode, setIsEitMode] = useState(false);

    const onOffEditMode = () => {
        setIsEitMode(!isEitMode)
        changeTitle(titleInput)
    };

    const setTitleInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }
    return (isEitMode
            ? <input onBlur={onOffEditMode}
                     autoFocus
                     value={titleInput}
                     onChange={setTitleInputHandler}
            />
            : <span onDoubleClick={onOffEditMode}
                    className={classNames}
            >{title}</span>
    );
};

