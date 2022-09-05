import { post } from "../../js/common/Request";

export function rsaGenerateKey(data, callback) {
    post(`/rsa/x509/key`, data, response => callback(response))
}

export function rsaEncrypt(data, callback) {
    post(`/rsa/x509/encrypt`, data, response => callback(response))
}

export function rsaDecrypt(data, callback) {
    post(`/rsa/x509/decrypt`, data, response => callback(response))
}