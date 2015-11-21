enchant();

window.onload = function(){
   var game = new Core(320, 320);

    game.fps = 30;

    game.preload("chara1.png");
    game.preload("icon1.png")
    game.preload("monster3.gif")
    game.onload = function(){
	game.rootScene.backgroundColor = "blue";
        //バーチャルパッドの生成
        var pad = new Pad();
        pad.x   = 0;
        pad.y   = 220;
        game.rootScene.addChild(pad);

        game.keybind( 32, 'a' );
    	
        //sprite1の初期設定
        sprite1 = new Sprite(32, 32);  //サイズを32×32とする
    	sprite1.image = game.assets["chara1.png"]; //画像をしろくまにする
        sprite1.frame = 5;  //画像をしろくまにする
        sprite1.x = parseInt(game.width / 2);  //ｘ座標は画面中央にする
        sprite1.y = game.height - 100;  //Y座標は画面下から100ドット上にする
        sprite1.AnimeTimer = 0;  //たま発射時の初期時間
        sprite1.AnimeFlag = false;  //たま発射時のアニメーション用フラグ
        game.rootScene.addChild(sprite1);

        //ballの初期設定
        ball = new Sprite(16, 16);
    	ball.image = game.assets["icon1.png"];
        ball.frame = 4;
        ball.x = sprite1.x;
        ball.y = sprite1.y;
        ball.visible = false;
        ball.ShotFlag = false;  //たまが発射中か？
        game.rootScene.addChild(ball);

        //bat1の初期設定
        bat1 = new Sprite(48, 48);
    	bat1.image = game.assets["monster3.gif"];
        bat1.frame = 3;
        bat1.x = 0;
        bat1.y = 10;
        bat1.moveNumber = 5;
        bat1.crash = false;
        bat1.crashAnimeTimer = 0;
        game.rootScene.addChild(bat1);

        game.addEventListener(Event.ENTER_FRAME, function(e){

////////////////sprite1の設定
            //スペースキーが押されたら コスチュームを
            if(sprite1.AnimeFlag = true && sprite1.AnimeTimer+1 <= parseInt(game.frame / game.fps)){
                sprite1.AnimeFlag = false;
                sprite1.frame = 5;
            }
////////////////

////////////////bat1の設定
            
            //敵の移動距離の設定
            if(bat1.x > game.width - bat1.width ){
                bat1.moveNumber = -5;
            }else if(bat1.x < 0){
                bat1.moveNumber = 5;
            }
            
            //bat1とBallが当たったら
            if(bat1.crash == true){
                if(bat1.crashAnimeTimer + 2 < parseInt(game.frame / game.fps)){ //2秒間
                    bat1.crash = false;
                    bat1.frame = 3;    //コスチュームを3にする    
                }
            }

            //bat1とBallが当たっていなければ10歩移動する
            if(bat1.crash == false){
                bat1.x += bat1.moveNumber;
            }
            
////////////////
            
////////////////ballの設定
            //ボールと敵が当たったら
            if(bat1.intersect(ball)){
                if(bat1.crash== false){
                    bat1.frame = 1;      //コスチュームを１にする
                    bat1.crash = true;   //当たったフラグをオンにする
                    bat1.crashAnimeTimer = parseInt(game.frame / game.fps);
                }
            }

            
            var input = game.input;

            //たまの発射
            if (input.a){
                if(ball.ShotFlag == false){
                    ball.ShotFlag = true; //たまを発射した状態にする
                    ball.x = sprite1.x; //ボールのX座標をスプライトに合わせる
                    ball.y = sprite1.y; // ボールのY座標をスプライトに合わせる
                    ball.visible = true; //ボールを表示する
                    sprite1.AnimeFlag = true;
                    sprite1.AnimeTimer = parseInt(game.frame / game.fps);
                    sprite1.frame = 6;
                }
            }
            
            //たまが発射中なら
            if(ball.ShotFlag==true){
                if(ball.y > 0){  //上端についてなければ 10歩動かす
                    ball.y-=10; 
                }else{  //上端についたら
                    ball.ShotFlag = false;  //たまの発射状態をオフにする 
                    ball.visible = false;   //たまを消す
                    ball.x = game.width + 100;     //ボールのX座標をスプライトに合わせる
                    ball.y = game.height + 100;     // ボールのY座標をスプライトに合わせる
                }
            }
        });
    };
    game.start();
};
