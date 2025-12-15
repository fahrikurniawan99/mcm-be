const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./config/database');

const filmRoutes = require('./routes/filmRoutes');
const { sendResponse } = require('./utils/response');
const studioRoutes = require('./routes/studioRoutes');
const showtimeRoutes = require('./routes/showtimeRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/films', filmRoutes);
app.use('/api/studios', studioRoutes);
app.use('/api/showtimes', showtimeRoutes);
app.use('/api/tickets', ticketRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    sendResponse(res, err.status || 500, false, err.message,);
});

const PORT = process.env.PORT || 5050;
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
