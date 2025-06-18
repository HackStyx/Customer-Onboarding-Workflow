require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const apiRoutes = require('./routes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Customer Onboarding Workflow API');
});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 