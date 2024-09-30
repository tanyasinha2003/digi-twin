import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Dashboard from './components/dashboard';
import NotFound from './components/not-found';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={ <LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    
    </div>
  );
}

export default App;
