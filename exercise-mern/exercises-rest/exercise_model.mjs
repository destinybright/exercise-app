import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';
const EXERCISE_COLLECTION = 'exercises';
const EXERCISE_CLASS = 'EXERCISE';

let connection = undefined;
let Exercise = undefined;

async function connect(dropCollection) {
    try {
        connection = await createConnection();
        console.log("Successfully connected to MongoDB using Mongoose!");

        if (dropCollection) {
            await connection.db.dropCollection(EXERCISE_COLLECTION);
        }

        Exercise = createExerciseModel();
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw new Error(`Could not connect to MongoDB: ${err.message}`);
    }
}

async function createConnection() {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
        dbName: EXERCISE_DB_NAME
    });
    return mongoose.connection;
}

function createExerciseModel() {
    const exerciseSchema = mongoose.Schema({
        name: { type: String, required: true },
        reps: { type: Number, required: true },
        weight: { type: Number, required: true },
        unit: { type: String, required: true },
        date: { type: String, required: true },
    });

    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}

export async function createExercise(name, reps, weight, unit, date) {
    try {
        const exercise = new Exercise({ name, reps, weight, unit, date });
        return await exercise.save();
    } catch (err) {
        console.error('Error creating exercise:', err);
        throw err;
    }
}

export async function findExercise(filter) {
    try {
        return await Exercise.find(filter).exec();
    } catch (err) {
        console.error('Error finding exercises:', err);
        throw err;
    }
}

export async function findExerciseById(_id) {
    try {
        return await Exercise.findById(_id).exec();
    } catch (err) {
        console.error('Error finding exercise by ID:', err);
        throw err;
    }
}

export async function updateExercise(_id, name, reps, weight, unit, date) {
    try {
        await Exercise.updateOne(
            { _id },
            { name, reps, weight, unit, date }
        );
        const updatedExercise = await Exercise.findById(_id);
        return updatedExercise;
    } catch (err) {
        console.error('Error updating exercise:', err);
        throw err;
    }
}

export async function deleteExerciseById(_id) {
    try {
        const result = await Exercise.deleteOne({ _id });
        return result.deletedCount;
    } catch (err) {
        console.error('Error deleting exercise by ID:', err);
        throw err;
    }
}

export { connect }
