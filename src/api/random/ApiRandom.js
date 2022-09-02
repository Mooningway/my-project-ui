import { post } from "../../js/common/Request";

export function randomString(data, callback) {
    post(`/randomString`, data, response => callback(response))
}