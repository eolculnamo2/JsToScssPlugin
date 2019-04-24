import React from 'react'
import ReactDOM from 'react-dom';
import colors from './jsStyleConfig';
import './sample.scss';

function Test() {
  return (
    <div style={{color: colors.red}}>
      babel
    </div>
  )
}

ReactDOM.render(<Test />, document.getElementById('app'));