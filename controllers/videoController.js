const Video = require('../models/video');

module.exports.post_video = (req, res) => {
  smallVideo = req.files.smallVideo;
  mediumVideo = req.files.mediumVideo;
  largeVideo = req.files.largeVideo;
  thumbnailFile = req.files.thumbnail;

  uploadSmallVideo = __dirname + '/../uploads/videos/videos/small/' + req.files.smallVideo.name;
  uploadMediumVideo = __dirname + '/../uploads/videos/videos/medium/' + req.files.mediumVideo.name;
  uploadLargeVideo = __dirname + '/../uploads/videos/videos/large/' + req.files.largeVideo.name;
  uploadThumbnailFile = __dirname + '/../uploads/videos/thumbnails/' + req.files.thumbnail.name;

  smallVideo.mv(uploadSmallVideo, (err) => {
    if (err){
      console.log(err);
    }
  })

  mediumVideo.mv(uploadMediumVideo, (err) => {
    if (err){
      console.log(err);
    }
  })

  largeVideo.mv(uploadLargeVideo, (err) => {
    if (err){
      console.log(err);
    }
  })

  thumbnailFile.mv(uploadThumbnailFile, (err) => {
    if (err){
      console.log(err);
    }
  });

  const video = new Video({
    title: req.body.title,
    language: req.body.language,
    tags: req.body.tags.split(','),
    smallVideo: '/uploads/videos/videos/small/' + req.files.smallVideo.name,
    mediumVideo: '/uploads/videos/videos/medium/' + req.files.mediumVideo.name,
    largeVideo: '/uploads/videos/videos/large/' + req.files.largeVideo.name,
    thumbnail: '/uploads/videos/thumbnails/' + req.files.thumbnail.name,
  });

  video.save()
    .then(result => res.send('success'))
    .catch(err => res.status(500).send(err));
}

module.exports.delete_video = (req, res) => {
  Video.findByIdAndDelete(req.params.id)
    .then(result => { res.send('success')})
    .catch(err => { console.log(err) });
}

module.exports.update_video = (req, res) => {
  if(req.files != null){
    thumbnailFile = req.files.thumbnail;
    uploadThumbnailFile = __dirname + '/../uploads/videos/thumbnails/' + req.files.thumbnail.name;

    thumbnailFile.mv(uploadThumbnailFile, err => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
    });

    Video.findOneAndUpdate({ _id: req.params.id }, {
      title: req.body.title,
      tags: req.body.tags.split(','),
      language: req.body.language,
      thumbnail: '/uploads/videos/thumbnails/' + req.files.thumbnail.name
    })
      .then(result => res.send('success'))
      .catch(err => res.send('error'));

  } else {
    Video.findOneAndUpdate({ _id: req.params.id }, {
      title: req.body.title,
      tags: req.body.tags.split(','),
      language: req.body.language,
    })
      .then(result => res.send('success'))
      .catch(err => res.send('error'));
  }
}

module.exports.get_single_video = (req, res) => {
  Video.findById(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send('error');
    });
}

module.exports.get_video = (req, res) => {
  let q = {
    title: {'$regex': '', $options: "i"},
  };
  let s = null;
  let l = null;

  if(req.query.query){ q.title.$regex = req.query.query }
  if(req.query.skip){ s = parseInt(req.query.skip) }
  if(req.query.limit){ l = parseInt(req.query.limit) }

  Video.find(q).sort({ createdAt: -1 }).skip(s).limit(l).exec((err, docs) => {
    if(err) { res.status(500).send('error') }
    res.send(docs);
  })
}