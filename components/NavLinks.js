import { Container, Navbar, Nav } from "react-bootstrap";
import styles from "../styles/navlinks.module.scss";

const NavigationLinks = () => {
  return (
    <>
      <Navbar expand="lg" fixed="top" className={styles.Wrapper}>
        <Container fluid="lg">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Featured</Nav.Link>
            <Nav.Link href="#link">Popular</Nav.Link>
            <Nav.Link href="#link">Sale</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
            <Nav.Link href="#link">Faq</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationLinks;
