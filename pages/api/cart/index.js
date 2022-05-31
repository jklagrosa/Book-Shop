import Dbconnection from "../../../utils/conn";
import Cart from "../../../models/cart";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await Dbconnection();
    const get_all_new_cart = await Cart.find({});
    if (!get_all_new_cart) {
      return res.status(400).json({
        success: false,
        message: "Cannot get all your cart items.",
      });
    }
    return res.status(200).json({
      success: true,
      data: get_all_new_cart,
      message: "Getting all your cart items.",
    });
  }

  if (req.method === "POST") {
    await Dbconnection();

    const data = req.body;

    const add_to_fav = await Cart.findOne({ _id: data._id });
    if (add_to_fav) {
      return res.status(208).json({
        isExist: true,
        message: "Data already in cart.",
      });
    }

    // await Fav.findOneAndUpdate(
    //   { _id: data._id },
    //   { fav: true },
    //   {
    //     new: true,
    //   }
    // );

    const new_data_inserted_in_cart = new Cart({
      _id: data._id,
      title: data.title,
      author: data.author,
      ratings: data.ratings,
      img: data.img,
      desc: data.desc,
      price: data.price,
      prevPrice: data.prevPrice,
      genre: data.genre,
      qty: data.qty,
      cart: true,
    });
    new_data_inserted_in_cart
      .save()
      .then(async (result) => {
        if (result) {
          await Books.findOneAndUpdate(
            { _id: data._id },
            { cart: true },
            {
              new: true,
            }
          );

          return res.status(200).json({
            success: true,
            data: result,
            message: "New data added to cart.",
          });
        }

        return res.status(400).json({
          success: false,
          data: null,
          message: "[THEN]: Something went wrong.",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          data: null,
          message: "[CATCH]: Something went wrong. " + err,
        });
      });
  }
}
