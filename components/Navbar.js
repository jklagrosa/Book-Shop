import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import styles from "../styles/navbar.module.scss";
import { BsCart2, BsHeart, BsCartFill, BsSearch } from "react-icons/bs";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navigation = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  return (
    <>
      <Navbar expand="lg" fixed="top" className={styles.Wrapper}>
        <Container fluid="lg">
          <Navbar.Brand
            onClick={() => router.push("/")}
            className={styles.brand_logo}
          >
            Li<span>bros</span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleShow}
            style={{ all: "unset" }}
            className="d-block d-lg-none"
          >
            <GiHamburgerMenu className={styles.hamburger_menu} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-block">
            <Nav className="ms-auto">
              <Nav.Link className={styles.nav_search_btn_wrapper}>
                <BsSearch className={styles.nav_search_icon} />
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.nav_search_btn}
                />
              </Nav.Link>

              <Nav.Link href="#">
                <BsCart2 className={styles.nav_icons} />
                <BsCartFill className={styles.nav_icons} />
                <sup className={styles.sup_badge}>9</sup>
              </Nav.Link>
              <Nav.Link>
                <RiHeartLine
                  className={styles.nav_icons}
                  id={styles.nav_icons_heart}
                />
                <RiHeartFill
                  className={styles.nav_icons}
                  id={styles.nav_icons_heart}
                />
                <sup className={styles.sup_badge}>9</sup>
              </Nav.Link>
              <NavDropdown
                title="Demo User"
                id="basic-nav-dropdown"
                className={styles.dd_user_settings}
              >
                <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* OFFCANVAS */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        className="d-block d-lg-none"
        id={styles.nav_offcanvas}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={styles.brand_logo_offcanvas}>
            Li<span>bros</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
      {/* END */}
    </>
  );
};

export default Navigation;
