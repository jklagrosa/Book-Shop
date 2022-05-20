import { Container } from "react-bootstrap";
import styles from "../styles/featured.module.scss";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
// import "./styles.css";

const TopRatesBooks = () => {
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

  const [sliderRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
    slides: { perView: 2 },
  });

  return !isEmpty ? (
    <>
      <div className={styles.Wrapper}>
        <Container fluid="lg">
          <h1>Featured Books</h1>
          {/* KEEN SLIDER */}
          <div
            ref={sliderRef}
            className="keen-slider"
            id={styles.parent_slider}
          >
            {d_books &&
              d_books.map((book) => (
                <div
                  className="keen-slider__slide"
                  id={styles.slider}
                  key={book._id}
                >
                  <img src={`/books/${book.img}`} id={styles.slider_img} />
                </div>
              ))}
          </div>
          {/* END */}
        </Container>
      </div>
    </>
  ) : (
    <>
      <h1>No Data to show</h1>
    </>
  );
};

export default TopRatesBooks;
