import 'dotenv/config';
import app from '@/app.js';
import logger from '@/lib/logger.lib.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running in http://localhost:${PORT}`, {
    label: 'Server',
  });
});
