export const calculateQueryOffset = (pageNum, limitPerPage) => parseInt(limitPerPage * (pageNum - 1), 10);
export const calculatePagesLeft = (total, currentPageNum, limitPerPage) => {
    const queryOffset = calculateQueryOffset(currentPageNum, limitPerPage);
    const itemsLeft = total - queryOffset;
    return Math.floor(itemsLeft / limitPerPage);
};

const sortObjectProperties = (object) => {
    const keys = Object.keys(object);
    const length = keys.length;
    // const i = 0;
    keys.sort();
    const ret = {};
    for (let i = 0; i < length; i++) {
        const k = keys[i];
        ret[k] = object[k];
    }
    return ret;
};

export function isQueryEqual(query1, query2) {
    return JSON.stringify(sortObjectProperties(query1)) === JSON.stringify(sortObjectProperties(query2));
}
