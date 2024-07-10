const express = require('express');
const cors = require('cors'); // Importar cors
const app = express();
const port = process.env.PORT || 3000;

// Permitir CORS para todas las solicitudes
app.use(cors());

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];

app.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});