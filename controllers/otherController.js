const Movie = require('../models/movie');
const Track = require('../models/track');
const Video = require('../models/video');
const Book = require('../models/book');
const Admin = require('../models/admin');

module.exports.get_tags = async (req, res) => {
  let arr = [];
  await Movie.distinct('tags')
    .then(data => {
      data.splice(0, 7).forEach(item => {
        arr.push(item);
      });
    })
    .catch(err => {
      console.log(err);
    })

  await Track.distinct('tags')
    .then(data => {
      data.splice(0, 7).forEach(item => {
        arr.push(item);
      });
    })
    .catch(err => {
      console.log(err);
    })

    await Video.distinct('tags')
      .then(data => {
        data.splice(0, 7).forEach(item => {
          arr.push(item);
        });
      })
      .catch(err => {
        console.log(err);
      })

      await Book.distinct('tags')
        .then(data => {
          data.splice(0, 7).forEach(item => {
            arr.push(item);
          });
        })
        .catch(err => {
          console.log(err);
        })

      res.send(arr.splice(0,20));
}

module.exports.search = (req, res) => {
  let result = {
    tkMovies: [],
    ruMovies: [],
    enMovies: [],
    tracks: [],
    videos: [],
    books: [],
  };
  let query = req.query.query;
  let search = async () => {
    await Movie.find({ title_tk: { $regex: query, $options: 'i' } })
        .then(res => { result.tkMovies = res })
        .catch(err => { console.log(err) });
    await Movie.find({ title_ru: { $regex: query, $options: 'i' }})
        .then(res => { result.ruMovies = res })
        .catch(err => { console.log(err) });
    await Movie.find({ title_en: { $regex: query, $options: 'i' }})
        .then(res => { result.enMovies = res })
        .catch(err => { console.log(err) });
    await Track.find({ title: { $regex: query, $options: 'i' }})
        .then(res => { result.tracks = res })
        .catch(err => { console.log(err) });
    await Video.find({ title: { $regex: query, $options: 'i' }})
        .then(res => { result.videos = res })
        .catch(err => { console.log(err) });
    await Book.find({ title: { $regex: query, $options: 'i' }})
        .then(res => { result.books = res })
        .catch(err => { console.log(err) });
    return result
    };

    search()
      .then(res => res.send(result))
      .catch(err => res.send(result));
}

module.exports.register = async (req, res) => {
  const password = req.body.password;
  const db = await Admin.findById({ _id: '607d2fbdfab8221f00a53129' });
  if (db.password == password) {
    res.send({ password: db.password })
  } else {
    res.send({ password: 'Not correct' })
  }
}
