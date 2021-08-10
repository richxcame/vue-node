const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const Admin = require('./models/admin');

const movieRoutes = require('./routes/movieRoutes');
const trackRoutes = require('./routes/trackRoutes');
const videoRoutes = require('./routes/videoRoutes');
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');
const otherRoutes = require('./routes/otherRoutes');

mongoose.connect("mongodb://localhost:27017/vue-node", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
	.then(res => {
	  app.listen(3000, () => {
      console.log('http://localhost:3000');
    });
	})
	.catch(err => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static('dist'));
app.use(fileUpload());
app.use(cookieParser());

// update password every 24H
setInterval(() => {
  Admin.findOneAndUpdate({ _id: '607d2fbdfab8221f00a53129' }, {
    password: Math.random().toString().slice(2, 8)
  })
    .then(result => { console.log(result) })
    .catch(err => console.log(err));
}, 1000 * 60 * 60 * 24);

app.use(movieRoutes);
app.use(trackRoutes);
app.use(videoRoutes);
app.use(bookRoutes);
app.use(adminRoutes);
app.use(otherRoutes);

// const admin = new Admin({
//   name: 'admin',
//   password: 'secret',
// });

// admin.save()
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err);
//   });

app.get('/', (req, res) => {
  res.sendFile('./dist/index.html', { root: __dirname });
});

app.get('/admin/:id', (req, res) => {
  res.sendFile('./dist/index.html', { root: __dirname });
});

app.get('/:id', (req, res) => {
  res.sendFile('./dist/index.html', { root: __dirname });
});

app.get('/:category/:id', (req, res) => {
  res.sendFile('./dist/index.html', { root: __dirname });
});

app.use((req, res) => {
  res.sendFile('./dist/index.html', { root: __dirname })
});
