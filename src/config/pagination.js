const paginate = async (db, query, params = [], page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        // Query to get the paginated data
        const paginatedQuery = `${query} LIMIT ? OFFSET ?`;
        const [data] = await db.query(paginatedQuery, [...params, limit, offset]);

        // Query to get the total count
        const countQuery = `SELECT COUNT(*) AS total FROM (${query}) AS totalTable`;
        const [countResult] = await db.query(countQuery, params);
        const total = countResult[0].total;

        return {
            data,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = paginate;
