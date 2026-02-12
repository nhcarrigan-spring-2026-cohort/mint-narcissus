const express = require('express');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(healthRoutes);

app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
