import "./index.css";
import './App.css';
import LoginForm from './components/login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Dashboard from './pages/Dashboard';
import NotFound from './components/not-found';
import KnowledgeGraph from "./pages/KnowledgeGraph";

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={ <LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    
    </div>
  );
}

export default App;
