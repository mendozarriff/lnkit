import React from 'react';
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session';

class LinksListFilters extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showVisible: true
        }
    }
    componentDidMount(){
        this.trackVisibility = Tracker.autorun(()=>{
            const showVisible = Session.get('showVisible');
            this.setState({ showVisible })
        })
    }
    componentWillUnmount(){
        this.trackVisibility.stop()
    }
    render(){
        return (
            <div>
                <label>
                    <input type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
                        Session.set('showVisible', !e.target.checked)
                    }} /> show hidden links
            </label>
            </div>
        );
    }
    
}

export default LinksListFilters;