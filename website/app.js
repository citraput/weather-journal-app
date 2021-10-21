/* Global Variables */
// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=76e23e56912fcdf08516056e982c201e';
let holderEntry = document.querySelector('.entry');

// http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=76e23e56912fcdf08516056e982c201e

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWebAPIData(baseURL, zipCode, apiKey)
        .then(function(data){
            console.log(data);
            // console.log(data.main.temp);
            postData('/add', {date: newDate, temp: data.main.temp, content: feelings, country: data.name});
        })
        .then(function(){
            updateUI();
        })
}

/* Function to GET Web API Data*/
const getWebAPIData = async(baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL+zipCode+apiKey)
    try {
        const data = await res.json();
        console.log(`getWeb:${data}`);
        return data;
    } catch(error) {
        console.log("error", error)
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(url);
    console.log(data);
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
         body: JSON.stringify(data) 
    });

    try {
        const newData = await response.json();
        console.log(`newdata:${newData}`);
        return newData;
    } catch(error){
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();

        function createContent(attr){
            let div = document.createElement('div');
            div.setAttribute('id', attr);
            if (attr == 'temp'){
                div.textContent = allData[attr] + '°F'
            } else if (attr == 'date') {
                day = allData[attr].split('.')[1];
                mth = monthAlphabet(allData[attr].split('.')[0]);
                year = allData[attr].split('.')[2];
                div.innerHTML = `${allData['country']}<br>${mth} ${day}, ${year}`;
            } else {
                div.textContent = allData[attr]
            }
            return div
        }

        let fragment = document.createDocumentFragment();
        let fragment2 = document.createDocumentFragment();

        let divTitle = document.createElement('div');
        let divEntryHolder = document.createElement('div');

        fragment2.appendChild(createContent('date'));
        fragment2.appendChild(createContent('temp'));
        fragment2.appendChild(createContent('content'));

        divTitle.className = 'title';
        divTitle.textContent = 'Most Recent Entry';
        divEntryHolder.setAttribute('id', 'entryHolder');
        divEntryHolder.appendChild(fragment2);

        fragment.appendChild(divTitle);
        fragment.appendChild(divEntryHolder);

        holderEntry.appendChild(fragment);
        holderEntry.classList.add('bg');
    } catch(error){
        console.log("error", error);
    }
}

function monthAlphabet(mth){
    if (mth == 1){
        return 'Jan';
    } else if (mth == 2) {
        return 'Feb';
    } else if (mth == 3) {
        return 'Mar';
    } else if (mth == 4) {
        return 'Apr';
    } else if (mth == 5) {
        return 'May';
    } else if (mth == 6) {
        return 'Jun';
    } else if (mth == 7) {
        return 'Jul';
    } else if (mth == 8) {
        return 'Aug';
    } else if (mth == 9) {
        return 'Sep';
    } else if (mth == 10) {
        return 'Oct';
    } else if (mth == 11) {
        return 'Nov';
    } else if (mth == 12) {
        return 'Dec';
    }
}