'use strict';
import mysql from 'mysql';
import dbPoolConfig from '../config/mysql_config';
const dbPool = mysql.createPool(dbPoolConfig);

class Search {

}

export default Search;