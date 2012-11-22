/*!
 * swapBlock 0.11 - Swap block
 *
 * SYNOPSIS
 *
 * $.swapBlock.bind('click', $(".triggers"), $(".blocks"))
 * $.swapBlock.bind('click', $(".triggers"), $(".blocks"), {...})
 * 
 * history
 * : 2011-11-17 ver0.12 - Add: bubbling option.
 * : 2011-11-16 ver0.11 - Add: default options to set index of initial selection.
 * : 2011-11-28 ver0.10 - API has changed.
 * : 2011-09-13 ver0.9 - Add: showMethod and hideMethod added.
 * : 2011-02-01 ver0.8 - FIX: Had been conflicted with other click events again.
 * : 2010-10-29 ver0.7 - FIX: Had been conflicted with other click events.
 * : 2010-10-29 ver0.6 - FIX: Source code optimization.
 * : 2010-10-12 ver0.5 - FIX: Renewed argument format for swapBlock
 * : 2010-09-15 ver0.4 - FIX: Source code optimization.
 * : 2010-04-08 ver0.3 - 'enabled' class manipulation added.
 * : 2010-04-08 ver0.2 - parameter disableCurrentEntry added.
 * : 2010-04-03 ver0.1 - Initial release
 *
 * Copyright (c) jamadam.com
 */
;(function($) {

    /**
     * plugin name
     */
    var plugname = 'swapBlock';
    
    $[plugname] = $.sub();
    
	var default_params = {
		speed : 300,
		disableCurrent : true,
		className : {
			enabled: plugname + '-enabled'
		},
		swapMethod : function (from_block, to_block) {
			from_block.fadeOut('fast', function () {
				to_block.fadeIn('fast');
			});
		},
		'default': 0,
		bubbling: false
	};
	
	$[plugname].bind = function(etype, triggers, blocks, params) {
		var bs = {
			triggers: triggers,
			blocks 	: blocks,
			params 	: $.extend({}, default_params, params || {})
		};
		if (bs.params['default'] !== undefined) {
			triggers.eq(bs.params['default']).addClass(bs.params.className.enabled);
			blocks.eq(bs.params['default']).addClass(bs.params.className.enabled);
		}
		triggers.each(function(idx){
			$(this).bind(etype + '.' + plugname, function(bs, idx) {
				return function() {
					var to_trigger  = bs.triggers.eq(idx);
					var to_block  	= bs.blocks.eq(idx);
					var classEnabled = bs.params.className.enabled;
					if (bs.params.disableCurrent && to_block.hasClass(classEnabled)) {
						return bs.params['bubbling'];
					}
					var current_block = bs.blocks.filter('.' + classEnabled);
					bs.triggers.removeClass(classEnabled);
					bs.blocks.removeClass(classEnabled);
					to_block.addClass(classEnabled);
					to_trigger.addClass(classEnabled);
					bs.params.swapMethod(current_block, to_block);
					return bs.params['bubbling'];
				}
			}(bs, idx));
		});
	};
})(jQuery);

