import React from 'react';
import { Meteor } from 'meteor/meteor'; 
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FlipMove from 'react-flip-move';

class AddLnk extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url: '',
            isOpen: false,
            error: '',
        }
    }

    onSubmit(e) {
        const {url} = this.state;
        e.preventDefault()

        Meteor.call('links.insert', url, (err, res)=>{
            if(!err){
                this.handleModalClose()
            }else{
                this.setState({error: err.reason})
            }
        })

    }
    onChange(e){
        this.setState({
            url: e.target.value.trim()
        })
    }
    handleModalClose(){
        
        return <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
        >{this.setState({ isOpen: false, url: '', error: '' })}</ReactCSSTransitionGroup>
    }
    render(){
        return(
            <div className="add-link">
                <button className="button" onClick={()=>this.setState({isOpen: true})}>+ Add Lnk</button>
                
                <Modal 
                className="boxed-view-modal__box"
                overlayClassName="boxed-view-modal boxed-view--modal"
                ariaHideApp = {false}
                onAfterOpen={()=>this.refs.url.focus()} 
                isOpen={this.state.isOpen} 
                onRequestClose={this.handleModalClose.bind(this)}
                contentLabel="Add Link">
                    <h1>Add Lnk</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    
                    <form className="form" onSubmit={this.onSubmit.bind(this)}>
                        <input
                            value={this.state.url}
                            type="text"
                            ref="url"
                            placeholder="URL"
                            onChange={this.onChange.bind(this)}
                        />
                        <button className="button">Add Lnk</button>
                        <button type="button" className="button" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                    
                </Modal>
                    
                
            </div>
        )
    }
}

export default AddLnk;