const form = document.querySelector('form');
const search = form.querySelector('input');
const report = document.querySelector('.report');
const reportLocation = document.querySelector('.report-location');

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value;
    const path = `${document.URL}weather?address=${location}`;
    getDataFromServer(path);
})


function getDataFromServer(path) {
    
fetch(path).then((response) => {
        response.json().then((data) => {
            if(data.error){
                
                reportLocation.innerHTML = '';
                report.innerHTML = '';
                report.innerHTML = data.error;
            }
            else{
                report.innerHTML = '';
                //report.append(data.location);
                reportLocation.innerHTML = '';
                reportLocation.innerHTML = data.location;
                report.innerHTML = data.forecast;
            }
        })
    })
}