import express from 'express';
import * as model from './exercise_model.mjs';

const app = express();
const PORT = 3000;

app.use(express.json())

await model.connect();

// POST /exercise
app.post("/exercises", async (req, res) => {
    // define name, reps, weight, unit, date
    const name = req.body.name
    const reps = req.body.reps
    const weight = req.body.weight
    const unit = req.body.unit
    const date = req.body.date

     // validate the variables
    if (typeof name != 'string' || name.length <= 0) {
        return res.status(400).json({Error: "Invalid Request"})
    }

    if (typeof reps != 'number' || reps <= 0) {
        return res.status(400).json({Error: "Invalid Request"})
    }

    if (typeof weight != 'number' || weight <= 0) {
        return res.status(400).json({Error: "Invalid Request"})
    }

    if (!['kgs', 'lbs'].includes(unit)) {
        return res.status(400).json({Error: "Invalid Request"})
    }

    if (!/^\d\d-\d\d-\d\d$/.test(date)) {
        return res.status(400).json({Error: "Invalid Request"})
    }

    // create a variable that stores the array of the created exercise
    const exercise = await model.createExercise(name, reps, weight, unit, date)
    // return array with status code 201
    return res.status(201).json(exercise)
})

// GET /exercise
app.get("/exercises", async (req, res) => {
    // Initialize filter object
    const filter = {};
    if (req.query.name) {
        filter.name = req.query.name;
    }
    if (req.query.reps) {
        filter.age = req.query.reps;
    }
    if (req.query.weight) {
        filter.email = req.query.weight;
    }
    if (req.query.unit) {
        filter.phoneNumber = req.query.unit;
    }

    if (req.query.date) {
        filter.phoneNumber = req.query.date;
    }

    const exercise = await model.findExercise(filter);
    res.status(200).json(exercise);
});

// GET /exercise/:id
app.get("/exercises/:_id", async (req, res) => {
    // define id
    let id = req.params._id

    try {
        const exercise = await model.findExerciseById(id)
        if (!exercise) {
            return res.status(404).json({ Error: "Not found" });
        }
        res.status(200).json(exercise)
        }
        catch (error) {
            console.error(error)
            return res.status(404).json({"Error": "Not found"})
        }
    }
)

// PUT /exercise/:id
app.put("/exercises/:_id", async (req, res) => {
    const id = req.params._id
    const name = req.body.name
    const reps = req.body.reps
    const weight = req.body.weight
    const unit = req.body.unit
    const date = req.body.date

    // validate the variables
    if (typeof name != 'string' || name.length <= 0) {
        return res.status(400).json({Error: "Invalid Request"})
    }

    if (typeof reps != 'number' || reps <= 0) {
        return res.status(400).json({Error: "Invalid Request"})
    }

    if (typeof weight != 'number' || weight <= 0) {
        return res.status(400).json({Error: "Invalid Request"})
    }

    if (!['kgs', 'lbs'].includes(unit)) {
        return res.status(400).json({Error: "Invalid Request"})
    }

    if (!/^\d\d-\d\d-\d\d$/.test(date)) {
        return res.status(400).json({Error: "Invalid Request"})
    }

    try {
        const exercise = await model.updateExercise(id, name, reps, weight, unit, date)
        if (!exercise) {
            return res.status(404).json({ Error: "Not found" });
        }
        res.status(200).json(exercise)
        }
        catch (error) {
            res.status(404).json({"Error": "Not found"})
        }

})

// DELETE /exercise/:id
app.delete("/exercises/:_id", async (req, res) => {
    // define id
    let id = req.params._id
    try {
        const exercise = await model.deleteExerciseById(id)
        if (!exercise) {
            return res.status(404).json({ Error: "Not found" });
        }
        return res.status(204).send()
    }
        catch (error) {
            return res.status(404).json({"Error": "Not found"})
        }

    })

    // Don't change or add anything below this line
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
