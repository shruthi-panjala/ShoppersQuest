var toggleVisibility = function(element1,element2) {
	    if(element2.style.display=='block'){
	        element2.style.display='none';
            element1.style.display='block';
	    } else {
	        element1.style.display='block';
	    }
	    
	};

var paymentGrid=function(e){
    console.log(e.value);
    if(e.value===1)
    {document.getElementById('paymentGrid').style.display="block";
    document.getElementById('cardCVV').setAttribute("disabled", false);
    }
/*  console.log('is enabled');*/
    else{
        document.getElementById('cardCVV').disabled=true;
        document.getElementById('paymentGrid').style.display="block";
    }
    
}


var cardnumber=function(inputtxt)  
{  
  var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;  
  if(inputtxt.value.match(cardno))  
        {  
        document.getElementById('error1').innerHTML=" " ;   
      return true;  
        }  
      else  
        {
            document.getElementById('error1').innerHTML="Please enter a valid card number..!";
        alert("Not a valid Visa credit card number!");  
        return false;  
        }  
} 
var makePayment= function(){
    var myForm3=document.getElementById('payment-form');
    var cardNo=myForm3[0].value;
        var expiryDate=myForm3[1].value;
       var CVV=myForm3[2].value; 
    if(document.getElementById('cardCVV').disabled===true){
        console.log('error');
        if(cardNo===""|| expiryDate===""){
            alert("enter all details for card payment");
        }
        
    }
    else{
        if(cardNo===""|| expiryDate===""|| CVV==="")
             alert("enter all details for card payment");
    }
}