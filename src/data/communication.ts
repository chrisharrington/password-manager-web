export function get(url: string, params?: any) {
    return fetch(`${url}${buildQuery(params)}`, {
        method: 'GET',
        mode: 'cors'
    }).then(response => {
        return response.json();
    });
};

export function post(url, params, headers, useFormData) {
    var body;
    if (useFormData) {
        body = new FormData();
        for (var name in params) {
            body.append(name, params[name]);
        }
    } else {
        body = JSON.stringify(params);
    }
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: new Headers(headers),
        body: body
    });
};

function buildQuery(params) {
    var query = '';
    for (var name in params)
        query += `&${name}=${params[name] ? encodeURIComponent(params[name]) : ''}`;
    return query ? `?${query.substring(1)}` : query;
}