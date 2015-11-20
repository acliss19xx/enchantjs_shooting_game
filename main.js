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
    	
        sprite1 = new Sprite(32, 32);
    	sprite1.image = game.assets["chara1.png"];
        sprite1.x = parseInt(game.width / 2);
        sprite1.y = 250;
        sprite1.frame = 5;
        game.rootScene.addChild(sprite1);

        ball = new Sprite(16, 16);
    	ball.image = game.assets["icon1.png"];
        ball.x = sprite1.x;
        ball.y = sprite1.y;
        ball.frame = 4;
        ball.visible = false;
        ball.ShotFlag = false;
        game.rootScene.addChild(ball);

        bat1 = new Sprite(48, 48);
    	bat1.image = game.assets["monster3.gif"];
        bat1.x = 0;
        bat1.y = 10;
        bat1.frame = 3;
        bat1.moveNumber = 5;
        bat1.crash = false;
        bat1.crashAnimeTimer = 0;
        game.rootScene.addChild(bat1);

        game.addEventListener(Event.ENTER_FRAME, function(e){

            //敵の移動距離の設定
            if(bat1.x > game.width - bat1.width ){
                bat1.moveNumber = -5;
            }else if(bat1.x < 0){
                bat1.moveNumber = 5;
            }
            
            //ボールと敵が当たったら
            if(bat1.intersect(ball)){
                if(bat1.crash== false){
                    bat1.frame = 1;　　//コスチュームを１にする
                    bat1.crash = true;　//当たったフラグをオンにする
                    bat1.crashAnimeTimer = parseInt(game.frame / game.fps);
                }
            }

            //当たったフラグがオンなら
            if(bat1.crash == true){
                if(bat1.crashAnimeTimer + 2 < parseInt(game.frame / game.fps)){
                    bat1.crash = false;
                    bat1.frame = 3;    //コスチュームを3にする    
                }
            }

            //敵と当たっていなければ移動する
            if(bat1.crash == false){
                bat1.x += bat1.moveNumber;
            }
            
            
            var input = game.input;

            //たまの発射
            if (input.a){
                if(ball.ShotFlag == false){
                    ball.ShotFlag = true; //たまを発射した状態にする
                    ball.x = sprite1.x; //ボールのX座標をスプライトに合わせる
                    ball.y = sprite1.y; // ボールのY座標をスプライトに合わせる
                    ball.visible = true; //ボールを表示する

                }
            }
            
            //ボールが飛んでいれば
            if(ball.ShotFlag==true){
                if(ball.y > 0){　//上端についてなければ
                    ball.y-=10; 
                }else{　//上端についたら
                    ball.ShotFlag = false; //たまの発射状態をオフにする 
                    ball.visible = false;　//たまを消す
                    ball.x = sprite1.x; 　//ボールのX座標をスプライトに合わせる
                    ball.y = sprite1.y;　// ボールのY座標をスプライトに合わせる
                }
            }
        });
    };
    game.start();
};
