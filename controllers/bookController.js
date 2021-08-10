const Book = require('../models/book');

module.exports.get_book = (req, res) => {
  let q = {};
  let s = null;
  let l = null;

  if(req.query.query){ q = {title: req.query.query} }
  if(req.query.skip ){ s = parseInt(req.query.skip) }
  if(req.query.limit){ l = parseInt(req.query.limit)}

  Book.find(q).sort({ createdAt: -1 }).skip(s).limit(l).exec((err, docs) => {
    if (err) { res.status(500).send('error')}
    res.send(docs);
  })
}

module.exports.post_book = (req, res) => {
  bookFile = req.files.book;
  thumbnailFile = req.files.thumbnail;

  uploadBookFile = __dirname + '/../uploads/books/books/' + req.files.book.name;
  uploadThumbnailFile = __dirname + '/../uploads/books/thumbnails/' + req.files.thumbnail.name;

  bookFile.mv(uploadBookFile, (err) => {
    if (err){
      console.log(err);
    }
  })

  thumbnailFile.mv(uploadThumbnailFile, (err) => {
    if (err){
      console.log(err);
    }
  });

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    language: req.body.language,
    tags: req.body.tags.split(','),
    book: '/uploads/books/books/' + req.files.book.name,
    thumbnail: '/uploads/books/thumbnails/' + req.files.thumbnail.name,
  });

  book.save()
    .then(result => res.send('success'))
    .catch(err => res.send(err));
}

module.exports.update_book = (req, res) => {
  if(req.files != null){
    thumbnailFile = req.files.thumbnail;
    uploadThumbnailFile = __dirname + '/../uploads/books/thumbnails/' + req.files.thumbnail.name;

    thumbnailFile.mv(uploadThumbnailFile, err => {
      if (err) {
        console.log(err);
        return;
      }
    });

    Book.findOneAndUpdate({ _id: req.params.id }, {
      title: req.body.title,
      author: req.body.author,
      tags: req.body.tags.split(','),
      duration: req.body.duration,
      language: req.body.language,
      thumbnail: '/uploads/books/thumbnails/' + req.files.thumbnail.name
    })
      .then(result => res.send('success'))
      .catch(err => res.send('error'));

  } else {
    Book.findOneAndUpdate({ _id: req.params.id }, {
      title: req.body.title,
      author: req.body.author,
      tags: req.body.tags.split(','),
      duration: req.body.duration,
      language: req.body.language,
    })
      .then(result => res.send('success'))
      .catch(err => res.send('error'));
  }
}

module.exports.delete_book = (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(result => { res.send('success')})
    .catch(err => { console.log(err) });
}

module.exports.get_single_book = (req, res) => {
  Book.findOneById(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send('error');
    });
}
