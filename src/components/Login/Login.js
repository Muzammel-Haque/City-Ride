import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import logo from '../images/images/download (1wwww).png'

const Login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [oldUser, setOldUser] = useState({
        email:'',
        password:''
    })

    const handleSubmit = (e)=>{firebase.auth().signInWithEmailAndPassword(oldUser.email, oldUser.password)
        .then(res => {
            console.log('nightuser', res.user)
            const {displayName, email} = res.user;
            const signedInUser = {name: displayName, email}
            console.log('signedInUser', signedInUser);
            setLoggedInUser(signedInUser)
            history.replace(from)
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.code, error.message)
        });
        e.preventDefault()
    }
    const handleBlur = (e)=>{
        console.log(e.target.name, e.target.value)
        let isFormValid = true;
        if(e.target.name === 'email'){
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if(e.target.name === 'password'){
            const passwordLengthCheck = e.target.value.length >= 6;
            const passwordNumberCheck = /\d{1}/.test(e.target.value)
            isFormValid = passwordLengthCheck && passwordNumberCheck;
        }
        if(isFormValid){
            const newUserInfo = {...oldUser};
            newUserInfo[e.target.name] = e.target.value;
            setOldUser(newUserInfo);
        }
    }

    const handleGoogle = (e)=>{
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const {displayName, email} = result.user;
            const logingInUser = {name: displayName, email}
            console.log('signedInUser', logingInUser);
            setLoggedInUser(logingInUser)
            history.replace(from)
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            // ...
        });
        e.preventDefault()
    }

    return (
        <div>
            <div className="sign-in-field">
                <form onSubmit={handleSubmit}>
                    <h4 style={{textAlign:'left', marginLeft:'10px'}}>Login</h4>
                    <input onBlur={handleBlur} type="email" className="form-control" name="email" placeholder="Write your email" required/>
                    <br/>
                    <input onBlur={handleBlur} type="password" className="form-control" name="password" placeholder="Write your password" required/>
                    <br/>
                    <input className="submit-btn" type="submit" value="Log in"/>
                    <br/>
                    <br/>
                    <span>Don't have an account? </span> <Link to="/signup">Create an account</Link>
                </form>
            </div>
            <h5 style={{textAlign:'center'}}>or</h5>
            <div style={{textAlign:'center'}}>
                <button style={{borderRadius:'3px', padding:'5px'}} onClick={handleGoogle}><img style={{width:'30px'}} src={logo} alt=""/> <span>Sign in using google</span></button>
            </div>
        </div>
    );
};

export default Login;
