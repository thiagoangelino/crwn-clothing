import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SingInAndSingUpPage from './pages/sing-in-and-sing-up/sing-in-and-sing-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils' 
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser(
            {
                id: snapShot.id,
                ...snapShot.data()
              
            })
          console.log(this.state)
        })
      }
      setCurrentUser( userAuth )
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {return (
              <div>
                <Header />
                <Switch>
                  <Route exact path='/' component={HomePage}/>
                  <Route exact path='/shop' component={ShopPage}/>
                  <Route exact path='/singin' render = {() =>
                    this.props.currentUser ? (
                      <Redirect to='/' />
                    ): (
                      <SingInAndSingUpPage />
                    ) } 
                  />
                </Switch>
              </div>
            );
  }
}

const mapStateProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispathToProps = dispath => ({
  setCurrentUser: user => dispath(setCurrentUser(user))
})

export default connect(mapStateProps, mapDispathToProps)(App);
