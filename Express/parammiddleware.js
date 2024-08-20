const express = require('express');
const fs = require('fs');
const app = express();

let movieslist = JSON.parse(fs.readFileSync('./Moviesdata.json'));
app.use(express.json());
let moviesrouter = express.Router();

moviesrouter.param('id',(req,res,next,value)=>{
    console.log('The movie with id  '+value + '  is found ');
    
})
moviesrouter.route('/')
  .get((req, res) => {
    res.status(200).json({
      status: "success",
      count: movieslist.length,
      data: {
        movieslist: movieslist
      }
    });
  })
  .post((req, res) => {
    const newmovieid = movieslist.length > 0 ? movieslist[movieslist.length - 1].id + 1 : 1;
    const newmovie = Object.assign({ id: newmovieid }, req.body);
    movieslist.push(newmovie);

    fs.writeFile('./Moviesdata.json', JSON.stringify(movieslist), (error) => {
      if (error) {
        return res.status(500).json({
          status: "ERROR",
          message: "Error saving new movie"
        });
      }
      res.status(201).json({
        status: "success",
        data: {
          movie: newmovie,
        }
      });
    });
  });

// Route for '/api/movies/:id' to handle GET, PATCH, and DELETE requests
moviesrouter.route('/:id')
  .get((req, res) => {
    const reqedid = parseInt(req.params.id);
    const reqmov = movieslist.find(elm => elm.id === reqedid); 
    if (!reqmov) {
      return res.status(404).json({
        status: "ERROR",
        message: "Movie not found"
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        movie: reqmov
      }
    });
  })
  .patch((req, res) => {
    const indextoupdate = parseInt(req.params.id);
    let toupdatemovie = movieslist.find(ele => ele.id === indextoupdate);
    if (!toupdatemovie) {
      return res.status(404).json({
        status: "ERROR",
        message: "Movie not found"
      });
    }
    Object.assign(toupdatemovie, req.body);

    fs.writeFile('./Moviesdata.json', JSON.stringify(movieslist), (error) => {
      if (error) {
        return res.status(500).json({
          status: "ERROR",
          message: "Error updating movie"
        });
      }
      res.status(200).json({
        status: "success",
        data: {
          movie: toupdatemovie,
        }
      });
    });
  })
  .delete((req, res) => {
    const index = parseInt(req.params.id);
    const movietodelet = movieslist.find(ele => ele.id === index);
    if (!movietodelet) {
      return res.status(404).json({
        status: "ERROR",
        message: "Movie not found"
      });
    }
    const indexofmovie = movieslist.indexOf(movietodelet);
    movieslist.splice(indexofmovie, 1);

    fs.writeFile('./Moviesdata.json', JSON.stringify(movieslist), (error) => {
      if (error) {
        return res.status(500).json({
          status: "ERROR",
          message: "Error deleting movie"
        });
      }
      res.status(200).json({
        status: "success",
        data: null,
      });
    });
  });

// Mount the movies router on the '/api/movies' path
app.use('/api/movies', moviesrouter);

// Start the server
app.listen(3000, () => {
  console.log("The server has started on port 3000...");
});
