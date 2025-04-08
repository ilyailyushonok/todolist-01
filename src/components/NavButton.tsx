import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
type Props = {
    backGround?:string

}

export const NavButton = styled(Button)<Props>(({backGround,theme})=>({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}, 4px 4px 0 0 ${theme.palette.primary.light}`,
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: theme.palette.primary.contrastText,
    background:backGround|| theme.palette.primary.main,
    "&:hover":{
        cursor: 'pointer',
        backgroundColor: 'rgb(255,255,255,1)',
        color: 'rgb(0,0,0,1)',
    }
}))