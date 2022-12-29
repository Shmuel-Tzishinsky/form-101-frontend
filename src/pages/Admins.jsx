import Table from "../components/table/Table";
import { useNavigate } from "react-router";
import { useContext } from "react";

import { UserContext } from "../context/userState/userContext";

const latestHeader = [
  {
    hebrew: "שם",
    kay: "name",
  },
  {
    hebrew: "סטטוס",
    kay: "isActive",
  },
  {
    hebrew: "תפקיד",
    kay: "role",
  },
  {
    hebrew: "אמייל",
    kay: "email",
  },
  {
    hebrew: "הצטרף",
    kay: "date",
  },
];

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const ArrayRole = {
  member: "חבר",
  staff: "צוות",
};

const RenderOrderBody = (item, index, navigate) => (
  <tr key={index} onClick={() => navigate(`/edit-admin/${item._id}`)}>
    <td className="td-name-link">{item.name}</td>
    <td>
      <input type="checkbox" id="switch-switch" className="switch-active" checked={item.isActive} readOnly={true} />
      <label className="switch-label-active" htmlFor="switch-switch"></label>
    </td>
    <td>{ArrayRole[item.role]}</td>
    <td>{item.email}</td>
    <td>{new Date(item.date).toLocaleDateString().replaceAll(".", "/")}</td>
  </tr>
);

function Admins() {
  const { state } = useContext(UserContext);
  const { users } = state;

  let navigate = useNavigate();

  return (
    <div className="Admins">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body forms">
              <h2 className="page-header">מנהלים</h2>
              <Table
                search={true}
                topBtn={{
                  clicked: "/add-new-user",
                  txt: "BiCommentAdd",
                  link: true,
                }}
                headData={latestHeader}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={users || []}
                renderBody={(item, index) => RenderOrderBody(item, index, navigate)}
              />
              <div className="back" onClick={() => navigate("/")}>
                חזור
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admins;
