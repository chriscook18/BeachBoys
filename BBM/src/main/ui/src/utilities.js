
// function getArtistName(artist) {

//     var sName;

//     if (artist.isGroup) {
//         sName = artist.groupName;
//     } else {
//         sName = artist.firstName + " " + artist.surname;
//     }

//     return sName;
// }

// function capitaliseFirstLetter(string) {
//     return string[0].toUpperCase() + string.slice(1);

// }

// function createDate(year, month, day) {
//     var dateString = "";

//     const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
//     ];

//     switch (true) {
//         case year === 0:
//             dateString = "Unknown";
//             break;

//         case month === 0:
//             dateString = String(year);
//             break;

//         case day === undefined ||  day === 0:
//             dateString =monthNames[month-1] + " " + String(year);
//             break;

//         default:
//             dateString =  String(day) + " " + monthNames[month-1] + " " + String(year);
//     }
    
//     return dateString;

// }

// function formatDateRangeSession(session) {
//     return formatDateRange(session.yearstart, session.monthstart, session.daystart, session.yearend, session.monthend, session.dayend);
// }

// function formatDateRange(startYear, startMonth, startDay, endYear, endMonth, endDay) {

//     var sReturn;

//     //Check whether separate dates or not
//     if (startYear===endYear & startMonth === endMonth && startDay===endDay) {
//         sReturn = createDate(startYear, startMonth, startDay);
//     } else {
//         sReturn = createDate(startYear, startMonth, startDay) + " - " + createDate(endYear, endMonth, endDay);
//     }

//     return sReturn;
// }


// export { getArtistName  };
// export { capitaliseFirstLetter };
// export { createDate};
// export { formatDateRangeSession };
