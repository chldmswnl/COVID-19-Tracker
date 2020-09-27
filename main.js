//Fetching world data

let new_cases=document.querySelector('.new_cases');
let new_deaths=document.querySelector('.new_deaths');
let total_cases=document.querySelector('.total_cases');
let total_deaths=document.querySelector('.total_deaths');
let total_recovered=document.querySelector('.total_recovered');

fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "ea86afecfbmsh9a66bb64d745e64p1bc6d7jsnad6a7be28d7a",
  },
}).then(res=>{
    res.json().then(data=>{
        new_cases.innerHTML=data.new_cases;
        new_deaths.innerHTML=data.new_deaths;
        total_cases.innerHTML=data.total_cases;
        total_deaths.innerHTML=data.total_deaths;
        total_recovered.innerHTML=data.total_recovered;
    })
}).catch(err=>{
    console.log(err);
});

//Fetching the data by countries

    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53"
    }
    }).then(res=>{
        res.json().then(data=>data.countries_stat)
        .then(data=>{
            console.log(data);
            makeTable(data);
            searchCountry(data);
        })
    }).catch(err=>{
        console.log(err);
    });

function makeTable(data)
{
    const container=document.querySelector('.countries_stat');
    container.innerHTML=data.map(data=>getHTMLString(data)).join('');
}

function getHTMLString(data)
{
    
    return `
            <tr>
                <td>${data.country_name}</td>
                <td>${data.new_cases}</td>
                <td>${data.new_deaths}</span>
                <td>${data.cases}</td>
                <td>${data.deaths}</td>
            </tr>
            `;
}

function showTime()
{
    const now=new Date();
    const year=now.getFullYear();
    const month=now.getMonth()+1;
    const date=now.getDate();
    const hour=now.getHours();
    const mins=now.getMinutes();
    const sec=now.getSeconds();
    
    const container=document.querySelector('.clock');
    const time= `<span class="at_time">${year}/${month<10?`0${month}`:`${month}`}/${date<10?`0${date}`:`${date}`}  
                ${hour<10?`0${hour}`:`${hour}`}:${mins<10?`0${mins}`:`${mins}`}:${sec<10?`0${sec}`:`${sec}`}</span>`;
    container.innerHTML= time;
   

}
setInterval(showTime,1000);

function searchCountry(data)
{
    const searchBtn=document.querySelector('.searchBtn');
    const resetBtn=document.querySelector('.resetBtn');
    

    resetBtn.addEventListener('click',()=>{
        makeTable(data);
    })
    searchBtn.addEventListener('click',()=>{
        let value=document.querySelector('.searchingBox').value.toUpperCase();
        makeTable(data.filter(data=>data.country_name.toUpperCase().includes(value)));
    });
}

