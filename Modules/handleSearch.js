"use strict";

const Search = require("../Model/User");

const handleSearch = {};

handleSearch.getUsers = function (req, res, next) {
  let queryObject = { email: req.user.email };
  // console.log(email)
  if (req.query.parkName) {
    queryObject = { parkName: req.query.parkName };
    // console.log(queryObject);
  }
  // ()=>console.log(handleSearch);

  Search.find(queryObject)
    .then((data) => {
      // console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => next(err));
};
handleSearch.postUsers = function (req, res, next) {
  const data = req.body;
  Search.create({ ...data, email: req.user.email, notes:'' })
    .then((createdUser) => res.status(201).send(createdUser))
    .catch((err) => next(err));
};

handleSearch.deleteUsers = function (req, res, next) {
  const {id} = req.params;
  // console.log(id);
  // console.log(req.user.email)

  Search.findByIdAndDelete(id)
    .then((deletedUser) => res.status(204).send(deletedUser))
    .catch((err) => next(err));
};

handleSearch.updateUsers = function (req, res, next) {
  console.log('in the update-');
  const { id } = req.params;
  const {notes} = req.body;
  console.log('in the update function notes-id', id)
  Search.findByIdAndUpdate(
    id,
    { id:id, notes: notes, email: req.user.email },
    { new: true, overwrite: true }
  )
    .then((updatedUsers) => res.status(200).send(updatedUsers))
    .catch((err) => next(err));
};


module.exports = handleSearch;
