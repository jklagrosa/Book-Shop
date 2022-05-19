import styles from "../styles/hero.module.scss";

const Hero = () => {
  return (
    <>
      <div className={styles.Wrapper}>
        <h1>
          <span>Books</span> are not only to <span>Entertain</span> us but also{" "}
          <span>Inspire</span> us.
        </h1>

        <div className={styles.hero_btn_wrapper}>
          <button>Featured Books</button>
          <span className={styles.span_divider}></span>
          <button>Book Sale</button>
        </div>
      </div>
    </>
  );
};

export default Hero;
