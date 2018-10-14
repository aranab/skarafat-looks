var textAnimation = (function () {

    var duration = {
        animationDelay: 2500,
        reveal: 600,
        revealAnimationDelay: 1500
    };

    var animateHeadline = function($headline) {        
        var spanWrapper = $headline.find('.words-wrapper'),
                newWidth = spanWrapper.width() + 10;
            spanWrapper.css('width', newWidth);
        setTimeout(function(){
            hideWord( $headline.find('.is-visible').eq(0) );
        }, duration.animationDelay);
    };

    var hideWord = function($word) {
		var nextWord = takeNext($word);		
		$word.parents('.words-wrapper').animate({ width : '2px' }, duration.reveal, function() {
            switchWord($word, nextWord);
            showWord(nextWord);
        });
    };
    
    var showWord = function($word) {
		$word.parents('.words-wrapper').animate({ 'width' : $word.width() + 10 }, duration.reveal, function() { 
            setTimeout(function(){ 
                hideWord($word);
            }, duration.revealAnimationDelay); 
        });
	};

	var takeNext = function ($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	};

	var switchWord = function($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
    };
    
    return {
        init: animateHeadline
    };
 })();

 module.exports = textAnimation;