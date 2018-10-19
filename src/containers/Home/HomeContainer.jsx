import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HomeContainer = () => {
  return (
    <article>
      <h1>Welcome To Office Depot Hackaton</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mi odio,
      condimentum sit amet felis nec,aliquet laoreet orci.
      </p>
      <nav className="margin-top-bottom"><Link to="/products" className="btn secondary">Products</Link></nav>
    </article>
  );
};

export default connect()(HomeContainer);
