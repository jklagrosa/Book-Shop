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
} from "react-icons/md";

const BookId = () => {
  return (
    <>
      <Navbar />
      <NavLinks />
      <div className={styles.Wrapper}>
        <Container fluid="lg">
          <Row className="gy-0 gx-4" id={styles.row_wrapper}>
            <Col xs={12} md={8}>
              <div className={styles.book_details_wrapper}>
                <img src="/books/b1.jpg" />
                <div className={styles.stack_wrapper}>
                  <MdFavoriteBorder
                    className={styles.icons}
                    style={{ color: "#f2b195", cursor: "pointer" }}
                  />
                  <span className="mx-2"></span>
                  <BsCart2
                    className={styles.icons}
                    style={{ color: "#12a4d9", cursor: "pointer" }}
                  />

                  <h3>Adventure Fiction</h3>
                  <h1>Lorem Silum and Sopas Kabra. </h1>

                  <MdPersonOutline className={styles.icons_others} />
                  <span className={styles.book_others}>Pablo Escovar</span>
                  <br></br>
                  <MdStarOutline className={styles.icons_others} />
                  <span className={styles.book_others}>4.5/5</span>

                  <h2>
                    <span style={{ textDecoration: "line-through" }}>
                      ₱ 100
                    </span>{" "}
                    ₱ 300
                  </h2>
                  <p>
                    Ad esse eu sunt sit ad eu elit sunt dolore cillum. Dolore
                    duis enim veniam laborum adipisicing proident incididunt
                    sint. Non veniam minim in nulla quis proident adipisicing
                    anim qui voluptate eu proident velit incididunt. Et cillum
                    Lorem velit laborum pariatur dolore voluptate adipisicing.
                    Exercitation cillum anim incididunt laborum. Laborum tempor
                    dolore cillum ad labore et voluptate aute. Officia mollit
                    amet dolor nostrud nostrud non cillum.
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className={styles.display_other_books}>
                <h4>Select other books</h4>
                <hr className={styles.divider} />
                <div className={styles.display_other_books_wrapper}>
                  <h5>Lorem silum and Sopas Kabra</h5>
                  <h6>Pablo Escobar</h6>
                  <h6>4.5/5</h6>
                </div>

                <div className={styles.display_other_books_wrapper}>
                  <h5>Lorem silum and Sopas Kabra</h5>
                  <h6>Pablo Escobar</h6>
                  <h6>4.5/5</h6>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
      <Copyright />
    </>
  );
};

export default BookId;
