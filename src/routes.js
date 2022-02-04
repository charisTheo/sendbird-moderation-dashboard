import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import LoginIcon from '@mui/icons-material/Login';
import ReportIcon from '@mui/icons-material/ReportGmailerrorred';

export default [
  {
    path: '/login',
    component: () => <LoginPage title="Login" />,
    label: 'Login',
    icon: <LoginIcon color="primary" />
  },
  {
    path: '/',
    component: () => <HomePage title="Reports dashboard" />,
    label: 'Reports dashboard',
    icon: <ReportIcon color="primary" />
  },
]