const express = require("express");
const { authMiddleware } = require('../middleware/authMiddleware');
const taskcontroller = require("../controllers/taskController");
const router = express.Router();
const upload = require('../middleware/multer');

router.post("/addtask", authMiddleware, upload.single('taskimage'), taskcontroller.addtask);
router.post("/addCollaborator/:id", authMiddleware, taskcontroller.addCollaborator);
router.post("/getalltask", authMiddleware, taskcontroller.getalltask);
router.get("/gettaskbyid/:id", authMiddleware, taskcontroller.gettaskbyid);
router.put("/updatetask/:id", authMiddleware, taskcontroller.updatetask);
router.delete("/deletetask/:id", authMiddleware, taskcontroller.deleteTaskbyid);
router.get("/getFilteredTasks", authMiddleware, taskcontroller.getFilteredTasks);
router.get("/getTasksForUser", authMiddleware, taskcontroller.getTasksForUser);

module.exports = router;