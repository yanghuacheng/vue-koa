//点击场景中相机视频点位图标，播放视频
/**
 * 
 * @param {*} cameraId 摄像头id
 */
// 右侧视频  44030552001320002321 //首页进来播放
var nowUrl = '';
var nowUrl1 = '';
var bas_url = "rtmp://190.32.33.80:9935/live/44030552001320002321"
var _daplayer = null;
playVideo(bas_url);


function playVideo(cameraId, wuren) {
	// alert(cameraId)

	if (!cameraId) { alertmodel('暂无视频'); return; }
	nowUrl = cameraId;
	if (!wuren) {
		nowUrl1 = cameraId;
	};
	//rtmp://190.32.33.94/fhstream/0K1DEAR00A2377?type=play&wowzatokenhash=41863542c1973c837d6466fa01e9ca9cd55ca81e&wowzatokenendtime=1571972382
	// alertmodel(cameraId);

	if ($('#playercontainer').html()) {
		$('#playercontainer *').remove();
	};
	_daplayer = new Aliplayer({
		id: 'playercontainer',
		width: '100%',
		height: '100%',
		autoplay: true,
		isLive: true,
		showBarTime: '200',
		//支持播放地址播放,此播放优先级最高
		source: cameraId,
	}, function (player) {
		console.log('播放器创建好了。', player);
	});
	bigplayVideo(cameraId);
	return null;

}
// 大视频同步
function bigplayVideo(cameraId) {
	//rtmp://190.32.33.94/fhstream/0K1DEAR00A2377?type=play&wowzatokenhash=41863542c1973c837d6466fa01e9ca9cd55ca81e&wowzatokenendtime=1571972382
	if ($('#bigplayVideo').html()) {
		$('#bigplayVideo *').remove();
	};
	nowUrl = cameraId;
	var player = new Aliplayer({
		id: 'bigplayVideo',
		width: '100%',
		height: '100%',
		autoplay: true,
		isLive: true,
		showBarTime: '200',
		//支持播放地址播放,此播放优先级最高
		source: cameraId,
	}, function (player) {
		console.log('播放器创建好了。')
	});
	return player;
}
// 高空视频同步
function Highvideo(cameraId) {

	//rtmp://190.32.33.94/fhstream/0K1DEAR00A2377?type=play&wowzatokenhash=41863542c1973c837d6466fa01e9ca9cd55ca81e&wowzatokenendtime=1571972382
	nowUrl = cameraId;
	if ($('#Highvideo').html()) {
		$('#Highvideo *').remove();
	};
	var player = new Aliplayer({
		id: 'Highvideo',
		width: '100%',
		height: '100%',
		autoplay: true,
		isLive: true,
		showBarTime: '200',
		//支持播放地址播放,此播放优先级最高
		source: cameraId,
	}, function (player) {
		console.log('播放器创建好了。')
	});
	return player;
}
//无人机视频
function wrenvideo(cameraId) {
	let _self = this;
	this.player = null;
	//在这销毁播放器以及隐藏div
	this.playDispose = function () {
		if (_self.player) {
			disposePlayer(_self.player);
			$('.wrenvideo').show();
			if ($('#wrenvideo').html()) {
				$('#wrenvideo *').remove();
			};
		}
	}
	//rtmp://190.32.33.94/fhstream/0K1DEAR00A2377?type=play&wowzatokenhash=41863542c1973c837d6466fa01e9ca9cd55ca81e&wowzatokenendtime=1571972382
	$('.wrenvideo').show();
	if ($('#wrenvideo').html()) {
		$('#wrenvideo *').remove();
	};
	var player = new Aliplayer({
		id: 'wrenvideo',
		width: '100%',
		height: '100%',
		autoplay: true,
		isLive: true,
		showBarTime: '200',
		//支持播放地址播放,此播放优先级最高
		source: cameraId,
	}, function (player) {
		console.log('播放器创建好了。');
		this.player = player;

	});

}
//热力图视频播放
function thermalMapVideoPlay(videoUrl) {
	if ($('#thermalMapVideo').html()) {
		$('#thermalMapVideo *').remove();
	};
	let player = new Aliplayer({
		id: 'thermalMapVideo',
		width: '100%',
		height: '100%',
		autoplay: true,
		isLive: true,
		showBarTime: '200',
		//支持播放地址播放,此播放优先级最高
		source: videoUrl,
	}, function (pl) {
		console.log('播放器创建好了。')


	})
	return player;
}
function alertmodel(str) {
	$('.alertmodel').addClass('show');
	$('.alertmodel p').html(str);
}
$('.alertmodel button').click(function () {
	$('.alertmodel').removeClass('show');
})

//销毁和停止
function playDispose(play) {
	if (play) {
		// play.pause();
		// play.dispose();//销毁播放器
		// play = null;
	}

}

//销毁和停止
function disposePlayer(player) {
	if (player) {
		player.pause();
		player.dispose();//销毁播放器
		player = null;
	}
}




