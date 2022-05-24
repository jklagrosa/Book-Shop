import styles from "../styles/PAGES_NO_DATA_TO_SHOW.module.scss";
import { RiEmotionSadLine } from "react-icons/ri";
import { useRouter } from "next/router";

const PAGES_NO_DATA_TO_SHOW = () => {
  const router = useRouter();
  return (
    <>
      {" "}
      <div className={styles.Wrapper}>
        <h1>Cannot display the books right now, please try again later.</h1>
        <RiEmotionSadLine className={styles.icon} />
        <button onClick={() => router.reload()}>Reload the page</button>
      </div>
    </>
  );
};

export default PAGES_NO_DATA_TO_SHOW;
