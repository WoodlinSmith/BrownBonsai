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

    //Restructure these, singleton might not be the best way of doing this.
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

    trim()
    {
        controller.bonsaiModel.trim();
        console.log("Trimmed!");
    }

    grow()
    {
        controller.bonsaiModel.grow();
    }

    
}



class bonsaiModel
{
    constructor(observer)
    {
        this.bonsaiObserver=observer;
        this.currentStateMap=["alive","dying","dead"];
        this.daysSinceWatered=0;
        this.currentDay=0;
        this.size=20;
        this.beauty=100;
        this.overGrown=false;    
    }

    newDay()
    {
        var currState=this.currentStateMap[this.daysSinceWatered];
        let growCheck= (Math.random())%100;

        if(this.daysSinceWatered==0&&growCheck>90)
        {
            grow();
            this.bonsaiObserver.sizeChange(this.size);
        }

        if(this.overGrown)
        {
            this.beauty-=10;
        }
        this.bonsaiObserver.update(currState);
        this.currentDay++;
        this.daysSinceWatered++;
        
    }

    waterPlant()
    {
        this.daysSinceWatered=0;
    }

    //Implementation will change later once the squares prototyping is removed.
    grow()
    {
        this.size+=1;
        let overGrowCheck=Math.random()%100;
        if(overGrowCheck>95)
        {
            this.overGrown=true;
        }
    }

    trim()
    {
        this.overGrown=false;
        this.beauty+=10;
    }

}




class bonsaiView
{
    constructor()
    {
        this.tileStateColorMap={"alive":"green","dying":"brown","dead":"black"};
        this.colorIndexMap={"white":0, "brown":1, "green":2,"black":3};
        this.currentState="alive";
        this.init();
    }


    init()
    {
        var bonsai= document.createElement('div');
        bonsai.id="bonsai";
        document.body.appendChild(bonsai);
        this.displayBonsai();

    }

    update(state)
    {
        this.currentState=state;
        this.displayBonsai();
    }
    
    sizeChange(size)
    {
        var bonsai=document.getElementById("bonsai");
        bonsai.style.height=size;
        bonsai.style.width=size;

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
    var view= new bonsaiView();
    var model= new bonsaiModel(view);
    controller=new mainPageControl(model,view);
    var newDay=document.getElementById("newDay");
    var waterPlant=document.getElementById("waterPlant");
    newDay.onclick=controller.newDay;
    waterPlant.onclick=controller.waterPlant;
}