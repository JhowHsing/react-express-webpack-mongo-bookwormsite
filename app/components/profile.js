import React, { Component } from 'react';
// import NavLink from './NavLink';

class Profile extends Component {
  render() {
    return (
      <form action="/profile" method="POST" enctype="multipart/form-data">
       <input type="file" name="myimage" ></input>
       <input type="submit" name="submit" value="submit"></input>
      </form>
    );
  }
}

export default Profile;