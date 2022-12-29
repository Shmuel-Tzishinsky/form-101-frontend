import React, { useState, useEffect } from 'react';
import { BiCommentAdd } from 'react-icons/bi';

import { Link } from 'react-router-dom';

import './table.css';

export const NoData = () => (
  <div className="no-data">
    <div>
      <svg viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
        <metadata></metadata>
        <g>
          <path d="M507.2,800c-100.1,0-200.2,0-300.3,0c-25.3,0-25.9-0.7-25.9-26.6c0-71.3-0.3-142.7,0.3-214c0.1-11.6,2.5-24,7.1-34.6c31.6-71.9,64.3-143.2,96-215c6-13.5,13.9-18.5,28.7-18.4c131.9,0.5,263.7,0.5,395.6,0c15.1-0.1,22.5,5.7,28,19.2c29.7,72,60.3,143.6,90.1,215.6c3.8,9.1,6.1,19.6,6.2,29.4c0.5,73.7,0.3,147.5,0.3,221.2c0,21.7-1.5,23.2-23.9,23.2C708.6,800,607.9,800,507.2,800z M506.6,788.3c98.3,0,196.6-0.2,294.9,0.2c13.9,0.1,20.6-3.1,20.4-18.8c-0.7-66.5-0.6-133.1-0.1-199.6c0.1-14-4.5-18.9-18.6-18.7c-46.1,0.6-92.3,1.2-138.4-0.3c-19.4-0.6-26.6,5.2-30,24.7c-11.5,67.9-77.9,113.6-145.8,102.4c-55.8-9.2-97.3-49.2-106.5-104.9c-2.8-16.9-9.2-22.6-26.7-22.2c-47.3,1.3-94.7,1-142,0.1c-16.4-0.3-21.7,4.9-21.5,21.4c0.8,64.1,0.9,128.3,0,192.4c-0.3,17.8,4.6,23.8,23.1,23.6C312.4,787.9,409.5,788.3,506.6,788.3z M282.1,540c31.9,0,58.2,0.8,84.4-0.3c17.4-0.7,23.9,4.7,24.8,23.2c2.7,59.2,55.7,106.5,117,106.6c62.5,0.1,115.8-47,118.3-107c0.8-19.1,8.4-23.3,25.3-22.7c26.1,0.9,52.3,0.2,82.7,0.2c-8.7-27.7-15.8-51.6-24.3-75c-1.3-3.6-9.6-6.6-14.7-6.6c-124-0.4-248-0.4-372.1,0.1c-5.4,0-14,3.8-15.7,8C298.8,489,291.5,512.3,282.1,540z M508.3,446.4c61.2,0,122.4-0.2,183.5,0.2c12.6,0.1,18.7-3.2,18.4-17.1c-0.7-36.6-0.6-73.2,0-109.8c0.2-12.7-5-16.5-17.1-16.5c-123,0.3-245.9,0.3-368.9,0c-12.7,0-16.7,5-16.5,17.1c0.5,35.4,0.9,70.8-0.2,106.2c-0.5,16.2,5.5,20.5,20.9,20.3C388.3,446,448.3,446.4,508.3,446.4z M821.9,539.7c-32.6-77.7-63.6-151.5-94.5-225.2c-1.5,0.3-3.1,0.6-4.6,0.9c-0.4,5.7-1,11.3-1,17c-0.1,26.3,1.5,52.8-0.4,79c-2.8,39.2,5.8,76.1,18.8,112.3c2.2,6.2,8.7,14.9,13.8,15.4C774.5,540.7,795.4,539.7,821.9,539.7z M192.2,540c24.6,0,43.6-0.8,62.5,0.3c13.4,0.7,18.9-5.3,22.9-17.2c12.6-37.1,21.7-74.3,18.8-114.1c-1.7-23.2-0.2-46.7-0.4-70c0-4.9-1-9.9-1.5-14.8c-1.6-0.3-3.2-0.7-4.9-1.1C257.9,394,226,464.8,192.2,540z" />
          <path d="M551.7,875.4c29.5,2.3,57.4,6.6,85.2,5.8c17.9-0.5,36.3-6.6,53.1-13.5c11.4-4.7,15.9-3.9,22.8,6.3c12.3,18.2,25.6,36.3,41.1,51.8c24.2,24.1,54.5,36.3,89.7,36.8c-30.5,15.6-62.8,24.9-96.6,27.4c-6.6,0.5-15.8-6.1-20.4-12c-7.6-9.9-15.4-11-26.4-8.2c-12.7,3.1-25.8,5.6-38.8,6.5c-6.6,0.5-14.1-2-20.2-5.2C600.5,949.6,573.2,915.5,551.7,875.4z M799.9,970.8c-3.9-4.8-4.8-6.8-6.1-7.4c-37.9-16-64.9-43.9-87-77.6c-2.6-3.9-12.5-6.8-17.1-5.1c-29.7,11.5-59.8,16.2-91.4,10.3c-7.3-1.4-14.8-1.3-23.6-1.9c24.4,43.9,64,91.8,126.3,70.7c13.1-4.4,22.3-1.2,31.6,9.3c5,5.6,15,9.8,22.5,9.5C769.1,978.1,783,973.9,799.9,970.8z" />
          <path d="M910.1,10c23.5,69.5,23,172.3-77,204.4c0-1.8-0.6-3.7,0.1-4.7c30.4-40.2,38.9-86.6,37.8-135.4c-0.3-12.9,2-22.1,12.5-31C893.7,34.7,900.6,22.3,910.1,10z M860.4,186.1c46.8-11.6,63.8-108.4,41.9-149.1c-7.8,11.1-20.4,20.9-20.6,31C880.9,107.7,876.9,146.5,860.4,186.1z" />
          <path d="M154.5,376.6c-3.8,10.6-8.1,22.7-12.4,34.8c-31.3-6.4-54.2-31-65-70.7c12.3,9.3,22.6,20.1,35.2,25.9C124.8,372.4,139.5,373.3,154.5,376.6z" />
          <path d="M719.3,160c12.6,22.7,6,55.3-16.1,80.3c-1.4-8.9-4.5-15.6-3-21.1c2.7-9.7,9-18.3,12.2-27.9C715.6,182.1,716.7,172.2,719.3,160z" />
        </g>
      </svg>
    </div>
    <h4>אין מידע</h4>
  </div>
);

