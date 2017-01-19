import React, { Component } from 'react';
import './App.css';

/* eslint-disable */

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      textVal: '',
      uri: true,
      uriType: 'bg',
      encode: true
    }
    this.handleClick = this.handleClick.bind(this)
    this.encodeToggle = this.encodeToggle.bind(this)
    this.uriToggle = this.uriToggle.bind(this)
    this.uriTypeToggle = this.uriTypeToggle.bind(this)
  }

  encode(val){
    return  encodeURIComponent(val).replace(/'/g,"%27").replace(/"/g,"%22");
  }

  dataUri(val) {
    const { uriType } = this.state
    if (uriType === 'bg') {
      return `background-image: url('data:image/svg+xml;utf8,${val}');`
    } else if (uriType === 'img') {
      return `<img src='data:image/svg+xml;utf8,${val}'>`
    }
  }

  encodeToggle() {
    this.setState({
      encode: !this.state.encode
    })
  }

  uriToggle() {
    this.setState({
      uri: !this.state.uri
    })
  }

  uriTypeToggle() {
    const { uriType } = this.state
    this.setState({
      uriType: (uriType === 'bg' ? 'img' : 'bg')
    })
  }

  handleClick() {
    const input = this.refs.textArea
    const val = input.value
    const encodedVal = this.state.encode ? this.encode(val) : val
    const uri = this.state.uri ? this.dataUri(encodedVal) : encodedVal
    this.setState({
      textVal: uri
    })
    input.value = uri
  }

  componentDidUpdate(){
    this.refs.textArea.focus()
  }

  getButtonText(){
    const { uri, encode, uriType } = this.state
    if (uri) {
      return `Create ${encode ? 'encoded' : ''} uri`
    } else if (!uri) {
      return encode ? 'Encode' : 'Do nothing...'
    }
  }

  render() {
    const { uri, uriType, encode } = this.state;
    return (
      <div style={styles.app}>
        {this.renderHeader()}
        <textarea
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          style={styles.textArea}
          ref="textArea"
        />
        <div style={styles.buttonWrapper}>
          <div style={{display: 'flex'}}>
            <div style={{...styles.button}} onClick={this.encodeToggle}>
              {encode ? 'Encode' : "Don't encode"}
            </div>
            <div style={{...styles.button}} onClick={this.uriToggle}>
              {uri ? 'create uri' : "don't create uri"}
            </div>
            {uri &&
              <div style={{...styles.button, background: '#333', color: 'white'}} onClick={this.uriTypeToggle}>
                uri type: {uriType === 'bg' ? 'background-image' : "<img>"}
              </div>
            }
          </div>
          <div
            style={{...styles.button, background: 'blue', color: 'white'}}
            onClick={this.handleClick}>
            {this.getButtonText()}
          </div>
        </div>
      </div>
    );
  }

  renderHeader() {
    return(
      <header style={{padding: '0.5em 2em'}}>
        <h1 style={{fontSize: '1.5em'}}>URL encoder / SVG Data Uri Generator</h1>
        <p>> Why?<br/>
          <a
            target="_blank"
            style={{color: 'white'}}
            href="https://css-tricks.com/probably-dont-base64-svg/">
            Saves a request, no assets to maintain.
          </a><br/>
          > Ok, so why turn it into gibberish? <br/>
          <a
            target="_blank"
            style={{color: 'white'}}
            href="http://stackoverflow.com/questions/7122760/data-uri-svg-background-in-css-not-working-in-firefox">
            firefox complains sometimes.
          </a>
        </p>
        <a className="gh" target="_blank" href="https://github.com/johnpmorris/datauri/"/>
      </header>
    )
  }
}

const styles = {
  app: {
    lineHeight: '1.3em',
    background: 'black',
    color: 'white',
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    overflow: 'hidden'
  },

  textArea: {
    fontSize: '1em',
    padding: '0 2em',
    boxSizing: 'border-box',
    display: 'block',
    appearance: 'none',
    border: '1px solid black',
    background: 'black',
    color: 'white',
    width: '100vw',
    height: 'calc(100vh - 15em)',
    position: 'absolute',
    margin: 0,
    outline: 'none',
    resize: 'none'
  },

  buttonWrapper: {
    position: 'absolute',
    right: '1.5em',
    left: '1.5em',
    bottom: '1em',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '0.2em'
  },

  button: {
    userSelect: 'none',
    background: 'white',
    color: 'black',
    cursor: 'pointer',
    padding: '0.5em',
    marginLeft: '0.25em',
    marginRight: '0.1em',
  }
}
