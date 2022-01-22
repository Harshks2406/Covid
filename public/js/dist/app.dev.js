"use strict";

var state_name_element = document.querySelector(".state .name");
var total_cases_element = document.querySelector(".total-cases .value");
var new_cases_element = document.querySelector(".total-cases .new-value");
var recovered_element = document.querySelector(".recovered .value");
var new_recovered_element = document.querySelector(".recovered .new-value");
var death_element = document.querySelector(".deaths .value");
var new_death_element = document.querySelector(".deaths .new-value");
var ctx = document.getElementById("axes_line_chart").getContext("2d");

var getInfo = function getInfo(event) {
  var cases_list, recovered_list, death_lists, dates, response, data, arrData, i;
  return regeneratorRuntime.async(function getInfo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cases_list = [], recovered_list = [], death_lists = [], dates = [];
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("https://covid-india2.p.rapidapi.com/states/abbr/".concat(event), {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "covid-india2.p.rapidapi.com",
              "x-rapidapi-key": "b835dde0b9msh4785ebfde37e455p12ab20jsn17bc47347d1e"
            }
          }));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          console.log(data);
          arrData = [data];
          i = arrData.length;
          state_name_element.innerHTML = arrData[i - i][i].state_name;
          total_cases_element.innerHTML = arrData[i - i][i].positive;
          new_cases_element.innerHTML = "+".concat(arrData[i - i][i].positive_today);
          recovered_element.innerHTML = arrData[i - i][i].recovered;
          new_recovered_element.innerHTML = "+".concat(arrData[i - i][i].recovered_today);
          death_element.innerHTML = arrData[i - i][i].death;
          new_death_element.innerHTML = "+".concat(arrData[i - i][i].death_today);

          for (i in arrData[0]) {
            dates.push(arrData[i - i][i].date.substr(0, 10));
            cases_list.push(arrData[i - i][i].positive);
            recovered_list.push(arrData[i - i][i].recovered);
            death_lists.push(arrData[i - i][i].death);
          }

          for (i in dates, cases_list) {
            [console.log(dates[i], cases_list[i])];
          }

          axesLineChart(cases_list, recovered_list, death_lists, dates);
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](1);
          alert("Something went wrong! Try again later");

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 23]]);
};

var getIndiaData = function getIndiaData() {
  var cases_list, recovered_list, death_lists, dates, response, data, i, result;
  return regeneratorRuntime.async(function getIndiaData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          cases_list = [], recovered_list = [], death_lists = [], dates = [];
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch("https://covid-193.p.rapidapi.com/history?country=India", {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "covid-193.p.rapidapi.com",
              "x-rapidapi-key": "b835dde0b9msh4785ebfde37e455p12ab20jsn17bc47347d1e"
            }
          }));

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context2.sent;
          //total india case
          state_name_element.innerHTML = data.parameters.country;
          total_cases_element.innerHTML = data.response[0].cases.total;
          new_cases_element.innerHTML = "+".concat(data.response[0].cases.total - data.response[3].cases.total);
          recovered_element.innerHTML = data.response[0].cases.recovered;
          new_recovered_element.innerHTML = "+".concat(data.response[0].cases.recovered - data.response[3].cases.recovered);
          death_element.innerHTML = data.response[0].deaths.total;
          new_death_element.innerHTML = "+".concat(data.response[0].deaths.total - data.response[3].deaths.total);

          for (i in data.response) {
            result = data.response[i].time.substr(0, 10);
            dates.push(result);
            cases_list.push(data.response[i].cases.total);
            death_lists.push(data.response[i].deaths.total);
            recovered_list.push(data.response[i].cases.recovered);
          }

          dates.reverse();
          cases_list.reverse();
          recovered_list.reverse();
          death_lists.reverse(); //Creation of chart

          axesLineChart(cases_list, recovered_list, death_lists, dates);
          _context2.next = 27;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          alert("Something went wrong! Try again later");

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 23]]);
};

getIndiaData();
var my_chart;

function axesLineChart(cases_list, recovered_list, death_lists, dates) {
  if (my_chart) {
    my_chart.destroy();
  }

  my_chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: "Total Confirmed Cases",
        data: cases_list,
        fill: false,
        borderColor: '#FFF',
        backgorundColor: '#FFF',
        borderWidth: 0.5
      }, {
        label: "Total Recovered Cases",
        data: recovered_list,
        fill: false,
        borderColor: '#009688',
        backgorundColor: '#009688',
        borderWidth: 0.5
      }, {
        label: "Total Death Cases",
        data: death_lists,
        fill: false,
        borderColor: '#f44336',
        backgorundColor: '#f44336',
        borderWidth: 0.5
      }],
      labels: dates
    },
    options: {
      responsive: true,
      maintainAspectratio: true
    }
  });
}