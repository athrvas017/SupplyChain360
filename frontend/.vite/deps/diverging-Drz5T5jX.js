import { $ as bisectRight, G as initRange, K as range, W as initInterpolator, X as ticks, Y as tickStep, _ as transformer$2, b as value_default, et as number$1, g as identity$1, h as copy$1, it as ascending, l as format, m as continuous, nt as bisector, p as formatSpecifier, q as max$1, r as linearish, tt as numbers, v as number$2, y as round_default } from "./quantize-CsOVkTR9.js";
//#region node_modules/d3-shape/src/constant.js
function constant_default(x) {
	return function constant() {
		return x;
	};
}
//#endregion
//#region node_modules/d3-shape/src/math.js
var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min$1 = Math.min;
var sin = Math.sin;
var sqrt$1 = Math.sqrt;
var epsilon$1 = 1e-12;
var pi$1 = Math.PI;
var halfPi = pi$1 / 2;
var tau$1 = 2 * pi$1;
function acos(x) {
	return x > 1 ? 0 : x < -1 ? pi$1 : Math.acos(x);
}
function asin(x) {
	return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}
//#endregion
//#region node_modules/d3-path/src/path.js
var pi = Math.PI, tau = 2 * pi, epsilon = 1e-6, tauEpsilon = tau - epsilon;
function append(strings) {
	this._ += strings[0];
	for (let i = 1, n = strings.length; i < n; ++i) this._ += arguments[i] + strings[i];
}
function appendRound(digits) {
	let d = Math.floor(digits);
	if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
	if (d > 15) return append;
	const k = 10 ** d;
	return function(strings) {
		this._ += strings[0];
		for (let i = 1, n = strings.length; i < n; ++i) this._ += Math.round(arguments[i] * k) / k + strings[i];
	};
}
var Path = class {
	constructor(digits) {
		this._x0 = this._y0 = this._x1 = this._y1 = null;
		this._ = "";
		this._append = digits == null ? append : appendRound(digits);
	}
	moveTo(x, y) {
		this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
	}
	closePath() {
		if (this._x1 !== null) {
			this._x1 = this._x0, this._y1 = this._y0;
			this._append`Z`;
		}
	}
	lineTo(x, y) {
		this._append`L${this._x1 = +x},${this._y1 = +y}`;
	}
	quadraticCurveTo(x1, y1, x, y) {
		this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
	}
	bezierCurveTo(x1, y1, x2, y2, x, y) {
		this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
	}
	arcTo(x1, y1, x2, y2, r) {
		x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
		if (r < 0) throw new Error(`negative radius: ${r}`);
		let x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
		if (this._x1 === null) this._append`M${this._x1 = x1},${this._y1 = y1}`;
		else if (!(l01_2 > epsilon));
		else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) this._append`L${this._x1 = x1},${this._y1 = y1}`;
		else {
			let x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
			if (Math.abs(t01 - 1) > epsilon) this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
			this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
		}
	}
	arc(x, y, r, a0, a1, ccw) {
		x = +x, y = +y, r = +r, ccw = !!ccw;
		if (r < 0) throw new Error(`negative radius: ${r}`);
		let dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x + dx, y0 = y + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
		if (this._x1 === null) this._append`M${x0},${y0}`;
		else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) this._append`L${x0},${y0}`;
		if (!r) return;
		if (da < 0) da = da % tau + tau;
		if (da > tauEpsilon) this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
		else if (da > epsilon) this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
	}
	rect(x, y, w, h) {
		this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
	}
	toString() {
		return this._;
	}
};
function path() {
	return new Path();
}
path.prototype = Path.prototype;
function pathRound(digits = 3) {
	return new Path(+digits);
}
//#endregion
//#region node_modules/d3-shape/src/path.js
function withPath(shape) {
	let digits = 3;
	shape.digits = function(_) {
		if (!arguments.length) return digits;
		if (_ == null) digits = null;
		else {
			const d = Math.floor(_);
			if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
			digits = d;
		}
		return shape;
	};
	return () => new Path(digits);
}
//#endregion
//#region node_modules/d3-shape/src/array.js
var slice = Array.prototype.slice;
function array_default(x) {
	return typeof x === "object" && "length" in x ? x : Array.from(x);
}
//#endregion
//#region node_modules/d3-shape/src/curve/linear.js
function Linear(context) {
	this._context = context;
}
Linear.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
				break;
			case 1: this._point = 2;
			default:
				this._context.lineTo(x, y);
				break;
		}
	}
};
function linear_default(context) {
	return new Linear(context);
}
//#endregion
//#region node_modules/d3-shape/src/point.js
function x(p) {
	return p[0];
}
function y(p) {
	return p[1];
}
//#endregion
//#region node_modules/d3-shape/src/line.js
function line_default(x$1, y$1) {
	var defined = constant_default(true), context = null, curve = linear_default, output = null, path = withPath(line);
	x$1 = typeof x$1 === "function" ? x$1 : x$1 === void 0 ? x : constant_default(x$1);
	y$1 = typeof y$1 === "function" ? y$1 : y$1 === void 0 ? y : constant_default(y$1);
	function line(data) {
		var i, n = (data = array_default(data)).length, d, defined0 = false, buffer;
		if (context == null) output = curve(buffer = path());
		for (i = 0; i <= n; ++i) {
			if (!(i < n && defined(d = data[i], i, data)) === defined0) if (defined0 = !defined0) output.lineStart();
			else output.lineEnd();
			if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
		}
		if (buffer) return output = null, buffer + "" || null;
	}
	line.x = function(_) {
		return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant_default(+_), line) : x$1;
	};
	line.y = function(_) {
		return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant_default(+_), line) : y$1;
	};
	line.defined = function(_) {
		return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default(!!_), line) : defined;
	};
	line.curve = function(_) {
		return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
	};
	line.context = function(_) {
		return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
	};
	return line;
}
//#endregion
//#region node_modules/d3-shape/src/area.js
function area_default(x0, y0, y1) {
	var x1 = null, defined = constant_default(true), context = null, curve = linear_default, output = null, path = withPath(area);
	x0 = typeof x0 === "function" ? x0 : x0 === void 0 ? x : constant_default(+x0);
	y0 = typeof y0 === "function" ? y0 : y0 === void 0 ? constant_default(0) : constant_default(+y0);
	y1 = typeof y1 === "function" ? y1 : y1 === void 0 ? y : constant_default(+y1);
	function area(data) {
		var i, j, k, n = (data = array_default(data)).length, d, defined0 = false, buffer, x0z = new Array(n), y0z = new Array(n);
		if (context == null) output = curve(buffer = path());
		for (i = 0; i <= n; ++i) {
			if (!(i < n && defined(d = data[i], i, data)) === defined0) if (defined0 = !defined0) {
				j = i;
				output.areaStart();
				output.lineStart();
			} else {
				output.lineEnd();
				output.lineStart();
				for (k = i - 1; k >= j; --k) output.point(x0z[k], y0z[k]);
				output.lineEnd();
				output.areaEnd();
			}
			if (defined0) {
				x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
				output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
			}
		}
		if (buffer) return output = null, buffer + "" || null;
	}
	function arealine() {
		return line_default().defined(defined).curve(curve).context(context);
	}
	area.x = function(_) {
		return arguments.length ? (x0 = typeof _ === "function" ? _ : constant_default(+_), x1 = null, area) : x0;
	};
	area.x0 = function(_) {
		return arguments.length ? (x0 = typeof _ === "function" ? _ : constant_default(+_), area) : x0;
	};
	area.x1 = function(_) {
		return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant_default(+_), area) : x1;
	};
	area.y = function(_) {
		return arguments.length ? (y0 = typeof _ === "function" ? _ : constant_default(+_), y1 = null, area) : y0;
	};
	area.y0 = function(_) {
		return arguments.length ? (y0 = typeof _ === "function" ? _ : constant_default(+_), area) : y0;
	};
	area.y1 = function(_) {
		return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant_default(+_), area) : y1;
	};
	area.lineX0 = area.lineY0 = function() {
		return arealine().x(x0).y(y0);
	};
	area.lineY1 = function() {
		return arealine().x(x0).y(y1);
	};
	area.lineX1 = function() {
		return arealine().x(x1).y(y0);
	};
	area.defined = function(_) {
		return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default(!!_), area) : defined;
	};
	area.curve = function(_) {
		return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
	};
	area.context = function(_) {
		return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
	};
	return area;
}
//#endregion
//#region node_modules/d3-shape/src/pointRadial.js
function pointRadial_default(x, y) {
	return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}
