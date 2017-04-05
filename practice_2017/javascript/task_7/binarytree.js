window.onload = function () {

  class Node {
    constructor (data) {
      this.data = data;
      this.left;
      this.right;      
    }

    setLeft (node) {
      this.left = node;
    }
    setRight (node) {
      this.right = node;
    }
    getNodeData () {
      return this.data;
    }
    getLeft () {
      return this.left;
    }
    getRight () {
      return this.right;
    }
  }

  class BinaryTree {
    constructor (rootNode) {
      this.root = rootNode;
    }
    rootFirst (node, func) {
      if (node) {
        func(node);
        this.rootFirst(node.getLeft(), func);
        this.rootFirst(node.getRight(), func);
      }
    }
    rootMiddle (node, func) {
      if (node) {
        this.rootMiddle(node.getLeft(), func);
        func(node);
        this.rootMiddle(node.getRight(), func);
      }
    }
    rootLast (node, func) {
      if (node) {
        this.rootLast(node.getLeft(), func);
        this.rootLast(node.getRight(), func);
        func(node);
      }
    }

  }

  let [rFirstBtn, rMidBtn, rLastBtn] = document.getElementsByTagName('button');
  let rootEle = document.getElementById('root');
  let secondLayer = rootEle.querySelectorAll('.second');
  let thirdLayer = rootEle.querySelectorAll('.third');
  let count = 0;

  let rootNode = new Node (rootEle);
  rootNode.setLeft(new Node(secondLayer[0]));
  rootNode.setRight(new Node(secondLayer[1]));
  rootNode.getLeft().setLeft(new Node(thirdLayer[0]));
  rootNode.getLeft().setRight(new Node(thirdLayer[1]));
  rootNode.getRight().setLeft(new Node(thirdLayer[2]));
  rootNode.getRight().setRight(new Node(thirdLayer[3]));

  function changeColor (node) {
      let ele = node.getNodeData();
      let tmp = ele.className;
      setTimeout(() => {
        console.log('cur');
        ele.className += ' current';
      }, count * 1000);

      setTimeout(() => {
        console.log('cancel');
        ele.className = tmp;
      }, (count + 1) * 1000);
      count++;
    }

  let tree = new BinaryTree (rootNode);
  rFirstBtn.addEventListener('click', function () {
    tree.rootFirst(rootNode, function (node) {
      changeColor(node);
    });
    count = 0;  
  });
  rMidBtn.addEventListener('click', function () {
    tree.rootMiddle(rootNode, function (node) {
      changeColor(node);
    });
    count = 0;  
  });  
  rLastBtn.addEventListener('click', function () {
    tree.rootLast(rootNode, function (node) {
      changeColor(node);
    });
    count = 0;  
  });

};