import React, { Component } from 'react';

export default class App extends Component {
  constructor(){
    super();
    this.encodeAndUri = this.encodeAndUri.bind(this)
    this.encode = this.encode.bind(this)
    this.dataUri = this.dataUri.bind(this)
  }

  encode(){
    const obj = this.refs.encodeInput;
    const unencoded = obj.value;
    obj.value = encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22");
  }

  dataUri() {
    const obj = this.refs.encodeInput;
    const inputValue = obj.value;
    obj.value = `background-image: url('data:image/svg+xml;utf8,${inputValue}');`
  }

  encodeAndUri() {
    this.encode()
    this.dataUri()
  }

  render() {
    return (
      <div style={styles.app}>
        <textarea
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          style={styles.textArea}
          ref="encodeInput"
        />
        <div style={styles.buttonWrapper}>
          <div style={styles.button} onClick={this.encode}>Encode</div>
          <div style={styles.button} onClick={this.dataUri}>data uri</div>
          <div style={styles.button} onClick={this.encodeAndUri}>encode and data uri</div>
        </div>
      </div>
    );
  }
}

const styles = {
  app: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    overflow: 'hidden'
  },

  textArea: {
    fontSize: '1em',
    padding: '2em',
    boxSizing: 'border-box',
    display: 'block',
    appearance: 'none',
    border: '1px solid black',
    background: 'black',
    color: 'white',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    margin: 0,
    outline: 'none',
    resize: 'none'
  },

  buttonWrapper: {
    position: 'absolute',
    right: '1.5em',
    bottom: '1em',
    display: 'flex',
    paddingTop: '0.2em'
  },

  button: {
    background: 'white',
    cursor: 'pointer',
    padding: '0.5em',
    marginLeft: '0.25em',
    marginRight: '0.1em',
  }
}
