var flowFunc=function(element){
    console.log(element.value);
    /*console.log(document.getElementById('old').value);
     console.log(document.getElementById('new').value);*/
if(element.value==1)
   { document.getElementById('customer-login').style.display='block';
    document.getElementById('guestBtn').style.display='none';}
    else
       { document.getElementById('customer-login').style.display='none';
       document.getElementById('guestBtn').style.display='block';
       }
}

var validate=function(e){
    var myForm1=document.getElementById('Form1');
    var username=myForm1[0].value;
    var pwd=myForm1[1].value;
    if(username==="" ||pwd===""){
        document.getElementById('alertMsg1').style.display='block';
    }
    else{
        document.getElementById('a').setAttribute("href","#collapse2");
    }
    console.log(username);
   
}

var insert= function(e){
    var myForm2=document.getElementById('Form2');
    var firstname=myForm2[0].value;
    var phn=myForm2[3].value;
    var address=myForm2[7].value;
     var country=myForm2[9].value;
     var state=myForm2[10].value;
     var city=myForm2[11].value;
     var pin=myForm2[12].value;
    console.log(firstname+"  "+ phn)
    if(firstname===""|| phn==="" || address===""||country===""||state===""||city===""||pin==="")
        {
        document.getElementById('alertMsg2').style.display='block';    
        }
    else{
      document.getElementById('b').setAttribute("href","#collapse3");  
    }
}

/*numeric validation...................!*/
var numericValidation = function(num){
    var pat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
   // console.log(num.value);
    
    if(num.value.match(pat))  
        { 
         document.getElementById('number').innerHTML="";  
      return true;  
        }  
      else  
        { 
             document.getElementById('number').innerHTML="Enter valid number" ;
        //alert("message");  
        return false;  
        }  
}

/*pin code validation...............*/
var pinValidation= function(pin){
    var pat1=/^\d{6}$/;
    if(!pat1.test(pin.value))
{
alert("Pin code should be 6 digits ");
    document.getElementById('pin-area').innerHTML="Enter valid Postal Code";
pin_code.focus();
return false;
}
    else{
     document.getElementById('pin-area').innerHTML="";  
    }
}

/*email validation*/
var emailValidation= function(emailId){
    var filter=/^([a-z A-Z 0-9 _\.\-])+\@(([a-z A-Z 0-9\-])+\.)+([a-z A-z 0-9]{3,3})+$/;
if(!filter.test(emailId.value))
{
alert("Email is in www.gmail.com format");
     document.getElementById('em').innerHTML="Email is in www.gmail.com format";
emailId.focus();
return false;
}
else{
    document.getElementById('em').innerHTML=""
}
}

/* first name focus*/
var first= function(e){
    if(e.value===""|| e.value.length<5)
       { document.getElementById('firstname').focus();
     document.getElementById('text-area').innerHTML="Enter valid Name";}
    else{
         document.getElementById('text-area').innerHTML="";  
    }
}