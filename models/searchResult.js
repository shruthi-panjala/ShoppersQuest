module.exports=function searchBar(input){
    this.removeDuplicates= function(arr){
        
    }
    console.log("this is input:",input);
    console.log("-------------------------------------------------------------");
    var newArr=[];
    var current = input[0];
    var found = false;

    for (var i = 0; i < input.length; i+=1) {
        if (current == input[i] && !found) {
            found = true;
        } else if (current != input[i]) {
            newArr[i]=current;
            // System.out.print(" " + current);
            current = input[i];
            found = false;
        }
    }
       return newArr; 
}