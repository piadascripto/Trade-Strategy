const calculateTrades = () => {
  let investment = parseFloat(document.getElementById("investment").value);
  let tradesDay = parseFloat(document.getElementById("tradesDay").value);
  let strategyEfficiency = parseFloat(document.getElementById("strategyEfficiency").value) / 100;
  let tradeAmount = parseFloat(document.getElementById("tradeAmount").value) / 100;
  let highestTradeAmount = parseFloat(document.getElementById("highestTradeAmount").value);
  let gainPercentage = parseFloat(document.getElementById("gainPercentage").value) / 100;
  let lossPercentage = -parseFloat(document.getElementById("lossPercentage").value) / 100;
  let investmentGoal = parseFloat(document.getElementById("investmentGoal").value);

  let numTrade = 0;
  let highestAmount = investment;
  let allArrayTrades = [];

  const getTradeAmount = () => {
    let _tradeAmount = tradeAmount * investment;
    let actualTradeAmount = Math.min(_tradeAmount, highestTradeAmount);
    return actualTradeAmount;
  };

  const arrayTrades = () => {
    let trades = []; 
	  highestAmount = 0
	  investment  = parseFloat(document.getElementById("investment").value);
	  
    numTrade = 0; //// Generate a new trades array for each iteration
    while (investment <= investmentGoal && investment > 0) {
      let tradeResult = Math.random() < strategyEfficiency ? gainPercentage * getTradeAmount() : lossPercentage * getTradeAmount();
      investment += tradeResult;
      highestAmount = Math.max(highestAmount, investment);
      trades.push(tradeResult);
      numTrade++;
    }
    return trades;
  };

  for (let i = 0; i < 50; i++) {
    let trades = arrayTrades(); // Generate a new set of trades for each iteration
    allArrayTrades.push({
      numTrade: numTrade,
      highestAmount: highestAmount,
      trades: trades
    });
  }
	console.log(allArrayTrades)

  document.getElementById("investmentGoalOutput").textContent = "Highest Amount Reached: USD " + Math.floor(highestAmount);
  document.getElementById("title").textContent = 'Journey to USD ' + investmentGoal;
  document.getElementById("numTradesOutput").textContent = "Number of Trades: " + numTrade;
  document.getElementById("yearsOutput").textContent = "Number of years to achieve the goals: " + (numTrade / tradesDay / 252);

  console.log("==========Statistics===========");
  console.log("Your total investment:", highestAmount);
  console.log("Number of trades:", numTrade);
  console.log("Number of years:", numTrade / tradesDay / 252);
};
