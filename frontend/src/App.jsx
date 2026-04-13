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
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const { user } = useAuth();
  console.log( user );

  return (
    // we will work on routes later
    <BrowserRouter>
      <Routes>
        {/* Public */ }
        <Route path="/" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />

        {/* Protected group */ }
        <Route element={ <ProtectedRoute /> }>
          <Route path="/organization" element={ <Organization /> } />
          <Route path="/projects/:orgId" element={ <Projects /> } />
          <Route path="/tasks/:projectId" element={ <Tasks /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
