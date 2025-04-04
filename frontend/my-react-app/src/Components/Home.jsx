import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import ReactECharts from "echarts-for-react";
import NavBar from "./NavBar";
import axiosinstance from "../utils/axiosinstance";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [SalesTodayCount, setSalesTodayCount] = useState(null);
  const [SalesTodayLiveCount, setSalesTodayLiveCount] = useState(null);
  const [SalesTodayCompletedCount, setSalesTodayCompletedCount] = useState(null);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    GetSalesTodayCount();
    GetSalesTodayLiveCount();
    GetSalesTodayCompletedCount();
    // Add the scroll event listener on mount
    window.addEventListener("scroll", handleScroll);

    // Call the handleScroll to check the initial scroll position
    handleScroll();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const GetSalesTodayCount = async () => {
    try {
      const response = await axiosinstance.get("sales/GetSalesTodayCount");
      if (response.status === 200 && response.data.Valid) {
        setSalesTodayCount(response.data.SalesTodayCount)
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Sales Today Count:", error);
    }
  };
  const GetSalesTodayLiveCount = async () => {
    try {
      const response = await axiosinstance.get("sales/GetSalesTodayLiveCount");
      if (response.status === 200 && response.data.Valid) {
        setSalesTodayLiveCount(response.data.SalesTodayLiveCount)
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Sales Today Count:", error);
    }
  };

  const GetSalesTodayCompletedCount = async () => {
    try {
      const response = await axiosinstance.get("sales/GetSalesTodayCompletedCount");
      if (response.status === 200 && response.data.Valid) {
        setSalesTodayCompletedCount(response.data.SalesTodayCompletedCount)
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Sales Today Count:", error);
    }
  };

  const chartOptions = {
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 82, 56],
      },
      {
        name: "Revenue",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
      {
        name: "Customers",
        data: [15, 11, 32, 18, 9, 24, 11],
      },
    ],
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 4,
    },
    colors: ["#4154f1", "#2eca6a", "#ff771d"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.4,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const chartOptionsbudget = {
    legend: {
      data: ["Allocated Budget", "Actual Spending"],
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "Sales", max: 6500 },
        { name: "Administration", max: 16000 },
        { name: "Information Technology", max: 30000 },
        { name: "Customer Support", max: 38000 },
        { name: "Development", max: 52000 },
        { name: "Marketing", max: 25000 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "Allocated Budget",
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "Actual Spending",
          },
        ],
      },
    ],
  };

  return (
    <div className="container">
      <NavBar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section class="section dashboard">
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-xxl-4 col-md-4">
                  <div class="card info-card sales-card">
                    {/* <div class="filter">
                      <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li class="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><a class="dropdown-item" href="#">Today</a></li>
                        <li><a class="dropdown-item" href="#">This Month</a></li>
                        <li><a class="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div> */}

                    <div class="card-body">
                      <h5 class="card-title">
                        SALES <span>| TODAY</span>
                      </h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="ri-numbers-line"></i>
                        </div>
                        <div class="ps-3">
                          <h6>{SalesTodayCount !== null ? SalesTodayCount : "Loading..."}</h6>
                          {/* <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xxl-4 col-md-4">
                  <div class="card info-card revenue-card">
                    {/* <div class="filter">
                      <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li class="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><a class="dropdown-item" href="#">Today</a></li>
                        <li><a class="dropdown-item" href="#">This Month</a></li>
                        <li><a class="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div> */}

                    <div class="card-body">
                      <h5 class="card-title">
                        Game <span>| LIVE</span>
                      </h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="ri-gamepad-line"></i>
                        </div>
                        <div class="ps-3">
                        <h6>{SalesTodayLiveCount !== null ? SalesTodayLiveCount : "Loading..."}</h6>
                          {/* <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xxl-4 col-xl-4">
                  <div class="card info-card customers-card">
                    {/* <div class="filter">
                      <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li class="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><a class="dropdown-item" href="#">Today</a></li>
                        <li><a class="dropdown-item" href="#">This Month</a></li>
                        <li><a class="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div> */}

                    <div class="card-body">
                      <h5 class="card-title">
                        Game <span>| COMPLETED</span>
                      </h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="ri-gamepad-line"></i>
                        </div>
                        <div class="ps-3">
                        <h6>{SalesTodayCompletedCount !== null ? SalesTodayCompletedCount : "Loading..."}</h6>
                          {/* <span class="text-danger small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">decrease</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="card">
                    {/* <div class="filter">
                      <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li class="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><a class="dropdown-item" href="#">Today</a></li>
                        <li><a class="dropdown-item" href="#">This Month</a></li>
                        <li><a class="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div> */}

                    <div class="card-body">
                      <h5 class="card-title">
                        Reports <span>/Today</span>
                      </h5>

                      <div id="reportsChart">
                        <ApexCharts
                          options={chartOptions}
                          series={chartOptions.series}
                          type="area"
                          height={350}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div class="col-lg-4">


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

                  <div id="budgetChart">
                    <ReactECharts option={chartOptionsbudget} />
                  </div>



                </div>
              </div>



            </div> */}
          </div>
        </section>
      </main>
      <footer id="footer" class="footer">
        <div class="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>ABC</span>
          </strong>
          . All Rights Reserved
        </div>
        <div class="credits">
          {" "}
          Designed by <a href="#">XYZ</a>
        </div>
      </footer>
      <a
        href="#"
        className={`back-to-top d-flex align-items-center justify-content-center ${isVisible ? "active" : ""
          }`}
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default Home;
