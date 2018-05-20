import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import LinksListItem from './LinksListItem';
import FlipMove from 'react-flip-move';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class LnksList extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            links : [],
            counter: 0,
            visible: null
        }
    }
    

    componentDidMount() {
         
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            this.setState({ visible: Session.get('showVisible')});
            const counter = Links.find().count();
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({ links, counter })
        })
    }

    componentWillUnmount(){
        this.linksTracker.stop();
    }   

    renderLinksListItems(){
        if (this.state.links.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No Links Found</p>
                </div>
            );
        }
        return this.state.links.map((link)=>{
            const shortUrl =  Meteor.absoluteUrl(link._id)
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
        })
    }

    render(){
        return(
            <div className="links-list">
                <div className="links-list__title">
                {Meteor.user()? <h2>{`Welcome ${Meteor.user().username}!`}</h2>:''}
                    {this.state.visible ? <h3>Your Visible LnkiTs</h3> : <h3>Your Hidden LnkiTs</h3>}
                    <h3>Total LnkiTs : {this.state.counter}</h3>
                </div>
                <div>
                    <FlipMove maintainContainerHeight={true}>
                        {this.renderLinksListItems()}
                    </FlipMove>
                </div>
            </div>
            
        )
    }
}
export default LnksList;