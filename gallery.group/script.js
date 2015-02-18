// JavaScript Document

// Page
function Page (details) {
	this.windowHeight = details.windowHeight;

	this.lastZoomId = details.lastZoomId;
	this.lastThumbId = details.lastThumbId;

	this.catTitles = details.catTitles;

	this.increment = details.increment;
	this.incrementTotal = details.incrementTotal;

	this.pageCount = details.pageCount;
	this.pageCountTotal = details.pageCountTotal;

	this.imageCount = details.imageCount;
	this.imageColoumns = details.imageColoumns;

	this.moreUrl = details.moreUrl;
	this.theEnd = details.theEnd;

	this.allowed = details.allowed;
}

	Page.prototype.closeZoom = function () {
		document.getElementById(this.lastZoomId).style.height = '0px';
		toolbox.classReplacer(this.lastZoomId,'zoom zoomTxt');
		this.thumbReset(this.lastThumbId);
	}

	Page.prototype.closeThisZoom = function () {
		this.closeZoom();
		var distanceFromTop = $('#'+this.lastZoomId).offset().top;
		$('html,body').animate({ scrollTop: distanceFromTop-400 }, 1000);
	}

	Page.prototype.loadZoom = function (url,catId,rowCount,entryId) {

		// set the current ids
		var thumbId = catId+entryId;
		var zoomId = catId+rowCount;

		// set the Thumb Status
		this.thumbLoading(thumbId);

		// load it
		toolbox.loadLocation('#'+zoomId,url);
	}

	Page.prototype.openZoom = function (zoomHeight,catId,rowCount,entryId) {
		
		// set the current ids
		var thumbId = catId+entryId;
		var zoomId = catId+rowCount;

		// Check if it's the last row
		function lastRowCheck (tic,rc,ic,te) {
			var theDifference = (parseFloat(tic))-(parseFloat(rc));
			if ((te) && (theDifference <= ic)) { return true }
			else { return false }
		}

		function sameIdCheck (ltid,lzid) {
			if ((ltid != thumbId) && (lzid != undefined)) { return true }
			else { return false }
		}

		// if its not the same id close the last zoom and reset the last thumb
		var isUniqueId = sameIdCheck(this.lastThumbId,this.lastZoomId);
		if (isUniqueId) { this.closeZoom(); }

		// set the thumb status
		this.thumbLoaded(thumbId);

		// get the height from the loaded content and open zoom box to this height
		document.getElementById(zoomId).style.height = zoomHeight + 'px';

		// If it's the last page and last row change the class
		var isLastRow = lastRowCheck(this.imageCount,rowCount,this.imageColoumns,this.theEnd);
		if (isLastRow) { toolbox.classModifier(zoomId,'zoomLastActive'); }
		else { toolbox.classModifier(zoomId,'zoomActive'); }

		// scroll into view but wait for zoom animation to finish .5 sec
		setTimeout(function(){
			var distanceFromTop = $('#'+zoomId).offset().top - 127;
			$('html,body').animate({ scrollTop: distanceFromTop }, 1000);
		},501);

		// remember ids for next close/open
		this.lastThumbId = thumbId;
		this.lastZoomId = zoomId;
	}

	Page.prototype.addTitle = function (catTitle,catId) {

		this.catTitles[catTitle] = { name : catTitle, id : catId };
	}

	Page.prototype.getTitles = function () {

		var thisTitleCount = 0;
		var html = '<span class="zoomTitle">';

		// Get the size of the catTitles object
		function getObjLength (obj) { 

			var size = 0;

			for (key in obj) {
				if (obj.hasOwnProperty(key)) { size += 1; }
			}

			return size;

		}

		var catTitlesCount = getObjLength(this.catTitles);

		for (var key in this.catTitles) {

			thisTitleCount += 1;
			html += this.catTitles[key].name;
			if (thisTitleCount < catTitlesCount) {
				html += ',&nbsp;&nbsp;';
			}

		}

		html += '</span><br>'
		return html;
	}

	Page.prototype.getHTML = function (el) {

		var titlesHtml = this.getTitles();
		$('#' + el).append(titlesHtml);
	}

	Page.prototype.thumbTitle = function (code,title) {

		if (this.allowed) { document.getElementById('imgCode_' + code).innerHTML = title; }
	}

	Page.prototype.thumbLoading = function (thumbId) {
		toolbox.classReplacer('thumbDimmer_'+thumbId,'thumbBox thumbDimmer thumbActive');
		toolbox.classReplacer('thumbLoading_'+thumbId,'thumbBox thumbBoxAni thumbActive');
		toolbox.classReplacer('thumbInfo_'+thumbId,'thumbBox thumbInactive');
		document.getElementById('thumbInfo_'+thumbId).style.visibility = 'hidden';
	}

	Page.prototype.thumbLoaded = function (thumbId) {

		toolbox.classReplacer ('thumbLoading_'+thumbId,'thumbBox thumbBoxAni thumbInactive');
	}

	Page.prototype.thumbReset = function (thumbId) {
		document.getElementById('thumbInfo_'+thumbId).style.visibility = 'visible';
		toolbox.classReplacer('thumbDimmer_'+thumbId,'thumbBox thumbBoxAni thumbDimmer thumbInactive');
		toolbox.classReplacer('thumbLoading_'+thumbId,'thumbBox thumbBoxAni thumbInactive');
		toolbox.classReplacer('thumbInfo_'+thumbId,'thumbBox thumbBoxAni thumbInfo');
	}

	Page.prototype.endCheck = function (pc,pct) {
		if (pc == pct) {
			this.theEnd = true;
			return true
		} else { return false }
	}

	Page.prototype.loadMore = function (url) {

		// set the load more button to loading
		document.getElementById('loadingMoreBox').style.visibility = 'visible';
		document.getElementById('loadMoreBox').style.visibility = 'hidden';

		// load the thumbnails into the div
		var pageURL = url + this.increment + '/' + this.incrementTotal;
		this.pageCount += 1;
		toolbox.loadLocation('#thumbnails_' + this.pageCount,pageURL);

		// set next page
		this.increment += this.incrementTotal;
	}

	Page.prototype.loadMoreStatus = function () {
		var checkTheEnd = this.endCheck(this.pageCount,this.pageCountTotal);
		if (checkTheEnd) {
			document.getElementById('loadingMoreBox').style.visibility = 'hidden';
			document.getElementById('loadingMoreBox').style.height = '0px';
			document.getElementById('loadingMoreBox').style.padding = '0px';
			document.getElementById('loadMoreBoxSpacer').style.visibility = 'hidden';
			document.getElementById('loadMoreBoxSpacer').style.padding = '0px';
			document.getElementById('thumbnailBox').style.paddingBottom = '48px';
		} else {
			document.getElementById('loadMoreBox').style.visibility = 'visible';
			document.getElementById('loadingMoreBox').style.visibility = 'hidden';
			toolbox.classReplacer('loadMoreBox', 'loadMoreBox loadMore');
		}
	}

	Page.prototype.loadComplete = function (categoryId,RowCount,entryId) {

		var zoomId = categoryId + RowCount;
		var thisThumbId = categoryId + entryId;
	
		// Get the height of the content
		var zoomContentHeight = document.getElementById('zoomContent_' + thisThumbId).offsetHeight;

		// Now that im here .. open the zoom and pass the height of my content
		this.openZoom(zoomContentHeight,categoryId,RowCount,entryId);
	}

