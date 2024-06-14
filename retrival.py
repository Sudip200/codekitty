import requests
import bs4


res=requests.get('https://github.com/Sudip200/devdas-editor/blob/master/index.js',headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'})
#get classname 'Box-sc-g0xbh4-0 cVawVl' 
 

with open('index.html','w') as f:
    f.write(res.text)
    f.close()
    