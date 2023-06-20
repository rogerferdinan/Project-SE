const mysql = require("mysql2")

const pool = mysql.createPool({
        host: "54.175.61.68",
        port: 3306,
        user: "ucharging",
        password: "ucharging",
        database: "ucharging_db",
        connectTimeout:30000
})

const promisePool = pool.promise();

async function queryWithExceptionHandler(callback) {
        try {
                return callback();
        } catch(err) {
                if(err.errno == -4039) {
                        return {
                                success: false,
                                return: "database is closed"
                        }
                } else if(err.errno == 1062) {
                        return {
                                success: false,
                                result: "user already exists"
                        }
                }
                return {
                        success: false,
                        result: err
                }
        }
}

module.exports = {
        promisePool,
        queryWithExceptionHandler
};
