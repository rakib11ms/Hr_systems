
import Head from "next/head"
import axios from 'axios';
import Link from "next/link";
import { useState, useEffect } from "react";
import DashboardMasterLayout from "./components/dashboard/DashboardMasterLayouyt"
import Sidebar from "./components/dashboard/Sidebar"
import Topbar from "./components/dashboard/Topbar"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import Swal from "sweetalert2";
function allusers({data}) {
  // const [loading, setLoading] = useState(false);

    const [usersData, setUsersData] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [filterValue, setFilterValue] = useState('all');
  
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 50));
      setPage(0);
    };
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/filter-user-status/${filterValue}`);
        setUsersData(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    useEffect(() => {
      fetchData();
    }, [filterValue]);
  
  
    const handleDelete = (e, userId) => {
      e.preventDefault();
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/api/delete-user/${userId}`).then((res) => {
            if (res.data.status == 200) {
              Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
              fetchData();
            } else {
              Swal.fire('Error on deletion');
            }
          });
        }
      });
    };
  
    return (
      <>
        <Head>
          <link href="/css/styles.css" rel="stylesheet" />
        </Head>
        <div className="sb-nav-fixed">
          <link href="/css/styles.css" rel="stylesheet" />
  
          <div id="layoutSidenav">
            <Topbar />
  
            <div id="layoutSidenav_content">
              <Sidebar />
              {/* {loading ?<div>Loading...</div>: */}
              
              <div className="container-fluid px-4">
              <h5 className="p-2">ALL USERS</h5>
              <div className="col-3 text-right">
                <select className="form-select my-3 " aria-label="Default select example" onChange={(e) => setFilterValue(e.target.value)}>
                  <option value="all">Choose Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold', color: 'red', borderTop: '1px solid #d2d2d2' }}>Name</TableCell>
                      <TableCell style={{ fontWeight: 'bold', color: 'red', borderTop: '1px solid #d2d2d2' }}>Email</TableCell>
                      <TableCell style={{ fontWeight: 'bold', color: 'red', borderTop: '1px solid #d2d2d2' }}>Status</TableCell>
                      <TableCell style={{ fontWeight: 'bold', color: 'red', borderTop: '1px solid #d2d2d2' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usersData
                      .slice(page * rowsPerPage, (page + 1)* rowsPerPage)
                      .map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>{item.isVerified ? 'Active' : 'Inactive'}</TableCell>
                          <TableCell>
                            <div className="">
                                <a href="/edit-user">
                                <i className="fa fa-edit">
                                </i>

                                </a>
                              <i className="fa fa-trash mx-3 text-danger" onClick={(e) => handleDelete(e, item._id)}></i>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={usersData.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
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
  
  export async function getServerSideProps() {

    try {
      // Fetch data from an API endpoint
      const response = await axios.get('/api/all-users');
  
      // Extract the data from the response
      const data = response.data.all_users;
      // setLoading(true);

      // Pass the data as props to the component
      return {
        props: {
          data,
        },
      };
    } catch (error) {
      // Handle any errors that occur during the data fetching
      console.error('Error fetching data:', error.message);
  
      // You can choose to display an error page or fallback content
      return {
        props: {},
      };
    }
  }

  
export default allusers