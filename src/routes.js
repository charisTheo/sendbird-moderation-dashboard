import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';

export default [
  {
    path: '/login',
    component: LoginPage,
    label: 'Login',
    icon: <LoginIcon color="primary" />
  },
  {
    path: '/',
    component: HomePage,
    label: 'Home',
    icon: <HomeIcon color="primary" />
  },
]