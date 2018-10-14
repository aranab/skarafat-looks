var skillAnimation = (function () {

    var process = {        
        start: false,
        finished: false
    };

    var processing = function() {
        if ( process.finished ) {
            return;
        }
        if ( process.start ) {
            return;
        }
        run();
    };

    var run = function() {  
        process.start = true;             
        $('.progress .progress-bar').each(function () {
            var progressWidth = $(this).data('progress-value') + '%';
            $(this).css({
                width: progressWidth
            });
            $(this).find('.progress-value').animate({
                countNum: parseInt(progressWidth, 10)
            }, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $(this).text(Math.floor(this.countNum) + '%');
                },
                complete: function () {
                    $(this).text(this.countNum + '%');
                }
            });
        });
        process.finished = true;
    };
    
    return {       
        run: processing
    };
 })();

 module.exports = skillAnimation;