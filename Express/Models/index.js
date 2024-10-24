// movieModel.js
const mongoose = require('mongoose');
const fs = require('fs');
const { type } = require('os');
const movieSchema = new mongoose.Schema({
    name: { type: String, required: true,unique:true},
    description: String,
    duration: { type: Number, required: true },
    ratings: {
      type:Number,
     validate:{
      validator: function(val) {
        return val>=1 && val<=10;
      },
      message:"The rating field must be between 1 to 10 "
     }
    },
    totalRating: {type:Number ,required:true},
    releaseYear: Number,
    releaseDate: Date,
    genres: [String],
    directors: [String],
    coverImage: String,
    actors: [String],
    price: Number,
  },{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  });

  movieSchema.virtual('durationinhours').get(function(){
    return( this.duration/60).toFixed(2);
  })

  //insetmany and findbyid and updatebyid  will not triger the save methos only create and 
  movieSchema.pre('save',function(next){
    this.createdBy='Kiran P  S';
    next()
    
  })

  movieSchema.post('save', function(doc, next) {
    const content = `The new movie is created with name ${doc.name} by ${this.createdBy}\n`;
    fs.writeFileSync('logs/postmid.txt', content, { flag: 'a' }); // Corrected 'writeFileSync'
    next(); // Call next after writing the file
});

movieSchema.pre(/^find/,function(next){
  this.find({releaseDate:{$lte : Date.now()}})
  next();
})


// Use existing model if it exists to avoid OverwriteModelError
const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);


module.exports = Movie;
