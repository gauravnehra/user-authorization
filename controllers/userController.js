const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });

  //let user = User.findOne({ username: req.body.username }, (err, user) => {})

  if (user) {
    return res
      .status(409)
      .send({ msg: "User already exists with same email id" });
  }

  user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt),
  });

  //user = new User(req.body)

  user.save((err, user) => {
    if (err) res.status(500).send(err);
    else {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
      user.password = undefined;
      res
        .status(200)
        .header("authorization", token)
        .send({ message: "Success", user: user });
    }
  });

  //await user.save();

  //User.create(req.body);
};

exports.login = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });

  console.log(user);

  if (!user) {
    return res.status(404).send({ message: "Incorrect Credentials" });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(403).send({ message: "Incorrect Credentials" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.password = undefined;

  res
    .status(200)
    .header("authorization", token)
    .send({ message: "Success", user: user });
};

exports.searchUser = async (req, res) => {
  let user = await User.findOne({ username: req.params.username });

  if (!user) {
    return res.status(404).send({ message: "Not found" });
  }

  user.password = undefined;

  res.status(200).send({ message: "Success", user: user });

  // find by id
  // let user = User.findOne({ _id: req.body.userId });
  // let user = User.findById(req.body.userId);
};

// User.findOneAndDelete({ username: req.body.username }, () => {}); find one document and delete it
// User.findOneAndUpdate({ username: req.body.usernmae }, { username: newusername, password: newpassword }, ()=>{});;
// User.findByIdAndDelete(id);
// User.findByIdAndUpdate(id, {update object}, ()=>{})
