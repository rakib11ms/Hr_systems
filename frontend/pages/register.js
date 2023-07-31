import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from '../styles/Auth.module.css'
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Register() {
    const [allDesignation, setAllDesignation] = useState([])
    const [allRoles, setAllRoles] = useState([])
    useEffect(() => {
        axios.get(`/api/all-designation`).then(res => {
            if (res.data.status == 200) {
                console.log('res', res)
                setAllDesignation(res.data.allDesgination);

            }
        })
        axios.get(`/api/all-roles`).then(res => {
            if (res.data.status == 200) {
                setAllRoles(res.data.allRoles);

            }
        })

    }, [])

    // const navigate=useNavigate();
    const router = useRouter();

    const [image, setImage] = useState('');
    console.log('image info', image.size)
    const [picture, setPicture] = useState('');

const onChangePicture = (e) => {
  const selectedImage = e.target.files[0];
  console.log('selectedImage: ', selectedImage);
  setPicture(URL.createObjectURL(selectedImage));
  setImage(selectedImage);
};



    const [registerInputState, setRegisterInputState] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        present_address: "",
        permanent_address: "",
        role: "",
        designation: ""
    })


    const handleChange = (e) => {
        setRegisterInputState({
            ...registerInputState, [e.target.name]: e.target.value
        })
    }


  
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', registerInputState.name);
        formData.append('email', registerInputState.email);
        formData.append('password', registerInputState.password);
        formData.append('confirm_password', registerInputState.confirm_password);
        formData.append('present_address', registerInputState.present_address);
        formData.append('permanent_address', registerInputState.permanent_address);
        formData.append('role', registerInputState.role);
        formData.append('designation', registerInputState.designation);
        if (image) { // Check if the image exists before appending
            formData.append('image', image);
          }
        
      
        console.log('check all data', formData.get('name'));
        axios.post(`/api/register`, formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((res) => {
          if (res.data.status == 200) {
            Swal.fire(res.data.message, '', 'success');
            router.push('/');
          }
        });
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
                            <input type="text" name="name" id="name" value={registerInputState.name} class={styles.inputfield} onChange={handleChange} />
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
                            <input type="password" name="password" id="password" class={styles.inputfield} value={registerInputState.password} onChange={handleChange} />
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label>Confirm Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" value={registerInputState.confirm_password} onChange={handleChange} class={styles.inputfield} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 mb-3">
                            <label>Designation</label>
                            <select class="form-select" aria-label="Default select example" name="designation" value={registerInputState.designation} onChange={handleChange}>
                                <option selected>Choose</option>

                                {
                                    allDesignation.map((item, i) => {
                                        return (
                                            <>
                                                <option value={item._id}>{item.name}</option>

                                            </>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label>Role</label>
                            <select class="form-select" aria-label="Default select example" name="role" value={registerInputState.role} onChange={handleChange}>
                                <option selected>Choose</option>
                                {
                                    allRoles.map((item, i) => {
                                        return (
                                            <>
                                                <option value={item._id}>{item.name}</option>

                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-12 mb-3">
                        <label>Present Address</label>
                        <input type="text" name="present_address" id="present_address" value={registerInputState.present_address} class={styles.inputfield} onChange={handleChange} />
                    </div>
                    <div class="col-sm-12 mb-3">
                        <label>Permanent Address</label>
                        <input type="text" name="permanent_address" id="name" value={registerInputState.permanent_address} class={styles.inputfield} onChange={handleChange} />
                    </div>

                    <div class="col-sm-12 mb-3">
                        <label for="formFile" class="form-label">User Image</label>
                        <input class="form-control" type="file" id="formFile" name="image" onChange={onChangePicture} />
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

