import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./composents/Header";
import Home from "./pages/Home";
import Footer from "./composents/Footer";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
