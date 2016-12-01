'use strict';

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-svg-setclasses !*/

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, n, s) {
	function o(e, n) {
		return (typeof e === "undefined" ? "undefined" : _typeof(e)) === n;
	}function a() {
		var e, n, s, a, t, f, r;for (var c in l) {
			if (l.hasOwnProperty(c)) {
				if (e = [], n = l[c], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (s = 0; s < n.options.aliases.length; s++) {
					e.push(n.options.aliases[s].toLowerCase());
				}for (a = o(n.fn, "function") ? n.fn() : n.fn, t = 0; t < e.length; t++) {
					f = e[t], r = f.split("."), 1 === r.length ? Modernizr[r[0]] = a : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = a), i.push((a ? "" : "no-") + r.join("-"));
				}
			}
		}
	}function t(e) {
		var n = r.className,
		    s = Modernizr._config.classPrefix || "";if (c && (n = n.baseVal), Modernizr._config.enableJSClass) {
			var o = new RegExp("(^|\\s)" + s + "no-js(\\s|$)");n = n.replace(o, "$1" + s + "js$2");
		}Modernizr._config.enableClasses && (n += " " + s + e.join(" " + s), c ? r.className.baseVal = n : r.className = n);
	}var i = [],
	    l = [],
	    f = { _version: "3.3.1", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, n) {
			var s = this;setTimeout(function () {
				n(s[e]);
			}, 0);
		}, addTest: function addTest(e, n, s) {
			l.push({ name: e, fn: n, options: s });
		}, addAsyncTest: function addAsyncTest(e) {
			l.push({ name: null, fn: e });
		} },
	    Modernizr = function Modernizr() {};Modernizr.prototype = f, Modernizr = new Modernizr(), Modernizr.addTest("svg", !!n.createElementNS && !!n.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);var r = n.documentElement,
	    c = "svg" === r.nodeName.toLowerCase();a(), t(i), delete f.addTest, delete f.addAsyncTest;for (var u = 0; u < Modernizr._q.length; u++) {
		Modernizr._q[u]();
	}e.Modernizr = Modernizr;
}(window, document);
function speedometer() {
	var diffAngle = 40;
	var canvas,
	    canvas2,
	    ctx,
	    ctx2,
	    param = {
		startAngle: 90 + diffAngle,
		endAngle: 90 - diffAngle + 360,
		scales: [{
			color: "green",
			size: "44" // %
		}, {
			color: "yellow",
			size: "30" // %
		}, {
			color: "red",
			size: "26" // %
		}]
	},
	    arrowPos,
	    time,
	    maxSpeed = 220,
	    moveTo,
	    moveSpeed;

	this.build = function (id) {
		canvas = document.getElementById(id);
		canvas2 = document.getElementById("speedometer__arrow");

		ctx = canvas.getContext("2d");
		ctx2 = canvas2.getContext("2d");

		var width = canvas.width;

		param.radius = width * 0.9 / 2;

		// check height
		if (canvas.height < param.radius * 2) {
			canvas.height = width;
			canvas2.height = width;
		}

		var height = canvas.height;

		param.centerX = width / 2;
		param.centerY = height / 2;

		buildScale();
		arrowPos = 0;
		buildArrow(arrowPos);
	};

	// degree to radian
	function degToRad(degrees) {
		var radians = degrees / 180 * Math.PI;
		return radians;
	}

	function buildScale() {
		var startAngle = param.startAngle;
		var endAngle = param.endAngle;

		param.scales.forEach(function (scale) {
			endAngle = startAngle + (param.endAngle - param.startAngle) * scale.size / 100;
			buildArc(param.centerX, param.centerY, param.radius, startAngle, endAngle, scale.color);
			startAngle = endAngle;
		});

		function buildArc(centerX, centerY, radius, startAngle, endAngle, color) {
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, degToRad(startAngle), degToRad(endAngle));
			ctx.lineWidth = 20;
			//ctx.fillStyle = "rgba(255, 0, 0, .5)";
			ctx.strokeStyle = color;
			ctx.lineCap = "butt";
			//ctx.fill();
			ctx.stroke();
		}
	}

	function buildArrow(speed) {
		var padding = 5;

		var startDeg = -90 + diffAngle + padding;
		var endDeg = 270 - diffAngle - padding;

		var deltaDeg = 360 - 2 * diffAngle - 2 * padding;

		var deg = degToRad(speed / maxSpeed * deltaDeg + startDeg);

		//ctx2.fillStyle = 'rgba(255,255,255,0.05)';
		//ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
		ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

		var x = param.centerX - param.radius * Math.cos(deg);
		var y = param.centerY - param.radius * Math.sin(deg);

		ctx2.beginPath();
		ctx2.moveTo(param.centerX, param.centerY);
		ctx2.lineTo(x, y);
		ctx2.strokeStyle = "#000";
		ctx2.lineWidth = 10;
		ctx2.stroke();
	}

	function step() {
		if (Math.abs(arrowPos - moveTo) > 1 && Math.abs(arrowPos - maxSpeed) > 1) requestAnimationFrame(step);
		var now = new Date().getTime(),
		    dt = now - (time || now);
		dt /= 1000;

		time = now;

		var direction = arrowPos > moveTo ? -1 : 1;

		arrowPos += direction * moveSpeed * dt;
		buildArrow(arrowPos);
	}

	this.moveArrow = function (speed, time) {
		moveTo = speed;
		moveSpeed = speed / time;
		step();
	};
}

document.addEventListener('DOMContentLoaded', function () {
	var spd = new speedometer();
	spd.build("speedometer");
	spd.moveArrow(220, 2);
});