import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { NoData } from '../table/Table';
import * as XLSX from 'xlsx';

import useCopmanys from '../../context/companysState/CompanysContext';
import { axiosInstance, baseURL } from '../config';
import convartChildren from './convartChildren';
import convartToXlsx from './convartTooXlsx';
import Loading from '../loading/Loading';
import DataTable from './DataTable';
import './companye.css';

function Companie({ bodyData, limit }) {
  const { companys } = useCopmanys();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [selectedUser, setSelectedUsers] = useState([]);
  const [filterColumns, setFilterColumns] = useState('');
  const [searchColunms, setSearchColumns] = useState([
    'שם',
    'נוצר ב',
    'טלפון',
    'תושב'
  ]);

  useEffect(() => {
    setData([]);
    if (bodyData[0]) {
      const rows = [];
      bodyData.forEach((form) => {
        rows.push({
          בחר: !1,
          שם:
            form.employeeDetails.firstName +
            ' ' +
            form.employeeDetails.lastName,
          'נוצר ב': new Date(form.date).toLocaleDateString(),
          טלפון: form.employeeDetails.phone,
          תושב: form.employeeDetails.citi,
          id: form._id,
          token: form.token
        });
      });
      setData(rows);
      setLoading(false);
    } else {
      setLoading(false);
    }
    return () => {
      setData([]);
    };
  }, [bodyData]);

  const showPdf = async (user) => {
    setLoading(true);
    const company = companys.filter((com) => com.token === user.token);
    user = (await bodyData.find((u) => u._id === user.id)) || user;

    if (!user?.statementAndSignature?.includes(baseURL))
      user.statementAndSignature = `${baseURL}${user?.statementAndSignature}`;

    user.employerData = {
      phone: company[0].phone,
      name: company[0].name,
      address: company[0].address,
      deductionsPortfolio: company[0].deductionsPortfolio
    };

    try {
      const createPdf = await axiosInstance.post(
        'api/form101/create-pdf',
        user
      );

      const fetchPdfToBlob = await axiosInstance(
        'api/form101/fetch-pdf-to-blob',
        {
          //Force to receive data in a Blob Format
          method: 'POST',
          responseType: 'blob',
          params: {
            filename: createPdf.data.filename
          }
        }
      );

      //Build a URL from the file
      const file = new Blob([fetchPdfToBlob.data], {
        type: 'application/pdf'
      });

      const fileURL = window.URL.createObjectURL(file);

      // Open the URL on new Window
      window.open(fileURL);
      setLoading(false);

      // Delte pdf
      await axiosInstance.post('api/form101/deleteFile', {
        path: fetchPdfToBlob.config.params.filename
      });
    } catch (error) {
      setLoading(false);
      alert('שגיאה כלשהי מנעה את עיבוד הנתונים , אנא נסה שוב מאוחר יותר');
    }
  };

  function search(data) {
    return data
      ?.filter((row) =>
        searchColunms.some((column) => row[column].indexOf(q) > -1)
      )
      .sort((a, b) =>
        a[filterColumns] < b[filterColumns]
          ? -1
          : a[filterColumns] > b[filterColumns]
          ? 1
          : 0
      );
  }

  const clicked = () => {
    const forms = XLSX.utils.json_to_sheet(convartToXlsx(selectedUser));

    for (const key in forms) {
      if (Object.hasOwnProperty.call(forms, key)) {
        if (
          forms[key].v &&
          forms[key].v !== null &&
          forms[key].v.toString().indexOf('server') === 0
        ) {
          forms[key] = {
            f:
              '=HYPERLINK("' +
              baseURL.replace('3000', '5000') +
              forms[key].v.toString() +
              '","לחץ להצגה")'
          };
        }
      }
    }

    const cildren = XLSX.utils.json_to_sheet(convartChildren(selectedUser));
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, forms, 'טפסים');
    XLSX.utils.book_append_sheet(workbook, cildren, 'ילדים');

    XLSX.writeFile(
      workbook,
      `${selectedUser.length} טפסי חברת ${selectedUser[0].employerData.name}.xlsx`
    );
  };

  const setAllSelecteds = async () => {
    if (bodyData.length === selectedUser.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers([]);
      let newUsers = [];
      for (let i = 0; i < bodyData.length; i++) {
        const company = companys.filter(
          (com) => com.token === bodyData[i].token
        );

        bodyData[i].employerData = {
          name: company[0].name
        };
        newUsers.push(bodyData[i]);
      }
      setSelectedUsers(newUsers);
    }
  };

  const addUserToDownload = (newUser) => {
    const findUser = selectedUser.find((user) => user._id === newUser.id);

    if (findUser) {
      const filterUser = selectedUser.filter((user) => user._id !== newUser.id);

      setSelectedUsers(filterUser);
    } else {
      const company = companys.filter((com) => com.token === newUser.token);
      newUser = bodyData.find((u) => u._id === newUser.id) || newUser;
      newUser.employerData = {
        name: company[0].name
      };

      setSelectedUsers([...selectedUser, newUser]);
    }
  };

  return (
    <div className="eompanie">
      <div className="companie__conatainer">
        <div className="table__search__container">
          <div className="table__search">
            <input
              type="text"
              placeholder="חפש כאן..."
              onInput={(e) => setQ(e.target.value)}
            />

            <i className="bx bx-search"></i>

            <select
              onChange={(e) =>
                setSearchColumns(
                  e.target.value.length === 0
                    ? ['שם', 'נוצר ב', 'טלפון', 'תושב']
                    : [e.target.value]
                )
              }
            >
              {['הכל', 'שם', 'נוצר ב', 'טלפון', 'תושב'].map((item, key) => (
                <option key={key} value={item === 'הכל' ? '' : item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div
            className="link__top icon-download"
            style={{ opacity: selectedUser.length > 0 ? '1' : '0.2' }}
            onClick={() => (selectedUser.length > 0 ? clicked() : '')}
          >
            <FaDownload />
            {selectedUser.length === 0 ? (
              ''
            ) : (
              <div className="num-download">{` ${selectedUser.length} `}</div>
            )}
          </div>
        </div>
        <div className="table-wrapper">
          {!loading ? (
            <DataTable
              data={search(data)}
              allSelect={bodyData.length === selectedUser.length ? !0 : !1}
              {...{ filterColumns, setFilterColumns, selectedUser }}
              setAllSelecteds={setAllSelecteds}
              addUserToDownload={addUserToDownload}
              showPdf={showPdf}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

export default Companie;
