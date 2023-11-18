const puppeteer = require('puppeteer');
const fs = require('fs'); //importado para escrever no arquivo data.json

const filePath = 'data.json'
const urlPupp = 'https://weworkremotely.com/categories/remote-front-end-programming-jobs#job-listings'


const scrapeData = async () => {
    const browser = await puppeteer.launch({ headless:true}); //headless true para fazer a oparacao do browser em off
    const page = await browser.newPage(); 

    await page.goto(urlPupp, { waitUntil: 'domcontentloaded' });

    const data = await page.evaluate(() => {
        //queryselector para localizar os elementos na pagina e estrair o conteudo 
        const anchors = document.querySelectorAll('li a');

        const puppData = Array.from(anchors).map(anchors => {
            //no caso desse site, os conteudos estao dentro de um anchor a com um span com classe = title / company / region company
            const titleElement = anchors.querySelector('span.title');
            const companyElement = anchors.querySelector('span.company');
            const timeElement = anchors.querySelector('span.region.company');

            if (titleElement && companyElement && timeElement){
                //.trim() para remover o espacamento em brando onde tiver
                const title = titleElement.innerText.trim();
                const company = companyElement.innerText.trim();
                const time = timeElement.innerText.trim();

                return{ title, company, time};
            }

            return null;
        }).filter(Boolean); //filtra os valores null

        return puppData;
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    await browser.close();
  
    return data;
};


//=========================================
//API COM FETCH

const urlAPI = "https://remoteok.com/api"

const fixedTime = 'Remoto' //para aqueles empregos que nao especificam o local

//arrow function
const getAllAPI = async () => {
    const response = await fetch(urlAPI);
    const data = await response.json();

    const filterJson = data.map((content) => {
        const titleContent = content.position;
        const companyContent = content.company;
        
        if(titleContent && companyContent){
            
            const title = titleContent;
            const company = companyContent
            const time = fixedTime;
            
            return{title, company, time};
        }

        return null;

    }).filter(Boolean);
    
    const existingData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
    const updatedData = existingData.concat(filterJson);
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    
}

//=========================================
// Função para realizar a pesquisa
function performSearch() {
    // Obter o valor de entrada do usuário
    var searchTerm = document.getElementById('search-input').value.toLowerCase();

    // Obter os dados do arquivo JSON 
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        // Filtrar os resultados com base na pesquisa
        var filteredResults = data.filter(item => 
          item.title.toLowerCase().includes(searchTerm) || 
          item.company.toLowerCase().includes(searchTerm) || 
          item.time.toLowerCase().includes(searchTerm)
        );

        // Exibir os resultados na lista
        displayResults(filteredResults);
      })
      .catch(error => console.error('Erro ao obter dados do JSON:', error));
  }

  // Função para exibir os resultados na lista
  function displayResults(results) {
    var searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Limpar resultados anteriores

    // Adicionar cada resultado à lista
    results.forEach(result => {
      var listItem = document.createElement('li');
      listItem.className = 'result-item';
      listItem.innerHTML = `Job: <strong>${result.title}</strong><br>Company: ${result.company}<br> Location: ${result.time}`;
      searchResults.appendChild(listItem);
    });
  }

// scrapeData();
getAllAPI();