function wall (details) {

	this.page = details.page;
	this.col = details.col;
	this.element = details.element;
	this.pageCount = details.pageCount;
	this.totalEntries = details.totalEntries;
	this.pageIncrement = details.pageIncrement;

}

// For each coloumn get the total height and save it to the coloumn object
wall.prototype.getHeights = function (success) {

	for (var key in news.col) {

		news.col[key].height = document.getElementById(key).offsetHeight;

	}

	success();
}

// Go through coloumns and return the shortest
wall.prototype.getShortCol = function (success) {

	//  Get the total heights for each coloumn first
	this.getHeights(function(){

		var shortColId = undefined;
		var shortColHeight = 0;

		// For each coloumn check if it's the shortest
		for (var key in news.col) {

			if ((shortColId == undefined) || (news.col[key].height < shortColHeight)) {

				shortColId = key;
				shortColHeight = news.col[key].height;
			}

		}

		var shortCol = {

			id: shortColId,
			height: shortColHeight

		}

		// Return the shortest coloumn object (id and height)
		success(shortCol);

	});
}

//HTML
wall.prototype.bulletin = function (title,img,txt,link) {

	var content = '<div style="display: table; width: 255px;" align="left"><span style="text-transform: uppercase; font-size: 18px; text-align: left;">' + title + '</span></div>';
	var linkOpen = '';
	var linkClose = '';

	if (link != '') {

		linkOpen = '<a href="' + link + '" target="_new">';
		linkClose = '</a>';

	}

	if (img != '') {

		content += '<div style="display: table; padding-top: 20px;">' + linkOpen + '<img src="' + img + '" border="0">' + linkClose + '</div>';

	}

	if (txt != '') {

		content += '<div style="display: table; width: 255px;" align="left"><span style="font-size: 14px; text-align: left;">' + linkOpen + txt + linkClose + '</span></div>';

	}

	var container = '<div style="width: 295px; padding: 20px;"><div style="padding: 20px; background-color: #1e1e1e; box-shadow: 0px 0px 5px #101010;">' + content + '</div></div>';

	return container;
}

// Inject each element into next shortest coloumn
wall.prototype.postArticles = function () {

	// Cycle through each element
	for (var key in news.element) {

		// Find next shortest col and append html
		news.getShortCol(function(shortest){

			var html = news.element[key].content;
			$('#' + shortest.id).append(html);

		});

	}
}

var news = new wall({

	page: {

		sticky: {

			title: undefined,
			images: undefined,
			link: undefined,
			text: undefined,
			height: 0

		}

	},

	col: {},

	element: {},

	pageCount: 0,
	totalEntries: 0,
	pageIncrement: 27

});