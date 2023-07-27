

const taxIncentivesURL = 'http://127.0.0.1:8000/tax';

// const histSalesURL = 'http://127.0.0.1:8000/sales';
const histSalesURL = 'input/json_files/historical_ev_car_sales.json'

function getSalesForDate (eff_date, salesList) {

  salesData = sampleList.find(function(sampleItem) {
    return sampleItem.id == item.id; 
  });

  if (!Object.keys(sampleData).length)
    {console.log ("No sample data found")};

  return salesData;
};


// function to display a bar graph of historic sales by country
function plotHist(hdata) {

    // get the div that holds the bar chart
    var histDiv = document.getElementById("barChart");
    console.log("hist bar " + histDiv);

    var histSales = [{
        x: [1999, 2007, 2013, 2022, 2023],
        type: 'bar',
        orientation: 'h',
        text: "test"
    }];

    var histLayout = {
      title: {
          text: 'EV Sales By Year',
          font: {
            size: 18,
            weight: 'bold'
          }
      },
      xaxis: {
        title: {
          text: 'Year',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        tickfont: {
          size: 12
        }
      },
      yaxis: {
        title: {
          text: 'OTU IDs',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    };
  
    // Create the plot using Plotly
    Plotly.newPlot(histDiv, histSales, histLayout);
};
  


function fetchAllData(histSalesURL) {

    const dataPromise = d3.json(histSalesURL);
    
    console.log("Data Promise: ", dataPromise);

    evSales = [];
    evSalesPercentages = [];
    hybridSales = [];
    hybridSalesPercentages = [];

    d3.json(histSalesURL).then(function(data) {
     console.log("JSON output ", data);
     console.log("regions ", data[0].region);
     console.log("Years ", data[0].year);
     console.log("rows ", data.length)

     const ctx = data.length;
     console.log("counter " + ctx);

      for (let i = 0; i < ctx; i++) {
        if ( data[i].parameter == "EV sales") {
          const item = {
            region : data[i].region,
            year : data[i].year,
            powertrain: data[i].powertrain,
            value : data[i].value
          };
          if (data[i].powertrain == "BEV") {
              evSales.push(item);
          } else if (data[i].powertrain == "PHEV") {
              hybridSales.push(item);
          }
        }
      };
      console.log("EV Sales:  " + evSales.length + evSales[1]);
      console.log("Salesitem ", evSales[1].region, " year ", evSales[1].year, " value ", evSales[1].value);

      console.log("hybrids:  " + hybridSales.length + hybridSales[1]);
      console.log("hybrid item ", hybridSales[0].region, " year ", hybridSales[0].year, " value ", hybridSales[0].value)
      
    });

    return {
      evSales,
      hybridSales
    };
};


async function fetchHistData(histSalesURL) {
  
  const evSales = [];
  const hybridSales = [];
  evSalesPercentages = [];
  hybridSalesPercentages = [];


  const dataPromise = d3.json(histSalesURL);
  console.log("Data Promise: ", dataPromise);


  try {
    const data = await d3.json(histSalesURL);

    console.log("JSON output ", data);
    console.log("regions ", data[0].region);
    console.log("Years ", data[0].year);
    console.log("rows ", data.length);

    // Populate evSales and hybridSales arrays
    for (let i = 0; i < data.length; i++) {

      if (data[i].parameter === "EV sales") {
        const item = {
          region: data[i].region,
          year: data[i].year,
          powertrain: data[i].powertrain,
          value: data[i].value
        };
        if (data[i].powertrain === "BEV") {
          evSales.push(item);
        } else if (data[i].powertrain === "PHEV") {
          hybridSales.push(item);
        };
      };
    };

    console.log("EV Sales: " + evSales.length);
    console.log("Salesitem ", evSales[1].region, " year ", evSales[1].year, " value ", evSales[1].value);

    console.log("hybrids: " + hybridSales.length);
    console.log("hybrid item ", hybridSales[0].region, " year ", hybridSales[0].year, " value ", hybridSales[0].value);

    return {
      evSales,
      hybridSales
    };
  } catch (error) {
      console.error("Error fetching data:", error);
    throw error; 
  }
};



async function mapHistData(histSalesURl) {
  try {
    const histData = await fetchHistData(histSalesURL);
    console.log(histData);

    // mapping logic
   // get the div that holds the bar chart
   var histDiv = document.getElementById("barChart");
   console.log("hist bar " + histDiv);
   console.log("sales data for " + histData.evSales[0].region);

   var histSales = [{
       x: [1999, 2007, 2013, 2022, 2023],
       type: 'bar',
       orientation: 'h',
       text: "test"
   }];

   var histLayout = {
     title: {
         text: 'EV Sales By Year',
         font: {
           size: 18,
           weight: 'bold'
         }
     },
     xaxis: {
       title: {
         text: 'Year',
         font: {
           size: 14,
           weight: 'bold'
         }
       },
       tickfont: {
         size: 12
       }
     },
     yaxis: {
       title: {
         text: 'OTU IDs',
         font: {
           size: 14,
           weight: 'bold'
         }
       }
     }
   };
 
   // Create the plot using Plotly
   Plotly.newPlot(histDiv, histSales, histLayout);


  } catch (error) {
    // Handle the error, if needed
    console.error("Error mapping data:", error);
  };
};



function buildDropdown(years) {

  // Access the dropdown menu element
  var dropdownMenu = document.getElementById("selTaxYear");

  for (let i = 1999; i++; i < 2024) {
  // add the list of names to the selection
  // names.forEach(name => {
    let option = document.createElement("option");
    option.value = i;
    option.text = i;
    dropdownMenu.appendChild(option);
  };
};

function updatePlotly(newVolunteer, newSample) {

    // Update the map
    console.log("update plot");
    
};


function init() {

    // Fetch the JSON data and log it
    //let histData = fetchData(histSalesURL);

    //console.log("hist data is " + histData);
    //console.log(histData.evSales[0].region);

    
    const defaultYear = 2022;
    var taxYears = [];

    // Build the drop down list of study participants
    // buildDropdown(taxYears);

      //if (histData) {
       // console.log("data: " + histData.evSales);
       // plotHist(histData);      

      //} else {console.log("No data for year " + defaultYear);
      //};

    // Call the function to map the data
    mapHistData(histSalesURL);
};

// This function is called within the index.html when a dropdown menu item is selected
function optionChanged(newYear) {

    // Fetch the new JSON data and log ii
    fetchData(taxIncentivesURL).then(data => {
        
            console.log("cars for " + data);
            }); 
};

init();

// d3.selectAll("#selDataset").on("change", optionChanged(newID));
