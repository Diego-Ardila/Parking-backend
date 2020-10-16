const User = require('../models/user.model');

module.exports = {
  create(req, res) {
    const data = req.body;

    User
      .create(data)
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).json(err));
  },
  update(req, res) {
    const { id } = req.params;
    const data = req.body;

    const opt = {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    };

    User
      .findByIdAndUpdate(id, data, opt)
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).json(err));
  }
}