var gallery = new Page({
	windowHeight: $(window).height(),

	lastZoomId: undefined, 
	lastThumbId: undefined,

	catTitles: {},

	increment: 0,
	incrementTotal: 0,

	pageCount: 0,
	pageCountTotal: 0,

	imageCount: 0,
	imageColoumns: undefined,

	moreUrl: '',
	theEnd: false,

	allowed: false
});

// Names
function Names (details) {
	this.catNames = details.catNames;
	this.catNamesCount = details.catNamesCount;
	this.catBoxSt = details.catBoxSt;

	this.totalNames = details.totalNames;
	this.totalHeight = details.totalHeight;
}

	Names.prototype.getColMax = function (len) {
		var limit = Math.ceil(len/6);
		if (limit < 3) { limit = 3; }
		return limit;
	}

	Names.prototype.addName = function (catName,catId,catUrl) {
		this.catNames[this.catNamesCount] = {
												
												name: catName,
												id: catId,
												url: catUrl

											};
		this.catNamesCount += 1;
	}

	Names.prototype.getHTML = function (el,count) {

		// get max per coloumn
		var nameLimit = this.getColMax(count);

		// start a coloumn
		var html = '<div class="categoriesCell">';

		// get each name
		var colNameCount = 0;
		for (var i=0, l=count; i < l; i++) {

			// get current name and id
			var category_name = this.catNames[i].name;
			var category_id = this.catNames[i].id;
			var category_url = this.catNames[i].url;

			// if active link
			if ('{segment_4}' == category_id) {

				html += '<div style="margin-left: -14px;">'
					  + '<div style="display: table-cell;"><div class="categoriesCellActiveBox"></div></div>'
					  + '<div style="display: table-cell;"><span class="categoriesCellTxtActive">' + category_name + '</span></div>'
					  + '</div>';

			// not active
			} else {

				html += '<a href="' + category_url + '">' + category_name + '</a><br>';

			}

			// start a new coloumn if we hit the max
			colNameCount += 1;
			if (colNameCount == nameLimit) {

				html += '</div><div class="categoriesCell">';
				colNameCount = 0;

			}

		}

		html += '</div>';

		$(el).append(html);
	}

	Names.prototype.categoryBoxCheck = function (boxEl,nameEl) {

		function updateCategoryBox (bEl,nEl,txt,ht) {

			document.getElementById(bEl).style.height = ht;
			document.getElementById(nEl).innerHTML = (txt);

		}

		if (this.catBoxSt == false) {
			updateCategoryBox(boxEl,nameEl,'Hide Names',this.totalHeight + 'px');
			this.catBoxSt = true;
		} else {
			updateCategoryBox(boxEl,nameEl,'Show Names','0px');
			this.catBoxSt = false;
		}
	}

var category = new Names({
	catNames: {},
	catNamesCount: 0,
	catBoxSt: false,

	totalNames: 0,
	totalHeight: 0
});
