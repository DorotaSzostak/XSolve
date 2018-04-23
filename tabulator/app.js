var people = [
  {
    "id": 1,
    "firstName": "Jan",
    "lastName": "Kowalski",
    "dateOfBirth": "1.7.1990 11:35",
    "company": "XSolve",
    "note": 90
  },
  {
    "id": 4,
    "firstName": "Justyna",
    "lastName": "Kowalska",
    "dateOfBirth": "4.02.1976 14:37",
    "company": "XSolve",
    "note": 91
  },
  {
    "id": 2,
    "firstName": "Krzysztof",
    "lastName": "Krawczyk",
    "dateOfBirth": "28.10.1950 2:15",
    "company": "Chilid",
    "note": 27
  },
  {
    "id": 3,
    "firstName": "Bogusław",
    "lastName": "Linda",
    "dateOfBirth": "03.01.1963 23:10",
    "company": "XSolve",
    "note": 50
  },
  {
    "id": 5,
    "firstName": "Krzysztof",
    "lastName": "Kononowicz",
    "dateOfBirth": "10.10.1910 18:00",
    "company": "Chilid",
    "note": 77
  },
  {
    "id": 6,
    "firstName": "Maryla",
    "lastName": "Rodowicz",
    "dateOfBirth": "29.02.1936 11:35",
    "company": "XSolve",
    "note": 8
  }
]

//FILTERING FUNCTION FOR NOTE COLUMN

var minMaxFilterEditor = function(cell, onRendered, success, cancel, editorParams){

    var container = $("<span></span>")

    //create and style inputs
    var start = $("<input type='number' placeholder='Min' min='0' max='100'/>");
    var end = $("<input type='number' placeholder='Max' min='0' max='100'/>");

    container.append(start).append(end);

    var inputs = $("input", container);

    function buildValues(){
        return {
            start:start.val(),
            end:end.val(),
        };
    }
    inputs.css({
        "padding":"4px",
        "width":"50%",
        "box-sizing":"border-box",
    })
    .val(cell.getValue());
    
    
    //submit new value on enter
    inputs.on("keyup", function(e){
        if(e.keyCode == 13){
            success(buildValues());
        }

        if(e.keyCode == 27){
            cancel();
        }
    });

    return container;
 }

//custom max min filter function
function minMaxFilterFunction(headerValue, rowValue, rowData, filterParams){

        if(rowValue){
            if(headerValue.start != ""){
                if(headerValue.end != ""){
                    return rowValue >= headerValue.start && rowValue <= headerValue.end;
                }else{
                    return rowValue >= headerValue.start;
                }
            }else{
                if(headerValue.end != ""){
                    return rowValue <= headerValue.end;
                }
            }
        }

    return false;
}


//APLLYING TABLE, FILTERS AND SORTING

$("#example-table").tabulator({
    data: people,
    layout:"fitColumns", 
    pagination:"local",
    paginationSize:5,
    columns:[ 
        {title:"ID", field:"id", headerFilter:"input"},
        {title:"Name", field:"firstName", headerFilter:"input"},
        {title:"Last Name", field:"lastName", headerFilter:"input"},
        {title:"Date Of Birth", field:"dateOfBirth",width:300, sorter:"date",  headerFilter:"input"},
        {title:"Company", field:"company",  editor:"select", editorParams:{"xsolve":"XSolve", "chilid":"Chilid"}, headerFilter:true, headerFilterParams:{"XSolve":"XSolve", "Chilid":"Chilid"}},
        {title:"Note", field:"note",sorter:"number", headerFilter:minMaxFilterEditor, headerFilterFunc:minMaxFilterFunction},
    ]
});

//PAGINATION Set initial page
$("#example-table").tabulator("setPage", 1);


