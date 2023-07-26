const staticCache = 'static-cache-v1'
const dinamicCache = 'dinamic-cache-v2'

const assetsUrls = [
    'index.html',
    'globe.png'
]

self.addEventListener('install', async (event)=>{
    try {
        const cache = await caches.open(staticCache)
        await cache.addAll(assetsUrls)
    } catch (e) {
        console.log('ошибка при установке', e)
    }
})

self.addEventListener('activate', async (event)=>{
    const cacheNames = await caches.keys()
    await Promise.all(
        cacheNames
            .filter(name=>name !== staticCache)
            .filter(name=>name !== dinamicCache)
            .map(name=>caches.delete(name))
    )
})

self.addEventListener('fetch', event=>{
    try {
        event.respondWith(cacheFirst(event.request))
    } catch (e) {
        console.log('ошибка при кешировании в fetch', e)
    }

})

async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request)
        if (cachedResponse) {
            return cachedResponse
        }
        const response = await fetch(request.url)
        if(response && response.status === 200){
            const cache = await caches.open(dinamicCache)
            await cache.put(request, response.clone())
        }
        return response
    } catch(error) {
        console.log('Ошибка при кэшировании в cacheFirst', error)
    }
}

// function cacheFirst(request) {
//     return caches.open(dinamicCache).then((cache) =>
//         cache.match(request)
//             .then((matching) => matching || Promise.reject('Ошибка при кэшировании в cacheFirst'))
//     );
// }

// async function cacheFirst(request) {
//     const cache = await caches.open(dinamicCache)
//     const response = await cache.match(request.url)
//     return response ?? fetch(request).then(response=>{
//         // console.log('response', response)
//         cache.put(request.url, response)
//         return response
//     } )
// }


// const staticCache = 'static-cache-v1'
// const dinamicCache = 'dinamic-cache-v2'
//
// const assetsUrls = [
//     'index.html',
//     '1'
// ]
//
// self.addEventListener('install', async (event)=>{
//     const cache = await caches.open(staticCache)
//     await cache.addAll(assetsUrls)
//     console.log('установлен')
//     console.log(cache)
// })
//
// self.addEventListener('activate', async (event)=>{
//     console.log('активирован')
//
//     const cacheNames = await caches.keys()
//     await Promise.all(
//         cacheNames
//             .filter(name=>name !== staticCache)
//             .filter(name=>name !== dinamicCache)
//             .map(name=>caches.delete(name))
//     )
// })
//
// self.addEventListener('fetch', event=>{
//     console.log('происходит запрос на сервер')
//     // console.log(event.request.url)
//     const { request } = event
//     const url = new URL(request.url)
//     if(url.origin === location.origin){
//         event.respondWith(cacheFirst(request))
//     }
//     else event.respondWith(networkFirst(request))
//
// })
//
// async function cacheFirst(request) {
//     const cached = await caches.match(request)
//     return cached ?? await fetch(request)
// }
//
// async function networkFirst(request) {
//     const cache = await caches.open(dinamicCache)
//     try {
//         const response = await fetch(request)
//         await cache.put(request, response.clone())
//         return response
//     } catch (e) {
//         const cached = await cache.match(request)
//         return cached ?? await caches.match('1')
//     }
// }