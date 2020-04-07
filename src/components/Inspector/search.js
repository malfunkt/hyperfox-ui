import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      terms: this.props.terms
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let patchState = {}
    if (nextProps.terms !== prevState.terms) {
      patchState.terms = nextProps.terms
    }
    return patchState
  }

  updateValue(value) {
    this.props.onChange(value)
  }

  render() {
    return (
      <div className='field'>
        <p className='control has-icons-left'>
          <input
            className='input'
            onFocus={(ev) => {
              ev.target.select()
            }}
            onChange={(ev) => {
              this.updateValue(ev.target.value)
            }}
            value={this.state.terms}
            type='text'
            placeholder='Search terms...'
          />
          <span className='icon is-left'>
            <i className='fas fa-filter'></i>
          </span>
        </p>
      </div>
    )
  }
}

Search.defaultProps = {
  terms: '',
  onChange: () => {}
}
