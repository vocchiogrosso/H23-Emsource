import React, {Component} from 'react';

export default class Footer extends Component {

  render() {
    return (
      <div className="footer">
        <footer>
          <p className="float-right"><a href="#">Back to top</a></p>
          <p>zone data from <a href="http://www.floridadisaster.org/publicmapping/">floridadisaster</a></p>
          <p>&copy; 2017 EMSOURCE - PENNAPPSXVI</p>
        </footer>
      </div>
    );
  }
};
