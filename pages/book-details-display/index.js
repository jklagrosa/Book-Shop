import { useRouter } from "next/router";
import styles from "../../styles/B_D_D.module.scss";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

const BookDetailsDisplay = () => {
  const router = useRouter();

  console.log(router.query.id);

  useEffect(() => {
    if (router.query.id) {
      console.log(`VALID ID: ${router.query.id}`);
      router.push({
        pathname: "/book-details/[id]",
        query: { id: router.query.id },
      });
    }
  }, [router.query.id]);

  return (
    <>
      <div className={styles.Wrapper}>
        <Spinner
          animation="border"
          role="status"
          className={styles.spinner_wrapper}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <span className={styles.loading_text}>Please wait...</span>
      </div>
    </>
  );
};

export default BookDetailsDisplay;
