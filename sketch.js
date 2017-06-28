var tree;
var buttonPre;
var buttonPost;
var buttonIn;
var buttonHide;
var buttonRegen;
var buttonBogo;
var txt;
var slider;
var v;

function setup() {
    createCanvas(900,600);
    tree = genRandom(5);
    txt = "";
    
    buttonPre = createButton('Preorder');
    buttonPre.position(width - 100, 65);
    buttonPre.mousePressed(prePressed);
    
    buttonPost = createButton('Postorder');
    buttonPost.position(width - 100, 65 + 20);
    buttonPost.mousePressed(postPressed);
    
    buttonIn = createButton('Inorder');
    buttonIn.position(width - 100, 65 + 40);
    buttonIn.mousePressed(inPressed);
    
    buttonIn = createButton('Verstecken');
    buttonIn.position(width - 100, 65 + 60);
    buttonIn.mousePressed(hidePressed);
    
    buttonIn = createButton('Neu');
    buttonIn.position(width - 100, 65 + 80);
    buttonIn.mousePressed(regenPressed);
    
    slider = createSlider(1, 5, 100);
    slider.position(20, 20);
    
    
    buttonBogo = createButton('Bogoorder');
    buttonBogo.position(width - 100, 65 + 100);
    buttonBogo.mousePressed(bogoPressed);
    v = slider.value();
}

function draw() {
    background(51, 51, 65);
    drawTree(tree, width/2, 100,1);
    
    
    
    if(slider.value() != v) {
        regenPressed();
        v = slider.value();
    }
    
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

function bogoPressed() {
    txt = tree.bogoOrder(0);
}

function hidePressed() {
    txt = "";
}

function regenPressed() {
    hidePressed();
    tree = genRandom(slider.value());
}

function drawTree(tree, x, y, i) {
    
    stroke(245);
    strokeWeight(2);

    var sp = 30 / (0.5 * i)
    var sp3;
    switch (i) {
        case 1 :
            sp3 = 60;
            break;
        case 2:
            sp3 = 30;
            break;
        case 3:
            sp3 = 10;
            break;
        default:
            sp3 = 0;
    }
    
    
    if(!tree.getLeftTree().isEmpty()) {
        
        line(x,y,x-sp-sp3,y+100);
    }
    if(!tree.getRightTree().isEmpty()) {
        line(x,y,x+sp+sp3,y+100);
    }
    
    fill(255);
    ellipse(x, y, 25, 25);
    
    fill(0);
    textSize(23);
    textAlign(CENTER);
    text(tree.getLabel(),x,y+8);
    
    if(!tree.getLeftTree().isEmpty()) {
        drawTree(tree.getLeftTree(),x-sp-sp3,y+100,i+1);
    }
    
    if(!tree.getRightTree().isEmpty()) {
        drawTree(tree.getRightTree(),x+sp+sp3,y+100,i+1);
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
            : this.label + " " + this.left.preOrder() + this.right.preOrder();
    }
    
    this.postOrder = function() {
        return this.isEmpty() 
            ? ""
            : this.left.postOrder() + this.right.postOrder() + " " + this.label;
    }
    
    this.inOrder = function() {
        return this.isEmpty()
            ? ""
            : this.left.inOrder() + this.label + " " + this.right.inOrder();
    }
    
    this.bogoOrder = function(i) {
        return this.isEmpty()
            ? ""
            : i % 2 == 0
                ?   " " + this.label + this.left.bogoOrder(i+1) + this.right.bogoOrder(i+1)
                :   this.left.bogoOrder(i+1) + this.right.bogoOrder(i+1) + " " +this.label;
    }
    
}

function genRandom(i) {
    let u = new Set();
    return gr(i, u);
    
    function gr(i, used) {
        
        
        if (i > 0) {
            
            var label = "";
            do {
                label = randomString();
            } while (used.has(label));

            used.add(label);
        
        return new BinTree(gr(i - 1, used), label, gr(i - 1, used));
        } else {
            return new BinTree(null, null, null);
        }
        
    }
    
    function randomString() {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        return chars[Math.round(Math.random() * (chars.length - 1))];
    }
}
