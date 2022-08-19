import { post } from "../../js/common/Request";

export function md5Encryption (data, callback) {
    post(`/md5`, data, response => callback(response))
}