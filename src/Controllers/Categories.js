const { json } = require("express");
const categoryModel = require("../Models/Categories");

exports.createCategory = async (req, res) => {
  try {
    const create = await categoryModel.createNewCategory(req.body);

    if (create.affectedRows > 0) {
      const newCategory = await categoryModel.getCategoryById(create.insertId);

      return res.json({
        success: true,
        message: "Success create Category",
        result: newCategory,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed create Category",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const Categories = await categoryModel.getAllCategories();
    return res.status(400).json({
      success: true,
      message: "Success get all Categories",
      result: Categories,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await categoryModel.updateCategory(id, req.body);

    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updateCategory = await categoryModel.getCategoryById(id);

        return res.json({
          success: true,
          message: "Success update Category",
          result: updateCategory,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Data has same with currently data",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

exports.deleteCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const CategoryById = await categoryModel.deleteCategory(req.params.id);
  
      if (!CategoryById) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
  
      await categoryModel.deleteCategory(req.params.id);
  
      return res.json({
        status: true,
        message: "Success delete Category",
        result: CategoryById,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Server Error",
      });
    }
  };
  