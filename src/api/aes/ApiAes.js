import { post } from "../../js/common/Request";

export function aesEncrypt(data, callback) {
    data.operation = `encrypt`
    post(`/aes`, data, response => callback(response))
}

export function aesDecrypt(data, callback) {
    data.operation = `decrypt`
    post(`/aes`, data, response => callback(response))
}