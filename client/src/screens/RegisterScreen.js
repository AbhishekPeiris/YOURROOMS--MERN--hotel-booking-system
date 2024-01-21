import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';

const RegisterScreen = () => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState()

    const register = async () => {

        if (password == cpassword) {

            const user = {
                name,
                email,
                password,
                cpassword
            }

            try {
                setloading(true);
                const result = await axios.post('/api/users/register', user).data
                setloading(false)
                setsuccess(true)

                window.location.href = '/login';

                setname('')
                setemail('')
                setpassword('')
                setcpassword('')

            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)
            }
            console.log(user)
        }
        else {
            alert('Password not matched')
        }
    }

    return (
        <div>

            {loading && (<Loader />)}
            {error && (<Error />)}
            <form onSubmit={register}>
                <div className='row justify-content-center mt-5'>

                    <div className='col-md-5 mt-5'>
                        {success && (<Success message='Registration success' />)}
                        <div className='bs'>
                            <h2>Register</h2>
                            <input type='text' className='form-control' placeholder='name' required
                                value={name} onChange={(e) => { setname(e.target.value) }} />
                            <input type='email' className='form-control' placeholder='email' required
                                value={email} onChange={(e) => { setemail(e.target.value) }} />
                            <input type='password' className='form-control' placeholder='password' required
                                value={password} onChange={(e) => { setpassword(e.target.value) }} />
                            <input type='password' className='form-control' placeholder='confirm password' required
                                value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />

                            <button className='btn btn-primary mt-3'>Register</button>
                        </div>
                    </div>

                </div>
            </form>


        </div>
    );
}

export default RegisterScreen;
