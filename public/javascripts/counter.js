
var count=0,newCount=0;
var arr=[];
var wishListCounter=function(e){  
     var duplicate=false;
    var alertMsg=document.getElementById("alertMsg")
    var pushToArray=function(duplicate)
        {
            if(!duplicate){
            arr.push(e);
            count=arr.length;
                  alertMsg.style.display='none';
        }
        }
console.log(e); //if check
    if(arr.length==0){
        arr.push(e);
        count=arr.length;
    }
    else{
        for(var i=0;i<arr.length;i++){
            if(arr[i]===e)
                
       { count=arr.length;
        duplicate=true;
    alertMsg.style.display='block';
           //alert("item already added into Wishlist");
       
       }
           
                }
        
     pushToArray(duplicate);
    }
    
    
console.log(arr.length);
  
    document.getElementById('wishlistCount').innerHTML="("+count+")";
 //return arr;
};

