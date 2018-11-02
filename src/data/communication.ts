export function get(url: string, params?: any) {
    return fetch(`${url}${buildQuery(params)}`, {
        method: 'GET',
        mode: 'cors'
    }).then(response => {
        return response.json();
    });
};

export function post(url: string, params: any, headers?: any, useFormData?: any) {
    var body;
    if (useFormData) {
        body = new FormData();
        for (var name in params) {
            body.append(name, params[name]);
        }
    } else {
        body = JSON.stringify(params);
    }

    headers = headers || {};
    if (!headers['Content-Type'])
        headers['Content-Type'] = 'application/json';

    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: new Headers(headers),
        body: body
    }).then(response => {
        return response;
    });
};

function buildQuery(params) {
    var query = '';
    for (var name in params)
        query += `&${name}=${params[name] ? encodeURIComponent(params[name]) : ''}`;
    return query ? `?${query.substring(1)}` : query;
}