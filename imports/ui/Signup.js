import React from 'react';
import { Link } from 'react-router-3'
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: ''
        }
    }
    onSubmit(e){
        e.preventDefault();
        let username = this.refs.username.value.trim();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if(password.length < 9) {
            return this.setState({error: 'Password must be more than 8 characters long'})
        }

        Accounts.createUser({username, email, password}, (err)=>{
            if(err){
                this.setState({error : err.reason})
            }else{
                this.setState({error: ''})
            }
        })
    }

    render() {
        return (
            <div className="signup">
                <div className="nav-bar">
                    <div className="nav-bar__content">
                        <Link to="/"><h1>LnkiT</h1></Link>
                        <div className="navbar__button__section">
                            <p>Already have an account?</p>
                            <Link className="nav-bar__button" to="/">Login</Link>
                        </div>
                    </div>
                </div>
                <div className="boxed-view__box">
                    <div className="boxed-view__form">
                        <form className="form" onSubmit={this.onSubmit.bind(this)} noValidate>
                            <h2>Join LnkiT</h2>
                            {this.state.error ? <p className="form__error-message">{this.state.error}</p> : undefined}
                            <input ref="username" type="text" name="username" placeholder="Username" autoFocus/>
                            <input autoComplete="email" ref="email" type="email" name="email" placeholder="Email"/>
                            <input autoComplete="off" ref="password" type="password" name="password" placeholder="Password"/>
                            <button className="button"><span>Crate an Account</span></button>
                        </form>
                    </div>
                </div>
                <footer className="footer"><h3>Concept app created by Jose Mendoza</h3></footer>
            </div>
        )
    }
}
export default Signup;