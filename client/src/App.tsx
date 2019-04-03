import * as React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    message: 'Loading...',
  };

  componentDidMount = () => {
    this.fetchMessage();
  }

  fetchMessage = async () => {
    const response = await fetch('/hello');
    const message = await response.text();
    this.setState({ message });
  }

  render() {
    const { message } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>{message}</h1>
        </header>
      </div>
    );
  }
}

export default App;
