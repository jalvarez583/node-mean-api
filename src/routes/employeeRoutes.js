const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { collections } = require('../services/database');

// Crear un nuevo empleado
router.post('/employees', async (req, res) => {
    try {
        const newEmployee = req.body;
        const result = await collections.employees.insertOne(newEmployee);
        res.status(201).send(result.ops[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Obtener todos los empleados
router.get('/employees', async (req, res) => {
    try {
        const employees = await collections.employees.find({}).toArray();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener un empleado por ID
router.get('/employees/:id', async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const employee = await collections.employees.findOne({ _id: id });
        if (!employee) {
            return res.status(404).send();
        }
        res.status(200).send(employee);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar un empleado por ID
router.patch('/employees/:id', async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const updates = req.body;
        const result = await collections.employees.updateOne({ _id: id }, { $set: updates });
        if (result.matchedCount === 0) {
            return res.status(404).send();
        }
        const updatedEmployee = await collections.employees.findOne({ _id: id });
        res.status(200).send(updatedEmployee);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Eliminar un empleado por ID
router.delete('/employees/:id', async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const result = await collections.employees.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).send();
        }
        res.status(200).send({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