//#endregion
//#region node_modules/d3-shape/src/curve/bump.js
var Bump = class {
	constructor(context, x) {
		this._context = context;
		this._x = x;
	}
	areaStart() {
		this._line = 0;
	}
	areaEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		this._line = 1 - this._line;
	}
	point(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				if (this._line) this._context.lineTo(x, y);
				else this._context.moveTo(x, y);
				break;
			case 1: this._point = 2;
			default:
				if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x) / 2, this._y0, this._x0, y, x, y);
				else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y) / 2, x, this._y0, x, y);
				break;
		}
		this._x0 = x, this._y0 = y;
	}
};
var BumpRadial = class {
	constructor(context) {
		this._context = context;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {}
	point(x, y) {
		x = +x, y = +y;
		if (this._point === 0) this._point = 1;
		else {
			const p0 = pointRadial_default(this._x0, this._y0);
			const p1 = pointRadial_default(this._x0, this._y0 = (this._y0 + y) / 2);
			const p2 = pointRadial_default(x, this._y0);
			const p3 = pointRadial_default(x, y);
			this._context.moveTo(...p0);
			this._context.bezierCurveTo(...p1, ...p2, ...p3);
		}
		this._x0 = x, this._y0 = y;
	}
};
function bumpX(context) {
	return new Bump(context, true);
}
function bumpY(context) {
	return new Bump(context, false);
}
function bumpRadial(context) {
	return new BumpRadial(context);
}
//#endregion
//#region node_modules/d3-shape/src/symbol/asterisk.js
var sqrt3$2 = sqrt$1(3);
var asterisk_default = { draw(context, size) {
	const r = sqrt$1(size + min$1(size / 28, .75)) * .59436;
	const t = r / 2;
	const u = t * sqrt3$2;
	context.moveTo(0, r);
	context.lineTo(0, -r);
	context.moveTo(-u, -t);
	context.lineTo(u, t);
	context.moveTo(-u, t);
	context.lineTo(u, -t);
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/circle.js
var circle_default = { draw(context, size) {
	const r = sqrt$1(size / pi$1);
	context.moveTo(r, 0);
	context.arc(0, 0, r, 0, tau$1);
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/cross.js
var cross_default = { draw(context, size) {
	const r = sqrt$1(size / 5) / 2;
	context.moveTo(-3 * r, -r);
	context.lineTo(-r, -r);
	context.lineTo(-r, -3 * r);
	context.lineTo(r, -3 * r);
	context.lineTo(r, -r);
	context.lineTo(3 * r, -r);
	context.lineTo(3 * r, r);
	context.lineTo(r, r);
	context.lineTo(r, 3 * r);
	context.lineTo(-r, 3 * r);
	context.lineTo(-r, r);
	context.lineTo(-3 * r, r);
	context.closePath();
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/diamond.js
var tan30 = sqrt$1(1 / 3);
var tan30_2 = tan30 * 2;
var diamond_default = { draw(context, size) {
	const y = sqrt$1(size / tan30_2);
	const x = y * tan30;
	context.moveTo(0, -y);
	context.lineTo(x, 0);
	context.lineTo(0, y);
	context.lineTo(-x, 0);
	context.closePath();
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/diamond2.js
var diamond2_default = { draw(context, size) {
	const r = sqrt$1(size) * .62625;
	context.moveTo(0, -r);
	context.lineTo(r, 0);
	context.lineTo(0, r);
	context.lineTo(-r, 0);
	context.closePath();
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/plus.js
var plus_default = { draw(context, size) {
	const r = sqrt$1(size - min$1(size / 7, 2)) * .87559;
	context.moveTo(-r, 0);
	context.lineTo(r, 0);
	context.moveTo(0, r);
	context.lineTo(0, -r);
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/square.js
var square_default = { draw(context, size) {
	const w = sqrt$1(size);
	const x = -w / 2;
	context.rect(x, x, w, w);
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/square2.js
var square2_default = { draw(context, size) {
	const r = sqrt$1(size) * .4431;
	context.moveTo(r, r);
	context.lineTo(r, -r);
	context.lineTo(-r, -r);
	context.lineTo(-r, r);
	context.closePath();
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/star.js
var ka = .8908130915292852;
var kr = sin(pi$1 / 10) / sin(7 * pi$1 / 10);
var kx = sin(tau$1 / 10) * kr;
var ky = -cos(tau$1 / 10) * kr;
var star_default = { draw(context, size) {
	const r = sqrt$1(size * ka);
	const x = kx * r;
	const y = ky * r;
	context.moveTo(0, -r);
	context.lineTo(x, y);
	for (let i = 1; i < 5; ++i) {
		const a = tau$1 * i / 5;
		const c = cos(a);
		const s = sin(a);
		context.lineTo(s * r, -c * r);
		context.lineTo(c * x - s * y, s * x + c * y);
	}
	context.closePath();
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/triangle.js
var sqrt3$1 = sqrt$1(3);
var triangle_default = { draw(context, size) {
	const y = -sqrt$1(size / (sqrt3$1 * 3));
	context.moveTo(0, y * 2);
	context.lineTo(-sqrt3$1 * y, -y);
	context.lineTo(sqrt3$1 * y, -y);
	context.closePath();
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/triangle2.js
var sqrt3 = sqrt$1(3);
var triangle2_default = { draw(context, size) {
	const s = sqrt$1(size) * .6824;
	const t = s / 2;
	const u = s * sqrt3 / 2;
	context.moveTo(0, -s);
	context.lineTo(u, t);
	context.lineTo(-u, t);
	context.closePath();
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/wye.js
var c = -.5;
var s = sqrt$1(3) / 2;
var k = 1 / sqrt$1(12);
var a = (k / 2 + 1) * 3;
var wye_default = { draw(context, size) {
	const r = sqrt$1(size / a);
	const x0 = r / 2, y0 = r * k;
	const x1 = x0, y1 = r * k + r;
	const x2 = -x1, y2 = y1;
	context.moveTo(x0, y0);
	context.lineTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
	context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
	context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
	context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
	context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
	context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
	context.closePath();
} };
//#endregion
//#region node_modules/d3-shape/src/symbol/times.js
var times_default = { draw(context, size) {
	const r = sqrt$1(size - min$1(size / 6, 1.7)) * .6189;
	context.moveTo(-r, -r);
	context.lineTo(r, r);
	context.moveTo(-r, r);
	context.lineTo(r, -r);
} };
//#endregion
//#region node_modules/d3-shape/src/symbol.js
var symbolsFill = [
	circle_default,
	cross_default,
	diamond_default,
	square_default,
	star_default,
	triangle_default,
	wye_default
];
var symbolsStroke = [
	circle_default,
	plus_default,
	times_default,
	triangle2_default,
	asterisk_default,
	square2_default,
	diamond2_default
];
function Symbol$1(type, size) {
	let context = null, path = withPath(symbol);
	type = typeof type === "function" ? type : constant_default(type || circle_default);
	size = typeof size === "function" ? size : constant_default(size === void 0 ? 64 : +size);
	function symbol() {
		let buffer;
		if (!context) context = buffer = path();
		type.apply(this, arguments).draw(context, +size.apply(this, arguments));
		if (buffer) return context = null, buffer + "" || null;
	}
	symbol.type = function(_) {
		return arguments.length ? (type = typeof _ === "function" ? _ : constant_default(_), symbol) : type;
	};
	symbol.size = function(_) {
		return arguments.length ? (size = typeof _ === "function" ? _ : constant_default(+_), symbol) : size;
	};
	symbol.context = function(_) {
		return arguments.length ? (context = _ == null ? null : _, symbol) : context;
	};
	return symbol;
}
//#endregion
//#region node_modules/d3-shape/src/noop.js
function noop_default() {}
//#endregion
//#region node_modules/d3-shape/src/curve/basis.js
function point$2(that, x, y) {
	that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x) / 6, (that._y0 + 4 * that._y1 + y) / 6);
}
function Basis(context) {
	this._context = context;
}
Basis.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 3: point$2(this, this._x1, this._y1);
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
		}
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
			default:
				point$2(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = x;
		this._y0 = this._y1, this._y1 = y;
	}
};
function basis_default(context) {
	return new Basis(context);
}
//#endregion
//#region node_modules/d3-shape/src/curve/basisClosed.js
function BasisClosed(context) {
	this._context = context;
}
BasisClosed.prototype = {
	areaStart: noop_default,
	areaEnd: noop_default,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x2, this._y2);
				this._context.closePath();
				break;
			case 2:
				this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
				this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
				this._context.closePath();
				break;
			case 3:
				this.point(this._x2, this._y2);
				this.point(this._x3, this._y3);
				this.point(this._x4, this._y4);
				break;
		}
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._x2 = x, this._y2 = y;
				break;
			case 1:
				this._point = 2;
				this._x3 = x, this._y3 = y;
				break;
			case 2:
				this._point = 3;
				this._x4 = x, this._y4 = y;
				this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
				break;
			default:
				point$2(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = x;
		this._y0 = this._y1, this._y1 = y;
	}
};
function basisClosed_default(context) {
	return new BasisClosed(context);
}
//#endregion
//#region node_modules/d3-shape/src/curve/basisOpen.js
function BasisOpen(context) {
	this._context = context;
}
BasisOpen.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6;
				this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
				break;
			case 3: this._point = 4;
			default:
				point$2(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = x;
		this._y0 = this._y1, this._y1 = y;
	}
};
function basisOpen_default(context) {
	return new BasisOpen(context);
}
//#endregion
//#region node_modules/d3-shape/src/curve/linearClosed.js
function LinearClosed(context) {
	this._context = context;
}
LinearClosed.prototype = {
	areaStart: noop_default,
	areaEnd: noop_default,
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		if (this._point) this._context.closePath();
	},
	point: function(x, y) {
		x = +x, y = +y;
		if (this._point) this._context.lineTo(x, y);
		else this._point = 1, this._context.moveTo(x, y);
	}
};
function linearClosed_default(context) {
	return new LinearClosed(context);
}
//#endregion
//#region node_modules/d3-shape/src/curve/monotone.js
function sign(x) {
	return x < 0 ? -1 : 1;
}
function slope3(that, x2, y2) {
	var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
	return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), .5 * Math.abs(p)) || 0;
}
function slope2(that, t) {
	var h = that._x1 - that._x0;
	return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}
function point$1(that, t0, t1) {
	var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
	that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}
function MonotoneX(context) {
	this._context = context;
}
MonotoneX.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
			case 3:
				point$1(this, this._t0, slope2(this, this._t0));
				break;
		}
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		var t1 = NaN;
		x = +x, y = +y;
		if (x === this._x1 && y === this._y1) return;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				point$1(this, slope2(this, t1 = slope3(this, x, y)), t1);
				break;
			default:
				point$1(this, this._t0, t1 = slope3(this, x, y));
				break;
		}
		this._x0 = this._x1, this._x1 = x;
		this._y0 = this._y1, this._y1 = y;
		this._t0 = t1;
	}
};
function MonotoneY(context) {
	this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
	MonotoneX.prototype.point.call(this, y, x);
};
function ReflectContext(context) {
	this._context = context;
}
ReflectContext.prototype = {
	moveTo: function(x, y) {
		this._context.moveTo(y, x);
	},
	closePath: function() {
		this._context.closePath();
	},
	lineTo: function(x, y) {
		this._context.lineTo(y, x);
	},
	bezierCurveTo: function(x1, y1, x2, y2, x, y) {
		this._context.bezierCurveTo(y1, x1, y2, x2, y, x);
	}
};
function monotoneX(context) {
	return new MonotoneX(context);
}
function monotoneY(context) {
	return new MonotoneY(context);
}
//#endregion
//#region node_modules/d3-shape/src/curve/natural.js
function Natural(context) {
	this._context = context;
}
Natural.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = [];
		this._y = [];
	},
	lineEnd: function() {
		var x = this._x, y = this._y, n = x.length;
		if (n) {
			this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
			if (n === 2) this._context.lineTo(x[1], y[1]);
			else {
				var px = controlPoints(x), py = controlPoints(y);
				for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
			}
		}
		if (this._line || this._line !== 0 && n === 1) this._context.closePath();
		this._line = 1 - this._line;
		this._x = this._y = null;
	},
	point: function(x, y) {
		this._x.push(+x);
		this._y.push(+y);
	}
};
function controlPoints(x) {
	var i, n = x.length - 1, m, a = new Array(n), b = new Array(n), r = new Array(n);
	a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
	for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
	a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
	for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
	a[n - 1] = r[n - 1] / b[n - 1];
	for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
	b[n - 1] = (x[n] + a[n - 1]) / 2;
	for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
	return [a, b];
}
function natural_default(context) {
	return new Natural(context);
}
//#endregion
//#region node_modules/d3-shape/src/curve/step.js
function Step(context, t) {
	this._context = context;
	this._t = t;
}
Step.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = this._y = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
				break;
			case 1: this._point = 2;
			default:
				if (this._t <= 0) {
					this._context.lineTo(this._x, y);
					this._context.lineTo(x, y);
				} else {
					var x1 = this._x * (1 - this._t) + x * this._t;
					this._context.lineTo(x1, this._y);
					this._context.lineTo(x1, y);
				}
				break;
		}
		this._x = x, this._y = y;
	}
};
function step_default(context) {
	return new Step(context, .5);
}
function stepBefore(context) {
	return new Step(context, 0);
}
function stepAfter(context) {
	return new Step(context, 1);
}
//#endregion
//#region node_modules/d3-shape/src/offset/none.js
function none_default$1(series, order) {
	if (!((n = series.length) > 1)) return;
	for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
		s0 = s1, s1 = series[order[i]];
		for (j = 0; j < m; ++j) s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
	}
}
//#endregion
//#region node_modules/d3-shape/src/order/none.js
function none_default(series) {
	var n = series.length, o = new Array(n);
	while (--n >= 0) o[n] = n;
	return o;
}
//#endregion
//#region node_modules/d3-shape/src/stack.js
function stackValue(d, key) {
	return d[key];
}
function stackSeries(key) {
	const series = [];
	series.key = key;
	return series;
}
function stack_default() {
	var keys = constant_default([]), order = none_default, offset = none_default$1, value = stackValue;
	function stack(data) {
		var sz = Array.from(keys.apply(this, arguments), stackSeries), i, n = sz.length, j = -1, oz;
		for (const d of data) for (i = 0, ++j; i < n; ++i) (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
		for (i = 0, oz = array_default(order(sz)); i < n; ++i) sz[oz[i]].index = i;
		offset(sz, oz);
		return sz;
	}
	stack.keys = function(_) {
		return arguments.length ? (keys = typeof _ === "function" ? _ : constant_default(Array.from(_)), stack) : keys;
	};
	stack.value = function(_) {
		return arguments.length ? (value = typeof _ === "function" ? _ : constant_default(+_), stack) : value;
	};
	stack.order = function(_) {
		return arguments.length ? (order = _ == null ? none_default : typeof _ === "function" ? _ : constant_default(Array.from(_)), stack) : order;
	};
	stack.offset = function(_) {
		return arguments.length ? (offset = _ == null ? none_default$1 : _, stack) : offset;
	};
	return stack;
}
//#endregion
//#region node_modules/d3-shape/src/offset/expand.js
function expand_default(series, order) {
	if (!((n = series.length) > 0)) return;
	for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
		for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
		if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
	}
	none_default$1(series, order);
}
//#endregion
//#region node_modules/d3-shape/src/offset/silhouette.js
function silhouette_default(series, order) {
	if (!((n = series.length) > 0)) return;
	for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
		for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
		s0[j][1] += s0[j][0] = -y / 2;
	}
	none_default$1(series, order);
}
//#endregion
//#region node_modules/d3-shape/src/offset/wiggle.js
function wiggle_default(series, order) {
	if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
	for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
		for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
			var si = series[order[i]], sij0 = si[j][1] || 0, s3 = (sij0 - (si[j - 1][1] || 0)) / 2;
			for (var k = 0; k < i; ++k) {
				var sk = series[order[k]], skj0 = sk[j][1] || 0, skj1 = sk[j - 1][1] || 0;
				s3 += skj0 - skj1;
			}
			s1 += sij0, s2 += s3 * sij0;
		}
		s0[j - 1][1] += s0[j - 1][0] = y;
		if (s1) y -= s2 / s1;
	}
	s0[j - 1][1] += s0[j - 1][0] = y;
	none_default$1(series, order);
}
//#endregion
//#region node_modules/internmap/src/index.js
var InternMap = class extends Map {
	constructor(entries, key = keyof) {
		super();
		Object.defineProperties(this, {
			_intern: { value: /* @__PURE__ */ new Map() },
			_key: { value: key }
		});
		if (entries != null) for (const [key, value] of entries) this.set(key, value);
	}
	get(key) {
		return super.get(intern_get(this, key));
	}
	has(key) {
		return super.has(intern_get(this, key));
	}
	set(key, value) {
		return super.set(intern_set(this, key), value);
	}
	delete(key) {
		return super.delete(intern_delete(this, key));
	}
};
var InternSet = class extends Set {
	constructor(values, key = keyof) {
		super();
		Object.defineProperties(this, {
			_intern: { value: /* @__PURE__ */ new Map() },
			_key: { value: key }
		});
		if (values != null) for (const value of values) this.add(value);
	}
	has(value) {
		return super.has(intern_get(this, value));
	}
	add(value) {
		return super.add(intern_set(this, value));
	}
	delete(value) {
		return super.delete(intern_delete(this, value));
	}
};
function intern_get({ _intern, _key }, value) {
	const key = _key(value);
	return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
	const key = _key(value);
	if (_intern.has(key)) return _intern.get(key);
	_intern.set(key, value);
	return value;
}
function intern_delete({ _intern, _key }, value) {
	const key = _key(value);
	if (_intern.has(key)) {
		value = _intern.get(key);
		_intern.delete(key);
	}
	return value;
}
function keyof(value) {
	return value !== null && typeof value === "object" ? value.valueOf() : value;
}
//#endregion
//#region node_modules/d3-array/src/permute.js
function permute(source, keys) {
	return Array.from(keys, (key) => source[key]);
}
//#endregion
//#region node_modules/d3-array/src/sort.js
function sort(values, ...F) {
	if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
	values = Array.from(values);
	let [f] = F;
	if (f && f.length !== 2 || F.length > 1) {
		const index = Uint32Array.from(values, (d, i) => i);
		if (F.length > 1) {
			F = F.map((f) => values.map(f));
			index.sort((i, j) => {
				for (const f of F) {
					const c = ascendingDefined(f[i], f[j]);
					if (c) return c;
				}
			});
		} else {
			f = values.map(f);
			index.sort((i, j) => ascendingDefined(f[i], f[j]));
		}
		return permute(values, index);
	}
	return values.sort(compareDefined(f));
}
function compareDefined(compare = ascending) {
	if (compare === ascending) return ascendingDefined;
	if (typeof compare !== "function") throw new TypeError("compare is not a function");
	return (a, b) => {
		const x = compare(a, b);
		if (x || x === 0) return x;
		return (compare(b, b) === 0) - (compare(a, a) === 0);
	};
}
function ascendingDefined(a, b) {
	return (a == null || !(a >= a)) - (b == null || !(b >= b)) || (a < b ? -1 : a > b ? 1 : 0);
}
//#endregion
//#region node_modules/d3-array/src/maxIndex.js
function maxIndex(values, valueof) {
	let max;
	let maxIndex = -1;
	let index = -1;
	if (valueof === void 0) for (const value of values) {
		++index;
		if (value != null && (max < value || max === void 0 && value >= value)) max = value, maxIndex = index;
	}
	else for (let value of values) if ((value = valueof(value, ++index, values)) != null && (max < value || max === void 0 && value >= value)) max = value, maxIndex = index;
	return maxIndex;
}
//#endregion
//#region node_modules/d3-array/src/min.js
function min(values, valueof) {
	let min;
	if (valueof === void 0) {
		for (const value of values) if (value != null && (min > value || min === void 0 && value >= value)) min = value;
	} else {
		let index = -1;
		for (let value of values) if ((value = valueof(value, ++index, values)) != null && (min > value || min === void 0 && value >= value)) min = value;
	}
	return min;
}
//#endregion
//#region node_modules/d3-array/src/minIndex.js
function minIndex(values, valueof) {
	let min;
	let minIndex = -1;
	let index = -1;
	if (valueof === void 0) for (const value of values) {
		++index;
		if (value != null && (min > value || min === void 0 && value >= value)) min = value, minIndex = index;
	}
	else for (let value of values) if ((value = valueof(value, ++index, values)) != null && (min > value || min === void 0 && value >= value)) min = value, minIndex = index;
	return minIndex;
}
//#endregion
//#region node_modules/d3-array/src/quickselect.js
function quickselect(array, k, left = 0, right = Infinity, compare) {
	k = Math.floor(k);
	left = Math.floor(Math.max(0, left));
	right = Math.floor(Math.min(array.length - 1, right));
	if (!(left <= k && k <= right)) return array;
	compare = compare === void 0 ? ascendingDefined : compareDefined(compare);
	while (right > left) {
		if (right - left > 600) {
			const n = right - left + 1;
			const m = k - left + 1;
			const z = Math.log(n);
			const s = .5 * Math.exp(2 * z / 3);
			const sd = .5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
			const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
			const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
			quickselect(array, k, newLeft, newRight, compare);
		}
		const t = array[k];
		let i = left;
		let j = right;
		swap(array, left, k);
		if (compare(array[right], t) > 0) swap(array, left, right);
		while (i < j) {
			swap(array, i, j), ++i, --j;
			while (compare(array[i], t) < 0) ++i;
			while (compare(array[j], t) > 0) --j;
		}
		if (compare(array[left], t) === 0) swap(array, left, j);
		else ++j, swap(array, j, right);
		if (j <= k) left = j + 1;
		if (k <= j) right = j - 1;
	}
	return array;
}
function swap(array, i, j) {
	const t = array[i];
	array[i] = array[j];
	array[j] = t;
}
//#endregion
//#region node_modules/d3-array/src/greatest.js
function greatest(values, compare = ascending) {
	let max;
	let defined = false;
	if (compare.length === 1) {
		let maxValue;
		for (const element of values) {
			const value = compare(element);
			if (defined ? ascending(value, maxValue) > 0 : ascending(value, value) === 0) {
				max = element;
				maxValue = value;
				defined = true;
			}
		}
	} else for (const value of values) if (defined ? compare(value, max) > 0 : compare(value, value) === 0) {
		max = value;
		defined = true;
	}
	return max;
}
//#endregion
//#region node_modules/d3-array/src/quantile.js
function quantile$1(values, p, valueof) {
	values = Float64Array.from(numbers(values, valueof));
	if (!(n = values.length) || isNaN(p = +p)) return;
	if (p <= 0 || n < 2) return min(values);
	if (p >= 1) return max$1(values);
	var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = max$1(quickselect(values, i0).subarray(0, i0 + 1));
	return value0 + (min(values.subarray(i0 + 1)) - value0) * (i - i0);
}
function quantileSorted(values, p, valueof = number$1) {
	if (!(n = values.length) || isNaN(p = +p)) return;
	if (p <= 0 || n < 2) return +valueof(values[0], 0, values);
	if (p >= 1) return +valueof(values[n - 1], n - 1, values);
	var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = +valueof(values[i0], i0, values);
	return value0 + (+valueof(values[i0 + 1], i0 + 1, values) - value0) * (i - i0);
}
function quantileIndex(values, p, valueof = number$1) {
	if (isNaN(p = +p)) return;
	numbers = Float64Array.from(values, (_, i) => number$1(valueof(values[i], i, values)));
	if (p <= 0) return minIndex(numbers);
	if (p >= 1) return maxIndex(numbers);
	var numbers, index = Uint32Array.from(values, (_, i) => i), j = numbers.length - 1, i = Math.floor(j * p);
	quickselect(index, i, 0, j, (i, j) => ascendingDefined(numbers[i], numbers[j]));
	i = greatest(index.subarray(0, i + 1), (i) => numbers[i]);
	return i >= 0 ? i : -1;
}
//#endregion
//#region node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");
function ordinal() {
	var index = new InternMap(), domain = [], range = [], unknown = implicit;
	function scale(d) {
		let i = index.get(d);
		if (i === void 0) {
			if (unknown !== implicit) return unknown;
			index.set(d, i = domain.push(d) - 1);
		}
		return range[i % range.length];
	}
	scale.domain = function(_) {
		if (!arguments.length) return domain.slice();
		domain = [], index = new InternMap();
		for (const value of _) {
			if (index.has(value)) continue;
			index.set(value, domain.push(value) - 1);
		}
		return scale;
	};
	scale.range = function(_) {
		return arguments.length ? (range = Array.from(_), scale) : range.slice();
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	scale.copy = function() {
		return ordinal(domain, range).unknown(unknown);
	};
	initRange.apply(scale, arguments);
	return scale;
}
//#endregion
//#region node_modules/d3-scale/src/band.js
function band() {
	var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = .5;
	delete scale.unknown;
	function rescale() {
		var n = domain().length, reverse = r1 < r0, start = reverse ? r1 : r0, stop = reverse ? r0 : r1;
		step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
		if (round) step = Math.floor(step);
		start += (stop - start - step * (n - paddingInner)) * align;
		bandwidth = step * (1 - paddingInner);
		if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
		var values = range(n).map(function(i) {
			return start + step * i;
		});
		return ordinalRange(reverse ? values.reverse() : values);
	}
	scale.domain = function(_) {
		return arguments.length ? (domain(_), rescale()) : domain();
	};
	scale.range = function(_) {
		return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
	};
	scale.rangeRound = function(_) {
		return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
	};
	scale.bandwidth = function() {
		return bandwidth;
	};
	scale.step = function() {
		return step;
	};
	scale.round = function(_) {
		return arguments.length ? (round = !!_, rescale()) : round;
	};
	scale.padding = function(_) {
		return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
	};
	scale.paddingInner = function(_) {
		return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
	};
	scale.paddingOuter = function(_) {
		return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
	};
	scale.align = function(_) {
		return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
	};
	scale.copy = function() {
		return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
	};
	return initRange.apply(rescale(), arguments);
}
function pointish(scale) {
	var copy = scale.copy;
	scale.padding = scale.paddingOuter;
	delete scale.paddingInner;
	delete scale.paddingOuter;
	scale.copy = function() {
		return pointish(copy());
	};
	return scale;
}
function point() {
	return pointish(band.apply(null, arguments).paddingInner(1));
}
//#endregion
//#region node_modules/d3-interpolate/src/piecewise.js
function piecewise(interpolate, values) {
	if (values === void 0) values = interpolate, interpolate = value_default;
	var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
	while (i < n) I[i] = interpolate(v, v = values[++i]);
	return function(t) {
		var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
		return I[i](t - i);
	};
}
//#endregion
//#region node_modules/d3-scale/src/identity.js
function identity(domain) {
	var unknown;
	function scale(x) {
		return x == null || isNaN(x = +x) ? unknown : x;
	}
	scale.invert = scale;
	scale.domain = scale.range = function(_) {
		return arguments.length ? (domain = Array.from(_, number$2), scale) : domain.slice();
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	scale.copy = function() {
		return identity(domain).unknown(unknown);
	};
	domain = arguments.length ? Array.from(domain, number$2) : [0, 1];
	return linearish(scale);
}
//#endregion
//#region node_modules/d3-scale/src/nice.js
function nice(domain, interval) {
	domain = domain.slice();
	var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t;
	if (x1 < x0) {
		t = i0, i0 = i1, i1 = t;
		t = x0, x0 = x1, x1 = t;
	}
	domain[i0] = interval.floor(x0);
	domain[i1] = interval.ceil(x1);
	return domain;
}
//#endregion
//#region node_modules/d3-scale/src/log.js
function transformLog(x) {
	return Math.log(x);
}
function transformExp(x) {
	return Math.exp(x);
}
function transformLogn(x) {
	return -Math.log(-x);
}
function transformExpn(x) {
	return -Math.exp(-x);
}
function pow10(x) {
	return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}
function powp(base) {
	return base === 10 ? pow10 : base === Math.E ? Math.exp : (x) => Math.pow(base, x);
}
function logp(base) {
	return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), (x) => Math.log(x) / base);
}
function reflect(f) {
	return (x, k) => -f(-x, k);
}
function loggish(transform) {
	const scale = transform(transformLog, transformExp);
	const domain = scale.domain;
	let base = 10;
	let logs;
	let pows;
	function rescale() {
		logs = logp(base), pows = powp(base);
		if (domain()[0] < 0) {
			logs = reflect(logs), pows = reflect(pows);
			transform(transformLogn, transformExpn);
		} else transform(transformLog, transformExp);
		return scale;
	}
	scale.base = function(_) {
		return arguments.length ? (base = +_, rescale()) : base;
	};
	scale.domain = function(_) {
		return arguments.length ? (domain(_), rescale()) : domain();
	};
	scale.ticks = (count) => {
		const d = domain();
		let u = d[0];
		let v = d[d.length - 1];
		const r = v < u;
		if (r) [u, v] = [v, u];
		let i = logs(u);
		let j = logs(v);
		let k;
		let t;
		const n = count == null ? 10 : +count;
		let z = [];
		if (!(base % 1) && j - i < n) {
			i = Math.floor(i), j = Math.ceil(j);
			if (u > 0) for (; i <= j; ++i) for (k = 1; k < base; ++k) {
				t = i < 0 ? k / pows(-i) : k * pows(i);
				if (t < u) continue;
				if (t > v) break;
				z.push(t);
			}
			else for (; i <= j; ++i) for (k = base - 1; k >= 1; --k) {
				t = i > 0 ? k / pows(-i) : k * pows(i);
				if (t < u) continue;
				if (t > v) break;
				z.push(t);
			}
			if (z.length * 2 < n) z = ticks(u, v, n);
		} else z = ticks(i, j, Math.min(j - i, n)).map(pows);
		return r ? z.reverse() : z;
	};
	scale.tickFormat = (count, specifier) => {
		if (count == null) count = 10;
		if (specifier == null) specifier = base === 10 ? "s" : ",";
		if (typeof specifier !== "function") {
			if (!(base % 1) && (specifier = formatSpecifier(specifier)).precision == null) specifier.trim = true;
			specifier = format(specifier);
		}
		if (count === Infinity) return specifier;
		const k = Math.max(1, base * count / scale.ticks().length);
		return (d) => {
			let i = d / pows(Math.round(logs(d)));
			if (i * base < base - .5) i *= base;
			return i <= k ? specifier(d) : "";
		};
	};
	scale.nice = () => {
		return domain(nice(domain(), {
			floor: (x) => pows(Math.floor(logs(x))),
			ceil: (x) => pows(Math.ceil(logs(x)))
		}));
	};
	return scale;
}
function log() {
	const scale = loggish(transformer$2()).domain([1, 10]);
	scale.copy = () => copy$1(scale, log()).base(scale.base());
	initRange.apply(scale, arguments);
	return scale;
}
//#endregion
//#region node_modules/d3-scale/src/symlog.js
function transformSymlog(c) {
	return function(x) {
		return Math.sign(x) * Math.log1p(Math.abs(x / c));
	};
}
function transformSymexp(c) {
	return function(x) {
		return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
	};
}
function symlogish(transform) {
	var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));
	scale.constant = function(_) {
		return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
	};
	return linearish(scale);
}
function symlog() {
	var scale = symlogish(transformer$2());
	scale.copy = function() {
		return copy$1(scale, symlog()).constant(scale.constant());
	};
	return initRange.apply(scale, arguments);
}
//#endregion
//#region node_modules/d3-scale/src/pow.js
function transformPow(exponent) {
	return function(x) {
		return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	};
}
function transformSqrt(x) {
	return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}
