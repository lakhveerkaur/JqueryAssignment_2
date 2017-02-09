var j = 0,
data1 = [],
i = 0;
var $tab=$('#tab');
var $details=$('#details');
var $display=$('#display');
var Name=$('#name');
var $empname=$('#emp');
var $age=$('#age');
var $company=$('#company');
var $gender=$('#gender');
var $email=$('#email');
var searchTab;
$appendData = function(data) {
// append the all data of 20 rocords to table	  
for (j = i; i < j + 20; i++) {
	
 	 $tab.append('<tr><td><input class="ids" value='+data[i].id+'></td>'
		+'<td><input class="emname" type="text" value="'+data[i].name+'"></td>'
		+'<td><input class="age" value='+data[i].age+'></td>'
		+'<td><input class="company" value='+data[i].company+'></td>'
		+'<td><input class="gender" value='+data[i].gender+'></td>'
		+'<td><input class="email" value='+data[i].email+'></td><td>'
		+'<button class="update" data-id='+data[i].id+'>Update</button>'
		+'</td><td><button class="delete"data-id='+data[i].id+'>Delete</button></td></tr>');
	
  }

};


$(document).ready(function(){
	//$('button').css('background-color','red');

$.ajax({
type:'GET',
url:'http://localhost:3000/People',
success:function(data){
	data1=data;
	$appendData(data1);
	}
});

});

//searching
$('#search').on('click',function(){
var name= Name.val();
//console.log('click');
var employeename='http://localhost:3000/People/?name='+name;

$.ajax({
		type:'GET',
		url:employeename,
		success:function(employeename){
		var searchTab = '<table border="1";><tr><th><strong>Id</strong></th><th><strong>Name</strong></th>'
		+'<th><strong>Age</strong></th><th><strong>Company</strong></th>'
		+'<th><strong>Gender</strong></th><th><strong>Email</strong></th>'
		+'<th colspan="2"><strong>Action</strong></th></tr>';
		
		$.each(employeename, function(index, info) {
		console.log(info.name);
		searchTab += '<tr><td><input class="ids" value='+info.id+'></td>'
		+'<td><input class="emname" type="text" value="'+info.name+'"></td>'
		+'<td><input class="age" value='+info.age+'></td>'
		+'<td><input class="company" value='+info.company+'></td>'
		+'<td><input class="gender" value='+info.gender+'></td>'
		+'<td><input class="email" value='+info.email+'></td><td>'
		+'<button class="update" data-id='+info.id+'>Update</button>'
		+'</td><td><button class="delete" data-id='+info.id+'>Delete</button></td></tr>'		                                    
		});
	$('#details').html(searchTab);
	}
});
});


//edit row
$(document).on('click','.update',function(){
	
		console.log("click");
		var currentlin = $(this).closest("tr");

		var edited={
		id:currentlin.find('input.ids').val(),
		name:currentlin.find('input.emname').val(),
		age:currentlin.find('input.age').val(),
		company:currentlin.find('input.company').val(),
		gender:currentlin.find('input.gender').val(),
		email:currentlin.find('input.email').val(),
		};
		$.ajax({
		type:'PUT',
		url:'http://localhost:3000/People/'+$(this).attr('data-id'),
		data:edited,
		success:function(edi){
			//console.log(edi.agez);
        currentlin+='<tr><td><input class="ids" value='+edi.id+'></td><td>'+edi.name+'</td><td>'+edi.age+'</td><td>'
		+edi.company+'</td><td>'+edi.gender+'</td><td>'+edi.email+'</td><td>'
		+'<button class="update">Update</button></td><td><button class="delete">Delete</button></td></tr>'
 		 
		}

	});

	
});	
//delete data
$(document).on('click','.delete',function(){
	
	//console.log("delete");
	var $currentRow = $(this).closest("tr");
	
	$.ajax({
    type:'DELETE',
    url:'http://localhost:3000/People/' +$(this).attr('data-id'),
    success:function(){
   	$currentRow.remove();

     }

	});
	  

});	


//add information
$('#add').on('click',function(){
		var employee={
		name:$empname.val(),			
		age:$age.val(),							
		company:$company.val(),
		gender:$gender.val(),
		email:$email.val()	
									
		};
		$.ajax({
			type:'POST',
			url:'http://localhost:3000/People',
			data:employee,
			success:function(Addemployee){
				$tab.append('<tr><td>'+Addemployee.id+'</td><td>'+Addemployee.name+'</td><td>'+Addemployee.age+'</td><td>'
				+Addemployee.company+'</td><td>'+Addemployee.gender+'</td><td>'+Addemployee.email+'</td><td>'
				+'<button class="update">Update</button></td><td><button class="delete">Delete</button></td></tr>');
		 		                                  

    alert('Information added successfully');

   }
  });
});

$(window).scroll(function() {
    if ($(document).height() - $(window).height() == $(window).scrollTop()) {
    	//console.log(i);
      $appendData(data1);
    }

});



