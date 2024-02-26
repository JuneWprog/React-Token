import { createBrowserRouter } from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout';
import AuthRoute from '@/components/AuthRoute';
// import Article from '@/pages/Article';
// import Home from '@/pages/Home';
// import Publish from '@/pages/Publish';
import {Suspense, lazy} from 'react';
//lazy load
const Home = lazy(()=>import('@/pages/Home'))
const Article = lazy(()=>import('@/pages/Article'))
const Publish = lazy(()=>import('@/pages/Publish'))
const router =createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout/> </AuthRoute>,
        children: [
            {
                path: '/article',
                element: <Suspense fallback={"Loading..."}><Article /></Suspense>
            },
            {
                path: '/publish',
                element: <Suspense fallback={"Loading..."}> <Publish /> </Suspense>
            },
            {
                index: true,
                element:<Suspense fallback={"Loading..."}><Home /></Suspense>
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }

])
export default router;