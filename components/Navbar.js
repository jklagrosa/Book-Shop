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
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { BASE_URL, headersOpts } from "../utils/http";
import { toast } from "react-toastify";
import { ALL_FAV_BOOKS } from "../store/books";

const Navigation = () => {
  const [show, setShow] = useState(false);
  const [search_show, setSearch_Show] = useState(false);
  const [show_cart, set_show_cart] = useState(false);
  const [show_fav, set_show_fav] = useState(false);

  const [FAVS, SETFAVS] = useState([]);
  const [HAS_FAVS, SET_HAS_FAVS] = useState(true);

  const [FAV_DELETED, SET_FAV_DELETED] = useState(null);

  const { favBooks } = useSelector((state) => state.book);

  const dispatch = useDispatch();

  useEffect(() => {
    if (favBooks) {
      SETFAVS(favBooks);
      SET_HAS_FAVS(true);
    } else {
      SETFAVS(null);
      SET_HAS_FAVS(false);
    }
  }, [favBooks]);

  const GET_NEW_FAV_DATA = async () => {
    console.log("ALL FAV BOOKS RAN!");
    const get_new_fav_books = await axios.get(
      `${BASE_URL}/api/favs`,
      headersOpts
    );
    if (!get_new_fav_books.data.success) {
      toast.error("Cannot get all your favourite books.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else if (
      get_new_fav_books &&
      get_new_fav_books.data &&
      get_new_fav_books.data.success
    ) {
      dispatch(ALL_FAV_BOOKS(get_new_fav_books.data.data.reverse()));
    }
  };

  useEffect(() => {
    GET_NEW_FAV_DATA();
  }, [FAV_DELETED]);

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

  // const router = useRouter();

  const handleRemoveFromFavs = async (_id) => {
    const response = await axios.post(
      `${BASE_URL}/api/favs-del`,
      { id: _id },
      headersOpts
    );
    if (!response.data.success) {
      toast.error("Something went wrong, please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else if (response && response.data && response.data.data) {
      console.log("YEHEY DELETED");
      SET_FAV_DELETED(response.data.data);
    }

    return response.data;
  };

  // const handleRemoveFromFavs = () => {

  //    toast.error("Something went wrong, please try again later.", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //   });

  // };

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
                  {FAVS.length}
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
            {FAVS.length > 0 && (
              <button className={styles.CHECK_OUT_BTN_REMOVE}>
                Remove All
              </button>
            )}
            {/* ============================== */}
            {FAVS.length === 0 && (
              <button className={styles.CHECK_OUT_BTN_REMOVE_DISABLE} disabled>
                Remove All
              </button>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>
        {/* <button className={styles.CHECK_OUT_BTN}>Check Out</button> */}
        <Offcanvas.Body>
          <div className={styles.CART_N_FAV_OFFCANVAS_BODY}>
            {HAS_FAVS &&
              FAVS.map((fav) => (
                <div
                  className={styles.BOXES}
                  id={styles.BOXES_FAV}
                  key={fav._id}
                >
                  <Row className="gy-0 gx-3">
                    <Col xs={6}>
                      <img src={`/books/${fav.img}`} />
                    </Col>
                    <Col xs={6}>
                      <div className={styles.OTHERS}>
                        <h6>{fav.genre}</h6>
                        <h4>{fav.title}</h4>
                        <h5>{fav.author}</h5>
                        <h5>{fav.ratings}/5</h5>

                        <h5>
                          {fav.prevPrice && (
                            <>
                              ₱{fav.prevPrice}
                              {"/"}
                            </>
                          )}
                          ₱{fav.price}
                        </h5>

                        <p>{`${fav.desc.substring(0, 40)}...`}</p>
                        <RiCloseFill
                          className={styles.SINGLE_REMOVE_BTN}
                          onClick={() => handleRemoveFromFavs(fav._id)}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}

            {/* IF OFFCANVAS HAS NO DATA */}
            {FAVS.length === 0 && (
              <h5 className={styles.FAV_IS_EMPTY}>
                You don't have any saved favourites.
              </h5>
            )}
            {/* END */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* END */}
    </>
  );
};

export default Navigation;
