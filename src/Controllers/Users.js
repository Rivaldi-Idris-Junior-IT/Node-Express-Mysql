const { json } = require("express");
const userModel = require("../Models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUsers = async (req, res) => {
  try {
    const checkEmail = await userModel.getEmailUser(req.body.email);
    if (checkEmail.length >= 1) {
      return res.status(400).json({
        success: false,
        message: "Email Exists",
      });
    } else {
      const formPassword = req.body.password;
      const encryptedPassword = await bcrypt.hash(formPassword, saltRounds);
      let userForm = {
        fullname: req.body.fullname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        avatar: req.body.avatar,
        date_of_birth: req.body.date_of_birth,
        password: encryptedPassword,
        address: req.body.address,
        role: req.body.role,
      };

      const create = await userModel.createNewUsers(userForm);

      if (create.affectedRows > 0) {
        const newUser = await userModel.getUserById(create.insertId);

        return res.json({
          success: true,
          message: "Success create user",
          result: newUser,
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: "Failed create user",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

exports.loginUsers = async (req, res, results) => {
  try {
    const checkEmail = await userModel.getEmailUser(req.body.email);
    const formPassword = req.body.password;
    if (checkEmail.length < 1) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    } else {
      const comparePassword = await bcrypt.compare(
        formPassword,
        checkEmail[0].password
      );

      if (comparePassword) {
        return res.status(200).json({
          success: true,
          message: "Success",
          result: {
            fullname: checkEmail[0].fullname,
            email: checkEmail[0].email,
          },
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Wrong Password",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const userById = await userModel.deleteUser(req.params.id);
  
      if (!userById) {
        return res.status(404).json({
          success: false,
          message: "User data not found",
        });
      }
  
      await userModel.deleteUser(req.params.id);
  
      return res.json({
        status: true,
        message: "Success delete User",
        result: userById,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Server Error",
      });
    }
  };
  