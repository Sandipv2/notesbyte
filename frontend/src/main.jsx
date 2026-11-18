import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Layout from './Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Notes from './pages/Notes'
import CreateNote from './pages/CreateNote'
import Settings from './pages/Settings'
import ViewNote from './pages/ViewNote'
import NotFound from './pages/NotFound'

import ProtectedRoute from './components/ProtectedRoute'
import RedirectLoggedInUser from './components/RedirectLoggedInUser'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route
        path='/register'
        element={
          <RedirectLoggedInUser>
            <Register />
          </RedirectLoggedInUser>
        }
      />
      <Route
        path='/verify-email'
        element={
          <RedirectLoggedInUser>
            <VerifyEmail />
          </RedirectLoggedInUser>}
      />
      <Route
        path='/login'
        element={
          <RedirectLoggedInUser>
            <Login />
          </RedirectLoggedInUser>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <RedirectLoggedInUser>
            <ForgotPassword />
          </RedirectLoggedInUser>
        }
      />
      <Route
        path='/reset-password'
        element={
          <RedirectLoggedInUser>
            <ResetPassword />
          </RedirectLoggedInUser>
        }
      />
      <Route
        path='/settings'
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path='/notes'
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        }
      />
      <Route
        path='/notes/new'
        element={
          <ProtectedRoute>
            <CreateNote />
          </ProtectedRoute>
        }
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
    <Toaster />
  </>
)
