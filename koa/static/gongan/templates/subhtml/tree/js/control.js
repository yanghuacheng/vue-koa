var pw = external.parentWindow;
$(function () {
    $(".control-content ul li").hover(function(){
        $(this).children(".checkbox-custom").children('label').addClass('label_other');
        $(this).children(".checkbox-custom").children('label').removeClass('label');
    },function(){
        $(this).children(".checkbox-custom").children('label').addClass('label');
        $(this).children(".checkbox-custom").children('label').removeClass('label_other');
    });
   
//获取
var showHide=pw.window._hook.uirenders.jk1;

if(showHide[0]==1){
    $("#checkBox1").attr('checked',true);
}
if(showHide[1]==1){
    $("#checkBox2").attr('checked',true);
}
if(showHide[2]==1){
    $("#checkBox3").attr('checked',true);
}
if(showHide[3]==1){
    $("#checkBox4").attr('checked',true);
}
if(showHide[4]==1){
    $("#checkBox5").attr('checked',true);
}
if(showHide[5]==1){
    $("#checkBox6").attr('checked',true);
}



    $('[type="checkbox"]').click(function () {
     //   if ($(this).is(':checked')) {
            var name=$(this).parent().children('label').text();
          
                pw.window._hook.plugins.baseinitmodel.showTree(name);
          
            
       // }
    });
    
});

