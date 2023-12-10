require('dotenv').config();
const express = require('express');
const AuthRouter = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/auth', AuthRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on Port: ${port}`));
