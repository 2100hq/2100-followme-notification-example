# Notification/Worker Example
This shows how to use notifications and push notifications with a worker service.

## Install
`git clone https://github.com/2100hq/2100-followme-notification-example.git`
`yarn install`

## ENV
`touch .env` - you will need to add parameters to env

In the env file

```
socket=ws://followme socket server
publicKey=vapid public key, see section on generating key pair. 
```

## RUN
You will need a follow-me server running that the front end can connect to.

This will start a developement project running on port 8766. You can change this port
by modifying the package.json file. 

`yarn start`

Visit localhost:8766

## Generating "Vapid" keys
This only needs to be done once and saved. The client needs only public key, the server
will need the private key. This secures the otehr servers againts sending notificaitions
to this client. 

`https://npm.runkit.com/web-push`

Here you can generate the keys:
```
var webPush = require("web-push")
webPush.generateVAPIDKeys()
```

Or you can install web-push globally

`npm install web-push -g`
`web-push generate-vapid-keys [--json]`


Save the public key to the front end env `publicKey`

## What to look at

**index.js**   
This contains logic for checking againts various browser support for notification, service workers 
and push states. The browser will need to support all 3 for offline notifications to work. 
This also shows how to request permissions and start the service worker. 

**app.js**  
A simple react app that shows you how to interface with the followme server to persist your
subscription to the server and send an in app notification. Once you send the subscription
to the server it can now notify the user when things happen.

**worker.js**   
This shows your service worker code and how to intercept push notifications and generate
a notification to the users device.

**utils.js**
This contains a single function required for some data conversions for initializing subscription.
Dont know why its necessary but you need it.



