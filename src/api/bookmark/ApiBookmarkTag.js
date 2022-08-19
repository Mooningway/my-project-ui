import { get, post, del } from "../../js/common/Request";

export function bookmarkTagPage(data, callback) {
    post(`/bookmark/tag/page`, data, response => callback(response))
}

export function bookmarkTagAll(callback) {
    get(`/bookmark/tag`, {}, response => callback(response))
}

export function bookmarmTagById(id, callback) {
    get(`/bookmark/tag/` + id, {}, response => callback(response))
}

export function bookmarkTagSave(data, callback) {
    post(`/bookmark/tag`, data, response => callback(response))
}

export function bookmarkTagDelete(id, callback) {
    del(`/bookmark/tag/` + id, response => callback(response))
}
