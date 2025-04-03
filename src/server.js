import express from 'express';
import { env } from '~/config/environment';
import { CONNECT_DB, GET_DB } from '~/config/mongodb';
import { errorHandlingMiddleware } from '~/middlewares/errorHandler';
import { APIs_V1 } from '~/routes/v1';
import { noResourceFound } from '~/middlewares/globalError';

const START_SERVER = () => {
  const app = express()
  const HOST = env.HOST;
  const PORT = env.PORT;

  //Enable req.body json
  app.use(express.json());

  app.use('/v1', APIs_V1);

  // Handle Method Not Allowed
  // app.use((req, res, next) => {
  //   if (req.route && !req.route.methods[req.method.toLowerCase()]) {
  //     return res.status(405).json({ error: 'Method Not Allowed' });
  //   }
  //   next();
  // });

  // Handle No Resource Found
  app.use(noResourceFound);

  app.use(errorHandlingMiddleware);

  app.listen(PORT, HOST, () => {
    console.log(`running at ${HOST}:${PORT}`);
  })
}

(async () => {
  try {
    await CONNECT_DB();
    // GET_DB();
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})()