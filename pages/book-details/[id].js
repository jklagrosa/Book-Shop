import { useEffect, useState } from "react";
import dbConnection from "../../utils/conn";
import Books from "../../models/books";
import Navbar from "../../components/Navbar";
import NavLinks from "../../components/NavLinks";
import Footer from "../../components/Footer";
import Copyright from "../../components/Copyright";
import styles from "../../styles/BOOK_ID_PAGES.module.scss";
import { Container, Row, Col } from "react-bootstrap";

import { BsCartFill, BsCart2 } from "react-icons/bs";

import {
  MdPersonOutline,
  MdStarOutline,
  MdFavoriteBorder,
  MdFavorite,
  MdDateRange,
  MdLanguage,
} from "react-icons/md";

import { AiOutlineCalendar } from "react-icons/ai";

import axios from "axios";
import { BASE_URL, headersOpts } from "../../utils/http";
import { ALL_FAV_BOOKS, ALL_CART_ADDED } from "../../store/books";
import { useDispatch } from "react-redux";

// import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export async function getStaticPaths() {
  await dbConnection();
  const get_id = await Books.find({});
  const paths = get_id.map((x) => {
    return {
      params: { id: `${x._id}` },
    };
  });
  console.log(paths);
  if (!get_id) {
    return {
      paths: [],
      fallback: false,
    };
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  await dbConnection();
  const { params } = context;

  const find_book = await Books.findOne({ _id: `${params.id}` });
  const get_books_for_left_display = await Books.find({}).limit(8);

  if (!find_book) {
    return {
      props: {
        data: null,
      },
    };
  }

  if (!get_books_for_left_display) {
    return {
      props: {
        display: null,
      },
    };
  }

  return {
    props: {
      data: JSON.stringify(find_book),
      display: JSON.stringify(get_books_for_left_display),
    },
  };
}

