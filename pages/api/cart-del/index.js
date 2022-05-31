import Dbconnection from "../../../utils/conn";
import Cart from "../../../models/cart";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await Dbconnection();

    const { id } = req.body;

    await Books.findOneAndUpdate(
      { _id: id },
      // { fav: true },
      { $set: { cart: false } },
      // { new: true },
      async (err, result) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Cannot update your cart item",
          });
        }

        if (result) {
          await Cart.findOneAndDelete({ _id: id }, (err, isDeleted) => {
            if (err) {
              return res.status(400).json({
                success: false,
                message: "Cannot delete from cart.",
              });
            }

            if (isDeleted) {
              console.log(`Cart deleted: ${isDeleted}`);
              return res.status(200).json({
                success: true,
                data: result,
                message: "Book is now updated from favourites.",
              });
            }
          }).clone;
        }
      }
    ).clone();

    // const find_book = await Books.findOne({ _id: id });
    // if (find_book) {
    //   await Books.updateOne(
    //     { _id: id },
    //     // { $set: { fav: true } },
    //     { fav: true },

    //     {
    //       new: true,
    //       upsert: true,
    //     },
    //     (error, result) => {
    //       if (error) {
    //         return res.status(400).json({
    //           success: false,
    //           message: `Cannot update, delete from favourite books, ${err}`,
    //         });
    //       }

    //       console.log("POTANGINA");
    //       return res.status(200).json({
    //         success: true,
    //         data: from_fav_to_not_fav,
    //         message: "Book is now updated from favourites.",
    //       });

    //       // if (result) {
    //       //   console.log("POTANGINA");
    //       //   return res.status(200).json({
    //       //     success: true,
    //       //     data: from_fav_to_not_fav,
    //       //     message: "Book is now updated from favourites.",
    //       //   });
    //       // }
    //     }
    //   );
    // .then(() => {
    //   console.log(`Fav is now updated.`);
    // await Fav.findOneAndDelete({
    //   _id: req.body.id,
    // })
    //   .then(() => {
    //     console.log("POTANGINA");
    //     return res.status(200).json({
    //       success: true,
    //       data: from_fav_to_not_fav,
    //       message: "Book is now deleted from favourites.",
    //     });
    //   })
    //   .catch((err) => {
    //     return res.status(400).json({
    //       success: false,
    //       message: `Cannot delete from favourite books, ${err}`,
    //     });
    //   });
    // })
    // .catch((err) => {
    //   return res.status(400).json({
    //     success: false,
    //     message: `Cannot update, delete from favourite books, ${err}`,
    //   });
    // });
    // } else {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Cannot update, delete from favourite books",
    //   });
    // }
  }
}
