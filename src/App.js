import React, { Component } from 'react';
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';

const AlertsDom = document.querySelector(".alerts-list");

const Alert = ({ children }) => <p>{children}</p>;

const withPortal = domElem => WrappedComponent => {
  const WithPortalHOC = props =>
    ReactDOM.createPortal(<WrappedComponent {...props} />, domElem);
  return WithPortalHOC;
};

const AlertsPortal = withPortal(AlertsDom);

class App extends Component {
  state = {
    value: "",
    alerts: []
  };
  inputRef = React.createRef();

  componentDidMount() {
    this.handleFocus();
  }

  handleChangeInput(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleFocus() {
    this.inputRef.current.focus();
  }

  handleAddAlert() {
    const newAlerts = [
      ...this.state.alerts,
      {
        content: this.state.value,
        component: AlertsPortal(Alert)
      }
    ];
    this.setState({
      alerts: newAlerts,
      value: ""
    });
    this.handleFocus();
  }

  render() {
    let { value, alerts } = this.state;
    return (
      <div className="App">
        <input
          value={value}
          onChange={e => this.handleChangeInput(e)}
          ref={this.inputRef}
          placeholder="Please enter alert text"
        />
        <button disabled={!value} onClick={() => this.handleAddAlert()}>
          Add alert
        </button>
        {!!alerts.length &&
          alerts.map((Al, ed) => (
            <Al.component key={ed}>{Al.content}</Al.component>
          ))}
      </div>
    );
  }
}

export default App;
