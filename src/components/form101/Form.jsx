import React, { useState, useEffect } from 'react';
import { axiosInstance, baseURL } from '../config';

import ChangesDuringTheYear from './boxses/ChangesDuringTheYear';
import Children from './boxses/Children';
import EmployeeDetails from './boxses/EmployeeDetails';
import Header from './boxses/Header';
import IncomeFromThisEmployer from './boxses/IncomeFromThisEmployer';
import OtherIncomes from './boxses/OtherIncomes';
import Partner from './boxses/Partner';
import StatementAndSignature from './boxses/StatementAndSignature';
import TaxCoordination from './boxses/TaxCoordination';
import TaxExemptionOrCredit from './boxses/TaxExemptionOrCredit';

import { checkErrors } from './boxses/errors/checkErrors';
import Errors from './boxses/Errors';
import Loading from './components/Loading';
import EmployerData from './boxses/EmployerData';

const Main = ({ data }) => {
  const [statusLoading, setStatusLoading] = useState('');
  const [sigPad, setSigPad] = useState({});
  const [errors, setErrors] = useState([]);
  const [showPage, setShowPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataSend, setDataSend] = useState(false);
  const [allData, setAllData] = useState({
    header: {
      taxYear: new Date().getFullYear()
    },
    employerData: {
      name: data.name,
      phone: data.phone,
      address: data.address,
      email: data.email,
      deductionsPortfolio: data.deductionsPortfolio
    },
    employeeDetails: { idBy: 'id' },
    children: [],
    incomeFromThisEmployer: {},
    otherIncomes: {},
    partner: {},
    taxExemptionOrCredit: {},
    taxCoordination: {
      array: []
    },
    statementAndSignature: {},
    token: data.token
  });

  useEffect(() => {
    let body = document.querySelector('body');
    !showPage || loading
      ? (body.style.overflow = 'hidden')
      : (body.style.overflow = 'auto');
  }, [showPage, loading]);

  async function handleSubmit(e) {
    e.preventDefault();
    let errors = checkErrors(allData, setAllData, sigPad, setSigPad);

    setErrors(errors);

    if (errors.length > 0) {
      setShowPage(false);

      return;
    } else if (errors.length === 0) {
      if (
        allData.statementAndSignature.wrapperCanvas &&
        allData.statementAndSignature.wrapperCanvas !==
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC'
      ) {
        setLoading(true);
        try {
          setStatusLoading('מעבד את החתימה');

          // Creates a signature image and returns a new state with
          //  all existing data + new routing to the image (signature)
          const { data } = await axiosInstance.post(
            'api/form101/create-img-from-signature',
            allData
          );

          setStatusLoading('יוצר קובץ PDF');

          const createPdf = await axiosInstance.post('api/form101/create-pdf', {
            ...data,
            statementAndSignature: `${baseURL}${data.statementAndSignature}`
          });

          setStatusLoading('שולח נתונים במייל');

          const sendToMail = await axiosInstance.post(
            'api/form101/sendToMail',
            { ...data, filename: createPdf.data.filename }
          );
          if (sendToMail) {
          }
          console.log(
            '🚀 ~ file: Form.jsx ~ line 98 ~ handleSubmit ~ sendToMail',
            sendToMail
          );

          setStatusLoading('שומר נתונים');

          const saveInDB = await axiosInstance.post(
            'api/form101/saveFormInDB',
            data
          );

          if (saveInDB.statusText === 'OK') {
            setLoading(false);
            setDataSend(true);
          } else {
            throw new Error('שגיאה בשמירת הנתונים');
          }
        } catch (error) {
          setLoading(false);
          alert(
            `${
              error?.response?.data || 'שגיאה כלשהי מנעה את עיבוד הנתונים'
            }, אנא נסה שוב מאוחר יותר`
          );
        }
        setStatusLoading('טוען');
      } else {
        alert("בעיה מסויימת מנעה את עיבוד החתימה, אנא נסה שוב בעוד מס' שניות");
      }
    }
  }

  return (
    <>
      {/* בדיקה אם הקובץ נשלח בהצלחה */}
      {dataSend ? (
        <div className="sendSuccessfully">
          <div>
            <p>{svg()}</p>
            <h1>הטופס הושלם בהצלחה</h1>
            <p>תודה ולהתראות</p>
          </div>
        </div>
      ) : (
        <>
          <Errors
            errors={errors}
            showPage={showPage}
            setShowPage={setShowPage}
          />
          <form
            onSubmit={handleSubmit}
            className="form-101"
            style={{ filter: loading ? 'blur(7px)' : '' }}
            autoComplete="off"
          >
            <Header {...{ allData, setAllData }} />
            <EmployerData data={data} />
            <EmployeeDetails {...{ allData, setAllData }} />
            <Children {...{ allData, setAllData }} />
            <IncomeFromThisEmployer {...{ allData, setAllData }} />
            <OtherIncomes {...{ allData, setAllData }} />
            <Partner {...{ allData, setAllData }} />
            <ChangesDuringTheYear />
            <TaxExemptionOrCredit {...{ allData, setAllData }} />
            <TaxCoordination {...{ allData, setAllData }} />
            <StatementAndSignature
              {...{
                allData,
                setAllData,
                sigPad,
                setSigPad,
                setLoading
              }}
            />
          </form>
          <Loading loading={loading} statusLoading={statusLoading} />
        </>
      )}
    </>
  );
};

export default Main;

const svg = () => (
  <svg viewBox="0 0 1000 1000">
    <g>
      <path d="M709.2,325L423.4,610.9L290.7,478.1c-11.7-11.7-30.6-11.7-42.3,0c-11.7,11.6-11.7,30.6,0,42.3l150.3,150.2c1,1.4,1.6,3.1,2.8,4.4c6.1,6,14,8.8,21.9,8.6c7.9,0.2,15.9-2.6,21.9-8.6c1.3-1.3,1.9-2.9,2.9-4.4l303.3-303.4c11.7-11.6,11.7-30.6,0-42.3C739.9,313.3,721,313.3,709.2,325z" />
      <path d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,928.7C263.2,928.7,71.3,736.8,71.3,500C71.3,263.2,263.2,71.2,500,71.2c236.8,0,428.8,191.9,428.8,428.7C928.8,736.8,736.8,928.7,500,928.7z" />
    </g>
  </svg>
);
