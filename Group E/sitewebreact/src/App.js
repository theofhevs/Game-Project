import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Introduction from "./pages/Introduction";
import GameDescription from "./pages/GameDescription";
import Result from "./pages/Result";
import Logbook from "./pages/Logbook";
import Links from "./pages/Links";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Introduction" exact element={<Introduction />} />
          <Route path="/GameDescription" exact element={<GameDescription />} />
          <Route path="/Result" exact element={<Result />} />
          <Route path="/Logbook" exact element={<Logbook />} />
          <Route path="/Links" exact element={<Links />} />
        </Routes>
        {/*      <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
