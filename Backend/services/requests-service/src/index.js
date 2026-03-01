const express = require('express');
const healthRoutes = require('./routes/health');
const { createLogger } = require('shared/logger');
const { requestContext } = require('shared/logger/middleware/requestContext');
const { createHttpLogger } = require('shared/logger/middleware/httpLogger');

const logger = createLogger('requests-service');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

// Logger middleware
app.use(requestContext);
app.use(createHttpLogger(logger));

app.use(healthRoutes);

app.listen(PORT, () => {
  logger.info('Service started', { meta: { port: PORT } });
});
