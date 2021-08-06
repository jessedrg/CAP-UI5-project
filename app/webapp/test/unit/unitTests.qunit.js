/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"be/wl/CAPDemoUI/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});