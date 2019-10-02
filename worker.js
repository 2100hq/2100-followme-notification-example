console.log('hello from service worker')

//this is the event which will handle the client side notification
//this is really all you need unless you want to do fancier things.
self.addEventListener('push',event=>{
  //you can send arbitrary data through from the server, and read it out this way. 
  const data = event.data.json()
  //assume the data looks like this
  //{
  //  title,
  //  body,
  //  data:{
  //    url
  //  }
  //}
  console.log('notification data',data)
  //the notification call is sent like this to have a title and a body.
  //if you want to do something when user clicks, then handle that in the notificationclick
  //handler
  //see: https://flaviocopes.com/notifications-api/#create-a-notification
  //or: https://developer.mozilla.org/en-US/docs/Web/API/notification
  //for creating a more rich notification 
  //data in the notification will get passed to the notification click event
  const promise = self.registration.showNotification(data.title,{body:data.body,data:data.data})

  //its important you use this for some reason in teh worker api.
  event.waitUntil(promise)
})

//if you want something to happen when user clicks the notification
//then you can handle it in here. 
self.addEventListener('notificationclick',event=>{
  //the event will have the notification attached to event.
  //event.notification
  console.log('notficationclick',event.notification)

  //i believe this lists any open windows which are related to this worker.
  const promise = clients.matchAll().then(function(clientsArr) {

    //you can check here if any of the open tabs correpond to the clicked
    //notification. if there is one, then theres no need to open a new tab.
    const openClient = clientsArr.filter(client=>{
      console.log('client',client)
      return client.url == event.notification.data.url
    })

    //window already open
    if(openClient.length) return console.log('window already open')

    //otherwise open a new window
    return clients.openWindow(event.notification.data.url)
  }).then(function(windowClient) {
    // do something with the windowClient.
    console.log(windowClient)
  }).catch(err=>{
    console.log(err.message,err.stack)
  })                                                

  event.waitUntil(promise)
    
})

//these are just various lifecycle events you can listen to.
self.addEventListener('activate',event=>{
  console.log('worker activate',event)
})
self.addEventListener('ready',event=>{
  console.log('ready')
})

//this happens when worker source is updated i tihnk and the browser is fetching
//it to get latest source
self.addEventListener('fetch',event=>{
  console.log('fetch',event)
})

