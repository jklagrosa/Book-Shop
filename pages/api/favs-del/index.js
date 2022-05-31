import Dbconnection from "../../../utils/conn";
import Fav from "../../../models/fav";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await Dbconnection();

    const from_fav_to_not_fav = await Books.findOneAndUpdate(
      { _id: req.body.id },
      { fav: false },
      {
        new: true,
      }
    );

    if (from_fav_to_not_fav) {
      await Fav.findOneAndDelete({
        _id: req.body.id,
      })
        .then(() => {
          return res.status(200).json({
            success: true,
            data: from_fav_to_not_fav,
            message: "Book is now deleted from favourites.",
          });
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            message: `Cannot delete from favourite books, ${err}`,
          });
        });
    } else {
      return res.status(400).json({
        success: false,
        message: "Cannot delete from favourite books.",
      });
    }
  }
}
