const mongoose = require("mongoose");
const Category = require("../models/category");
const jwt = require("jsonwebtoken");

async function addcategory(req, res) {
    console.log(req.body);
    const userid = req.user._id; // Assuming req.user is populated by the authentication middleware
    const { Cname } = req.body;

    try {
        // Check if the category already exists
        const existingCategory = await Category.findOne({ Cname, createdBy: userid });
        if (existingCategory) {
            return res.status(400).send({ message: "Category Already Exists" });
        }

        // Create and save new category
        const newCategory = new Category({
            Cname,
            createdBy: userid, // Referencing the user who created it
        });

        await newCategory.save();
        res.status(201).send({ message: "Category Added Successfully", category: newCategory });
    } catch (error) {
        // Send a structured error response
        res.status(500).send({ error: error.message });
    }
}
async function getcategorybyid(req, res) {
    console.log(req.body);
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        console.log(id);
        if (!category) {
            res.status(404).send({ msg: "category id is not found" });
        }
        return res.status(201).send({
            Cname: category.Cname,
            createdBy: category.createdBy,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getallcategory(req, res) {
    try {
        const category = await Category.find();
        res.status(201).send({ category: category });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


async function updatecategory(req, res) {
    console.log(req.body);
    const { Cname, createdBy } = req.body;
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndUpdate(id);
        if (!category) {
            res.status(404).send({ message: "Category Not Found" });
        }
        category.Cname = Cname || category.Cname;
        category.createdBy = createdBy || category.createdBy;
        await category.save();
        res.status(201).send({ message: "Category Updated Sucessfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


async function deletecategory(req, res) {
    console.log(req.body);
    const { id } = req.params;
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            res.status(404).send({ message: "Category Not Found" });
        }
        res.status(201).send({ message: "Category Deleted Sucessfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    addcategory,
    getcategorybyid,
    getallcategory,
    updatecategory,
    deletecategory,
};