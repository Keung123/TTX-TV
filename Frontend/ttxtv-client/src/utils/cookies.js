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
    let days = 7;
    let expireTime = new Date(new Date().getTime() + days * 24 * 3600 * 1000);
    cookies.set('userInfo', user, { path: '/', expires: expireTime })
    return;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
}

export const logoutRemoveCookie = () => {
    cookies.remove('userInfo')
}

export const theRoom = () => {
    let roomID = cookies.get('theRoom');
    return roomID;
}

export const enterRoom = (roomID) => {
    cookies.set('theRoom', roomID, { path: '/'});
    return;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
}

export const exitRoom = () => {
    cookies.remove('theRoom')
}