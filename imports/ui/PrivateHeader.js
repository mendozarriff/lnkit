import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

const PrivateHeader = (props)=>{   
    return(
        <div className="private-header">
            <div className="nav-bar">
                <div className="nav-bar__content">
                    <h1>{props.title}</h1>
                    <button className="nav-bar__button" onClick={() => Accounts.logout()}>Logout</button>
                </div>
            </div>
        </div>
    )
}

PrivateHeader.propTypes ={
    title: PropTypes.string.isRequired
}

export default PrivateHeader;