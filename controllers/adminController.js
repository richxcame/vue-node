const Admin = require('../models/admin');
const Password = require('../models/password');

module.exports.admin_get = (req, res) => {
  Admin.findOne({ _id: '607d2fbdfab8221f00a53129' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports.admin_update = (req, res) => {
  if(req.files != null) {
    avatar = req.files.avatar;

    uploadAvatar = __dirname + '/../uploads/avatars/' + req.files.avatar.name;
  
    avatar.mv(uploadAvatar, (err) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
    })

    Admin.findOneAndUpdate({ _id: '607d2fbdfab8221f00a53129' }, {
      name: req.body.name,
      password: req.body.password,
      avatar: '/uploads/avatars/' + req.files.avatar.name
    })
      .then(result => {
        res.send('success')
      })
      .catch(err => {
        res.status(500).send('error');
      });
  } else {
    Admin.findOneAndUpdate({ _id: '607d2fbdfab8221f00a53129' }, {
      name: req.body.name,
      password: req.body.password
    })
      .then(result => {
        res.send('success')
      })
      .catch(err => {
        res.status(500).send('error');
      });
  }
}

module.exports.check_password = (req, res) => {
  Admin.findOne({ _id: '607d2fbdfab8221f00a53129' })
    .then(result => {
      if (req.body.password == result.password) {
        res.send({ client: true })
      } else {
        res.send({ client: false })
      }
    })
    .catch(err => {
      res.status(500).send(err);
    })
}

module.exports.admin_check = (req, res) => {
  Password.findOne({ _id: '6095847ebcb6e5145c3120be' })
  .then(data => {
      if (data.password === req.body.password) {
        res.send({ admin: true });
      } else {
        res.send({ admin: false });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports.check_admin_password = (req, res) => {
  Password.findOne({ _id: '6095847ebcb6e5145c3120be' })
    .then(data => {
      if (data.password === req.body.password) {
        res.send({ admin: true });
      } else {
        res.send({ admin: false });
      }
    })
    .catch(err => {
      console.log(err);
    });
}
