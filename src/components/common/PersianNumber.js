import React from 'react'

function PersianNumber(props) {
    let en_number = props.number.toString();
    let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    let persianMap = persianDigits.split("");
    let persian_number = en_number.replace(/\d/g, function (m) {
      return persianMap[parseInt(m)];
    });

 return (
     <span>{persian_number}</span>
 )
}

export default PersianNumber