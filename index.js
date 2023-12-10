require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AuthRouter = require('./routes/auth.routes');

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'https://accredian-frontend-task-blue.vercel.app'], credentials: true }));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api/auth', AuthRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on Port: ${port}`));
