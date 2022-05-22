import styles from "../styles/footer.module.scss";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <div className={styles.Wrapper}>
        <Container fluid="lg">
          <Row className="gy-0 gx-4">
            <Col xs={12} sm={6} md={4}>
              <div className={styles.footer_box}>
                <h1 className={styles.brand_logo_offcanvas}>
                  Li<span>Bros</span>
                </h1>
                <p>
                  If you want to try this web application, you can login as Demo
                  user. Click the login button to redirect to login page and
                  then click the{" "}
                  <code>
                    <q>Login as demo user</q>
                  </code>{" "}
                  button.
                </p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <div className={styles.footer_box}>
                <h5 className={styles.footer_h5}>Contact the dev.</h5>
                <div className={styles.footer_links_wrapper}>
                  <a
                    href="https://www.linkedin.com/in/jklagrosa/"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                  <br />
                  <a href="https://github.com/jklagrosa" target="_blank">
                    Github
                  </a>
                  <br />
                  <a href="mailto:jklagrosa.dev@gmail.com" target="_blank">
                    Gmail
                  </a>
                  <br />
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <div className={styles.footer_box}>
                <h5 className={styles.footer_h5}>Tech used</h5>
                <div className={styles.footer_links_wrapper_tech_used}>
                  <a className={styles.footer_tech_used}>HTML5</a>
                  <a className={styles.footer_tech_used}>CSS3</a>
                  <a className={styles.footer_tech_used}>Sass</a>
                  <a className={styles.footer_tech_used}>Bootstrap</a>
                  <a className={styles.footer_tech_used}>JavaScript</a>
                  <a className={styles.footer_tech_used}>React JS</a>
                  <a className={styles.footer_tech_used}>Next JS</a>
                  <a className={styles.footer_tech_used}>Redux Toolkit</a>
                  <a className={styles.footer_tech_used}>MongoDB</a>

                  <br />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
