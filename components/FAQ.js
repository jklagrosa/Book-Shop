import styles from "../styles/faq.module.scss";
import { Container, Accordion } from "react-bootstrap";

const FAQ = () => {
  return (
    <>
      <div className={styles.Wrapper}>
        <Container fluid="lg">
          <h1 className={styles.featured_top_header_tag}>
            Frequently Asked Questions
          </h1>
          <Accordion>
            <Accordion.Item eventKey="0" className={styles.faq_accordion}>
              <Accordion.Header>
                <h5 className={styles.faq_header}>
                  How do I return an order if I receive a book that I don&apos;t
                  want?
                </h5>
              </Accordion.Header>
              <Accordion.Body>
                <p className={styles.faq_body}>
                  You may return an unwanted item within 14 days of the delivery
                  date for a full refund of the cost of the books returned
                  including initial shipping costs. To ensure your package is
                  returned correctly, please return the package to the address
                  indicated below and display the order number prominently on
                  the packaging.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className={styles.faq_accordion}>
              <Accordion.Header>
                <h5 className={styles.faq_header}>
                  If I&apos;m an affiliate, how are the sales of my books
                  handled?
                </h5>
              </Accordion.Header>
              <Accordion.Body>
                <p className={styles.faq_body}>
                  Affiliates do not have to handle inventory, fulfillment,
                  shipping, or customer service. All book sales are fulfilled by
                  Ingram.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className={styles.faq_accordion}>
              <Accordion.Header>
                {" "}
                <h5 className={styles.faq_header}>
                  Can I pick up the books in person?
                </h5>
              </Accordion.Header>
              <Accordion.Body>
                <p className={styles.faq_body}>
                  Yes, as your shipping method. There is no charge for this
                  service, and you can pick up the books at our Pickup counter.
                  After you receive your &quot;Ready for Pickup&quot; email from
                  us, bring your order number and a photo ID to the bookstore.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className={styles.faq_accordion}>
              <Accordion.Header>
                {" "}
                <h5 className={styles.faq_header}>
                  What if I forget to pick up my books?
                </h5>
              </Accordion.Header>
              <Accordion.Body>
                <p className={styles.faq_body}>
                  If you do not pick up your web order within 21 days of the
                  order being placed your order will be considered abandoned.
                  The Campus Store will make at least one attempt via email, to
                  contact the customer about picking up their order.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </>
  );
};

export default FAQ;
