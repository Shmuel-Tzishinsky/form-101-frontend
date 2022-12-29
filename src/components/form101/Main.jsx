import { useParams } from 'react-router';
import { axiosInstance } from '../config';

import { useAsync } from '../../Custom-Hooks/useAsync';
import Form from './Form.jsx';

import './form-page.css';
import Loading from '../loading/Loading';

function Form101online() {
  const { id } = useParams();

  const { status, value } = useAsync(
    async () =>
      await axiosInstance.post('api/companys/get-unique-company', {
        data: id
      })
  );

  return (
    <div className="form-page">
      {status === 'success' ? (
        value?.data?.data === null ? (
          <SHowAlert textError={`לא נמצאו נתונים על החברה`} />
        ) : !value.data?.data?.isActive ? (
          <SHowAlert
            textError={`חברת ${value?.data?.data?.name} אינה פעילה יותר`}
          />
        ) : (
          status === 'success' && <Form data={value.data.data} />
        )
      ) : status === 'error' ? (
        <SHowAlert
          textError={
            'שגיאה בלתי צפויה מנעה את תצוגת הדף, אנא נסה שוב מאוחר יותר'
          }
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Form101online;

const SHowAlert = ({ textError }) => (
  <div
    style={{
      textAlign: 'center',
      marginTop: '2em'
    }}
  >
    <h1
      style={{
        marginBottom: '0.4em'
      }}
    >
      אין אפשרות להציג את הדף המבוקש
    </h1>
    <h3>{textError}</h3>
  </div>
);
