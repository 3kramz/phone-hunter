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

    phones.map(phone => {
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
                        <a href="#display-data" onclick="phoneDetails('${phone.slug}')" class="btn btn-outline-primary"> Explore More  </a>
                       
                      </div>
                    </div>
                </div>`

        displayContainer.append(card)
        document.getElementById('search-field').value = ''
        document.getElementById("display-data").textContent=''
    })

}
const phoneDetails = slug => {

    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(resp => resp.json())
        .then(data => console.log(data.data))
      
}
