$(function(){
	
	module( "basic1" );
	
	test("basic", function() {
		
		var triggers = $('<div/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		var blocks = $('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		
		$.swapBlock.bind('click', triggers.find('a'), blocks.find('div'));
		
		ok(triggers.find("a").eq(0).hasClass('swapBlock-enabled'));
		ok(! triggers.find("a").eq(1).hasClass('swapBlock-enabled'));
		ok(! triggers.find("a").eq(2).hasClass('swapBlock-enabled'));
		ok(blocks.find("div").eq(0).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(1).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(2).hasClass('swapBlock-enabled'));
		
		triggers.find("a").eq(1).trigger('click');
		
		ok(! triggers.find("a").eq(0).hasClass('swapBlock-enabled'));
		ok(triggers.find("a").eq(1).hasClass('swapBlock-enabled'));
		ok(! triggers.find("a").eq(2).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(0).hasClass('swapBlock-enabled'));
		ok(blocks.find("div").eq(1).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(2).hasClass('swapBlock-enabled'));
		
		triggers.find("a").eq(2).trigger('click');
		
		ok(! triggers.find("a").eq(0).hasClass('swapBlock-enabled'));
		ok(! triggers.find("a").eq(1).hasClass('swapBlock-enabled'));
		ok(triggers.find("a").eq(2).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(0).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(1).hasClass('swapBlock-enabled'));
		ok(blocks.find("div").eq(2).hasClass('swapBlock-enabled'));
		
		triggers.find("a").eq(0).trigger('click');
		
		ok(triggers.find("a").eq(0).hasClass('swapBlock-enabled'));
		ok(! triggers.find("a").eq(1).hasClass('swapBlock-enabled'));
		ok(! triggers.find("a").eq(2).hasClass('swapBlock-enabled'));
		ok(blocks.find("div").eq(0).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(1).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(2).hasClass('swapBlock-enabled'));
	});
	
	test("Specified class name", function() {
		
		var triggers = $('<div/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		var blocks = $('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		
		$.swapBlock.bind('click', triggers.find('a'), blocks.find('div'), {
			className: {enabled:'myEnabled'}
		});
		
		triggers.find("a").eq(0).trigger('click');
		
		ok(triggers.find("a").eq(0).hasClass('myEnabled'));
		ok(! triggers.find("a").eq(1).hasClass('myEnabled'));
		ok(! triggers.find("a").eq(2).hasClass('myEnabled'));
		ok(blocks.find("div").eq(0).hasClass('myEnabled'));
		ok(! blocks.find("div").eq(1).hasClass('myEnabled'));
		ok(! blocks.find("div").eq(2).hasClass('myEnabled'));
	});

	test("Custom behavior", function() {
		
		var triggers = $('<div/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		var blocks = $('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		
		$.swapBlock.bind('click', triggers.find('a'), blocks.find('div'), {
			swapMethod : function (from_block, to_block) {
				from_block.removeClass('customEnabled');
				to_block.addClass('customEnabled');
			},
		});
		
		triggers.find("a").eq(1).trigger('click');
		
		ok(! blocks.find("div").eq(0).hasClass('customEnabled'));
		ok(blocks.find("div").eq(1).hasClass('customEnabled'));
		ok(! blocks.find("div").eq(2).hasClass('customEnabled'));
		
		triggers.find("a").eq(2).trigger('click');
		
		ok(! blocks.find("div").eq(0).hasClass('customEnabled'));
		ok(! blocks.find("div").eq(1).hasClass('customEnabled'));
		ok(blocks.find("div").eq(2).hasClass('customEnabled'));
	});

	test("disableCurrent", function() {
		
		var triggers = $('<div/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		var blocks = $('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		
		var count = 0;
		
		$.swapBlock.bind('click', triggers.find('a'), blocks.find('div'), {
			swapMethod : function (from_block, to_block) {
				count++;
			},
			disableCurrent: true
		});
		
		triggers.find("a").eq(0).trigger('click');
		
		ok(count === 0);
		
		triggers.find("a").eq(1).trigger('click');
		
		ok(count === 1);
		
		triggers.find("a").eq(1).trigger('click');
		
		ok(count === 1);
		
		triggers.find("a").eq(2).trigger('click');
		
		ok(count === 2);
		
		triggers.find("a").eq(0).trigger('click');
		
		ok(count === 3);
	});

	test("Set default", function() {
		
		var triggers = $('<div/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		var blocks = $('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		
		$.swapBlock.bind('click', triggers.find('a'), blocks.find('div'), {
			default : 2
		});
		
		ok(! triggers.find("a").eq(0).hasClass('swapBlock-enabled'));
		ok(! triggers.find("a").eq(1).hasClass('swapBlock-enabled'));
		ok(triggers.find("a").eq(2).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(0).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(1).hasClass('swapBlock-enabled'));
		ok(blocks.find("div").eq(2).hasClass('swapBlock-enabled'));
	});

	test("Default behavior", function() {
		
		var triggers = $('<div/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		var blocks = $('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		
		var count = 0;
		
		triggers.find("a").eq(1).bind('click', function(){
			count++;
		});
		
		$.swapBlock.bind('click', triggers.find('a'), blocks.find('div'));
		
		triggers.find("a").eq(1).trigger('click');
		
		ok(count == 1);
	});

	test("Multi process", function() {
		
		var triggers = $('<div/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		triggers.append('<a/>');
		var blocks = $('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		blocks.append('<div/>');
		
		var triggers2 = $('<div/>');
		triggers2.append('<a/>');
		triggers2.append('<a/>');
		triggers2.append('<a/>');
		var blocks2 = $('<div/>');
		blocks2.append('<div/>');
		blocks2.append('<div/>');
		blocks2.append('<div/>');
		
		$.swapBlock.bind('click', triggers.find('a'), blocks.find('div'));
		$.swapBlock.bind('click', triggers2.find('a'), blocks2.find('div'));
		
		triggers2.find("a").eq(1).trigger('click');
		
		ok(! triggers2.find("a").eq(0).hasClass('swapBlock-enabled'));
		ok(triggers2.find("a").eq(1).hasClass('swapBlock-enabled'));
		ok(! triggers2.find("a").eq(2).hasClass('swapBlock-enabled'));
		ok(! blocks2.find("div").eq(0).hasClass('swapBlock-enabled'));
		ok(blocks2.find("div").eq(1).hasClass('swapBlock-enabled'));
		ok(! blocks2.find("div").eq(2).hasClass('swapBlock-enabled'));

		ok(triggers.find("a").eq(0).hasClass('swapBlock-enabled'));
		ok(! triggers.find("a").eq(1).hasClass('swapBlock-enabled'));
		ok(! triggers.find("a").eq(2).hasClass('swapBlock-enabled'));
		ok(blocks.find("div").eq(0).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(1).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(2).hasClass('swapBlock-enabled'));
		
		triggers.find("a").eq(2).trigger('click');
		
		ok(! triggers2.find("a").eq(0).hasClass('swapBlock-enabled'));
		ok(triggers2.find("a").eq(1).hasClass('swapBlock-enabled'));
		ok(! triggers2.find("a").eq(2).hasClass('swapBlock-enabled'));
		ok(! blocks2.find("div").eq(0).hasClass('swapBlock-enabled'));
		ok(blocks2.find("div").eq(1).hasClass('swapBlock-enabled'));
		ok(! blocks2.find("div").eq(2).hasClass('swapBlock-enabled'));

		ok(! triggers.find("a").eq(0).hasClass('swapBlock-enabled'));
		ok(! triggers.find("a").eq(1).hasClass('swapBlock-enabled'));
		ok(triggers.find("a").eq(2).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(0).hasClass('swapBlock-enabled'));
		ok(! blocks.find("div").eq(1).hasClass('swapBlock-enabled'));
		ok(blocks.find("div").eq(2).hasClass('swapBlock-enabled'));
	});
});
