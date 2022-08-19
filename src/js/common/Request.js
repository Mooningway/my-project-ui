import axios from 'axios'

const service = axios.create({
    baseURL: `/api`,    // api 的 BaseUrl
    // baseURL: `/api`,    // api 的 BaseUrl
    timeout: 5000,      // 請求超時（單位：ms）
})

// request 攔截器
service.interceptors.request.use(config => {
    // console.log(config)
    // config.headers = token()
    return config
}, error => {
    console.log(error)
    return Promise.reject(error)
})

// respone 攔截器
service.interceptors.response.use(response => {
    // if (Number(response.data.code) === 1000) {
    //     window.location.href = `/index`
    // }
    return response.data
}, error => {
    console.log(error.response)
    return Promise.reject(error)
})

export function get(url, params = {}, callback) {
    service.get(url, {
        params: params
    }).then(response => {
        callback(response)
    }).catch(error => {
        console.log(error)
    })
}

export function post(url, data = {}, callback) {
    service.post(url, data).then(response => {
        callback(response)
    }).catch(error => {
        console.log(error)
    })
}

export function postMultipart(url, data = {}, callback) {
    let config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
    service.post(url, data, config).then(response => {
        callback(response)
    }).catch(error => {
        console.log(error)
    })
}

export function put(url, data = {}, callback) {
    service.put(url, data).then(response => {
        callback(response)
    }).catch(error => {
        console.log(error)
    })
}

export function del(url, callback) {
    service.delete(url).then(response => {
        callback(response)
    }).catch(error => {
        console.log(error)
    })
}