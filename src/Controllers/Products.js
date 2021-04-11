const { json } = require("express");
const productModel = require("../Models/Products");

exports.createProduct = async (req, res) => {
  try {
    const create = await productModel.createNewProduct(req.body);

    if (create.affectedRows > 0) {
      const newProduct = await productModel.getProductById(create.insertId);

      return res.json({
        success: true,
        message: "Success create product",
        result: newProduct,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed create product",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    return res.status(400).json({
      success: true,
      message: "Success get all products",
      result: products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// Pagination
exports.getConditionProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = limit * (page - 1);    

    const search = req.query.search || "";
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'ASC'
    
    const countProducts = await productModel.getCountProduct({
        search
    });

    const totalItem = countProducts[0].total;
    const totalPage = Math.ceil(countProducts[0].total / limit);

    if(totalPage >= page) {
        const products = await productModel.getConditionProducts({
            limit,
            offset,
            search,
            sort,
            order
          });

          return res.json({
            success: true,
            message: "Success get all products",
            result: {
              page,        
              totalItem: totalItem,
              totalPage: totalPage,
              data: products
            }
          });
    }else {
        return res.status(400).json({
            success: false,
            message: "Page not found",
          });
    }

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await productModel.updateProduct(id, req.body);

    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updateProduct = await productModel.getProductById(id);

        return res.json({
          success: true,
          message: "Success update product",
          result: updateProduct,
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

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productById = await productModel.deleteProduct(req.params.id);

    if (!productById) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await productModel.deleteProduct(req.params.id);

    return res.json({
      status: true,
      message: "Success delete product",
      result: productById,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
