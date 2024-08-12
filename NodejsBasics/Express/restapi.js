const express = require('express');
const fs = require('fs');
let movieslist = JSON.parse(fs.readFileSync('./Moviesdata.json'));
const app = express();
app.use(express.json());

// Route for '/api/movies' to handle GET and POST requests
app.route('/api/movies')
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
    const newmovieid = movieslist[movieslist.length - 1].id + 1;
    const newmovie = Object.assign({ id: newmovieid }, req.body);
    movieslist.push(newmovie);

    fs.writeFile('./Moviesdata.json', JSON.stringify(movieslist), (error) => {
      res.status(201).json({
        status: "success",
        data: {
          movieslist: newmovie,
        }
      });
    });
  });

// Route for '/api/movies/:id' to handle GET, PATCH, and DELETE requests
app.route('/api/movies/:id')
  .get((req, res) => {
    const reqedid = parseInt(req.params.id);
    const reqmov = movieslist.find(elm => elm.id === reqedid); 
    if (!reqmov) {
      return res.status(404).send("Movie not found");
    }
    res.status(200).json({
      status: "success",
      data: {
        reqmov: reqmov
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
    let toupdatemovieindex = movieslist.indexOf(toupdatemovie);
    Object.assign(toupdatemovie, req.body);
    movieslist[toupdatemovieindex] = toupdatemovie;

    fs.writeFile('./Moviesdata.json', JSON.stringify(movieslist), (error) => {
      if (error) {
        return res.status(500).json({
          status: "ERROR",
          message: "Error updating movie"
        });
      }
      res.status(200).json({
        status: "success",
        data: toupdatemovie,
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

app.listen(3000, () => {
  console.log("The server has started...");
});
