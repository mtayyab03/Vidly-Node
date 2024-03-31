const auth = require("../middleware/auth"); //send valid json web token to proceed authorization
const admin = require("../middleware/admin"); //send valid json web token to proceed authorization
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

//for db
// async function courseCreate() {
//   const course = new Genre({
//     name: " Nodejs Course",
//     author: "Tayyab",
//     tags: ["node", "backend"],
//     isPublished: true,
//   });

//   const result = await course.save();
//   console.log(result);
// }
// courseCreate();

// router.get("/", (req, res) => {
//   res.send("Hello, Tayyab Gondal!");
// });

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!genre) res.status(404).send("Course not available of this id");
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("Course not available of this id");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Course not available of this id");
  res.send(genre);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

module.exports = router;
