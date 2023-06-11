import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Auth.module.css'
import Script from "next/script";
import axios from 'axios'
import { useState } from 'react'
// import { Link, Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Login() {
    // const navigate = useNavigate();
    const router = useRouter();

    const [loginInput, setloginInput] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setloginInput({
            ...loginInput, [e.target.name]: e.target.value
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();


        axios.post('/api/login', loginInput).then(res => {
            const user = res.data.user;
            // console.log('hello', res.data)

            // Save user information in localStorage

            //   console.log(res.data);
            if (res.data.status == 200) {
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Success',
                //     text: 'Login Successfull',
                //     confirmButtonText: 'OK',
                // });
                // navigate('/dashboard')
                router.push('/dashboard');

            }
            else if (res.data.status == 400) {
                // console.log('hello','e')

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                    confirmButtonText: 'OK',
                });
            }

        })

    };
    return (
        <>

            <div class={styles.wrapper}>
                <div class={styles.formleft}>
                    <h2 class="text-uppercase">information</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Diam volutpat commodo.
                    </p>
                    <p class="text">
                        <span>Sub Head:</span>
                        Vitae auctor eu augudsf ut. Malesuada nunc vel risus commodo viverra. Praesent elementum facilisis leo vel.
                    </p>
                    <div class={styles.formfield}>
                        <Link href="/register">
                            <input type="text" class="account" value="Haven't account?" />

                        </Link>
                    </div>
                </div>
                <form class={styles.formright} onSubmit={handleSubmit}>
                    <h2 class="text-uppercase">Login form</h2>
                    <div class="row">
                        <div class="col-sm-12 mb-3">
                            <label>Your Email</label>
                            <input type="email" class={styles.inputfield} name="email" value={loginInput.email} required onChange={handleChange} />
                        </div>
                        {/* <div class="col-sm-6 mb-3">
                  <label>Last Name</label>
                  <input type="text" name="last_name" id="last_name" class={styles.inputfield}/>
              </div> */}
                    </div>

                    <div class="row">
                        <div class="col-sm-12 mb-3">
                            <label>Password</label>
                            <input type="password" name="password" id="password" class={styles.inputfield} value={loginInput.password} onChange={handleChange} />
                        </div>

                    </div>

                    <div class="form-field">
                        <input type="submit" value="Login" class={styles.register} name="login" />
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login;
