import { Container, Row, Col } from "react-bootstrap";
import { MdOutlineDeliveryDining, MdOutlinePayment } from "react-icons/md";
import styles from "../styles/services.module.scss";

const Services = () => {
  return (
    <>
      <div className={styles.Wrapper}>
        <Container fluid="lg">
          <Row className="g-0">
            <Col xs={12} md={6} lg={4}>
              <div className={styles.services_box}>
                <MdOutlineDeliveryDining className={styles.services_icons} />
                <h3>Quick Delivery</h3>
                <p>bringing Growth through on-time Delivery.</p>
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div className={styles.services_box}>
                <MdOutlineDeliveryDining className={styles.services_icons} />
                <h3>Customer Service</h3>
                <p>Satisfied customers are our best ads.</p>
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div className={styles.services_box}>
                <MdOutlinePayment className={styles.services_icons} />
                <h3>Easy Payment</h3>
                <p>Enjoy a better payment experience.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Services;
