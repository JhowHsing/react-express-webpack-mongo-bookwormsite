import React, { Component } from 'react';
// import NavLink from './NavLink';

function Book(props) {
  return (
    <div className="col-md-3">
      <a href="">
        <div className="thumbnail">
            <img src="/static/images/ja.jpg" 
             alt="book image" />
            <div className="caption">
                <h3>book name</h3>
                <p>book desc</p> 
            </div>
         </div>
      </a>   
    </div>
  )
}
class App extends Component {
  render() {
    return (
      <Book />
    );
  }
}

export default App;