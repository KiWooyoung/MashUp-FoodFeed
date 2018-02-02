'use strict';
import mysql from 'mysql';
import dbPoolConfig from '../config/mysql_config';
const dbPool = mysql.createPool(dbPoolConfig);

class User {

    //getUserInfo
    static getUserInfo(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }

            const selectUserInfo = () => {

            }
        })
    }

    //getUserFeeds
    static getUserFeeds(info, callback) {

    }

    //followUser
    static followUser(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }

            const following = () => {
                return new Promise((resolve, reject) => {
                    let sql = "INSERT INTO follow(follower_id, following_id) VALUES(?,?);";
                    dbConn.query(sql, [info.followerId, info.followingId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                });
            };
            following()
                .then((res) => {
                    dbConn.release();
                    return callback(null, res);
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error);
                })
        })
    }

    //unFollowUser
    static unFollowUser(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callack('DB Error');
            }
            const unFollowing = () => {
                return new Promise((resolve, reject) => {
                    let sql = "DELETE FROM follow WHERE follower_id=? AND following_id=?";
                    dbConn.query(sql, [info.followerId, info.followingId], (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result);
                        }
                    })
                })
            };
            unFollowing()
                .then((res) => {
                    dbConn.release();
                    return callback(null, res);
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error);
                })
        })
    }

    //isFollower?
    static isFollower(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }
            const checkFollow = () => {
                return new Promise((resolve, reject) => {
                    let sql = "SELECT * FROM follow WHERE follower_id=? AND following_id=?";
                    dbConn.query(sql, [info.followerId, info.followingId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (result.length === 0) {
                                resolve(false)
                            } else {
                                resolve(true);
                            }
                        }
                    })
                })
            };
            checkFollow()
                .then((val) => {
                    dbConn.release();
                    return callback(null, val);
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error);
                })
        })
    }

}

export default User;