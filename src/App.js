// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home'
import Contact from './Pages/Contact';
import TeamPage from './Pages/About';
import Listings from './Pages/Listings';
import ListingDetails from './Pages/ListingDetails';

function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<TeamPage/>} />
          <Route path="/properties" element={<Listings/>}/>
          <Route path="/listing/:id" element={<ListingDetails />} />
        </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
