import LoginAgent from './components/AuthAgent/LoginAgent';
import PasswordReset from './components/AuthAgent/PasswordReset';
import RegisterAgent from './components/AuthAgent/Register';
import AuthAssistant from './components/AuthAssistant/AuthAssistant';
import AddProperty from './page/dashboard_agent/AddProperty';
import Dashboard from './page/dashboard_agent/Dashboard';
import DetailsProperty from './page/dashboard_agent/DetailsProperty';
import ModifyProperty from './page/dashboard_agent/Modify_Property';
import Profile from './page/dashboard_agent/Profile';
import Property from './page/dashboard_agent/Property';
import Home from './page/Home';

export const routes = [
    {
        path: "/",
        component: <Home />,
    },
    {
        path: "/login-agent",
        component: <LoginAgent />,
    },
    {
        path: "/reset-password",
        component: <PasswordReset />,
    }, 
    {
        path: "/register-agent",
        component: <RegisterAgent />,
    },
    {
        path: "/auth-assistant",
        component: <AuthAssistant />,
    }, 
    {
        path: "/dashboard-agent", 
        component: <Dashboard/>
    },
    {
        path: "/add_property",
        component: <AddProperty />
    },
    {
        path: "/my_properties",
        component: <Property />
    },
    {
        path: "/edit_property/:id",
        component: <ModifyProperty />
    },
    {
        path: "/details_property/:propertyId",
        component: <DetailsProperty />
    },
    {
        path: "/profil",
        component: <Profile />
    },
    {
        path: "*",
        component: <h1>Page non trouvée</h1>,
    }
];