import {CUSTOMER_URL} from "./api-list";


export const get = (url,cb ) => {
    fetch(url)
        .then(res => res.json())
        .then(json => {
            cb(json)
        } )
}

export const post = (url,body,cb) => {
    fetch(url,
        {method : `POST`,
            body : JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            cb(json)
        } )
}