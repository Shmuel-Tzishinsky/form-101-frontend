function newJson(data) {
  const allChilren = [];

  for (let d = 0; d < data.length; d++) {
    let {
      header,
      employerData,
      employeeDetails,
      children,
      partner,
      taxExemptionOrCredit,
      taxCoordination,
      date
    } = data[d];

    partner = partner ? partner : {};
    taxExemptionOrCredit = taxExemptionOrCredit ? taxExemptionOrCredit : {};
    taxCoordination = taxCoordination ? taxCoordination : {};

    for (let child = 0; child < children.length; child++) {
      const childObj = {
        'תאריך מילוי הטופס': new Date(date)
          .toLocaleString()
          .replace(/[.]/g, '/'),
        חברה: employerData?.name,
        'שנת המס': header.taxYear || '-',
        'שם העובד': employeeDetails.firstName || '-',
        'משפחת העובד': employeeDetails.lastName || '-',
        'ת"ז העובד':
          employeeDetails.idBy === 'id'
            ? employeeDetails['id-employee'] || '-'
            : '-',
        'דרכון העובד':
          employeeDetails.idBy === 'passport'
            ? employeeDetails['id-employee'] || '-'
            : '-',
        'ילד - שם': children[child]
          ? children[child]
            ? children[child].name
            : ''
          : '-',
        'ילד -ת"ז': children[child]
          ? children[child]
            ? children[child]['id-employee']
            : '-'
          : '-',
        'ילד -ת"ל': children[child]
          ? children[child]['date-day']
            ? `${plusZiro(children[child]['date-day'])}/${plusZiro(
                children[child]['date-month']
              )}/${children[child]['date-year']}`
            : ''
          : '-',
        'ילד - בחזקתך': children[child]
          ? children[child]
            ? children[child].myKidPossession === true
              ? 'כן'
              : 'לא'
            : '-'
          : '-',
        'ילד - מקבל בגינו קיצבה': children[child]
          ? children[child]
            ? children[child].kidsPension === true
              ? 'כן'
              : 'לא'
            : '-'
          : '-'
      };
      allChilren.push(childObj);
    }
  }

  return allChilren;
}

// return normal dete
function plusZiro(num) {
  let n = parseFloat(num);
  if (n <= 9) {
    return `0${n}`;
  } else {
    return n;
  }
}

export default newJson;
