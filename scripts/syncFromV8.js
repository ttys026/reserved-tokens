const fetch = require('node-fetch');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const v8ScannerUrl = 'https://raw.githubusercontent.com/v8/v8/master/src/parsing/scanner-inl.h'
const fetchOptions = {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "zh-CN,zh;q=0.9",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors"
}

const retriveTokens = (res) => {
  const keywords = res.split(/\s/g).filter(ele => ele.startsWith('KEYWORD("')).map(ele => ele.slice(9, -2));
  const tokens = res.split(/\n/g).
  map(ele => ele.trim()).
  filter(ele => ele && ele.startsWith('c ==')).
  map(ele => ele.slice(5, ele.lastIndexOf('?')).trim().slice(1,-1));
  writeFileSync(join(__dirname, '..', 'src', 'reserved.json'), JSON.stringify({ keywords, tokens }, null, 2), 'utf-8')
}

fetch(v8ScannerUrl, fetchOptions).then(res => res.text()).then(res => {
  writeFileSync(join(__dirname, 'cache.txt'), res, 'utf-8');
  retriveTokens(res);
}).catch((e) => {
  const res = readFileSync(join(__dirname, 'cache.txt'), 'utf-8');
  retriveTokens(res);
})
