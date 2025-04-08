import {FilteredType} from '../App.tsx';
import Button from '@mui/material/Button';

type FilterButtonsPropsType = {
    changeTodolistFilter: (newFilterValue: FilteredType) => void
    activeFilter: FilteredType
}
export const FilterButtons = ({changeTodolistFilter, activeFilter}: FilterButtonsPropsType) => {
    return (
        <div>
            <Button variant={'contained'} size={'small'} disableElevation
                // className={activeFilter === 'all' ? 'btnAll' : ''}
                color={activeFilter === 'all' ? 'secondary' : 'primary'}
                onClick={() => changeTodolistFilter('all')}>All</Button>
            <Button variant={'contained'} size={'small'} disableElevation
                    color={activeFilter === 'active' ? 'secondary' : 'primary'}
                // className={activeFilter === 'active' ? 'btnActive' : ''}
                onClick={() => changeTodolistFilter('active')}>Active</Button>
            <Button variant={'contained'} size={'small'} disableElevation
                    color={activeFilter === 'completed' ? 'secondary' : 'primary'}
                // className={activeFilter === 'completed' ? 'btnCompleted' : ''}
                onClick={() => changeTodolistFilter('completed')}>Completed</Button>
        </div>
    )
}