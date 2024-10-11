const User = require('../models/user'); // Use 'User' consistently
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// User Registration
exports.registerUser = async(req, res) => {
    const { FirstName, LastName, UserName, email, password, agreeTerms } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        // Create new user
        const newUser = new User({
            FirstName,
            LastName,
            UserName,
            email,
            password,
            profilePic: req.file ? `/uploads/${req.file.filename}` : null, // Password will be hashed in the pre-save hook
            agreeTerms
        });

        await newUser.save();

        // Optionally generate a JWT token for the user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '9h' });

        res.status(201).json({
            user: newUser,
            message: "User Registered Successfully",
            token,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};

// User Login
exports.loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Password does not match');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '9h' });
        res.json({ token, user, msg: "User logged in successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserById = async(req, res) => {
    const userId = req.params.id; // Get user ID from the request parameters
    // Get user ID from the token

    try {
        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ user, message: 'User retrieved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateById = async(req, res) => {
    const userId = req.user._id; // From authenticated token
    const { FirstName, LastName, UserName, email, password } = req.body;

    try {
        // Find user by ID
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the fields
        if (FirstName) user.FirstName = FirstName;
        if (LastName) user.LastName = LastName;
        if (UserName) user.UserName = UserName;
        if (email) user.email = email;

        // Handle file upload (profile picture)
        if (req.file) {
            user.profilepic = `/uploads/${req.file.filename}`;
        }

        // Check if password is provided
        if (password) {
            // Hash the new password before saving
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword; // Update the password
        }

        // Save updated user data
        await user.save();
        res.json({ user, message: 'User data updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Users
exports.getalluser = async(req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(400).send({ message: "No users found.", success: false });
        }
        res.status(200).send({ users, success: true });
    } catch (error) {
        res.status(500).send({ message: error.message, success: false });
    }
};

exports.ChangePassword = async(req, res) => {
    const { currentPassword, password } = req.body;

    // Basic validation
    if (!currentPassword || !password) {
        return res.status(400).json({ msg: 'Please provide all required fields.' });
    }

    try {
        // Debug: Log the req.user
        console.log("Request user:", req.user); // Log user info to debug

        // Ensure the userId is present in req.user
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ msg: 'Unauthorized access. Please log in again.' });
        }

        // Find the user by ID
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        // Check if currentPassword matches
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Current password is incorrect.' });
        }

        // Update the password
        user.password = await bcrypt.hash(password, 10); // Hash the new password
        await user.save();

        res.json({ msg: 'Password changed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
};