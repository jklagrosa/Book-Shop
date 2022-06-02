import Dbconnection from "../../../utils/conn";
import Cart from "../../../models/cart";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await Dbconnection();

    const { id } = req.body;

    const cartItem = await Cart.findOne({ _id: id });
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        data: null,
      });
    }

    // await Cart.find({});

    if (cartItem.qty === 0) {
      const update_book_cart_status = await Books.findOneAndUpdate(
        { _id: cartItem._id },
        { cart: false },
        { new: true }
      ).clone();
      if (!update_book_cart_status) {
        return res.status(404).json({
          success: false,
          data: null,
        });
      }

      const delete_from_cart = await Cart.findOneAndDelete({
        _id: cartItem._id,
      }).clone();
      if (!delete_from_cart) {
        return res.status(404).json({
          success: false,
          data: null,
        });
      }
    }

    const DECREMENT_ITEM = await Cart.findOneAndUpdate(
      { _id: cartItem._id },
      { $inc: { qty: -1 } },
      { new: true }
    ).clone();
    if (!DECREMENT_ITEM) {
      return res.status(404).json({
        success: false,
        data: null,
      });
    }

    // await Cart.find({});

    // if (cartItem) {
    //   if (cartItem.qty !== 0) {
    //     const find_cart_and_update = await Cart.findOneAndUpdate(
    //       {
    //         _id: cartItem._id,
    //       },
    //       { $inc: { qty: -1 } },
    //       { new: true }
    //     )
    //       .clone()
    //       .exec();

    //     if (!find_cart_and_update) {
    //       return res.status(400).json({
    //         success: false,
    //         data: null,
    //       });
    //     }

    //     console.log(`Decrement by 1! YEHEY!`);

    //     return res.status(200).json({
    //       success: true,
    //       data: find_cart_and_update,
    //     });

    //     // const find_cart_and_delete = await Cart.findOne({
    //     //   _id: find_cart_and_update._id,
    //     // });
    //   }

    //   if (cartItem.qty === 0) {
    //     const reset_the_cart_status = await Books.findOneAndUpdate(
    //       {
    //         _id: cartItem._id,
    //       },
    //       {
    //         cart: false,
    //       },
    //       {
    //         new: true,
    //       }
    //     )
    //       .clone()
    //       .exec();

    //     const delete_from_cart = await Cart.findOneAndDelete({
    //       _id: reset_the_cart_status._id,
    //     });
    //     if (!delete_from_cart) {
    //       return res.status(400).json({
    //         success: false,
    //         data: null,
    //       });
    //     }

    //     return res.status(200).json({
    //       success: true,
    //       data: delete_from_cart,
    //     });
    //   }
    // } else {
    //   return res.status(400).json({
    //     success: false,
    //     data: null,
    //   });
    // }

    // return res.status(200).json({
    //   success: true,
    //   data: cartItem.qty,
    // });

    // const FIND_CART = await Cart.findOneAndUpdate(
    //   { _id: cartItem._id },
    //   { $inc: { qty: -1 } },
    //   { new: true }
    // )
    //   .clone()
    //   .exec();

    // if (FIND_CART) {
    //   return res.status(200).json({
    //     success: true,
    //     data: FIND_CART,
    //   });
    // }

    // if (cartItem.qty !== 0) {
    //   console.log(`Decrement by 1!`);

    //   const FIND_CART = await Cart.findOneAndUpdate(
    //     { _id: cartItem._id },
    //     { $inc: { qty: -1 } },
    //     { new: true }
    //   )
    //     .clone()
    //     .exec();

    //   if (!FIND_CART) {
    //     return res.status(400).json({
    //       success: false,
    //       data: null,
    //     });
    //   }

    //   return res.status(200).json({
    //     success: true,
    //     data: FIND_CART,
    //   });
    // } else if (cartItem.qty === 0) {
    //   const FIND_BOOK_TO_UPDATE = await Books.findOneAndUpdate(
    //     {
    //       _id: cartItem._id,
    //     },
    //     { cart: false },
    //     { new: true }
    //   )
    //     .clone()
    //     .exec();

    //   if (!FIND_BOOK_TO_UPDATE) {
    //     return res.status(400).json({
    //       success: false,
    //       data: null,
    //     });
    //   }

    //   const REMOVE_FROM_CART = await Cart.findOneAndDelete({
    //     _id: cartItem._id,
    //   });
    //   if (!REMOVE_FROM_CART) {
    //     return res.status(400).json({
    //       success: false,
    //       data: null,
    //     });
    //   }

    //   return res.status(200).json({
    //     success: true,
    //     data: REMOVE_FROM_CART,
    //   });
    // }

    // const cartItem = await Cart.findOne({ _id: id });
    // if (!cartItem) {
    //   return res.status(400).json({
    //     success: false,
    //     data: null,
    //   });
    // }

    // const UPDATED_CART = await Cart.findOneAndUpdate(
    //   { _id: cartItem._id },
    //   { $inc: { qty: -1 } },
    //   { new: true }
    // ).exec();

    // if (cartItem.qty !== 0) {
    //   if (UPDATED_CART) {
    //     console.log(`Decrement by 1! Yehey!`);
    //     return res.status(200).json({
    //       success: true,
    //       data: UPDATED_CART,
    //     });
    //   }

    //   return res.status(400).json({
    //     success: false,
    //     data: null,
    //   });
    // } else if (cartItem.qty === 0) {
    //   await Cart.remove({
    //     _id: cartItem._id,
    //   }).then(async (err, result) => {
    //     if (result) {
    //       await Books.findOneAndUpdate(
    //         { _id: cartItem._id },
    //         { cart: false },
    //         { new: true }
    //       ).exec();

    //       console.log(`Cart is now removed from cart!`);
    //       return res.status(200).json({
    //         success: true,
    //         data: UPDATED_CART,
    //       });
    //     }

    //     if (err) {
    //       return res.status(400).json({
    //         success: false,
    //         data: null,
    //       });
    //     }

    //     return res.status(400).json({
    //       success: false,
    //       data: null,
    //     });
    //   });
    // }

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
