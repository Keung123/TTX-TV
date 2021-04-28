/**
 * @file Manage cookies operations.
 */

import Cookies from 'universal-cookie'

const cookies = new Cookies();

export const theLoginUser = () => {
    let user = cookies.get('userInfo');
    return user;
}

export const loginNewCookie = (user) => {
    let days = 1/24;
    let expireTime = new Date(new Date().getTime() + days * 24 * 3600 * 1000);
    cookies.set('userInfo', user, { path: '/', expires: expireTime })
    return;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
}

export const logoutRemoveCookie = () => {
    cookies.remove('userInfo')
}