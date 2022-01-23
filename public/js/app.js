let state_name_element = document.querySelector(".state .name");
let total_cases_element = document.querySelector(".total-cases .value");
let new_cases_element = document.querySelector(".total-cases .new-value");
let recovered_element = document.querySelector(".recovered .value");
let new_recovered_element = document.querySelector(".recovered .new-value");
let death_element = document.querySelector(".deaths .value");
let new_death_element = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

const getInfo = async(event) =>{
    let cases_list = [],
    recovered_list = [],
    death_lists = [],
    dates = [];
    try{
        const response = await fetch(`https://covid-india2.p.rapidapi.com/states/abbr/${event}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-india2.p.rapidapi.com",
                "x-rapidapi-key": "b835dde0b9msh4785ebfde37e455p12ab20jsn17bc47347d1e"
            }
    })
    const data = await response.json();
    const arrData = [data]; 
    
    let i=arrData.length
        state_name_element.innerHTML = arrData[i-i][i].state_name;
        total_cases_element.innerHTML = arrData[i-i][i].positive;
        new_cases_element.innerHTML =`+${arrData[i-i][i].positive_today}`;
        recovered_element.innerHTML =arrData[i-i][i].recovered;
        new_recovered_element.innerHTML =`+${arrData[i-i][i].recovered_today}`;
        death_element.innerHTML =arrData[i-i][i].death;
        new_death_element.innerHTML =`+${arrData[i-i][i].death_today}`;
    for( i in arrData[0]){
        dates.push(arrData[i-i][i].date.substr(0,10))
        cases_list.push(arrData[i-i][i].positive)
        recovered_list.push(arrData[i-i][i].recovered)
        death_lists.push(arrData[i-i][i].death)
    }
    axesLineChart(cases_list,recovered_list,death_lists,dates)
    } catch(e) {
        alert("Something went wrong! Try again later")
    }
}

const getIndiaData = async() =>{
    let cases_list = [],
    recovered_list = [],
    death_lists = [],
    dates = [];
    try {
        const response = await fetch("https://covid-193.p.rapidapi.com/history?country=India", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "b835dde0b9msh4785ebfde37e455p12ab20jsn17bc47347d1e"
            }
        })
        const data = await response.json();

        //total india case
        state_name_element.innerHTML = data.parameters.country;
        total_cases_element.innerHTML = data.response[0].cases.total;
        new_cases_element.innerHTML =`+${data.response[0].cases.total-data.response[3].cases.total}`;
        recovered_element.innerHTML = data.response[0].cases.recovered;
        new_recovered_element.innerHTML =`+${data.response[0].cases.recovered-data.response[3].cases.recovered}`;
        death_element.innerHTML = data.response[0].deaths.total;
        new_death_element.innerHTML =`+${data.response[0].deaths.total-data.response[3].deaths.total}`;

        for( let i in data.response){
            let result = data.response[i].time.substr(0,10)
            dates.push(result)
            cases_list.push((data.response[i].cases.total))
            death_lists.push((data.response[i].deaths.total))
            recovered_list.push(data.response[i].cases.recovered)
        }
        
        dates.reverse()
        cases_list.reverse()
        recovered_list.reverse()
        death_lists.reverse()

        //Creation of chart
        axesLineChart(cases_list,recovered_list,death_lists,dates)

    } catch (error) {
        console.log(error)
        alert("Something went wrong! Try again later")
    }
}

getIndiaData()
let my_chart;
function axesLineChart(cases_list,recovered_list,death_lists,dates){
    if(my_chart){
        my_chart.destroy()
    }
    my_chart = new Chart(ctx,{
        type: 'line',
        data:{
            datasets: [{
                label: "Total Confirmed Cases",
                data: cases_list,
                fill: false,
                borderColor: '#FFF',
                backgorundColor: '#FFF',
                borderWidth: 0.5
            },{
                label: "Total Recovered Cases",
                data: recovered_list,
                fill: false,
                borderColor: '#009688',
                backgorundColor: '#009688',
                borderWidth: 0.5
            },{
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
    })
}