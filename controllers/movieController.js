const Movie = require('../models/movie');

module.exports.get_movie = (req, res) => {
  let query = {};
  let order = {};
  let skip = null;
  let limit = null;
  let language = null;

  if(req.query.title_tk != undefined && req.query.title_tk !== ''){
    query = { title_tk: { $regex: `${req.query.title_tk}`, $options: 'i' } }
  }
  if(req.query.title_ru != undefined){
    query = { title_ru: { $regex: `${req.query.title_ru}`, $options: 'i' } }
  }
  if(req.query.title_en != undefined){
    query = { title_en: { $regex: `${req.query.title_en}`, $options: 'i' } }
  }
  if(req.query.tags != undefined){
    query.tags = { "$in": req.query.tags }
  }
  if(req.query.order === 'time'){
    order.createdAt = -1;
  }
  if(req.query.order === "voice"){
    order.voice = -1;
  }
  if(req.query.skip != undefined){
    skip = parseInt(req.query.skip);
  }
  if(req.query.limit != undefined){
    limit = parseInt(req.query.limit);
  }
  if(language != undefined){
    query.language = req.body.language;
  }

  Movie.find(query).sort(order).skip(skip).limit(limit).exec((err, docs) => {
    if (err) {
      res.status(500).send('error');
    }
    res.send(docs);
  })
}

module.exports.get_single_movie = (req, res) => {
  Movie.findById(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send('error');
    });
}

module.exports.post_movie = (req, res) => {
  smallMovie = req.files.smallMovie;
  mediumMovie = req.files.mediumMovie;
  largeMovie = req.files.largeMovie;
  thumbnailFile = req.files.thumbnail;
  backgroundImageFile = req.files.background_image;

  uploadSmallMovie = __dirname + '/../uploads/movies/movies/small/' + req.files.smallMovie.name;
  uploadMediumMovie = __dirname + '/../uploads/movies/movies/medium/' + req.files.mediumMovie.name;
  uploadLargeMovie = __dirname + '/../uploads/movies/movies/large/' + req.files.largeMovie.name;
  uploadThumbnailFile = __dirname + '/../uploads/movies/thumbnails/' + req.files.thumbnail.name;
  uploadBackgroundImageFile = __dirname + '/../uploads/movies/background_images/' + req.files.background_image.name;

  smallMovie.mv(uploadSmallMovie, (err) => {
  	if (err){
  		console.log(err);
	    res.sendStatus(500);
	    return;
  	}
  })

  mediumMovie.mv(uploadMediumMovie, (err) => {
    if (err){
      console.log(err);
      res.sendStatus(500);
      return;
    }
  })

  largeMovie.mv(uploadLargeMovie, (err) => {
    if (err){
      console.log(err);
      res.sendStatus(500);
      return;
    }
  })

  thumbnailFile.mv(uploadThumbnailFile, (err) => {
  	if (err){
  		console.log(err);
	    res.sendStatus(500);
	    return;
  	}
  })

  backgroundImageFile.mv(uploadBackgroundImageFile, (err) => {
  	if (err){
  		console.log(err);
	    res.sendStatus(500);
	    return;
  	}
  })

  const movie = new Movie({
    smallMovie: '/uploads/movies/movies/small/' + req.files.smallMovie.name,
    mediumMovie: '/uploads/movies/movies/medium/' + req.files.mediumMovie.name,
    largeMovie: '/uploads/movies/movies/large/' + req.files.largeMovie.name,
  	title_tk: req.body.title_tk,
		title_ru: req.body.title_ru,
		title_en: req.body.title_en,
		description_tk: req.body.description_tk,
		description_ru: req.body.description_ru,
		description_en: req.body.description_en,
		language: req.body.language,
		voice: req.body.voice,
		tags: req.body.tags.split(','),
		thumbnail: '/uploads/movies/thumbnails/' + req.files.thumbnail.name,
		background_image: '/uploads/movies/background_images/' + req.files.background_image.name
  });

  movie.save()
  	.then(result => res.send('success'))
  	.catch(err => res.sendStatus(500).send(err));
}

module.exports.update_movie = (req, res) => {
  if( req.files != null ){
    thumbnailFile = req.files.thumbnail;
    uploadThumbnailFile = __dirname + '/../uploads/movies/thumbnails/' + req.files.thumbnail.name;

    thumbnailFile.mv(uploadThumbnailFile, err => {
      if (err) {
        console.log(err);
        return;
      }
    });

    Movie.findOneAndUpdate({ _id: req.params.id }, {
      title_tk: req.body.title_tk,
      title_ru: req.body.title_ru,
      title_en: req.body.title_en,
      description_tk: req.body.description_tk,
      description_ru: req.body.description_ru,
      description_en: req.body.description_en,
      language: req.body.language,
      voice: req.body.voice,
      tags: req.body.tags.split(','),
      thumbnail: '/uploads/movies/thumbnails/' + req.files.thumbnail.name
    })
      .then(result => res.send('success'))
      .catch(err => res.send('error'));

  } else {
    Movie.findOneAndUpdate({ _id: req.params.id }, {
      title_tk: req.body.title_tk,
      title_ru: req.body.title_ru,
      title_en: req.body.title_en,
      description_tk: req.body.description_tk,
      description_ru: req.body.description_ru,
      description_en: req.body.description_en,
      language: req.body.language,
      voice: req.body.voice,
      tags: req.body.tags.split(','),
    })
      .then(result => res.send('success'))
      .catch(err => res.send('error'));
  }
}

module.exports.delete_movie = (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(result => { res.send('success')})
    .catch(err => { console.log(err) });
}
