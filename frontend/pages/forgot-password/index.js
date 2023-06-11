import axios from 'axios'
import styles from '../../styles/Auth.module.css'
import { useState,useEffect } from 'react'
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useRouter } from 'next/router';
function forgotPassWord() {
    const router = useRouter();

    const [email,setEmail]=useState('');
    const data={
        email:email
    }
    useEffect(()=>{

    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        
        axios.post('/api/forgot-password', data).then(res => {
  
            if (res.data.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.message,
                    confirmButtonText: 'OK',
                });
                // navigate('/dashboard')
                // router.push('/dashboard');

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
    }
    return (
        <>
            <div class={`${styles.wrapper} ${styles.pagewrap} d-flex flex-row align-items-center`}>
                <div class="container col-10">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="https://via.placeholder.com/190x190.png?text=logo" class="img-fluid rounded-circle shadow-sm" alt="" />
                        </div>
                        <div class="col-md-9">
                            <h2 class="font-weight-light text-uppercase" style={{
                                color: '#3786bd'
                            }}>Forgot your password?</h2>
                            Not to worry. Just enter your email address below and we'll send you an instruction email for recovery.
                            <form action="" class="mt-3" onSubmit={handleSubmit}>
                                <input class="form-control form-control py-2" type="email" onChange={(e)=>setEmail(e.target.value)}placeholder="Your email address" />

                                <div class="text-right my-3">
                                    <button type="submit" class="btn py-2 btn-primary">Reset Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default forgotPassWord