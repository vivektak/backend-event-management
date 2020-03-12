const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();

// Routers
const userRoutes = require('./routes/user.routes');
const eventRoutes = require('./routes/event.routes');

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

mongoose.connect('mongodb://127.0.0.1:27017/event', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

app.use(express.static('public'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
	res.send('Event management Api is working');
});

app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);

app.listen(PORT);
