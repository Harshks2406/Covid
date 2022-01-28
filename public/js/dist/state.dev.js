"use strict";

var state_list = [{
  name: 'Andaman and Nicobar Island',
  code: 'AN'
}, {
  name: 'Andhra Pradesh',
  code: 'AP'
}, {
  name: 'Arunanchal Pradesh',
  code: 'AR'
}, {
  name: 'Assam',
  code: 'AS'
}, {
  name: 'Bihar',
  code: 'BR'
}, {
  name: 'Chandigarh',
  code: 'CH'
}, {
  name: 'Chhattisgarh',
  code: 'CT'
}, {
  name: 'Daman and Diu',
  code: 'DD'
}, {
  name: 'Delhi',
  code: 'DL'
}, {
  name: 'Goa',
  code: 'GA'
}, {
  name: 'Gujarat',
  code: 'GJ'
}, {
  name: 'Haryana',
  code: 'HR'
}, {
  name: 'Himachal Pradesh',
  code: 'HP'
}, {
  name: 'Jammu and Kashmir',
  code: 'JK'
}, {
  name: 'Jharkhnad',
  code: 'JH'
}, {
  name: 'Karnatka',
  code: 'KA'
}, {
  name: 'Kerala',
  code: 'KL'
}, {
  name: 'Lakshadweep',
  code: 'LD'
}, {
  name: 'Madhya Pradesh',
  code: 'MP'
}, {
  name: 'Maharashtra',
  code: 'MH'
}, {
  name: 'Manipur',
  code: 'MN'
}, {
  name: 'Meghalaya',
  code: 'ML'
}, {
  name: 'Mizoram',
  code: 'MZ'
}, {
  name: 'Nagaland',
  code: 'NL'
}, {
  name: 'Odisha',
  code: 'OR'
}, {
  name: 'Puducherry',
  code: 'PY'
}, {
  name: 'Punjab',
  code: 'PB'
}, {
  name: 'Rajashthan',
  code: 'RJ'
}, {
  name: 'Sikkim',
  code: 'SK'
}, {
  name: 'Tamil Nadu',
  code: 'TN'
}, {
  name: 'Telangana',
  code: 'TG'
}, {
  name: 'Tripura',
  code: 'TR'
}, {
  name: 'Uttar Pradesh',
  code: 'UP'
}, {
  name: 'Uttarakhand',
  code: 'UK'
}, {
  name: 'West Bengal',
  code: 'WB'
}];
var search_state_element = document.querySelector(".search-state");
var state_list_element = document.querySelector(".state-list");
var chang_state_btn = document.querySelector(".change-state");
var close_list_btn = document.querySelector(".close");
var input = document.getElementById("search-input");

function createstateList() {
  var num_countries = state_list.length;
  var i = 0,
      ul_list_id;
  state_list.forEach(function (state, index) {
    if (index % Math.ceil(num_countries / num_of_ul_lists) == 0) {
      ul_list_id = "list-".concat(i);
      state_list_element.innerHTML += "<ul id='".concat(ul_list_id, "'></ul> ");
      i++;
    }

    document.getElementById("".concat(ul_list_id)).innerHTML += "\n        <li onclick= \"getInfo('".concat(state.code, "')\" id=\"").concat(state.name, "\">\n        ").concat(state.name, "\n        </li>\n        ");
  });
}

var num_of_ul_lists = 3;
createstateList();
chang_state_btn.addEventListener("click", function () {
  input.value = "";
  resetstate();
  search_state_element.classList.toggle("hide");
  search_state_element.classList.toggle("fadeIn");
});
close_list_btn.addEventListener("click", function () {
  search_state_element.classList.toggle("hide");
});
state_list_element.addEventListener("click", function () {
  search_state_element.classList.toggle("hide");
});
input.addEventListener("input", function () {
  var value = input.value.toUpperCase();
  state_list.forEach(function (state) {
    if (state.name.toUpperCase().startsWith(value)) {
      document.getElementById(state.name).classList.remove("hide");
    } else {
      document.getElementById(state.name).classList.add("hide");
    }
  });
});

function resetstate() {
  state_list.forEach(function (state) {
    document.getElementById(state.name).classList.remove("hide");
  });
}