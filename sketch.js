var tree;
var buttonPre;
var buttonPost;
var buttonIn;
var txt;

function setup() {
    createCanvas(900,500);
    tree = genRandom(4);
    txt = "";
}

function draw() {
    background(51, 51, 65);
    drawTree(tree, width/2, 100,1);
    
    buttonPre = createButton('Preorder');
    buttonPre.position(width - 100, 65);
    buttonPre.mousePressed(prePressed);
    
    buttonPost = createButton('Postorder');
    buttonPost.position(width - 100, 65 + 40);
    buttonPost.mousePressed(postPressed);
    
    buttonIn = createButton('Inorder');
    buttonIn.position(width - 100, 65 + 80);
    buttonIn.mousePressed(inPressed);
    
    fill(255);
    text(txt,width/2, height - 40);
}

function prePressed() {
    txt = tree.preOrder();
}
function postPressed() {
    txt = tree.postOrder();
}
function inPressed() {
    txt = tree.inOrder();
}

function drawTree(tree, x, y, i) {
    
    stroke(245);
    strokeWeight(2);
    var sp = 200 / i ;
    
    
    if(!tree.getLeftTree().isEmpty()) {
        
        line(x,y,x-sp,y+100);
    }
    if(!tree.getRightTree().isEmpty()) {
        line(x,y,x+sp,y+100);
    }
    
    fill(255);
    ellipse(x, y, 50, 50);
    
    fill(0);
    textSize(23);
    textAlign(CENTER);
    text(tree.getLabel(),x,y+8);
    
    if(!tree.getLeftTree().isEmpty()) {
        drawTree(tree.getLeftTree(),x-sp,y+100,i+1);
    }
    
    if(!tree.getRightTree().isEmpty()) {
        drawTree(tree.getRightTree(),x+sp,y+100,i+1);
    }
    
    
}

function BinTree(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
    
    this.isEmpty = function() {
        return this.left === null
            && this.right === null
            && this.label === null;
    }
    
    this.getLeftTree = function() {
        return this.left;
    }
    
    this.getRightTree = function() {
        return this.right;
    }
    
    this.getLabel = function() {
        return label;
    }
    
    this.height = function() {
        return this.isEmpty()
            ? -1
            : Math.max(this.left.height(), this.right.height());
    }
    
    this.numberOfNodes = function() {
        return this.isEmpty()
            ? 0
            : 1 + this.left.numberOfNodes()
                + this.right.numberOfNodes();
    }
    
    this.preOrder = function() {
        return this.isEmpty()
            ? ""
            : this.label + this.left.preOrder() + this.right.preOrder();
    }
    
    this.postOrder = function() {
        return this.isEmpty() 
            ? ""
            : this.left.postOrder() + this.right.postOrder() + this.label;
    }
    
    this.inOrder = function() {
        return this.isEmpty()
            ? ""
            : this.left.inOrder() + this.label + this.right.inOrder();
    }
    
}

function genRandom(i) {
    let u = new Set();
    return gr(i, u);
    
    function gr(i, used) {
        var label = "";
        do {
            label = randomString();
        } while (used.has(label));

        used.add(label);
        
        return i < 1
            ? new BinTree(null,null,null) 
            : new BinTree(
            gr(i - 1, used), label, gr(i - 1, used));
    }
    
    function randomString() {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        return chars[Math.round(Math.random() * (chars.length - 1))];
    }
}
