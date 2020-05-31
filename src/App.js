import React, { Component } from 'react'
import './App.css'

import firebase from 'firebase'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

firebase.initializeApp({
  apiKey: 'AIzaSyCVYl18lnDrbW-mqMvCx8FJ0QnP9kjbSk4',
  authDomain: 'fir-auth-5ee50.firebaseapp.com'
})
class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log('user', user)
    })
  }
  render () {
    return (
      <div className='App'>
        {this.state.isSignedIn ? (
          <div>
            <h1>Signed In!!</h1>
            <button
              style={{
                backgroundColor: 'blue',
                padding: '1rem 2rem',
                color: 'white',
                border: 'none'
              }}
              onClick={() => firebase.auth().signOut()}
            >
              Sign Out
            </button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              src={firebase.auth().currentUser.photoURL}
              alt='profilePicture'
            />
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}

export default App
