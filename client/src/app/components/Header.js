import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {

  return (
    <nav>
    </nav>
  );
/*
    return (
        <nav>
            <IndexLink to="/" activeClassName="active">react-gmaps</IndexLink>
            {" | "}
            <Link to="/map2" activeClassName="active">react-google-maps</Link>
        </nav>
    );
*/
};

export default Header;
