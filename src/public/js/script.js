
const contenedor = document.getElementById("container-row")
const btnCrear = document.getElementById("btn-newPost")
const myModal = new bootstrap.Modal(document.getElementById('myModal'))
const btnPublicar = document.getElementById("btn-publicar")


let html=""
let option=""

const inputTitle = document.getElementById("inputTitle")
const inputDescripcion = document.getElementById("inputDescripcion")
const inputURL= document.getElementById("inputURL")

btnCrear.addEventListener("click", () =>{
    option = "new"
    btnPublicar.textContent = "Publicar"
    inputTitle.value = ""
    inputDescripcion.value = ""
    inputURL.value = "" 
    myModal.show();
})

document.addEventListener("click", (event) =>{
    if(event.target.matches("#btn-delete")){
        const article = event.target.closest(".col-12")
        const idArticle = article.dataset.id

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/api/tasks/${idArticle}`,{
                    method: "DELETE"
                }).then(res =>{
                    if(res.ok){
                        article.remove()
                    }
                }).catch(err =>{
                    console.error(err)
                })
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
      
       
    }
})

console.log(contenedor)
fetch("http://localhost:3000/api/tasks")
    .then(res => res.json())
    .then(data =>{
        data.forEach(post => {
            html += `
            <article class="col-12 d-flex justify-content-center" data-id="${post.id}">

            <div class="card" style="width: 40rem;" id="Card">
                <img src="${post.url}" class="card-img-top" alt="Una imagen">
                <div class="card-body">
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${post.description}</p>
                  <div>
                    <a  class="btn btn-danger" id="btn-delete">Eliminar</a>
                    <a  type="" class="btn btn-primary" id="btn-edit">Editar Post</a>
                  </div>
                </div>
              </div>
            
            </article>
            `
            contenedor.innerHTML = html
        });
    } )

