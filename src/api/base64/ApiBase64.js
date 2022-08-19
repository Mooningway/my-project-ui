import { post, postMultipart } from "../../js/common/Request";

export function base64Encryption(data, callback) {
    post(`/base64/encode`, data, response => callback(response))
}

export function base64Decryption(data, callback) {
    post(`/base64/decode`, data, response => callback(response))
}

export function base64EncryptionImage(data, callback) {
    postMultipart(`/base64/image`, data, response => callback(response))
}