import Head from "next/head";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

function DashboardMasterLayout({ children }) {
    return (
        <>
            <Head>
                <link href="/css/styles.css" rel="stylesheet" />
                {/* <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous"></link> */}
            </Head>
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