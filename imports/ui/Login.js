import React from 'react';
import { Link } from 'react-router-3';
import { Meteor } from 'meteor/meteor';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error: ''
        }
    }

    onSubmit(e){
        e.preventDefault();
        let email = this.refs.email.value.trim()
        let password = this.refs.password.value.trim();

        Meteor.loginWithPassword({email}, password, (err)=>{
            if(err){
                this.setState({error: 'Unable to login.  Check email and password'});
            }else{
                this.setState({error: ''});
            }
        })

        
    }

    render(){
        return(
            <div className="login">
                <div className="nav-bar">
                    <div className="nav-bar__content">
                        <Link to="/"><h1>LnkiT</h1></Link>
                        <div className="navbar__button__section">
                            <p>Need an account?</p>
                            <Link className="nav-bar__button" to="/signup">Signup</Link>
                        </div>
                    </div>
                </div>
                <div className="boxed-view__box">
                    <div className="boxed-view__form">
                        <form className="form" onSubmit={this.onSubmit.bind(this)} noValidate>
                            <h2>Login to Lnkit</h2>
                            {this.state.error ? <p className="form__error-message">{this.state.error}</p> : undefined}
                            <input ref="email" type="email" name="email" placeholder="Email" autoFocus/>
                            <input autoComplete="off"  ref="password" type="password" name="password" placeholder="Password" />
                            <button className="button"><span>Login </span></button>
                        </form>
                    </div>
                </div>
                <footer className="footer"><h3>Concept app created by Jose Mendoza</h3></footer>
            </div>
        )
    }
}
export default Login;