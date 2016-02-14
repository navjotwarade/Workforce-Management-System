function homeController($scope,$http,$location) {
	    
		$scope.signOut = function() {
	    	$http({
	            method: 'GET',
	            url: '/signout',
	        //    data: { "username": $scope.inputUsername, "password": $scope.inputPassword }
	            
	         }).success(function(response){
	           
	            alert(JSON.stringify(response));
	            
	            if(response.status == "success")
	           		window.location = '/';
	            else
	            	sweetAlert("Oops! some thing went wrong",response.msg,"error");
	        }).error(function(error){
	        	sweetAlert("Oops! some thing went wrong",error,"error");
	        });
	    };
	    
	    $scope.saveSummary = function() {
	    	  
	    	  var sum = $scope.userSummary;
	    	  
	    	  if(!sum) {
	    		  sweetAlert("Oops!!","Please Enter summary to save","error");
	    		  return false;
	    	  }else{
	    		  sum = sum.trim();
	              $http({
	                    method: 'POST',
	                    url: '/saveSummary',
	                    data: { 
	                            "summary": $scope.userSummary, 
	                           }
	                    
	                 }).success(function(response){
	                   
	                    alert(JSON.stringify(response));
	                    
	                    if(response.status == "success")
	                     	sweetAlert("Summary has been saved successfuly ","","success");
	                    else
	                    	sweetAlert("Oops!",response.msg,"error");
	                }).error(function(error){
	                	sweetAlert("Oops!",error,"error");
	                });  
	    	  }
	        };

		    $scope.saveExp = function() {
		    	  
		    	  var no_of_exp =  parseInt(document.getElementById('exp_row_cnt').value);
		    	  var data = {};
		    	  alert("rows = "+no_of_exp);
		    	  for(var i = 1 ; i <= no_of_exp ; i++){
		    		   var comp =document.getElementById("companyName_"+i).value,
		    		  alert(comp);
		    		  if(!comp){
		    			  sweetAlert("Oops!","Please Provide Company Name for Experiences","error");
		    			  return false;
		    		  }else{
		    			  
		    			  data["row_"+i] = { 
		    					  	    					  
		    				"companyname" : document.getElementById("companyName_"+i).value,
		    				"title" : document.getElementById("inputTitle_"+i).value,
		    				"location" : document.getElementById("inputLocation_"+i).value,
		    				"sdate" : document.getElementById("startdate_"+i).value,
		    				"edate" : document.getElementById("enddate_"+i).value,
		    				"desc" : document.getElementById("inputDescription_"+i).value
		    			  };
		    		  }
		    		 
		    		  
		    	  }
		    	  alert(data);
		    	  return false;
		              $http({
		                    method: 'POST',
		                    url: '/saveSummary',
		                    data: { 
		                            "summary": $scope.userSummary, 
		                           }
		                    
		                 }).success(function(response){
		                   
		                    alert(JSON.stringify(response));
		                    
		                    if(response.status == "success")
		                     	sweetAlert("Summary has been saved successfuly ","","success");
		                    else
		                    	sweetAlert("Oops!",response.msg,"error");
		                }).error(function(error){
		                	sweetAlert("Oops!",error,"error");
		                });  
		    	  
		        };
		        
	        

		    $scope.getProfilePage = function() {
		    	alert("hi");
		    	    window.location = '/showProfile';  
		    	  };
		    	  

				    $scope.getConnectPage = function() {
				    	    window.location = '/getConnect';  
				    	  };		    	  
		        
	}
	
	
  