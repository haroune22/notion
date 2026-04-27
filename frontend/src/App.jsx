import {
  BrowserRouter,
  Route,
  Router,
  Routes
} from 'react-router-dom'

import Login from './pages/Login';
import Register from "./pages/Register";
import Organization from "./pages/Organization";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import './App.css'
import ProtectedRoute from './api/ProtectedRoute';
import PublicRoute from './api/PublicRoute';
import Layout from './components/Layout';
import Invite from './pages/Invite';

function App() {

  return (
    // we will work on routes later
    <BrowserRouter>
      <Routes>
        {/* Public */ }
        <Route element={ <PublicRoute /> }>
          <Route path="/" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
        </Route>

        {/* Protected group */ }
        <Route element={ <ProtectedRoute /> }>
          <Route element={ <Layout /> }>
            <Route path="/organization" element={ <Organization /> } />
            <Route path="/:orgId/projects" element={ <Projects /> } />
            <Route path="/:projectId/tasks" element={ <Tasks /> } />
            <Route path="/invite/:token" element={ <Invite /> } />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
