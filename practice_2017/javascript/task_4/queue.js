window.onload = function () {
  const [leftInBtn, rightInBtn, leftOutBtn, rightOutBtn] = 
    Array.from(document.querySelectorAll('#control > button'));
  const numberInput = document.getElementById('ipt-number');
  const numberList = document.querySelector('#number-queue');

  //检验输入内容是否为数字
  function checkNum (el) {
    var reg = /\D/g;
    return el.value.length ? !reg.test(el.value) : false;
  }

  //4个按键的处理函数
  function leftIn () {
    if (checkNum(numberInput)) {
      var li = document.createElement('li');
      li.innerHTML = numberInput.value;
      if (numberList.childElementCount) {
        numberList.insertBefore(li, numberList.firstElementChild);
      } else {
        numberList.appendChild(li);
      }
    } else {
      alert('You should input a number');
    }
  }

  function rightIn () {
    if (checkNum(numberInput)) {
      var li = document.createElement('li');
      li.innerHTML = numberInput.value;
      numberList.appendChild(li);
    } else {
      alert('You should input a number');
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
};