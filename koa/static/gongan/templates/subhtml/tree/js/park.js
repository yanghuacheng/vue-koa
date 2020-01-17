// $(function () {
//     var slidesToShowNum = 7;
//     var data = {
//         "status": "0000",
//         "message": "success",
//         "data": [{
//                 "img": [
//                     "images/car.png",
//                     "images/01.png"
//                 ],
//                 "name": "张三",
//                 "gender": "男",
//                 "age": "28",
//                 "address": "科苑北环大道001路口",
//                 "date": "09.21",
//                 "time": "08:08:18",
//                 "percent": "80%"
//             },
//             {
//                 "img": [
//                     "images/01.png",
//                     "images/01.png"
//                 ],
//                 "name": "张五",
//                 "gender": "女",
//                 "age": "18",
//                 "address": "科苑北环大道001路口",
//                 "date": "09.21",
//                 "time": "08:08:18",
//                 "percent": "99.9%"
//             },
//             {
//                 "img": [
//                     "images/car.png",
//                     "images/car.png"
//                 ],
//                 "name": "喜马拉雅",
//                 "gender": "男",
//                 "age": "36",
//                 "address": "科苑北环大道001路口",
//                 "date": "09.21",
//                 "time": "08:08:18",
//                 "percent": "100%"
//             },
//             {
//                 "img": [
//                     "images/car.png",
//                     "images/01.png"
//                 ],
//                 "name": "张三",
//                 "gender": "男",
//                 "age": "28",
//                 "address": "科苑北环大道001路口",
//                 "date": "09.21",
//                 "time": "08:08:18",
//                 "percent": "80%"
//             },
//             {
//                 "img": [
//                     "images/car.png",
//                     "images/01.png"
//                 ],
//                 "name": "张三",
//                 "gender": "男",
//                 "age": "28",
//                 "address": "科苑北环大道001路口",
//                 "date": "09.21",
//                 "time": "08:08:18",
//                 "percent": "80%"
//             },
//             {
//                 "img": [
//                     "images/car.png",
//                     "images/01.png"
//                 ],
//                 "name": "张三",
//                 "gender": "男",
//                 "age": "28",
//                 "address": "科苑北环大道001路口",
//                 "date": "09.21",
//                 "time": "08:08:18",
//                 "percent": "80%"
//             },
//             {
//                 "img": [
//                     "images/car.png",
//                     "images/01.png"
//                 ],
//                 "name": "张三",
//                 "gender": "男",
//                 "age": "28",
//                 "address": "科苑北环大道001路口",
//                 "date": "09.21",
//                 "time": "08:08:18",
//                 "percent": "80%"
//             },
//             {
//                 "img": [
//                     "images/01.png",
//                     "images/01.png"
//                 ],
//                 "name": "赵六",
//                 "gender": "男",
//                 "age": "38",
//                 "address": "科苑北环大道001路口",
//                 "date": "09.21",
//                 "time": "08:08:18",
//                 "percent": "80%"
//             }
//         ]
//     }

//     // $.ajax({
//     //     url: '/js/park.json',
//     //     type: 'GET',
//     //     dataType: 'jsonp',
//     //     success: function (result) {
//     //         var data = result.data,
//     //             sliderHtml = '';
//             for (let v of data) {
//                 sliderHtml = `
//                     <div class="slider-index" sliderIndex="1">
//                         <div class="slider-box">
//                             <div class="imgaes">
//                                 <div class="left">
//                                     <img src="${v.img[0]}">
//                                 </div>
//                                 <div class="right">
//                                     <img src="${v.img[1]}">
//                                 </div>
//                             </div>
//                             <div class="slider-message">
//                                 <div class="personMsg">
//                                     <p>
//                                         <span>${v.name}</span>
//                                         <span>${v.gender} | </span>
//                                         <span>${v.age}岁</span>
//                                     </p>
//                                     <p>${v.address}</p>
//                                     <p>
//                                         <span>${v.date}</span>
//                                         <span>${v.time}</span>
//                                     </p>
//                                 </div>
//                                 <div class="percent">
//                                     <div class="percent-img">
//                                         <img src="images/roundBox-red.png">
//                                     </div>
//                                     <div class="percent-num red">${v.percent}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 `
//                 $("#sliderHtml").append(sliderHtml);
//             }
//             $('.slider').slick({
//                 slidesToShow: slidesToShowNum,
//                 slidesToScroll: 1,
//                 variableWidth: true
//             });

//             $(".slider-index").hover(function () {
//                 $(this).find('.percent-img').children('img').attr('src', 'images/roundBox-blue.png');
//                 $(this).find('.percent-num').removeClass('red').addClass('blue');
//             }, function () {
//                 $(this).find('.percent-img').children('img').attr('src', 'images/roundBox-red.png');
//                 $(this).find('.percent-num').removeClass('blue').addClass('red');
//             });

//             $('.slider-index').click(function () {
//                 console.log('图片信息');
//             });

//             // var slideIndex = data.length;

//             // $('.js-add-slide').on('click', function () {
//             //     slideIndex++;
//             //     $('.slider').slick('slickAdd', '');

//             //     if (slideIndex > slidesToShowNum) {
//             //         $(".slick-next").click();
//             //     }
//             // });
//     //     }
//     // });
// })