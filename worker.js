const config = require("./config")
const fetch = require("node-fetch")
const { nanoid } = require("nanoid");


const t0 = process.hrtime();
function write_log(goodnews, text){
  const t1 = process.hrtime(t0);
  const time = (t1[0]* 1000000000 + t1[1]) / 1000000000;
  const color = goodnews ? "\x1b[32m" : "\x1b[31m";

  console.log(`${color} [LOG - ${time}s] \x1b[37m ${text}`);
}

async function click() {
  fetch("https://api.prayut.click/clicks", {
    "headers": {
      "content-type": "application/json",
      "x-forwarded-for":  `beamed by Chelos(chanios)${nanoid(8)}`,
    },
    "body": craft_req(),
    "method": "POST",
  }).then(async(res)=>res.json()).then(j=>{
    if(!j.error) write_log(true,`Clicked ${config.sendperreq}`)
    else write_log(false,j.error)
  }).catch(()=>{})
}
function craft_req() {
  return JSON.stringify({
    n: config.sendperreq,
    g: config.guild_id,
    t: new Date().getTime().toString()
  })
}

setInterval(click, config.clickintervalperworker);