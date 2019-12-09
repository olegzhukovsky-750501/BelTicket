import config from './config.json'

const baseUrl = config.baseUrl

export function login(body) {
    return callPost(baseUrl + '/login', body);
}

export function register(body) {
    return callPost(baseUrl + '/register', body);
}

export function routes() {
    return callGet(baseUrl + '/bus/routes');
}

export function route(station) {
    return callGet(baseUrl + '/bus/route/' + station);
}

export function buses() {
    return callGet(baseUrl + '/bus/buses/');
}

export function busesByRoute(route) {
    return callGet(baseUrl + '/bus/buses/' + route);
}

export function schedules() {
    return callGet(baseUrl + '/bus/schedules/');
}

export function validateCard(body) {
    return callPost(baseUrl + '/payment/card', body);
}

export function buyTicket(body) {
    return callPost(baseUrl + '/bus/tickets', body);
}

export function getTickets(user) {
    return callGet(baseUrl + '/bus/tickets/' + user);
}

export function updateAccount(body, id) {
    return callPut(baseUrl + '/users/' + id, body)
}

const callGet = (url) => {
    return fetch(url).then(handleres);
}

const callPost = (url, body) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(handleres);
}

const callPut = (url, body) => {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(handleres);
}

const handleres = (res) => {
    if (res.ok) {
        return res.json();
    }
    else {
        if (res.status === 404) {
            return Promise.reject();
        } else {
            throw res.json();
        }
    }
}
