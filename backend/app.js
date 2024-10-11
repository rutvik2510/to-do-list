const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const authRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const category = require('./routes/categoryRoutes');
const prority = require('./routes/priorityRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const corsOperation = {
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD ",
    credentials: true,
}
app.use(cors(corsOperation));

//app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware to parse JSON and URL-encoded data
app.use(express.json({ limit: '10mb' })); // Adjust the size limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Added express.urlencoded for form data

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/category', category);
app.use('/api/priority', prority);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));