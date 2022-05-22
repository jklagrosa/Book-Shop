import styles from "../styles/copyright.module.scss";

const Copyright = () => {
  return (
    <>
      <div className={styles.Wrapper}>
        <p>
          Copyright &copy; {new Date().getFullYear()} JK Lagrosa. All Rights
          Reserved.
        </p>
      </div>
    </>
  );
};

export default Copyright;
