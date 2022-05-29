import Dbconnection from "../../../utils/conn";
import Fav from "../../../models/fav";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await Dbconnection();
    const get_all_new_favs = await Fav.find({});
    if (!get_all_new_favs) {
      return res.status(400).json({
        success: false,
        message: "Cannot get all the favourite books.",
      });
    }

    return res.status(200).json({
      success: true,
      data: get_all_new_favs,
      message: "Getting all new favourite books.",
    });
  }

  // =============================================================================

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

    const new_data = new Fav({
      title: data.title,
      author: data.author,
      ratings: data.ratings,
      img: data.img,
      desc: data.desc,
      price: data.price,
      prevPrice: data.prevPrice,
      genre: data.genre,
      fav: true,
    });
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
