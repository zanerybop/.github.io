let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
const telegram = window.Telegram.WebApp.initDataUnsafe.user.id;
let hour = 00;
let minute = 00;
let second = 00;
let count = 00;
window.addEventListener('load', async () => {

	console.log("asd");
    window.addEventListener('online', () => {
		let tmp = localStorage.getItem('counter');
		if(tmp!=undefined)
		{
			fetch('https://api.telegram.org/bot5342038816:AAHspsaadbvBTlG4senB-_YZ4vORhULzU9Y/sendMessage', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({"chat_id":telegram, "text":tmp  })
			})
		}
        console.log('Regained internet connection');
    });

    window.addEventListener('offline', () => {
        console.log('Lost internet connection');
    });

});
startBtn.addEventListener('click', function () {
	timer = true;
	stopWatch();
});

stopBtn.addEventListener('click', function () {
	timer = false;
});

resetBtn.addEventListener('click', function () {
	timer = false;
	if(navigator.onLine)
	{
		fetch('https://api.telegram.org/bot5342038816:AAHspsaadbvBTlG4senB-_YZ4vORhULzU9Y/sendMessage', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({"chat_id":telegram, "text":second  })
			})
			.then(response => response.json())
			.then(response => console.log(JSON.stringify(response)))
	}
	localStorage.setItem('counter',second)
	hour = 0;
	minute = 0;
	second = 0;
	count = 0;
	document.getElementById('hr').innerHTML = "00";
	document.getElementById('min').innerHTML = "00";
	document.getElementById('sec').innerHTML = "00";
	document.getElementById('count').innerHTML = "00";
});

function stopWatch() {
	if (timer) {
		count++;

		if (count == 100) {
			second++;
			count = 0;
		}

		if (second == 60) {
			minute++;
			second = 0;
		}

		if (minute == 60) {
			hour++;
			minute = 0;
			second = 0;
		}

		let hrString = hour;
		let minString = minute;
		let secString = second;
		let countString = count;

		if (hour < 10) {
			hrString = "0" + hrString;
		}

		if (minute < 10) {
			minString = "0" + minString;
		}

		if (second < 10) {
			secString = "0" + secString;
		}

		if (count < 10) {
			countString = "0" + countString;
		}

		document.getElementById('hr').innerHTML = hrString;
		document.getElementById('min').innerHTML = minString;
		document.getElementById('sec').innerHTML = secString;
		document.getElementById('count').innerHTML = countString;
		setTimeout(stopWatch, 10);
	}
}
