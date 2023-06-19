import Head from "next/head";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

function DashboardMasterLayout({ children }) {
    return (
        <>

            <div className="sb-nav-fixed">

                <div id="layoutSidenav">
                    <Topbar />

                    <div id="layoutSidenav_content">
                        <Sidebar />


                        <div class="container-fluid px-4">
                            {children}

                        </div>

                        <footer class="py-4 bg-light mt-auto">
                            <div class="container-fluid px-4">
                                <div class="d-flex align-items-center justify-content-between small">
                                    <div class="text-muted">Copyright &copy; Your Website 2023</div>
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
    )
}

export default DashboardMasterLayout