import React from 'react';

function Footer() {
  return (
    <footer className='footer'>
      <div className='container is-widescreen'>
        <div className='columns'>
          <div className='column'>
            <div>
              <strong>Hyperfox</strong> by <a href='https://xiam.io' title='José Nieto'>José Nieto</a>
            </div>
            <div>
              <strong>Bulma</strong> by <a href='https://jgthms.com' title='Jeremy Thomas'>Jeremy Thomas</a>
            </div>
            <div>
              <strong>Fox icon</strong> by <a href='https://www.flaticon.com/authors/smashicons' title='Smashicons'>Smashicons </a>
              from <a href='https://www.flaticon.com/' title='Flaticon'> www.flaticon.com</a>
            </div>
          </div>
          <div className='column'>
            <div>
              <iframe src='https://ghbtns.com/github-btn.html?user=xiam&type=follow&count=true' frameBorder='0' scrolling='0' width='170px' height='20px' title='follow @xiam'></iframe>
            </div>
            <div>
              <iframe src='https://ghbtns.com/github-btn.html?user=malfunkt&repo=hyperfox&type=star&count=true' frameBorder='0' scrolling='0' width='170px' height='20px' title='star hyperfox'></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
