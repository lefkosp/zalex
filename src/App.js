import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ListCertificates from "./components/ListCertificates/ListCertificates";
import RequestCertificate from "./components/RequestCertificates/RequestCertificates";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="header-container">
        <div className="header-btn-container">
          <Link to="/list-certificates" className="header-link">
            <button className="primary-btn">Show List Certificates</button>
          </Link>
          <Link to="/request-certificate" className="header-link">
            <button className="primary-btn">Show Request Certificate</button>
          </Link>
        </div>
      </div>
      <div className="components-container">
        <Routes>
          <Route path="/list-certificates" element={<ListCertificates />} />
          <Route path="/request-certificate" element={<RequestCertificate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
