import { post } from "../../js/common/Request";

export function aesEncrypt(data, mode, callback) {
    if (mode === `CBC`) {
        // CBC
        post(`/aes/cbc/encrypt`, data, response => callback(response))
    } else {
        // GCM
        post(`/aes/gcm/encrypt`, data, response => callback(response))
    }
}

export function aesDecrypt(data, mode, callback) {
    if (mode === `CBC`) {
        // CBC
        post(`/aes/cbc/decrypt`, data, response => callback(response))
    } else {
        // GCM
        post(`/aes/gcm/decrypt`, data, response => callback(response))
    }
}