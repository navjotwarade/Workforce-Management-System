

 
function appendexprow(){
	
/*	var current_row = parseInt(document.getElementById('exp_row_cnt').value);
	//alert(current_row);
	last_exp_row_cnt
	var new_row_no=  current_row+1;
	//alert(new_row_no);
*/	
	var last_exp_row_cnt = parseInt(document.getElementById('last_exp_row_cnt').value);
	console.log("last_exp_row_cnt" + last_exp_row_cnt);
	var total_cnt  = parseInt(document.getElementById('exp_row_cnt').value);
	var new_row_no=  last_exp_row_cnt+1;
    var exprow = "<div class='row' id='exp_row_"+new_row_no+"'> \
    <div class='col-xs-6 col-sm-8 col-md8'> \
        <div class='well well-sm'> \
          <div class='row'> \
             <center><legend>Experience "+new_row_no+"</legend></center> \
             <div class='form-group'> \
                <label class='col-sm-2 control-label' for='companyName_1'>CompanyName:</label> \
                <div class='col-sm-9'> \
                  <input type='text' ng-model='companyName_"+new_row_no+"' name='companyName_"+new_row_no+"' id='companyName_"+new_row_no+"' placeholder='' class='form-control'>\
                </div>\
              </div>\
              <div class='form-group'> \
                <label class='col-sm-2 control-label' for='inputTitle_"+new_row_no+"'>Title:</label>\
                <div class='col-sm-9'>\
                  <input type='text' ng-model='inputTitle_"+new_row_no+"' name='inputTitle_"+new_row_no+"' id='inputTitle_"+new_row_no+"' placeholder='' class='form-control'>\
                </div>\
              </div>\
              <div class='form-group'>\
                <label class='col-sm-2 control-label' for='inputLocation_1'>Location:</label>\
                <div class='col-sm-9'>\
                  <input type='text' ng-model='inputLocation_"+new_row_no+"' id='inputLocation_"+new_row_no+"' name='inputLocation_"+new_row_no+"' placeholder='' class='form-control'>\
                </div>\
              </div>\
              <div class='form-group'>\
                <label class='col-sm-2 control-label' for='startdate_"+new_row_no+"'>Start Date:</label>\
               <div class='col-sm-9'>\
                  <input type='text' ng-model='startdate_"+new_row_no+"' name='startdate_"+new_row_no+"' id='startdate_"+new_row_no+"'  placeholder='YYYY-MM-DD' pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}' required class='form-control'>\
                </div>\
              </div>\
              <div class='form-group'>\
                <label class='col-sm-2 control-label' for='enddate_"+new_row_no+"'>End Date:</label>\
                <div class='col-sm-9'>\
                  <input type='date' ng-model='enddate_"+new_row_no+"' name='enddate_"+new_row_no+"' id='enddate_"+new_row_no+"'  placeholder='YYYY-MM-DD' pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}' required class='form-control'>\
                </div>\
                </div>\
                <label class='col-sm-2 control-label' for='inputDescription_"+new_row_no+"' style='margin-top: 10px;'>Description:</label>\
                <div class='col-sm-9'>\
                  <textarea class='field span5' ng-model='inputDescription_"+new_row_no+"' name='inputDescription_"+new_row_no+"' id='inputDescription_"+new_row_no+"'  rows='5'  style='width: 100%; '></textarea>\
                </div>\
                <input type='button' class='bfloatr'  onclick='delexprow("+new_row_no+")' value='Delete Experience' />\
              </div>\
          </div>\
        </div>";
    

/*    
    	$(exprow).insertAfter('#exp_row_'+current_row);
    document.getElementById('exp_row_cnt').value = new_row_no;
    var elem= document.getElementById('#exp_row_'+new_row_no);
    */


    $(exprow).insertAfter('#exp_row_'+last_exp_row_cnt);
    //document.getElementById('prj_row_cnt').value = new_row_no;

    document.getElementById('last_exp_row_cnt').value = new_row_no;
    document.getElementById('exp_row_cnt').value = total_cnt+1;
	
	
}

