import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      terms: this.props.terms
    }
  }

  render() {
    return (
      <div className='field has-addons'>
        <div className='control'>
          <input className='input' value={this.state.terms} type='text' placeholder='Terms...' />
        </div>
        <div className='control'>
          <a className='button is-info'>
            Search
          </a>
        </div>
      </div>
    )
  }
}

Search.defaultProps = {
  terms: ''
}
