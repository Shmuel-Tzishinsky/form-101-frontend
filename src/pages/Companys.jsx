import Table from '../components/table/Table';
import { useNavigate } from 'react-router';
import useCopmanys from '../context/companysState/CompanysContext';

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
    hebrew: 'טלפון',
    kay: 'phone'
  },
  {
    hebrew: 'אמייל',
    kay: 'email'
  },
  {
    hebrew: 'כתובת',
    kay: 'address'
  }
];

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const RenderOrderBody = (item, index, navigate) => (
  <tr
    key={index}
    onClick={() =>
      navigate(
        item.token ? `/companys/edit/${item.token}` : `/companys/newCompany`
      )
    }
  >
    <td className="td-name-link">{item.name}</td>
    <td>
      <input
        type="checkbox"
        id="switch-switch"
        className="switch-active"
        checked={item.isActive}
        readOnly={true}
      />
      <label className="switch-label-active" htmlFor="switch-switch"></label>
    </td>
    <td>{item.phone}</td>
    <td>{item.email}</td>
    <td>{item.address}</td>
  </tr>
);

function Companys() {
  const { companys } = useCopmanys();

  let navigate = useNavigate();

  return (
    <div className="Companys">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body forms">
              <h2 className="page-header">הוסף וערוך חברות</h2>
              <Table
                search={true}
                topBtn={{
                  clicked: '/companys/newCompany',
                  txt: 'BiCommentAdd',
                  link: true
                }}
                headData={latestHeader}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={companys || []}
                renderBody={(item, index) =>
                  RenderOrderBody(item, index, navigate)
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

export default Companys;
