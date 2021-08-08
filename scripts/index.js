document.addEventListener("DOMContentLoaded", () => {
	var list = document.querySelectorAll('li.nav-item');
	var focusList = document.getElementById('list');
	for (let num = 0; num < list.length; num++)
	{
		if (list.item(num).classList.contains('active')) {
			Selection(list.item(num).id);
		}
	}
	focusList.addEventListener('click', (e) => {
		let flag;
		for (let num = 0; num < list.length; num++)
		{
			if (!list.item(num).classList.contains('active') && (e.target == list.item(num))) {
				flag = list.item(num);
				list.item(num).classList.add('active');
			} else if (e.target != list.item(num)) {
				list.item(num).classList.remove('active');
			}
		}
		Selection(flag.id);
	});

});

function Clear(arg)
{
    let myNode = document.querySelector(arg);
    while(myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function ShowAcceptedTests(data) {
	let body = document.querySelector('div.row');
	Clear('div.row');
	if (data == null) {
		let msg = document.createElement('div');
		msg.setAttribute("class", "alert alert-warning");
		msg.innerHTML = "У вас нет пройденных тестов.";
		body.appendChild(msg);
		return;
	}  
	for (let num = 0; num < data.length; num++)
	{
		let card = document.createElement('div');
		card.classList.add('card');
		card.classList.add('border-dark');
		card.classList.add('mb-3');
		let card_body = document.createElement('div');
		card_body.classList.add('card-body');
		let h_name = document.createElement('h4');
		h_name.classList.add('card-title');
		h_name.innerHTML = data[num][1];
		let h = document.createElement('h5');
		h.classList.add('card-title');
		h.innerHTML = "Результат: " + data[num][2] + "%";
		card_body.appendChild(h_name);
		card_body.appendChild(h);
		let p = document.createElement('p');
		p.classList.add('card-text');
		p.classList.add('text-dark');
		p.innerHTML = "Время начала: " + data[num][3] + " - " + data[num][4];
		card_body.appendChild(p);
		card.appendChild(card_body);
		body.appendChild(card);
	}
}

function ShowTests(data) {
	let body = document.querySelector('div.row');
	Clear('div.row');
	if (data == null) {
		let msg = document.createElement('div');
		msg.setAttribute("class", "alert alert-warning");
		msg.innerHTML = "У вас нет непройденных тестов.";
		body.appendChild(msg);
		return;
	}  
	for (let num = 0; num < data.length; num++)
	{
		let col = document.createElement('div');
		col.classList.add('col-sm-' + ((num % 2 == 0) ? "4" : "6"));
		let card = document.createElement('div');
		card.classList.add('card');
		card.classList.add('border-dark');
		card.classList.add('mb-3');
		let card_body = document.createElement('div');
		card_body.classList.add('card-body');
		let h = document.createElement('h5');
		h.classList.add('card-title');
		h.innerHTML = data[num][1];
		card_body.appendChild(h);
		let p = document.createElement('p');
		p.classList.add('card-text');
		p.classList.add('text-dark');
		p.innerHTML = data[num][2];
		card_body.appendChild(p);
		let time = document.createElement('h6');
		time.innerHTML = "Время выполнения: " + data[num][3];
		console.log(Number(data[num][3].slice(0, 2)));
		card_body.appendChild(time);
		let btn = document.createElement('button');
		btn.id = data[num][0];
		btn.classList.add('btn');
		btn.classList.add('btn-primary');
		btn.innerHTML = "Пройти тест";
		card_body.appendChild(btn);
		card.appendChild(card_body)
		col.appendChild(card);
		body.appendChild(col);
	}

	document.querySelector('div.row').addEventListener('click', function(e) {
		if (e.target.classList.contains('btn')) {
			let date = new Date();
			console.log(`${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`);
			Selection(
				'getTest', 
				e.target.id, 
				`${date.getFullYear()}:${date.getMonth() + 1}:${date.getDate()}`, 
				`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
			);
		}
	});
}

function CreateTest(data)
{
	Clear('div.container');
	console.log(data);
	let body = document.querySelector('div.container');
	let col_time_all = document.createElement('div');
	col_time_all.classList.add('col-sm-6');
	col_time_all.innerHTML = "Общее время прохождения теста: " + data[data.length - 1]['time'];
	let time_end = (Number(data[data.length - 1]['time'].slice(0, 2)) * 60 * 60) + (Number(data[data.length - 1]['time'].slice(3, 5)) * 60) + (Number(data[data.length - 1]['time'].slice(6, 8)));
	if (data[data.length - 1]['time_start']) {
		let startTime = (Number(data[data.length - 1]['time_start'].slice(0, 2)) * 60 * 60) + (Number(data[data.length - 1]['time_start'].slice(3, 5)) * 60) + (Number(data[data.length - 1]['time_start'].slice(6, 8)));
		let timeNow = new Date();
		let hoursNow = timeNow.getHours();
		let minutesNow = timeNow.getMinutes();
		let secondsNow = timeNow.getSeconds();
		console.log((hoursNow * 60 * 60 + minutesNow * 60 + secondsNow) - startTime);
		time_end -= ((hoursNow * 60 * 60 + minutesNow * 60 + secondsNow) - startTime);
	} 
	let time_text_out = document.createElement('div');
	time_text_out.classList.add('col-sm-6');
	var timer = setInterval(function() {
		hours = time_end / 60 / 60;
		minutes = time_end / 60 % 60;
		seconds = time_end % 60;
		if (time_end <= 0) {
			clearInterval(time_end);
			console.log('КОНЕЦ');
		} else {
			let strTime = `Осталось: ${Math.trunc(hours)}:${Math.trunc(minutes)}:${seconds}`;
			time_text_out.innerHTML = strTime;
		}
		time_end--;
	}, 1000);
	body.appendChild(col_time_all);
	body.appendChild(time_text_out);
	let navbar_test = document.createElement('nav');
	navbar_test.setAttribute('class', 'navbar navbar-light bg-light');
	navbar_test.id = 'navbar-test';
	let navbar_test_item_list = document.createElement('nav');
	navbar_test_item_list.setAttribute('class', 'nav nav-pills flex-row');
	let navbar_test_item_text = document.createElement('div');
	navbar_test_item_text.setAttribute('data-spy', 'scroll');
	navbar_test_item_text.setAttribute('data-target', '#navbar-test');
	navbar_test_item_text.setAttribute('data-offset', '0');
	navbar_test_item_text.classList.add('inputTest');
	for (let num = 0; num < data.length - 1; num++)
	{
		let anchor = document.createElement('a');
		anchor.classList.add('nav-link');
		anchor.href = "#item-" + (num + 1);
		anchor.innerHTML = "Вопрос " + (num + 1);
		navbar_test_item_list.appendChild(anchor);
		let question_number = document.createElement('h4');
		question_number.id = "item-" + (num + 1);
		question_number.innerHTML = "Вопрос " + (num + 1) + ": " + data[num]['question'];
		let text_question = document.createElement('label');
		let inAnswer = document.createElement('input');
		inAnswer.type = "text";
		inAnswer.id = question_number.id + "-i";
		text_question.innerHTML = "Ответ: ";
		text_question.appendChild(inAnswer);
		navbar_test_item_text.appendChild(question_number);
		navbar_test_item_text.appendChild(text_question);
	}
	navbar_test.appendChild(navbar_test_item_list);
	body.appendChild(navbar_test);
	body.appendChild(navbar_test_item_text);
	let btnConfirmBlock = document.createElement('div');
	btnConfirmBlock.classList.add('col-sm-6');
	let btnConfirm = document.createElement('button');
	btnConfirm.id = "confirmTest";
	btnConfirm.setAttribute('class', 'btn btn-primary');
	btnConfirm.innerHTML = "Завершить тест";
	btnConfirmBlock.appendChild(btnConfirm);
	body.appendChild(btnConfirmBlock);
	document.getElementById('confirmTest').addEventListener('click', function(e) {
		clearInterval(timer);
		let dataInput = new Array();
		let inputData = document.querySelector('div.inputTest');
		let inputs = inputData.getElementsByTagName('input');
		for (let num = 0; num < inputs.length; num++)
		{
			dataInput.push(inputs[num].value);
		}
		console.log(Array(dataInput));
		Selection('check', data[data.length - 1]['id_test'], '', '', Array(dataInput));
	});
}

function ShowResult(data)
{
	Clear('div.container');
	let body = document.querySelector('div.container');
	let textResult = document.createElement('div');
	textResult.setAttribute('class', 'col-sm-6 text-center');
	textResult.innerHTML = "Ваш результат: " + Math.round((data[1] * 100) / data[0]) + "%";
	body.appendChild(textResult);
}