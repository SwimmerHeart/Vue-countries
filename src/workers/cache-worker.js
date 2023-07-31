const staticCache = 'static-cache-v1'
const dinamicCache = 'dinamic-cache-v2'

const assetsUrls = [
    'index.html',
    'globe.png',
    'https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/fonts/materialdesignicons-webfont.woff2?v=5.8.55',

]

self.addEventListener('install', async (event)=>{
    try {
        // console.log('установлен')
        const cache = await caches.open(staticCache)
        await cache.addAll(assetsUrls)
    } catch (e) {
        console.log('ошибка при установке', e)
    }
})

self.addEventListener('activate', async (event)=>{
    // console.log('активирован')
    event.waitUntil(clients.claim())
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
        // console.log('fetch запрос')
        if(event.request.headers.get('Custom-Cache')){
            event.respondWith(cacheFirst(event.request))
        }
        else event.respondWith(fetch(event.request))
    } catch (error) {
        console.log('ошибка при кешировании в fetch', error)
    }
})

async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request)
        if (cachedResponse) {
            const delayTimeRefresh = parseInt(request.headers.get('Custom-Cache'))
            const requestTime = parseInt(cachedResponse.headers.get('request-time'))
            const responseTime = new Date().getTime()
            if ((responseTime - requestTime) < delayTimeRefresh) {
                return cachedResponse
            }
        }
        const response = await fetch(request.url)
        if(response && response.status >= 200 && response.status < 300){
            const cache = await caches.open(dinamicCache)
            const requestTime = new Date().getTime()
            const newHeaders = new Headers(response.headers)
            newHeaders.append('request-time', `${requestTime}`)
            const oldResponse = response.clone()
            const newResponse = new Response(oldResponse.body, {headers: newHeaders})
            await cache.put(request, newResponse)
            return response
        }
    } catch(error) {
        console.log('Ошибка при кэшировании в cacheFirst', error)
    }
}
