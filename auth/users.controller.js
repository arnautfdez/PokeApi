const uuid = require('uuid');
const crypto = require('../tools/crypto');
const teams = require('../teams/teams.controller');
const mongoose = require('mongoose');
const { to } = require("../tools/to");

const UserModel = mongoose.model('UserModel',
    { userName: String, password: String, userId: String });

const cleanUpUsers = () => {
    return new Promise(async (resolve, reject) => {
        await UserModel.deleteMany({}).exec();
        resolve();
    });
}

const registerUser = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        // Guardar en la base de datos nuestro usuario
        let userId = uuid.v4();
        let newUser = new UserModel({ userName: userName, password: password, userId: userId});
        await newUser.save();
        await teams.bootstrapTeam(userId);
        resolve();
    });
}

const getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let [err,result] = await to(UserModel.findOne({userId: userId}).exec());
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
}

const getUserIdFromUserName = (userName) => {
    return new Promise(async (resolve, reject) => {
        let [err,result] = await to(UserModel.findOne({userName: userName}).exec());
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
}

const checkUserCredentials = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let user = await getUserIdFromUserName(userName);
        if (user) {
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject('Missing user');
        }
    });
}

exports.registerUser = registerUser;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.checkUserCredentials = checkUserCredentials;
exports.getUser = getUser;
exports.cleanUpUsers = cleanUpUsers;