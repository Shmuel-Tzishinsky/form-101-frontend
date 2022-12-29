import React from "react";

function EmployerData({ data }) {
  const inputs = [
    {
      id: 1,
      name: "nameEmployer",
      type: "text",
      placeholder: "שם",
      label: "שם",
      value: data.name,
      required: true,
      readOnly: true,
    },
    {
      id: 2,
      name: "addressEmployer",
      type: "text",
      placeholder: "כתובת",
      label: "כתובת",
      value: data.address,
      required: true,
      readOnly: true,
    },
    {
      id: 3,
      name: "phoneEmployer",
      type: "text",
      placeholder: "טלפון",
      label: "טלפון",
      value: data.phone,
      required: true,
      readOnly: true,
    },
    {
      id: 4,
      name: "deductionFileIdEmployer",
      type: "text",
      placeholder: "מספר תיק ניכויים",
      label: "מספר תיק ניכויים",
      value: data.deductionsPortfolio,
      required: true,
      readOnly: true,
    },
  ];

  return (
    <div className="myContainer">
      <h4>א. פרטי המעביד</h4>

      <div className="flex flex-evenly">
        {inputs.map((e) => (
          <div key={e.id} className="inputHolder">
            <label>
              <div className="label">{e.label}</div>
              <input {...e} />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployerData;
