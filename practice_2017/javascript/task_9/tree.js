window.onload = function () {

  class Node {
    constructor (data) {
      this.data = data;
      this.value = this.getValue();   
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
  }

  class CommonTree {
    constructor (rootNode) {
      this.root = rootNode;
      this.found = false;
      this.targetNode = undefined;
      this.targetCls = undefined;
    }
    
    init (fn) {
      this.appendChildNode(this.root, fn);
    }
    appendChildNode(node, fn) {
      let childEles = node.getNodeData().childNodes;
      fn(node.getNodeData());
      for (let i = 0; i < childEles.length; i++) {
        if (childEles[i].nodeType === 1){
          node.addsubNode(new Node(childEles[i]));
          let lastChildIndex = node.getSubNodes().length - 1;
          this.appendChildNode(node.getSubNodes()[lastChildIndex], fn);
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
        console.log(node.getValue());
        ele.className += ' current';
      }, count * 1000);

      setTimeout(() => {
        ele.className = tmp;
      }, (count + 1) * 1000);
      count++;
  }

  function resetSelect () {
    selectedEle.className = selectedEleCls;
    selectedEle = undefined;
    selectedEleCls = '';
    fatherEle = undefined;    
  }

  function bindClick (ele) {
    ele.addEventListener('click', function (evt) {
      if (selectedEle) {
        resetSelect();
      }
      selectedEle = ele;
      selectedEleCls = selectedEle.className;
      selectedEle.className += ' selected';
      fatherEle = selectedEle.parentNode;
      evt.stopPropagation();
    });   
  }

  let [rFirstBtn, rLastBtn, searchBtn, insertBtn, deleteBtn] = document.getElementsByTagName('button');
  let body = document.getElementsByTagName('body')[0];
  let rootEle = document.getElementById('root');
  let text = document.getElementsByTagName('input')[0];
  let count = 0;
  let selectedEle,
      selectedEleCls = '',
      fatherEle;

  let rootNode = new Node (rootEle);
  let tree = new CommonTree (rootNode);
  tree.init(function (ele) {
    bindClick(ele);
  });

  body.addEventListener('click', function () {
    if (selectedEle) {
      resetSelect();
    }
  });

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
    tree.searchValue(rootNode, text.value.trim(), function (node) {
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

  insertBtn.addEventListener('click', function () {
    if (selectedEle) {
      if (text.value.trim()) {
        let newEle = document.createElement('div');
        newEle.innerHTML = text.value.trim();
        newEle.className = 'new';
        selectedEle.appendChild(newEle);
      } else {
        alert('You should input a name first');
      }
    } else {
      alert('You should chose a element first');
    }
    tree.init(function (ele) {
      bindClick(ele);
    });
  });

  deleteBtn.addEventListener('click', function () {
    if (selectedEle) {
      fatherEle.removeChild(selectedEle);
      resetSelect();
    } else {
      alert('You should chose a element first');
    }
    tree.init(function (ele) {
      bindClick(ele);
    });
  });  
};