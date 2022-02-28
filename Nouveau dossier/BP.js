var BPAction = /** @class */ (function () {
    function BPAction() {
        this.value = "";
    }
    BPAction.prototype.getValue = function () {
        return this.value;
    };
    BPAction.prototype.setValue = function (v) {
        this.value = v;
    };
    return BPAction;
}());
var BPTransition = /** @class */ (function () {
    function BPTransition(condition, node, conditiontype) {
        this.condition = condition;
        this.node = node;
        this.conditiontype = conditiontype;
    }
    return BPTransition;
}());
var BPNode = /** @class */ (function () {
    function BPNode(id, name, x, y, lastlastModified, type) {
        this.id = id;
        this.name = name;
        this.next = new Array();
        this.onEnter = new Array();
        this.onReceive = new Array();
        this.x = x;
        this.y = y;
        this.lastModified = new Date();
        this.type = type;
    }
    BPNode.prototype.addTransition = function (transition) {
        this.next.push(transition);
    };
    BPNode.prototype.addEnterAction = function (onEnter) {
        this.onEnter.push(onEnter);
    };
    BPNode.prototype.addReceiveAction = function (onReceive) {
        this.onReceive.push(onReceive);
    };
    return BPNode;
}());
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var BPLink = /** @class */ (function () {
    function BPLink(source, sourcePort, target) {
        this.source = source;
        this.sourcePort = sourcePort;
        this.target = target;
        this.points = new Array();
    }
    BPLink.prototype.addpoint = function (p) {
        this.points.push(p);
    };
    return BPLink;
}());
var CatchAll = /** @class */ (function () {
    function CatchAll() {
        this.onReceive = new Array();
        this.next = new Array();
    }
    return CatchAll;
}());
var BPFlow = /** @class */ (function () {
    //catchAll?: NodeActions
    //timeoutNode?: string
    // "standard" by default
    function BPFlow(name, version, flow, location, startNode) {
        this.name = name;
        this.version = version;
        this.flow = flow;
        this.location = location;
        this.startNode = startNode;
        this.catchAll = new Array();
        this.links = new Array();
        this.nodes = new Array();
    }
    BPFlow.prototype.addNode = function (node) {
        this.nodes.push(node);
    };
    BPFlow.prototype.addLink = function (link) {
        this.links.push(link);
    };
    return BPFlow;
}());
function createFlow() {
    var t1 = new BPTransition("true", "Always", "End");
    var action1 = new BPAction();
    var action2 = new BPAction();
    var node1 = new BPNode("entry", "entry", 5, 6, new Date());
    node1.addTransition(t1);
    node1.addEnterAction(action1);
    node1.addReceiveAction(action2);
    var link1 = new BPLink("entry", "out0", "ce8698468d");
    var p1 = new Point(2, 5);
    var p2 = new Point(2, 5);
    link1.addpoint(p1);
    link1.addpoint(p2);
    node1.addTransition(new BPTransition("true", "node-a93e"));
    var flow1 = new BPFlow("main.flow.json ", "0.0.1", "main.flow.json", "main.flow.json", "entry");
    flow1.addNode(node1);
    flow1.addLink(link1);
    console.log(JSON.stringify(flow1));
}
