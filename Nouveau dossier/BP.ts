class  BPAction{
    value:string
    
    constructor(){
        this.value = "";
    }

    getValue(){
        return this.value;
    }

    setValue(v:string){
        this.value = v
    }
}


class  BPTransition{
    condition:string
    node:string
    conditiontype?:string
    
    constructor(condition:string,node:string,conditiontype?:string){
        this.condition=condition;
        this.node=node;
        this.conditiontype=conditiontype;
    }
}

class BPNode{
    id:	string
    name: string
	next:Array < BPTransition>
	onEnter: Array <BPAction>
    onReceive: Array<BPAction>
    x:	number
    y:	number
    lastModified: Date
    type?: string


    constructor(id:string, name:string,x:number,y:number,lastlastModified:Date,type?:string){
        this.id=id;
        this.name=name;
        this.next = new Array<BPTransition>();
        this.onEnter = new Array<BPAction>();
        this.onReceive = new Array<BPAction>();
        this.x=x;
        this.y=y;
        this.lastModified=new Date();
        this.type=type;
    }

    addTransition(transition:BPTransition)
    {
        this.next.push(transition);
    }
    
    addEnterAction(onEnter:BPAction)
    {
        this.onEnter.push(onEnter);
    }

    addReceiveAction(onReceive:BPAction){
        this.onReceive.push(onReceive);
    }
}






class Point{
    x:number
    y:number
    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
}


class BPLink  
{  
    source:string
    sourcePort:string
    target:string
    points: Array<Point>
    constructor(source:string, sourcePort:string,target:string)
    {
        this.source=source;
        this.sourcePort=sourcePort;
        this.target=target;
        this.points = new Array<Point>();
    }

    addpoint(p: Point){
        this.points.push(p);
    }
                    
}

class CatchAll {
    onReceive:Array<BPAction>;
    next: Array<BPTransition>;
    constructor(){
        this.onReceive=new Array<BPAction>();
        this.next=new Array<BPTransition>();
    }
}


class BPFlow {
    name: string
    location?: string
    version?: string
    flow: string
    // The name of the first node of the flow
    startNode: string
    nodes: Array<BPNode>
    links: Array<BPLink>
    catchAll :Array<CatchAll>
    //catchAll?: NodeActions
    //timeoutNode?: string

    // "standard" by default
 


    constructor (name: string ,version: string,flow: string,location: string, startNode: string){
        this.name=name;
        this.version=version;
        this.flow=flow;
        this.location=location;
        this.startNode=startNode;
        this.catchAll=new Array<CatchAll>();
        this.links = new Array<BPLink>();
        this.nodes = new Array<BPNode>();
     
       
        
    }

    addNode(node: BPNode){
        this.nodes.push(node);
    }

    addLink(link: BPLink){
        this.links.push(link);
    }

}



       
function createFlow(){
    let t1=new BPTransition("true","Always","End");   
    let action1=new BPAction();
    let  action2=new BPAction();
    let node1= new BPNode("entry","entry",5,6,new Date());
    node1.addTransition(t1);
    node1.addEnterAction (action1);
    node1.addReceiveAction(action2)
    let link1=new BPLink("entry", "out0","ce8698468d");  
    let p1=new Point(2,5);
    let p2=new Point(2,5);
    link1.addpoint(p1);
    link1.addpoint(p2);
    node1.addTransition(new BPTransition("true","node-a93e"))
    let flow1=new BPFlow("main.flow.json ","0.0.1" ,"main.flow.json","main.flow.json","entry");
    flow1.addNode(node1);
    flow1.addLink(link1);
    console.log(JSON.stringify(flow1));
}