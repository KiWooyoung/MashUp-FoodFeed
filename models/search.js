'use strict';
import mysql from 'mysql';
import dbPoolConfig from '../config/mysql_config';
import SQLS from '../service/constant';
const dbPool = mysql.createPool(dbPoolConfig);
const INGREDIENT = ['병아리콩','샐러드','토마토', '양상추', '베이컨', '감자', '아스파라거스', '마', '사과', '꿀', '두부', '닭가슴살', '순두부'];
const USER = ['유병한', '고은이', '기우영', '박종훈', '김현섭', '김동현'];

class Search {

    static rcmdIngredient(callback) {
        this.makeRandomOrder(INGREDIENT);
        return callback(null, INGREDIENT);
    }

    static rcmdUser(callback) {
        this.makeRandomOrder(USER);
        return callback(null, USER);
    }

    static search(info, callback) {
        dbPool.getConnection((err, dbConn) => {
            if (err) {
                return callback('DB Error');
            }
            let sql;
            let data = [];
            console.log(info.hashtag);
            if (typeof info.hashtag === 'undefined' && typeof info.nickname === 'undefined') {
                sql = SQLS.onlyKalSql;
                data.push(info.startCalorie);
                data.push(info.endCalorie);
            } else if (typeof info.hashtag === 'undefined') {
                sql = SQLS.omitTagSql;
                data.push(info.nickname);
                data.push(info.startCalorie);
                data.push(info.endCalorie);
            } else if (typeof info.nickname === 'undefined') {
                sql = SQLS.omitNameSql;
                data.push(info.startCalorie);
                data.push(info.endCalorie);
                data.push(info.hashtag);
            } else {
                sql = SQLS.fullSql;
                data.push(info.nickname);
                data.push(info.startCalorie);
                data.push(info.endCalorie);
                data.push(info.hashtag);
            }
            const getSearchdFeedData = () => {
                return new Promise((resolve, reject) => {

                    dbConn.query(sql, data, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                })
            };
            const getAllLikedFeed = () => {
                return new Promise((resolve, reject) =>  {
                    let sql = "SELECT post_id FROM post_like WHERE user_id=?;";

                    dbConn.query(sql, [info.userId], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results)
                        }
                    })
                })
            };
            Promise.all([getSearchdFeedData(), getAllLikedFeed()])
                .then((res) => {
                    let values = {
                        feedData : res[0],
                        likedPostId : res[1]
                    };
                    dbConn.release();
                    return callback(null, values)
                })
                .catch((error) => {
                    console.log(error);
                    dbConn.release();
                    return callback(error);
                })
        });

    }

    static makeRandomOrder(arr) {
        arr.sort((a, b) => {
            return 0.5 - Math.random()
        });
    }
}


export default Search;