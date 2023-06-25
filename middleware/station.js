



async function get_station_detail(station_id, longitude, latitude) {
    return await queryWithExceptionHandler(async () => {
        const conn = await promise_pool.getConnection();
        const [rows, ] = await conn.query(`
        SELECT 
            station_name,
            station_address,
            charging_power,
            CASE
                WHEN distance < 1000 THEN CONCAT(ROUND(distance, 0), " m")
                ELSE CONCAT(ROUND(distance / 1000, 2), " km")
            END as distance
        FROM (
            SELECT 
                station_id,
                station_name, 
                longitude, 
                latitude,
                station_address,
                charging_power,
                ST_DISTANCE_SPHERE(point(longitude, latitude), point(?, ?)) as distance
            from stations
            ORDER BY distance) as s
        WHERE station_id=?
        LIMIT 1`, [longitude, latitude, station_id]);
        return {
            success: true,
            result: rows
        };
    })
}

module.exports = {
    get_station_detail
}