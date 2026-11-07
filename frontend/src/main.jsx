import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Layout from './Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Notes from './pages/Notes'
import DeleteAccount from './pages/DeleteAccount'
import ViewNote from './pages/ViewNote'
import NotFound from './pages/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path='' element={<Home />}/>
        <Route 
          path='/register' 
          element={<Register />}
        />
        <Route 
          path='/verify-email' 
          element={<VerifyEmail />}
        />
        <Route 
          path='/login' 
          element={<Login />}
        />
        <Route 
          path='/forgot-password' 
          element={<ForgotPassword />}
        />
        <Route 
          path='/reset-password' 
          element={<ResetPassword />}
        />
        <Route 
          path='/delete-account' 
          element={<DeleteAccount />}
        />
        <Route
          path='/notes'
          element={<Notes />}
        />
        <Route
          path='/notes/:noteId'
          element={<ViewNote />}
        />
        <Route 
          path='*'
          element={<NotFound />}
        />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
)
