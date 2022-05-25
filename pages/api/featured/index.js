import Dbconnection from "../../../utils/conn";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await Dbconnection();
    const get_featured = await Books.find({ cat: { $in: ["tr", "ft"] } });
    if (!get_featured) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Error",
      });
    }

    return res.status(200).json({
      success: true,
      data: get_featured,
      message: "Success",
    });
  }
}
