import Dbconnection from "../../../utils/conn";
import Cart from "../../../models/cart";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await Dbconnection();

    const data = req.body;

    await Cart.findOne({ _id: data._id })
      .then(async (result) => {
        if (result) {
          //   const new_data = new Cart({
          //     _id: result._id,
          //     title: result.title,
          //     author: result.author,
          //     ratings: result.ratings,
          //     img: result.img,
          //     desc: result.desc,
          //     price: result.price,
          //     prevPrice: result.prevPrice,
          //     genre: result.genre,
          //     fav: false,
          //     qty: result.qty,
          //     cart: true,
          //   });

          //   await new_data.save();

          // console.log(`Dynamic Page Updated`);

          if (result.qty !== 0) {
            await Cart.findOneAndUpdate(
              { _id: result._id },
              { $inc: { qty: 1 } }
              //   { cart: true },
              //   {
              //     new: true,
              //   }
            )
              .then(() => {
                return res.status(200).json({
                  success: true,
                  data: result,
                });
              })
              .clone();
          } else if (result.qty === 0) {
            await Cart.findOneAndDelete({ _id: result._id })
              .then(() => {
                return res.status(200).json({
                  success: true,
                  data: result,
                });
              })
              .clone();
          }

          //   return res.status(200).json({
          //     success: true,
          //     data: result,
          //   });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          data: err,
        });
      });

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
