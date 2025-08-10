// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home'
import Contact from './Pages/Contact';

function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
