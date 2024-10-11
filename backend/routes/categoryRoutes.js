const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware');
const categorycontroller = require('../controllers/categoryController');

const router = express.Router();

router.post("/addcategory", authMiddleware, categorycontroller.addcategory);
router.get("/getcategorybyid/:id", authMiddleware, categorycontroller.getcategorybyid);
router.get("/getallcategory", authMiddleware, categorycontroller.getallcategory);
router.put("/updatecategory/:id", authMiddleware, categorycontroller.updatecategory);
router.delete("/deletecategory/:id", authMiddleware, categorycontroller.deletecategory);

module.exports = router;