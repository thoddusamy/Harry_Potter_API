let div = document.createElement('div')
div.className = 'main-container'

// ------------- Creating HTML elements -------------
div.innerHTML = `
<header>
<div class="heading">
  <h1>Harry Potter Character's API</h1>
  <p>Search your favourite character name</p>
</div>
</header>

<section>
<div class="left-content">
  <h3>Popular Characters</h3>
  <p>Harry potter</p>
  <p>Hermione granger</p>
  <p>Ron weasley</p>
  <p>Draco malfoy</p>
  <p>Minerva mcGonagall</p>
  <p>Cedric diggory</p>
  <p>Severus snape</p>
  <p>Rubeus hagrid</p>
  <p>Neville longbottom</p>
  <p>Lord voldemort</p>
</div>

<div class="right-content">
  <div class="search-box">
    <input type="search" id="input-txt" placeholder="Search your character name...">
    <button type="button" onclick="check()"><i class="fa-solid fa-magnifying-glass"></i> &nbspSearch</button>
  </div>

  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    Enter a character name text capitalize format!!! <strong>Ex: Harry Potter✅ Don't: harrypotter❌</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <div class="response-content">
    <div class="image">

    </div>

    <div class="response-data">
      <p class="char-name"></p>
      <p class="org-name"></p>
      <p class="char-dob"></p>
      <p class="char-gen"></p>
      <p class="char-eyeclr"></p>
      <p class="char-hairclr"></p>
      <p class="char-wand"></p>
      <p class="char-house"></p>
    </div>
  </div>
</div>

</section>`

document.body.prepend(div)

// ------------- input text check function -------------

function check() {
  let inputData = document.getElementById('input-txt').value
  if (inputData == '') {
    alert(`Enter a Character Name`)
  } else {
    search()
  }
}

// ------------- fetch data function -------------

async function search() {
  try {
    let req = await fetch('https://hp-api.herokuapp.com/api/characters')
    let req1 = await req.json()

    let inputData = document.getElementById('input-txt').value
    let charNameViaInput = req1.filter((char) => char.name == `${inputData}`)

    var charImg = charNameViaInput.map((charImg) => charImg.image)
    document.querySelector(
      '.image'
    ).innerHTML = `<img src="${charImg}" width="200" height="260" class="char-img" alt="character-image">`

    let charName = charNameViaInput.map((name) => name.name)
    document.querySelector(
      '.char-name'
    ).innerText = `Character Name: ${charName}`

    let orgName = charNameViaInput.map((name) => name.actor)
    document.querySelector('.org-name').innerText = `Original Name: ${orgName}`

    let charDob = charNameViaInput.map((name) => name.dateOfBirth)
    document.querySelector('.char-dob').innerText = `Date of Birth: ${charDob}`

    let charGen = charNameViaInput.map((name) => name.gender)
    document.querySelector('.char-gen').innerText = `Gender: ${charGen}`

    let charEyeClr = charNameViaInput.map((name) => name.eyeColour)
    document.querySelector(
      '.char-eyeclr'
    ).innerText = `Eye color: ${charEyeClr}`

    let charHairClr = charNameViaInput.map((name) => name.hairColour)
    document.querySelector(
      '.char-hairclr'
    ).innerText = `Hair color: ${charHairClr}`

    let charWand = charNameViaInput.map((name) => name.wand.core)
    document.querySelector('.char-wand').innerText = `Wand: ${charWand}`

    let charHouse = charNameViaInput.map((name) => name.house)
    document.querySelector('.char-house').innerText = `House: ${charHouse}`
  } catch (error) {
    console.log(error)
  }
}
