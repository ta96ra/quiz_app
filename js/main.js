'use strict';

{
  const question = document.getElementById('question'); //問題文p
  const choices = document.getElementById('choices'); //回答（選択肢）ul
  const btn = document.getElementById('btn');  //次へdiv
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p')


  // 出題範囲[{q:問題文,c:[回答(選択肢)]}]
  const quizSet = shuffle([
    {q: '日本で一番面積の小さい都道府県は？',c:['香川県','大阪府','佐賀県']},
    {q: '２の８条は？',c:['256','512','128']},
    {q: '次のうち停止状態から10秒以内で100kmに到達できる車はどれか',c:['アクア','アルトワークス','S660']},
    {q: 'この中で一番昔に起こった出来事は',c:['日清戦争','日露戦争','第一次世界大戦']},
    {q: '正露丸は昔どのように書いたか？',c:['征露丸','制露丸','正ロ丸']},
    {q: 'この中で一番遅いのはどれか？',c:['ゼロ戦','リニアモーターカーL0系','ホンダジェット']},
  ]);
  // shuffle(a)でaの順序をランダムに並び変えることができる
  

  let currentNum = 0; //今何問目のクイズを解いているか
  let isAnswered;  //設問中に回答したか指定ないかtrue/false
  let score = 0; //正答数を管理するもの



    // 選択肢のシャッフルについて：フィッシャー・イェーツのアルゴリズム
  //→範囲を狭めながら最後の要素とランダムに選んだ要素を狭めていくもの
  // ex 1,2,3,4,5 → 最後の5と1~5のランダムに選んだ数値3を入れ替え、
  //1,2,5,4,3 → 範囲１個を狭めて最後の4と1,2,5,4のランダムに選んだ数値2の入れ替え
  //1,4,5,2,3 → これを繰り返し、範囲がなくなるまでやる。

  //フィッシャー・イェーツのアルゴリズムを使って選択肢の順番をシャッフルする関数
  function shuffle(arr){   //arrを配列として引数に渡す  
    for(let i = arr.length - 1;i > 0; i--){
      // 配列最後の値のインデックス = 配列の要素の数 - 1;iが0より大きい間、１ずつ減らしていく
      const j = Math.floor(Math.random() * (i + 1));
      // 範囲の中からランダムに選んだ要素を定数Jに代入
      [arr[j],arr[i]] = [arr[i],arr[j]];
      // 分割代入でjとiを入れ替える
    }
    return arr;
  }

  // 正誤判定をするための関数
  function checkAnswer(li){
    if(isAnswered === true){
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');
      score++;
    }else{
      li.classList.add('wrong');
    }
    // インデックス番号0なら正解で緑それ以外は誤りで赤になる

    btn.classList.remove('disabled'); //回答するとnextボタンを押せるようにする

  }  

// 次の問題を出題させる関数
  function setQuiz(){
    isAnswered = false;
      // 問題、選択肢のjsでの埋め込み
    question.textContent = quizSet[currentNum].q; //問題の埋め込み

    //setQuizで回答の選択肢を表示する前に、一度全部の選択肢を削除
    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
      // ulの最初の子要素がある限り、最初の子要素を削除
    }
    

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    console.log(quizSet[currentNum].c);
    shuffledChoices.forEach(choice =>{   //選択肢の埋め込み
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click',()=>{
        checkAnswer(li);
      })
      choices.appendChild(li);
    });
    if(currentNum === quizSet.length - 1){
      btn.textContent = 'Show Score';
      // 最後の問題まで行けば、nextボタンの表示をshowScoreにする
    }
  }

  setQuiz(); //１問目の出題

  // nextボタンを押した時の処理
  btn.addEventListener('click',() =>{
    if(btn.classList.contains('disabled')){
      return;
      // ボタンにdisableクラスがついていたら次の問題に行かない
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length - 1){
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}