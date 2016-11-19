import React, { Component } from 'react';
// import NavLink from './NavLink';

// var bookjson=JSON.parse(bookdata);

class App extends Component {
  render() {
    return (
        <div className="col-md-3">
          <a href="">
            <div className="thumbnail">
                <img src="{book.bookimg}"
                 alt="book image" />
                <div className="caption">
                    <h3>{book.bookname}</h3>
                    <p>{book.bookdesc}</p> 
                </div>
             </div>
          </a>   
        </div>
      }.bind(this))}
      
    );
  }
}

export default App;