import React from 'react'

import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretLeft,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons'

export default class Paginator extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: Math.max(1, Math.min(props.selected, props.pages)),
      pages: Math.max(0, props.pages)
    }
  }

  handleClick(page) {
    this.props.onSelectPage(page)
    return false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let patchState = {}
    if (nextProps.pages !== prevState.pages) {
      patchState.pages = nextProps.pages
    }
    if (nextProps.selected !== prevState.selected) {
      patchState.selected = Math.max(1, Math.min(nextProps.selected, nextProps.pages))
    }
    return patchState
  }

  renderPageNumbers() {
    if (this.props.pages < 1) {
      return []
    }

    const lowerBound = Math.max(this.state.selected - 1, 1)
    const upperBound = Math.min(lowerBound + 2, this.state.pages)

    let pages = []

    if (lowerBound > 1) {
      pages.push(
        <li
          key='page-prev'
        >
          <span className='pagination-ellipsis pagination-left-ellipsis'>&hellip;</span>
        </li>
      )
    }

    let i = 0
    for (i = lowerBound; i <= upperBound; i++) {
      let classes = classNames('pagination-link', {'is-current': i === this.state.selected})
      let li = (
        <li key={`page-${i}`}>
          <button
            className={classes}
            onClick={this.handleClick.bind(this, i)}
            aria-label={`Goto page ${i}`}
          >
            {i}
          </button>
        </li>
      )
      pages.push(li)
    }

    if (this.props.pages - upperBound > 0) {
      pages.push(
        <li
          key='page-next'
        >
          <span className='pagination-ellipsis pagination-right-ellipsis'>&hellip;</span>
        </li>
      )
    }

    return pages
  }

  render() {
    const showPrevious = this.state.selected > 1
    const showNext = (this.state.pages - this.state.selected) > 0

    return (
      <nav className='pagination' role='navigation' aria-label='pagination'>

        <button
          type='button'
          className='pagination-previous'
          onClick={
            () => this.handleClick(1)
          }
          disabled={!showPrevious}
        >
          <span className='icon'>
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </span>
          First
        </button>

        <button
          type='button'
          className='pagination-previous'
          onClick={
            () => this.handleClick(this.state.selected - 1)
          }
          disabled={!showPrevious}
        >
          <span className='icon'>
            <FontAwesomeIcon icon={faCaretLeft} />
          </span>
          Previous
        </button>

        <button
          type='button'
          className='pagination-next'
          onClick={
            () => this.handleClick(this.state.selected + 1)
          }
          disabled={!showNext}
        >
          Next page
          <span className='icon'>
            <FontAwesomeIcon icon={faCaretRight} />
          </span>
        </button>

        <button
          type='button'
          className='pagination-next'
          onClick={
            () => this.handleClick(this.state.pages)
          }
          disabled={!showNext}
        >
          Last
          <span className='icon'>
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </span>
        </button>

        <ul className='pagination-list'>
          {this.renderPageNumbers()}
        </ul>
      </nav>
    )
  }
}

Paginator.defaultProps = {
  onSelectPage: () => {},
  selected: 0,
  pages: 0
}
