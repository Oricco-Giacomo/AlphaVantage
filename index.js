
const picker = document.getElementById("symbolPicker");
const businessData = document.getElementById("businessData");
const plotButton = document.getElementById("plotButton");
const timeScale = document.getElementsByName("timeScale")[0];
const canvas = document.getElementsByTagName("canvas")[0];
const mapButton = document.getElementById("mapButton");

let mapContainer = document.getElementById("mapContainer");

let cache =  {};
const API_KEY = "DUVV381MSAZLIN4G";
let alphaVantage = new Ajax(`https://www.alphavantage.co`);



async function loadPicker(){
    let symbols = await ajax.sendRequest("GET", "/symbols");
    let html = "";
    for(let business of symbols.data){
        html += `
            <option value="${business.symbol}">${business.shortName}- ${business.symbol}</option>
        `;
        cache[business.symbol] = business;
    }
    picker.innerHTML = html;
    selectSymbol(symbols.data[0].symbol);
}

loadPicker();

function selectSymbol(symb){
    let business = cache[symb];
    if(!business) return;
    let html = `
       <h4 class="h5"><a href="${business.officialSite}" target="_blank" class="text-decoration-none">${business.legalName}</a></h4>
       <p class="text-muted small"> <i class="bi bi-pin-map"></i> ${business.address}</p>
       <p class="card-text border-top pt-2" style="font-size: 0.85rem;">${business.description}</p>
       <div class="badge bg-secondary mb-2">Currency: ${business.currency}</div>
       <div class="text-muted" style="font-size: 0.8rem;">
         <i class="bi bi-clock"></i> Market: ${business.marketOpen} - ${business.marketClose}
       </div>
    `;
    businessData.innerHTML = html;
}

picker.addEventListener("change",function (){
    selectSymbol(picker.value);
});


const seriesKey = {
    "WEEKLY": "Weekly Time Series",
    "MONTHLY": "Monthly Time Series",
    "DAILY": "Time Series (Daily)"
};

let chart = null;
plotButton.addEventListener("click", async function () {
    if (chart) {
        chart.destroy();
    }
    let stockData = await alphaVantage.sendRequest("GET",`/query?function=TIME_SERIES_${timeScale.value}&symbol=${picker.value}&apikey=${API_KEY}`);
    let serie = stockData.data[seriesKey[timeScale.value]];
    myBarChart.setWhiteBackground(canvas);
    let labels = [];
    let stockValues = [];
    let colors = [];
    let maxValue = null;
    for(let key of Object.keys(serie).toReversed()){
        labels.push(key);
        let closing = serie[key]["4. close"];
        if(maxValue === null || maxValue < closing){
            maxValue = closing;
        }
        
        if(stockValues.length == 0 || stockValues[stockValues.length-1] < closing){
            colors.push("green");
        }
        else{
            colors.push("red");
        }
            
        stockValues.push(closing);
    }
    myBarChart.setChartOptions(`${timeScale.value} - ${picker.value}`, labels, stockValues, colors, maxValue);

    chart = new Chart(canvas, myBarChart.getChartOptions());

});

mapButton.addEventListener("click", async function(){
   mapContainer.innerHTML="";
    myMapLibre = new MyMapLibre()
    const gps = await myMapLibre.geocode(cache[picker.value].address);
    myMapLibre.drawMap(myMapLibre.openMapsStyle, mapContainer, gps, 12);
 myMapLibre.addMarker(gps, "url(./gps.png)", `${cache[picker.value].legalName}`, cache[picker.value].description);



});