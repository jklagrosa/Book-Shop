import Dbconnection from "../../../utils/conn";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await Dbconnection();
    const get_all_new_books = await Books.find({}).limit(8);
    if (!get_all_new_books) {
      return res.status(400).json({
        success: false,
        message: "Cannot get all the favourite books.",
      });
    }

    return res.status(200).json({
      success: true,
      data: get_all_new_books,
      message: "Getting all new favourite books.",
    });
  }
}
