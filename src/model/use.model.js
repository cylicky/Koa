const { DataTypes } = require('sequelize');
const seq = require("../db/seq");

//创建模型
const User = seq.define("zd_User", {
    //ID 会被sequelize自动创建子增加
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,  //是否允许为空
        unique: true,      //字段是唯一的
        comment: "用户名，唯一"
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,  //是否为空
        comment: "密码"
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: "是否为管理员 0: 是管理员 1: 是管理员"
    }
}, {
    // timestamps: false   //参数的模型,禁用此行为创建时间戳
});
//User.sync({ force: true });  // 强制同步数据库 用户模型表刚刚(重新)创建！
module.exports = User;
