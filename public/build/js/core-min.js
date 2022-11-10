var accounts=localStorage.getItem("accounts"),names=localStorage.getItem("names"),hideAddress="true"===localStorage.getItem("hideAddress"),hideChars="true"===localStorage.getItem("hideChars"),hideSkills="true"===localStorage.getItem("hideSkills"),hideUnstake="true"===localStorage.getItem("hideUnstake"),isGen2="true"===localStorage.getItem("gen2"),currCurrency=localStorage.getItem("currency"),currencies=["php","aed","ars","aud","brl","cny","eur","gbp","hkd","idr","inr","jpy","myr","sgd","thb","twd","usd","vnd"],rewardsClaimTaxMax=0,storeAccounts=[],storeNames={},skillPrice=0,localPrice=0,bnbPrice=0,usdPrice=0,gasPrice=0,totalSouls=0,$table=$("#table-accounts tbody");currCurrency||(currCurrency="usd"),accounts&&names&&(storeAccounts=JSON.parse(accounts),storeNames=JSON.parse(names)),populateCurrency(),updateBalanceLabel(),hideAddress?$("#btn-privacy").prop("checked",!0):$("#btn-privacy").removeAttr("checked"),hideChars?$("#btn-hchars").prop("checked",!0):$("#btn-hchars").removeAttr("checked"),hideSkills?$("#btn-hskills").prop("checked",!0):$("#btn-hskills").removeAttr("checked"),hideUnstake?$("#btn-hunstake").prop("checked",!0):$("#btn-hunstake").removeAttr("checked"),isGen2?$("#btn-gen2").prop("checked",!0):$("#btn-gen2").removeAttr("checked");var $cardIngame=$("#card-ingame"),$cardUnclaim=$("#card-unclaim"),$cardStake=$("#card-stake"),$cardWallet=$("#card-wallet"),$cardTotal=$("#card-total"),$cardTotalTitle=$("#card-total-title"),$cardBnb=$("#card-bnb"),$cardAccount=$("#card-account"),$cardChar=$("#card-char"),$cardPrice=$("#card-price"),$cardClaim=$("#card-claim"),$cardCharFee=$("#card-char-fee"),$cardWeapFee=$("#card-weap-fee"),$cardSouls=$("#card-souls"),$convIngame=$("#conv-ingame"),$convUnclaim=$("#conv-unclaim"),$convStake=$("#conv-stake"),$convWallet=$("#conv-wallet"),$convTotal=$("#conv-total"),$convBnb=$("#conv-bnb"),$convPrice=$("#conv-price"),$convCharFee=$("#conv-char-fee"),$convWeapFee=$("#conv-weap-fee");async function refresh(){await loadData(),clearFiat(),fiatConversion()}async function btnRefresh(){gtag("event","click",{event_category:"button",event_label:"Refresh"}),await refresh()}function fiatConversion(){isElementNotZero($cardIngame)&&$convIngame.html(`(${toLocaleCurrency(convertToFiat($cardIngame.html()))})`),isElementNotZero($cardUnclaim)&&$convUnclaim.html(`(${toLocaleCurrency(convertToFiat($cardUnclaim.html()))})`),isElementNotZero($cardStake)&&$convStake.html(`(${toLocaleCurrency(convertToFiat($cardStake.html()))})`),isElementNotZero($cardWallet)&&$convWallet.html(`(${toLocaleCurrency(convertToFiat($cardWallet.html()))})`),isElementNotZero($cardTotal)&&$convTotal.html(`(${toLocaleCurrency(convertToFiat($cardTotal.html()))})`),isElementNotZero($cardBnb)&&$convBnb.html(`(${toLocaleCurrency(convertBnbToFiat($cardBnb.html()))})`),isElementNotZero($cardPrice)&&"usd"!==currCurrency&&$convPrice.html(`(${toLocaleCurrency(localPrice)})`),isElementNotZero($cardCharFee)&&$convCharFee.html(`(${toLocaleCurrency(convertToFiat($cardCharFee.html()))})`),isElementNotZero($cardWeapFee)&&$convWeapFee.html(`(${toLocaleCurrency(convertToFiat($cardWeapFee.html()))})`)}function clearFiat(){$convIngame.html(""),$convUnclaim.html(""),$convStake.html(""),$convWallet.html(""),$convTotal.html(""),$convBnb.html(""),$convPrice.html(""),$convCharFee.html(""),$convWeapFee.html("")}function isElementNotZero(e){return parseFloat(localeCurrencyToNumber(e.html()))>0}function localeCurrencyToNumber(e){return Number(String(e).replace(/[^0-9\.]+/g,""))}function convertToFiat(e){return localeCurrencyToNumber(e)*localPrice}function convertBnbToFiat(e){return parseFloat(e)*bnbPrice}function toLocaleCurrency(e){return e.toLocaleString("en-US",{style:"currency",currency:currCurrency.toUpperCase()})}function formatNumber(e,t=6){return Number(e).toLocaleString("en",{minimumFractionDigits:t,maximumFractionDigits:t})}async function loadData(){if($(".btn-refresh").prop("disabled",!0),$table.html(""),$cardIngame.html(0),$cardUnclaim.html(0),$cardStake.html(0),$cardWallet.html(0),$cardTotal.html(0),$cardBnb.html(0),$cardChar.html(0),$cardSouls.html(0),$cardAccount.html(storeAccounts.length),totalSouls=0,"bnb"===currentNetwork)var e=await multicall(getNFTCall(SkillStaking30,conAddress[currentNetwork].skillStaking30,"balanceOf",storeAccounts.map(e=>[e]))),t=await multicall(getNFTCall(SkillStaking90,conAddress[currentNetwork].skillStaking90,"balanceOf",storeAccounts.map(e=>[e]))),a=await multicall(getNFTCall(SkillStaking180,conAddress[currentNetwork].skillStaking180,"balanceOf",storeAccounts.map(e=>[e])));var r=isGen2&&"bnb"===currentNetwork?await multicall(getNFTCall(CryptoBlades,conAddress[currentNetwork].cryptoBlades,"userVars",storeAccounts.map(e=>[e,10011]))):await multicall(getNFTCall(CryptoBlades,conAddress[currentNetwork].cryptoBlades,"getTokenRewardsFor",storeAccounts.map(e=>[e]))),n=isGen2&&"bnb"===currentNetwork?await getValorPartnerId():await getSkillPartnerId(),l=n?Number(fromEther(await getProjectMultiplier(n))):0,o=n?await getSkillToPartnerRatio(n):0,c=await Promise.all(storeAccounts.map(async(n,c)=>{let s="";var i=await getAccountCharacters(n),m=await getBNBBalance(n),d=isGen2&&"bnb"===currentNetwork?await getValorWallet(n):await getSkillWallet(n),u="bnb"===currentNetwork?web3.utils.toBN(sumOfStakedSkill(e[c],t[c],a[c])):await getStakedRewards(n),p=r[c],h=p/getRatio(o)*l,$=parseInt($cardChar.html());$+=i.length,$cardChar.html($);var g=i.length;$cardIngame.html(formatNumber(parseFloat($cardIngame.html())+parseFloat(fromEther(h)))),$cardUnclaim.html(formatNumber(parseFloat($cardUnclaim.html())+parseFloat(fromEther(p)))),$cardStake.html(formatNumber(parseFloat($cardStake.html())+parseFloat(fromEther(u)))),$cardWallet.html(formatNumber(parseFloat($cardWallet.html())+parseFloat(fromEther(d)))),$cardTotal.html(formatNumber(parseFloat($cardTotal.html())+parseFloat(fromEther(sumOfArray([p,u,d]))))),$cardBnb.html(formatNumber(parseFloat($cardBnb.html())+parseFloat(fromEther(m))));var b="",w={},f=[],k=(await multicall(getNFTCall(Characters,conAddress[currentNetwork].character,"get",i.map(e=>[e])))).map((e,t)=>characterFromContract(i[t],e)),v=(await multicall(getNFTCall(Characters,conAddress[currentNetwork].character,"getStaminaPoints",i.map(e=>[e])))).map(e=>e[0]),y=await multicall(getNFTCall(Characters,conAddress[currentNetwork].character,"getTotalPower",i.map(e=>[e])));"avax"!==currentNetwork&&(f=await multicall(getNFTCall(SimpleQuest,conAddress[currentNetwork].quest,"getCharacterQuestData",i.map(e=>[e]))));var C=await conCryptoBlades.methods.getXpRewards(i).call();if(g>0){var N="avax"!==currentNetwork?await getReputationLevelRequirements():void 0;b=`<td class="char-column" data-cid="${(w=i.map((e,t)=>{var a=k[t],r=y[t],n=C[t],l=v[t],o="avax"!==currentNetwork?getReputationTier(f[t]?Number(f[t][0][2]):0,N):0,c=getNextTargetExpLevel(a.level);return totalSouls+=4*CharacterPower(a.level)-r,{charId:e,power:r,exp:n,sta:l,rep:o,trait:a.trait,nextLevel:c.level+1,nextExp:c.exp-(parseInt(a.xp)+parseInt(n)),mustClaim:c.exp-(parseInt(a.xp)+parseInt(n))<=0,level:a.level+1,element:a.traitName}}))[0].charId}">${w[0].charId}</td>\n                        <td class="char-column">${levelToColor(w[0].level)}</td>\n                        <td class="char-column">${elemToColor(w[0].element)}</td>\n                        <td class="char-column">${Number(w[0].power).toLocaleString("en-US")} / ${Number(4*CharacterPower(w[0].level-1)).toLocaleString("en-US")}</td>\n                        <td class="char-column">${reputationToTier(w[0].rep)}</td>\n                        <td class="char-column"><span data-cid="${w[0].charId}">${w[0].exp}</span> xp</td>\n                        <td class="char-column">${w[0].nextLevel}<br/><span style='font-size: 10px'>${w[0].mustClaim?'<span class="text-gold">(Claim now)</span>':`<span data-xp="${w[0].charId}">(${Number(w[0].nextExp).toLocaleString("en-US")}</span> xp left)`}</span></td>\n                        <td class="char-column" data-sta="${w[0].charId}">${staminaToColor(w[0].sta)}<br/>${staminaFullAt(w[0].sta)}</td>`}else b='<td class="char-column" colspan="8">\n                      <span id="ct_cH8icOIcl5J"></span>\n                            \x3c!--<div class="coinzilla" data-zone="C-1836231acdf79c70725"></div>\n                            <script>\n                                window.coinzilla_display = window.coinzilla_display || [];\n                                var c_display_preferences = {};\n                                c_display_preferences.zone = "1836231acdf79c70725";\n                                c_display_preferences.width = "728";\n                                c_display_preferences.height = "90";\n                                coinzilla_display.push(c_display_preferences);\n                            <\/script>--\x3e\n                        </td>';g<1&&(g=1);var S=sumOfArray([p,u,d]);return s+=` <tr class="text-white align-middle" data-row="${n}">\n                            <td rowspan="${g}" class='align-middle' data-id="${n}">${storeNames[n]}</td>\n                            <td rowspan="${g}" class='align-middle address-column'>${n}</td>\n                            ${b}\n                            <td class="skill-column" rowspan="${g}" class='align-middle'>${formatNumber(fromEther(p))}<br />${Number(parseFloat(fromEther(p)).toFixed(6))>0?`<span style="font-size: 10px;">(${toLocaleCurrency(convertToFiat(Number(fromEther(p))))})</span>`:""}</td>\n                            <td class="skill-column" rowspan="${g}" class='align-middle'>${formatNumber(fromEther(h))}<br />${Number(parseFloat(fromEther(h)).toFixed(6))>0?`<span style="font-size: 10px;">(${toLocaleCurrency(convertToFiat(Number(fromEther(h))))})</span>`:""}</td>\n                            <td class="skill-column" rowspan="${g}" class='align-middle'>${formatNumber(fromEther(u))}<br />${Number(parseFloat(fromEther(u)).toFixed(6))>0?`<span style="font-size: 10px;">(${toLocaleCurrency(convertToFiat(Number(fromEther(u))))})</span>`:""}</td>\n                            <td class="skill-column" rowspan="${g}" class='align-middle'>${formatNumber(fromEther(d))}<br />${Number(parseFloat(fromEther(d)).toFixed(6))>0?`<span style="font-size: 10px;">(${toLocaleCurrency(convertToFiat(Number(fromEther(d))))})</span>`:""}</td>\n                            <td class="skill-column" rowspan="${g}" class='align-middle'>${formatNumber(fromEther(S))}<br />${Number(parseFloat(fromEther(S)).toFixed(6))>0?`<span style="font-size: 10px;">(${toLocaleCurrency(convertToFiat(Number(fromEther(S))))})</span>`:""}</td>\n                            <td rowspan="${g}" class='align-middle'>${bnbFormatter(formatNumber(fromEther(m)))}<br />${Number(parseFloat(fromEther(m)).toFixed(6))>0?`<span style="font-size: 10px;">(${toLocaleCurrency(convertBnbToFiat(Number(fromEther(m))))})</span>`:""}</td>\n                            <td rowspan="${g}" class='align-middle'><button type="button" class="btn btn-success btn-sm mb-1" onclick="rename('${n}')">Rename</button><br>\n                            <button type="button" class="btn btn-warning btn-sm mb-1" onclick="simulate('${n}')">Combat Simulator</button><br>\n                            <button type="button" class="btn btn-primary btn-sm mb-1" onclick="logs('${n}')">Fight Logs</button><br>\n                            <button type="button" class="btn btn-danger btn-sm" onclick="remove('${n}')">Remove</button></td>\n                        </tr>`,w.length>1&&w.forEach((e,t)=>{t>0&&(s+=`<tr class="text-white align-middle" data-row="${n}">\n                                        <td class="char-column">${e.charId}</td>\n                                        <td class="char-column">${levelToColor(e.level)}</td>\n                                        <td class="char-column">${elemToColor(e.element)}</td>\n                                        <td class="char-column">${Number(e.power).toLocaleString("en-US")} / ${Number(4*CharacterPower(e.level-1)).toLocaleString("en-US")}</td>\n                                        <td class="char-column">${reputationToTier(e.rep)}</td>\n                                        <td class="char-column"><span data-cid="${e.charId}">${e.exp}</span> xp</td>\n                                        <td class="char-column">${e.nextLevel}<br/><span style='font-size: 10px'>(${e.mustClaim?'<span class="text-gold">Claim now</span>':`<span data-xp="${e.charId}">${Number(e.nextExp).toLocaleString("en-US")}</span> xp left`})</span></td>\n                                        <td class="char-column">${staminaToColor(e.sta)}<br/>${staminaFullAt(e.sta)}</td>\n                                    </tr>`)}),s}));$table.html(c),$cardSouls.html(Number(totalSouls/10).toLocaleString("en-US")),addressHelper(hideAddress),charHelper(hideChars),skillsHelper(hideSkills),unstakeHelper(hideUnstake),gen2Helper(isGen2),$(".btn-refresh").removeAttr("disabled")}function versionCheck(){$.get("/version",e=>{version!==e.version&&alert("CryptoBlades Tracker has a new update, please refresh your page!")})}function populateCurrency(){$("#select-currency").html(""),$("#select-currency").append(new Option(currCurrency.toUpperCase(),currCurrency)),currencies.forEach(e=>{currCurrency!==e&&$("#select-currency").append(new Option(e.toUpperCase(),e))})}async function addAccount(){var e=$("#inp-name").val().trim(),t=$("#inp-address").val().trim();storeAccounts.find(e=>e===t)||isAddress(t)&&($("#modal-add-account").modal("hide"),storeAccounts.push(t),storeNames[t]=e,storeAccounts&&localStorage.setItem("accounts",JSON.stringify(storeAccounts)),storeNames&&localStorage.setItem("names",JSON.stringify(storeNames)),await refresh())}function renameAccount(){var e=$("#inp-rename").val().trim(),t=$("#inp-readdress").val().trim();$("#modal-rename-account").modal("hide"),storeNames[t]=e,saveToLocalStorage("names",JSON.stringify(storeNames)),$(`td[data-id=${t}]`).html(e)}async function priceTicker(){skillPrice=await getSkillPrice(),"aurora"!==currentNetwork&&"skale"!==currentNetwork&&"coinex"!==currentNetwork&&(gasPrice=await getGasPrice()),"poly"===currentNetwork&&(skillPrice*=gasPrice*=1e12),"avax"===currentNetwork&&(gasPrice*=1e12,skillPrice*=1e12),$.get(`https://api.coingecko.com/api/v3/simple/price?ids=tether,near,cryptoblades,coinex-token&vs_currencies=${currencies.join(",")}`,async e=>{usdPrice=e.tether[currCurrency],"aurora"===currentNetwork&&(gasPrice=e.near[currCurrency],skillPrice/=1e6,skillPrice*=e.near.usd),bnbPrice=gasPrice*usdPrice,"bnb"===currentNetwork&&(isGen2?skillPrice=0:skillPrice*=gasPrice),"skale"!==currentNetwork&&"coinex"!==currentNetwork||(skillPrice=e.cryptoblades.usd,gasPrice="skale"===currentNetwork?0:e["coinex-token"].usd),localPrice=usdPrice*skillPrice,$cardPrice.html(skillPrice.toLocaleString("en-US",{style:"currency",currency:"USD"}))})}async function statTicker(){const e=await getCharacterMintFee(),t=await getWeaponMintFee(),a=isGen2&&"bnb"===currentNetwork?await getValorPartnerId():await getSkillPartnerId(),r=a?await getProjectMultiplier(a):0;$cardCharFee.html(Number(e).toLocaleString("en-US")),$cardWeapFee.html(Number(t).toLocaleString("en-US")),$cardClaim.html(parseFloat(fromEther(r)).toFixed(6))}async function setRewardsClaimTaxMax(){rewardsClaimTaxMax=await getRewardsClaimTaxMax()}function charFormatter(e){return e.map(e=>`${e.charId} | Lv. ${e.level} | ${elemToColor(e.element)} | ${e.exp} xp | Lv. ${e.nextLevel} (${e.mustClaim?'<span style="color: gold">Claim Exp</span>':`${e.nextExp} xp left`}) | (${staminaToColor(e.sta)})`).join("<br>")}function elemToColor(e){switch(e){case"Fire":return'<img src="/img/fire.png" alt="Fire" width="20">';case"Earth":return'<img src="/img/earth.png" alt="Earth" width="20">';case"Lightning":return'<img src="/img/lightning.png" alt="Lightning" width="20">';case"Water":return'<img src="/img/water.png" alt="Water" width="20">';default:return"<span style='color: red'>N/A</span>"}}function staminaToColor(e){return(e=parseInt(e))<40?`${e}/200`:e<80?`<span style='color: green'>${e}/200</span>`:e<120?`<span style='color: yellow'>${e}/200</span>`:e<160?`<span style='color: orange'>${e}/200</span>`:`<span style='color: red'>${e}/200</span>`}function staminaFullAt(e){if(200==e)return"";let t=5*(200-(e=parseInt(e)));return`<span style='font-size: 10px'>(Full ${moment(new Date((new Date).getTime()+1e3*t*60)).fromNow()})</span>`}function levelToColor(e){return e<11?e:e<21?`<span style='color: cyan'>${e}</span>`:e<31?`<span style='color: green'>${e}</span>`:e<41?`<span style='color: orange'>${e}</span>`:`<span style='color: gold'>${e}</span>`}function getClassFromTrait(e){switch(parseInt(e)){case 0:return"color: red";case 1:return"color: green";case 2:return"color: yellow";case 3:return"color: cyan";default:return"color: red"}}function currFormatter(e){return formatNumber(e,4)}function balanceFormatter(e){return`<span style="color: green">${currFormatter(e.ingame)}</span> | <span style="color: cyan">${currFormatter(e.unclaimed)}</span> | <span style="color: orange">${currFormatter(e.staked)}</span> | <span style="color: red">${currFormatter(e.wallet)}</span>`}function bnbFormatter(e){var t=parseFloat(e);return parseFloat(e)<.01?`<span class='text-danger'>${t}</span>`:parseFloat(e)<.03?`<span class='text-warning'>${t}</span>`:`<span class='text-success'>${t}</span>`}function stakedFormatter(e,t){return`${formatNumber(e)}${t.timeLeft?` (${t.timeLeft})`:""}`}function nameFormatter(e){return storeNames[e]}function convertSkill(e){return parseFloat(e)>0?`${formatNumber(e)}<br><span class="fs-md">(${(parseFloat(e)*parseFloat(skillPrice)).toLocaleString("en-US",{style:"currency",currency:currCurrency.toUpperCase()})})</span>`:0}function convertBNB(e){return parseFloat(e)>0?`${formatNumber(e)}<br><span class="fs-md">(${(parseFloat(e)*parseFloat(bnbPrice)).toLocaleString("en-US",{style:"currency",currency:currCurrency.toUpperCase()})})</span>`:0}function convertClaimTax(e){return.15*e/rewardsClaimTaxMax}function remove(e){confirm(`Are you sure you want to remove ${storeNames[e]}?`)&&(storeAccounts.splice(storeAccounts.indexOf(e),1),delete storeNames[e],storeAccounts&&localStorage.setItem("accounts",JSON.stringify(storeAccounts)),storeNames&&localStorage.setItem("names",JSON.stringify(storeNames)),refresh())}async function simulate(e){$("#combat-name").val(storeNames[e]),$("#combat-address").val(e),$("#combat-character").html(new Option("-- Select character --","")),$("#combat-weapon").html(new Option("-- Select weapon --","")),$("#combat-stamina").html(new Option("-- Select multiplier --","")),$("#combat-result").html("");for(var t=1;t<=5;t++)$("#combat-stamina").append(`<option value="${t}">${40*t} stamina (x${t})</option>`);var a=await getAccountCharacters(e),r=await getAccountWeapons(e),n=(await multicall(getNFTCall(Characters,conAddress[currentNetwork].character,"get",a.map(e=>[e])))).map((e,t)=>characterFromContract(a[t],e)),l=(await multicall(getNFTCall(Characters,conAddress[currentNetwork].character,"getStaminaPoints",a.map(e=>[e])))).map(e=>e[0]),o=(await multicall(getNFTCall(Weapons,conAddress[currentNetwork].weapon,"get",r.map(e=>[e])))).map((e,t)=>weaponFromContract(r[t],e)),c=a.map((e,t)=>{var a=n[t],r=l[t];return`<option style="${getClassFromTrait(a.trait)}" value="${e}">${e} | ${a.traitName} | Lv. ${a.level+1} | Sta. ${r}/200</option>`});o.sort((e,t)=>t.stars-e.stars);var s=o.map(e=>`<option style="${getClassFromTrait(e.trait)}" value="${e.id}">${e.id} | ${e.stars+1}-star ${e.element}</option>`);$("#combat-character").append(c),$("#combat-weapon").append(s),$("#modal-combat").modal("show",{backdrop:"static",keyboard:!1})}async function combatSimulate(){$("#btn-simulate").prop("disabled",!0),gtag("event","click",{event_category:"button",event_label:"Combat Simulate"});var e=$("#combat-character").val(),t=$("#combat-weapon").val(),a=$("#combat-stamina").val(),r=$("#combat-result");try{if(!e)throw Error("Please select a character.");if(!t)throw Error("Please select a weapon.");if(!a)throw Error("Please select a stamina multiplier.");r.html("Generating results...");await getCharacterStamina(e);var n=characterFromContract(e,await getCharacterData(e)),l=weaponFromContract(t,await getWeaponData(t));n.power=parseInt(await conCharacters.methods.getTotalPower(e).call());var o=await characterTargets(e,t),c=await getEnemyDetails(o),s=await multicall(getNFTCall(CryptoBlades,conAddress[currentNetwork].cryptoBlades,"getTokenGainForFight",c.map(e=>[e.power]))),i=await getTokenPrice(),m=await getSkillTokenPrice(),d=await getCombatTokenChargePercent();r.html("Enemy | Element | Power | Est. Reward | Gas Offset | XP | Chance<br><hr>"),r.append(c.map((e,t)=>{var r=getWinChance(n,l,e.power,e.trait);e.element=traitNumberToName(e.trait);var o=fromEther(s[t]*parseInt(a)),c=getAlignedCharacterPower(n,l),u=Math.floor(e.power/c*32)*parseInt(a),p=fromEther(Math.trunc(s[t]*d/100*m/i));return`#${t+1} | ${elemToColor(e.element)} | ${e.power} | ${truncateToDecimals(o,6)} | ${truncateToDecimals(p,6)} | ${u} | ${chanceColor(r)}<br>`})),$("#btn-simulate").removeAttr("disabled")}catch(e){r.html(e.message),$("#btn-simulate").removeAttr("disabled")}}function chanceColor(e){let t="red";return e>=.9&&(t="green"),e>=.8&&e<.9&&(t="yellow"),e>=.7&&e<.8&&(t="orange"),`<span style="color: ${t}">${formatNumber(100*e,2)}%</span>`}function rename(e){$("#inp-rename").val(storeNames[e]),$("#inp-readdress").val(e),$("#modal-rename-account").modal("show",{backdrop:"static",keyboard:!1})}function export_data(){getLocalstorageToFile(`CBTracker-${(new Date).getTime()}.json`)}function import_data(){if(!(window.File&&window.FileReader&&window.FileList&&window.Blob))return alert("The File APIs are not fully supported in this browser.");var e=document.getElementById("file-import");if(!e)return alert("Um, couldn't find the fileinput element.");if(!e.files)return alert("This browser doesn't seem to support the `files` property of file inputs.");if(!e.files[0])return alert("Please select a file before clicking 'Import'");var t=e.files[0].type;if("application/json"===t||"text/plain"===t){var a=e.files[0],r=new FileReader;r.readAsText(a),r.addEventListener("load",function(){if("application/json"===t){var{accounts:e,currency:a,hideAddress:n,names:l}=JSON.parse(r.result);storeAccounts=JSON.parse(e),storeNames=JSON.parse(l),n="true"===n,currCurrency=a}else{var o=r.result.split("\n");(o=o.map(e=>e.replace(/\r?\n|\r/g,""))).length&&o.forEach(e=>{var[t,a]=e.split(",");t&&a&&isAddress(a)&&!storeAccounts.includes(a)&&(storeAccounts.push(a),storeNames[a]=t)})}storeAccounts&&localStorage.setItem("accounts",JSON.stringify(storeAccounts)),storeNames&&localStorage.setItem("names",JSON.stringify(storeNames)),n&&localStorage.setItem("hideAddress",n),currCurrency&&localStorage.setItem("currency",currCurrency),addressHelper(n),charHelper(hideChars),skillsHelper(hideSkills),unstakeHelper(hideUnstake),gen2Helper(isGen2),refresh(),$("#modal-import").modal("hide")})}else alert("Please import a valid json/text file")}function addressHelper(e){e?($(".toggle.btn.btn-sm").removeClass("btn-primary"),$(".toggle.btn.btn-sm").addClass("btn-danger off"),$(".address-column").hide()):($(".toggle.btn.btn-sm").addClass("btn-primary"),$(".toggle.btn.btn-sm").removeClass("btn-danger off"),$(".address-column").show())}function charHelper(e){e?($(".toggle.btn.btn-sm").removeClass("btn-primary"),$(".toggle.btn.btn-sm").addClass("btn-danger off"),$(".char-column").hide()):($(".toggle.btn.btn-sm").addClass("btn-primary"),$(".toggle.btn.btn-sm").removeClass("btn-danger off"),$(".char-column").show())}function skillsHelper(e){e?($(".toggle.btn.btn-sm").removeClass("btn-primary"),$(".toggle.btn.btn-sm").addClass("btn-danger off"),$(".skill-column").hide()):($(".toggle.btn.btn-sm").addClass("btn-primary"),$(".toggle.btn.btn-sm").removeClass("btn-danger off"),$(".skill-column").show())}function unstakeHelper(e){e?($(".toggle.btn.btn-sm").removeClass("btn-primary"),$(".toggle.btn.btn-sm").addClass("btn-danger off"),$(".unstake-column").hide()):($(".toggle.btn.btn-sm").addClass("btn-primary"),$(".toggle.btn.btn-sm").removeClass("btn-danger off"),$(".unstake-column").show())}function gen2Helper(e){e&&"bnb"===currentNetwork?($("#label-asset").html("Avalor Assets"),$("#btn-hskill-label").html("Hide valor assets"),$("#card-claimable-title").html("Total Claimable Valors"),$("#card-unclaimed-title").html("Total Unclaimed Valors"),$("#card-staked-title").html("Total Staked Valors"),$("#card-wallet-title").html("Total Valors in Wallet"),$("#card-total-title").html("Total Valor Assets"),$("#card-price-title").html("Current Valor Price"),$("#card-multiplier-title").html("Valor Multiplier")):($("#label-asset").html("Skill Assets"),$("#btn-hskill-label").html("Hide skill assets"),$("#card-claimable-title").html("Total Claimable Skills"),$("#card-unclaimed-title").html("Total Unclaimed Skills"),$("#card-staked-title").html("Total Staked Skills"),$("#card-wallet-title").html("Total Skills in Wallet"),$("#card-total-title").html("Total Skill Assets"),$("#card-price-title").html("Current Skill Price"),$("#card-multiplier-title").html("Skill Multiplier"))}function getLocalstorageToFile(e){for(var t={},a=0;a<localStorage.length;a++){var r=localStorage.key(a),n=localStorage.getItem(r);t[r]=n}var l=JSON.stringify(t),o=new Blob([l],{type:"text/plain"}),c=window.URL.createObjectURL(o),s=document.createElement("a");s.download=e,s.innerHTML="Download File",s.href=c,s.onclick=function(){document.body.removeChild(event.target)},s.style.display="none",document.body.appendChild(s),s.click()}function saveToLocalStorage(e,t){localStorage.setItem(e,t)}function sortTable(){var e=$table.children().detach().get();e.sort(function(e,t){return parseInt($(e).data("index"))>parseInt($(t).data("index"))?1:parseInt($(e).data("index"))<parseInt($(t).data("index"))?-1:0}),$table.append(e)}function copy_address_to_clipboard(){navigator.clipboard.writeText("0x2548696795a3bCd6A8fAe7602fc26DD95A612574").then(e=>alert("Copied Address"),e=>alert("Fail\n"+e))}function unstakeSkillAt(e){var t=new Date((new Date).getTime()+1e3*e);return`<span title="${moment().countdown(t)}">${moment(t).fromNow()}`}function gasName(e){switch(e){case"bnb":return"BNB";case"heco":return"HT";case"oec":return"OKT";case"poly":return"MATIC";case"avax":return"AVAX";case"aurora":return"AETH";case"skale":return"sFuel";case"coinex":return"CET";default:return"BNB"}}function updateBalanceLabel(){$("#label-tbalance").html(`Total ${gasName(currentNetwork)} Balance`),$("#label-balance").html(`${gasName(currentNetwork)} Balance`)}$("document").ready(async()=>{await priceTicker(),await setRewardsClaimTaxMax(),await statTicker(),lastReset=parseInt(await getLastReset()),resetTime=parseInt(lastReset),localStorage.setItem(`${currentNetwork}-reset`,resetTime),setInterval(()=>{fiatConversion()},1e3),setInterval(async()=>{await priceTicker()},1e4),setInterval(async()=>{await statTicker()},1e3),await loadData()});const getLogs=async(e,t,a)=>getPastEvents("FightOutcome",e,t,a),delay=async e=>await new Promise(t=>setTimeout(t,e));async function logs(e){const t=$("#table-logs tbody");let a=(await getLatestBlock()).number-2e5,r=[],n=0,l=0,o=0,c=0;for(let e=0;e<10;e++)r.push(a),a+=2e3;t.html(""),$("#card-fights").html(0),$("#card-winrate").html("0.00%"),$("#card-skill").html(0),$("#card-exp").html(0),$("#table-logs").bootstrapTable("showLoading"),$("#modal-logs").modal("show",{backdrop:"static",keyboard:!1});let s=0;for(let a of r)try{const r=await getLogs(a,a+2e3,e);s+=r.length,r.map(e=>{const{character:a,weapon:r,enemyRoll:s,playerRoll:i,skillGain:m,xpGain:d}=e.returnValues;n+=1,o+=Number(fromEther(m)),c+=Number(d),parseInt(i)>parseInt(s)&&(l+=1),t.append(`<tr>\n                                <td class='text-white text-center'>${parseInt(i)>parseInt(s)?'<span class="text-success">Won</span>':'<span class="text-danger">Lost</span>'}</td>\n                                <td class='text-white text-center'>${a}</td>\n                                <td class='text-white text-center'>${r}</td>\n                                <td class='text-white text-center'>${i}</td>\n                                <td class='text-white text-center'>${s}</td>\n                                <td class='text-white text-center'>${parseFloat(fromEther(m)).toFixed(6)}</td>\n                                <td class='text-white text-center'>${d}</td>\n                            </tr>`)})}catch(e){console.log(e)}0===s&&t.html('<tr><td class="text-center text-white" colspan="7">No fights retrieved</td></tr>'),$("#card-fights").html(n),$("#card-winrate").html(`${l>0?parseFloat(l/n*100).toFixed(2):"0.00"}%`),$("#card-skill").html(parseFloat(o).toFixed(6)),$("#card-exp").html(c),$("#table-logs").bootstrapTable("hideLoading")}$("#btn-privacy").on("change",e=>{hideAddress=e.currentTarget.checked,localStorage.setItem("hideAddress",hideAddress),hideAddress?$(".address-column").hide():$(".address-column").show()}),$("#btn-hchars").on("change",e=>{hideChars=e.currentTarget.checked,localStorage.setItem("hideChars",hideChars),hideChars?$(".char-column").hide():$(".char-column").show()}),$("#btn-hskills").on("change",e=>{hideSkills=e.currentTarget.checked,localStorage.setItem("hideSkills",hideSkills),hideSkills?$(".skill-column").hide():$(".skill-column").show()}),$("#btn-hunstake").on("change",e=>{hideUnstake=e.currentTarget.checked,localStorage.setItem("hideUnstake",hideUnstake),hideUnstake?$(".unstake-column").hide():$(".unstake-column").show()}),$("#btn-gen2").on("change",e=>{isGen2=e.currentTarget.checked,localStorage.setItem("gen2",isGen2),"bnb"===currentNetwork&&(gen2Helper(isGen2),clearFiat(),priceTicker(),populateCurrency(),refresh())}),$("#select-currency").on("change",e=>{gtag("event","click",{event_category:"button",event_label:"Update Currency"}),currCurrency=e.currentTarget.value,localStorage.setItem("currency",currCurrency),clearFiat(),priceTicker(),populateCurrency(),refresh()}),$("#select-network").on("change",async e=>{gtag("event","click",{event_category:"button",event_label:"Update Network"}),updateNetwork(e.currentTarget.value),populateNetwork(),updateBalanceLabel(),clearFiat(),await refresh(),await priceTicker(),await statTicker()}),$("#modal-add-account").on("shown.bs.modal",function(e){$("#inp-name").val(""),$("#inp-address").val("")});