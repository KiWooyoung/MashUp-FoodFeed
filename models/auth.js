'use strict';
import mysql from 'mysql';
import async from 'async';
import dbPoolConfig from '../config/mysql_config';
const dbPool = mysql.createPool(dbPoolConfig);


/**
 * register via facebook
 *
 * 1.
 *
 * @param info
 * @param callback
 */
function authFacebook(info, callback) {

    console.log('aaaaaaaaaa');




}


// export default authFacebook;
module.exports.authFacebook = authFacebook;