const BookId = ({ data, display }) => {
  const [books, setBooks] = useState([]);
  const [display_books, setDisplay_Books] = useState([]);
  const [HAS_BOOKS, SET_HAS_BOOKS] = useState(true);
  const [HAS_DISPLAY, SET_HAS_DISPLAY] = useState(true);

  const [IS_HEART, SET_IS_HEART] = useState(false);
  const [IS_CART, SET_IS_CART] = useState(false);

  const { dynamic_page_change } = useSelector((state) => state.book);

  const parsed_data = data ? JSON.parse(data) : false;
  const parsed_display = display ? JSON.parse(display) : false;

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (parsed_data) {
      setBooks(parsed_data);
      SET_HAS_BOOKS(true);
    } else {
      setBooks([]);
      SET_HAS_BOOKS(false);
    }
  }, []);

  useEffect(() => {
    if (parsed_display) {
      setDisplay_Books(parsed_display);
      SET_HAS_DISPLAY(true);
    } else {
      setDisplay_Books([]);
      SET_HAS_DISPLAY(false);
    }
  }, []);

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

      // SET_IS_HEART(false);
      // SET_IS_DISABLE(0);
    } else if (
      get_new_fav_books &&
      get_new_fav_books.data &&
      get_new_fav_books.data.success
    ) {
      dispatch(ALL_FAV_BOOKS(get_new_fav_books.data.data.reverse()));

      // SET_IS_HEART(true);
      // SET_IS_DISABLE(1);
    }
  };

  const GET_NEW_CART_DATA = async () => {
    // console.log("ALL FAV BOOKS RAN!");
    const get_new_cart_books = await axios.get(
      `${BASE_URL}/api/cart`,
      headersOpts
    );
    if (!get_new_cart_books.data.success) {
      toast.error("Cannot get all your cart items.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else if (
      get_new_cart_books &&
      get_new_cart_books.data &&
      get_new_cart_books.data.success
    ) {
      dispatch(ALL_CART_ADDED(get_new_cart_books.data.data.reverse()));
      // window.localStorage.setItem(
      //   "cart",
      //   JSON.stringify(get_new_cart_books.data.data)
      // );
    }
  };

  const handleAddToFavs_DYNAMIC = async (bId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/favs-dy-pages`,
        { id: bId },
        headersOpts
      );

      if (!response.data.success) {
        toast.error("Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else if (response && response.data && response.data.success) {
        await GET_NEW_FAV_DATA();

        SET_IS_HEART(true);

        toast.success("Added to your favourites.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      return response.data;
    } catch (error) {
      if (error) {
        console.log(`Error: ${error}`);
        toast.error("Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const handleAddToCart_DYNAMIC = async (bId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/cart-dy-pages`,
        { id: bId },
        headersOpts
      );

      if (!response.data.success) {
        toast.error("Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else if (response && response.data && response.data.success) {
        await GET_NEW_CART_DATA();

        SET_IS_CART(true);

        toast.success("Added to your cart.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      return response.data;
    } catch (error) {
      if (error) {
        console.log(`Error: ${error}`);
        toast.error("Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const handleSelectedBook = (_id) => {
    return router.push({
      pathname: "/book-details-display",
      query: { id: _id },
    });
  };

  if (dynamic_page_change._id === parsed_data._id) {
    // console.log(`DYNAMIC SHIT: ${dynamic_page_change._id}`);
    console.log(`HOLY COWNESS`);
    // router.reload()
    // window.location.reload();
    router.reload();
  }

  return (
    <>
      <Navbar />
      <NavLinks />

      {HAS_BOOKS && (
        <div className={styles.Wrapper}>
          <Container fluid="lg">
            <Row className="gy-0 gx-4" id={styles.row_wrapper}>
              <Col xs={12} md={8}>
                <div className={styles.book_details_wrapper}>
                  <img src={`/books/${books.img}`} />
                  <div className={styles.stack_wrapper}>
                    {/* ================== */}

                    {!books.fav && !IS_HEART && (
                      <MdFavoriteBorder
                        className={styles.mySwiperSlide_tooltip_favourites}
                        id={styles.mySwiperSlide_author_favourites}
                        onClick={() => handleAddToFavs_DYNAMIC(books._id)}
                      />
                    )}

                    {/* {!books.fav && (
                      <MdFavoriteBorder
                        className={styles.mySwiperSlide_tooltip_favourites}
                        id={styles.mySwiperSlide_author_favourites}
                        onClick={() => handleAddToFavs_DYNAMIC(books._id)}
                      />
                    )} */}

                    {books.fav && (
                      <MdFavorite
                        className={
                          styles.mySwiperSlide_tooltip_favourites_SHADED
                        }
                        id={styles.mySwiperSlide_author_favourites}
                      />
                    )}

                    {IS_HEART && (
                      <MdFavorite
                        className={
                          styles.mySwiperSlide_tooltip_favourites_SHADED
                        }
                        id={styles.mySwiperSlide_author_favourites}
                      />
                    )}

                    {/* {IS_HEART && (
                      <MdFavorite
                        className={
                          styles.mySwiperSlide_tooltip_favourites_SHADED
                        }
                        id={styles.mySwiperSlide_author_favourites}
                      />
                    )} */}

                    {/* =============================================== */}

                    <span className="mx-2"></span>

                    {!books.cart && !IS_CART && (
                      <BsCart2
                        className={styles.icons}
                        style={{ color: "#12a4d9", cursor: "pointer" }}
                        onClick={() => handleAddToCart_DYNAMIC(books._id)}
                      />
                    )}

                    {books.cart && (
                      <BsCartFill
                        className={styles.icons}
                        style={{ color: "#12a4d9", cursor: "pointer" }}
                      />
                    )}

                    {IS_CART && (
                      <BsCartFill
                        className={styles.icons}
                        style={{ color: "#12a4d9", cursor: "pointer" }}
                      />
                    )}

                    <h3>{books.genre}</h3>
                    <h1>{books.title}</h1>

                    <MdPersonOutline className={styles.icons_others} />
                    <span className={styles.book_others}>{books.author}</span>
                    <br></br>
                    <MdStarOutline className={styles.icons_others} />
                    <span className={styles.book_others}>
                      {books.ratings}/5
                    </span>
                    <br></br>
                    <MdLanguage className={styles.icons_others} />
                    <span className={styles.book_others}>{books.lang}</span>
                    <br></br>
                    <AiOutlineCalendar className={styles.icons_others} />
                    <span className={styles.book_others}>{books.p_date}</span>

                    <h2>
                      {books.prevPrice && (
                        <>
                          <span style={{ textDecoration: "line-through" }}>
                            ₱{books.prevPrice}
                          </span>
                          {" / "}
                        </>
                      )}
                      ₱{books.price}
                    </h2>
                    <p>{books.desc}</p>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={4}>
                {HAS_DISPLAY && (
                  <div className={styles.display_other_books}>
                    <h4>Select other books</h4>
                    <hr className={styles.divider} />

                    {display_books.map((x) => (
                      <div
                        className={styles.display_other_books_wrapper}
                        key={x._id}
                        onClick={() => handleSelectedBook(x._id)}
                      >
                        <h5>{x.title}</h5>
                        <h6>{x.author}</h6>
                        <h6>{x.ratings}/5</h6>
                      </div>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      )}

      {!HAS_BOOKS && <h1>NO BOOKS TO SHOW</h1>}

      <Footer />
      <Copyright />
    </>
  );
};

export default BookId;
