console.log('hello from service worker')

//this is the event which will handle the client side notification
//this is really all you need unless you want to do fancier things.
self.addEventListener('push',event=>{
  const promiseChain = self.registration.showNotification(event.data.text())
  event.waitUntil(promiseChain)
})

//if you want something to happen when user clicks the notification
//then you can handle it in here. 
self.addEventListener('notificationclick',event=>{
  console.log('notficationclick',event.action,event)
})

//these are just various lifecycle events you can listen to.
self.addEventListener('activate',event=>{
  console.log('worker activate',event)
})
self.addEventListener('ready',event=>{
  console.log('ready')
})

self.addEventListener('fetch',event=>{
  console.log('fetch',event)
})

