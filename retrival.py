import requests
import bs4


res=requests.get('https://github.com/Sudip200/devdas-editor')
basUrl = 'https://github.com'
soup=bs4.BeautifulSoup(res.text,'html.parser')
dirnames = soup.find_all('div',class_='react-directory-truncate')
for dirname in dirnames:
    print(dirname.text)
for link in soup.find_all('a'):
    if link.get('href').startswith('/Sudip200/devdas-editor'):
       print(basUrl+link.get('href'))
res2= requests.get('https://github.com/Sudip200/devdas-editor/blob/master/index.js')
soup2=bs4.BeautifulSoup(res2.text,'html.parser')
textar = soup2.find('textarea',id='read-only-cursor-text-area')
print(textar)



        
        
    
    