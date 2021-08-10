const Track = require('../models/track');

module.exports.get_single_track = (req, res) => {
  Track.findById(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send('error');
    });
}

module.exports.get_track = (req, res) => {
  let q = {
    title: {'$regex': '', $options: "i"},
    author: {'$regex': '', $options: "i"}
  };
  let s = null;
  let l = null;

  if(req.query.query){
    q.title.$regex = req.query.query;
  }
  if(req.query.author){
    q.author.$regex = req.query.author;
  }
  if(req.query.skip){
    s = parseInt(req.query.skip);
  }
  if(req.query.limit){
    l = parseInt(req.query.limit);
  }

  Track.find(q).sort({ createdAt: -1 }).skip(s).limit(l).exec((err, docs) => {
    if (err) {
      res.status(500).send('error')
    }
    res.send(docs);
  })
}

module.exports.delete_track = (req, res) => {
  Track.findByIdAndDelete(req.params.id)
    .then(result => { res.send('success')})
    .catch(err => { console.log(err) });
}

module.exports.update_track = (req, res) => {
  if(req.files != null){
    thumbnailFile = req.files.thumbnail;
    uploadThumbnailFile = __dirname + '/../uploads/tracks/thumbnails/' + req.files.thumbnail.name;

    thumbnailFile.mv(uploadThumbnailFile, err => {
      if (err) {
        console.log(err);
        return;
      }
    });

    Track.findOneAndUpdate({ _id: req.params.id }, {
      title: req.body.title,
      author: req.body.author,
      tags: req.body.tags.split(','),
      language: req.body.language,
      thumbnail: '/uploads/tracks/thumbnails/' + req.files.thumbnail.name
    })
      .then(result => res.send('success'))
      .catch(err => res.send('error'));

  } else {
    Track.findOneAndUpdate({ _id: req.params.id }, {
      title: req.body.title,
      author: req.body.author,
      tags: req.body.tags.split(','),
      language: req.body.language,
    })
      .then(result => res.send('success'))
      .catch(err => res.send('error'));
  }
}

module.exports.post_track = (req, res) => {
  trackFile = req.files.track;
  thumbnailFile = req.files.thumbnail;

  uploadTrackFile = __dirname + '/../uploads/tracks/tracks/' + req.files.track.name;
  uploadThumbnailFile = __dirname + '/../uploads/tracks/thumbnails/' + req.files.thumbnail.name;

  trackFile.mv(uploadTrackFile, (err) => {
    if (err){
      console.log(err);
    }
  })

  thumbnailFile.mv(uploadThumbnailFile, (err) => {
    if (err){
      console.log(err);
    }
  });

  const track = new Track({
    title: req.body.title,
    author: req.body.author,
    language: req.body.language,
    tags: req.body.tags.split(','),
    track: '/uploads/tracks/tracks/' + req.files.track.name,
    thumbnail: '/uploads/tracks/thumbnails/' + req.files.thumbnail.name,
  });

  track.save()
    .then(result => res.send('success'))
    .catch(err => res.status(500).send(err));
}
