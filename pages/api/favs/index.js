import Dbconnection from "../../../utils/conn";
import Fav from "../../../models/fav";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await Dbconnection();

    const data = req.body;

    const add_to_fav = await Fav.findOne({ _id: data._id });
    if (add_to_fav) {
      return res.status(208).json({
        isExist: true,
        message: "Data already exist.",
      });
    }

    const new_data = new Fav(data);
    new_data
      .save()
      .then((result) => {
        if (result) {
          return res.status(200).json({
            success: true,
            data: result,
            message: "New data added to favourites.",
          });
        }

        return res.status(400).json({
          success: false,
          data: null,
          message: "[THEN]: Something went wrong.",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          data: null,
          message: "[CATCH]: Something went wrong. " + err,
        });
      });
  }
}
