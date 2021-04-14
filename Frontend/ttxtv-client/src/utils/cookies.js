/**
 * @file Manage cookies operations.
 */

import cookie from 'react-cookies'

export const theLoginUser = () => {
    return cookie.load('userInfo')
}

export const loginNewCookie = (user) => {
    let days = 7;
    let expireTime = new Date(new Date().getTime() + days * 24 * 3600 * 1000);
    cookie.save('userInfo', user, { path: '/', expires: expireTime })
}

export const logoutRemoveCookie = () => {
    cookie.remove('userInfo')
}