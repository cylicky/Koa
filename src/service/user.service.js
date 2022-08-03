const User = require("../model/use.model")
// 数据库操作
class UserService {
    async createUser(user_name, password) {
        //插入数据   await 表达式：返回的是一个Promise 对象值
        console.log("插入数据" + user_name, password);
        const res = await User.create({ user_name, password })
        //tode:写入数据库
        return res;
    }
    async getUserInfo({ id, user_name, password, is_admin }) {
        const whereOpt = {};
        //当这个ID存在什么都不做，有数据的时候就保存下来
        id && Object.assign(whereOpt, { id });
        user_name && Object.assign(whereOpt, { user_name });
        password && Object.assign(whereOpt, { password });
        is_admin && Object.assign(whereOpt, { is_admin });
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt
        });
    
        return res ? res : null;
    }
    async updateById({ id, user_name, password, is_admin }) {
        const whereOpt = { id };
        const newUser = {};
        user_name && Object.assign(newUser, { user_name });
        password && Object.assign(newUser, { password });
        is_admin && Object.assign(newUser, { is_admin });
        const res = await User.update(newUser, { where: whereOpt });
        return res[0] > 0 ? true : false;
    }
}

module.exports = new UserService();