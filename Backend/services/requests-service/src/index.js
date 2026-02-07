const express = require('express');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(healthRoutes);

app.listen(PORT, () => {
  console.log(`Requests service listening on port ${PORT}`);
});
