const { response } = require("express");

const apiurl = 'https://restcountries.com/v3.1'
// getting all countries data on loading the main page from REST countries API.
$(document).ready(function () {
  $.ajax({
    url: 'https://restcountries.com/v3.1/all',
    type: "GET",
    success: function (response, textStatus, xhr) {
      if (xhr.status === 200) {postAllCountriesData(response);}
    },
    error: function (error) {
      console.log(error)
    }
  })
})


// Getting a particular country's data from REST Countries API.

function getCountryData() {
  let country = "united kingdom";
  country = $("#country").val();
  
  if(!country){return;}
  const url1 = `${apiurl}/name/${country}`;
  $(document).ready(function () {
    $.ajax({
      url: url1,
      type: "GET",
      success: function (response, textStatus, xhr) {
        if (xhr.status === 200) {postData(response);}
        
      },
      error: function (error) {
        console.log(error)
      }
    })
  })

}

// Getting border country data which is clicked

function getBorderCountry(elmnt, country) {
  console.log(country);
  if(!country){return;}
  const url1 = `${apiurl}/name/${country}`;
  $(document).ready(function () {
    $.ajax({
      url: url1,
      type: "GET",
      success: function (response, textStatus, xhr) {
        if (xhr.status === 200) {postData(response);} else {
          console.log("Sorry This country not found...");
          console.log(typeof(country));
        }
        
      },
      error: function (error) {
        console.log(error)
        console.log("Sorry This country not found...");
      }
    })
  })
}

// posting one selected country's data.
function postData(data) {

  let name = data[0].name.common;
  let nativeName = data[0].nativeName.eng.official;
  let topLevelDomain = data[0].tld[0];
  let currency = data[0].currencies;
  let capital = data[0].capital[0];
  let region = data[0].region;
  let subregion = data[0].subregion;
  let languages = data[0].languages[0].eng;
  let border = data[0].borders;
  let population = data[0].population;
  let flag = data[0].flags.png;
  
  console.log(name);
  
  let borderBtn = ``;
  for(var j=0; j < border.length; j++) {
    borderBtn += `
    <button type="button" onclick="getBorderCountry(this, '${border[j]}')">${border[j]}</button>
    `;
  }
  
  $(".container").html("");
  let str = `

    <div class="card one-card">
      <img src="${flag}" class="card-img-top flag" alt="Country Flag">
      <div class="card-body cardInfo">
        <div>
          <h5 class="card-title one-card-title">${name}</h5>
        </div>
        <div class="one-card-info">
          <p class="card-text one-card-text population"><b>Native Name: </b>${nativeName}</p>
          <p class="card-text one-card-text population"><b>Population: </b>${population}</p>
          <p class="card-text one-card-text region"><b>Region: </b>${region}</p>
          <p class="card-text one-card-text population"><b>Sub Region: </b>${subregion}</p>
          <p class="card-text one-card-text capital"><b>Capital: </b>${capital}</p>   
        </div>
      
        <div class="card-text one-card-text extra">
          <p class="card-text one-card-text capital"><b>Top Domain: </b>${topLevelDomain}</p>
          <p class="card-text one-card-text capital"><b>Currency: </b>${currency}</p>
          <p class="card-text one-card-text capital"><b>Languages: </b>${languages}</p>
        </div>
        <div>
          <p class="card-text one-card-text borders"><b>Border Countries: </b>${borderBtn}</p>
        </div>
      </div>
    </div>
 
  `;
    $(".container").html(str);
  
}

// populating the all countries data from REST Countries API.
function postAllCountriesData(data) {
  let dataStr = `<div class="row">`;
  console.log(data[0].name.common)
  for (let i = 0; i < data.length; i++){
    dataStr +=`
      <div class="col-md-6 col-lg-3">
        <div class="card multiple-cards">
          <img src="${data[i].flags.png}" class="card-img-top flag-main" alt="Country Flag">
          <div class="card-body card-body-main">
            <h5 class="card-title">${data[i].name.common}</h5>
            <p class="card-text population"><b>Population: </b>${data[i].population}</p>
            <p class="card-text region"><b>Region: </b>${data[i].region}</p>
            <p class="card-text capital"><b>Capital: </b>${data[i].capital}</p>
            
          </div>
        </div>
      </div>
        `;
  }
  dataStr +=`</div>`;
  
  $(".container").html(dataStr);
  
}

// Retrieving which anchor tag is clicked in Region filter.

$(".dropdown-item").on("click", function(event) {
  var arg = $(this).html();
  dataByRegion(arg);
});

// on click to Dark Mode/Light Mode
$("#mode").on("click", function(event) {
  let mode = $(this).html();
  mode = mode === "Dark Mode" ? "Light Mode" : "Dark Mode";
  $(this).html(mode);
  changeMode(mode);
});

function changeMode(mode) {
  console.log(mode);
}

$("#mode").mousemove(function(event) {
  $(this).css('cursor', 'pointer');
});

// retrieving countries data of particular region with api call.
function dataByRegion(region) {

  $(document).ready(function () {
    $.ajax({
      url: `${apiurl}/region/${region}`,
      type: "GET",
      success: function (response, textStatus, xhr) {
        if (xhr.status === 200) {postAllCountriesData(response);}
      },
      error: function (error) {
        console.log(error)
      }
    })
  })

}







// const path = require("path");
// const express = require("express");
// const app = express();

// import request from "request";
// //ROUTES
// app.get('/', (req, res) => {
//   res.sendFile("index.html", {
//     root: path.join(__dirname, "../public/")
//   })
// });


// //hOW DO WE START LISTENING
// app.listen(3000, () => {
//   console.log("Server is now running on port 3000 ...");
// });

// request(url, (error, response, body) => {
//   const data = JSON.parse(body);
//   console.log("I am from simple request"+data[0].capital);
// });

