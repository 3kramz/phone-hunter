
// Reloaded display data
const loadData=(brand)=>{
    fetch(` https://openapi.programming-hero.com/api/phones?search=${brand}`)
    .then(res => res.json())
    .then(data => load(data.data))
}

loadData("apple")
loadData("samsung")
loadData("oppo")
loadData("huawei")

const load = (data)=> {
    const displayContainer = document.getElementById('display-container')
        
    const phones = data.slice(1, 4)

    
        phones.map(phone => {
            console.log(phone)
            const card = document.createElement('div')
            card.innerHTML = `  
           
                <div class="col">
                    <div class="card h-100">
                        <img src="${phone.image}" class="card-img-top p-4 w-50 mx-auto" alt="...">
                        <div class="card-body d-flex justify-content-center">
                            <h5 class="card-title p-2 text-cener">${phone.brand}</h5>
                            <p class="card-text p-2"> ${phone.phone_name}</p>
                        </div>
                        <div class="d-grid gap-2">
                             <a href="#display-data" onclick="phoneDetails('${phone.slug}')" class="btn btn-outline-primary"> Details </a>
                        </div>
                    </div>
                </div>`

            displayContainer.append(card)
            document.getElementById('search-field').value = ''
            document.getElementById("display-data").textContent = ''
        })
    
}




// Search Handler
const searchBtn = document.getElementById("search-btn")

searchBtn.addEventListener("click", () => {
    const searchValue = document.getElementById('search-field').value
    fetch(` https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
        .then(res => res.json())
        .then(data => displayCard(data.data))
})

const displayCard = data => {
    const displayContainer = document.getElementById('display-container')
        displayContainer.textContent = ''
    const phones = data.slice(0, 20)

    if (phones.length !== 0) {
        phones.map(phone => {
            console.log(phone)
            const card = document.createElement('div')
            card.innerHTML = `   
                <div class="col">
                    <div class="card h-100">
                        <img src="${phone.image}" class="card-img-top p-4 w-50 mx-auto" alt="...">
                        <div class="card-body d-flex justify-content-center">
                            <h5 class="card-title p-2 text-cener">${phone.brand}</h5>
                            <p class="card-text p-2"> ${phone.phone_name}</p>
                        </div>
                        <div class="d-grid gap-2">
                             <a href="#display-data" onclick="phoneDetails('${phone.slug}')" class="btn btn-outline-primary"> Details </a>
                        </div>
                    </div>
                </div>`

            displayContainer.append(card)
            document.getElementById('search-field').value = ''
            document.getElementById("display-data").textContent = ''
        })
    } else {
        const card = document.createElement('div')
        card.innerHTML = `<h1 class="card-title p-2 d-flex justify-content-center align-items-center">No phone Found</h1>`

        displayContainer.append(card)
        document.getElementById('search-field').value = ''
        document.getElementById("display-data").textContent = ''


    }
}

// display Phone details
const phoneDetails = slug => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(resp => resp.json())
        .then(data => loadDetails(data.data))

}

const loadDetails = phone => {
    const featureContainer = document.getElementById("display-data")
    featureContainer.textContent = ''
    const release = date => date ? date : "Release date not found"
    const displayData = document.createElement("div")
    displayData.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4 my-5">
    
        <div class="col d-flex  align-items-center">
            <div>
                    <img src="${phone.image}" class="card-img-top d-flex justify-content-center " alt="...">
                    <div class="d-flex mt-3">
                        <h5 class="card-title px-2 text-cener">${phone.brand}</h5>
                        <p class="card-text  px-2"> ${phone.name}</p>
                    </div>
                    <p class="card-text m-0 px-2"> ${release(phone.releaseDate)}</p>
            </div>
        </div>

        <div class="col mt-5">
            <table class="table table-striped ">
                <thead>
                    <tr>
                        <th scope="row" class="text-center">
                            <h4>Features</h4>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Chipset</th>
                        <td>${phone.mainFeatures.chipSet}</td>
                    </tr>
                    <tr>
                        <th scope="row">Display size</th>
                        <td>${phone.mainFeatures.displaySize}</td>
                    </tr>
                    <tr>
                        <th scope="row">Storage</th>
                        <td>${phone.mainFeatures.storage}</td>
                    </tr>
                    <tr>
                        <th scope="row">Memory</th>
                        <td>${phone.mainFeatures.memory}</td>
                    </tr>
                    <tr>
                        <th scope="row">Sensors</th>
                        <td>${phone.mainFeatures.sensors}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="row" class="text-center">
                            <h4>Network</h4>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Bluetooth</th>
                        <td>${phone.others.Bluetooth}</td>
                    </tr>
                    <tr>
                        <th scope="row">GPS </th>
                        <td>${phone.others.GPS}</td>
                    </tr>
                    <tr>
                        <th scope="row">NFC</th>
                        <td>${phone.others.NFC}</td>
                    </tr>
                    <tr>
                        <th scope="row">Radio</th>
                        <td>${phone.others.Radio}</td>
                    </tr>
                    <tr>
                        <th scope="row">USB</th>
                        <td>${phone.others.USB}</td>
                    </tr>
                    <tr>
                        <th scope="row">WLAN</th>
                        <td>${phone.others.WLAN}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
    featureContainer.appendChild(displayData)
}