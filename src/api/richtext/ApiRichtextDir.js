import { get, post, put, del } from "../../js/common/Request";

export function directoriesByParentId(parentId, callback) {
    get(`/articles/directory/` + parentId, {}, response => callback(response))
}