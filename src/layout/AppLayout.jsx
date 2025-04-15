import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Outlet } from "react-router-dom";

const AppLayout = () => {

  // const navigate = useNavigate();

  // const goToHome =()=>{
  //   navigate('/');
  // };
  
  // const goToMovies =()=>{
  //   navigate('/movies');
  // };

  const expand = "md";

  return (
    <div>
      <Navbar expand={expand} variant="dark" bg="dark" data-bs-theme="dark" data-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/" className="ms-2">
            <img
              className="logo-img"
              src="logo/vom-logo-dark.png"
              alt="logo-image"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 px-1">
                <Nav.Link href="/" >Home</Nav.Link>
                <Nav.Link href="movies" >Movies</Nav.Link>
              </Nav>
              <Form className="d-flex" >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-danger">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default AppLayout;
