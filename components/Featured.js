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
import { ALL_FAV_BOOKS } from "../store/books";

import { toast } from "react-toastify";

const Featured = () => {
  const [d_books, setDBooks] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const [FAV_ADDED, SET_FAV_ADDED] = useState(null);

  const { books } = useSelector((state) => state.book);
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
      alert("Cannot get all your favourite books.");
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
  }, [dispatch, FAV_ADDED]);

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
        alert("ALREADY EXIST");
      } else if (!response.data.success) {
        toast.error("Something went wrong, please try again later.", {
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
    } catch (error) {}
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
                      <Tooltip title="Add to favourites" placement="top-start">
                        {!book.fav && (
                          <MdFavoriteBorder
                            className={styles.mySwiperSlide_tooltip_favourites}
                            id={styles.mySwiperSlide_author_favourites}
                            onClick={() => handleAddToFavs(book)}
                          />
                        )}
                      </Tooltip>

                      {book.fav && (
                        <MdFavorite
                          className={styles.mySwiperSlide_tooltip_favourites}
                          id={styles.mySwiperSlide_author_favourites}
                        />
                      )}

                      <span className="mx-2"></span>

                      <Tooltip title="Add to cart" placement="top-start">
                        <BsCart2
                          className={styles.mySwiperSlide_tooltip_cart}
                          id={styles.mySwiperSlide_author_favourites}
                        />
                      </Tooltip>
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
