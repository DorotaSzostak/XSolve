const people = [
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

function init(){
    makeRows();
    appendRows();
    pagination();
    TableSorter.makeSortable(document.getElementById("myTable"));
}

let rows = [];
$table = $('.table')

function makeRows(){
    people.forEach(function(person){
        var $row = $('<tr></tr>');
        $row.append($('<td></td>').text(person.id));
        $row.append($('<td></td>').text(person.firstName));
        $row.append($('<td></td>').text(person.lastName));
        $row.append($('<td></td>').text(person.dateOfBirth));
        $row.append($('<td></td>').text(person.company));
        $row.append($('<td></td>').text(person.note));
        
        rows.push({
            person: person,
            $element: $row
        });
    });
}

function appendRows(){
    var $tbody = $('<tbody></tbody>');
    rows.forEach(function(row){
        $tbody.append(row.$element);
    });
        $table.append($tbody);
}

///PAGINATION///
    function pagination(){
     $('tbody').after('<div id="nav"></div>');
        var rowsShown = 5;
        var rowsTotal = $(rows).length;
        var numPages = rowsTotal/rowsShown;
        for(var i = 0;i < numPages;i++) {
            var pageNum = i + 1;
            $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
        }
        $('tbody tr').hide();
        $('tbody tr').slice(0, rowsShown).show();
        $('#nav a:first').addClass('active');
        $('#nav a').bind('click', function(){

            $('#nav a').removeClass('active');
            $(this).addClass('active');
            var currPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('tbody tr').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
        });
    }

////FILETRING/////

$(".column-filter").on('change input', function() {
  var emptyFields = $('.column-filter').filter(function() {
    return $.trim(this.value) === "";
  });
  if (emptyFields.length == $(".column-filter").length) {
    $('table tbody tr').each(function() {
      $(this).show();
    });
  } else {
    var columnNumber = this.id;
    var enteredValue = $(this).val();
    console.log(enteredValue)
    $('table tbody tr:visible').each(function() {
      var str = $(this).find('td:eq(' + parseInt(columnNumber) + ')').text();
        
      if (str.toLowerCase().indexOf(enteredValue.toLowerCase()) == -1) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  }
});

////SORTING/////

var TableSorter = {
    makeSortable: function(table){
        // Store context of this in the object
        var _this = this;
        var th = table.tHead, i;
        th && (th = th.rows[0]) && (th = th.cells);

        if (th){
            i = th.length;
        }else{
            return; 
        }

        // Loop through every <th> inside the header
        while (--i >= 0) (function (i) {
            var dir = 1;

            // Append click listener to sort           
            th[i].addEventListener('click', function () {
                if(th[i].classList.contains('numberSort')){
                    _this.sortingNumber(table, i, (dir = 1 - dir));
                   } else if(th[i].classList.contains('nameSort')){
                          _this.sorting(table, i, (dir = 1 - dir));
                   } else {
                       _this.sortingDate(table, i, (dir = 1 - dir))
                   }
                });
        }(i));
    },
    sorting: function (table, col, reverse) {
        var tb = table.tBodies[0], 
        tr = Array.prototype.slice.call(tb.rows, 0),i;
        reverse = -((+reverse) || -1);

        tr = tr.sort(function (a, b) {
                return reverse * (
                a.cells[col].textContent.trim().localeCompare(
                b.cells[col].textContent.trim()
                )
                    )
            });
            for(i = 0; i < tr.length; ++i){
            tb.appendChild(tr[i]);
    }
        },
    sortingNumber: function(table,col,reverse){
        
        var tb = table.tBodies[0], 
        tr = Array.prototype.slice.call(tb.rows, 0),i;
        
        
        reverse = -((+reverse) || -1);
        
        tr = tr.sort(function(a,b){
                a = parseInt(a.cells[col].textContent);
                b = parseInt(b.cells[col].textContent);
            return reverse * (
                a - b
                )
        });
        for(i = 0; i < tr.length; ++i){
            tb.appendChild(tr[i]);
    }
    },
    sortingDate: function(table,col,reverse){
        var tb = table.tBodies[0], 
        tr = Array.prototype.slice.call(tb.rows, 0),i;
        
        
        reverse = -((+reverse) || -1);
        
        tr = tr.sort(function(a,b){
                a = new Date(a.cells[col].textContent);
                b = new Date(b.cells[col].textContent);
            return reverse * (
                a - b
                )
        });
        for(i = 0; i < tr.length; ++i){
            tb.appendChild(tr[i]);
    }
    }
};

window.onload = init;
