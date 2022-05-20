// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Dbconnection from "../../utils/conn";
import Books from "../../models/books";

export default async function handler(req, res) {
  if (req.method == "POST") {
    await Dbconnection();
    let new_books = new Books(req.body);
    new_books
      .save()
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  }
}