function transformSquare(x) {
	return x < 0 ? -x * x : x * x;
}
function powish(transform) {
	var scale = transform(identity$1, identity$1), exponent = 1;
	function rescale() {
		return exponent === 1 ? transform(identity$1, identity$1) : exponent === .5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent), transformPow(1 / exponent));
	}
	scale.exponent = function(_) {
		return arguments.length ? (exponent = +_, rescale()) : exponent;
	};
	return linearish(scale);
}
function pow() {
	var scale = powish(transformer$2());
	scale.copy = function() {
		return copy$1(scale, pow()).exponent(scale.exponent());
	};
	initRange.apply(scale, arguments);
	return scale;
}
function sqrt() {
	return pow.apply(null, arguments).exponent(.5);
}
//#endregion
//#region node_modules/d3-scale/src/radial.js
function square(x) {
	return Math.sign(x) * x * x;
}
function unsquare(x) {
	return Math.sign(x) * Math.sqrt(Math.abs(x));
}
function radial() {
	var squared = continuous(), range = [0, 1], round = false, unknown;
	function scale(x) {
		var y = unsquare(squared(x));
		return isNaN(y) ? unknown : round ? Math.round(y) : y;
	}
	scale.invert = function(y) {
		return squared.invert(square(y));
	};
	scale.domain = function(_) {
		return arguments.length ? (squared.domain(_), scale) : squared.domain();
	};
	scale.range = function(_) {
		return arguments.length ? (squared.range((range = Array.from(_, number$2)).map(square)), scale) : range.slice();
	};
	scale.rangeRound = function(_) {
		return scale.range(_).round(true);
	};
	scale.round = function(_) {
		return arguments.length ? (round = !!_, scale) : round;
	};
	scale.clamp = function(_) {
		return arguments.length ? (squared.clamp(_), scale) : squared.clamp();
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	scale.copy = function() {
		return radial(squared.domain(), range).round(round).clamp(squared.clamp()).unknown(unknown);
	};
	initRange.apply(scale, arguments);
	return linearish(scale);
}
//#endregion
//#region node_modules/d3-scale/src/quantile.js
function quantile() {
	var domain = [], range = [], thresholds = [], unknown;
	function rescale() {
		var i = 0, n = Math.max(1, range.length);
		thresholds = new Array(n - 1);
		while (++i < n) thresholds[i - 1] = quantileSorted(domain, i / n);
		return scale;
	}
	function scale(x) {
		return x == null || isNaN(x = +x) ? unknown : range[bisectRight(thresholds, x)];
	}
	scale.invertExtent = function(y) {
		var i = range.indexOf(y);
		return i < 0 ? [NaN, NaN] : [i > 0 ? thresholds[i - 1] : domain[0], i < thresholds.length ? thresholds[i] : domain[domain.length - 1]];
	};
	scale.domain = function(_) {
		if (!arguments.length) return domain.slice();
		domain = [];
		for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
		domain.sort(ascending);
		return rescale();
	};
	scale.range = function(_) {
		return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	scale.quantiles = function() {
		return thresholds.slice();
	};
	scale.copy = function() {
		return quantile().domain(domain).range(range).unknown(unknown);
	};
	return initRange.apply(scale, arguments);
}
//#endregion
//#region node_modules/d3-scale/src/threshold.js
function threshold() {
	var domain = [.5], range = [0, 1], unknown, n = 1;
	function scale(x) {
		return x != null && x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
	}
	scale.domain = function(_) {
		return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
	};
	scale.range = function(_) {
		return arguments.length ? (range = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
	};
	scale.invertExtent = function(y) {
		var i = range.indexOf(y);
		return [domain[i - 1], domain[i]];
	};
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	scale.copy = function() {
		return threshold().domain(domain).range(range).unknown(unknown);
	};
	return initRange.apply(scale, arguments);
}
//#endregion
//#region node_modules/d3-time/src/interval.js
var t0 = /* @__PURE__ */ new Date(), t1 = /* @__PURE__ */ new Date();
function timeInterval(floori, offseti, count, field) {
	function interval(date) {
		return floori(date = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date)), date;
	}
	interval.floor = (date) => {
		return floori(date = /* @__PURE__ */ new Date(+date)), date;
	};
	interval.ceil = (date) => {
		return floori(date = /* @__PURE__ */ new Date(date - 1)), offseti(date, 1), floori(date), date;
	};
	interval.round = (date) => {
		const d0 = interval(date), d1 = interval.ceil(date);
		return date - d0 < d1 - date ? d0 : d1;
	};
	interval.offset = (date, step) => {
		return offseti(date = /* @__PURE__ */ new Date(+date), step == null ? 1 : Math.floor(step)), date;
	};
	interval.range = (start, stop, step) => {
		const range = [];
		start = interval.ceil(start);
		step = step == null ? 1 : Math.floor(step);
		if (!(start < stop) || !(step > 0)) return range;
		let previous;
		do
			range.push(previous = /* @__PURE__ */ new Date(+start)), offseti(start, step), floori(start);
		while (previous < start && start < stop);
		return range;
	};
	interval.filter = (test) => {
		return timeInterval((date) => {
			if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
		}, (date, step) => {
			if (date >= date) if (step < 0) while (++step <= 0) while (offseti(date, -1), !test(date));
			else while (--step >= 0) while (offseti(date, 1), !test(date));
		});
	};
	if (count) {
		interval.count = (start, end) => {
			t0.setTime(+start), t1.setTime(+end);
			floori(t0), floori(t1);
			return Math.floor(count(t0, t1));
		};
		interval.every = (step) => {
			step = Math.floor(step);
			return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? (d) => field(d) % step === 0 : (d) => interval.count(0, d) % step === 0);
		};
	}
	return interval;
}
//#endregion
//#region node_modules/d3-time/src/millisecond.js
var millisecond = timeInterval(() => {}, (date, step) => {
	date.setTime(+date + step);
}, (start, end) => {
	return end - start;
});
millisecond.every = (k) => {
	k = Math.floor(k);
	if (!isFinite(k) || !(k > 0)) return null;
	if (!(k > 1)) return millisecond;
	return timeInterval((date) => {
		date.setTime(Math.floor(date / k) * k);
	}, (date, step) => {
		date.setTime(+date + step * k);
	}, (start, end) => {
		return (end - start) / k;
	});
};
var milliseconds = millisecond.range;
//#endregion
//#region node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;
//#endregion
//#region node_modules/d3-time/src/second.js
var second = timeInterval((date) => {
	date.setTime(date - date.getMilliseconds());
}, (date, step) => {
	date.setTime(+date + step * durationSecond);
}, (start, end) => {
	return (end - start) / durationSecond;
}, (date) => {
	return date.getUTCSeconds();
});
var seconds = second.range;
//#endregion
//#region node_modules/d3-time/src/minute.js
var timeMinute = timeInterval((date) => {
	date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, (date, step) => {
	date.setTime(+date + step * durationMinute);
}, (start, end) => {
	return (end - start) / durationMinute;
}, (date) => {
	return date.getMinutes();
});
var timeMinutes = timeMinute.range;
var utcMinute = timeInterval((date) => {
	date.setUTCSeconds(0, 0);
}, (date, step) => {
	date.setTime(+date + step * durationMinute);
}, (start, end) => {
	return (end - start) / durationMinute;
}, (date) => {
	return date.getUTCMinutes();
});
var utcMinutes = utcMinute.range;
//#endregion
//#region node_modules/d3-time/src/hour.js
var timeHour = timeInterval((date) => {
	date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, (date, step) => {
	date.setTime(+date + step * durationHour);
}, (start, end) => {
	return (end - start) / durationHour;
}, (date) => {
	return date.getHours();
});
var timeHours = timeHour.range;
var utcHour = timeInterval((date) => {
	date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
	date.setTime(+date + step * durationHour);
}, (start, end) => {
	return (end - start) / durationHour;
}, (date) => {
	return date.getUTCHours();
});
var utcHours = utcHour.range;
//#endregion
//#region node_modules/d3-time/src/day.js
var timeDay = timeInterval((date) => date.setHours(0, 0, 0, 0), (date, step) => date.setDate(date.getDate() + step), (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay, (date) => date.getDate() - 1);
var timeDays = timeDay.range;
var utcDay = timeInterval((date) => {
	date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
	date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
	return (end - start) / durationDay;
}, (date) => {
	return date.getUTCDate() - 1;
});
var utcDays = utcDay.range;
var unixDay = timeInterval((date) => {
	date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
	date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
	return (end - start) / durationDay;
}, (date) => {
	return Math.floor(date / durationDay);
});
var unixDays = unixDay.range;
//#endregion
//#region node_modules/d3-time/src/week.js
function timeWeekday(i) {
	return timeInterval((date) => {
		date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
		date.setHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setDate(date.getDate() + step * 7);
	}, (start, end) => {
		return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
	});
}
var timeSunday = timeWeekday(0);
var timeMonday = timeWeekday(1);
var timeTuesday = timeWeekday(2);
var timeWednesday = timeWeekday(3);
var timeThursday = timeWeekday(4);
var timeFriday = timeWeekday(5);
var timeSaturday = timeWeekday(6);
var timeSundays = timeSunday.range;
var timeMondays = timeMonday.range;
var timeTuesdays = timeTuesday.range;
var timeWednesdays = timeWednesday.range;
var timeThursdays = timeThursday.range;
var timeFridays = timeFriday.range;
var timeSaturdays = timeSaturday.range;
function utcWeekday(i) {
	return timeInterval((date) => {
		date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
		date.setUTCHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setUTCDate(date.getUTCDate() + step * 7);
	}, (start, end) => {
		return (end - start) / durationWeek;
	});
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;
//#endregion
//#region node_modules/d3-time/src/month.js
var timeMonth = timeInterval((date) => {
	date.setDate(1);
	date.setHours(0, 0, 0, 0);
}, (date, step) => {
	date.setMonth(date.getMonth() + step);
}, (start, end) => {
	return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, (date) => {
	return date.getMonth();
});
var timeMonths = timeMonth.range;
var utcMonth = timeInterval((date) => {
	date.setUTCDate(1);
	date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
	date.setUTCMonth(date.getUTCMonth() + step);
}, (start, end) => {
	return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, (date) => {
	return date.getUTCMonth();
});
var utcMonths = utcMonth.range;
//#endregion
//#region node_modules/d3-time/src/year.js
var timeYear = timeInterval((date) => {
	date.setMonth(0, 1);
	date.setHours(0, 0, 0, 0);
}, (date, step) => {
	date.setFullYear(date.getFullYear() + step);
}, (start, end) => {
	return end.getFullYear() - start.getFullYear();
}, (date) => {
	return date.getFullYear();
});
timeYear.every = (k) => {
	return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
		date.setFullYear(Math.floor(date.getFullYear() / k) * k);
		date.setMonth(0, 1);
		date.setHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setFullYear(date.getFullYear() + step * k);
	});
};
var timeYears = timeYear.range;
var utcYear = timeInterval((date) => {
	date.setUTCMonth(0, 1);
	date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
	date.setUTCFullYear(date.getUTCFullYear() + step);
}, (start, end) => {
	return end.getUTCFullYear() - start.getUTCFullYear();
}, (date) => {
	return date.getUTCFullYear();
});
utcYear.every = (k) => {
	return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
		date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
		date.setUTCMonth(0, 1);
		date.setUTCHours(0, 0, 0, 0);
	}, (date, step) => {
		date.setUTCFullYear(date.getUTCFullYear() + step * k);
	});
};
var utcYears = utcYear.range;
//#endregion
//#region node_modules/d3-time/src/ticks.js
function ticker(year, month, week, day, hour, minute) {
	const tickIntervals = [
		[
			second,
			1,
			durationSecond
		],
		[
			second,
			5,
			5 * durationSecond
		],
		[
			second,
			15,
			15 * durationSecond
		],
		[
			second,
			30,
			30 * durationSecond
		],
		[
			minute,
			1,
			durationMinute
		],
		[
			minute,
			5,
			5 * durationMinute
		],
		[
			minute,
			15,
			15 * durationMinute
		],
		[
			minute,
			30,
			30 * durationMinute
		],
		[
			hour,
			1,
			durationHour
		],
		[
			hour,
			3,
			3 * durationHour
		],
		[
			hour,
			6,
			6 * durationHour
		],
		[
			hour,
			12,
			12 * durationHour
		],
		[
			day,
			1,
			durationDay
		],
		[
			day,
			2,
			2 * durationDay
		],
		[
			week,
			1,
			durationWeek
		],
		[
			month,
			1,
			durationMonth
		],
		[
			month,
			3,
			3 * durationMonth
		],
		[
			year,
			1,
			durationYear
		]
	];
	function ticks(start, stop, count) {
		const reverse = stop < start;
		if (reverse) [start, stop] = [stop, start];
		const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
		const ticks = interval ? interval.range(start, +stop + 1) : [];
		return reverse ? ticks.reverse() : ticks;
	}
	function tickInterval(start, stop, count) {
		const target = Math.abs(stop - start) / count;
		const i = bisector(([, , step]) => step).right(tickIntervals, target);
		if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
		if (i === 0) return millisecond.every(Math.max(tickStep(start, stop, count), 1));
		const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
		return t.every(step);
	}
	return [ticks, tickInterval];
}
var [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
var [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);
//#endregion
//#region node_modules/d3-time-format/src/locale.js
function localDate(d) {
	if (0 <= d.y && d.y < 100) {
		var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
		date.setFullYear(d.y);
		return date;
	}
	return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
	if (0 <= d.y && d.y < 100) {
		var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
		date.setUTCFullYear(d.y);
		return date;
	}
	return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y, m, d) {
	return {
		y,
		m,
		d,
		H: 0,
		M: 0,
		S: 0,
		L: 0
	};
}
function formatLocale(locale) {
	var locale_dateTime = locale.dateTime, locale_date = locale.date, locale_time = locale.time, locale_periods = locale.periods, locale_weekdays = locale.days, locale_shortWeekdays = locale.shortDays, locale_months = locale.months, locale_shortMonths = locale.shortMonths;
	var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
	var formats = {
		"a": formatShortWeekday,
		"A": formatWeekday,
		"b": formatShortMonth,
		"B": formatMonth,
		"c": null,
		"d": formatDayOfMonth,
		"e": formatDayOfMonth,
		"f": formatMicroseconds,
		"g": formatYearISO,
		"G": formatFullYearISO,
		"H": formatHour24,
		"I": formatHour12,
		"j": formatDayOfYear,
		"L": formatMilliseconds,
		"m": formatMonthNumber,
		"M": formatMinutes,
		"p": formatPeriod,
		"q": formatQuarter,
		"Q": formatUnixTimestamp,
		"s": formatUnixTimestampSeconds,
		"S": formatSeconds,
		"u": formatWeekdayNumberMonday,
		"U": formatWeekNumberSunday,
		"V": formatWeekNumberISO,
		"w": formatWeekdayNumberSunday,
		"W": formatWeekNumberMonday,
		"x": null,
		"X": null,
		"y": formatYear,
		"Y": formatFullYear,
		"Z": formatZone,
		"%": formatLiteralPercent
	};
	var utcFormats = {
		"a": formatUTCShortWeekday,
		"A": formatUTCWeekday,
		"b": formatUTCShortMonth,
		"B": formatUTCMonth,
		"c": null,
		"d": formatUTCDayOfMonth,
		"e": formatUTCDayOfMonth,
		"f": formatUTCMicroseconds,
		"g": formatUTCYearISO,
		"G": formatUTCFullYearISO,
		"H": formatUTCHour24,
		"I": formatUTCHour12,
		"j": formatUTCDayOfYear,
		"L": formatUTCMilliseconds,
		"m": formatUTCMonthNumber,
		"M": formatUTCMinutes,
		"p": formatUTCPeriod,
		"q": formatUTCQuarter,
		"Q": formatUnixTimestamp,
		"s": formatUnixTimestampSeconds,
		"S": formatUTCSeconds,
		"u": formatUTCWeekdayNumberMonday,
		"U": formatUTCWeekNumberSunday,
		"V": formatUTCWeekNumberISO,
		"w": formatUTCWeekdayNumberSunday,
		"W": formatUTCWeekNumberMonday,
		"x": null,
		"X": null,
		"y": formatUTCYear,
		"Y": formatUTCFullYear,
		"Z": formatUTCZone,
		"%": formatLiteralPercent
	};
	var parses = {
		"a": parseShortWeekday,
		"A": parseWeekday,
		"b": parseShortMonth,
		"B": parseMonth,
		"c": parseLocaleDateTime,
		"d": parseDayOfMonth,
		"e": parseDayOfMonth,
		"f": parseMicroseconds,
		"g": parseYear,
		"G": parseFullYear,
		"H": parseHour24,
		"I": parseHour24,
		"j": parseDayOfYear,
		"L": parseMilliseconds,
		"m": parseMonthNumber,
		"M": parseMinutes,
		"p": parsePeriod,
		"q": parseQuarter,
		"Q": parseUnixTimestamp,
		"s": parseUnixTimestampSeconds,
		"S": parseSeconds,
		"u": parseWeekdayNumberMonday,
		"U": parseWeekNumberSunday,
		"V": parseWeekNumberISO,
		"w": parseWeekdayNumberSunday,
		"W": parseWeekNumberMonday,
		"x": parseLocaleDate,
		"X": parseLocaleTime,
		"y": parseYear,
		"Y": parseFullYear,
		"Z": parseZone,
		"%": parseLiteralPercent
	};
	formats.x = newFormat(locale_date, formats);
	formats.X = newFormat(locale_time, formats);
	formats.c = newFormat(locale_dateTime, formats);
	utcFormats.x = newFormat(locale_date, utcFormats);
	utcFormats.X = newFormat(locale_time, utcFormats);
	utcFormats.c = newFormat(locale_dateTime, utcFormats);
	function newFormat(specifier, formats) {
		return function(date) {
			var string = [], i = -1, j = 0, n = specifier.length, c, pad, format;
			if (!(date instanceof Date)) date = /* @__PURE__ */ new Date(+date);
			while (++i < n) if (specifier.charCodeAt(i) === 37) {
				string.push(specifier.slice(j, i));
				if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
				else pad = c === "e" ? " " : "0";
				if (format = formats[c]) c = format(date, pad);
				string.push(c);
				j = i + 1;
			}
			string.push(specifier.slice(j, i));
			return string.join("");
		};
	}
	function newParse(specifier, Z) {
		return function(string) {
			var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
			if (i != string.length) return null;
			if ("Q" in d) return new Date(d.Q);
			if ("s" in d) return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
			if (Z && !("Z" in d)) d.Z = 0;
			if ("p" in d) d.H = d.H % 12 + d.p * 12;
			if (d.m === void 0) d.m = "q" in d ? d.q : 0;
			if ("V" in d) {
				if (d.V < 1 || d.V > 53) return null;
				if (!("w" in d)) d.w = 1;
				if ("Z" in d) {
					week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
					week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
					week = utcDay.offset(week, (d.V - 1) * 7);
					d.y = week.getUTCFullYear();
					d.m = week.getUTCMonth();
					d.d = week.getUTCDate() + (d.w + 6) % 7;
				} else {
					week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
					week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
					week = timeDay.offset(week, (d.V - 1) * 7);
					d.y = week.getFullYear();
					d.m = week.getMonth();
					d.d = week.getDate() + (d.w + 6) % 7;
				}
			} else if ("W" in d || "U" in d) {
				if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
				day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
				d.m = 0;
				d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
			}
			if ("Z" in d) {
				d.H += d.Z / 100 | 0;
				d.M += d.Z % 100;
				return utcDate(d);
			}
			return localDate(d);
		};
	}
	function parseSpecifier(d, specifier, string, j) {
		var i = 0, n = specifier.length, m = string.length, c, parse;
		while (i < n) {
			if (j >= m) return -1;
			c = specifier.charCodeAt(i++);
			if (c === 37) {
				c = specifier.charAt(i++);
				parse = parses[c in pads ? specifier.charAt(i++) : c];
				if (!parse || (j = parse(d, string, j)) < 0) return -1;
			} else if (c != string.charCodeAt(j++)) return -1;
		}
		return j;
	}
	function parsePeriod(d, string, i) {
		var n = periodRe.exec(string.slice(i));
		return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	}
	function parseShortWeekday(d, string, i) {
		var n = shortWeekdayRe.exec(string.slice(i));
		return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	}
	function parseWeekday(d, string, i) {
		var n = weekdayRe.exec(string.slice(i));
		return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	}
	function parseShortMonth(d, string, i) {
		var n = shortMonthRe.exec(string.slice(i));
		return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	}
	function parseMonth(d, string, i) {
		var n = monthRe.exec(string.slice(i));
		return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	}
	function parseLocaleDateTime(d, string, i) {
		return parseSpecifier(d, locale_dateTime, string, i);
	}
	function parseLocaleDate(d, string, i) {
		return parseSpecifier(d, locale_date, string, i);
	}
	function parseLocaleTime(d, string, i) {
		return parseSpecifier(d, locale_time, string, i);
	}
	function formatShortWeekday(d) {
		return locale_shortWeekdays[d.getDay()];
	}
	function formatWeekday(d) {
		return locale_weekdays[d.getDay()];
	}
	function formatShortMonth(d) {
		return locale_shortMonths[d.getMonth()];
	}
	function formatMonth(d) {
		return locale_months[d.getMonth()];
	}
	function formatPeriod(d) {
		return locale_periods[+(d.getHours() >= 12)];
	}
	function formatQuarter(d) {
		return 1 + ~~(d.getMonth() / 3);
	}
	function formatUTCShortWeekday(d) {
		return locale_shortWeekdays[d.getUTCDay()];
	}
	function formatUTCWeekday(d) {
		return locale_weekdays[d.getUTCDay()];
	}
	function formatUTCShortMonth(d) {
		return locale_shortMonths[d.getUTCMonth()];
	}
	function formatUTCMonth(d) {
		return locale_months[d.getUTCMonth()];
	}
	function formatUTCPeriod(d) {
		return locale_periods[+(d.getUTCHours() >= 12)];
	}
	function formatUTCQuarter(d) {
		return 1 + ~~(d.getUTCMonth() / 3);
	}
	return {
		format: function(specifier) {
			var f = newFormat(specifier += "", formats);
			f.toString = function() {
				return specifier;
			};
			return f;
		},
		parse: function(specifier) {
			var p = newParse(specifier += "", false);
			p.toString = function() {
				return specifier;
			};
			return p;
		},
		utcFormat: function(specifier) {
			var f = newFormat(specifier += "", utcFormats);
			f.toString = function() {
				return specifier;
			};
			return f;
		},
		utcParse: function(specifier) {
			var p = newParse(specifier += "", true);
			p.toString = function() {
				return specifier;
			};
			return p;
		}
	};
}
var pads = {
	"-": "",
	"_": " ",
	"0": "0"
}, numberRe = /^\s*\d+/, percentRe = /^%/, requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
	var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
	return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s) {
	return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
	return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
	return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 1));
	return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 1));
	return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 4));
	return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
	var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
	return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 1));
	return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 3));
	return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 2));
	return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 3));
	return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
	var n = numberRe.exec(string.slice(i, i + 6));
	return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
	var n = percentRe.exec(string.slice(i, i + 1));
	return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
	var n = numberRe.exec(string.slice(i));
	return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
	var n = numberRe.exec(string.slice(i));
	return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
	return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
	return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
	return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
	return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}
