export function sortByAscendingOrder(products) {
    products.sort((a, b) => {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);
        return aDate - bDate;
    })
}
