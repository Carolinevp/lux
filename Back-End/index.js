const express = require('express');
const cors = require('cors');
const port = 3001;
const router = require('./router');
const connection = require('./models/index');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

(async function () {
  try {
    await connection;
    console.log('DB connected');
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port} 🚀`);
    });
  } catch (err) {
    console.log(err);
  }
})();
