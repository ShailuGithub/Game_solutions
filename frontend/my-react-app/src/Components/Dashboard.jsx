import React, { useState, useEffect } from 'react';

const Dashboard = () => {

    // State to manage sidebar visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle function for sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Use useEffect to add/remove 'toggle-sidebar' class to body when the state changes
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.classList.add('toggle-sidebar');
        } else {
            document.body.classList.remove('toggle-sidebar');
        }
    }, [isSidebarOpen]); // Runs when `isSidebarOpen` changes


    return (
        <div>
            {/* Header */}
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div class="d-flex align-items-center justify-content-between">
                    <a href="index.html" class="logo d-flex align-items-center">
                        {/* <img src="/img/logo.png" alt="" /> */}
                        <span class="d-none d-lg-block">ABC</span>
                    </a>
                    <i class="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar}></i>
                </div>

                <div class="search-bar">
                    <form class="search-form d-flex align-items-center" method="POST" action="#">
                        <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                        <button type="submit" title="Search"><i class="bi bi-search"></i></button>
                    </form>
                </div>

                <nav class="header-nav ms-auto">
                    <ul class="d-flex align-items-center">

                        <li class="nav-item d-block d-lg-none">
                            <a class="nav-link nav-icon search-bar-toggle " href="#">
                                <i class="bi bi-search"></i>
                            </a>
                        </li>

                        <li class="nav-item dropdown">

                            <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                                <i class="bi bi-bell"></i>
                                <span class="badge bg-primary badge-number">4</span>
                            </a>

                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                                <li class="dropdown-header">
                                    You have 4 new notifications
                                    <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li class="notification-item">
                                    <i class="bi bi-exclamation-circle text-warning"></i>
                                    <div>
                                        <h4>Lorem Ipsum</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>30 min. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li class="notification-item">
                                    <i class="bi bi-x-circle text-danger"></i>
                                    <div>
                                        <h4>Atque rerum nesciunt</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>1 hr. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li class="notification-item">
                                    <i class="bi bi-check-circle text-success"></i>
                                    <div>
                                        <h4>Sit rerum fuga</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>2 hrs. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li class="notification-item">
                                    <i class="bi bi-info-circle text-primary"></i>
                                    <div>
                                        <h4>Dicta reprehenderit</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>4 hrs. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr class="dropdown-divider" />
                                </li>
                                <li class="dropdown-footer">
                                    <a href="#">Show all notifications</a>
                                </li>

                            </ul>

                        </li>

                        <li class="nav-item dropdown">

                            <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                                <i class="bi bi-chat-left-text"></i>
                                <span class="badge bg-success badge-number">3</span>
                            </a>

                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                                <li class="dropdown-header">
                                    You have 3 new messages
                                    <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li class="message-item">
                                    <a href="#">
                                        <img src="/img/messages-1.jpg" alt="" class="rounded-circle" />
                                        <div>
                                            <h4>Maria Hudson</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>4 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li class="message-item">
                                    <a href="#">
                                        <img src="/img/messages-2.jpg" alt="" class="rounded-circle" />
                                        <div>
                                            <h4>Anna Nelson</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>6 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li class="message-item">
                                    <a href="#">
                                        <img src="/img/messages-3.jpg" alt="" class="rounded-circle" />
                                        <div>
                                            <h4>David Muldon</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>8 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li class="dropdown-footer">
                                    <a href="#">Show all messages</a>
                                </li>

                            </ul>

                        </li>

                        <li class="nav-item dropdown pe-3">

                            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                <img src="/img/profile-img.jpg" alt="Profile" class="rounded-circle" />
                                <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
                            </a>

                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li class="dropdown-header">
                                    <h6>Kevin Anderson</h6>
                                    <span>Web Designer</span>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li>
                                    <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i class="bi bi-person"></i>
                                        <span>My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li>
                                    <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i class="bi bi-gear"></i>
                                        <span>Account Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li>
                                    <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                        <i class="bi bi-question-circle"></i>
                                        <span>Need Help?</span>
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>

                                <li>
                                    <a class="dropdown-item d-flex align-items-center" href="#">
                                        <i class="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </a>
                                </li>

                            </ul>
                        </li>

                    </ul>
                </nav>
            </header>

            {/* Sidebar */}
            <aside id="sidebar" className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <ul class="sidebar-nav" id="sidebar-nav">

                    <li class="nav-item">
                        <a class="nav-link " href="index.html">
                            <i class="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-menu-button-wide"></i><span>Components</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="components-alerts.html">
                                    <i class="bi bi-circle"></i><span>Alerts</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-accordion.html">
                                    <i class="bi bi-circle"></i><span>Accordion</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-badges.html">
                                    <i class="bi bi-circle"></i><span>Badges</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-breadcrumbs.html">
                                    <i class="bi bi-circle"></i><span>Breadcrumbs</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-buttons.html">
                                    <i class="bi bi-circle"></i><span>Buttons</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-cards.html">
                                    <i class="bi bi-circle"></i><span>Cards</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-carousel.html">
                                    <i class="bi bi-circle"></i><span>Carousel</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-list-group.html">
                                    <i class="bi bi-circle"></i><span>List group</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-modal.html">
                                    <i class="bi bi-circle"></i><span>Modal</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-tabs.html">
                                    <i class="bi bi-circle"></i><span>Tabs</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-pagination.html">
                                    <i class="bi bi-circle"></i><span>Pagination</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-progress.html">
                                    <i class="bi bi-circle"></i><span>Progress</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-spinners.html">
                                    <i class="bi bi-circle"></i><span>Spinners</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-tooltips.html">
                                    <i class="bi bi-circle"></i><span>Tooltips</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-journal-text"></i><span>Forms</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="forms-elements.html">
                                    <i class="bi bi-circle"></i><span>Form Elements</span>
                                </a>
                            </li>
                            <li>
                                <a href="forms-layouts.html">
                                    <i class="bi bi-circle"></i><span>Form Layouts</span>
                                </a>
                            </li>
                            <li>
                                <a href="forms-editors.html">
                                    <i class="bi bi-circle"></i><span>Form Editors</span>
                                </a>
                            </li>
                            <li>
                                <a href="forms-validation.html">
                                    <i class="bi bi-circle"></i><span>Form Validation</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-layout-text-window-reverse"></i><span>Tables</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="tables-general.html">
                                    <i class="bi bi-circle"></i><span>General Tables</span>
                                </a>
                            </li>
                            <li>
                                <a href="tables-data.html">
                                    <i class="bi bi-circle"></i><span>Data Tables</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-bar-chart"></i><span>Charts</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="charts-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="charts-chartjs.html">
                                    <i class="bi bi-circle"></i><span>Chart.js</span>
                                </a>
                            </li>
                            <li>
                                <a href="charts-apexcharts.html">
                                    <i class="bi bi-circle"></i><span>ApexCharts</span>
                                </a>
                            </li>
                            <li>
                                <a href="charts-echarts.html">
                                    <i class="bi bi-circle"></i><span>ECharts</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-gem"></i><span>Icons</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="icons-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="icons-bootstrap.html">
                                    <i class="bi bi-circle"></i><span>Bootstrap Icons</span>
                                </a>
                            </li>
                            <li>
                                <a href="icons-remix.html">
                                    <i class="bi bi-circle"></i><span>Remix Icons</span>
                                </a>
                            </li>
                            <li>
                                <a href="icons-boxicons.html">
                                    <i class="bi bi-circle"></i><span>Boxicons</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-heading">Pages</li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="users-profile.html">
                            <i class="bi bi-person"></i>
                            <span>Profile</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-faq.html">
                            <i class="bi bi-question-circle"></i>
                            <span>F.A.Q</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-contact.html">
                            <i class="bi bi-envelope"></i>
                            <span>Contact</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-register.html">
                            <i class="bi bi-card-list"></i>
                            <span>Register</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-login.html">
                            <i class="bi bi-box-arrow-in-right"></i>
                            <span>Login</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-error-404.html">
                            <i class="bi bi-dash-circle"></i>
                            <span>Error 404</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-blank.html">
                            <i class="bi bi-file-earmark"></i>
                            <span>Blank</span>
                        </a>
                    </li>
                </ul>
            </aside>

            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>

                <section class="section dashboard">
                    <div class="row">


                        <div class="col-lg-8">
                            <div class="row">


                                <div class="col-xxl-4 col-md-6">
                                    <div class="card info-card sales-card">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Sales <span>| Today</span></h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-cart"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>145</h6>
                                                    <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <div class="col-xxl-4 col-md-6">
                                    <div class="card info-card revenue-card">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Revenue <span>| This Month</span></h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-currency-dollar"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>$3,264</h6>
                                                    <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <div class="col-xxl-4 col-xl-12">

                                    <div class="card info-card customers-card">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Customers <span>| This Year</span></h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-people"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>1244</h6>
                                                    <span class="text-danger small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">decrease</span>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>


                                <div class="col-12">
                                    <div class="card">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Reports <span>/Today</span></h5>


                                            {/* <div id="reportsChart">
                                                <ApexCharts options={chartOptions} series={chartOptions.series} type="area" height={350} />
                                            </div> */}


                                        </div>

                                    </div>
                                </div>


                                <div class="col-12">
                                    <div class="card recent-sales overflow-auto">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body">
                                            <h5 class="card-title">Recent Sales <span>| Today</span></h5>

                                            <table class="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Customer</th>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2457</a></th>
                                                        <td>Brandon Jacob</td>
                                                        <td><a href="#" class="text-primary">At praesentium minu</a></td>
                                                        <td>$64</td>
                                                        <td><span class="badge bg-success">Approved</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2147</a></th>
                                                        <td>Bridie Kessler</td>
                                                        <td><a href="#" class="text-primary">Blanditiis dolor omnis similique</a></td>
                                                        <td>$47</td>
                                                        <td><span class="badge bg-warning">Pending</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2049</a></th>
                                                        <td>Ashleigh Langosh</td>
                                                        <td><a href="#" class="text-primary">At recusandae consectetur</a></td>
                                                        <td>$147</td>
                                                        <td><span class="badge bg-success">Approved</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2644</a></th>
                                                        <td>Angus Grady</td>
                                                        <td><a href="#" class="text-primar">Ut voluptatem id earum et</a></td>
                                                        <td>$67</td>
                                                        <td><span class="badge bg-danger">Rejected</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#">#2644</a></th>
                                                        <td>Raheem Lehner</td>
                                                        <td><a href="#" class="text-primary">Sunt similique distinctio</a></td>
                                                        <td>$165</td>
                                                        <td><span class="badge bg-success">Approved</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>


                                <div class="col-12">
                                    <div class="card top-selling overflow-auto">

                                        <div class="filter">
                                            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li class="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><a class="dropdown-item" href="#">Today</a></li>
                                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                                <li><a class="dropdown-item" href="#">This Year</a></li>
                                            </ul>
                                        </div>

                                        <div class="card-body pb-0">
                                            <h5 class="card-title">Top Selling <span>| Today</span></h5>

                                            <table class="table table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Preview</th>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Sold</th>
                                                        <th scope="col">Revenue</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-1.jpg" alt="" /></a></th>
                                                        <td><a href="#" class="text-primary fw-bold">Ut inventore ipsa voluptas nulla</a></td>
                                                        <td>$64</td>
                                                        <td class="fw-bold">124</td>
                                                        <td>$5,828</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-2.jpg" alt="" /></a></th>
                                                        <td><a href="#" class="text-primary fw-bold">Exercitationem similique doloremque</a></td>
                                                        <td>$46</td>
                                                        <td class="fw-bold">98</td>
                                                        <td>$4,508</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-3.jpg" alt="" /></a></th>
                                                        <td><a href="#" class="text-primary fw-bold">Doloribus nisi exercitationem</a></td>
                                                        <td>$59</td>
                                                        <td class="fw-bold">74</td>
                                                        <td>$4,366</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-4.jpg" alt="" /></a></th>
                                                        <td><a href="#" class="text-primary fw-bold">Officiis quaerat sint rerum error</a></td>
                                                        <td>$32</td>
                                                        <td class="fw-bold">63</td>
                                                        <td>$2,016</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><a href="#"><img src="assets/img/product-5.jpg" alt="" /></a></th>
                                                        <td><a href="#" class="text-primary fw-bold">Sit unde debitis delectus repellendus</a></td>
                                                        <td>$79</td>
                                                        <td class="fw-bold">41</td>
                                                        <td>$3,239</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>


                        <div class="col-lg-4">


                            <div class="card">
                                <div class="filter">
                                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li class="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a class="dropdown-item" href="#">Today</a></li>
                                        <li><a class="dropdown-item" href="#">This Month</a></li>
                                        <li><a class="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div class="card-body">
                                    <h5 class="card-title">Recent Activity <span>| Today</span></h5>

                                    <div class="activity">

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">32 min</div>
                                            <i class='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                                            <div class="activity-content">
                                                Quia quae rerum <a href="#" class="fw-bold text-dark">explicabo officiis</a> beatae
                                            </div>
                                        </div>

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">56 min</div>
                                            <i class='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                                            <div class="activity-content">
                                                Voluptatem blanditiis blanditiis eveniet
                                            </div>
                                        </div>

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">2 hrs</div>
                                            <i class='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                                            <div class="activity-content">
                                                Voluptates corrupti molestias voluptatem
                                            </div>
                                        </div>

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">1 day</div>
                                            <i class='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                                            <div class="activity-content">
                                                Tempore autem saepe <a href="#" class="fw-bold text-dark">occaecati voluptatem</a> tempore
                                            </div>
                                        </div>

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">2 days</div>
                                            <i class='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                                            <div class="activity-content">
                                                Est sit eum reiciendis exercitationem
                                            </div>
                                        </div>

                                        <div class="activity-item d-flex">
                                            <div class="activite-label">4 weeks</div>
                                            <i class='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                                            <div class="activity-content">
                                                Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>


                            <div class="card">
                                <div class="filter">
                                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li class="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a class="dropdown-item" href="#">Today</a></li>
                                        <li><a class="dropdown-item" href="#">This Month</a></li>
                                        <li><a class="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div class="card-body pb-0">
                                    <h5 class="card-title">Budget Report <span>| This Month</span></h5>

                                    {/* <div id="budgetChart">
                                        <ReactECharts option={chartOptionsbudget} />
                                    </div> */}



                                </div>
                            </div>


                            <div class="card">
                                <div class="filter">
                                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li class="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a class="dropdown-item" href="#">Today</a></li>
                                        <li><a class="dropdown-item" href="#">This Month</a></li>
                                        <li><a class="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div class="card-body pb-0">
                                    <h5 class="card-title">Website Traffic <span>| Today</span></h5>

                                    {/* <div id="trafficChart" style="min-height: 400px;" class="echart"></div>
             
                               <script>
                         document.addEventListener("DOMContentLoaded", () => {
                                   echarts.init(document.querySelector("#trafficChart")).setOption({
                                     tooltip: {
                                       trigger: 'item'
                                     },
                                     legend: {
                                       top: '5%',
                                       left: 'center'
                                     },
                                     series: [{
                                       name: 'Access From',
                                       type: 'pie',
                                       radius: ['40%', '70%'],
                                       avoidLabelOverlap: false,
                                       label: {
                                         show: false,
                                         position: 'center'
                                       },
                                       emphasis: {
                                         label: {
                                           show: true,
                                           fontSize: '18',
                                           fontWeight: 'bold'
                                         }
                                       },
                                       labelLine: {
                                         show: false
                                       },
                                       data: [{
                                         value: 1048,
                                         name: 'Search Engine'
                                       },
                                       {
                                         value: 735,
                                         name: 'Direct'
                                       },
                                       {
                                         value: 580,
                                         name: 'Email'
                                       },
                                       {
                                         value: 484,
                                         name: 'Union Ads'
                                       },
                                       {
                                         value: 300,
                                         name: 'Video Ads'
                                       }
                                       ]
                                     }]
                                   });
                         });
                               </script> */}

                                </div>
                            </div>


                            <div class="card">
                                <div class="filter">
                                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li class="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a class="dropdown-item" href="#">Today</a></li>
                                        <li><a class="dropdown-item" href="#">This Month</a></li>
                                        <li><a class="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div class="card-body pb-0">
                                    <h5 class="card-title">News &amp; Updates <span>| Today</span></h5>

                                    <div class="news">
                                        <div class="post-item clearfix">
                                            <img src="assets/img/news-1.jpg" alt="" />
                                            <h4><a href="#">Nihil blanditiis at in nihil autem</a></h4>
                                            <p>Sit recusandae non aspernatur laboriosam. Quia enim eligendi sed ut harum...</p>
                                        </div>

                                        <div class="post-item clearfix">
                                            <img src="assets/img/news-2.jpg" alt="" />
                                            <h4><a href="#">Quidem autem et impedit</a></h4>
                                            <p>Illo nemo neque maiores vitae officiis cum eum turos elan dries werona nande...</p>
                                        </div>

                                        <div class="post-item clearfix">
                                            <img src="assets/img/news-3.jpg" alt="" />
                                            <h4><a href="#">Id quia et et ut maxime similique occaecati ut</a></h4>
                                            <p>Fugiat voluptas vero eaque accusantium eos. Consequuntur sed ipsam et totam...</p>
                                        </div>

                                        <div class="post-item clearfix">
                                            <img src="assets/img/news-4.jpg" alt="" />
                                            <h4><a href="#">Laborum corporis quo dara net para</a></h4>
                                            <p>Qui enim quia optio. Eligendi aut asperiores enim repellendusvel rerum cuder...</p>
                                        </div>

                                        <div class="post-item clearfix">
                                            <img src="assets/img/news-5.jpg" alt="" />
                                            <h4><a href="#">Et dolores corrupti quae illo quod dolor</a></h4>
                                            <p>Odit ut eveniet modi reiciendis. Atque cupiditate libero beatae dignissimos eius...</p>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </section>

            </main>
        </div>
    );
};

export default Dashboard;
