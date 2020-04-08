import React , { Component } from 'react';
var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyDGKJLXTaxrwdnA-NxfoIH74QXxj87_XNk",
    authDomain: "login-ca7ad.firebaseapp.com",
    databaseURL: "https://login-ca7ad.firebaseio.com",
    projectId: "login-ca7ad",
    storageBucket: "login-ca7ad.appspot.com",
    messagingSenderId: "257829158450",
    appId: "1:257829158450:web:32cc8fa0eeef1fdd32062b",
    measurementId: "G-VKW22ZHEVS"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

class Authen extends Component {

  login(event)
  {
   const email = this.refs.email.value;
   const password = this.refs.pass.value;
   console.log(email,password);

  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(email,password);


  promise.then(user => {
  var err = "Welcome"+user.email;
  console.log(err);
  this.setState({err:err});
  firebase.database().ref('Users/'+user.uid).set({
    email : user.email,
  });
  });

  promise.catch(e => {
  var err = e.message;
  this.setState({err : err});
  });
  }

 signup(event)
 {
  const email = this.refs.email.value;
  const password = this.refs.pass.value;
  console.log(email,password);

  const auth =  firebase.auth();

  const promise = auth.createUserWithEmailAndPassword(email,password);

  promise.catch(e => {
  var err = e.message;
  console.log(err);
  this.setState({err : err});
  });

 }

  constructor(props){
    super(props);

    this.state = {
    err: '',

    };

  this.login = this.login.bind(this);
  this.signup = this.signup.bind(this);
  }

  render(){
    return(
      <div>
        <input type='email' id='email' ref='email' placeholder='Enter your email' /><br />
        <input type='password' id='pass' ref='pass' placeholder='Enter your password' />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Login</button>
        <button onClick={this.signup}>Sign-up</button>
        <button>Sign-Out</button>
      </div>
    );
  }
}

export default Authen;
