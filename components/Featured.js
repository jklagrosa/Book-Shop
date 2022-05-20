import { Container } from "react-bootstrap";
import styles from "../styles/featured.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation, EffectFade } from "swiper";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

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

  return !isEmpty ? (
    <>
      <div className={styles.Wrapper}>
        <Container fluid="lg">
          <h1>Top Rates Book</h1>

          {/* SWIPER */}
          <Swiper
            modules={[Navigation, EffectFade]}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
            }}
            spaceBetween={10}
            speed={800}
            loop
            className={styles.mySwiper}
          >
            {d_books.map((book) => (
              <SwiperSlide className={styles.mySwiperSlide} key={book._id}>
                <img src={`/books/${book.img}`} />
              </SwiperSlide>
            ))}
          </Swiper>
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
