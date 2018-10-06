import React, { Component } from 'react';
const URL = require('url-parse');

export default class InputDisplay extends Component {
  clean = userInput => {
    if (!this.props.safe) {
      console.log(userInput);
      return userInput;
    }
    const url = new URL(userInput);
    console.log(url);

    if (url.protocol === 'javascript:') return '';
    if (url.protocol === '') return '';
    return url.href;
  };

  render() {
    return (
      <div className="mb-5">
        <h5>{this.props.safe ? 'Safe' : 'Un-Safe'}</h5>
        <a
          id={this.props.safe ? 'safe' : 'unsafe'}
          href={this.clean(this.props.input)}
        >
          Hey Click Me!
        </a>
      </div>
    );
  }
}
