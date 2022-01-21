import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.css';

const Signup = () => {

    const history = useHistory();

    const [user, setUser] = useState({
        username: "",email: "",password: ""
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;

        setUser({ ... user, [name]:value});
    }

    const postData = async (e) => {
        e.preventDefault();

        const { username, email, password } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username, email, password        
            })
        });

        const data = await res.json();
        console.log(data);
        if(data.status === 0 || !data){
            window.alert(data.message);
            console.log(data.message);
        }else{
            window.alert(data.message);
            console.log(data.message);
            // history.push("/login");
        }
    }

    return (
        <>
            <div className="main p-2 py-3 p-xl-5">
                <div className="body d-flex p-0 p-xl-5">
                    <div className="container-xxl">

                        <div className="row g-0">
                            <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100">
                                <div style={{maxWidth: '400px'}}>
                                    <div className="text-center mb-5">
                                        <svg  width="4rem" fill="currentColor" className="bi bi-clipboard-check" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                        </svg>
                                    </div>
                                    <div className="mb-5">
                                        <h2 className="color-900 text-center">My-Task Let's Management Better</h2>
                                    </div>
                                    <div className="">
                                        <img src="../assets/images/login-img.svg" alt="login-img" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
                                <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{maxWidth: '512px'}}>
                                    <form method="POST" className="row g-1 p-3 p-md-4" id="register-form">
                                        <div className="col-12 text-center mb-1 mb-lg-5">
                                            <h1>Create your account</h1>
                                            <span>Free access to our dashboard.</span>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-2">
                                                <label className="form-label">Username</label>
                                                <input type="text" className="form-control form-control-lg" placeholder="John" 
                                                    name="username" id="username"
                                                    value={user.username}
                                                    onChange={handleInputs}
                                                />
                                            </div>
                                        </div>                                        
                                        <div className="col-12">
                                            <div className="mb-2">
                                                <label className="form-label">Email address</label>
                                                <input type="email" className="form-control form-control-lg" placeholder="name@example.com" 
                                                    name="email" id="email"
                                                    value={user.email}
                                                    onChange={handleInputs}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-2">
                                                <label className="form-label">Password</label>
                                                <input type="password" className="form-control form-control-lg" placeholder="8+ characters required" 
                                                    name="password" id="password"
                                                    value={user.password}
                                                    onChange={handleInputs}
                                                />
                                            </div>
                                        </div>                                        
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    I accept the <a href="#" title="Terms and Conditions" className="text-secondary">Terms and Conditions</a>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12 text-center mt-4">
                                            <button type="submit" className="btn btn-lg btn-block btn-light lift text-uppercase" alt="SIGNUP" 
                                                id="register" name="register" 
                                                onClick={postData}    
                                            >SIGN UP</button>
                                        </div>
                                        <div className="col-12 text-center mt-4">
                                            <span className="text-muted">Already have an account? <a href="auth-signin.html" title="Sign in" className="text-secondary">Sign in here</a></span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
