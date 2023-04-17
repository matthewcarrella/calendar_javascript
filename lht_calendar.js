"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Tutorial Case

   Author: Matt
   Date: 4/10/23

   Filename:   lht_calendar.js  

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the weekday title rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate
	
*/

// Set the date displayed in the calendar

let thisDay = new Date();

// Write the calendar table to the element with the id of "calendar"

document.getElementById("calendar").innerHTML = createCalendar(thisDay);

// Definition of the function that generates the calendar table
function createCalendar(calDate) {
   let calendarHTML = "<table id='calendar_table'>";
   calendarHTML += calCaption(calDate);
   calendarHTML += calWeekdayRow();
   calendarHTML += calDays(calDate);
   calendarHTML += "</table>";
   // return statement that hands data off to the script
   return calendarHTML;

} // end of createCalendar()

// Definition of the function to write the calendar caption
function calCaption(calDate) {
   // monthNames array contains the list of month names
   let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   // Determine the numeric value of the current month
   let thisMonth = calDate.getMonth();
   let thisYear = calDate.getFullYear();
   // use this variables to write the table caption
   return "<caption>" + monthNames[thisMonth] +  " " + thisYear + "</caption>";
}

// Definition of a function to write a table row with the weekday abbreviations
function calWeekdayRow() {
   // Array of weekday abbreviations
   let dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
   let rowHTML = "<tr>";
   // Loop through the dayName array
   for (let i=0; i<dayName.length; i++) {
      rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";

   } // end of for loop
   rowHTML += "</tr>";
   // send the rowHTML data that this function built back to the rest of the script
   return rowHTML;
} // end of the calWeekdayRow() function

function daysInMonth(calDate) {

   // Array of days in each month

   let dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

   let thisYear = calDate.getFullYear();
   let thisMonth = calDate.getMonth();

   // Revise the days in February for leap years
   if (thisYear % 4 === 0) {
      if((thisYear%100 != 0) || (thisYear % 400 === 0)) {
         dayCount[1] = 29;
      }
      
   }

   console.log(dayCount[1]);

   return dayCount[thisMonth];

} // End of the daysInMonth() function

// Definition of the function to write the table rows for each day in the month
function calDays(calDate) {
   // Determine the starting day of the month
      let day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
      let weekDay = day.getDay();
   // Write blank cells preceding the starting day
      let htmlCode = "<tr>";
      for (let i=0; i<weekDay; i++) {
         htmlCode += "<td></td>";
      }



   // Write cells for each actual day in the month  

       let totalDays = daysInMonth(calDate);
       let highlightDay = calDate.getDate();

      for (let i=1;i<=totalDays;i++) {
         day.setDate(i);
         weekDay = day.getDay();
         // The loop must decide to end a <tr> when it's Saturday and start a new <tr> when it's Sunday
         if (weekDay===0) {
            htmlCode += "<tr>";
         }
         
         if (i===highlightDay) {
            htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] + "</td>";
         } else {
            htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";
         }

         if (weekDay===6) {
            htmlCode += "</tr>";
         }
      } // end of totalDays loop
      return htmlCode;
} // end of calDays() function