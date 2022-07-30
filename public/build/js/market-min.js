var wssWeb3,subs=[],sales=[],wssNodes={bnb:"wss://bsc-ws-node.nariox.org:443",heco:"ws://pub001.hg.network/ws",oec:"wss://exchainws.okex.org:8443",poly:"wss://ws-matic-mainnet.chainstacklabs.com",avax:"wss://api.avax.network/ext/bc/C/ws",aurora:"wss://mainnet.aurora.dev",skale:"wss://mainnet.skalenodes.com/v1/ws/affectionate-immediate-pollux"},marketAddress=$("#market-address"),marketResult=$("#market-result"),marketEvent=_.find(NFTMarket,e=>"PurchasedListing"===e.name);function init(){wssWeb3=new Web3(new Web3.providers.WebsocketProvider(wssNodes[currentNetwork],{timeout:6e4,clientConfig:{maxReceivedFrameSize:1e8,maxReceivedMessageSize:1e8,keepalive:!0,keepaliveInterval:3e4},reconnect:{auto:!0,delay:1e3,maxAttempts:5,onTimeout:!1}})),subs=getSubscribedAddress()||[],sales=getSales()||[],marketAddress.html(""),marketResult.html(""),subs.length>0&&subs.forEach(e=>{marketAddress.append(`${e}\n`)}),sales.length>0&&sales.forEach(e=>{marketResult.append(`${e.type},${e.id},${e.price},${e.seller},${e.date},${e.txHash}\n`)});var e=wssWeb3.eth.subscribe("logs",{address:conAddress[currentNetwork].market,topics:[]});e.on("connected",()=>{console.log("connected")}),e.on("error",()=>{console.log("disconnected"),e.unsubscribe(()=>{init()})}),e.on("data",async e=>{if("0x7762d23dc0afc60972698afa4f7ab7e5853e961dad5c968fe29b0fd3b14fffb5"===e.topics[0]){var s=web3.eth.abi.decodeLog(marketEvent.inputs,e.data,e.topics.slice(1)),t=(new Date).getTime();if(subs.includes(s.seller)&&!sales.find(s=>s.transactionHash===e.transactionHash)){var{seller:a,nftAddress:r,nftID:n,price:o}=s,i=getNFTType(r),c=parseFloat(fromEther(o)).toFixed(6);marketResult.append(`${i},${n},${c},${a},${t},${e.transactionHash}\n`),notify("Market Sales Tracker",`${ucfirst(i)} #${n} sold for ${c} SKILL`),storeSales({type:i,seller:a,id:n,price:c,date:t,txHash:e.transactionHash})}}})}function getSubscribedAddress(){return JSON.parse(localStorage.getItem("market"))}function getSales(){return JSON.parse(localStorage.getItem(`sales-${currentNetwork}`))}function subscribeAddress(e){subs.find(s=>s===e)||(console.log("Subscribed:",e),isAddress(e)&&($("#modal-set-account").modal("hide"),subs.push(e),subs&&localStorage.setItem("market",JSON.stringify(subs))))}function storeSales(e){sales.push(e),sales&&localStorage.setItem(`sales-${currentNetwork}`,JSON.stringify(sales))}function getNFTType(e){return e===conAddress[currentNetwork].character?"character":e===conAddress[currentNetwork].weapon?"weapon":e===conAddress[currentNetwork].shield?"shield":e===conAddress[currentNetwork].junk?"junk":"unknown"}async function setAccount(){var e=$("#logger-address").val().trim();!Object.keys(subs).includes(e)&&isAddress(e)&&(subscribeAddress(e),marketAddress.append(`${e}\n`),$("#logger-address").val(""),$("#modal-set-account").modal("hide"))}function notify(e,s){"granted"!==Notification.permission?Notification.requestPermission():new Notification(e,{body:s})}$("#select-network").on("change",async e=>{updateNetwork(e.currentTarget.value),init()}),init(),document.addEventListener("DOMContentLoaded",function(){Notification?"granted"!==Notification.permission&&Notification.requestPermission():alert("Desktop notifications not available in your browser. Try another browser.")});