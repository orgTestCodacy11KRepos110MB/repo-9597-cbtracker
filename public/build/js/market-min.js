var $table=$("#table-weapons tbody"),currElement="all",currType="all";async function loadWeaponListing(){$(".btn-refresh").prop("disabled",!0),$("#filter-element").prop("disabled",!0),$("#filter-type").prop("disabled",!0),$.get("https://cbtracker-api.herokuapp.com/listing/weapons",async t=>{$table.html(""),t.length>0?$table.append(await Promise.all(t.map(async t=>{const e=weaponFromContract(t,await getWeaponData(t)),a=await getFinalPrice(weapAddress,t);if(parseFloat(a)>0){let r="",n="",s="hybrid";for(let t=0;t<=e.stars;t++)r+='<img class="me-1" src="/img/star.svg" alt="Star" width="20">';return e.stat1Value>0&&(n+=`<img class="me-1" src="/img/${traitToIcon(e.stat1Type)}" width="20">${e.stat1} +${e.stat1Value}`),e.stat2Value>0&&(n+=`<br><img class="me-1" src="/img/${traitToIcon(e.stat2Type)}" width="20">${e.stat2} +${e.stat2Value}`),e.stat3Value>0&&(n+=`<br><img class="me-1" src="/img/${traitToIcon(e.stat3Type)}" width="20">${e.stat3} +${e.stat3Value}`),e.bonusPower>0&&(n+=`<br>BONUS +${e.bonusPower}`),2===parseInt(e.stars)&&(s=parseInt(e.traitNum)===parseInt(e.stat1Type)?"pure":"semi"),3===parseInt(e.stars)&&(s=parseInt(e.traitNum)===parseInt(e.stat1Type)&&parseInt(e.traitNum)===parseInt(e.stat2Type)?"pure":"semi"),4===parseInt(e.stars)&&(s=parseInt(e.traitNum)===parseInt(e.stat1Type)&&parseInt(e.traitNum)===parseInt(e.stat2Type)&&parseInt(e.traitNum)===parseInt(e.stat3Type)?"pure":parseInt(e.traitNum)!==parseInt(e.stat1Type)&&parseInt(e.stat1Type)!==parseInt(WeaponTrait.PWR)||parseInt(e.traitNum)!==parseInt(e.stat2Type)&&parseInt(e.stat2Type)!==parseInt(WeaponTrait.PWR)||parseInt(e.traitNum)!==parseInt(e.stat3Type)&&parseInt(e.stat3Type)!==parseInt(WeaponTrait.PWR)?"hybrid":"semi"),`\n                        <tr class="weapon-row" data-price="${parseFloat(fromEther(a)).toFixed(2)}" data-element="${e.element.toString().toLowerCase()}" data-type="${s}">\n                            <td class="align-middle text-white">${t}</td>\n                            <td class="align-middle text-white">\n                                <div class="d-flex align-items-center">\n                                    <img class="me-2" src="/img/${elementToIcon(e.trait)}" alt="${e.element}" width="20">\n                                </div>\n                            </td>\n                            <td class="align-middle text-white">\n                                ${r}\n                            </td>\n                            <td class="align-middle text-white">\n                                ${n}\n                            </td>\n                            <td class="align-middle text-white">${getAvgStats(e)}</td>\n                            <td class="align-middle text-white">${getTotalMultiplier(e)}x</td>\n                            <td class="align-middle text-white">${parseFloat(fromEther(a)).toFixed(4)} SKILL</td>\n                        </tr>`}}))):$table.append('<tr><td class="text-center text-white" colspan="7">No weapon listed</td></tr>'),sortTable(),filterChanges(),$(".btn-refresh").removeAttr("disabled"),$("#filter-element").removeAttr("disabled"),$("#filter-type").removeAttr("disabled")})}async function refresh(){await loadWeaponListing()}function elementToIcon(t){switch(t){case WeaponElement.Fire:return"fire.png";case WeaponElement.Earth:return"earth.png";case WeaponElement.Water:return"water.png";case WeaponElement.Lightning:return"lightning.png";default:return"???"}}function traitToIcon(t){switch(t){case WeaponTrait.STR:return"fire.png";case WeaponTrait.DEX:return"earth.png";case WeaponTrait.INT:return"water.png";case WeaponTrait.CHA:return"lightning.png";case WeaponTrait.PWR:return"pwr.svg";default:return"???"}}function getAvgStats(t){let e=0,a=0;return t.stat1Value&&(a++,e+=parseInt(t.stat1Value)),t.stat2Value&&(a++,e+=parseInt(t.stat2Value)),t.stat3Value&&(a++,e+=parseInt(t.stat3Value)),parseInt(e/a)}function getTotalMultiplier(t){let e=0;return t.stat1Value>0&&(t.traitNum===t.stat1Value?e+=getMult(.002675*parseInt(t.stat1Value)):t.traitNum===WeaponTrait.PWR?e+=getMult(.002575*parseInt(t.stat1Value)):e+=getMult(.0025*parseInt(t.stat1Value))),t.stat2Value>0&&(t.traitNum===t.stat2Value?e+=getMult(.002675*parseInt(t.stat2Value)):t.traitNum===WeaponTrait.PWR?e+=getMult(.002575*parseInt(t.stat2Value)):e+=getMult(.0025*parseInt(t.stat2Value))),t.stat3Value>0&&(t.traitNum===t.stat3Value?e+=getMult(.002675*parseInt(t.stat3Value)):t.traitNum===WeaponTrait.PWR?e+=getMult(.002575*parseInt(t.stat3Value)):e+=getMult(.0025*parseInt(t.stat3Value))),parseFloat(e).toFixed(2)}function getMult(t){return 1/(100*t)*100}function sortTable(){var t,e,a,r,n,s,l;for(t=document.getElementById("table-weapons"),a=!0;a;){for(a=!1,e=t.rows,r=1;r<e.length-1;r++)if(l=!1,n=$(e[r]).data("price"),s=$(e[r+1]).data("price"),Number(n)>Number(s)){l=!0;break}l&&(e[r].parentNode.insertBefore(e[r+1],e[r]),a=!0)}}function filterChanges(){$(".weapon-row").show(),"all"===currElement&&"all"===currType||("all"!==currElement&&"all"!==currType?$(".weapon-row").each((t,e)=>{$(e).data("type")===currType&&$(e).data("element")===currElement||$(e).hide()}):"all"!==currElement&&"all"===currType?$(".weapon-row").each((t,e)=>{$(e).data("element")!==currElement&&$(e).hide()}):$(".weapon-row").each((t,e)=>{$(e).data("type")!==currType&&$(e).hide()}))}$("#filter-element").on("change",t=>{currElement=t.currentTarget.value,filterChanges()}),$("#filter-type").on("change",t=>{currType=t.currentTarget.value,filterChanges()}),loadWeaponListing();