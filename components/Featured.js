import { Container } from "react-bootstrap";
import { Tooltip } from "@mui/material";
import styles from "../styles/featured.module.scss";
// import styles from "../styles/redesign/ALL_BOOKS_CMP.module.scss";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import NO_DATA_TO_SHOW from "./NO_DATA_TO_SHOW";

import { BsCartFill, BsCart2 } from "react-icons/bs";

// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import "./styles.css";
import {
  MdPersonOutline,
  MdStarOutline,
  MdFavoriteBorder,
  MdFavorite,
} from "react-icons/md";
import { useRouter } from "next/router";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation } from "swiper";

import { BASE_URL, headersOpts } from "../utils/http";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  ALL_FAV_BOOKS,
  BOOK_IS_REMOVE_FROM_FAVS,
  ALL_CART_ADDED,
} from "../store/books";

import { toast } from "react-toastify";

const Featured = () => {
  const [d_books, setDBooks] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const [FAV_ADDED, SET_FAV_ADDED] = useState(null);
  const [CART_ADDED, SET_CART_ADDED] = useState(null);

  const { books, remove_from_favs } = useSelector((state) => state.book);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!books) {
      setDBooks(null);
      setIsEmpty(true);
    } else {
      setDBooks(books);
      setIsEmpty(false);

      console.log(books);
    }
  }, [books]);

  // const [sliderRef] = useKeenSlider({
  //   loop: true,
  //   breakpoints: {
  //     "(min-width: 400px)": {
  //       slides: { perView: 1, spacing: 5 },
  //     },
  //     "(min-width: 1000px)": {
  //       slides: { perView: 4, spacing: 10 },
  //     },
  //     "(min-width: 1200px)": {
  //       slides: { perView: 5, spacing: 10 },
  //     },
  //   },
  //   // slides: { perView: 2 },
  // });

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

  const GET_NEW_CART_DATA = async () => {
    console.log("ALL FAV BOOKS RAN!");
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
    }
  };

  // FAVOURITES
  useEffect(() => {
    GET_NEW_FAV_DATA();
  }, [FAV_ADDED]);

  useEffect(() => {
    GET_UPDATED_DOCS_DATA();
  }, [FAV_ADDED]);
  // END
  // ========================================
  // CART
  useEffect(() => {
    GET_NEW_CART_DATA();
  }, [CART_ADDED]);

  useEffect(() => {
    GET_UPDATED_DOCS_DATA();
  }, [CART_ADDED]);

  // END

  // =============================================================

  const GET_UPDATED_DOCS_DATA = async () => {
    // console.log("Heart Icon Updated!");
    const response = await axios.get(`${BASE_URL}/api/all-books`, headersOpts);
    if (!response.data.success) {
      return response.data;
      // toast.error("Cannot get all your favourite books.", {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      // });
    } else if (response && response.data && response.data.success) {
      // dispatch(ALL_FAV_BOOKS(get_new_fav_books.data.data.reverse()));
      setDBooks(response.data.data);
    }

    return response.data;
  };

  // ===================================================

  useEffect(() => {
    if (remove_from_favs) {
      GET_UPDATED_DOCS_DATA();
    }
  }, [remove_from_favs]);

  const handleSelectedBook = (_id) => {
    return router.push({
      pathname: "/book-details/[id]",
      query: { id: _id },
    });
  };

  const handleAddToFavs = async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/favs`,
        data,
        headersOpts
      );

      if (response.data.isExist) {
        toast.error("Already saved as favourites.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else if (!response.data.success) {
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
        SET_FAV_ADDED(response.data.data);

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
  // ==============================================

  const handleAddToCart = async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/cart`,
        data,
        headersOpts
      );

      if (response.data.isExist) {
        toast.error("Already in cart.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else if (!response.data.success) {
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
        SET_CART_ADDED(response.data.data);

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

  return !isEmpty ? (
    <>
      <div className={styles.Wrapper}>
        <Container fluid="lg">
          <Tooltip title="View all featured books" placement="right-start">
            <h1
              className={styles.featured_top_header_tag}
              onClick={() => router.push("/featured-books")}
            >
              Featured Books
            </h1>
          </Tooltip>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            grabCursor={true}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1801: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              2201: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              2501: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            modules={[Navigation]}
            // className="mySwiper"
            // loop={true}
            className={styles.mySwiper}
          >
            {d_books &&
              d_books.map((book) => (
                <SwiperSlide className={styles.mySwiperSlide} key={book._id}>
                  <div className={styles.mySwiperSlide_img_wrapper}>
                    <img
                      src={`/books/${book.img}`}
                      alt={book.title}
                      className={styles.mySwiperSlide_img}
                      loading="lazy"
                      onClick={() => handleSelectedBook(book._id)}
                    />
                  </div>

                  <div className={styles.mySwiperSlide_details}>
                    <h5>
                      {!book.fav && (
                        <MdFavoriteBorder
                          className={styles.mySwiperSlide_tooltip_favourites}
                          id={styles.mySwiperSlide_author_favourites}
                          onClick={() => handleAddToFavs(book)}
                        />
                      )}

                      {book.fav && (
                        <MdFavorite
                          className={
                            styles.mySwiperSlide_tooltip_favourites_SHADED
                          }
                          id={styles.mySwiperSlide_author_favourites}
                        />
                      )}

                      <span className="mx-2"></span>

                      {!book.cart && (
                        <BsCart2
                          className={styles.mySwiperSlide_tooltip_cart}
                          id={styles.mySwiperSlide_author_favourites}
                          onClick={() => handleAddToCart(book)}
                        />
                      )}

                      {book.cart && (
                        <BsCartFill
                          className={styles.mySwiperSlide_tooltip_cart}
                          id={styles.mySwiperSlide_author_favourites}
                        />
                      )}
                    </h5>

                    <Tooltip title="Genre" placement="top-start">
                      <h6>{book.genre}</h6>
                    </Tooltip>

                    <h4>{book.title}</h4>
                    <Tooltip title="Author" placement="top-start">
                      <h5>
                        <MdPersonOutline
                          className={styles.mySwiperSlide_author}
                        />
                        {book.author}
                      </h5>
                    </Tooltip>

                    <Tooltip
                      title="Ratings"
                      placement="top-start"
                      className={styles.mySwiperSlide_tooltip}
                    >
                      <h5>
                        <MdStarOutline
                          className={styles.mySwiperSlide_author}
                        />{" "}
                        {book.ratings}/5
                      </h5>
                    </Tooltip>

                    <div className={styles.mySwiperSlide_extra_details}>
                      <h5 className={styles.mySwiperSlide_extra_details_Price}>
                        ₱{book.price}
                      </h5>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </Container>
      </div>
    </>
  ) : (
    <>
      <NO_DATA_TO_SHOW />
    </>
  );
};

export default Featured;
