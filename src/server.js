import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import 'dotenv/config';

const PORT = Number(process.env.PORT) || 3000;

const setupServer = () => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cors());
  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // GET /notes — повертає всі нотатки
  app.get('/notes', (req, res) => {
    res.status(200).json({
      message: 'Retrieved all notes',
    });
  });

  // GET /notes/:noteId — повертає одну нотатку за id
  app.get('/notes/:noteId', (req, res) => {
    const { noteId } = req.params;
    res.status(200).json({
      message: `Retrieved note with ID: ${noteId}`,
    });
  });

  // GET /test-error — спеціальний маршрут для тесту помилки
  app.get('/test-error', () => {
    throw new Error('Simulated server error');
  });

  // 404 — обробка неіснуючих маршрутів
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  // 500 — обробка помилок
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

setupServer();