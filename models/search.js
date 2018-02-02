'use strict';
import mysql from 'mysql';
import dbPoolConfig from '../config/mysql_config';
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

    }
    static makeRandomOrder(arr) {
        arr.sort((a, b) => {
            return 0.5 - Math.random()
        });
    }
}


export default Search;