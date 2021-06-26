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

    const question_num = Math.floor(Math.random() * (dataString.length));
    localStorage.setItem('value', question_num);
    const question_volume = dataArray[question_num].length;

    const interValid = setInterval(() => {
        print(dataArray[question_num]);
        if (count >= question_volume) {
            window.location.href = 'choice.html';
            clearInterval(interValid);
        }
    }, 3000);

}

function print(data) {
    output_svg.innerHTML = data[count];
    console.log(count);
    count++;
}

csv_data('mondai.csv'); // csvのパス