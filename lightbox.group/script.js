// JavaScript Document

// Pinned Footer
$(window).load(function() { $("#pinnedFooter").pinFooter(); });
$(window).resize(function() { $("#pinnedFooter").pinFooter(); });

// Collection
function Collection (details) {

	this.totalResults = details.totalResults;
}

Collection.prototype.showLightbox = function (closing,opening) {
	
	// Slide open
	toolbox.classReplacer('footerBox','footerBox footerBoxOpen');
	toolbox.classReplacer('pinnedFooter','pinnedFooter pinnedFooterOpen');

	// Make inactive Lightboxes transparent
	toolbox.classReplacer('pinnedFooter_' + closing,'pinnedSpacer transparent');
	
	// Set the Lightbox header styles
	toolbox.classReplacer('title_' + closing,'recentlyViewedHeader recentlyViewedTxt recentlyViewedTxtLink ghost');
	toolbox.classReplacer('title_' + opening,'recentlyViewedHeader recentlyViewedTxt');
	
	// Make active Lightbox opaque and hide inactive
	setTimeout(function(){
		document.getElementById('pinnedFooter_' + closing).className += ' inactive';
		document.getElementById('pinnedFooter_' + opening).className = 'pinnedSpacer active opaque';
	}, 500);
}

Collection.prototype.hideLightbox = function () {

	var lb1 = 'favorites';
	var lb2 = 'recents';
	
	// Slide closed
	toolbox.classReplacer('footerBox','footerBox footerBoxClosed');
	toolbox.classReplacer('pinnedFooter','pinnedFooter pinnedFooterClosed');

	// Make inactive Lightboxes transparent
	toolbox.classReplacer('pinnedFooter_' + lb1,'pinnedSpacer transparent');
	toolbox.classReplacer('pinnedFooter_' + lb2,'pinnedSpacer transparent');
	
	// Set the Lightbox header styles
	toolbox.classReplacer('title_' + lb1,'recentlyViewedHeader recentlyViewedTxt recentlyViewedTxtLink');
	toolbox.classReplacer('title_' + lb2,'recentlyViewedHeader recentlyViewedTxt recentlyViewedTxtLink');
}

Collection.prototype.killLightBox = function () {
	toolbox.classReplacer('pinnedFooter','inactive');
	toolbox.classReplacer('footerBox','footerBoxOff');
}

Collection.prototype.loadLightbox = function (items,list) {

	toolbox.loadLocation('#pinnedFooter_' + list,'{site_url}index.php/lightbox/list/' + list + '/' + items);
}

Collection.prototype.addItems = function (entryId,list) {

	toolbox.loadLocation('#pinnedFooter_' + list,'{site_url}index.php/lightbox/add/' + entryId + '/' + list);
}

Collection.prototype.addAll = function (list) {

	toolbox.loadLocation('#pinnedFooter_' + list,'{site_url}index.php/lightbox/add_all/' + list);
}

Collection.prototype.moveItems = function (entryId,list) {

	toolbox.loadLocation('#pinnedFooter_' + list,'{site_url}index.php/lightbox/move/' + entryId + '/' + list);
}

Collection.prototype.removeItems = function (entryId,list) {

	toolbox.loadLocation('#pinnedFooter_' + list,'{site_url}index.php/lightbox/remove/' + entryId + '/' + list);
}

Collection.prototype.clearItems = function (list) {

	toolbox.loadLocation('#pinnedFooter_' + list,'{site_url}index.php/lightbox/clear/' + list);
}

Collection.prototype.refreshLightbox = function (list) {

	toolbox.loadLocation('#pinnedFooter_' + list,'{site_url}index.php/lightbox/load/' + list);
}

Collection.prototype.setLightboxCount = function (el,count) {

	document.getElementById(el).innerHTML = count;
}

var lightbox = new Collection({

	totalResults: '0'
});
