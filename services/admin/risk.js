import { get, post } from '@/services/request'

import {base_url} from "@/util/config";

/**
 * 获取风险列表
 */
export const getItems = (params, callback) => {
    const url = base_url + '/risk/user/items'
    return get(url, params, callback)
};
/**
 * 拉取风险单
 */
export const postPullingRisk = (params, callback) => {
    const url = base_url + '/risk/user/pulling_risk'
    return post(url, params, callback)
};
/**
 * 提交处理结果
 */
export const postSubmit = (params, callback) => {
    const url = base_url + '/risk/user/Submit'
    return post(url, params, callback)
};
/**
 * 转交处理结果
 */
export const postChangeSubmit = (params, callback) => {
    const url = base_url + '/risk/user/ChangeSubmit'
    return post(url, params, callback)
};
/**
 * 获取配置
 */
export const getRiskConfig = (params, callback) => {
    const url = base_url + '/risk/user/Getriskconfig'
    return get(url, params, callback)
};
/**
 * 获取统计
 */
export const getStatistics = (params, callback) => {
    const url = base_url + '/risk/user/getstatistics'
    return get(url, params, callback)
};
/**
 * 标记高风险用户
 */
export const postHighRisk = (params, callback) => {
    const url = base_url + '/risk/user/MarkHighRisk'
    return get(url, params, callback)
};