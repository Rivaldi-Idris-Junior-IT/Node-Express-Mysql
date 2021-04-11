const { json } = require("express");
const orderModel = require("../Models/Orders");

exports.createOrder = async (req, res) => {
  try {
    const create = await orderModel.createNewOrder(req.body);

    if (create.affectedRows > 0) {
      const newOrder = await orderModel.getOrderById(create.insertId);
      const findUser = await orderModel.getOrderUserById(newOrder[0].id);

      return res.json({
        success: true,
        message: "Success create order",
        result: findUser,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed create order",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrderUserById();
    return res.status(400).json({
      success: true,
      message: "Success get all Order",
      result: orders,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// Pagination ,Sort, Limit
exports.getConditionOrders = async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 2;
      const offset = limit * (page - 1);    
        
      const sort = req.query.sort || 'createdAt';
      const order = req.query.order || 'ASC'
      
      const countOrder = await orderModel.getCountOrder();
  
      const totalItem = countOrder[0].total;
      const totalPage = Math.ceil(countOrder[0].total / limit);
  
      if(totalPage >= page) {
          const orders = await orderModel.getConditionOrder({
              limit,
              offset,              
              sort,
              order
            });
  
            return res.json({
              success: true,
              message: "Success get all Order",
              result: {
                page,        
                totalItem: totalItem,
                totalPage: totalPage,
                data: orders
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
  

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const orderById = await orderModel.deleteOrder(req.params.id);

    if (!orderById) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await orderModel.deleteOrder(req.params.id);

    return res.json({
      status: true,
      message: "Success delete Order",
      result: orderById,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await orderModel.updateOrders(id, req.body);

    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updateOrder = await orderModel.getOrderById(id);

        return res.json({
          success: true,
          message: "Success update Order",
          result: updateOrder,
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
