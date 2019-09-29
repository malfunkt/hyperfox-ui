import React from 'react';

export default class Paginator extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: props.selected,
      pages: props.pages
    }
  }

  ellipsis() {
    return (
      <li>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
    )
  }

  renderPageNumbers() {
    /*
          <li>
            <a className="pagination-link" aria-label="Goto page 1">1</a>
          </li>
          <li>
            <a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
          </li>
          <li>
            <a className="pagination-link" aria-label="Goto page 47">47</a>
          </li>

          <li>
            <a className="pagination-link" aria-label="Goto page 86">86</a>
          </li>
     * */
    return []
    return ([
      <li>
        <a className="pagination-link" aria-label="Goto page 45">45</a>
      </li>
    ])
  }

  render() {
    return (
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <a className="pagination-previous" disabled>Previous</a>
        <a className="pagination-next" disabled>Next page</a>
        <ul className="pagination-list">
          {this.renderPageNumbers()}
        </ul>
      </nav>
    )
  }
}

Paginator.defaultProps = {
  selected: 0,
  pages: 0
}
