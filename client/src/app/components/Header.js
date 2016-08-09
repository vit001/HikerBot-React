import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">react-gmaps</IndexLink>
      {" | "}
      <Link to="/map2" activeClassName="active">google-map-react</Link>
    </nav>
  );
};

export default Header;
