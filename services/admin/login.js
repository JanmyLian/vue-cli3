import { get, post } from '@/services/request'
import {base_url} from "@/util/config";
// const base_url = 'http://kfdatatest.oa.com'

/**
 * 检查登录
 */
export const loginCheck = (params, callback) => {
    const url = base_url + '/auth/login/check'
    return post(url, params, callback)
}

/**
 * 登录
 */
export const login = url => {
	window.location.href = base_url+'/auth/login/index?url='+encodeURI(window.location.href)
}

/**
 * 退出登录
 */
export const loginOut = url => {
	window.location.href = base_url+'/auth/login/logout/?url='+encodeURI(url)
}

/**
 * 获取员工
 */
export const getStaff = (params, callback) => {
    const url = base_url + '/admin315/common/getStaffs'
    return get(url, params, callback)
}
/**
 * 获取员工权限配置
 */
export const getRightconfig = (params, callback) => {
    const url = base_url + '/auth/login/Getrightconfig'
    return get(url, params, callback)
}