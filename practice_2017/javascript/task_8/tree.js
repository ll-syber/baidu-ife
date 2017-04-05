window.onload = function () {

  class Node {
    constructor (data) {
      this.data = data;
      this.value = this.getValue();
      // this.left;
      // this.right;    
      this.subNodes = [];  
    }

    getValue() {
      let list = this.data.childNodes;
      for (var key in list) {
        if (list[key].nodeType === 3) {
          return  list[key].nodeValue.trim();
        }
      }
    }

    setsubNodes (arr) {
      this.subNodes = arr;
    }
    addsubNode (node) {
      this.subNodes.push(node);
    }
    getNodeData () {
      return this.data;
    }
    getNodeValue () {
      return this.value;
    }
    getSubNodes () {
      return this.subNodes;
    }
    // getRight () {
    //   return this.right;
    // }
  }

  class CommonTree {
    constructor (rootNode) {
      this.root = rootNode;
      this.found = false;
      this.targetNode = undefined;
      this.targetCls = undefined;
    }
    
    init () {
      this.appendChildNode(this.root);
    }
    appendChildNode(node) {
      let childEles = node.getNodeData().childNodes;
      for (let i = 0; i < childEles.length; i++) {
        if (childEles[i].nodeType === 1){
          node.addsubNode(new Node(childEles[i]));
          let lastChildIndex = node.getSubNodes().length - 1;
          this.appendChildNode(node.getSubNodes()[lastChildIndex]);
        }
      }
    }

    getTarget () {
      return this.targetNode;
    }

    rootFirst (node, func) {
      if (node) {
        func(node);
        for(let i = 0; i < node.subNodes.length; i++) {
          this.rootFirst(node.subNodes[i], func);
        }
      }
    }
    rootLast (node, func) {
      if (node) {
        for(let i = 0; i < node.subNodes.length; i++) {
          this.rootLast(node.subNodes[i], func);
        }
        func(node);
      }
    }
    searchValue (node, value, func) {
      if (!this.found && node) {
        func(node);
        if (node.getValue() === value) {
          this.found = true;
          this.targetNode = node;
          this.targetCls = node.getNodeData().className;
        } else {
          for(let i = 0; i < node.subNodes.length; i++) {
            this.searchValue(node.subNodes[i], value, func);
          }
        }
      }
    }

    reset () {
      this.found = false;
      if (this.targetNode)
        this.targetNode.getNodeData().className = this.targetCls;
      this.targetNode = undefined;
    }
  }

  function changeColor (node) {
      let ele = node.getNodeData();
      let tmp = ele.className;
      setTimeout(() => {
        // console.log('cur');
        console.log(node.getValue());
        ele.className += ' current';
      }, count * 1000);

      setTimeout(() => {
        // console.log('cancel');
        ele.className = tmp;
      }, (count + 1) * 1000);
      count++;
  }

  let [rFirstBtn, rLastBtn, searchBtn] = document.getElementsByTagName('button');
  let rootEle = document.getElementById('root');
  let text = document.getElementsByTagName('input')[0];
  let count = 0;
  // let found = false;


  let rootNode = new Node (rootEle);
  let tree = new CommonTree (rootNode);
  tree.init();

  rFirstBtn.addEventListener('click', function () {
    tree.rootFirst(rootNode, function (node) {
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

  searchBtn.addEventListener('click', function () {
    tree.reset();
    // console.log(text.value);
    tree.searchValue(rootNode, text.value, function (node) {
      changeColor(node);
    });
    setTimeout(() => {
      if(tree.getTarget()) {
        tree.getTarget().getNodeData().className += ' got';
      } else {
        alert('404 NOT FOUND. _(:зゝ∠)_');
      }
    }, (count+1) *1000);
    count = 0;
  });
};