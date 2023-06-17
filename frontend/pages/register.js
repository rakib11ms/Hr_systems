import axios from 'axios'
import { useState } from 'react'
import styles from '../styles/Auth.module.css'
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useRouter } from 'next/router';function Register() {

    // const navigate=useNavigate();
    const router = useRouter();

    const [registerInputState,setRegisterInputState]=useState({
        name:"",
        email:"",
        password:"",
        confirm_password:""
    })

   const handleChange=(e)=>{
    setRegisterInputState({
        ...registerInputState,[e.target.name]:e.target.value
    })
   }

   const handleRegisterSubmit=(e)=>{
    e.preventDefault();
    axios.post(`/api/register`).then(res => {
        if (res.data.status == 200) {
            // navigate('/login')
            router.push('/');

            setRegisterInputState({
                    name:"",
                    email:"",
                    password:"",
                    confirm_password:""
            });
    
        }
        else{
            Swal.fire('eror while inserting')
        }
    });
   }


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
                        <Link href="/">
                        <input type="text" class="account" value="Have an Account?" />

                        </Link>
                    </div>
                </div>
                <form class={styles.formright} id="registerForm" onSubmit={handleRegisterSubmit}>
                    <h2 class="text-uppercase">Registration form</h2>
                    <div class="row">
                        <div class="col-sm-12 mb-3">
                            <label>Full Name</label>
                            <input type="text" name="name" id="name" value={registerInputState.name} class={styles.inputfield} onChange={handleChange}/>
                        </div>
                        {/* <div class="col-sm-6 mb-3">
                    <label>Last Name</label>
                    <input type="text" name="last_name" id="last_name" class={styles.inputfield}/>
                </div> */}
                    </div>
                    <div class="mb-3">
                        <label>Your Email</label>
                        <input type="email" class={styles.inputfield} name="email" value={registerInputState.email} required onChange={handleChange} />
                    </div>
                    <div class="row">
                        <div class="col-sm-6 mb-3">
                            <label>Password</label>
                            <input type="password" name="password" id="password" class={styles.inputfield} value={registerInputState.password} onChange={handleChange}/>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label>Confirm Password</label>
                            <input type="password" name="confirm_password" id="confirm_password"  value={registerInputState.confirm_password} onChange={handleChange} class={styles.inputfield} />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class={styles.option}>I agree to the <a href="#">Terms and Conditions</a>
                            <input type="checkbox" />
                            <span class={styles.checkmark}></span>
                        </label>
                    </div>
                    <div class={styles.formfield}>
                        <input type="submit" value="Register" class={styles.register} name="register" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register

