const { Sequelize } = require("sequelize");
const {
    MySQL_HOST,
    MySQL_PORT,
    MYSQL_USER,
    MySQL_PWD,
    MySQL_DB
} = require("../config/config.default");

const seq = new Sequelize(MySQL_DB, MYSQL_USER, MySQL_PWD, {
    host: MySQL_HOST,
    dialect: 'mysql'    // 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 
});
// seq.authenticate().then(res => console.log("数据库链接成功")).catch(error => {
//     console.log("数据库链接失败" + error);
// })


module.exports = seq;
