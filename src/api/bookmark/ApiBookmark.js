import { get, post, del } from "../../js/common/Request";

export function bookmarkPage(data, callback) {
    post(`/bookmark/page`, data, response => callback(response))
}

export function bookmarmById(id, callback) {
    get(`/bookmark/` + id, {}, response => callback(response))
}

export function bookmarkSave(data, callback) {
    post(`/bookmark`, data, response => callback(response))
}

export function bookmarkDelete(id, callback) {
    del(`/bookmark/` + id, response => callback(response))
}

export function bookmarkByTag(tag, callback) {
    get(`/bookmark/bytag/` + tag, {}, response => callback(response))
}
