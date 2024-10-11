const Task = require("../models/task");
const User = require("../models/user");
const mongoose = require('mongoose');


function convertToDate(dueDateString) {
    // Split the DD/MM/YYYY string and create a new Date object
    const [day, month, year] = dueDateString.split('/');
    return new Date(`${year}-${month}-${day}T00:00:00Z`); // Convert to ISO format
}

async function addtask(req, res) {
    try {
        const userid = req.user._id;
        const { title, description, dueDate, priority, taskimage } = req.body;

        if (!title || !description || !dueDate || !priority) {
            return res.status(400).send({ message: 'All fields are required', success: false });
        }
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            taskimage: req.file ? `/uploads/${req.file.filename}` : null,
            createdBy: userid,
        });

        await task.save();

        res.status(201).send({ message: 'Task Added', success: true, task });
    } catch (error) {
        console.error('Error adding task:', error.message);
        res.status(500).send({ message: 'Server error', success: false });
    }
}
const updatetask = async(req, res) => {
    try {
        // Validate if task ID is provided and is a valid ObjectId
        const taskId = req.params.id.trim(); // Trim whitespace
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).send({ error: 'Invalid Task ID' });
        }

        // Find the task by ID
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }

        // Update the task with the new data
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });

        // Check if the update was successful
        if (!updatedTask) {
            return res.status(400).send({ error: 'Failed to update task' });
        }

        // Send the updated task as a response
        res.status(200).send(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).send({ error: 'Server error, failed to update task' });
    }
};






async function deleteTaskbyid(req, res) {
    try {
        const taskId = req.params.id.trim();
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).send({ error: 'Invalid Task ID' });
        }
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).send({ error: 'Task Not Found' });
        }
        res.status(200).send({ message: 'Task Deleted' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


async function gettaskbyid(req, res) {
    console.log(req.body);
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        console.log(id);
        if (!task) {
            res.status(404).send({ msg: "task id is not found", success: false });
        }
        return res.status(201).send({ msg: "This is task", task, success: true });
    } catch (error) {
        res.status(500).send({ error, success: false });
    }
}

async function getalltask(req, res) {
    try {
        const task = await Task.find().populate('priority', 'status');
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" });
    }
}

const addCollaborator = async(req, res) => {
    try {
        const { id: taskId } = req.params;
        const { collaboratername, status, createdAt } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res
                .status(404)
                .send({ message: "Task not found", success: false });
        }

        const user = await User.findById(collaboratername);
        if (!user) {
            return res
                .status(404)
                .send({ message: "Collaborator not found", success: false });
        }

        task.collaboraters.push({
            collaboratername,
            status: status || "Not started",
            createdAt: Date.now(),
        });

        await task.save();

        res.status(201).send({
            message: "Collaborator added successfully",
            task,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

const getFilteredTasks = async(req, res) => {
    try {
        const tasks = await Task.find({
            priority: { $in: ["Moderate", "Extreme"] },
        });

        res.status(201).send({
            success: true,
            tasks,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Unable to retrieve tasks",
        });
    }
};

const getTasksForUser = async(req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user._id });

        if (tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

        // Calculate task status percentages
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.status === 'Completed').length;
        const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
        const notStartedTasks = tasks.filter(task => task.status === 'Pending').length;

        const statusCounts = {
            completed: (completedTasks / totalTasks) * 100 || 0,
            inProgress: (inProgressTasks / totalTasks) * 100 || 0,
            notStarted: (notStartedTasks / totalTasks) * 100 || 0,
        };

        // Send tasks along with status counts
        res.status(200).json({ tasks, statusCounts });
    } catch (error) {
        res.status(500).send({ message: "Server Error", error });
        console.log(error);
    }
};

module.exports = {
    addtask,
    updatetask,
    deleteTaskbyid,
    gettaskbyid,
    getalltask,
    addCollaborator,
    getFilteredTasks,
    getTasksForUser
}