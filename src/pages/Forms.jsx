import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Snackbar } from '../components/alertMessage/AlertMessage';

import Table from '../components/table/Table';
import Companie from '../components/companye/Companye';
import { axiosInstance, baseURL } from '../components/config';
import Checkbox from '../components/input-checkbox/Checkbox';
import Loading from '../components/loading/Loading';
import useCopmanys from '../context/companysState/CompanysContext';

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index, navigate, forms) => {
  const form = forms.find((fo) => fo.token === item.token);

  return (
    <tr
      key={index}
      onClick={() => navigate(item.token ? `/forms/${item.token}` : `notFaund`)}
    >
      <td>{item.name}</td>
      <td>
        <Checkbox active={item.isActive} />
      </td>
      <td>{form?.formsLength || 0}</td>
      <td>{new Date(item.date).toLocaleDateString()}</td>
      <td>{form?.date ? new Date(form?.date)?.toLocaleDateString() : '-'}</td>
    </tr>
  );
};

export default function Forms() {
  const { companys, formsLength } = useCopmanys();

  const [forms, setForms] = useState([]);

  useEffect(() => {
    let data = [];

    for (let ind = 0; ind < companys.length; ind++) {
      let filterForms = formsLength.filter(
        (form) => form.token === companys[ind].token
      );

      data.push({
        formsLength: filterForms.length,
        date: filterForms[filterForms?.length - 1]?.date,
        token: filterForms[0]?.token
      });
    }

    setForms(data);
  }, [companys]);

  let navigate = useNavigate();

  const latestHeader = [
    {
      hebrew: 'שם',
      kay: 'name'
    },
    {
      hebrew: 'סטטוס',
      kay: 'isActive'
    },
    {
      hebrew: 'טפסים',
      kay: 'forms'
    },
    {
      hebrew: 'הצטרף ב',
      kay: 'data'
    },
    {
      hebrew: 'טופס אחרון',
      kay: 'lastForm'
    }
  ];

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body forms">
              <h2 className="page-header">טפסים</h2>
              <Table
                search={true}
                headData={latestHeader}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={companys}
                renderBody={(item, index) =>
                  renderOrderBody(item, index, navigate, forms)
                }
              />
              <div className="back" onClick={() => navigate('/')}>
                חזור
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SelectForm = () => {
  const [loading, setLoading] = useState(!0);
  const [open, setOpen] = useState(!1);
  const [data, setData] = useState({});

  const { companys } = useCopmanys();

  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fatchData = async () => {
      if (id) {
        const value = await axiosInstance.post(
          'api/forms/get-all-forms-in-company',
          {
            data: id
          }
        );

        setData(value?.data?.data || []);
      }
      setLoading(!1);
    };
    fatchData();
  }, [id]);

  function copyToClipboard() {
    navigator.clipboard.writeText(
      `${baseURL.replace('5000', '3000')}${id ? `form101/${id}` : `notFaund`}`
    );
    setOpen(true);
  }

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body forms">
              <h2 className="page-header">
                <Link to="/forms">טפסים</Link>
                <div>{` > `}</div>
                {companys.filter((company) => company.token === id)[0]?.name ||
                  ''}
              </h2>
              {!loading ? (
                <>
                  <h2 className="page-header">
                    <div
                      className="link"
                      onClick={() =>
                        navigate(id ? `/form101/${id}` : `notFaund`)
                      }
                    >
                      פתח קישור
                    </div>
                    <div className="link" onClick={copyToClipboard}>
                      העתק קישור
                    </div>
                    <Snackbar
                      message="הועתק ללוח"
                      autoHideDuration={3000}
                      onClose={() => setOpen(false)}
                      open={open}
                    />
                  </h2>
                  <Companie limit="10" bodyData={data} />
                </>
              ) : (
                <Loading />
              )}
              <div className="back" onClick={() => navigate('/forms')}>
                חזור
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
