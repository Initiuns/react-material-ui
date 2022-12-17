import { createTheme } from "@mui/material"
import * as M from "@mui/material/colors"

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: M.yellow[700],
            dark: M.yellow[800],
            light: M.yellow[500],
            contrastText: '#ffffff',
        },
        secondary: {
            main: M.cyan[500],
            dark: M.cyan[400],
            light: M.cyan[300],
            contrastText: '#ffffff',
        },
        background: {
            default: '#303134',
            paper: '#202124',
        }
    },
    typography: {
        allVariants: {
            color: 'white'
        }
    }
})



