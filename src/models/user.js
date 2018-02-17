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
                        "U.profile_message AS profileMessage, " +
                        "U.profile_img AS profileImg, " +
                        "(SELECT COUNT(*) FROM post WHERE user_id=?) " +
                        "AS feedNum, " +
                        "(SELECT COUNT(*) FROM follow WHERE following_id=?) " +
                        "AS followerNum,  " +
                        "(SELECT COUNT(*) FROM follow WHERE follower_id=?) " +
                        "AS followingNum  " +
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
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }
            const getFeeds = () => {
                return new Promise((resolve, reject) => {
                    let sql = "SELECT U.id AS userId, U.nickname, " +
                        "U.profile_img AS profileImg, " +
                        "P.id AS feedId, P.calorie, P.content, " +
                        "GROUP_CONCAT(distinct PI.img_url) AS imgUrl, " +
                        "GROUP_CONCAT(distinct H.name) AS hashtags " +
                        "FROM post P JOIN user U ON U.id=P.user_id " +
                        "JOIN post_image PI ON P.id=PI.post_id " +
                        "JOIN hashtag H ON P.id=H.post_id " +
                        "WHERE U.id=? " +
                        "GROUP BY P.id " +
                        "LIMIT 0, 1000;";
                    dbConn.query(sql, [info.userId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result)
                        }
                    })
                })
            };
            getFeeds()
                .then((res) => {
                    dbConn.release();
                    return callback(null, res)
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error);
                })
        });
    }

    static modifyUserInfo(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }
            const modifyInfo = () => {
                return new Promise((resolve, reject) => {
                    let sql = "UPDATE user SET profile_message=? WHERE id=?;";
                    dbConn.query(sql, [info.profileMessage, info.userId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result)
                        }
                    })
                })
            };
            modifyInfo()
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

    //uploadProfileImg
    static uploadProfileImg(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }
            const updateUserProfileImg = () => {
                return new Promise((resolve, reject) => {
                    let sql = "UPDATE user SET profile_img=? WHERE id=?;";
                    dbConn.query(sql, [info.profileImgUrl, info.userId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result)
                        }
                    })
                })
            };
            updateUserProfileImg()
                .then((res) => {
                    dbConn.release();
                    return callback(null, res)
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error);
                })
        })
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
                    dbConn.query(sql, [info.unfollowerId, info.followingId], (err, result) => {
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