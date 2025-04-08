import {SxProps} from '@mui/material';

// export const styles:SxProps={
//     justifyContent:'space-between'
// };
export const getListItemSx = (isDone: boolean): SxProps => ({
    p: 0, //короткая запись padding
    fontWeight: isDone ? 'bold':'regular',
    textDecoration:isDone ? 'line-through':'none',
    fillOpacity:isDone ? 0.5 : 1,
    justifyContent: 'space-between',
    opacity: isDone ? 0.5 : 1,
})