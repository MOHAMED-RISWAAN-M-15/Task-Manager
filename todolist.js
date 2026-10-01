
let mytask=[];
const inputEl=document.getElementById("input-el");
const addBtn=document.getElementById("add-btn");
const ulEl=document.getElementById("ul-el");
const taskfromstorage=JSON.parse(localStorage.getItem("mytask"))
const indexfromlocal= JSON.parse(localStorage.getItem("index"))
const remainderEl=document.getElementById("remainder-para");

let finished=0
let checkedboxTask=JSON.parse(localStorage.getItem("checkedboxTask"))||[]
finished=checkedboxTask.filter(Boolean).length


function remainder(length,finished=0){
     remainderEl.innerHTML=`${length} Task      |       ${finished} Complete`
     console.log(finished)
     if(mytask.length===0){
        ulEl.innerHTML=`<pre id="ul-remender">Add   new    task  to  enter</pre>`
    }
    
    }
if(taskfromstorage){
    if(indexfromlocal!==null){
        mytask=taskfromstorage
        render(mytask,indexfromlocal)
        
    }
   else{
    mytask=taskfromstorage
    render(mytask)
   }
   remainder(mytask.length,finished)
}


function render(task,index_value=null,editinputbtn=null){
    console.log("renderexecute")
    let listitem="";
    for (let i=0;i<task.length;i++){
        if(i===index_value && editinputbtn ){
            task[i]=editinputbtn
            listitem+=`<li> 
                <input type="checkbox" class="checkbox-btn"
                 data-index=${i} ${checkedboxTask[i]?"checked":""}>
                ${task[i]}
                <button class="edit-btn" data-index=${i}>Edit</button>  
                <button class="delete-btn" data-index=${i}>delete</button> 
                </li>`;
        }
        else if(i===index_value){
            listitem+=`<div class="contain-edit-input"><li>
            <input type="text" placeholder="ENTER A TASK" id="edit-input-el" value=${task[i]}>

            <button class="done-btn" data-index=${i}>done</button>
            <button class="cancel-btn" data-index=${i}>cancel</button>
            </li>
            </div>`;
            


        }
        else{
            listitem+=`<li> 
                <input type="checkbox" class="checkbox-btn"
                 data-index=${i} ${checkedboxTask[i]?"checked":""}>
                ${task[i]}
                <button class="edit-btn" data-index=${i}>Edit</button>  
                <button class="delete-btn" data-index=${i}>delete</button> 
                </li>`;
                

        }
        
    }
    ulEl.innerHTML=listitem
    console.log(ulEl)
    const deleteBtn=document.querySelectorAll(".delete-btn")

    deleteBtn.forEach(function(deletebtn,){
        deletebtn.addEventListener("click",function(){
            console.log("execute del def");
            const index=Number(deletebtn.dataset.index)
            let temp=JSON.parse(localStorage.getItem("mytask"))
            console.log(temp,"del El:",temp[index])
            temp.splice(index,1)
            checkedboxTask.splice(index,1)
            localStorage.setItem("mytask",JSON.stringify(temp))
            localStorage.setItem("checkedboxTask",JSON.stringify(checkedboxTask))
            mytask=temp
            finished=checkedboxTask.filter(Boolean).length
            render(mytask)
            remainder(mytask.length,finished)
            
    })
})
    const editBtn=document.querySelectorAll(".edit-btn")

    editBtn.forEach(function(editbtn){
        editbtn.addEventListener("click",function(){
            console.log("execute edit def");
            const index=Number(editbtn.dataset.index)
            let temp=JSON.parse(localStorage.getItem("mytask"))
            console.log(temp,"edit El:",temp[index])
            
             
             mytask=temp
             render(mytask,index)
             localStorage.setItem("mytask",JSON.stringify(mytask))
             localStorage.setItem("index",JSON.stringify(index))
              })
         })
    const donebtn=document.querySelectorAll(".done-btn")
   
    donebtn.forEach(function(donebtn){
        donebtn.addEventListener("click",function(){
            console.log("execute donebtn")
            const index=Number(donebtn.dataset.index)
            const editinputEl=document.getElementById("edit-input-el").value;
            
            if(editinputEl){
                let temp=JSON.parse(localStorage.getItem("mytask"))
                mytask=temp
                render(mytask,index,editinputEl)
                localStorage.setItem("mytask",JSON.stringify(mytask))
                localStorage.removeItem("index")
            }
            
             
        })
    })
    const cancelbtn=document.querySelectorAll(".cancel-btn")
    cancelbtn.forEach(function(cancelbtn){
        cancelbtn.addEventListener("click",function(){
            console.log("execute cancel")
            let temp=JSON.parse(localStorage.getItem("mytask")) 
            mytask=temp
            localStorage.removeItem("index")
            render(mytask)



        })
    })
    const checkboxEl=document.querySelectorAll(".checkbox-btn")
    checkboxEl.forEach(function(checkboxEl){
        checkboxEl.addEventListener("change",function(){
            console.log("execute checkbox")
            let temp=JSON.parse(localStorage.getItem("mytask"))
            const index=Number(checkboxEl.dataset.index)
            mytask=temp
            checkedboxTask[index]=checkboxEl.checked
            finished=checkedboxTask.filter(Boolean).length
            localStorage.setItem("checkedboxTask",JSON.stringify(checkedboxTask))
            remainder(mytask.length,finished)

        })
    })
    
}





addBtn.addEventListener("click",function(){
    if(inputEl.value){
        console.log("execute add def");
        mytask.push(inputEl.value);
        checkedboxTask.push(false)
        inputEl.value="";
        localStorage.setItem("mytask",JSON.stringify(mytask))
        localStorage.setItem("checkedboxTask",JSON.stringify(checkedboxTask))
        render(mytask);
        remainder(mytask.length,finished)
    }

    
})
