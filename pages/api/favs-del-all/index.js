import Dbconnection from "../../../utils/conn";
import Fav from "../../../models/fav";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await Dbconnection();

    // const all_id = req.body.data;
    // const arr_id = all_id.map((x) => x._id);
    // console.log(arr_id);

    // await Fav.find({}).then((result) => {
    //   console.log(result);
    // });

    for await (const notFav of Fav.find({})) {
      Books.findOneAndUpdate(
        { _id: notFav._id },
        { $set: { fav: false } },
        { upsert: true }
      ).clone;
    }

    // Books.updateMany(
    //   { _id: uid._id },
    //   { $set: { fav: false } },
    //   { upsert: true },
    //   (err, doc) => {
    //     if (err) {
    //       console.log(`ERROR: ${err}`);
    //     } else {
    //       console.log(`ALL DATA: ${doc._id}`);
    //     }
    //   }
    //   // (err, doc) => {
    //   //   if (err) {
    //   //     return res.status(400).json({
    //   //       success: false,
    //   //       data: err,
    //   //     });
    //   //   }

    //   //   console.log(uid);

    //   //   return res.status(200).json({
    //   //     success: true,
    //   //     data: doc,
    //   //   });
    //   // }
    // ).clone;

    // =============================
    await Fav.deleteMany({})
      .then((result) => {
        if (result) {
          return res.status(200).json({
            success: true,
            data: result,
          });
        }

        return res.status(400).json({
          success: false,
          data: null,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          data: null,
        });
      });
    // =============================
  }
}
