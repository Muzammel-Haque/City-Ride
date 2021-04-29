import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { Link } from 'react-router-dom';
import './Signup.css'


firebase.initializeApp(firebaseConfig);

const Signup = () => {
    const [user, setUser] = useState({
        name:'',
        password:'',
        email:'',
        error:'',
        success: false
    })
    const handleSubmit = (e) =>{
        console.log(user.email, user.password)
        if(user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo)
                updateUser(user.name)
            })
            .catch(error => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
            });
        }
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
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            console.log(user)
        }
    }

    const updateUser = (name)=>{
        var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name,
        })
        .then(function() {
            
        }).catch(function(error) {
            console.log(error)
        });
    }
    return (
        <div>
            <div className="sign-in-field">
                <form onSubmit={handleSubmit}>
                    <h4 style={{textAlign:'left', marginLeft:'10px'}}>Create an account</h4>
                    <input onBlur={handleBlur} name="name" className="form-control" type="text" placeholder="Write your name"/>
                    <br/>
                    <input onBlur={handleBlur} type="email" className="form-control" name="email" placeholder="Write your email" required/>
                    <br/>
                    <input onBlur={handleBlur} type="password" className="form-control" name="password" placeholder="Write your password" required/>
                    <br/>
                    <input style={{textAlign:'center'}} className="submit-btn" onBlur={handleBlur} type="submit"  value="Submit"/>
                    <br/>
                    <br/>
                    <span>If you have already an account? </span> <Link to='/login'>Log in</Link>
                </form>
                <p style={{color:'red'}}>{user.error}</p>
                {user.success && <p style={{color:'green'}}>Account created successfully</p>}
            </div>
        </div>
    );
};

export default Signup;