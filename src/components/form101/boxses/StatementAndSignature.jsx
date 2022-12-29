import React, { useState, useEffect } from 'react';
import { FcSignature } from 'react-icons/fc';
import { BsEraser } from 'react-icons/bs';

import SignatureCanvas from 'react-signature-canvas';
import { axiosInstance, baseURL } from '../../config';

function StatementAndSignature({
  allData,
  sigPad,
  setSigPad,
  setAllData,
  setLoading
}) {
  const [widthUpd, setWindowWidth] = useState(0);

  useEffect(() => {
    function updateWidth() {
      const width = document.querySelector('.wrapperCanvas').offsetWidth;
      if (width <= 440) {
        setAllData((values) => ({
          ...values,
          statementAndSignature: {}
        }));
        sigPad.clear();
        setWindowWidth(width);
      }
    }
    if (Object.keys(sigPad).length !== 0) {
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => {
        window.removeEventListener('resize', updateWidth);
      };
    }
  }, [sigPad, setWindowWidth, setAllData]);

  const clear = () => {
    setAllData((values) => ({
      ...values,
      statementAndSignature: {
        wrapperCanvas: null,
        error: true
      }
    }));
    sigPad.clear();
  };

  const createLoadPdf = async () => {
    allData.statementAndSignature.wrapperCanvas = sigPad
      .getTrimmedCanvas()
      .toDataURL('image/png');
    setLoading(true);
    send();
  };

  const send = async () => {
    try {
      const emptyCanvas =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC';

      const IF_THE_USER_SIGNED =
        allData.statementAndSignature.wrapperCanvas &&
        allData.statementAndSignature.wrapperCanvas &&
        allData.statementAndSignature.wrapperCanvas !== emptyCanvas &&
        allData.statementAndSignature?.wrapperCanvas !== null;

      let createImgFromSignature;

      if (IF_THE_USER_SIGNED) {
        createImgFromSignature = await axiosInstance.post(
          'api/form101/create-img-from-signature',
          allData
        );
      }

      const options = IF_THE_USER_SIGNED
        ? {
            ...createImgFromSignature.data,
            statementAndSignature: `${baseURL}${createImgFromSignature.data?.statementAndSignature}`
          }
        : allData;

      const createPdf = await axiosInstance.post(
        'api/form101/create-pdf',
        options
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

      // delte signature
      IF_THE_USER_SIGNED &&
        (await axiosInstance.post('api/form101/deleteFile', {
          path: createImgFromSignature.data.statementAndSignature
        }));
    } catch (error) {
      setLoading(false);
      alert('שגיאה כלשהי מנעה את עיבוד הנתונים , אנא נסה שוב מאוחר יותר');
    }
  };

  const saveInState = () => {
    setAllData((values) => ({
      ...values,
      statementAndSignature: {
        wrapperCanvas: sigPad.getTrimmedCanvas().toDataURL('image/png'),
        error: false
      }
    }));
  };

  return (
    // <!-- י. הצהרה -->
    <div className="myContainer">
      <h4>י. הצהרה</h4>
      <div className="panel-default m-t1 m-b1">
        <label>
          <input type="checkbox" required />
          <span style={{ color: 'red' }}>*</span>אני מצהיר/ה כי הפרטים שמסרתי
          בטופס זה הינם מלאים ונכונים. ידוע לי שהשמטה או מסירת פרטים לא נכונים
          הינה עבירה על פקודת מס הכנסה.
          <br />
          אני מתחייב/ת להודיע למעביד על כל שינוי שיחול בפרטיי האישיים ובפרטים
          דלעיל תוך שבוע ימים מתאריך השינוי.
        </label>
      </div>

      <div className="line-form"></div>

      <div className="panel-default">
        <div className="label">
          <span> * </span>חתימת המבקש
        </div>
        <div className="wrapperSign">
          <div className="wrapperCanvas">
            <SignatureCanvas
              penColor="rgb(63,63,255)"
              canvasProps={{
                width: widthUpd === 0 ? 400 : widthUpd,
                height: 140,
                className: 'signaturePad',
                id: 'signaturePad'
              }}
              ref={(ref) => {
                if (ref !== null) setSigPad(ref);
              }}
              onEnd={saveInState}
            />

            <div className="inon-signature">
              <FcSignature />
            </div>
          </div>
          <div className="signDescription">
            <p>
              <span className="requiredFields">* </span>ניתן לחתום בעזרת העכבר
              או עם האצבע על מסך מגע
            </p>
          </div>
          <h5
            id="signature-error"
            className="error"
            style={{
              width: 'auto',
              textAlign: 'center',
              margin: '0',
              display: allData.statementAndSignature.error ? 'block' : 'none'
            }}
          >
            חובה לחתום על הטופס
          </h5>
          <button
            id="clear"
            type="button"
            className="clearCanvas"
            onClick={clear}
          >
            <span> נקה </span> <BsEraser />
          </button>
        </div>
      </div>

      <div className="line-form"></div>

      <div className="buttons-finished">
        <div className="preview" onClick={createLoadPdf}>
          תצוגה מקדימה (PDF)
        </div>
        <button id="save">סיום</button>
      </div>
    </div>
  );
}

export default StatementAndSignature;
