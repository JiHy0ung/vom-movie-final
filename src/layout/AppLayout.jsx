import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchByKeyword = (event) => {
    event.preventDefault(); // refresh 막음. 안쓰면 검색이 안됨 계속 popular무비만 보여줌.
    // url 바꿔주기
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToMovies = () => {
    navigate("/movies");
  };

  const expand = "md";

  return (
    <div>
      <Navbar
        expand={expand}
        variant="dark"
        bg="dark"
        data-bs-theme="dark"
        data-theme="dark"
        style={{ backgroundColor: "#2b2f33", zIndex:"100000"}}
      >
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
            variant="dark"
            bg="dark"
            data-bs-theme="dark"
            data-theme="dark"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <img
                  className="logo-img"
                  src="logo/vom-logo-dark.png"
                  alt="logo-image"
                />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className="justify-content-start flex-grow-1 px-1"
                style={{ fontFamily: "Paperlogy-5Medium", fontSize: 15 }}
              >
                <Nav.Link onClick={goToHome} className="mx-2">
                  홈
                </Nav.Link>
                <Nav.Link onClick={goToMovies} className="mx-2">
                  영화
                </Nav.Link>
              </Nav>
              <Form className="d-flex" onSubmit={searchByKeyword}>
                <Form.Control
                  type="search"
                  placeholder="영화 검색"
                  className="me-2 nav-search-input"
                  aria-label="Search"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
                <Button variant="outline-danger" type="submit" className="nav-search-button">
                  검색
                </Button>
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
