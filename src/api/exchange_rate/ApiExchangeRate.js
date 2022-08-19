import { get, post, put, del } from "../../js/common/Request";

export function exchangeRateCodeAll(callback) {
    get(`/exrate/code`, {}, response => callback(response))
}

export function exchangeRateRateData(callback) {
    get(`/exrate/ratedata`, {}, response => callback(response))
}

export function exchangeRateConvert(data, callback) {
    post(`/exrate/convert`, data, response => callback(response))
}

export function exchangeRateRateDataUpdate(code, callback) {
    put(`/exrate/rate/` + code, {}, response => callback(response))
}

export function exchangeRateRateDataDelete(code, callback) {
    del(`/exrate/rate/` + code, response => callback(response))
}