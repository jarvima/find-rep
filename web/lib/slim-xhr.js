const xhr = (method, url, headers, data, cb) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, url, true);
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
            cb(xmlhttp);
        }
    }
    Object.keys(headers).forEach(key => {
        xmlhttp.setRequestHeader(key, headers[key]);
    });
    xmlhttp.send(data);
}

const doRequest = (method, url, data, headers = {}) => {
    headers['Content-type'] = headers['Content-type'] || 'application/json';
    headers['Accept'] = headers['Accept'] || 'application/json';

    return new Promise((resolve, reject) => {
        xhr(method, encodeURI(url), headers, JSON.stringify(data), (xmlhttp) => {
            if (xmlhttp.status < 300) {
                if (xmlhttp.response && headers['Accept'] === 'application/json') {
                    xmlhttp.responseData = JSON.parse(xmlhttp.response);
                }
                resolve(xmlhttp);
            }
            else {
                reject(xmlhttp);
            }
        });
    });
}

const doGet = (url, headers) => {
    return doRequest('GET', url, null, headers);
}

const doPost = (url, data, headers) => {
    return doRequest('POST', url, data, headers);
}

const doPut = (url, data, headers) => {
    return doRequest('PUT', url, data, headers);
}

const doDelete = (url, headers) => {
    return doRequest('DELETE', url, null, headers);
}

export default {
    get: doGet,
    post: doPost,
    put: doPut,
    delete: doDelete
}
