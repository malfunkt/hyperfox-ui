import React from 'react';

function Navigation() {
  return (
    <nav className='navbar is-fixed-top is-white' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item' href='/'>
          <img src='/fox-icon.svg' width='28' height='28' alt='hyperfox' />
          <span className='title'>hyperfox</span>
        </a>
      </div>
    </nav>
  )
}

export default Navigation
