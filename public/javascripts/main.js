window.onload=()=>{
    app.init();
}
let app = {
    init:function(){
        this.addEvents();
        this.loadContent();
    },
    addEvents: function(){
        document.postForm.addEventListener("submit",(event)=>{
            event.preventDefault();
            this.submitPost(event,this.addRow);
        });
    },
    addRow: function(data){
        
        let tbody=document.getElementsByClassName("posts")[0];
        let tr=document.createElement("tr");
        tr.innerHTML = `<td>${data._id}</td>
                        <td>${data.nombre}</td>
                        <td>${data.facultad}</td>
                        <td>${data.numero}</td>
                        <td>
                            <a href="#" class="delete">Delete</a>
                            <a href="#" class="update">Update</a>
                        </td>`;
        tr.getElementsByClassName("delete")[0].addEventListener("click",(event)=>{
            this.deletePost(event,data,tr,tbody);
        });
        tr.getElementsByClassName("update")[0].addEventListener("click",(event)=>{
            this.updatePost(tr,tbody,data);
        });
        tbody.appendChild(tr);
    },
    updatePost: function(tr,tbody,data){
        tr.innerHTML = `
                        <td colspan="3">
                            <form action="/api/Carrera-universitaria">
                                <input type="text" name="id" readonly value ="${data._id}">
                                <input type="text" name="nombre" value ="${data.nombre}">
                                <input type="text" name="facultad" value ="${data.facultad}">
                                <input type="text" name="numero" value ="${data.numero}">
                                <input type="submit" value="Save">
                                <input type="button" value="cancel">
                            </form>
                        </td>`;
        let form=tr.getElementsByClassName("form")[0];
        let deletePost=this.deletePost;
        let update=this.updatePost;

        form.addEventListener("submit",(event)=>{
            event.preventDefault();
            let dataForm={
                nombre:form.nombre.value,
                facultad:form.facultad.value,
                numero:form.numero.value
            };
            fetch('/api/Carrera-universitaria/'+data._id, {
                method:'PUT',
                body: JSON.stringify(dataForm),
                headers: {
                    'Content-Type':'application/json'
                }
            }).then(res=>res.json())
            .then(resData =>{
                if(resData.ok){
                    let trN= document.createElement("tr");
                    trN.innerHTML=`<td>${resData.old._id}</td>
                            <td>${dataForm.nombre}</td>
                            <td>${dataForm.facultad}</td>
                            <td>${dataForm.numero}</td>
                            <td>
                                <a href="#" class="delete">Delete</a>
                                <a href="#" class="update">Update</a>
                            </td>`;
                    tbody.replaceChild(trN,tr);
                    trN.getElementsByClassName("delete")[0].addEventListener("click",(event) =>{
                        deletePost(event,data,trN,tbody);
                    });
                    trN.getElementsByClassName("update")[0].addEventListener("click",(event) =>{
                        update(trN,tbody,data);
                    });
                }else{
                    document.getElementsByClassName("errors")[0].innerText="No se puede Actualizar";
                }
            });
        });
    },
    deletePost:(event,data,tr,tbody)=>{
        event.preventDefault();
        fetch('/api/Carrera-universitaria/'+ data._id,{
            method:'DELETE'
        }).then(res => {
            if(res.ok){
                tbody.removeChild(tr);
            }else{
                document.getElementsByClassName("errors")[0].innerText="No se pudo eliminar";
            }
        });
    },
    submitPost:(event,addRow)=>{
        event.preventDefault();
        let data={
            nombre: document.postForm.nombre.value,
            facultad: document.postForm.facultad.value,
            numero: document.postForm.numero.value
        };
        fetch('/api/Carrera-universitaria',{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>res.json())
        .then(_data=>{
            if(_data.ok){
                addRow(_data.guardado);
            }else{
                document.getElementsByClassName("errors")[0].innerText="No se pudo insertar";
            }
        });
    },
    loadContent: function(){
        fetch('/api/Carrera-universitaria',{
            method: 'GET'
        }).then(res=>{
            return res.json()
        })
        .then(data=>{
            if(data.ok){
                data.posts.forEach(element=>{
                    this.addRow(element);
                });
            }
        });
    }
}