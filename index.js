var ul=document.getElementById('view-item');
ul.addEventListener('click',deleteItems);
ul.addEventListener('click',editItems);
document.addEventListener('DOMContentLoaded',loadItems);

function deleteItems(e)
{
    if(e.target.classList.contains('delete-items'))
    {
        ul.removeChild(e.target.parentElement);
        localStorage.removeItem(e.target.parentElement.innerHTML.split('-')[0]);
    }
}

function editItems(e)
{
    if(e.target.classList.contains('edit-items'))
    {
        ul.removeChild(e.target.parentElement);
        let records=JSON.parse(localStorage.getItem(e.target.parentElement.innerHTML.split('-')[0]));
        document.forms['view-Expenses']['item'].value=records.Item;
        document.forms['view-Expenses']['quantity'].value=records.Quantity;
        document.forms['view-Expenses']['amount'].value=records.Amount;
        localStorage.removeItem(e.target.parentElement.innerHTML.split('-')[0]);

    }
}

function loadItems(e)
{
    for(x in localStorage){
        if(x=='length')
            break;
        var value = localStorage.getItem(x);
        console.log(value);
        value = JSON.parse(value);
        var li = createNewLi(value);

        ul.append(li);
    }
}
function createNewLi(record)
{
    var li=document.createElement('li');
    li.id='record-list';
    li.appendChild(document.createTextNode(record.Item+'-'));
    li.appendChild(document.createTextNode(record.Quantity+'-'));
    li.appendChild(document.createTextNode(record.Amount));
    var del=document.createElement('button');
    del.id='del-item';
    del.className='delete-items';
    del.setAttribute('value','delete');
    del.appendChild(document.createTextNode('delete'));
    li.appendChild(del);
    var edit=document.createElement('button');
    edit.id='edit-item';
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

    localStorage.setItem(item_records.Item, JSON.stringify(item_records));

    var li=createNewLi(item_records);

    ul.append(li);

    document.forms['view-Expenses'].reset();
}