function delexprow(row){
	
/*	
	var current_row = parseInt(document.getElementById('exp_row_cnt').value);
	//alert(current_row);
	$('#exp_row_'+current_row).remove();
	if(current_row>1){
	document.getElementById('exp_row_cnt').value = current_row-1;
	}
	*/
	var total_cnt = parseInt(document.getElementById('exp_row_cnt').value);
	var last_exp_row_cnt = parseInt(document.getElementById('last_exp_row_cnt').value);
	
	
	$('#exp_row_'+row).remove();
	if(last_exp_row_cnt == row){
		last_exp_row_cnt = last_exp_row_cnt-1;
	}
	
	total_cnt =  total_cnt-1;
	document.getElementById('exp_row_cnt').value =total_cnt;
	if(total_cnt == 1){
		last_exp_row_cnt = 1;
	}
	document.getElementById('last_exp_row_cnt').value = last_exp_row_cnt;
	console.log("totalcount " + document.getElementById('exp_row_cnt').value);
	console.log("last_exp_row_cnt  " + document.getElementById('last_exp_row_cnt').value);
}

function addedurow(){
	
/*	var current_row = parseInt(document.getElementById('edu_row_cnt').value);
	//alert(current_row);
	var new_row_no=  current_row+1;*/
	
	var last_edu_row_cnt = parseInt(document.getElementById('last_edu_row_cnt').value);
	console.log("llast_edu_row_cnt" + last_edu_row_cnt);
	var total_cnt  = parseInt(document.getElementById('edu_row_cnt').value);
	var new_row_no=  last_edu_row_cnt+1;
	var edu_row ="<div class='row' id='edu_row_"+new_row_no+"'>\
	    <div class='col-xs-6 col-sm-8 col-md8'>\
	        <div class='well well-sm'>\
	          <div class='row'>\
	             <center><legend>Education "+new_row_no+"</legend></center>\
	             <div class='form-group'>\
	                <label class='col-sm-2 control-label' for='school_"+new_row_no+"'>School:</label>\
	                		<div class='col-sm-9'>\
	                <input type='text' ng-model='school_"+new_row_no+"' name='school_"+new_row_no+"' id='school_"+new_row_no+"' placeholder='' class='form-control'>\
	                </div>\
	              </div>\
	              <div class='form-group'>\
	                <label class='col-sm-2 control-label' for='field_"+new_row_no+"'>Field:</label>\
	                <div class='col-sm-9'>\
	                  <input type='text' ng-model='field_"+new_row_no+"' name='field_"+new_row_no+"' id='field_"+new_row_no+"' placeholder='' class='form-control'>\
	                </div>\
	              </div>\
	              <div class='form-group'>\
	                <label class='col-sm-2 control-label' for='level_"+new_row_no+"'>Degree level:</label>\
	                <div class='col-sm-9'>\
	                  <input type='text' ng-model='level_"+new_row_no+"' name='level_"+new_row_no+"'  id='level_"+new_row_no+"' placeholder='' class='form-control'>\
	                </div>\
	              </div>\
	              <div class='form-group'>\
	                <label class='col-sm-2 control-label' for='startdate1_"+new_row_no+"'>Start Date:</label>\
	                <div class='col-sm-9'>\
	                  <input type='date' ng-model='startdate1_"+new_row_no+"' name='startdate1_"+new_row_no+"' id='startdate1_"+new_row_no+"'  placeholder='YYYY-MM-DD' pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}' required class='form-control'>\
	                </div>\
	              </div>\
	                <div class='form-group'>\
	                <label class='col-sm-2 control-label' for='enddate1_"+new_row_no+"'>End Date:</label>\
	                <div class='col-sm-9'>\
	                  <input type='date' ng-model='enddate1_"+new_row_no+"' id='enddate1_"+new_row_no+"' name='enddate1_"+new_row_no+"' placeholder='YYYY-MM-DD' pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'  required class='form-control'></div>\
	              </div>\
	                <label class='col-sm-2 control-label' for='desc1_"+new_row_no+"' style='margin-top: 10px;'>Description:</label>\
	                <div class='col-sm-9'>\
	                  <textarea class='field span5' ng-model='desc1_"+new_row_no+"' id='desc1_"+new_row_no+"' name='desc1_"+new_row_no+"' rows='5' id='comment'\
	                 style='width: 100%; '></textarea>\
	                </div>\
	              <input type='button' class='bfloatr'  onclick='deledurow("+new_row_no+")' value='Delete Education' />\
	              </div>\
	          </div>\
	        </div>\
	    </div>'";
/*	 
	$(edu_row).insertAfter('#edu_row_'+current_row);
document.getElementById('edu_row_cnt').value = new_row_no;
//var elem= document.getElementById('#edu_row_'+new_row_no);

alert(document.getElementById('edu_row_cnt').value);*/


$(edu_row).insertAfter('#edu_row_'+last_edu_row_cnt);
//document.getElementById('prj_row_cnt').value = new_row_no;

document.getElementById('last_edu_row_cnt').value = new_row_no;
document.getElementById('edu_row_cnt').value = total_cnt+1;

}

