import styles from "../styles/testimonials.module.scss";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

const Testimonials = () => {
  return (
    <>
      <div className={styles.Wrapper}>
        <Container fluid="lg">
          <h1 className={styles.featured_top_header_tag}>
            Our Happy Customers
          </h1>

          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            grabCursor={true}
            breakpoints={{
              992: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            // className="mySwiper"
            // loop={true}
            className={styles.mySwiper}
          >
            <SwiperSlide className={styles.mySwiperSlide}>
              <p>
                <ImQuotesLeft className="me-2" id={styles.quotes} />
                New books are rotated into the stock regularly. Recent
                reorganization of the store looks great. If you like piles of
                books, searching for treasures. this is the shop for you.
                <ImQuotesRight className="ms-2" id={styles.quotes} />
              </p>
              <div className={styles.names_wrapper}>
                <h5 className={styles.names}>Kyra Kirby</h5>
              </div>
            </SwiperSlide>

            <SwiperSlide className={styles.mySwiperSlide}>
              <p>
                <ImQuotesLeft className="me-2" id={styles.quotes} />
                Always find such amazing books here at great prices. My boys
                love the children/teen section. We homeschool and find so many
                things to supplement with in every subject.
                <ImQuotesRight className="ms-2" id={styles.quotes} />
              </p>
              <div className={styles.names_wrapper}>
                <h5 className={styles.names}>Teagan Hood</h5>
              </div>
            </SwiperSlide>

            <SwiperSlide className={styles.mySwiperSlide}>
              <p>
                <ImQuotesLeft className="me-2" id={styles.quotes} />
                This is a gem! I got 17 books for ₱1,300 and half of them were
                hardback. The owner is so nice and welcoming. stopping here is a
                must!
                <ImQuotesRight className="ms-2" id={styles.quotes} />
              </p>
              <div className={styles.names_wrapper}>
                <h5 className={styles.names}>Brycen Prince</h5>
              </div>
            </SwiperSlide>

            <SwiperSlide className={styles.mySwiperSlide}>
              <p>
                <ImQuotesLeft className="me-2" id={styles.quotes} />
                I finally made it to find this bookshop. I love it! I barely
                made a start in looking through the many many stacks so I def
                know I&apos;ll be back often! You must check it out!
                <ImQuotesRight className="ms-2" id={styles.quotes} />
              </p>
              <div className={styles.names_wrapper}>
                <h5 className={styles.names}>Audrina Gross</h5>
              </div>
            </SwiperSlide>

            <SwiperSlide className={styles.mySwiperSlide}>
              <p>
                <ImQuotesLeft className="me-2" id={styles.quotes} />
                Great selection and great prices. I had a gift card and was able
                to buy more than I could carry and I still have some to spend
                later!
                <ImQuotesRight className="ms-2" id={styles.quotes} />
              </p>
              <div className={styles.names_wrapper}>
                <h5 className={styles.names}>Jane Lynch</h5>
              </div>
            </SwiperSlide>

            <SwiperSlide className={styles.mySwiperSlide}>
              <p>
                <ImQuotesLeft className="me-2" id={styles.quotes} />
                This is my favorite bookstore! The pricing and atmosphere are
                both great and I visit routinely to see what&apos;s new the
                owners are helpful and friendly too!
                <ImQuotesRight className="ms-2" id={styles.quotes} />
              </p>
              <div className={styles.names_wrapper}>
                <h5 className={styles.names}>Zariah Wolf</h5>
              </div>
            </SwiperSlide>
          </Swiper>
        </Container>
      </div>
    </>
  );
};

export default Testimonials;
