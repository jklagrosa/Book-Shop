// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Dbconnection from "../../utils/conn";
import Books from "../../models/books";

export default async function handler(req, res) {
  if (req.method == "POST") {
    await Dbconnection();

    const GET_ALL_DATA = await Books.find({});

    if (GET_ALL_DATA) {
      await Books.updateMany(
        {},
        { $set: { fav: false, qty: 1 } },
        { upsert: true },
        (err, doc) => {
          if (err) {
            return res.status(400).json({
              success: false,
              data: err,
            });
          }

          return res.status(200).json({
            success: true,
            data: doc,
          });
        }
      );
    } else {
      return res.status(69).json({
        success: false,
        data: "ERROR TO TANGA!",
      });
    }
  }
}
