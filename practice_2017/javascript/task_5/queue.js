window.onload = function () {
  const [leftInBtn, rightInBtn, leftOutBtn, rightOutBtn, bubbleBtn] = 
    Array.from(document.querySelectorAll('#control > button'));
  const numberInput = document.getElementById('ipt-number');
  const numberList = document.querySelector('#number-queue');
  const items = numberList.getElementsByTagName('li');

  //检验输入内容是否为数字，且是否在10~100范围内
  //返回true为验证通过
  function checkNum (el) {
    var reg = /\D/g;
    if (!el.value.length) {
      alert('You should input a number');
      return false;
    } else if (reg.test(el.value)) {
      alert('You should input a number');
      return false;
    } else if (items.length > 60) {
      alert('The items are limited to 60');
      return false;
    } else if (el.value - 0 < 10 || el.value - 0 > 101) {
      alert('The number should be between 10 and 100');
      return false;
    } else {
      return true;
    }
  }

  //4个按键的处理函数
  function leftIn () {
    if (checkNum(numberInput)) {
      var li = document.createElement('li');
      li.innerHTML = numberInput.value;
      li.style.height = numberInput.value * 3 + 'px';
      if (numberList.childElementCount) {
        numberList.insertBefore(li, numberList.firstElementChild);
      } else {
        numberList.appendChild(li);
      }
    }
  }

  function rightIn () {
   if (checkNum(numberInput)) {
      var li = document.createElement('li');
      li.innerHTML = numberInput.value;
      li.style.height = numberInput.value * 3 + 'px';
      numberList.appendChild(li);
    }
  }

  function leftOut () {
    if (numberList.childElementCount) {
      numberList.removeChild(numberList.firstElementChild);
    }
  }

  function rightOut () {
    if (numberList.childElementCount) {
      numberList.removeChild(numberList.lastElementChild);
    }
  }

  //为4个按键绑定点击事件
  leftInBtn.addEventListener('click', leftIn);
  rightInBtn.addEventListener('click', rightIn);
  leftOutBtn.addEventListener('click', leftOut);
  rightOutBtn.addEventListener('click', rightOut);

  //为列表绑定点击事件
  numberList.addEventListener('click', function (evt) {
    console.log('in');
    if (evt.target && evt.target.nodeName === 'LI') {
      console.log('click li');
      numberList.removeChild(evt.target);
    }
  });

  //冒泡排序
  bubbleBtn.addEventListener('click', function (evt) {
    var 
        len = items.length,
        i = len,
        j = 0;

    setTimeout(function bubble() {
      // console.log('len: ' + len);
      // console.log('j: ' + j);
      if (j > len - 2) {
        j = 0;
        len--;       
      } else {
        // console.log('j: '+items[j].innerHTML + ';j+1: '+items[j + 1].innerHTML);
        if (items[j].innerHTML-0 > items[j + 1].innerHTML-0) {
          console.log('before :' + j);
          numberList.insertBefore(items[j + 1], items[j]);
          console.log('after :' + j);
        }
        j++;
      }
      // console.log('=================');

      if (len > 1) {
        setTimeout(bubble, 200);
      }
    }, 200);
  });
};


//