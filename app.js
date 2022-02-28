const searchBtn = document.getElementById("search-btn")


searchBtn.addEventListener("click", () => {
    const searchValue = document.getElementById('search-field').value
    
    fetch(` https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
        .then(res => res.json())
        .then(data => display(data.data))

})

const display = phones => {

    phones.map(phone => {

       console.log(phone)
    })
  
}