if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/cacheWorker.js')
        .then(event => {
            console.log('serviceWorker зарегистрирован', event)
        }).catch(e => {
        console.log('ошибка при регистрации serviceWorker', e)
    })
}