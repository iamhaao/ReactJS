import { Component } from 'react';
import Main from '../src/Components/MainComponent';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>


    );
  }

}


export default App;
