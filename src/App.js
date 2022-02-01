import './App.scss';
import Landing from './components/landing/Landing.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/landing/header/Navbar.js';
import Footer from './components/landing/footer/Footer.js';
import useEagerConnect from './hooks/useEagerConnect'
import Staking from './components/landing/staking/Staking';
import Unlinked from './components/landing/unlinked/Unlinked';
import Stakednft from './components/landing/staked-nfts/Stakednft';
import UnstakedNfts from './components/landing/unstaked-nfts/UnstakedNfts';

function App() {
  useEagerConnect()
  return (
    <>
          <Router>
            <Navbar/>
            <Switch>
              <Route exact path='/staking' component={Stakednft} />
              <Route exact path='/' component={Staking} />
              <Route exact path='/unlinked' component={Unlinked} />
              <Route exact path='/Stakednft' component={Landing} />
              <Route exact path='/UnstakedNfts' component={UnstakedNfts} />
            </Switch>
            <Footer/>
          </Router>
    </>
  );
}

export default App;
