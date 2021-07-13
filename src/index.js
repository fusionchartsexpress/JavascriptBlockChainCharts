// src/index.js

// Include the core fusioncharts file from core
import FusionCharts from 'fusioncharts/core';

// Include the chart from viz folder
// E.g. - import ChartType from fusioncharts/viz/[ChartType]
import Scatter from 'fusioncharts/viz/scatter';

// Include the fusion theme
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';

//add the div tag for the chart container
const myDiv = document.createElement('div');
myDiv.id = 'chart-container';
document.body.appendChild(myDiv);


async function main() {
    //Get the data
    let response = await fetch('/BlockchainAPI');
    let data = await response.json();
    if (response.ok){        
        renderPage(data);
    }
    else {
        alert('Error reading data from Blockchain Repository');
    }
}

//renders the html page when passed data as JSON text
function renderPage(JsonText){

    var dataSource = constructDataSource(JsonText);
    renderChart(dataSource);
}


//constructs JSON text for 'dataSource' key
function constructDataSource(blockchainJson){

    var dataset = [{
        "seriesname": "Bitcoin transactions",
        anchorbgcolor: "ff00ff",
        data: blockchainJson.values
    }];
    var category = []
    // Take around 5 transactions at equidistant points
    var len = blockchainJson.values.length;
    for (var i=0;i<len;i=i+Math.trunc(len/5)){
        category.push({x: blockchainJson.values[i].x, 
                       label: blockchainJson.values[i].x.toString(),
                       showverticalline: "1"
                       });
    } //end for

    var categories = [
    {
      verticallinedashed: "1",
      verticallinedashlen: "1",
      verticallinedashgap: "1",
      verticallinethickness: "1",
      verticallinecolor: "#000000",
      category
    }
  ];

  var dataSource = {"chart": {
        "caption": blockchainJson.description,
        "subcaption": "Data Source: https://www.blockchain.com",
        "xAxisName": "Time stamp",
        "YAxisName": blockchainJson.unit,
        "ynumbersuffix": "",
        "xnumbersuffix": "",
        "theme": "fusion",
        "showRegressionLine": "1",
        "plotToolText": "<b>$yDataValue</b> transactions at timestamp: <b>$xvalue</b>"

    }, 
    dataset, categories};    
    return dataSource;
}

// Draw the chart
function renderChart(dataSrc){

    FusionCharts.addDep(Scatter);
    FusionCharts.addDep(FusionTheme);

    //Chart Configurations
    const chartConfig = {
        type: 'scatter',
        renderAt: 'chart-container',
        width: '80%',
        height: '600',
        dataFormat: 'json',
        dataSource: dataSrc
    }

    //Create an Instance with chart options and render the chart
    var chartInstance = new FusionCharts(chartConfig);
    chartInstance.render();
}

//Call main method 
main();