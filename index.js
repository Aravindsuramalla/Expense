var ul=document.getElementById('view-item');
ul.addEventListener('click',deleteItems);
ul.addEventListener('click',editItems);
document.addEventListener('DOMContentLoaded',loadItems);
let EditListId;
function deleteItems(e)
{
    /*if(e.target.classList.contains('delete-items'))
    {
        ul.removeChild(e.target.parentElement);
        localStorage.removeItem(e.target.parentElement.innerHTML.split('-')[0]);
    }*/
    if(e.target.classList.contains('delete-items'))
    {
        //console.log(e.target.parentElement.innerHTML.split('-')[0]);
        let li=e.target.parentElement;
        let deleteListId=e.target.id.substring(7,e.target.id.length);
        
        console.log(deleteListId, li, e.target)

        axios.delete(`https://crudcrud.com/api/8b9c268c247048d1a4f54bc95b6ecbbb/UserData/${deleteListId}`)
        .then((response)=>console.log(response))
        .catch((err)=>console.log(err))

        ul.removeChild(li);
        //ul.removeChild(e.target.parentElement);
        //localStorage.removeItem(e.target.parentElement.innerHTML.split('-')[0]);
    }
}
function editExpense(e)
{
    let name=document.getElementById('item').value;
    let email=document.getElementById('quantity').value;
    let number=document.getElementById('amount').value;
    let updated_data={
        'item': item,
        'quantity': quantity,
        'amount': amount,
    };
    console.log(EditListId)
    axios.put(`https://crudcrud.com/api/ad165a367ab84efbb185a273f70aae44/UserData/${EditListId}`,updated_data)
    .then(res=>{

    console.log(res);
    var li=createNewLi(updated_data)
    //console.log(res.data);
    ul.append(li);
    update.style.display='none';

    let sub=document.getElementById('add-expense');
    sub.style.display='block';
    document.forms['view-expenses'].reset();
})

}
function editItems(e)
{
    /*if(e.target.classList.contains('edit-items'))
    {
        ul.removeChild(e.target.parentElement);
        let records=JSON.parse(localStorage.getItem(e.target.parentElement.innerHTML.split('-')[0]));
        document.forms['view-Expenses']['item'].value=records.Item;
        document.forms['view-Expenses']['quantity'].value=records.Quantity;
        document.forms['view-Expenses']['amount'].value=records.Amount;
        localStorage.removeItem(e.target.parentElement.innerHTML.split('-')[0]);

    }*/
    if(e.target.classList.contains('edit-items'))
    {
        //console.log(e.target.parentElement.innerHTML.split('-')[0]);
        ul.removeChild(e.target.parentElement);
        
        /**let item=JSON.parse(localStorage.getItem(e.target.parentElement.innerHTML.split('-')[0]));
        document.forms['user-data']['name'].value=item.name;
        document.forms['user-data']['email'].value=item.email;
        document.forms['user-data']['Phone'].value=item.number;
        document.forms['user-data']['tfc'].value=item.Date;
        document.forms['user-data']['time'].value=item.Time;
        localStorage.removeItem(e.target.parentElement.innerHTML.split('-')[0]);**/

        EditListId=e.target.id.substring(8,e.target.id.length);

        axios.get(`https://crudcrud.com/api/ad165a367ab84efbb185a273f70aae44/UserData/${EditListId}`)
        .then(res=>{

            
            update.style.display='block';
        document.forms['user-data']['item'].value=res.data.name;
        document.forms['user-data']['quantity'].value=res.data.email;
        document.forms['user-data']['amount'].value=res.data.number;
        })

        let sub=document.getElementById('add-expense');
        sub.style.display='none';
}
}
function loadItems(e)
{
    /*for(x in localStorage){
        if(x=='length')
            break;
        var value = localStorage.getItem(x);
        console.log(value);
        value = JSON.parse(value);
        var li = createNewLi(value);

        ul.append(li);
    }*/
    axios.get("https://crudcrud.com/api/ad165a367ab84efbb185a273f70aae44/UserData")
    .then((res)=>{
                    console.log(res)
                    for(var i=0;i<res.data.length;i++)
                    {
                        var li=createNewLi(res.data[i])
                        console.log(res.data[i]);
                        ul.append(li);
                    }
    })
    .catch((err)=>console.log(err))
}
function createNewLi(record)
{
    var li=document.createElement('li');
    li.id='record-list';
    li.appendChild(document.createTextNode(record.Item+'-'));
    li.appendChild(document.createTextNode(record.Quantity+'-'));
    li.appendChild(document.createTextNode(record.Amount));
    var del=document.createElement('button');
    del.id=`delitem${value._id}`;
    del.className='delete-items';
    del.setAttribute('value','delete');
    del.appendChild(document.createTextNode('delete'));
    li.appendChild(del);
    var edit=document.createElement('button');
    edit.id=`edititem${value._id}`;
    edit.className='edit-items';
    edit.setAttribute('value','Edit');
    edit.appendChild(document.createTextNode('Edit'));
    li.appendChild(edit);

    return li;
}
function viewExpense(e)
{
    e.preventDefault();
    let item=document.getElementById('item').value;
    let quantity=document.getElementById('quantity').value;
    let amount=document.getElementById('amount').value;

    let item_records={
        'Item': item,
        'Quantity': quantity,
        'Amount': amount
    };

    /*localStorage.setItem(item_records.Item, JSON.stringify(item_records));

    var li=createNewLi(item_records);

    ul.append(li);*/
    let result;
    axios.post("https://crudcrud.com/api/ad165a367ab84efbb185a273f70aae44/UserData",item_records)
    .then((res)=>{result=res.data
        console.log(result)
     

        var li = createNewLi(result);
           
        ul.append(li);
    })
    .catch((err)=>console.log(err));

    document.forms['view-Expenses'].reset();
}