
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaUsers } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PiStudentFill } from 'react-icons/pi';
import { Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaUserTie } from "react-icons/fa";
import './dashboard.css'
import DialogBox from '../common/DialogBox';
import { capitalizeFirstLetter } from '../common/CapitalizeFirstLetter';
import Tooltip from '@mui/material/Tooltip';
import { BsEnvelopePaperFill } from 'react-icons/bs';
import { IoCalendarNumber, IoHome } from 'react-icons/io5';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Dashboard = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('info');
  const navigate = useNavigate();
  const location = useLocation()
  const [AdminLogin, setAdminLogin] = React.useState(false)
  const isRole = sessionStorage.getItem("role") === "admin";
  const role = sessionStorage.getItem('role')
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigatePage = (path) => {
    navigate(path)
  }

  const isAccessToken = !!sessionStorage.getItem("accessToken");

  const handleLogout = () => {
    if (isAccessToken) {
      setAlertSeverity('warning'); // or 'info', 'error', etc. based on your needs
      setAlertMessage(`Are you sure you want to logout ?`);
      setShowAlert(true);

    }
  };

  const userName = sessionStorage.getItem("user");



  return (

    <>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              edge="start"

            >
              <GiHamburgerMenu />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: '18px' }} noWrap component="div">
              GBM Softech <span style={{ marginLeft: '15px', marginRight: '15px' }}>|</span>  {capitalizeFirstLetter(role)} Task Management System
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {userName ? (
              <Typography variant="h6" noWrap sx={{ fontSize: '18px' }} component="div">
                Welcome  {userName}
              </Typography>
            ) : (
              <Typography variant="h6" sx={{ fontSize: '18px' }} noWrap component="div">
                Dashboard
              </Typography>
            )}
            <Typography sx={{ marginLeft: '15px' }} variant="h6" noWrap component="div">
              |
            </Typography>
            <Button sx={{ marginLeft: '15px' }} size='small' variant='outlined' color="inherit" >
            Register
            </Button>
          </Toolbar>
        </AppBar>


        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
         
            <ListItem
              disablePadding
              sx={{ display: 'block' }}
              className={location.pathname === '/task-list' ? 'selected' : ''}
            >
              <ListItemButton onClick={() => navigatePage("/task-list")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <Tooltip title="Leave" arrow>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >

                  <BsEnvelopePaperFill />
                </ListItemIcon>
                </Tooltip>
                <ListItemText primary='Task List' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

          
          
              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                className={location.pathname === '/task-form' ? 'selected' : ''}
              >
                <ListItemButton onClick={() => navigatePage("/task-form")}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <Tooltip title="Task Form" arrow>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <IoCalendarNumber />
                  </ListItemIcon>
                  </Tooltip>
                  <ListItemText primary='Task Form' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
           
           
            
             <ListItem
              disablePadding
              sx={{ display: 'block' }}
              className={location.pathname === '/task-statistic' ? 'selected' : ''}
            >
              <ListItemButton onClick={() => navigatePage("/task-statistic")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <Tooltip title="Statistic" arrow>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >

                  <IoHome />
                </ListItemIcon>
                </Tooltip>
                <ListItemText primary='Statistic' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>


            
            {/* {isRole && (
              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                className={location.pathname === '/dashboard/payment-details' ? 'selected' : ''}
              >
                <ListItemButton onClick={() => navigatePage("/dashboard/payment-details")}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <Tooltip title="Employee Salary" arrow>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >

                    <FaRupeeSign />
                  </ListItemIcon>
                  </Tooltip>
                  <ListItemText primary='Employee Salary' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )} */}
          </List>
          <Divider />

        </Drawer>
        <div className='child-components'>
          <Outlet />
        </div>
      </Box>
      {/* Alert Dialog */}
      <DialogBox
        open={showAlert}
        onClose={() => setShowAlert(false)}
        show={true}
        onConfirm={() => {
          setShowAlert(false);
          sessionStorage.clear()
          navigate("/");
        }}
        title={`Confirmation`}
        message={alertMessage}
        submitLabel={`Logout`}
      />
    </>
  );
}


export default Dashboard
