var cityLists = new Array(5) ;
 cityLists["empty"] = ["Select"]; 
 cityLists["India"] = ["Telangana", "Andhrapradesh", "Maharastra"]; 
 cityLists["Germany"] = ["Berlin", "Kiel", "Basel", "Mainz"]; 
 cityLists["Italy"] = ["Rome", "Venice", "Naples"]; 
 cityLists["France"]= ["Paris", "Nantes", "Lille"]; 
 cityLists["Iceland"]=["Akureyri","Akranes","Selfoss"];

function cityChange(selectObj) { 
	 // get the index of the selected option 
	 var idx = selectObj.selectedIndex; 
	 // get the value of the selected option 
	 var which = selectObj.options[idx].value; 
	 // use the selected option value to retrieve the list of items from the cityLists array 
	 cList = cityLists[which]; 
	 // get the city select element via its known id 
	 var cSelect = document.getElementById("region"); 
	 // remove the current options from the city select 
	 var len=cSelect.options.length; 
	 while (cSelect.options.length > 0) { 
	 cSelect.remove(0); 
	 }
	 var newOption; 
	 // create new options 
	 for (var i=0; i<cList.length; i++) { 
	 newOption = document.createElement("option"); 
	 newOption.value = cList[i];  // assumes option string and value are the same 
	 newOption.text=cList[i]; 
	 // add the new option 
	 try { 
	 cSelect.add(newOption);  // this will fail in DOM browsers but is needed for IE 
	 } 
	 catch (e) { 
	 cSelect.appendChild(newOption); 
	 } 
	 } 
	 } 