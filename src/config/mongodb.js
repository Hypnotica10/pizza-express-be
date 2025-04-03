import mongoose from "mongoose";
import { env } from "./environment";

const dbState = [{
    value: 0,
    label: "disconnected"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
},
{
    value: 3,
    label: "disconnecting"
}];

const MONGODB_URI = `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@cluster0.s9z1u.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

export const CONNECT_DB = async () => {
    await mongoose.connect(MONGODB_URI);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value == state).label, "to db");
    return mongoose.connection;
}

export const GET_DB = () => {
    mongoose.connection.db
        .listCollections()
        .toArray()
        .then(coll => console.log(coll));
}

export const CLOSE_DB = async () => {
    mongoose.connection.close();
}