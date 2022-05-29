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
} from "react-icons/md";

import { AiOutlineCalendar } from "react-icons/ai";

// import { useSelector } from "react-redux";
import { useRouter } from "next/router";

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

  //
  // console.log(`Params: ${params.id}`);
  //

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

  console.log(find_book);

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
  const parsed_data = data ? JSON.parse(data) : false;
  const parsed_display = display ? JSON.parse(display) : false;

  const router = useRouter();

  console.log(books);

  useEffect(() => {
    if (!parsed_data) {
      setBooks([]);
      SET_HAS_BOOKS(false);
    } else {
      setBooks(parsed_data);
      SET_HAS_BOOKS(true);
      console.log(books);
    }
  }, []);

  useEffect(() => {
    if (!parsed_display) {
      setDisplay_Books([]);
      SET_HAS_DISPLAY(false);
    } else {
      setDisplay_Books(parsed_display);
      SET_HAS_DISPLAY(true);
    }
  }, []);

  const handleSelectedBook = (_id) => {
    return router.push({
      pathname: "/book-details-display",
      query: { id: _id },
    });
  };

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
                    <MdFavoriteBorder
                      className={styles.icons}
                      style={{ color: "#f2b195", cursor: "pointer" }}
                    />
                    <span className="mx-2"></span>
                    <BsCart2
                      className={styles.icons}
                      style={{ color: "#12a4d9", cursor: "pointer" }}
                    />

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
