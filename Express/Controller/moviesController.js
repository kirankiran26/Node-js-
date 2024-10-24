const { query } = require('express');
const movielist = require('./../data/Moviesdata.json'); // Load your JSON data
const Movie = require('./../Models/index');
const Apifeatures=require('./../utils/MovieAPifeatures')
const asynkerrorhandler=require('./../utils/asyncerrorhandler')
exports.getAllMovies = async (req, res) => {
    try {

        let allMovies=await Movie.find(req.query);

        res.status(200).json({
            status: "success",
            length: allMovies.length,
            data: allMovies
        });

    } catch (error) {
        console.error("Error fetching movies:", error); // Log error for debugging
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};




// Create new movies


// exports.createNewMovie = async (req, res) => {
//     try {
//         // Insert many movies from the request body
//         const savedMovies = await Movie.create(req.body);
//         res.status(201).json({
//             status: "success",
//             data: {
//                 savedMovies // Fixed here
//             }
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message: error.message
//         });
//     }
// };

// another way of creating the create movie fun 


exports.createNewMovie =  asynkerrorhandler (async (req,res)=>{
    const newmovie=await Movie.create(req.body);
    res.status(201).json({
        status:'success',
        data:newmovie
    })
})

exports.getMovie=asynkerrorhandler(async (req,res)=>{
    const {id}=req.params;
    const reqmovie=await Movie.findById(id);
    const movie = await Movie.findById(id);
    if (!movie) {
        return res.status(404).json({
            status: "fail",
            message: "Movie not found"
        });
    }
    res.status(200).json({
        status: "success",
        data: {
            movie
        }
    });

})
// Get a movie by ID
// exports.getMovie = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const movie = await Movie.findById(id);
//         if (!movie) {
//             return res.status(404).json({
//                 status: "fail",
//                 message: "Movie not found"
//             });
//         }
//         res.status(200).json({
//             status: "success",
//             data: {
//                 movie
//             }
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "fail",
//             message: error.message
//         });
//     }
// };
exports.updateMovie = async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                status: 'fail',
                message: 'No movie found with that ID'
            });
        }

        // Manually assign fields from req.body to the movie object
        Object.assign(movie, req.body);

        // Save the updated movie back to the database
        const updatedMovie = await movie.save();

        res.status(200).json({
            status: 'success',
            data: {
                movie: updatedMovie
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({
                status: "fail",
                message: "Movie not found"
            });
        }
        res.status(204).json({
            status: "success",
            message: "Movie deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};


exports.getMovieStats=async(req,res) =>{
    try {
        const stat=await Movie.aggregate([
            {$match:{ratings:{$gte:4.5}}},

            {$group:{
                _id:'$releaseYear',
                avgrating:{$avg: '$ratings'},
                avgPrice:{$avg:'$price'},
                maxduration:{$max:'$duration'}

            }}
        ])
        res.status(200).json({
            length:stat.length,
            status:"success",
            data:stat
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
}

exports.getMovieByGener=async(req,res)=>{
    try {
        const genera=req.query.params;
        const stat=await Movie.aggregate([
            {$unwind:'$genres'},
            {$group:{
                _id:'genres',
                moviecount:{$sum:1},
                stat:{$push:'$name'}

            }},

            {$addFields:{genera:"$genera"}},
            {$project: {_id: 0}},
            {$sort: {movieCount: -1}},
            {$match: {genre: genera}}
        ])
        res.status(200).json({
            status:"success",
            length:stat.length,
            data:{
                stat
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}