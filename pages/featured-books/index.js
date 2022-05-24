import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/BOOKS_PAGES.module.scss";
import Navbar from "../../components/Navbar";
import NavLinks from "../../components/NavLinks";
import Footer from "../../components/Footer";
import Copyright from "../../components/Copyright";
import PAGES_NO_DATA_TO_SHOW from "../../components/PAGES_NO_DATA_TO_SHOW";
import { Container, Row, Col } from "react-bootstrap";
import { Tooltip } from "@mui/material";
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

const FeaturedBooksPages = () => {
  const [d_books, setDBooks] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const { books } = useSelector((state) => state.book);

  useEffect(() => {
    if (!books) {
      setDBooks(null);
      setIsEmpty(true);
    } else {
      setDBooks(books);
      setIsEmpty(false);
    }
  }, [books]);

  return (
    <>
      <Navbar />
      <NavLinks />

      {isEmpty && (
        <div className={styles.Wrapper}>
          <Container fluid="lg">
            <Row className="gy-0 gx-4 mx-auto" id={styles.row_wrapper}>
              <h1 className={styles.featured_top_header_tag}>Featured Books</h1>

              <Col xs={12} md={8}>
                <Row className="gy-0 gx-3">
                  {
                    <Col xs={12} md={6}>
                      <div className={styles.books_wrapper}>
                        <img src="/books/b1.jpg" />
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
                            <Tooltip title="Add to cart" placement="top-start">
                              <BsCart2
                                className={styles.mySwiperSlide_tooltip_cart}
                                id={styles.mySwiperSlide_author_favourites}
                              />
                            </Tooltip>
                          </h5>

                          <Tooltip title="Genre" placement="top-start">
                            <h6>Mystery</h6>
                          </Tooltip>

                          <h4>WEWEWEWE</h4>
                          <Tooltip title="Author" placement="top-start">
                            <h5>
                              <MdPersonOutline
                                className={styles.mySwiperSlide_author}
                              />
                              Pablo Escobar
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
                              6/5
                            </h5>
                          </Tooltip>

                          <div className={styles.mySwiperSlide_extra_details}>
                            <h5
                              className={
                                styles.mySwiperSlide_extra_details_Price
                              }
                            >
                              ₱23
                            </h5>
                          </div>
                        </div>
                      </div>
                    </Col>
                  }
                </Row>
              </Col>
              <Col xs={12} md={4} className={styles.settings_wrapper}>
                Dolore aute reprehenderit qui aliqua exercitation esse
                reprehenderit laborum eiusmod. Dolore tempor consectetur sunt
                proident elit aliquip deserunt nostrud ad Lorem. Eiusmod laborum
                esse officia ullamco incididunt cupidatat id. Enim nostrud ex
                nisi Lorem velit officia nisi sunt duis fugiat in velit. Nisi
                ipsum ut nisi amet ex esse sit magna. Lorem fugiat enim
                consectetur in non dolor consequat ullamco deserunt dolore.
              </Col>
            </Row>
          </Container>
        </div>
      )}

      {!isEmpty && (
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
