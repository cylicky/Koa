const dotenv = require('dotenv');
const path = require('path');
// 需要配置一下本地 文件所在位置
//dotenv.config({ path: path.resolve(__dirname, '../.env') , allowEmptyValues: true});
dotenv.config({
    path: path.resolve(__dirname, '../.env'),
    allowEmptyValues: true
});

//导出配置文件
module.exports = process.env;
