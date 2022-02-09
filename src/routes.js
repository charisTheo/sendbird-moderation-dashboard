import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import ProfanityPage from "./pages/profanity";
import LoginIcon from '@mui/icons-material/Login';
import ReportIcon from '@mui/icons-material/ReportGmailerrorred';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default [
  {
    path: '/login',
    component: () => <LoginPage title="Login" />,
    label: 'Login',
    icon: <LoginIcon color="primary" />,
    exact: true
  },
  {
    path: '/profanity',
    params: ['channelUrl'],
    component: () => <ProfanityPage title="Profanity dashboard" />,
    label: 'Profanity dashboard',
    icon: <FilterAltIcon color="primary" />
  },
  {
    path: '/',
    component: () => <HomePage title="Reports dashboard" />,
    label: 'Reports dashboard',
    icon: <ReportIcon color="primary" />,
    exact: true
  },
]