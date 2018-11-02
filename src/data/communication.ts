import { string, any } from "prop-types";

export function get(url: string, params?: any) {
    return fetch(`${url}${buildQuery(params)}`, {
        method: 'GET',
        mode: 'cors'
    }).then(response => {
        return response.json();
    });
};

export function post(url: string, params: any, headers?: any, useFormData?: any) {
    return send(url, params, 'POST', headers, useFormData);
};

export function remove(url: string, params: any, headers?: any, useFormData?: any) {
    return send(url, params, 'DELETE', headers, useFormData);
}

function send(url: string, params: any, method: string, headers?: any, useFormData?: any) {
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
        method: method,
        mode: 'cors',
        headers: new Headers(headers),
        body: body
    }).then(response => {
        return response;
    });
}

function buildQuery(params) {
    var query = '';
    for (var name in params)
        query += `&${name}=${params[name] ? encodeURIComponent(params[name]) : ''}`;
    return query ? `?${query.substring(1)}` : query;
}