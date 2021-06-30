import * as React from 'react';
import './App.css';

import Home from './components/Home';
import LoginPage from './components/LoginPage';
import HomeResearcherPage from './components/HomeResearcherPage';

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  state = {
    pageValue: localStorage.getItem('username'),
    typeUer:localStorage.getItem('typeUser')
  }
  
  public getPage() {
    if (this.state.pageValue !== null) {
      if(this.state.typeUer==='officer'){
        return <Home />
      }else if(this.state.typeUer==='researcher'){
        return <HomeResearcherPage />
      }
      
    }
    return <LoginPage />
  }

  public render() {
    return (
      <div>
        {this.getPage()}
      </div>
    );
  }
}
export default (App);
