import React from 'react';
import { browserHistory } from 'react-router-3';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Links } from '../api/links';
import LnksList from './LnksList';
import AddLnk from './AddLnk';
import PrivateHeader from './PrivateHeader'
import LinksListFilters from './LnksListFilters';
import RemoveAllLinks from './RemoveAllLinks';

export default ()=>{
        return(
            <div>
                <PrivateHeader title="Lnkt Dashboard" />
                <div className="lnkit-area">
                    <div className="lnkit-area__buttons">
                        <AddLnk />
                        <RemoveAllLinks /> 
                    </div>
                    <LinksListFilters />
                    <LnksList />
                </div>
            </div>
        )
}
