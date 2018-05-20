import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

class RemoveAllLinks extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isOpen: false
        }
    }
    handleClick(){
        this.handleModalClose()
        Meteor.call('delete.allLinks', (res, err) => {
            if (err) {
                console.log('unable to delete lnkits')
            }
        })
    }

    handleModalClose() {
        this.setState({ isOpen: false})
    }

    render(){
        return(
            <div className="remove-all-links">
                <Modal
                className="boxed-view-modal__box"
                overlayClassName="boxed-view-modal boxed-view--modal"
                ariaHideApp={false}
                isOpen={this.state.isOpen}
                onRequestClose={this.handleModalClose.bind(this)}
                contentLabel="Delete Lnkts"
                >
                    <h1>Are you sure?</h1>
                    <button className="button button-delete" onClick={this.handleClick.bind(this)}>Yes</button>
                    <button className="button" onClick={this.handleModalClose.bind(this)}>No</button>
                </Modal>
                <button className="button button-delete" onClick={() => this.setState({ isOpen: true })}>Delete All LnkiTs</button>
            </div>
        )
    }
}

export default RemoveAllLinks;