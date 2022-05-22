import styles from "../styles/other.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { BsPerson, BsBook } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";

const Other = () => {
  return (
    <>
      <div className={styles.Wrapper}>
        <Container fluid="lg">
          <Row className="gy-0 gx-4">
            <Col xs={12} sm={6} md={4}>
              <div className={styles.box}>
                <BsPerson className={styles.icons} />
                <h5>3,547</h5>
                <p>Happy Customers</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <div className={styles.box}>
                <BsBook className={styles.icons} />
                <h5>1,253</h5>
                <p>Book Collections</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <div className={styles.box}>
                <MdOutlineLocationOn className={styles.icons} />
                <h5>16</h5>
                <p>Our Branches around PH</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Other;
