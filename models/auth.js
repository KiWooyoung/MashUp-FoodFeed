'use strict';
import mysql from 'mysql';
import dbPoolConfig from '../config/mysql_config';
const dbPool = mysql.createPool(dbPoolConfig);

class Auth {
    constructor() {}
    get name() {return this.name}
    set name(name) {this.name = name}

    static authFacebook(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('dbError'); //TODO Error 핸들링 로직을 잘 짜보기.
            }

            let duplicateInspection = () => {
                return new Promise((resolve, reject) => {
                    let sql = "SELECT * FROM user WHERE nickname=?";

                    dbConn.query(sql, [info.nickname], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (result.length === 1) {
                                resolve(1);
                            } else if (result.length === 0) {
                                resolve(0);
                            }
                        }
                    });
                });
            };
            //TODO 닉네임 중복 검사.
            let registerOrLogin = (checkResult) => {
                return new Promise((resolve, reject) => {
                    if (checkResult === 1) {
                        let sql = "SELECT id, nickname, facebook_code FROM user WHERE nickname=?";
                        dbConn.query(sql, [info.nickname], (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result)
                            }
                        })
                    } else if (checkResult === 0) {
                        let sql = "INSERT INTO user(nickname, facebook_code) VALUES(?,?);";

                        dbConn.query(sql, [info.nickname, info.facebookCode], (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                let value = {
                                    id: result.insertId,
                                    nickname: info.nickname,
                                    facebookCode: info.facebookCode
                                };
                                resolve(value)
                            }
                        })
                    }
                })
            };
            duplicateInspection()
                .then(registerOrLogin)
                .then((res) => {
                    dbConn.release();
                    return callback(null, res)
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error)
                })
        });
    }
}

export default Auth;
// export {authFacebook};
// export default authFacebook;
// module.exports.authFacebook = authFacebook;