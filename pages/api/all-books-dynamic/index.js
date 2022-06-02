import Dbconnection from "../../../utils/conn";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await Dbconnection();

    const { id } = req.body;

    const find_dynamic_book = await Books.find({ _id: id });
    if (!find_dynamic_book) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Error",
      });
    }

    return res.status(200).json({
      success: true,
      data: find_dynamic_book,
      message: "Success",
    });
  }
}
