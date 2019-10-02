import ReactDOM from "react-dom";
import React, { Component,useState,useEffect } from "react";

export default ({worker,error,actions,subscriber})=>{
  const [state,setState] = useState({address:'',error})

  //this shows an example of how to send a notfication
  //while the app is running. 
  function sendNotification(){
    try{
      if(Notification.permission !== 'granted') return
      worker.showNotification('Hi there')
      setState({...state,message:'notification sent'})
    }catch(error){
      setState({...state,error})
    }
  }

  //autnethication function for followme
  //the backend im using for followme testing has authentication disabled
  //so you can paste in public key.
  function login(){
    actions.auth.call('authenticate',state.address).then(x=>{
      setState({...state,message:'logged in',loggedin:true})
    }).catch(error=>{
      setState({...state,error})
    })
  }

  //this is the call to add this partricular browser client to subcribe to notifications.
  function subscribe(){
    actions.private.call('subscribe',subscriber).then(x=>{
      setState({...state,message:'subscribed'})
    }).catch(err=>{
      setState({...state,error})
    })
  }
  
  return <div>
    {state.error ? <p> Error: {state.error.message} </p> : null}
    {state.message ? <p> Success: {state.message} </p> : null}
    <p>Notification Permissions: {Notification.permission}</p>

    <input onChange={e=>setState({...state,address:e.target.value})} value={state.address}></input>
    {
      state.loggedin ?  
      <button onClick={subscribe}>Subcribe</button> : 
      <button onClick={login}>Login</button>
    }
    <div>
      {error ? null : <button onClick={sendNotification}>Notify </button>}
    </div>
  </div>
}
