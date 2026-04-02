import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import AllRoutes from "./pages/AllRoutes";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="main-content flex-grow-1 py-4">
        <Container>
          <AllRoutes />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
