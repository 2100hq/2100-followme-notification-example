import "@babel/polyfill";
import ReactDOM from "react-dom";
import React, { Component,useState,useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import assert from 'assert'
import App from './app'
import {urlBase64ToUint8Array} from './utils'
import Client from '2100-server/libs/socket/client'


async function serviceWorker(){
  assert(navigator.serviceWorker,'Service worker not supported in your browser')
  assert(window.PushManager,'Push Notifications not supported in your browser')

  //you must have a js file which handles your worker logic. 
  //this represents how to download it into the browser.
  const worker = await navigator.serviceWorker.register('/worker.js')

  //this checks if your client has an existing subscription, and returns it to you.
  const subscriber = await worker.pushManager.getSubscription()
  // console.log('subscriber',subscriber)
  if(subscriber) return {subscriber,worker}

  //this is how you format your subscription request. Subcribes to push notifications.
  const subscribeOptions={
    userVisibleOnly:true,
    applicationServerKey:urlBase64ToUint8Array(process.env.publicKey)
  }

  //subscribe your worker to the push events.
  const sub = await worker.pushManager.subscribe(subscribeOptions)

  return {subscriber:sub,worker}
}

//request the user to authorize notifications. if authorized
//Notification.permission == 'granted'
async function requestPermissions(){
  assert(Notification,'Notifications not supported in your browser')
  if(Notification.permission == 'granted') return
  if(Notification.permission == 'denied') return
  return Notification.requestPermission()
}

//initialize everything and send props to react app
async function Init(){
  try{
    //this just uses the simple socket client from 2100 server. 
    const actions = await Client({
      host:process.env.socket,
      channels:['private','public','auth']
    })
    await requestPermissions()
    const {subscriber,worker} = await serviceWorker()
    return {worker,subscriber,actions}

  }catch(error){
    return {error}
  }
}

Init().then(props=>{
  const wrapper = document.getElementById("app");
  if(!wrapper) throw new Error('Root element not found')

  ReactDOM.render(
    <App {...props} />,
    wrapper
  )
}).catch(err=>console.log(err))

