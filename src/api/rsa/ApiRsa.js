import { post } from "../../js/common/Request";

export function rsaGenerateKey(data, callback) {
    post(`/rsa/key`, data, response => callback(response))
}

export function rsaEncrypt(data, callback) {
    post(`/rsa/encrypt`, data, response => callback(response))
}

export function rsaDecrypt(data, callback) {
    post(`/rsa/decrypt`, data, response => callback(response))
}