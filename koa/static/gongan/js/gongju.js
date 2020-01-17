// 图层管理
$('.tuceng ul input').click(function(){
	var idx = $('.tuceng ul input').index($(this));
	if(!$(this).attr('types')){
		$(this).attr('types',0)
	};
	var num = $(this).attr('types');
	if (num%2 == 0) {
		console.log(1)
	} else{
		
	}
	 num++;
	 $(this).attr('types',num);
})

