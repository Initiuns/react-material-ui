import 
{ Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } 
from "@mui/material"

import { Box } from "@mui/system"
import React from "react"
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom"
import { useAppThemeContext, useAuthContext, useDrawerContext } from "../../contexts"

interface IMenuLateralProps {
    children: React.ReactNode
}

interface IListItemProps {
    to: string;
    label: string;
    icon: string;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemProps> = ({ to, label, icon, onClick }) => {
    const navigate = useNavigate()
    const resolvedPath = useResolvedPath(to)
    const match = useMatch({ path: resolvedPath.pathname, end: false })

    const handleClick = () => {
        navigate(to)
        onClick?.()
    }

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme()
  const smDowm = useMediaQuery(theme.breakpoints.down('sm'))
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()
  const { toggleTheme } = useAppThemeContext()
  const { logout } = useAuthContext()

  return (
    <>
        <Drawer open={isDrawerOpen} variant={smDowm ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
            <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                
                <Box 
                    width="100%" 
                    height={theme.spacing(20)} 
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Avatar 
                        sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                        src="https://sm.ign.com/ign_br/screenshot/default/batman-critica_4du8.jpg" 
                    />
                </Box>

                <Divider />

                <Box flex={1}>
                    <List component="nav">
                        {drawerOptions.map((drawerOption) => (
                            <ListItemLink 
                                key={drawerOption.path}
                                to={drawerOption.path}
                                icon={drawerOption.icon}
                                label={drawerOption.label}
                                onClick={smDowm ? toggleDrawerOpen : undefined}
                            />
                        ))}

                    </List>
                </Box>
                <Box>
                    <List component="nav">
                        <ListItemButton onClick={toggleTheme}>
                            <ListItemIcon>
                                <Icon>dark_mode</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Alternar Tema" />
                        </ListItemButton>

                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                <Icon>logout</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItemButton>
                    </List>
                </Box>

            </Box>
        </Drawer>

        <Box height="100vh" marginLeft={smDowm ? 0 : theme.spacing(28)}>
            {children}
        </Box>
    </>
  )
}
