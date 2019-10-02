console.log('hello from service worker')

self.addEventListener('activate',event=>{
  console.log('worker activate',event)
  // const notification = new Notification("Worker Registered");
})
self.addEventListener('ready',event=>{
  console.log('ready')
})

self.addEventListener('fetch',event=>{
  console.log('fetch',event)
})

self.addEventListener('notificationclick',event=>{
  console.log('notficationclick',event.action,event)
})

//this is the event which will handle the client side notification
self.addEventListener('push',event=>{
  const promiseChain = self.registration.showNotification(event.data.text())
  event.waitUntil(promiseChain)
})
