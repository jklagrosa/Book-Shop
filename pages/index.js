import { useEffect } from "react";
import Navbar from "../components/Navbar";
import NavigationLinks from "../components/NavLinks";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Featured from "../components/Featured";
import Sales from "../components/Sales";
import BestSeller from "../components/BestSeller";
import Dbconnection from "../utils/conn";
import Books from "../models/books";
import { useDispatch } from "react-redux";
import { GET_ALL_BOOKS, GET_ALL_BOOKS_SALE } from "../store/books";

// FEATURED BOOKS
export async function getStaticProps() {
  await Dbconnection();
  const fetch_books_featured = await Books.find({ cat: { $in: ["tr", "ft"] } });
  const fetch_books_sale = await Books.find({ cat: { $in: ["sale"] } });

  if (!fetch_books_featured || !fetch_books_sale) {
    return {
      props: {
        data_featured: null,
        data_sale: null,
      },
    };
  }

  return {
    props: {
      data_featured: JSON.stringify(fetch_books_featured),
      data_sale: JSON.stringify(fetch_books_sale),
    },
  };
}
// END ==============================================================

export default function Home({ data_featured, data_sale }) {
  const dispatch = useDispatch();
  const parsed_data_featured = data_featured ? JSON.parse(data_featured) : null;
  const parsed_data_sale = data_sale ? JSON.parse(data_sale) : null;

  useEffect(() => {
    if (!parsed_data_featured) {
      dispatch(GET_ALL_BOOKS(null));
    } else {
      dispatch(GET_ALL_BOOKS(parsed_data_featured));
      // console.log("Fetch success: " + parsed_data.map((x) => console.log(x)));
    }
  }, [parsed_data_featured]);

  useEffect(() => {
    if (!parsed_data_sale) {
      dispatch(GET_ALL_BOOKS_SALE(null));
    } else {
      dispatch(GET_ALL_BOOKS_SALE(parsed_data_sale));
      // console.log("Sale Books: " + parsed_data_sale.map((x) => console.log(x)));
    }
  }, [parsed_data_sale]);

  return (
    <>
      <Navbar />
      <NavigationLinks />
      <Hero />
      <Services />
      <Featured />
      <Sales />
      <BestSeller />
    </>
  );
}
