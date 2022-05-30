import Dbconnection from "../../../utils/conn";
import Fav from "../../../models/fav";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await Dbconnection();

    const delete_from_favs = await Fav.findOneAndDelete({
      _id: req.body.id,
    });
    if (!delete_from_favs) {
      return res.status(204).json({
        success: false,
        message: "Cannot delete from favourite books.",
      });
    }

    // console.log(`Deleted: ${delete_from_favs}`);

    if (delete_from_favs) {
      await Books.findOneAndUpdate(
        { _id: req.body.id },
        { fav: false },
        {
          new: true,
        }
      );

      console.log("UPDATED PANGA!");

      return res.status(200).json({
        success: true,
        data: delete_from_favs,
        message: "Book is now deleted from favourites.",
      });
    }
  }
}