function formatMilliseconds(d, p) {
	return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
	return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
	return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
	return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
	return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
	var day = d.getDay();
	return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
	return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}
function dISO(d) {
	var day = d.getDay();
	return day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
	d = dISO(d);
	return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
	return d.getDay();
}
function formatWeekNumberMonday(d, p) {
	return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}
function formatYear(d, p) {
	return pad(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
	d = dISO(d);
	return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
	return pad(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
	var day = d.getDay();
	d = day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
	return pad(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
	var z = d.getTimezoneOffset();
	return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
	return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
	return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
	return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
	return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
	return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
	return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
	return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
	return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
	return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
	var dow = d.getUTCDay();
	return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
	return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}
function UTCdISO(d) {
	var day = d.getUTCDay();
	return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
	d = UTCdISO(d);
	return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
	return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
	return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
	return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
	d = UTCdISO(d);
	return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
	return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
	var day = d.getUTCDay();
	d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
	return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
	return "+0000";
}
function formatLiteralPercent() {
	return "%";
}
function formatUnixTimestamp(d) {
	return +d;
}
function formatUnixTimestampSeconds(d) {
	return Math.floor(+d / 1e3);
}
//#endregion
//#region node_modules/d3-time-format/src/defaultLocale.js
var locale;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale({
	dateTime: "%x, %X",
	date: "%-m/%-d/%Y",
	time: "%-I:%M:%S %p",
	periods: ["AM", "PM"],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	shortDays: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	months: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	shortMonths: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	]
});
function defaultLocale(definition) {
	locale = formatLocale(definition);
	timeFormat = locale.format;
	timeParse = locale.parse;
	utcFormat = locale.utcFormat;
	utcParse = locale.utcParse;
	return locale;
}
//#endregion
//#region node_modules/d3-time-format/src/isoFormat.js
var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date) {
	return date.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);
//#endregion
//#region node_modules/d3-time-format/src/isoParse.js
function parseIsoNative(string) {
	var date = new Date(string);
	return isNaN(date) ? null : date;
}
var parseIso = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);
//#endregion
//#region node_modules/d3-scale/src/time.js
function date(t) {
	return new Date(t);
}
function number(t) {
	return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
	var scale = continuous(), invert = scale.invert, domain = scale.domain;
	var formatMillisecond = format(".%L"), formatSecond = format(":%S"), formatMinute = format("%I:%M"), formatHour = format("%I %p"), formatDay = format("%a %d"), formatWeek = format("%b %d"), formatMonth = format("%B"), formatYear = format("%Y");
	function tickFormat(date) {
		return (second(date) < date ? formatMillisecond : minute(date) < date ? formatSecond : hour(date) < date ? formatMinute : day(date) < date ? formatHour : month(date) < date ? week(date) < date ? formatDay : formatWeek : year(date) < date ? formatMonth : formatYear)(date);
	}
	scale.invert = function(y) {
		return new Date(invert(y));
	};
	scale.domain = function(_) {
		return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
	};
	scale.ticks = function(interval) {
		var d = domain();
		return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
	};
	scale.tickFormat = function(count, specifier) {
		return specifier == null ? tickFormat : format(specifier);
	};
	scale.nice = function(interval) {
		var d = domain();
		if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
		return interval ? domain(nice(d, interval)) : scale;
	};
	scale.copy = function() {
		return copy$1(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
	};
	return scale;
}
function time() {
	return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
//#endregion
//#region node_modules/d3-scale/src/utcTime.js
function utcTime() {
	return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
//#endregion
//#region node_modules/d3-scale/src/sequential.js
function transformer$1() {
	var x0 = 0, x1 = 1, t0, t1, k10, transform, interpolator = identity$1, clamp = false, unknown;
	function scale(x) {
		return x == null || isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? .5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
	}
	scale.domain = function(_) {
		return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
	};
	scale.clamp = function(_) {
		return arguments.length ? (clamp = !!_, scale) : clamp;
	};
	scale.interpolator = function(_) {
		return arguments.length ? (interpolator = _, scale) : interpolator;
	};
	function range(interpolate) {
		return function(_) {
			var r0, r1;
			return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
		};
	}
	scale.range = range(value_default);
	scale.rangeRound = range(round_default);
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	return function(t) {
		transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
		return scale;
	};
}
function copy(source, target) {
	return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
}
function sequential() {
	var scale = linearish(transformer$1()(identity$1));
	scale.copy = function() {
		return copy(scale, sequential());
	};
	return initInterpolator.apply(scale, arguments);
}
function sequentialLog() {
	var scale = loggish(transformer$1()).domain([1, 10]);
	scale.copy = function() {
		return copy(scale, sequentialLog()).base(scale.base());
	};
	return initInterpolator.apply(scale, arguments);
}
function sequentialSymlog() {
	var scale = symlogish(transformer$1());
	scale.copy = function() {
		return copy(scale, sequentialSymlog()).constant(scale.constant());
	};
	return initInterpolator.apply(scale, arguments);
}
function sequentialPow() {
	var scale = powish(transformer$1());
	scale.copy = function() {
		return copy(scale, sequentialPow()).exponent(scale.exponent());
	};
	return initInterpolator.apply(scale, arguments);
}
function sequentialSqrt() {
	return sequentialPow.apply(null, arguments).exponent(.5);
}
//#endregion
//#region node_modules/d3-scale/src/sequentialQuantile.js
function sequentialQuantile() {
	var domain = [], interpolator = identity$1;
	function scale(x) {
		if (x != null && !isNaN(x = +x)) return interpolator((bisectRight(domain, x, 1) - 1) / (domain.length - 1));
	}
	scale.domain = function(_) {
		if (!arguments.length) return domain.slice();
		domain = [];
		for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
		domain.sort(ascending);
		return scale;
	};
	scale.interpolator = function(_) {
		return arguments.length ? (interpolator = _, scale) : interpolator;
	};
	scale.range = function() {
		return domain.map((d, i) => interpolator(i / (domain.length - 1)));
	};
	scale.quantiles = function(n) {
		return Array.from({ length: n + 1 }, (_, i) => quantile$1(domain, i / n));
	};
	scale.copy = function() {
		return sequentialQuantile(interpolator).domain(domain);
	};
	return initInterpolator.apply(scale, arguments);
}
//#endregion
//#region node_modules/d3-scale/src/diverging.js
function transformer() {
	var x0 = 0, x1 = .5, x2 = 1, s = 1, t0, t1, t2, k10, k21, interpolator = identity$1, transform, clamp = false, unknown;
	function scale(x) {
		return isNaN(x = +x) ? unknown : (x = .5 + ((x = +transform(x)) - t1) * (s * x < s * t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
	}
	scale.domain = function(_) {
		return arguments.length ? ([x0, x1, x2] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t0 === t1 ? 0 : .5 / (t1 - t0), k21 = t1 === t2 ? 0 : .5 / (t2 - t1), s = t1 < t0 ? -1 : 1, scale) : [
			x0,
			x1,
			x2
		];
	};
	scale.clamp = function(_) {
		return arguments.length ? (clamp = !!_, scale) : clamp;
	};
	scale.interpolator = function(_) {
		return arguments.length ? (interpolator = _, scale) : interpolator;
	};
	function range(interpolate) {
		return function(_) {
			var r0, r1, r2;
			return arguments.length ? ([r0, r1, r2] = _, interpolator = piecewise(interpolate, [
				r0,
				r1,
				r2
			]), scale) : [
				interpolator(0),
				interpolator(.5),
				interpolator(1)
			];
		};
	}
	scale.range = range(value_default);
	scale.rangeRound = range(round_default);
	scale.unknown = function(_) {
		return arguments.length ? (unknown = _, scale) : unknown;
	};
	return function(t) {
		transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : .5 / (t1 - t0), k21 = t1 === t2 ? 0 : .5 / (t2 - t1), s = t1 < t0 ? -1 : 1;
		return scale;
	};
}
function diverging() {
	var scale = linearish(transformer()(identity$1));
	scale.copy = function() {
		return copy(scale, diverging());
	};
	return initInterpolator.apply(scale, arguments);
}
function divergingLog() {
	var scale = loggish(transformer()).domain([
		.1,
		1,
		10
	]);
	scale.copy = function() {
		return copy(scale, divergingLog()).base(scale.base());
	};
	return initInterpolator.apply(scale, arguments);
}
function divergingSymlog() {
	var scale = symlogish(transformer());
	scale.copy = function() {
		return copy(scale, divergingSymlog()).constant(scale.constant());
	};
	return initInterpolator.apply(scale, arguments);
}
function divergingPow() {
	var scale = powish(transformer());
	scale.copy = function() {
		return copy(scale, divergingPow()).exponent(scale.exponent());
	};
	return initInterpolator.apply(scale, arguments);
}
function divergingSqrt() {
	return divergingPow.apply(null, arguments).exponent(.5);
}
//#endregion
export { utcSaturdays as $, cos as $n, InternSet as $t, timeMonth as A, diamond_default as An, pow as At, timeSunday as B, x as Bn, quantile$1 as Bt, timeTicks as C, triangle2_default as Cn, seconds as Ct, timeYears as D, square_default as Dn, threshold as Dt, timeYear as E, square2_default as En, timeInterval as Et, timeFridays as F, bumpX as Fn, piecewise as Ft, timeTuesdays as G, withPath as Gn, minIndex as Gt, timeThursday as H, linear_default as Hn, quantileSorted as Ht, timeMonday as I, bumpY as In, band as It, utcFriday as J, pathRound as Jn, ascendingDefined as Jt, timeWednesday as K, Path as Kn, min as Kt, timeMondays as L, pointRadial_default as Ln, point as Lt, utcMonth as M, circle_default as Mn, symlog as Mt, utcMonths as N, asterisk_default as Nn, log as Nt, utcYear as O, plus_default as On, quantile as Ot, timeFriday as P, bumpRadial as Pn, identity as Pt, utcSaturday as Q, atan2 as Qn, InternMap as Qt, timeSaturday as R, area_default as Rn, implicit as Rt, timeTickInterval as S, wye_default as Sn, second as St, utcTicks as T, star_default as Tn, milliseconds as Tt, timeThursdays as U, array_default as Un, greatest as Ut, timeSundays as V, y as Vn, quantileIndex as Vt, timeTuesday as W, slice as Wn, quickselect as Wt, utcMonday as X, acos as Xn, sort as Xt, utcFridays as Y, abs as Yn, compareDefined as Yt, utcMondays as Z, asin as Zn, permute as Zt, timeFormat as _, noop_default as _n, utcHours as _t, divergingSymlog as a, none_default$1 as an, sin as ar, utcTuesdays as at, utcParse as b, symbolsStroke as bn, utcMinute as bt, sequentialLog as c, step_default as cn, constant_default as cr, timeDay as ct, sequentialSymlog as d, monotoneY as dn, unixDays as dt, wiggle_default as en, epsilon$1 as er, utcSunday as et, utcTime as f, linearClosed_default as fn, utcDay as ft, defaultLocale as g, basis_default as gn, utcHour as gt, formatIso as h, Basis as hn, timeHours as ht, divergingSqrt as i, none_default as in, pi$1 as ir, utcTuesday as it, timeMonths as j, cross_default as jn, sqrt as jt, utcYears as k, diamond2_default as kn, radial as kt, sequentialPow as l, natural_default as ln, timeDays as lt, parseIso as m, basisClosed_default as mn, timeHour as mt, divergingLog as n, expand_default as nn, max as nr, utcThursday as nt, sequentialQuantile as o, stepAfter as on, sqrt$1 as or, utcWednesday as ot, time as p, basisOpen_default as pn, utcDays as pt, timeWednesdays as q, path as qn, maxIndex as qt, divergingPow as r, stack_default as rn, min$1 as rr, utcThursdays as rt, sequential as s, stepBefore as sn, tau$1 as sr, utcWednesdays as st, diverging as t, silhouette_default as tn, halfPi as tr, utcSundays as tt, sequentialSqrt as u, monotoneX as un, unixDay as ut, timeParse as v, Symbol$1 as vn, timeMinute as vt, utcTickInterval as w, triangle_default as wn, millisecond as wt, formatLocale as x, times_default as xn, utcMinutes as xt, utcFormat as y, symbolsFill as yn, timeMinutes as yt, timeSaturdays as z, line_default as zn, ordinal as zt };

//# sourceMappingURL=diverging-Drz5T5jX.js.map