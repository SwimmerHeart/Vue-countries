
export function parser(statusCode) {
    statusCode = String(statusCode)
    switch (statusCode) {
        case '305':
            statusCode = 'использовать прокси';
            break;
        case '400':
            statusCode = 'неправильный, некорректный запрос';
            break;
        case '401':
            statusCode = 'не авторизован (не представился)';
            break;
        case '403':
            statusCode = 'запрещено (не уполномочен)';
            break;
        case '404':
            statusCode = 'не найдено';
            break;
        case '418':
            statusCode = 'я — чайник';
            break;
        case '500':
            statusCode = 'внутренняя ошибка сервера';
            break;
        case '503':
            statusCode = 'сервис недоступен';
            break;
        case 'Failed to fetch':
            statusCode = 'не верный запрос к API';
            break;
            case 'Not found':
            statusCode = 'не найдено';
            break;
        case 'error json':
            statusCode = 'не верный формат возвращаемых данных';
            break;
        default:
            statusCode = `Неизвестная ошибка, Ошибка: ${statusCode}`;
    }
    return `При обращению к серверу произошла ошибка: ${statusCode}`
}

export function handlerResponse(response) {
    console.log('handlerResponse')
    if (!response.ok) {

        return Promise.reject(new Error(response.status, {cause: response}))
        // throw new Error(response.status, {cause: response})
    }
    return response
}

export function handlerToJSON(response) {
    console.log('handlerToJSON')
    return response.json()
        .catch((error)=>{
            return Promise.reject(new Error('error json'))
        })
}

export async function handlerError(error) {
    console.log('errorHandlers: ', error)
    let messageError = parser(error.message)

    if (error.cause) {
        const response = error.cause
        const data = await response.json()
        console.log(data)
        messageError = parser(data.detail)
    }

    return Promise.reject(messageError)
}



