import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { IMAGE_REF } from './Constants.js';

class HeaderRow extends React.Component {
  render() {
    return (
      <Card style={{ width: '100%' }}>
        <a href="/beachboys/list">
          <Image
            src={IMAGE_REF + 'logo.png'}
            height="100%"
            width="30%"
            alt={'The Beach Boys Mixography logo'}
          />
        </a>
      </Card>
    );
  }
}

export default HeaderRow;
