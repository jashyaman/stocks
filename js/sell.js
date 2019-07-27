$(document).ready(function(){
    $("#back").click(function(){
        let url = "http://localhost:8091/html/home.html"
        $(location).attr('href',url);
    });

    let data = stockDataFromAPI()[1];
    let portfolioData = currentPortfolio();
    let qtyB = 0;

    $("#stknm").html(data.companyName + ":" + data.symbol);
    $("#stkprice").html(data.latestPrice);

    let stkpriceB = 0.0;
    let qty = 0;
    let total = 0;
    $.each(portfolioData.contents, function(i, val){
        if(data.symbol === val.symbol) {
            qty+=val.qty;
            total+= (val.price * val.qty);
        }
    });
    stkpriceB = total / qty;
    stkpriceB = Math.round(stkpriceB * 100) / 100;
    $("#stkpriceB").html(stkpriceB);
    $("#qtyB").html(qty);
    qtyB = qty;

    $("#sell").click(function() {
        let lowlimit = $("#lowlimit").val();
        let qty = $("#qty").val();
        if(lowlimit && qty) {
            if(lowlimit > data.latestPrice) {
                alert("Lower limit must be < current stock price " + data.latestPrice)
            } else if(qty > qtyB ) {
                alert("Available quatity of stock : " + qtyB);
            } else {
            let sellOrderObject = {};
            sellOrderObject["stock"] = data.symbol;
            sellOrderObject["lowlimit"] = lowlimit;
            sellOrderObject["qty"] = qty;
            sellOrderObject["currprice"] = data.latestPrice;
            
            alert("order placed");
            console.log(sellOrderObject);
            }
        } else {
            alert("lower limit and qty are mandatory");
        }
    });

});
setTimeout(function(){
    window.location.reload(1);
 }, 30000);
 function stockDataFromAPI() {
    let dat = {};
    dat = {"data": [{"symbol":"SPY","companyName":"SPDR S&P 500 ETF Trust","primaryExchange":"ra AEcNSY","calculationPrice":"tops","open":306.22,"openTime":1575301858223,"close":305,"closeTime":1613875292880,"high":null,"low":null,"latestPrice":304.5,"latestSource":"IEX real time price","latestTime":"9:41:57 AM","latestUpdate":1614279871782,"latestVolume":3558081,"iexRealtimePrice":301.7,"iexRealtimeSize":102,"iexLastUpdated":1597167084867,"delayedPrice":null,"delayedPriceTime":null,"extendedPrice":314.35,"extendedChange":-0.34,"extendedChangePercent":-0.0011,"extendedPriceTime":1566001538407,"previousClose":312,"previousVolume":null,"change":1.1,"changePercent":0.00376,"volume":3681672,"iexMarketPercent":0.014013367122108754,"iexVolume":49695,"avgTotalVolume":57538794,"iexBidPrice":312.18,"iexBidSize":611,"iexAskPrice":310.4,"iexAskSize":102,"marketCap":0,"peRatio":null,"week52High":315.03,"week52Low":243.58,"ytdChange":0.21135593800987496,"lastTradeTime":1627806219231},
    {"symbol":"AAPL","companyName":"Apple, Inc.","primaryExchange":"SANQDA","calculationPrice":"tops","open":216.99,"openTime":1592030910286,"close":212.47,"closeTime":1586908089115,"high":null,"low":null,"latestPrice":210.86,"latestSource":"IEX real time price","latestTime":"9:43:46 AM","latestUpdate":1601396481225,"latestVolume":1599268,"iexRealtimePrice":215.25,"iexRealtimeSize":2,"iexLastUpdated":1585778922042,"delayedPrice":null,"delayedPriceTime":null,"extendedPrice":211.958,"extendedChange":-0.669,"extendedChangePercent":-0.00318,"extendedPriceTime":1609978217878,"previousClose":216.88,"previousVolume":null,"change":1.32,"changePercent":0.0064,"volume":1636324,"iexMarketPercent":0.019718100694810187,"iexVolume":32489,"avgTotalVolume":20953837,"iexBidPrice":206.98,"iexBidSize":101,"iexAskPrice":214,"iexAskSize":103,"marketCap":973603461950,"peRatio":17.52,"week52High":237.35,"week52Low":143,"ytdChange":0.327852,"lastTradeTime":1596789198811},
    {"symbol":"GOOG","companyName":"Alphabet, Inc.","primaryExchange":"DSANQA","calculationPrice":"tops","open":1193.8,"openTime":1590279319799,"close":1136.69,"closeTime":1638953182552,"high":null,"low":null,"latestPrice":1280.96,"latestSource":"IEX real time price","latestTime":"9:44:20 AM","latestUpdate":1598763382168,"latestVolume":1144695,"iexRealtimePrice":1263.36,"iexRealtimeSize":49,"iexLastUpdated":1615218019988,"delayedPrice":null,"delayedPriceTime":null,"extendedPrice":1273,"extendedChange":-32.92,"extendedChangePercent":-0.02615,"extendedPriceTime":1639294721478,"previousClose":1165.29,"previousVolume":null,"change":125.8,"changePercent":0.11337,"volume":1115116,"iexMarketPercent":0.029580403930051454,"iexVolume":32326,"avgTotalVolume":1334306,"iexBidPrice":0,"iexBidSize":0,"iexAskPrice":0,"iexAskSize":0,"marketCap":873892616385,"peRatio":null,"week52High":1315.7,"week52Low":981.09,"ytdChange":0.196345,"lastTradeTime":1585674259777}
   ] };
   return dat.data;
}
function currentPortfolio() {
    let portfolio = {};
    let stock = [];
    let stk1 = {},stk2 = {}, stk3 = {};
    stk1["symbol"] = "SPY";
    stk1["price"] = 200.23;
    stk1["qty"] = 5;

    stk2["symbol"] = "AAPL";
    stk2["price"] = 220.23;
    stk2["qty"] = 30;

    stk3["symbol"] = "GOOG";
    stk3["price"] = 500.23;
    stk3["qty"] = 10;

    stock.push(stk1);
    stock.push(stk2);
    stock.push(stk3);
    portfolio["contents"] = stock;
    return portfolio;
}