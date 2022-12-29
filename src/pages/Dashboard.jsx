import Chart from 'react-apexcharts';

import { useSelector } from 'react-redux';

import StatusCard from '../components/status-card/StatusCard';

import Loading from '../components/loading/Loading';
import { UserContext } from '../context/userState/userContext';
import { useContext, useState, useEffect } from 'react';
import useCopmanys from '../context/companysState/CompanysContext';

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const { state } = useContext(UserContext);
  const { companys, formsLength } = useCopmanys();
  const { users, usersByMonth } = state;

  const [statusCards, setStatusCards] = useState([]);
  const [pieSeries, setPieSeries] = useState([]);
  const [barSeries, setBarSeries] = useState([]);
  const [lineData, setLineData] = useState();

  useEffect(() => {
    const activeUsers = users
      ? users.filter((user) => user.isActive === true).length
      : 0;

    const userObj = [
      {
        icon: 'fas fa-user-check',
        count: activeUsers || 0,
        title: 'פעילים',
        nav: '/admins'
      },
      {
        icon: 'fas fa-users',
        count: users ? users.length : 0,
        title: 'מנהלים',
        nav: '/admins'
      },
      {
        icon: 'fas fa-file-invoice',
        count: formsLength.length || 0,
        title: 'טפסים',
        nav: '/forms'
      },
      {
        icon: 'fas fa-building',
        count: companys.length || 0,
        title: 'חברות',
        nav: '/companys'
      }
    ];
    setStatusCards(userObj);
  }, [users, companys.length, formsLength.length]);

  useEffect(() => {
    if (usersByMonth) {
      const lineStatsData = {
        series: [
          {
            name: 'חברות',
            data: []
          }
        ],
        options: {
          chart: {
            height: '100%',
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'straight'
          },
          grid: {
            row: {
              // colors: ['#f3f3f3', 'transparent'],
              opacity: 0.1
            }
          },
          xaxis: {
            categories: []
          }
        }
      };

      for (let index = 0; index < usersByMonth.length; index++) {
        const data = usersByMonth[index];

        lineStatsData.series[0].data.push(data.count);
        lineStatsData.options.xaxis.categories.push(data.month);
      }
      setLineData(lineStatsData);
    }
  }, [usersByMonth]);

  useEffect(() => {
    if (formsLength) {
      const chartOptions = {
        options: {
          series: [],
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 2
            }
          },
          xaxis: {
            type: 'datetime',
            categories: []
          },
          // colors: ['#FD6A6A', '#81D4FA', '#C7F464', '#4ECDC4', '#546E7A'],
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
        }
      };

      let newArray = [];
      let categories = formsLength
        .map((e) => {
          const d = new Date(e.date);
          const year = d.getUTCFullYear();
          const month = d.getMonth() + 1;
          return `01/0${month}/${year}`;
        })
        .filter((e) => {
          if (newArray.includes(e)) {
            return false;
          } else {
            newArray.push(e);
            return true;
          }
        });

      chartOptions.options.xaxis.categories = categories;

      let series = [];

      for (let i = 0; i < companys.length; i++) {
        series.push({
          name: companys[i].name,
          data: []
        });
      }

      //  categories
      for (let i = 0; i < categories.length; i++) {
        //  filter forms in date
        let filterForms = formsLength.filter((e) => {
          const d = new Date(e.date);
          const year = d.getUTCFullYear();
          const month = d.getMonth() + 1;

          return `01/0${month}/${year}` === categories[i];
        });

        // filter forms in companys
        for (let j = 0; j < companys.length; j++) {
          const insexCompany = series.findIndex(
            (obj) => obj.name === companys[j].name
          );

          let filterToken = filterForms.filter(
            (e) => e.token === companys[j].token
          ).length;

          series[insexCompany].data.push(filterToken);
        }
      }
      chartOptions.options.series = series;

      setBarSeries(chartOptions);
    }
  }, [companys, formsLength]);

  useEffect(() => {
    let pie = {
      series: [],

      options: {
        labels: [],
        // colors: ['#FD6A6A', '#81D4FA', '#C7F464', '#4ECDC4', '#546E7A'],

        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: '100%',
                height: '100%'
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }
    };

    for (let ind = 0; ind < companys?.length; ind++) {
      let filterForms = formsLength
        ? formsLength.filter((form) => form.token === companys[ind].token)
            .length
        : 0;

      pie.options.labels.push(companys[ind].name);
      pie.series.push(filterForms);
    }

    setPieSeries(pie);
  }, [companys, formsLength]);

  return (
    <div>
      <div className="row body-dashboard">
        <div className="col-6 body-dashboard-box">
          <div className="row">
            {statusCards.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                  nav={item.nav}
                />
              </div>
            ))}
          </div>
        </div>
        {/* chart */}
        <div className="col-6 body-dashboard-box">
          <div className="card full-height">
            {barSeries?.options ? (
              <>
                <h4>טפסים לפי תאריך</h4>
                <Chart
                  options={
                    themeReducer === 'theme-mode-dark'
                      ? {
                          ...barSeries.options,
                          theme: { mode: 'dark' }
                        }
                      : {
                          ...barSeries.options,
                          theme: { mode: 'light' }
                        }
                  }
                  series={barSeries.options.series}
                  type="bar"
                  height="95%"
                />
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="col-6 body-dashboard-box" style={{ marginTop: '2rem' }}>
          <div className="card full-height">
            {pieSeries?.options ? (
              <>
                <h4>טפסים לפי חברה</h4>
                <Chart
                  options={
                    themeReducer === 'theme-mode-dark'
                      ? {
                          ...pieSeries.options,
                          theme: { mode: 'dark' }
                        }
                      : {
                          ...pieSeries.options,
                          theme: { mode: 'light' }
                        }
                  }
                  series={pieSeries.series}
                  type="pie"
                  height="95%"
                />
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="col-6 body-dashboard-box" style={{ marginTop: '2rem' }}>
          <div className="card full-height">
            {lineData?.options ? (
              <>
                <h4>חברות שהצטרפו לפי חודשים</h4>
                <Chart
                  options={
                    themeReducer === 'theme-mode-dark'
                      ? {
                          ...lineData.options,
                          theme: { mode: 'dark' }
                        }
                      : {
                          ...lineData.options,
                          theme: { mode: 'light' }
                        }
                  }
                  series={lineData.series}
                  type="line"
                  height="95%"
                />
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
