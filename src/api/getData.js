function getData(callback) {
    const url = 'http://localhost:3000/products';
    fetch(url)
        .then((response) => response.json())
        .then(callback)
        .catch((err = 'loi') => callback(err));
}

export default getData;
