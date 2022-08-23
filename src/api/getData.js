function getData(callback) {
    const url = 'https://localhost:44362/api/products';
    fetch(url)
        .then((response) => response.json())
        .then(callback)
        .catch((err = 'loi') => callback(err));
}

export default getData;
