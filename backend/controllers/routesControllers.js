// Import of modules (schemas)
import Models from "../models/modelsModel.js";
import Vehicle from "../models/vehiclesModel.js";

//! GET Routes
// returns all models without PVM
const getAllModels = (req, res) => {
  try {
    Models.find()
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};

// -- single post page
const getSinglePost = (req, res) => {
  const id = req.params.id;
  // let post = posts.find((post) => {
  //   return post.id === id;
  // });
  // console.log(post);
  // res.render("post", { title: post.title, post: post });
  Post.findById(id)
    .then((result) => res.render("post", { title: result.title, post: result }))
    .catch((err) => console.log(err));
};

const postNewModel = (req, res) => {
  try {
    const receivedModelFromFrontend = req.body;
    const newModel = new Models(receivedModelFromFrontend);
    newModel
      .save()
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};

const deleteSinglePost = (req, res) => {
  const id = req.params.id;
  // let post = posts.find((post) => {
  //   return post.id === id;
  // });
  // console.log(post);
  // res.render("post", { title: post.title, post: post });
  Post.findByIdAndDelete(id)
    .then((result) => res.json({ message: "post deleted" }))
    .catch((err) => console.log(err));
};
export { getAllModels, postNewModel };
