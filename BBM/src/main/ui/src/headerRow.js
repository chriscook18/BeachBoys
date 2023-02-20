import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import * as constants from './constants.js';

class HeaderRow extends React.Component {

    render() {
        return (
            <Card style={{ width: '100%' }}>
                <a href="/beachboys/list">
                    <Image src={constants.IMAGE_REF + "Logo.png"} height="100%" width="30%" alt={"The Beach Boys Mixography logo"} />
                </a>
            </Card>
        )
    }

}

export default HeaderRow;