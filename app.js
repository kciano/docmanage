const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


require('dotenv').config();


const app = express();


app.use(express.json()) 
app.use(morgan('dev')) 
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB connected ...'))
    .catch(err => console.log('DB CONNECTION ERROR', err))


const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const appointmentRoute = require('./routes/appointment.route')
const patientRoute = require('./routes/patient.route')

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', appointmentRoute);
app.use('/api', patientRoute);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))