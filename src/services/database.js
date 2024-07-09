const mongodb = require('mongodb');

const collections = {
    employees: null,
};

async function connectToDatabase(uri) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("meanStackExample");
    await applySchemaValidation(db);

    const employeesCollection = db.collection("employees");
    collections.employees = employeesCollection;
}

// Apply schema validation to the employees collection
async function applySchemaValidation(db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                position: {
                    bsonType: "string",
                    description: "'position' is required and is a string",
                    minLength: 5
                },
                level: {
                    bsonType: "string",
                    description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                    enum: ["junior", "mid", "senior"],
                },
            },
        },
    };

    try {
        await db.command({
            collMod: "employees",
            validator: jsonSchema
        });
    } catch (error) {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("employees", {validator: jsonSchema});
        }
    }
}

module.exports = { connectToDatabase, collections };
