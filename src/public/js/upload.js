const form = document.querySelector('#uploadForm')
const btnSubmit = document.querySelector("#btnsubmit");
const image = document.querySelector("#myFiles");

const sendFiles = async () => {
    // Object 
    const myFiles = document.getElementById('myFiles').files

    const fD = new FormData()

    Object.keys(myFiles).forEach(key => {
        fD.append(myFiles.item(key).name, myFiles.item(key))
    })

    const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: fD
    })

    const json = await response.json()

    const h2 = document.querySelector('h2')
    h2.textContent = `${json?.status}`

    const h3 = document.querySelector('h3')
    h3.textContent = json?.message

    if (response.status == 200) {
        form.reset();
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    sendFiles()
});