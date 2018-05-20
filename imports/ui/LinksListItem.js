import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class LinksListItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            justCopied : false,
            isOpen : false
        }
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            this.setState({ justCopied: true })
            setTimeout(() => {
                this.setState({ justCopied: false })
            }, 1000)
        }).on('error', () => {
            alert('Unable to copy.  Please manually copy the link')
        })
    }

    componentWillUnmount() {
        this.clipboard.destroy()
    }

    handleModalClose() {
        this.setState({ isOpen: false })
    }

    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits'
        let visitedMessage = null;
        const time = new Date().getTime();
        const momentNow = moment(time);
        if (typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `${moment(this.props.lastVisitedAt).fromNow()}`
        }
        return (
            <div className="links-list-item__rendered-stats">
                <p className="links-list-item__visited"> <span>Visited:</span> {visitedMessage ? visitedMessage: 'no visits'}</p>
                <p className="links-list-item__count"><span>Times visited:</span> {this.props.visitedCount} {visitMessage}</p>
            </div>
        )
    }
    

    render(){
        return(
            <div className="links-list-item">
                <div className="links-list-item__title">
                    <h2>{this.props.url}</h2>
                    <div>
                        <button className="links-list-item__more-info-button" onClick={() => this.setState({ isOpen: true })}>• • •</button>
                        <Modal
                            className="boxed-view-modal__box links-list-item__overlay"
                            overlayClassName="boxed-view-modal boxed-view--modal links-list-item-overlay__modal"
                            ariaHideApp={false}
                            isOpen={this.state.isOpen}
                            onRequestClose={this.handleModalClose.bind(this)}
                            contentLabel="Lnk info section"
                        >
                            <a href={this.props.shortUrl} target="_blank">&#10003; &nbsp; &nbsp; Visit</a>
                            <button id="hide" onClick={() => Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}>{this.props.visible ? 'Hide' : 'Unhide'}</button>
                            <button onClick={() => Meteor.call('delete.link', this.props._id)}><span>&#x2298;</span> Delete</button>
                        </Modal>
                    </div>
                </div>
                <div className="links-list-item__short-url">
                    <p>{this.props.shortUrl}</p>
                    <button className="button button--copy" onClick={() => clipboard()} ref="copy" data-clipboard-text={this.props.shortUrl}>{!this.state.justCopied ? 'Copy' : `Copied`}</button>
                </div>
                {this.renderStats()}
                    
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shortUrl : PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisited:PropTypes.number
}

export default LinksListItem;