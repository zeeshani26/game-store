import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import AllRoutes from "./pages/AllRoutes";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <AllRoutes />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
