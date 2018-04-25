;(function(){
    var navbar = function(){
        $(document).on('click','.navbar-toggle',function(){
            var target = $(this).data('target');
            if($(target).hasClass('in')){
                $(target).addClass('in').animate({
                    left: -185 + 'px'
                },function(){
                    $(target).removeAttr('style');
                    $(target).removeClass('in');
                });
            }else{
                $(target).animate({
                    left: $(this).width() - 10 + 'px'
                },function(){
                    $(target).addClass('in');
                });
            }
        });
    }

    navbar();
})()