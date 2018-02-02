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
                return new Promise((resolve, reject) => {
                    let sql = "SELECT U.id, U.nickname, " +
                        "U.profile_message, U.profile_img, " +
                        "(SELECT COUNT(*) FROM post WHERE user_id=?) " +
                        "AS feed_num, " +
                        "(SELECT COUNT(*) FROM follow WHERE following_id=?) " +
                        "AS follower_num,  " +
                        "(SELECT COUNT(*) FROM follow WHERE follower_id=?) " +
                        "AS following_num  " +
                        "FROM user U WHERE U.id=?;";
                    dbConn.query(sql, [info.userId, info.userId, info.userId, info.userId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(result);
                            resolve(result);
                        }
                    })
                })
            };
            selectUserInfo()
                .then((userInfo) => {
                    dbConn.release();
                    return callback(null, userInfo);
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return calblack(error);
                })
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