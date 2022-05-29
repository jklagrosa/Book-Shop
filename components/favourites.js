// import { useState } from "react";
// import styles from "../styles/FAVS.module.scss";
// import { Row, Col } from "react-bootstrap";
// import { RiHeartLine, RiHeartFill, RiCloseFill } from "react-icons/ri";

// const Favs = () => {
//   const [text, setText] = useState(
//     "    Minim duis ullamco nulla occaecat incididunt mollit elitcommodo nostrud officia qui culpa ut."
//   );

//   return (
//     <>
//       <div className={styles.CART_N_FAV_OFFCANVAS_BODY}>
//         <div className={styles.BOXES} id={styles.BOXES_FAV}>
//           <Row className="gy-0 gx-3">
//             <Col xs={6}>
//               <img src="/books/b1.jpg" />
//             </Col>
//             <Col xs={6}>
//               <div className={styles.OTHERS}>
//                 <h6>Adventure Fiction</h6>
//                 <h4>Treasure Island: And the Seven Dwarfs</h4>
//                 <h5>Pablo Escobar</h5>
//                 <h5>4.4/5</h5>
//                 <h5>₱300</h5>
//                 <p>{text.substring(0, 50) + "..."}</p>
//                 <RiCloseFill className={styles.SINGLE_REMOVE_BTN} />
//               </div>
//             </Col>
//           </Row>
//         </div>

//         <div className={styles.BOXES}>
//           <Row className="gy-0 gx-3">
//             <Col xs={6}>
//               <img src="/books/b1.jpg" />
//             </Col>
//             <Col xs={6}>
//               <div className={styles.OTHERS}>
//                 <h6>Adventure Fiction</h6>
//                 <h4>Treasure Island</h4>
//                 <h5>Pablo Escobar</h5>
//                 <h5>4.4/5</h5>
//                 <h5>₱300</h5>
//                 <p>{text.substring(0, 50) + "..."}</p>
//               </div>
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Favs;
