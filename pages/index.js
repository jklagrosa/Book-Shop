import { useEffect } from "react";
import Navbar from "../components/Navbar";
import NavigationLinks from "../components/NavLinks";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Featured from "../components/Featured";
import Sales from "../components/Sales";
import BestSeller from "../components/BestSeller";
// import Testimonials from "../components/Testimonials";
import Other from "../components/Other";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import Dbconnection from "../utils/conn";
import Books from "../models/books";
import Fav from "../models/fav";
import { useDispatch } from "react-redux";
import {
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_SALE,
  GET_ALL_BEST_SELLER,
  ALL_FAV_BOOKS,
} from "../store/books";

// FEATURED BOOKS
export async function getStaticProps() {
  await Dbconnection();
  const fetch_books_featured = await Books.find({ cat: { $in: ["tr", "ft"] } });
  const fetch_books_sale = await Books.find({ cat: { $in: ["sale"] } });
  const fetch_books_best_seller = await Books.find({ cat: { $in: ["bs"] } });

  const FAV_BOOKS = await Fav.find({});

  if (!fetch_books_featured || !fetch_books_sale || !fetch_books_best_seller) {
    return {
      props: {
        data_featured: null,
        data_sale: null,
        data_best_seller: null,
      },
    };
  }

  if (!FAV_BOOKS) {
    return {
      props: {
        data_fav_books: null,
      },
    };
  }

  return {
    props: {
      data_featured: JSON.stringify(fetch_books_featured),
      data_sale: JSON.stringify(fetch_books_sale),
      data_best_seller: JSON.stringify(fetch_books_best_seller),
      data_fav_books: JSON.stringify(FAV_BOOKS),
    },
  };
}
// END ==============================================================

export default function Home({
  data_featured,
  data_sale,
  data_best_seller,
  data_fav_books,
}) {
  const dispatch = useDispatch();
  const parsed_data_featured = data_featured ? JSON.parse(data_featured) : null;
  const parsed_data_sale = data_sale ? JSON.parse(data_sale) : null;
  const parsed_data_best_seller = data_best_seller
    ? JSON.parse(data_best_seller)
    : null;

  // FAVS
  const parsed_data_fav_books = data_fav_books
    ? JSON.parse(data_fav_books)
    : null;
  // END

  useEffect(() => {
    if (!parsed_data_featured) {
      dispatch(GET_ALL_BOOKS(null));
    } else {
      dispatch(GET_ALL_BOOKS(parsed_data_featured));

      console.log(
        "Fetch success: " + parsed_data_featured.map((x) => console.log({ x }))
      );

      // console.log(
      //   "Fetch success: " +
      //     parsed_data_featured.map((x) => console.log({ ...x, qty: 1 }))
      // );
    }
  }, [dispatch]);

  useEffect(() => {
    if (!parsed_data_sale) {
      dispatch(GET_ALL_BOOKS_SALE(null));
    } else {
      dispatch(GET_ALL_BOOKS_SALE(parsed_data_sale));
      // console.log("Sale Books: " + parsed_data_sale.map((x) => console.log(x)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!parsed_data_best_seller) {
      dispatch(GET_ALL_BEST_SELLER(null));
    } else {
      dispatch(GET_ALL_BEST_SELLER(parsed_data_best_seller));
      // console.log("Sale Books: " + parsed_data_sale.map((x) => console.log(x)));
    }
  }, [dispatch]);

  // FAVS
  useEffect(() => {
    if (!parsed_data_fav_books) {
      dispatch(ALL_FAV_BOOKS(null));
    } else {
      dispatch(ALL_FAV_BOOKS(parsed_data_fav_books));
      // console.log(
      //   "FAV Books: " + parsed_data_fav_books.map((x) => console.log(x))
      // );
      // console.log(`FAV BOOKS RAN!`);
    }
  }, [dispatch]);

  // END FAVS

  return (
    <>
      <Navbar />
      <NavigationLinks />
      <Hero />
      <Services />
      <Featured />
      <Sales />
      <BestSeller />
      <Other />
      <FAQ />
      <Footer />
      <Copyright />
    </>
  );
}
