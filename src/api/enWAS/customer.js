import { fetch } from 'utils/fetch';
let  method = 'post'

export function getCustomerIP(customerId) {
    return fetch({
        url: '/api/enwas/customer/ip/list',
        method: method,
        body: customerId
    });
}

export function addCustomerIP(customerId) {
    return fetch({
        url: '/api/enwas/customer/ip/add',
        method: method,
        body: customerId
    });
}

export function updateCustomerIP(customerId) {
    return fetch({
        url: '/api/enwas/customer/ip/modify',
        method: method,
        body: customerId
    });
}

export function deleteCustomerIP(customerId) {
    return fetch({
        url: '/api/enwas/customer/ip/del',
        method: method,
        body: customerId
    });
}

// =============================================================

export function getCustomer(name) {
    return fetch({
        url: '/api/enwas/customer/list',
        method: method,
        body: name
    });
}

export function addCustomer(name) {
    return fetch({
        url: '/api/enwas/customer/add',
        method: method,
        body: name
    });
}

export function updateCustomer(name) {
    return fetch({
        url: '/api/enwas/customer/modify',
        method: method,
        body: name
    });
}

export function deleteCustomer(name) {
    return fetch({
        url: '/api/enwas/customer/del',
        method: method,
        body: name
    });
}