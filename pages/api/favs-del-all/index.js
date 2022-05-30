import Dbconnection from "../../../utils/conn";
import Fav from "../../../models/fav";
import Books from "../../../models/books";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await Dbconnection();

    // const GET_ALL_FAV_ID = await Fav.find({})

    // const UPDATE_FAV_STATUS = await Books

    // const cursor = await Fav.find({}).projection({ _id: req.body.id });
    // console.log(cursor._id);

    // const x = await Fav.find({}).select("_id");
    // console.log(`YEHEY! ${x[0]._id}`);

    const B_ID = req.body;

    for (let i = 0; i < B_ID.length; i++) {
      console.log(`YEHEY! UPDATED, ${i}`);
      await Books.findOneAndUpdate(
        { _id: B_ID.id[i]._id },
        { $set: { fav: false } },
        { upsert: true }

        // { _id: B_ID.id[i]._id },
        // { fav: false },
        // {
        //   new: true,
        // }
      );

      console.log(`YEHEY! UPDATED, ${i}`);
    }

    // await Books.findOneAndUpdate(
    //   { _id: data._id },
    //   { fav: true },
    //   {
    //     new: true,
    //   }
    // );

    // console.log(B_ID.id[0]._id);

    // for await (const uid of Books) {
    //   console.log(uid[uid]);
    // }

    // for await (const notFav of Books.find({})) {
    //   //   console.log(`Counter: ${notFav._id}`);
    //   let index = 0;
    //   //   if (notFav._id == B_ID.id[index]._id) {
    //   //     console.log(`YEHEY! THEYRE SAME!`);
    //   //   }

    //   //   if (notFav._id == B_ID.id[index]._id) {
    //   //     console.log(`YEHEY! THEYRE SAME!`);
    //   //   }

    //   //   console.log(`BOOK ID: ${notFav._id}`);
    //   if (B_ID.id[0]._id == notFav._id) {
    //     console.log(`POTANGINA!`);
    //   }

    //   console.log(`HUEHEUHEUEHUE!`);
    // }

    // for await (const notFav of Books.findByIdAndUpdate(
    //   { _id: notFav._id },
    //   { $set: { fav: false } },
    //   { upsert: true }
    // )) {

    // }

    // { fav: false },
    // {
    //   new: true,
    // }

    // for await (const notFav of Fav.find({})) {
    //   for await (const bookId of Books.find({})) {
    //     if (notFav._id == bookId._id) {
    //       console.log(`THEY'RE SAME`);
    //     }

    //     break;
    //   }
    // }

    // const { favs } = req.body;
    // const arr_id = all_id.map((x) => x._id);
    // console.log(req.body.id._id);

    // await Fav.find({}).then((result) => {
    //   console.log(result);
    // });

    // for await (const notFav of Fav.find({})) {
    //   //   console.log("ONE MATCHED");
    //   Books.findOneAndUpdate(
    //     { _id: notFav._id },
    //     { $set: { fav: false } },
    //     { upsert: true }
    //     // (err, doc) => {
    //     //   if (err) {
    //     //     console.log(`IDs: ${notFav._id}`);
    //     //   }

    //     //   //   console.log(`WEWE: ${notFav._id}`);
    //     // }
    //     // { fav: false },
    //     // {
    //     //   new: true,
    //     // }
    //   ).clone;
    //   //   Books.updateMany(
    //   //     { _id: notFav._id },
    //   //     { $set: { fav: false } },
    //   //     { upsert: true }
    //   //     // { fav: false },
    //   //     // {
    //   //     //   new: true,
    //   //     // }
    //   //   ).clone;
    // }

    // await Books.updateMany(
    //   { _id: uid._id },
    //   { $set: { fav: false } },
    //   { upsert: true }
    // ).clone;

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
