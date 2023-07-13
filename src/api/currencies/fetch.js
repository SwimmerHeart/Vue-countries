import {handlerError, handlerResponse, handlerToJSON} from "@/api/currencies/handlers";

export function query(url, config, {handlers} = {}) {
    // console.warn('handlers', handlers)
    // проверять массив или просто объект в handlers
    // что если мы передаем handlers, но не передаем catch

    let _fetch = fetch(url, config).then(handlerResponse)
    // флаг для проверки того, нужно ли прервать выполнение цепочки промисов после текущей итерации цикла
    let shouldBreak = false;
    if (handlers?.then) {
        if (Array.isArray(handlers.catch)) {
            for (let func of handlers.catch) {
                //не пустой ли объект
                if (func) {
                    _fetch = _fetch.catch(func)
                }
            }
        } else {
            _fetch = _fetch.catch(handlers.catch)
        }
    } else {
        _fetch = _fetch
            .then(handlerToJSON)
    }
    if (handlers?.catch) {
        //проверяем на массив catch
        if (Array.isArray(handlers.catch)) {
            for (let func of handlers.catch) {
                //не пустой ли объект
                if (func) {
                    //передаем свой handler
                    _fetch = _fetch
                        .catch(func)
                }
            }
        } else {
            _fetch = _fetch.catch(handlers.catch)
        }
    } else {
        //catch по умолчанию
        _fetch = _fetch.catch(handlerError)
    }

    // console.warn('_fetch', _fetch)
    return _fetch
}

export function GET(url, params, options) {
    const paramsString = new URLSearchParams(params).toString()
    return query(`${url}?${paramsString}`, undefined, options)
}

export function POST(url, data) {
    return query(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export function PATCH(url, data) {
    return query(url, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export function DELETE(url, params) {
    const paramsString = new URLSearchParams(params).toString()
    return query(`${url}?${paramsString}`, {method: 'DELETE'})
}