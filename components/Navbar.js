import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Row,
  Col,
} from "react-bootstrap";
import styles from "../styles/navbar.module.scss";
import { BsCart2, BsHeart, BsCartFill, BsSearch } from "react-icons/bs";
import { RiHeartLine, RiHeartFill, RiCloseFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navigation = () => {
  const [show, setShow] = useState(false);
  const [search_show, setSearch_Show] = useState(false);
  const [show_cart, set_show_cart] = useState(false);
  const [show_fav, set_show_fav] = useState(false);

  const [text, setText] = useState(
    "    Minim duis ullamco nulla occaecat incididunt mollit elitcommodo nostrud officia qui culpa ut."
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // SEARCH OFFCANVAS

  const search_handleClose = () => setSearch_Show(false);
  const search_handleShow = () => setSearch_Show(true);
  // END

  // CART OFFCANVAS
  const handleClose_cart = () => set_show_cart(false);
  const handleShow_cart = () => set_show_cart(true);
  // END

  // FAVOURITES OFFCANVAS
  const handleClose_fav = () => set_show_fav(false);
  const handleShow_fav = () => set_show_fav(true);
  // END

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

          {/* BELOW 576px */}
          <Navbar.Brand
            onClick={() => router.push("/")}
            className={styles.brand_logo_smalls_device}
          >
            L<span>b</span>
          </Navbar.Brand>

          {/* END */}

          {/* BELOW 991px */}

          <Nav className="d-inline-block ms-auto d-block d-lg-none">
            <Nav.Link className="d-inline-block">
              <BsSearch
                className={styles.nav_icons}
                id={styles.nav_icons_search}
                onClick={search_handleShow}
              />
            </Nav.Link>
            <span className="mx-3"></span>
            <Nav.Link href="#" className="d-inline-block">
              <BsCart2 className={styles.nav_icons} onClick={handleShow_cart} />
              {/* <BsCartFill className={styles.nav_icons} /> */}
              <sup className={styles.sup_badge} id={styles.sup_badge_cart}>
                9
              </sup>
            </Nav.Link>
            <span className="mx-3"></span>
            <Nav.Link className="d-inline-block">
              <RiHeartLine
                className={styles.nav_icons}
                id={styles.nav_icons_heart}
                onClick={handleShow_fav}
              />
              {/* <RiHeartFill
                  className={styles.nav_icons}
                  id={styles.nav_icons_heart}
                /> */}
              <sup className={styles.sup_badge} id={styles.sup_badge_likes}>
                9
              </sup>
            </Nav.Link>
            <span className="mx-3"></span>
          </Nav>

          {/* END */}

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
              <Nav.Link>
                <BsSearch
                  className={styles.nav_icons}
                  id={styles.nav_icons_search}
                  onClick={search_handleShow}
                />
              </Nav.Link>
              <span className="mx-4"></span>
              <Nav.Link href="#">
                <BsCart2
                  className={styles.nav_icons}
                  onClick={handleShow_cart}
                />
                {/* <BsCartFill className={styles.nav_icons} /> */}
                <sup className={styles.sup_badge} id={styles.sup_badge_cart}>
                  9
                </sup>
              </Nav.Link>
              <span className="mx-2"></span>
              <Nav.Link>
                <RiHeartLine
                  className={styles.nav_icons}
                  id={styles.nav_icons_heart}
                  onClick={handleShow_fav}
                />
                {/* <RiHeartFill
                  className={styles.nav_icons}
                  id={styles.nav_icons_heart}
                /> */}
                <sup className={styles.sup_badge} id={styles.sup_badge_likes}>
                  9
                </sup>
              </Nav.Link>
              <span className="mx-2"></span>
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

      {/* OFFCANVAS - SEARCH AREA */}
      <Offcanvas
        placement="top"
        show={search_show}
        onHide={search_handleClose}
        id={styles.nav_offcanvas_search}
        // className="d-none d-lg-block"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={styles.brand_logo_offcanvas_search}>
            Li<span>bros</span>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className={styles.nav_offcanvas_search_wrapper}>
            <input
              type="search"
              placeholder="Search entire shop here..."
              className={styles.nav_offcanvas_search_input}
            />
            <BsSearch className={styles.nav_offcanvas_search_btn} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* END */}
      {/* ===================================================================== */}
      {/* CART OFFCANVAS */}
      <Offcanvas
        placement="end"
        show={show_cart}
        onHide={handleClose_cart}
        className={styles.CART_N_FAV_OFFCANVAS}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <button className={styles.CHECK_OUT_BTN}>Check Out</button>
          </Offcanvas.Title>

          <Offcanvas.Title>
            <span className={styles.YOUR_CART}>To Pay: ₱4200</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        {/* <button className={styles.CHECK_OUT_BTN}>Check Out</button> */}
        <Offcanvas.Body>
          <div className={styles.CART_N_FAV_OFFCANVAS_BODY}>
            <div className={styles.BOXES}>
              <Row className="gy-0 gx-3">
                <Col xs={6}>
                  <img src="/books/b1.jpg" />
                </Col>
                <Col xs={6}>
                  <div className={styles.OTHERS}>
                    <h6>Adventure Fiction</h6>
                    <h4>Treasure Island</h4>
                    <h5>Pablo Escobar</h5>
                    <h5>4.4/5</h5>
                    <h5>₱300</h5>

                    <div className={styles.BTNS}>
                      <input type="text" />
                      <span className="me-2"></span>
                      <button>+</button>
                      <span className="mx-1"></span>
                      <button>-</button>
                    </div>

                    <h4 className={styles.QTY_TOTAL}>Total: ₱4200</h4>
                  </div>
                </Col>
              </Row>
            </div>

            <div className={styles.BOXES}>
              <Row className="gy-0 gx-3">
                <Col xs={6}>
                  <img src="/books/b1.jpg" />
                </Col>
                <Col xs={6}>
                  <div className={styles.OTHERS}>
                    <h6>Adventure Fiction</h6>
                    <h4>Treasure Island</h4>
                    <h5>Pablo Escobar</h5>
                    <h5>4.4/5</h5>
                    <h5>₱300</h5>

                    <div className={styles.BTNS}>
                      <input type="text" />
                      <span className="me-2"></span>
                      <button>+</button>
                      <span className="mx-1"></span>
                      <button>-</button>
                    </div>

                    <h4 className={styles.QTY_TOTAL}>Total: ₱4200</h4>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* END */}

      {/* ===================================================================== */}
      {/* FAVOURITES OFFCANVAS */}
      <Offcanvas
        placement="end"
        show={show_fav}
        onHide={handleClose_fav}
        className={styles.CART_N_FAV_OFFCANVAS}
      >
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title>
            <span className={styles.YOUR_CART}>Favourites</span>
          </Offcanvas.Title> */}

          <Offcanvas.Title>
            <button className={styles.CHECK_OUT_BTN_REMOVE}>Remove All</button>
          </Offcanvas.Title>
        </Offcanvas.Header>
        {/* <button className={styles.CHECK_OUT_BTN}>Check Out</button> */}
        <Offcanvas.Body>
          <div className={styles.CART_N_FAV_OFFCANVAS_BODY}>
            <div className={styles.BOXES} id={styles.BOXES_FAV}>
              <Row className="gy-0 gx-3">
                <Col xs={6}>
                  <img src="/books/b1.jpg" />
                </Col>
                <Col xs={6}>
                  <div className={styles.OTHERS}>
                    <h6>Adventure Fiction</h6>
                    <h4>Treasure Island: And the Seven Dwarfs</h4>
                    <h5>Pablo Escobar</h5>
                    <h5>4.4/5</h5>
                    <h5>₱300</h5>
                    <p>{text.substring(0, 50) + "..."}</p>
                    <RiCloseFill className={styles.SINGLE_REMOVE_BTN} />
                  </div>
                </Col>
              </Row>
            </div>

            <div className={styles.BOXES}>
              <Row className="gy-0 gx-3">
                <Col xs={6}>
                  <img src="/books/b1.jpg" />
                </Col>
                <Col xs={6}>
                  <div className={styles.OTHERS}>
                    <h6>Adventure Fiction</h6>
                    <h4>Treasure Island</h4>
                    <h5>Pablo Escobar</h5>
                    <h5>4.4/5</h5>
                    <h5>₱300</h5>
                    <p>{text.substring(0, 50) + "..."}</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* END */}
    </>
  );
};

export default Navigation;
