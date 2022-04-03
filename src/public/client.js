// function to fetch data
function getData(nameOfRover, root) {

        root.innerHTML = load()
    fetch(`http://localhost:3000/rovers/${nameOfRover}`).then(res => res.json()).then((data) => {
        root.innerHTML = addRoverInformation(data)
        root.innerHTML += addPhotoGallery(data)             
    })
}

function load() {
    return /*html*/ `<h2>Loading...</h2>`
}

function addRoverInformation(data) {
    
    var { id, name, landing_date, launch_date, status } = data.photos[0].rover
    var html = /*html*/ `
        <div class='rover'>
            <p><b>id: </b>${id}</p>
            <p><b>name: </b>${name}</p>
            <p><b>landing date: </b>${landing_date}</p>
            <p><b>launch date: </b>${launch_date}</p>
            <p><b>status: </b>${status}</p>
        </div>
    `
    return html
}

function addPhotoGallery(data) {

    var photos = data.photos.map((each) => {
        return (  /*html*/ `
            <div>
                <img src=${each.img_src}>
                <p><b>id: </b>${each.id}</p>
                <p><b>camera: </b>${each.camera.full_name}</p>
                <p><b>earth date captured: </b>${each.earth_date}</p>
            </div>
            `)
    })
    
    var html = photos.reduce((accumulator, currentValue) => {

        return accumulator + currentValue

    }, '<div class="gallery">')
    
    return html + '</div>'
}

// UI
const UIbuttons = document.querySelectorAll('.roversOptions button')
const rootElement = document.querySelector('#root')

UIbuttons.forEach((each) => {
    each.addEventListener('click', (event) => {
        var buttonName = event.target.getAttribute('name')
        getData(buttonName, rootElement)
    })
})