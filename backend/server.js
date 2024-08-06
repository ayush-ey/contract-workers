const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const workRoutes = require('./routes/workRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', workRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
