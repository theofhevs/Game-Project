import './App.css';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Introduction from './pages/Introduction';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/Introduction' exact element={<Introduction />} />

        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
