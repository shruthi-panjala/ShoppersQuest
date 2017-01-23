module.exports=function Wishlist(oldCart){
    this.items=oldCart.items || {};
    this.totalQty=oldCart.totalQty || 0;
    this.price=oldCart.price || 0;
    
    this.add= function(item, id){
        var storedItem= this.items[id];
        if(!storedItem){
            //not stored item
            storedItem=this.items[id]={item: item, qty:0 ,price:0};
            this.totalQty++;
        }
       storedItem.qty=1;
        //storedItem.qty++;
        //console.log(storedItem.qty);
        storedItem.price=storedItem.item.price;
    this.price=storedItem.price;
        //this.totalQty++;
    };
    
    this.delete = function(id){
        delete this.items[id];
        this.totalQty -= 1;
    };
    
    this.generateArray=function(){
      var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
        
    };
};