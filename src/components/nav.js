import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import React, { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { ExitToApp } from '@mui/icons-material';
import routes from './../routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils';

const NavItemsList = ({setOpen}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const onKeyDown = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(false);
  }

  return (
    <List onKeyDown={onKeyDown}>
      {isLoggedIn() &&
        <ListItem
          button
          key={'logout'}
          onClick={() => {
            logout()
            navigate('/login')
            setOpen(false)
          }}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={'Logout'} />
        </ListItem>
      }
      {routes.map(({path, label, icon}) => (
        isLoggedIn() && path === '/login'
        ? <React.Fragment key='-'></React.Fragment>
        : <ListItem
            button
            key={path}
            selected={location.pathname === path}
            onClick={() => {
              navigate(path)
              setOpen(false)
            }}
          >
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
      ))}
    </List>
  )
}

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <AppBar sx={{px: '1rem'}} position="sticky">
        <IconButton color='inherit' onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      </AppBar>
      <Drawer
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={{textAlign: 'right'}}>
          <IconButton color='primary' onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />

        <NavItemsList setOpen={setOpen} />

      </Drawer>
    </React.Fragment>
  )
};

export default Nav;
