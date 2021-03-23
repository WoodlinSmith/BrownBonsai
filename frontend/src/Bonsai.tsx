import React, { useState} from 'react';
import "./tailwind.css"
import live from "./asset/alive.png"
import dying from "./asset/dying.png"
import dead from "./asset/dead.png"
interface IProps {

}

interface IState{
    health: number
    dead: boolean
    water: number
    timer: NodeJS.Timeout|null
}

class Bonsai extends React.Component< IProps, IState> {
 
    constructor(props:any){
        super(props)
        //simple stats for now
        this.state={health:100, dead:false, water:100, timer:null}

  }

    componentDidMount() : void {
        this.setState({timer:setInterval(
            () => this.newDay(),
            1000
        )}
        );
    }



    newDay() : void {
        //Necromancy does not exist in the bonsai world, if we're dead, we're dead!
        if(!this.state.dead){
            if(this.state.health>0){
                this.setState({health:this.state.health-this.waterDamage()});
            }
            if(this.state.health<100){
                this.setState({health:this.state.health+this.grow()});
            }

            if(this.state.water>0){
                this.setState({water:this.state.water-10});
            }
            if(this.state.health==0){
                this.setState({dead:true});
            }
            
        }

    }

    waterDamage() : number {
        if(this.state.water<50){
            //Placeholder val
            return 1;
        }
        return 0;
    }

    grow() : number {
        if(this.state.water>=50){
            return 1;
        }
        return 0;

    }
    water() : void {
        if(this.state.water<=90){
            this.setState({water:this.state.water+10});
        }

        //Just top it off if we're over 90%
        //May add overwatering later.
        else {
            this.setState({water:100});
        }
        console.log(this.state.water);
    }

    render() {
        return (
            <div>
                <div className="bg-white flex mx-auto flex-shrink-6 w-40 h-40">
                    {this.state.health>50 && 
                        <img src={live}></img>
                    }
                    {this.state.health<=50 && this.state.health>0 &&
                        <img src={dying}></img>
                    }
                    {this.state.dead &&
                        <img src={dead}></img>
                    }
                </div>
                <button className="bg-black flex text-white font-large shadow-md mx-auto" onClick={this.water.bind(this)}>Water your tree!</button>
            </div>
        )
    }
}

export default Bonsai;