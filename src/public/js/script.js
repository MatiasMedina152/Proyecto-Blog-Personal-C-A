
const contenedor = document.getElementById("container-row");
const btnCrear = document.getElementById("btn-newPost");
const myModal = new bootstrap.Modal(document.getElementById('myModal'));
const btnPublicar = document.getElementById("btn-publicar");
const form = document.getElementById("formulario");


let html="";
let option="";
let idForm = "";

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

document.addEventListener("click",(event) =>{
    if(event.target.matches("#btn-edit")){
        const article = event.target.closest(".col-12");
        const idArticle = article.dataset.id;
        const urlEdit = article.children[0].children[0].src;
        const titleEdit= article.children[0].children[1].children[0].textContent;
        const descriptionEdit= article.children[0].children[1].children[1].textContent;
        
        inputTitle.value = titleEdit;
        inputDescripcion.value = descriptionEdit;
        inputURL.value = urlEdit ;
        idForm = idArticle;
        option = "edit";
        btnPublicar.textContent = "Editar";
        myModal.show();
    }
}); 

    form.addEventListener("submit",(event) =>{
    event.preventDefault();

    if(option === "new"){
        const newPost = {
            title: inputTitle.value,
            description: inputDescripcion.value,
            url: inputURL.value

        };
        fetch("http://localhost:3000/api/tasks",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newPost)
        }).then(res =>{
            if(res.ok){
                alert("Post Creado");
               myModal.hide();
               location.reload(); 
            }
        })
    }
    if(option === "edit"){
        const editPost ={
            title: inputTitle.value,
            description: inputDescripcion.value,
            url: inputURL.value
        };
        fetch(`http://localhost:3000/api/tasks/${idForm}`,{
            method: "PUT",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editPost)
        }).then(res => {
            if(res.ok){
                alert("Post editado")
                myModal.hide();
               location.reload();
            }
        })
    }
});

 