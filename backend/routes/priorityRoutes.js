const express = require("express");
const { authMiddleware } = require('../middleware/authMiddleware');
const prioritycontroller = require("../controllers/priorityController");
const router = express.Router();

router.post("/addpriority", authMiddleware, prioritycontroller.addpriority);
router.post("/getprioritybyid/:id", authMiddleware, prioritycontroller.getprioritybyid);
router.get("/getallpriority", authMiddleware, prioritycontroller.getallpriority);
router.put("/updatepriority/:id", authMiddleware, prioritycontroller.updatepriority);
router.delete("/deletepriority/:id", authMiddleware, prioritycontroller.deletepriority);

module.exports = router;