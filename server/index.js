const express = require("express");
const bodyParser = require("body-parser");
const uuidv4 = require("uuid/v4");

const app = express();
const port = 3111;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let workouts = [
  {
    id: uuidv4(),
    name: "My First Workout",
    date: new Date(),
    exercises: [{ name: "Push ups", sets: 4, reps: 10, weights: null }]
  }
];

app.get("/workouts.json", (req, res) => {
  res.json(workouts);
});

app.post("/workouts.json", (req, res) => {
  const workout = req.body.workout;

  workouts.push({
    id: uuidv4(),
    ...workout
  });

  res.json(workouts);
});

app.delete("/workouts.json", (req, res) => {
  workouts = workouts.filter(workout => {
    if (workout.id !== req.body.id) {
      return workout;
    }
  });
  res.json(workouts);
});

app.listen(port, () =>
  console.log(`Fitness app server listening on port ${port}!`)
);