const Search = ({
  searchtableFunc,
  filter,
  setFilter,
  headData,
  dataShow,
  topBtn
}) => (
  <div className="table__search__container">
    <div className="table__search">
      <input
        type="text"
        placeholder={filter === 'isActive' ? 'הקלד t או f...' : 'חפש כאן...'}
        onInput={searchtableFunc}
      />

      <i className="bx bx-search"></i>

      <select onChange={(e) => setFilter(e.target.value)}>
        {headData.map((item, i) => (
          <option value={item.key} key={i}>
            {item.hebrew}
          </option>
        ))}
      </select>
    </div>
    {topBtn &&
      (topBtn.link ? (
        <Link to={topBtn.clicked} className="link__top">
          <BiCommentAdd />
        </Link>
      ) : (
        <div className="link__top" onClick={() => topBtn?.clicked()}>
          {topBtn.txt}
        </div>
      ))}
  </div>
);

export const TableContact = ({
  headData,
  renderHead,
  dataShow,
  renderBody
}) => (
  <table>
    {headData && renderHead && (
      <thead>
        <tr>{headData.map((item, index) => renderHead(item.hebrew, index))}</tr>
      </thead>
    )}
    {headData && renderHead && (
      <tbody>{dataShow.map((item, index) => renderBody(item, index))}</tbody>
    )}
  </table>
);

export const TablePagination = ({ bodyData, limit, setDataShow }) => {
  const [currPage, setCurrPage] = useState(0);

  let pages = 1;

  let range = [];

  if (limit !== undefined) {
    let page = Math.floor(bodyData.length / Number(limit));
    pages = bodyData.length % Number(limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const selectPage = (page) => {
    const start = Number(limit) * page;
    const end = start + Number(limit);

    setDataShow(bodyData.slice(start, end));

    setCurrPage(page);
  };

  return pages > 1 ? (
    <div className="table__pagination">
      {range.map((item, index) => (
        <div
          key={index}
          className={`table__pagination-item ${
            currPage === index ? 'active' : ''
          }`}
          onClick={() => selectPage(index)}
        >
          {item + 1}
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};

const Table = ({
  limit,
  bodyData,
  renderBody,
  renderHead,
  headData,
  search,
  topBtn
}) => {
  const [filter, setFilterState] = useState(headData && headData[0].kay);
  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    const initDataShow =
      limit && bodyData ? bodyData.slice(0, Number(limit)) : bodyData;
    setDataShow(initDataShow);
  }, [limit, bodyData]);

  const setFilter = (e) => {
    const index = headData.findIndex((el) => el.hebrew === e);
    const filtBy = headData[index].kay;
    setFilterState(filtBy);

    let filt = bodyData.sort((a, b) => {
      let x = (a[filtBy] + '').toLowerCase();
      let y = (b[filtBy] + '').toLowerCase();

      return x < y ? -1 : x > y ? 1 : 0;
    });

    setDataShow(limit && filt ? filt.slice(0, Number(limit)) : filt);
  };

  const searchtableFunc = (e) => {
    let data = bodyData;

    let y = data.filter((c) => {
      return (c[filter] + '')
        .toLowerCase()
        .includes(e.target.value?.toLowerCase());
    });

    setDataShow(limit && y ? y.slice(0, Number(limit)) : y);
  };

  return (
    <div>
      {search && (
        <Search
          {...{
            searchtableFunc,
            filter,
            setFilter,
            headData,
            dataShow,
            topBtn
          }}
        />
      )}

      <div className="table-wrapper">
        <TableContact {...{ headData, renderHead, dataShow, renderBody }} />

        {dataShow.length === 0 && <NoData />}
      </div>

      <TablePagination {...{ bodyData, limit, setDataShow }} />
    </div>
  );
};

export default Table;
