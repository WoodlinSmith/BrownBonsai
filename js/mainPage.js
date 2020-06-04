var event = new Event("growTime");

var controller=null;

class mainPageControl
{
    
    
    constructor(bonsaiModel, bonsaiView)
    {
        
        this.bonsaiModel=bonsaiModel;
        this.bonsaiView=bonsaiView;

        //Default
        this.growCycle=3000;
    }

    newDay()
    {
        controller.bonsaiModel.newDay();
        console.log("New day!");
    }

    waterPlant()
    {
        controller.bonsaiModel.waterPlant();
        console.log("Watered Plant!");
    }

    
}



class bonsaiModel
{
    constructor()
    {
        this.daysSinceWatered=0;
        this.currentDay=0;
    }

    newDay()
    {
        this.currentDay++;
        this.daysSinceWatered++;

    

        //TODO change bonsai state based on watering.
    }

    waterPlant()
    {
        this.daysSinceWatered=0;
    }

}


class bonsaiTile
{
    constructor()
    {
        
    }
}

class bonsaiView
{
    constructor()
    {
        this.tileStateColorMap={"unused":"white","trunk":"brown","leaves":"green","dead":"black"};
        this.colorIndexMap={"white":0, "brown":1, "green":2,"black":3};
        this.currentState="leaves";
        this.init();
    }

    /*
    generateBonsaiGrid()
    {
        var i=0;
        var grid = document.createElement('table');
        grid.className = 'grid';
        for (var r=0;r<rows;++r){
          var tr = grid.appendChild(document.createElement('tr'));
          for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.className="gridCell";
            cell.innerHTML = ++i;
            /*
            cell.addEventListener('growTime',(function(){
              
             })(cell,r,c,i),false);
          }
          
        }
        return grid;
    }
    */

    init()
    {
        var bonsai= document.createElement('div');
        bonsai.id="bonsai";
        document.body.appendChild(bonsai);
        this.displayBonsai();

    }

    displayBonsai()
    {
        //Colored squares implementation for prototyping only. Will be changed later.
        var bonsai=document.getElementById("bonsai");
        bonsai.style.backgroundColor=this.tileStateColorMap[this.currentState];

    }
}

function grow()
{

}

function loadPage()
{
    controller=new mainPageControl(new bonsaiModel(), new bonsaiView());
    var newDay=document.getElementById("newDay");
    var waterPlant=document.getElementById("waterPlant");
    newDay.onclick=controller.newDay;
    waterPlant.onclick=controller.waterPlant;
}