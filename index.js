const express = require('express');
const leadsRoutes = require('./routes/leads.routes.js');

const app = express();

app.use(express.json());

app.use('/api/leads', leadsRoutes);

app.listen(3000, () => {
    console.log("Server started at port 3000");
});

