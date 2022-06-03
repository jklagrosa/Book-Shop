import Dbconnection from "../../../utils/conn";
import Cart from "../../../models/cart";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await Dbconnection();

    const checkOut = await Cart.deleteMany({});
    if (!checkOut) {
      return res.status(400).json({
        success: false,
        data: null,
      });
    }

    const change_all_cart_status = await Books.updateMany(
      { cart: true },
      { $set: { cart: false } }
    );
    if (!change_all_cart_status) {
      return res.status(400).json({
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: change_all_cart_status,
    });
  }
}
