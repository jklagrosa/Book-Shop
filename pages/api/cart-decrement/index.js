import Dbconnection from "../../../utils/conn";
import Cart from "../../../models/cart";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await Dbconnection();

    const { id } = req.body;

    const cartItem = await Cart.findOne({ _id: id });
    if (!cartItem) {
      return res.status(400).json({
        success: false,
        data: null,
      });
    }

    const UPDATED_CART = await Cart.findOneAndUpdate(
      { _id: cartItem._id },
      { $inc: { qty: -1 } },
      { new: true }
    ).exec();

    if (UPDATED_CART) {
      if (UPDATED_CART.qty !== 0) {
        console.log(`Decrement by 1! YEHEY!, ${UPDATED_CART}`);
        return res.status(200).json({
          success: true,
          data: UPDATED_CART,
        });
      }

      if (UPDATED_CART.qty === 0) {
        const delete_from_cart = await Cart.findOneAndDelete({
          _id: UPDATED_CART._id,
        });
        if (!delete_from_cart) {
          return res.status(400).json({
            success: false,
            data: null,
          });
        }

        const change_book_status = await Books.findOneAndUpdate(
          { _id: delete_from_cart._id },
          { cart: false },
          { new: true }
        );
        if (!change_book_status) {
          return res.status(400).json({
            success: false,
            data: null,
          });
        }

        await Books.find({});

        console.log(`Potangina mo!, ${UPDATED_CART}`);
        return res.status(200).json({
          success: true,
          data: change_book_status,
        });
      }
    }

    // return res.status(400).json({
    //   success: false,
    //   data: null,
    // });

    // return res.status(400).json({
    //   success: false,
    //   data: cartItem,
    // });

    // await Cart.findOneAndUpdate({ _id: cartItem._id });

    // await Cart.findOne({ _id: data._id })
    //   .then(async (result) => {
    //     if (result) {
    //       //   const new_data = new Cart({
    //       //     _id: result._id,
    //       //     title: result.title,
    //       //     author: result.author,
    //       //     ratings: result.ratings,
    //       //     img: result.img,
    //       //     desc: result.desc,
    //       //     price: result.price,
    //       //     prevPrice: result.prevPrice,
    //       //     genre: result.genre,
    //       //     fav: false,
    //       //     qty: result.qty,
    //       //     cart: true,
    //       //   });

    //       //   await new_data.save();

    //       // console.log(`Dynamic Page Updated`);

    //       if (result.qty !== 0) {
    //         console.log("NOT EQUAL TO ZERO YEY!", result.qty);
    //         await Cart.findOneAndUpdate(
    //           { _id: result._id },
    //           { $inc: { qty: 1 } },
    //           {
    //             new: true,
    //           }
    //           //   { cart: true },
    //           //   {
    //           //     new: true,
    //           //   }
    //         )
    //           .then(() => {
    //             return res.status(200).json({
    //               success: true,
    //               data: result,
    //             });
    //           })
    //           .clone()
    //           .exec();
    //       } else if (result.qty === 0) {
    //         await Cart.findOneAndDelete({ _id: result._id })
    //           .then(() => {
    //             return res.status(200).json({
    //               success: true,
    //               data: result,
    //             });
    //           })
    //           .clone()
    //           .exec();
    //       }

    //       return res.status(200).json({
    //         success: true,
    //         data: result,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     return res.status(400).json({
    //       success: false,
    //       data: err,
    //     });
    //   });

    // await Fav.findOneAndUpdate(
    //   { _id: data._id },
    //   { fav: true },
    //   {
    //     new: true,
    //   }
    // );

    // const new_data = new Fav({
    //   _id: data._id,
    //   title: data.title,
    //   author: data.author,
    //   ratings: data.ratings,
    //   img: data.img,
    //   desc: data.desc,
    //   price: data.price,
    //   prevPrice: data.prevPrice,
    //   genre: data.genre,
    //   fav: true,
    // });
    // new_data
    //   .save()
    //   .then(async (result) => {
    //     if (result) {
    //       await Books.findOneAndUpdate(
    //         { _id: data._id },
    //         { fav: true },
    //         {
    //           new: true,
    //         }
    //       );

    //       return res.status(200).json({
    //         success: true,
    //         data: result,
    //         message: "New data added to favourites.",
    //       });
    //     }

    //     return res.status(400).json({
    //       success: false,
    //       data: null,
    //       message: "[THEN]: Something went wrong.",
    //     });
    //   })
    //   .catch((err) => {
    //     return res.status(400).json({
    //       success: false,
    //       data: null,
    //       message: "[CATCH]: Something went wrong. " + err,
    //     });
    //   });
  }
}
