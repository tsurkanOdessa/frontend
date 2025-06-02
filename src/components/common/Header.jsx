import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
    handleClose();
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold'
          }}
        >
          RentHome
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <Button component={Link} to="/" color="inherit">Главная</Button>
          <Button component={Link} to="/realty" color="inherit">Каталог</Button>
          <Button component={Link} to="/about" color="inherit">О нас</Button>
          <Button component={Link} to="/contact" color="inherit">Контакты</Button>

          {isAuthenticated ? (
            <>
              <IconButton color="inherit" sx={{ ml: 1 }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton
                onClick={handleMenu}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Avatar alt="User" src="/user-avatar.jpg" sx={{ width: 32, height: 32 }} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>Профиль</MenuItem>
                <MenuItem onClick={() => { navigate('/bookings'); handleClose(); }}>Мои бронирования</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit" sx={{ ml: 1 }}>Вход</Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
                sx={{ ml: 1 }}
              >
                Регистрация
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate('/'); handleClose(); }}>Главная</MenuItem>
            <MenuItem onClick={() => { navigate('/realty'); handleClose(); }}>Каталог</MenuItem>
            <MenuItem onClick={() => { navigate('/about'); handleClose(); }}>О нас</MenuItem>
            <MenuItem onClick={() => { navigate('/contact'); handleClose(); }}>Контакты</MenuItem>

            {isAuthenticated ? (
              <>
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>Профиль</MenuItem>
                <MenuItem onClick={() => { navigate('/bookings'); handleClose(); }}>Бронирования</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => { navigate('/login'); handleClose(); }}>Вход</MenuItem>
                <MenuItem onClick={() => { navigate('/register'); handleClose(); }}>Регистрация</MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;