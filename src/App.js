import './App.css'
import Header from './Header'
import Home from './Home'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import { useEffect } from 'react'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import Checkout from './Checkout'
import Payment from './Payment'

// Stripe
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders'

const promise = loadStripe(
  'pk_test_51Hvq0VIoMcpobH3ySuV5oBL1pbmmVSxAiBIcL422rRA0wWevMJxQUShhQr52pE2DWLKHM05MfiBGL2an6k3TSNws00aIhLqKRu',
)
function App() {
  const [{ basket, user }, dispatch] = useStateValue()

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log('THE USER IS >>> ', authUser)

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
