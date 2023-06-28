const { queryWithExceptionHandler, promisePool : promise_pool } = require("./pool_connection");

async function insert_reserve_db(user_id, station_id, date) {
    return await queryWithExceptionHandler(async() => {
        const conn = await promise_pool.getConnection();
        await conn.beginTransaction();
        const [reserve, ] = await conn.query(`
        SELECT COALESCE(
            (SELECT 
                CONCAT("RV", LPAD( TRIM(LEADING "RV" FROM reserve_id)+1, 8, 0 )) 
            FROM reserve_history 
            ORDER BY reserve_id DESC 
            LIMIT 1),
            CONCAT("RV", LPAD(1, 8, 0))
        ) as reserve_id;
        `);
        const [rows, ] = await conn.query(`
        INSERT INTO reserve_history(reserve_id, user_id, station_id, reserve_date)
        VALUE (?,?,?,FROM_UNIXTIME(?))`, [reserve[0].reserve_id, user_id, station_id, date]);
        await conn.commit();
        return {
            success: true,
            result: "Reservation sucessfully added"
        }
    })
}

module.exports = insert_reserve_db;