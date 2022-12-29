import React from 'react';
import { BiLayerPlus, BiLayerMinus } from 'react-icons/bi';
import { AiFillFilter, AiOutlineFilter } from 'react-icons/ai';
import { NoData } from '../table/Table';

function DataTable({
  data,
  allSelect,
  setAllSelecteds,
  selectedUser,
  filterColumns,
  setFilterColumns,
  addUserToDownload,
  showPdf
}) {
  return (
    <>
      {!data.length ? (
        <NoData />
      ) : (
        <table cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <SelectForm {...{ allSelect, setAllSelecteds }} />
              {['שם', ' נוצר ב', 'טלפון', 'תושב'].map((item, key) => (
                <th key={key} className="active-th">
                  <div onClick={() => setFilterColumns(item)}>
                    {item}
                    {filterColumns === item ? (
                      <AiFillFilter />
                    ) : (
                      <AiOutlineFilter />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, k) => (
              <tr key={k}>
                <TdSelect
                  selectedUser={selectedUser}
                  row={row}
                  addUserToDownload={addUserToDownload}
                />
                <td>
                  <div className="show-pdf" onClick={() => showPdf(row)}>
                    {row['שם']}
                  </div>
                </td>
                <td>{row['נוצר ב']}</td>
                <td>{row['טלפון']}</td>
                <td>{row['תושב']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default DataTable;

const TdSelect = ({ selectedUser, row, addUserToDownload }) => (
  <td
    onClick={() => {
      addUserToDownload(row);
    }}
  >
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox-form-101"
        checked={
          selectedUser.find((user) => user._id === row.id) ? true : false
        }
        readOnly
      />
      <span className="overlay">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    </label>
  </td>
);

const SelectForm = ({ allSelect, setAllSelecteds }) => (
  <th className="active-th" onClick={setAllSelecteds}>
    <div>
      בחר
      {allSelect ? <BiLayerMinus /> : <BiLayerPlus />}
    </div>
  </th>
);