function deledurow(row){
/*	var current_row = parseInt(document.getElementById('edu_row_cnt').value);
	//alert(current_row);
	$('#edu_row_'+current_row).remove();
	if(current_row>1){
	document.getElementById('edu_row_cnt').value = current_row-1;
	}*/
	
	var total_cnt = parseInt(document.getElementById('edu_row_cnt').value);
	var last_edu_row_cnt = parseInt(document.getElementById('last_edu_row_cnt').value);
	
	
	$('#edu_row_'+row).remove();
	if(last_edu_row_cnt == row){
		last_edu_row_cnt = last_edu_row_cnt-1;
	}
	
	total_cnt =  total_cnt-1;
	document.getElementById('edu_row_cnt').value =total_cnt;
	if(total_cnt == 1){
		last_edu_row_cnt = 1;
	}
	document.getElementById('last_edu_row_cnt').value = last_edu_row_cnt;
	console.log("totalcount " + document.getElementById('edu_row_cnt').value);
	console.log("last_edu_row_cnt  " + document.getElementById('last_edu_row_cnt').value);
}

function addprjrow(){
/*
	var current_row = parseInt(document.getElementById('prj_row_cnt').value);
	//alert(current_row);
	var new_row_no=  current_row+1;*/
	
	var last_prj_row_cnt = parseInt(document.getElementById('last_prj_row_cnt').value);
	console.log("last prj row count" + last_prj_row_cnt);
	var total_cnt  = parseInt(document.getElementById('prj_row_cnt').value);
	var new_row_no=  last_prj_row_cnt+1;
	var prjrow = " <div class='row' id='prj_row_"+new_row_no+"'>\
                    <div class='col-xs-6 col-sm-8 col-md8'>\
                        <div class='well well-sm'>\
                          <div class='row'>\
                             <center><legend>Project "+new_row_no+"</legend></center>\
                             <div class='form-group'>\
                                <label class='col-sm-2 control-label' for='prjName_"+new_row_no+"'>ProjectName:</label>\
                                <div class='col-sm-9'>\
                                  <input type='text' ng-model='prjName_"+new_row_no+"' id='prjName_"+new_row_no+"' name='prjName_"+new_row_no+"' placeholder='' required class='form-control'>\
                                </div>\
                              </div>\
                              <!-- Text input-->\
                              <div class='form-group'>\
                                <label class='col-sm-2 control-label' for='prjComp'>Company:</label>\
                                		<div class='col-sm-9'>\
                                  <input type='text' ng-model='prjComp_"+new_row_no+"' id='prjComp_"+new_row_no+"' name='prjComp_"+new_row_no+"' placeholder='' class='form-control'>\
                                </div>\
                              </div>\
                              <div class='form-group'>\
                                <label class='col-sm-2 control-label' for='prjstartdate_"+new_row_no+"'>Start Date:</label>\
                                <div class='col-sm-9'>\
                                  <input type='text' ng-model='prjstartdate_"+new_row_no+"' id='prjstartdate_"+new_row_no+"' name='prjstartdate_"+new_row_no+"' placeholder='YYYY-MM-DD' pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}' required class='form-control'>\
                                </div>\
                              </div>\
                              <div class='form-group'><label class='col-sm-2 control-label' for='prjenddate_"+new_row_no+"'>End Date:</label>\
                              		<div class='col-sm-9'>\
                                  <input type='date' ng-model='prjenddate_"+new_row_no+"' id='prjenddate_"+new_row_no+"' name='prjenddate_"+new_row_no+"' placeholder='YYYY-MM-DD' pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}' required class='form-control'>\
                                </div>\
                              </div>\
                                <label class='col-sm-2 control-label'  for='prjDescription_"+new_row_no+"' style='margin-top: 10px;'>Description:</label>\
                                <div class='col-sm-9'>\
                                  <textarea class='field span5' ng-model='prjDescription_"+new_row_no+"' name='prjDescription_"+new_row_no+"' rows='5' id='prjDescription_"+new_row_no+"' style='width: 100%; '></textarea>\
                                </div><input type='button' class='bfloatr'  onclick='delprjrow("+new_row_no+")' value='Delete Project' />\
                              </div>\
                          </div>\
                 		</div>\
                 		</div>";

	$(prjrow).insertAfter('#prj_row_'+last_prj_row_cnt);
//document.getElementById('prj_row_cnt').value = new_row_no;

document.getElementById('last_prj_row_cnt').value = new_row_no;
document.getElementById('prj_row_cnt').value = total_cnt+1;
}

