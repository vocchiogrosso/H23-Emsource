import React, {Component} from 'react';
import { Router, Route, browserHistory, Link } from 'react-router';
import axios from 'axios';

export default class NavBar extends Component { 
  constructor(props){
    super(props);

  }


  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link to="/" className="navbar-brand brand">Emsource</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item nav_items active">
              <Link to="help" className="nav-link">Help <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item nav_items">
              <Link to="/services" className="nav-link">Services</Link>
            </li>
            <li className="nav-item nav_items nav_items--border">
              <Link to="/emergency" className="nav-link text-danger">Emergency</Link>
            </li>
            <li className="nav-item nav_items nav_items--border">
              <Link to="/donate" className="nav-link text-success">Donate</Link>
            </li>
          </ul>
          <button className="btn btn-danger" onClick={this.props.openModal}>add</button>
          <form className="form-inline my-2 my-lg-0" onSubmit={this.props.handleSubmit}>
          <input className="form-control mr-sm-2" type="text" name="userLocation" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    );
  }
};
