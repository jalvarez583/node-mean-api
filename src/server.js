const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const { connectToDatabase } = require('./services/database');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://jorgeacerca:44%3FtegAcu@cluster0.v7vvfkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Cambia esto por tu URI de MongoDB

connectToDatabase(mongoURI).then(() => {
    console.log('Connected to MongoDB...');

    const corsOptions = {
        origin: '*', // Reemplaza esto por tu dominio permitido
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    };

    app.use(cors(corsOptions)); // Habilitar CORS con opciones específicas
    app.use(bodyParser.json());
    app.use('/api', employeeRoutes);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
});