function delprjrow(row){
/*	var current_row = parseInt(document.getElementById('prj_row_cnt').value);
	//alert(current_row);
	$('#prj_row_'+current_row).remove();
	if(current_row>1){
		document.getElementById('prj_row_cnt').value = current_row-1;
	}*/
	var total_cnt = parseInt(document.getElementById('prj_row_cnt').value);
	var last_prj_row_cnt = parseInt(document.getElementById('last_prj_row_cnt').value);
	
	
	$('#prj_row_'+row).remove();
	if(last_prj_row_cnt == row){
		last_prj_row_cnt = last_prj_row_cnt-1;
	}
	
	total_cnt =  total_cnt-1;
	document.getElementById('prj_row_cnt').value =total_cnt;
	if(total_cnt == 1){
		last_prj_row_cnt = 1;
	}
	document.getElementById('last_prj_row_cnt').value = last_prj_row_cnt;
	console.log("totalcount " + document.getElementById('prj_row_cnt').value);
	console.log("last prj row  " + document.getElementById('last_prj_row_cnt').value);
}
function addskill(){
	
	var skill = document.getElementById('skill').value.trim();
	if(!skill || skill === ""){
		sweetAlert("Oops!","Please enter skill","error");
	}else{
		var last_skill_row = parseInt(document.getElementById('last_skill_row').value);
		var total_cnt  = parseInt(document.getElementById('skillcount').value);
		var new_row_no=  last_skill_row+1;
		alert(last_skill_row);
		var skill_row = "<div id='skillrow_"+new_row_no+"'>"+skill+"<input type='hidden' value='"+skill+"' id='skilldata_"+new_row_no+"'/><button onclick='delskillrow("+new_row_no+")' type='button' class='btn btn-default btn-lg inline removeskill'>\
		  <span class='glyphicon glyphicon-minus' aria-hidden='true'></span> Del\
		</button></div>";
		$(skill_row).insertAfter('#skillrow_'+last_skill_row);
		document.getElementById('last_skill_row').value = new_row_no;
		document.getElementById('skillcount').value = total_cnt+1;
	}

}

function delskillrow(row) {
	var total_cnt = parseInt(document.getElementById('skillcount').value);
	var last_skill_row = parseInt(document.getElementById('last_skill_row').value);
	
	
	$('#skillrow_'+row).remove();
	if(last_skill_row == row){
		last_skill_row = last_skill_row-1;
	}
	
	total_cnt =  total_cnt-1;
	document.getElementById('skillcount').value =total_cnt;
	if(total_cnt == 0){
		last_skill_row = 0;
	}
	document.getElementById('last_skill_row').value = last_skill_row;
	console.log("totalcount " + document.getElementById('skillcount').value);
	console.log("last skill row  " + document.getElementById('last_skill_row').value);
	
}













