// JavaScript Document

// Toolbox
function Assets (details) {

	this.oldBrowser = details.oldBrowser;
}

	Assets.prototype.ismobilesafari = function () {

		return navigator.userAgent.match(/(iPod|iPhone|iPad)/);
	}

	Assets.prototype.getWindowHeight = function () {

		this.windowHeight = $(window).height();
	}

	Assets.prototype.classModifier = function (el,className) {

		document.getElementById(el).className += ' ' + className;
	}

	Assets.prototype.classReplacer = function (el,className) {

		document.getElementById(el).className = className;
	}

	Assets.prototype.docLocation = function (url) {

		document.location = url;
	}

	Assets.prototype.loadLocation = function (el,url) {

		$(el).load(url);
	}

var toolbox = new Assets({

	oldBrowser: (function ($) {

					'use strict';

					// Detecting IE
					if ($('html').is('.ie6, .ie7, .ie8, .ie9')) { return true }
					else { return false }

				}(jQuery))
});
