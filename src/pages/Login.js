import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from '../styles/login.module.css';
// import {login} from '../api';
import { useAuth } from '../hooks';

const Login =()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loggingIn,setLoggingIn]=useState(false);
    const auth=useAuth();
    console.log('auth:', auth);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoggingIn(true);
        const response= await auth.login(email, password);
        
        if(response.success){
            toast.success('Login success',{
                position:toast.POSITION.TOP_CENTER
            });
        }else{
            toast.error(response.massage,{
                position:toast.POSITION.TOP_CENTER
            })
        }
        setLoggingIn(false);
    }

    return (
        <form className={Styles.loginForm} onSubmit={handleSubmit}>
            <span className={Styles.loginSignupHeader}>Log IN</span>
            <div className={Styles.field}>
                <input 
                    type="email" 
                    placeholder="email" 
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} 
                />
            </div>
            <div className={Styles.field}>
                <input 
                    type="password" 
                    placeholder="password" 
                    required 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}  />
            </div>
            <div className={Styles.field} >
                <button disabled={loggingIn}>
                    {loggingIn? 'Logging in ...':'log in' }
                </button>
            </div>
        </form>
    );
}
export default Login;