// function untuk pagination. size(row data perhalaman), page(halaman), limit (jumlah limit data perhalaman)
const getPagination = (page = 0, size) => {
    const limit = size ? +size : 8;
    page = +page
    if (page > 0) {
        page = page - 1
    }
    const offset = page ? page * limit : 0;
    
    return { limit, offset, currentPage: page };
};

const getPaginationData = (data, page, limit) => {
    const { count: totalItems, rows: movies } = data;
    const currentPage = page
    const totalPages = Math.ceil(totalItems / limit) - 1;

    return { totalItems, movies, totalPages, currentPage };
};

module.exports = {
    getPagination,
    getPaginationData
}