const output_svg = document.getElementById('questions');

let count = 0;


function csv_data(dataPath) {
    const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
    request.addEventListener('load', (event) => { // ロードさせ実行
        const response = event.target.responseText; // 受け取ったテキストを返す
        csv_array(response);
    });
    request.open('GET', dataPath, true); // csvのパスを指定
    request.send();
}

function csv_array(data) {
    const dataArray = []; //配列を用意
    const dataString = data.split('\n'); //改行で分割
    for (let i = 0; i < dataString.length; i++) { //あるだけループ
        dataArray[i] = dataString[i].split(',');
    }
    flash_question(dataArray, dataString);
}

function flash_question(dataArray, dataString) {
    const len = dataString.length;
    const question_num = getRandom(len);
    localStorage.setItem('value', question_num);
    const question_volume = dataArray[question_num].length;
    const interValid = setInterval(() => {
        if (count >= question_volume) {
            window.location.href = 'choice.html';
            clearInterval(interValid);
        }

        if (count < question_volume) {
            print(dataArray[question_num]);
            count++;
        }
    }, 3000);

}

function print(data) {
    output_svg.innerHTML = data[count];
    console.log(count);
}

function getRandom(len) {
    let data = [];
    data[0] = 0;
    data = sessionStorage.getItem('array');
    let value;
    let count;
    console.log(data);
    if (data.length > 0) {
        while (true) {
            count = 0;
            value = Math.floor(Math.random() * (len));
            for (let i = 0; i < data.length; i++) {
                if (data[i] == value) {
                    count++;
                }
            }
            if (count == 0) {
                break;
            }
        }
    }
    if (data.length < 1) {
        value = Math.floor(Math.random() * (len));
        data[0] = value;
        sessionStorage.setItem('array', data);
    } else {
        data.push(value);
        sessionStorage.setItem('array', data);
    }
    console.log(data);
    return value;
}

csv_data('mondai.csv'); // csvのパス