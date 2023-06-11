import Script from "next/script";
import Head from "next/head";
import Topbar from "./components/dashboard/Topbar";
import Sidebar from "./components/dashboard/Sidebar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardMasterLayout from "./components/dashboard/DashboardMasterLayouyt";

function dashboard() {
    const [data, setData] = useState([])
    console.log('data:', data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('api/count-active-inactive-users');
                const serverResponse = response.data;
                setData(serverResponse)
            } catch (error) {
                console.error('Error fetching server data:', error);
            }
        };

        fetchData();
    }, []);

    return (

        <>
            <DashboardMasterLayout>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Dashboard</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <div class="row">
                        <div class="col-xl-5 col-md-6">
                            <div class="card bg-primary text-white mb-4">
                                <div class="card-body fs-5">Active Users</div>
                                <h5 className="mx-5">{data.active_users}</h5>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 col-md-6">
                            <div class="card bg-warning text-white mb-4">
                                <div class="card-body fs-5">Inactive Users</div>
                                <h5 className="mx-5">{data.inactive_users}</h5>

                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>



            </DashboardMasterLayout>

        </>
    );
}

export default dashboard;

