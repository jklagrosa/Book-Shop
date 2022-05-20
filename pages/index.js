import { useEffect } from "react";
import Navbar from "../components/Navbar";
import NavigationLinks from "../components/NavLinks";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Featured from "../components/Featured";
import Dbconnection from "../utils/conn";
import Books from "../models/books";
import { useDispatch } from "react-redux";
import { GET_ALL_BOOKS } from "../store/books";

export async function getStaticProps() {
  await Dbconnection();
  const fetch_books = await Books.find({});
  if (!fetch_books) {
    return {
      props: {
        data: null,
      },
    };
  }

  return {
    props: {
      data: JSON.stringify(fetch_books),
    },
  };
}

export default function Home({ data }) {
  const dispatch = useDispatch();
  const parsed_data = data ? JSON.parse(data) : null;
  useEffect(() => {
    if (!parsed_data) {
      dispatch(GET_ALL_BOOKS(null));
    } else {
      dispatch(GET_ALL_BOOKS(parsed_data));
      console.log("Fetch success: " + parsed_data.map((x) => console.log(x)));
    }
  }, [parsed_data]);

  return (
    <>
      <Navbar />
      <NavigationLinks />
      <Hero />
      <Services />
      <Featured />
    </>
  );
}
