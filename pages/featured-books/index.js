import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/BOOKS_PAGES.module.scss";
import Navbar from "../../components/Navbar";
import NavLinks from "../../components/NavLinks";
import Footer from "../../components/Footer";
import Copyright from "../../components/Copyright";
import PAGES_NO_DATA_TO_SHOW from "../../components/PAGES_NO_DATA_TO_SHOW";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Tooltip } from "@mui/material";
import { BsCartFill, BsCart2, BsFilter } from "react-icons/bs";

// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import "./styles.css";
import {
  MdPersonOutline,
  MdStarOutline,
  MdFavoriteBorder,
  MdFavorite,
} from "react-icons/md";
import Dbconnection from "../../utils/conn";
import Books from "../../models/books";

export async function getStaticProps() {
  await Dbconnection;
  const fetch_books_featured = await Books.find({ cat: { $in: ["tr", "ft"] } });
  if (!fetch_books_featured) {
    return {
      props: {
        data_featured: null,
      },
    };
  }

  return {
    props: {
      data_featured: JSON.stringify(fetch_books_featured),
    },
  };
}

const FeaturedBooksPages = ({ data_featured }) => {
  const [d_books, setDBooks] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isSelected, setSelected] = useState("");
  const [no_book, setNo_Book] = useState(false);
  const [loading, setLoading] = useState(true);
  // const { books } = useSelector((state) => state.book);
  const parsed_data_featured = data_featured ? JSON.parse(data_featured) : null;

  useEffect(() => {
    // console.log(parsed_data_featured.map((x) => x.genre));
    if (!parsed_data_featured) {
      setDBooks(null);
      setIsEmpty(true);
    } else {
      setDBooks(parsed_data_featured);
      setIsEmpty(false);
    }
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   console.log(isSelected);
  //   const filterBooks = d_books.filter((book) => {
  //     return book.genre.toLowerCase().includes(isSelected.toLowerCase());
  //   });

  //   if (filterBooks.length !== 0) {
  //     setDBooks(filterBooks);
  //   } else {
  //     setDBooks(parsed_data_featured);
  //     console.log("No Book Found");
  //   }
  // }, [isSelected]);

  return (
    <>
      <Navbar />
      <NavLinks />

      {!isEmpty && (
        <div className={styles.Wrapper}>
          <Container fluid="lg">
            <Row className="gy-0 gx-4 mx-auto" id={styles.row_wrapper}>
              <h1 className={styles.featured_top_header_tag}>Featured Books</h1>

              <Col xs={12} sm={8}>
                <Row className="gy-0 gx-3">
                  {d_books.length > 0 &&
                    d_books.map((book) => (
                      <Col xs={12} md={6} key={book._id}>
                        <div className={styles.books_wrapper}>
                          <img src={`/books/${book.img}`} />
                          <div className={styles.books_details}>
                            <h5>
                              <Tooltip
                                title="Add to favourites"
                                placement="top-start"
                              >
                                <MdFavoriteBorder
                                  className={
                                    styles.mySwiperSlide_tooltip_favourites
                                  }
                                  id={styles.mySwiperSlide_author_favourites}
                                />
                              </Tooltip>
                              <span className="mx-2"></span>
                              <Tooltip
                                title="Add to cart"
                                placement="top-start"
                              >
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
                              <h5
                                className={
                                  styles.mySwiperSlide_extra_details_Price
                                }
                              >
                                ₱{book.price}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}

                  {loading && (
                    <Spinner
                      animation="border"
                      className={styles.loading_spinner}
                    />
                  )}

                  {/* SEARCH RESULTS */}
                  {no_book && d_books.length == 0 && <h1>Book not found.</h1>}

                  {/* END */}
                </Row>
              </Col>
              <Col xs={12} sm={4} className={styles.settings_wrapper}>
                <div className={styles.settings_box}>
                  <h5>
                    <BsFilter /> Filter by:
                  </h5>
                  <select
                    value={isSelected}
                    onChange={(e) => setSelected(e.target.value)}
                  >
                    <option value="adventure fiction">Adventure Fiction</option>
                    <option value="novel">Novel</option>
                    <option value="mystery">Mystery</option>
                    <option value="epic">Epic</option>
                    <option value="thriller">Thriller</option>
                    <option value="suspense">Suspense</option>
                    <option value="horror">Horror</option>
                    <option value="psychological">Psychological</option>
                    <option value="drama">Drama</option>
                    <option value="action">Action</option>
                  </select>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}

      {isEmpty && (
        <>
          <PAGES_NO_DATA_TO_SHOW />
        </>
      )}

      <Footer />
      <Copyright />
    </>
  );
};

export default FeaturedBooksPages;
