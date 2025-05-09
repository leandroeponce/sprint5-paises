import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://Grupo-08:grupo08@cursadanodejs.ls9ii.mongodb.net/Node-js');
            console.log('Conexión exitosa a mongoDB');
    } catch (error) {
        console.error('Error al conectar a mongoDB');
        process.exit(1);
    }
}