import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from '../../components/dashboard/Topbar';
import Sidebar from '../../components/dashboard/Sidebar';
import Swal from 'sweetalert2';
function EditUser() {
  const router = useRouter();
  const { id } = router.query;

  const [editUserData, setEditUserData] = useState(null);

  console.log('edit', editUserData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/edit-user/${id}`);
        const serverResponse = response.data.data[0];
        setEditUserData(serverResponse);
      } catch (error) {
        console.error('Error fetching server data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!editUserData) {
    // Handle the case when editUserData is not available yet
    return <div>Loading...</div>;
  }


  const handleChange=(e)=>{
    setEditUserData({
      ...editUserData,
      [e.target.name]:e.target.value
    })
  }
  const handleUpdate=(e)=>{
    axios.put(`/api/update-user/${id}`,editUserData).then((res) => {
      if (res.data.status == 200) {
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
        window.location.reload();
      } else {
        Swal.fire('Error on deletion');
      }
    }); 
   }
  return (
    <>
      <div className="sb-nav-fixed">
        <link href="/css/styles.css" rel="stylesheet" />

        <div id="layoutSidenav">
          <Topbar />

          <div id="layoutSidenav_content">
            <Sidebar />
            {/* {loading ?<div>Loading...</div>: */}

            <div className="container-fluid px-4">
              <h5 className="p-2">EDIT USERS INFO</h5>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Name</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" name="name" value={editUserData.name} onChange={handleChange}/>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" name="email" value={editUserData.email}  onChange={handleChange}/>
              </div>
              <div className='mb-3'>
                <select class="form-select" aria-label="Default select example" name="isVerified" value={editUserData.isVerified}  onChange={handleChange}>
                  <option selected>Open this select menu</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className='md-3'>
                <button className='btn btn-success' onClick={handleUpdate}>
                  Update
                </button>
              </div>


            </div>
            {/* } */}




            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">Copyright &copy; Your Website 2023</div>
                  <div>
                    <a href="#">Privacy Policy</a>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

    </>
  );
}

export default EditUser;
