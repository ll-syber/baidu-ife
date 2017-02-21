/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
// var table = document.getElementById('aqi-table');

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value.trim();
	var num = document.getElementById('aqi-value-input').value.trim();
	var is_illegal = false;
	if (!checkEC(city)) {
		document.getElementById('errormsg_city').innerHTML = '输入必须为中文或英文';
		is_illegal = true;
	} else {
		document.getElementById('errormsg_city').innerHTML = '';
	}
	if (!checkNum(num)) {
		document.getElementById('errormsg_num').innerHTML = '输入必须为数字';
		is_illegal = true;
	} else {
		document.getElementById('errormsg_num').innerHTML = '';
	}
	if (is_illegal) {
		return false;
	}

	aqiData[city] = num;
	return true;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');
	table.innerHTML = "";

	var trh = document.createElement('tr');
	var thc = document.createElement('th');
	var thc_text = document.createTextNode('城市');
	thc.appendChild(thc_text);
	var thn = document.createElement('th');
	var thn_text = document.createTextNode('空气质量');
	thn.appendChild(thn_text);
	var thh = document.createElement('th');
	var thh_text = document.createTextNode('操作');
	thh.appendChild(thh_text);
	table.appendChild(trh);
	trh.appendChild(thc);
	trh.appendChild(thn);
	trh.appendChild(thh);

	for (city in aqiData) {
		var tr = document.createElement('tr');
		var tdc = document.createElement('td');
		var tdc_text = document.createTextNode(city);
		tdc.appendChild(tdc_text);
		var tdn = document.createElement('td');
		var tdn_text = document.createTextNode(aqiData[city]);
		tdn.appendChild(tdn_text);
		var tdd = document.createElement('td');
		var del_btn = document.createElement('button');
		var del_text = document.createTextNode('删除');
		tdd.appendChild(del_btn);
		del_btn.appendChild(del_text);
		table.appendChild(tr);
		tr.appendChild(tdc);
		tr.appendChild(tdn);
		tr.appendChild(tdd);
	}

	var btns = table.getElementsByTagName('button');
	for (var i = 0; i < btns.length; i++) {
		btns[i].onclick = function () {
			delBtnHandle(this);
		}
	}
}

function checkEC(val){     
	var regc = new RegExp("[\\u4E00-\\u9FFF]+","g");
	var rege = new RegExp(/^[A-Za-z]*$/);
	if(regc.test(val) || rege.test(val)){
		return true;
	}
	return false;
}

function checkNum (val) {
	var regn = new RegExp(/^[0-9]*$/);
	if (regn.test(val)) {
		return true;
	}
	return false;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	if (addAqiData()) {
		renderAqiList();
	}
  // addAqiData();
  // renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(del_btn) {
  var del_city = del_btn.parentNode.parentNode.firstChild.firstChild.nodeValue;
  // console.log(del_city);
  delete aqiData[del_city];

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var add_btn = document.getElementById('add-btn');
	// alert(add_btn);
	add_btn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

window.onload = init();
