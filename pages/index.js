import { useEffect } from "react";
import Navbar from "../components/Navbar";
import NavigationLinks from "../components/NavLinks";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Featured from "../components/Featured";
import Sales from "../components/Sales";
import BestSeller from "../components/BestSeller";
import Testimonials from "../components/Testimonials";
import Other from "../components/Other";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import Dbconnection from "../utils/conn";
import Books from "../models/books";
import { useDispatch } from "react-redux";
import {
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_SALE,
  GET_ALL_BEST_SELLER,
} from "../store/books";

// FEATURED BOOKS
export async function getStaticProps() {
  await Dbconnection();
  const fetch_books_featured = await Books.find({ cat: { $in: ["tr", "ft"] } });
  const fetch_books_sale = await Books.find({ cat: { $in: ["sale"] } });
  const fetch_books_best_seller = await Books.find({ cat: { $in: ["bs"] } });

  if (!fetch_books_featured || !fetch_books_sale || !fetch_books_best_seller) {
    return {
      props: {
        data_featured: null,
        data_sale: null,
        data_best_seller: null,
      },
    };
  }

  return {
    props: {
      data_featured: JSON.stringify(fetch_books_featured),
      data_sale: JSON.stringify(fetch_books_sale),
      data_best_seller: JSON.stringify(fetch_books_best_seller),
    },
  };
}
// END ==============================================================

export default function Home({ data_featured, data_sale, data_best_seller }) {
  const dispatch = useDispatch();
  const parsed_data_featured = data_featured ? JSON.parse(data_featured) : null;
  const parsed_data_sale = data_sale ? JSON.parse(data_sale) : null;
  const parsed_data_best_seller = data_best_seller
    ? JSON.parse(data_best_seller)
    : null;

  useEffect(() => {
    if (!parsed_data_featured) {
      dispatch(GET_ALL_BOOKS(null));
    } else {
      dispatch(GET_ALL_BOOKS(parsed_data_featured));
      // console.log("Fetch success: " + parsed_data.map((x) => console.log(x)));
    }
  }, [parsed_data_featured, dispatch]);

  useEffect(() => {
    if (!parsed_data_sale) {
      dispatch(GET_ALL_BOOKS_SALE(null));
    } else {
      dispatch(GET_ALL_BOOKS_SALE(parsed_data_sale));
      // console.log("Sale Books: " + parsed_data_sale.map((x) => console.log(x)));
    }
  }, [parsed_data_sale, dispatch]);

  useEffect(() => {
    if (!parsed_data_best_seller) {
      dispatch(GET_ALL_BEST_SELLER(null));
    } else {
      dispatch(GET_ALL_BEST_SELLER(parsed_data_best_seller));
      // console.log("Sale Books: " + parsed_data_sale.map((x) => console.log(x)));
    }
  }, [parsed_data_best_seller, dispatch]);

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
      <Testimonials />
      <FAQ />
      <Footer />
      <Copyright />
    </>
  );
}
