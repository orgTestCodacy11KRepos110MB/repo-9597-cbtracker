var lastReset=0,skillPrice=0,usdPrice=0,gasPrice=0,gasUSDPrice=0,$card1=$("#card-1"),$card2=$("#card-2"),$card3=$("#card-3"),$card4=$("#card-4"),$card5=$("#card-5"),$card6=$("#card-6"),$card7=$("#card-7"),$card8=$("#card-8"),$card9=$("#card-9"),$card10=$("#card-10"),$card11=$("#card-11");function toLocaleCurrency(e){return e.toLocaleString("en-US",{style:"currency",currency:currCurrency.toUpperCase()})}function formatNumber(e,r=6){return Number(e).toLocaleString("en",{minimumFractionDigits:r,maximumFractionDigits:r})}async function priceTicker(){skillPrice=await getSkillPrice(),gasPrice=await getGasPrice(),"poly"===currentNetwork&&(skillPrice*=gasPrice*=1e12),$.get("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd",async e=>{usdPrice=e.tether.usd,gasUSDPrice=gasPrice*usdPrice,"bnb"===currentNetwork&&(skillPrice*=gasPrice),$card1.html(skillPrice.toLocaleString("en-US",{style:"currency",currency:"USD"})),$card2.html(gasUSDPrice.toLocaleString("en-US",{style:"currency",currency:"USD"}))})}async function statTicker(){const e=await getCurrentAllowance(),r=await getSkillMultiplier(await getSkillPartnerId()),t=await getHourlyFights(),a=await getHourlyPowerAvg(),c=await getHourlyPowerSum(),i=await getTotalCharacters(),n=await getTotalWeapons(),l=await getTotalShields();$card4.html(parseFloat(fromEther(e)).toFixed(6)),$card5.html(parseFloat(fromEther(r)).toFixed(6)),$card6.html(Number(t).toLocaleString("en-US")),$card7.html(Number(a).toLocaleString("en-US")),$card8.html(Number(c).toLocaleString("en-US")),$card9.html(Number(i).toLocaleString("en-US")),$card10.html(Number(n).toLocaleString("en-US")),$card11.html(Number(l).toLocaleString("en-US"))}async function resetTicker(){moment().unix()>=lastReset+3600&&(lastReset+=3600);var e=moment.duration(1e3*(lastReset+3600-moment().unix()),"milliseconds");$card3.html(`in ${e.minutes()}m and ${e.seconds()}s`)}function gasName(e){switch(e){case"bnb":return"BNB";case"heco":return"HT";case"oec":return"OKT";case"poly":return"MATIC";default:return"BNB"}}function updateGasLabel(){$("#label-gas").html(`${gasName(currentNetwork)} Price (USD)`)}$("document").ready(async()=>{priceTicker(),statTicker(),lastReset=parseInt(await getLastReset()),updateGasLabel(),setInterval(()=>{resetTicker()},1e3),setInterval(()=>{priceTicker()},3e3),setInterval(()=>{statTicker()},1e3)}),$("#select-network").on("change",async e=>{$card1.html(0),$card2.html(0),$card3.html(0),$card4.html(0),$card5.html(0),$card6.html(0),$card7.html(0),$card8.html(0),$card9.html(0),$card10.html(0),$card11.html(0),updateNetwork(e.currentTarget.value),populateNetwork(),updateGasLabel(),priceTicker(),statTicker(),lastReset=parseInt(await getLastReset()),resetTicker()});