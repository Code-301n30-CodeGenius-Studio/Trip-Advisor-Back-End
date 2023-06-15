"use strict";

const Search = require("../Model/User");

const handleSearch = {};

handleSearch.getUsers = function (req, res, next) {
  let queryObject = { email: req.user.email };
  if (req.query.name) {
    queryObject = { name: req.query.name };
    console.log(queryObject);
  }
  // ()=>console.log(handleSearch);

  Search.find(queryObject)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => next(err));
};
handleSearch.postUsers = function (req, res, next) {
  const data = req.body;
  Search.create({ ...data, email: req.user.email })
    .then((createdUser) => res.status(201).send(createdUser))
    .catch((err) => next(err));
};

handleSearch.deleteUsers = function (req, res, next) {
  const { id } = req.params;
  Search.findByIdAndDelete(id)
    .then((deletedUser) => res.status(204).send(deletedUser))
    .catch((err) => next(err));
};

handleSearch.updateUsers = function (req, res, next) {
  const { id } = req.params;
  const data = req.body;
  Search.findByIdAndUpdate(
    id,
    { ...data, email: req.user.email },
    { new: true, overwrite: true }
  )
    .then((updatedUsers) => res.status(200).send(updatedUsers))
    .catch((err) => next(err));
};

module.exports = handleSearch;
