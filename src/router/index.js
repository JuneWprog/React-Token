import { createBrowserRouter } from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout';
import AuthRoute from '@/components/AuthRoute';
import Article from '@/pages/Article';
import Home from '@/pages/Home';
import Publish from '@/pages/Publish';

const router =createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout/> </AuthRoute>,
        children: [
            {
                path: '/article',
                element: <Article />
            },
            {
                path: '/publish',
                element: <Publish />
            },
            {
                index: true,
                element:<Home />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }

])
export default router;