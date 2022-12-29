import { useState, useEffect, useRef } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { axiosInstance, baseURL } from '../../config';

function Files({ allData, setAllData, nameObj, required }) {
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState();
  const [baseurl, setbaseurl] = useState();
  const [img, setimg] = useState(false);

  const imgRef = useRef();

  useEffect(() => {
    async function loadFile() {
      if (name) {
        const idxDot = name.lastIndexOf('.') + 1;
        const extFile = name.substr(idxDot, name.length).toLowerCase();
        if (
          extFile === 'jpg' ||
          extFile === 'jpeg' ||
          extFile === 'png' ||
          extFile === 'pdf'
        ) {
          setProgress(10);
          const data = new FormData();
          setProgress(20);
          data.append('file', file);

          setProgress(30);

          const res = await axiosInstance.post('api/form101/upload', data);

          setProgress(60);

          setAllData((values) => ({
            ...values,
            files: {
              ...values.files,
              [nameObj]: {
                filename: nameObj.replace(/_/g, ' '),
                path: res.data.uploaded.path,
                contentType: file.type
              }
            }
          }));
          setbaseurl({
            fullUrl: `${baseURL}${res.data.uploaded.path}`,
            path: res.data.uploaded.path
          });

          setProgress(80);

          setError(false);

          setProgress(100);
        } else {
          setFile();
          setProgress();
          setbaseurl();
          setName(false);
          setError(true);
        }
      }

      setTimeout(() => {
        setProgress(false);
      }, 500);
    }

    loadFile();
  }, [name]);

  useEffect(() => {
    let body = document.querySelector('body');
    img ? (body.style.overflow = 'hidden') : (body.style.overflow = 'auto');
  }, [img]);

  async function deleteFile() {
    if (allData.files[nameObj]) {
      delete allData.files[nameObj];
      setAllData({ ...allData });
    }
    try {
      const res = await axiosInstance.post('api/form101/deleteFile', {
        path: baseurl.path
      });

      setimg(false);
      setbaseurl();
      setProgress();
      setError(false);
      setFile();
      setName();
    } catch (error) {
      alert('בעיה לא צפויה מנעה את מחיקה הקובץ');
    }
  }

  function showElement(file, baseurl) {
    const idxDot = file?.name.lastIndexOf('.') + 1;
    const extFile = file?.name.substr(idxDot, file?.name.length).toLowerCase();
    if (extFile === 'pdf') {
      return <iframe src={baseurl} ref={imgRef} />;
    } else {
      return <img src={baseurl} alt="" ref={imgRef} />;
    }
  }

  return (
    <div style={styles}>
      <div className="custom-file uploaded-area ">
        <input
          type="file"
          multiple={false}
          accept=".png, .jpg, .jpeg, .pdf"
          aria-invalid="false"
          name={nameObj}
          required={required}
          onChange={(ev) => {
            const file = ev.target.files[0];
            setName(file?.name || false);
            setFile(file);
          }}
        />
        <label className="custom-file-label " htmlFor="idNumberFile">
          <div className="custom-file-name">{name ? name : 'בחר קובץ'}</div>

          <div className="custom-file-icon">
            <FaCloudUploadAlt />
          </div>
        </label>
        {progress && (
          <div className="row upload">
            <div>
              <i className="fas fa-file-alt"></i>
            </div>
            <div className="content-file">
              <div className="details">
                <div className="name">
                  <div>{file?.name} </div>
                </div>
                <div className="percent">{progress}%</div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {!progress && file && (
          <div className="row finish-upload">
            <div className="content-upload">
              <div>
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="details">
                <div onClick={() => setimg(true)} className="name">
                  {file?.name}
                </div>
                <div className="size">{humanFileSize(file.size)}</div>
              </div>
              <div className="delete" onClick={deleteFile}>
                <RiDeleteBin6Line />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="error">
            ניתן לצרף קבצים מהסוגים הבאים: png, jpg, jpeg, pdf
          </div>
        )}
        {baseurl && img && (
          <div className="img">
            <div className="content-file">
              <div className="x" onClick={() => setimg(false)}>
                x
              </div>
              {showElement(file, baseurl.fullUrl)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Files;

function humanFileSize(size) {
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  display: 'flex',
  width: '100%',
  maxWidth: '330px'
};
