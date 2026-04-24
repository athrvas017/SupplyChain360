import { $ as utcSaturdays, $n as cos$1, $t as InternSet, A as timeMonth, An as diamond_default, At as pow, B as timeSunday, Bn as x$2, Bt as quantile, C as timeTicks, Cn as triangle2_default, Ct as seconds, D as timeYears, Dn as square_default, Dt as threshold, E as timeYear, En as square2_default, Et as timeInterval, F as timeFridays, Fn as bumpX, Ft as piecewise, G as timeTuesdays, Gn as withPath, Gt as minIndex, H as timeThursday, Hn as linear_default, Ht as quantileSorted, I as timeMonday, In as bumpY, It as band, J as utcFriday, Jn as pathRound, Jt as ascendingDefined, K as timeWednesday, Kn as Path, Kt as min, L as timeMondays, Ln as pointRadial_default, Lt as point, M as utcMonth, Mn as circle_default$2, Mt as symlog, N as utcMonths, Nn as asterisk_default, Nt as log, O as utcYear, On as plus_default, Ot as quantile$1, P as timeFriday, Pn as bumpRadial, Pt as identity, Q as utcSaturday, Qn as atan2, Qt as InternMap, R as timeSaturday, Rn as area_default, Rt as implicit, S as timeTickInterval, Sn as wye_default, St as second, T as utcTicks, Tn as star_default, Tt as milliseconds, U as timeThursdays, Un as array_default$2, Ut as greatest, V as timeSundays, Vn as y$2, Vt as quantileIndex, W as timeTuesday, Wn as slice$3, Wt as quickselect, X as utcMonday, Xn as acos, Xt as sort, Y as utcFridays, Yn as abs$2, Yt as compareDefined, Z as utcMondays, Zn as asin, Zt as permute, _ as timeFormat, _n as noop_default$1, _t as utcHours, a as divergingSymlog, an as none_default, ar as sin$1, at as utcTuesdays, b as utcParse, bn as symbolsStroke, bt as utcMinute, c as sequentialLog, cn as step_default, cr as constant_default$7, ct as timeDay, d as sequentialSymlog, dn as monotoneY, dt as unixDays, en as wiggle_default, et as utcSunday, f as utcTime, fn as linearClosed_default, ft as utcDay, g as defaultLocale$1, gn as basis_default, gt as utcHour, h as formatIso, hn as Basis, ht as timeHours, i as divergingSqrt, in as none_default$1, ir as pi$2, it as utcTuesday, j as timeMonths, jn as cross_default, jt as sqrt, k as utcYears, kn as diamond2_default, kt as radial, l as sequentialPow, ln as natural_default, lt as timeDays, m as parseIso, mn as basisClosed_default, mt as timeHour, n as divergingLog, nn as expand_default, nr as max$3, nt as utcThursday, o as sequentialQuantile, on as stepAfter, or as sqrt$1, ot as utcWednesday, p as time, pn as basisOpen_default, pt as utcDays, q as timeWednesdays, qn as path, qt as maxIndex, r as divergingPow, rn as stack_default, rr as min$2, rt as utcThursdays, s as sequential, sn as stepBefore, sr as tau$2, st as utcWednesdays, t as diverging, tn as silhouette_default, tr as halfPi$2, tt as utcSundays, u as sequentialSqrt, un as monotoneX, ut as unixDay, v as timeParse, vn as Symbol$1, vt as timeMinute, w as utcTickInterval, wn as triangle_default, wt as millisecond, x as formatLocale, xn as times_default, xt as utcMinutes, y as utcFormat, yn as symbolsFill, yt as timeMinutes, z as timeSaturdays, zn as line_default, zt as ordinal } from "./diverging-Drz5T5jX.js";
import { $ as bisectRight, A as hue, B as rgb, C as number_default, D as rgbBasis, E as numberArray_default, F as Rgb, H as define_default, I as brighter, J as tickIncrement, K as range, L as color, M as basisClosed_default$1, N as basis_default$1, O as rgbBasisClosed, P as Color, Q as bisectLeft, R as darker, S as object_default, T as array_default, U as extend, V as rgbConvert, X as ticks, Y as tickStep, Z as bisectCenter, a as precisionRound_default, b as value_default, c as defaultLocale, d as locale_default, f as FormatSpecifier, i as tickFormat, it as ascending, j as nogamma, k as rgb_default, l as format, n as linear$1, nt as bisector, o as precisionPrefix_default, p as formatSpecifier, q as max, rt as descending, s as precisionFixed_default, t as quantize, u as formatPrefix, w as date_default, x as string_default, y as round_default, z as hsl } from "./quantize-CsOVkTR9.js";
import { $ as noop$1, A as fitExtent, B as graticule10, C as mercatorProjection, Ct as Adder, D as azimuthalRaw, E as azimuthalInvert, Et as extent, F as transformer, G as circle_default$1, H as distance_default, I as boundsStream, J as rotation_default, K as antimeridian_default, L as identity_default$3, M as fitSize, N as fitWidth, O as projection, P as transform_default, Q as stream_default, R as interpolate_default, S as stereographic_default, St as mean, T as mercator_default, Tt as fsum, U as length_default, V as contains_default, W as clipRectangle, X as bounds_default, Y as centroid_default, Z as area_default$1, _ as Delaunay, _t as sqrt$2, a as root$1, at as cos$2, bt as sum, c as window_default, d as array$2, dt as log$1, et as abs$3, f as selector_default, ft as pi$3, g as turbo_default, gt as sin$2, h as namespaces_default, ht as sign, i as Selection$1, it as atan2$1, j as fitHeight, k as projectionMutator, l as matcher_default, lt as exp, m as namespace_default, mt as radians$1, n as sourceEvent_default, nt as asin$1, o as selection, ot as degrees$2, p as creator_default, pt as pow$1, q as circle_default, r as select_default, rt as atan, s as styleValue, st as epsilon$3, t as pointer_default, tt as acos$1, u as selectorAll_default, ut as halfPi$3, v as Voronoi, vt as tan, w as mercatorRaw, wt as fcumsum, x as stereographicRaw, xt as merge, yt as tau$3, z as graticule } from "./pointer-CMIKRqT6.js";
//#region node_modules/d3-shape/src/arc.js
function arcInnerRadius(d) {
	return d.innerRadius;
}
function arcOuterRadius(d) {
	return d.outerRadius;
}
function arcStartAngle(d) {
	return d.startAngle;
}
function arcEndAngle(d) {
	return d.endAngle;
}
function arcPadAngle(d) {
	return d && d.padAngle;
}
function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
	var x10 = x1 - x0, y10 = y1 - y0, x32 = x3 - x2, y32 = y3 - y2, t = y32 * x10 - x32 * y10;
	if (t * t < 1e-12) return;
	t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
	return [x0 + t * x10, y0 + t * y10];
}
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
	var x01 = x0 - x1, y01 = y0 - y1, lo = (cw ? rc : -rc) / sqrt$1(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x0 + ox, y11 = y0 + oy, x10 = x1 + ox, y10 = y1 + oy, x00 = (x11 + x10) / 2, y00 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r = r1 - rc, D = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * sqrt$1(max$3(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x00, dy0 = cy0 - y00, dx1 = cx1 - x00, dy1 = cy1 - y00;
	if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
	return {
		cx: cx0,
		cy: cy0,
		x01: -ox,
		y01: -oy,
		x11: cx0 * (r1 / r - 1),
		y11: cy0 * (r1 / r - 1)
	};
}
function arc_default() {
	var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = constant_default$7(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context = null, path = withPath(arc);
	function arc() {
		var buffer, r, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - halfPi$2, a1 = endAngle.apply(this, arguments) - halfPi$2, da = abs$2(a1 - a0), cw = a1 > a0;
		if (!context) context = buffer = path();
		if (r1 < r0) r = r1, r1 = r0, r0 = r;
		if (!(r1 > 1e-12)) context.moveTo(0, 0);
		else if (da > tau$2 - 1e-12) {
			context.moveTo(r1 * cos$1(a0), r1 * sin$1(a0));
			context.arc(0, 0, r1, a0, a1, !cw);
			if (r0 > 1e-12) {
				context.moveTo(r0 * cos$1(a1), r0 * sin$1(a1));
				context.arc(0, 0, r0, a1, a0, cw);
			}
		} else {
			var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da, da1 = da, ap = padAngle.apply(this, arguments) / 2, rp = ap > 1e-12 && (padRadius ? +padRadius.apply(this, arguments) : sqrt$1(r0 * r0 + r1 * r1)), rc = min$2(abs$2(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc, rc1 = rc, t0, t1;
			if (rp > 1e-12) {
				var p0 = asin(rp / r0 * sin$1(ap)), p1 = asin(rp / r1 * sin$1(ap));
				if ((da0 -= p0 * 2) > 1e-12) p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;
				else da0 = 0, a00 = a10 = (a0 + a1) / 2;
				if ((da1 -= p1 * 2) > 1e-12) p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;
				else da1 = 0, a01 = a11 = (a0 + a1) / 2;
			}
			var x01 = r1 * cos$1(a01), y01 = r1 * sin$1(a01), x10 = r0 * cos$1(a10), y10 = r0 * sin$1(a10);
			if (rc > 1e-12) {
				var x11 = r1 * cos$1(a11), y11 = r1 * sin$1(a11), x00 = r0 * cos$1(a00), y00 = r0 * sin$1(a00), oc;
				if (da < pi$2) if (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10)) {
					var ax = x01 - oc[0], ay = y01 - oc[1], bx = x11 - oc[0], by = y11 - oc[1], kc = 1 / sin$1(acos((ax * bx + ay * by) / (sqrt$1(ax * ax + ay * ay) * sqrt$1(bx * bx + by * by))) / 2), lc = sqrt$1(oc[0] * oc[0] + oc[1] * oc[1]);
					rc0 = min$2(rc, (r0 - lc) / (kc - 1));
					rc1 = min$2(rc, (r1 - lc) / (kc + 1));
				} else rc0 = rc1 = 0;
			}
			if (!(da1 > 1e-12)) context.moveTo(x01, y01);
			else if (rc1 > 1e-12) {
				t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
				t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
				context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
				if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
				else {
					context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
					context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
					context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
				}
			} else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
			if (!(r0 > 1e-12) || !(da0 > 1e-12)) context.lineTo(x10, y10);
			else if (rc0 > 1e-12) {
				t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
				t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
				context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
				if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
				else {
					context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
					context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
					context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
				}
			} else context.arc(0, 0, r0, a10, a00, cw);
		}
		context.closePath();
		if (buffer) return context = null, buffer + "" || null;
	}
	arc.centroid = function() {
		var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$2 / 2;
		return [cos$1(a) * r, sin$1(a) * r];
	};
	arc.innerRadius = function(_) {
		return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant_default$7(+_), arc) : innerRadius;
	};
	arc.outerRadius = function(_) {
		return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant_default$7(+_), arc) : outerRadius;
	};
	arc.cornerRadius = function(_) {
		return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant_default$7(+_), arc) : cornerRadius;
	};
	arc.padRadius = function(_) {
		return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant_default$7(+_), arc) : padRadius;
	};
	arc.startAngle = function(_) {
		return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default$7(+_), arc) : startAngle;
	};
	arc.endAngle = function(_) {
		return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default$7(+_), arc) : endAngle;
	};
	arc.padAngle = function(_) {
		return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant_default$7(+_), arc) : padAngle;
	};
	arc.context = function(_) {
		return arguments.length ? (context = _ == null ? null : _, arc) : context;
	};
	return arc;
}
//#endregion
//#region node_modules/d3-shape/src/descending.js
function descending_default$1(a, b) {
	return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
//#endregion
//#region node_modules/d3-shape/src/identity.js
function identity_default$2(d) {
	return d;
}
//#endregion
//#region node_modules/d3-shape/src/pie.js
function pie_default() {
	var value = identity_default$2, sortValues = descending_default$1, sort = null, startAngle = constant_default$7(0), endAngle = constant_default$7(tau$2), padAngle = constant_default$7(0);
	function pie(data) {
		var i, n = (data = array_default$2(data)).length, j, k, sum = 0, index = new Array(n), arcs = new Array(n), a0 = +startAngle.apply(this, arguments), da = Math.min(tau$2, Math.max(-tau$2, endAngle.apply(this, arguments) - a0)), a1, p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)), pa = p * (da < 0 ? -1 : 1), v;
		for (i = 0; i < n; ++i) if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) sum += v;
		if (sortValues != null) index.sort(function(i, j) {
			return sortValues(arcs[i], arcs[j]);
		});
		else if (sort != null) index.sort(function(i, j) {
			return sort(data[i], data[j]);
		});
		for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
			data: data[j],
			index: i,
			value: v,
			startAngle: a0,
			endAngle: a1,
			padAngle: p
		};
		return arcs;
	}
	pie.value = function(_) {
		return arguments.length ? (value = typeof _ === "function" ? _ : constant_default$7(+_), pie) : value;
	};
	pie.sortValues = function(_) {
		return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
	};
	pie.sort = function(_) {
		return arguments.length ? (sort = _, sortValues = null, pie) : sort;
	};
	pie.startAngle = function(_) {
		return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default$7(+_), pie) : startAngle;
	};
	pie.endAngle = function(_) {
		return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default$7(+_), pie) : endAngle;
	};
	pie.padAngle = function(_) {
		return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant_default$7(+_), pie) : padAngle;
	};
	return pie;
}
//#endregion
//#region node_modules/d3-shape/src/curve/radial.js
var curveRadialLinear = curveRadial(linear_default);
function Radial(curve) {
	this._curve = curve;
}
Radial.prototype = {
	areaStart: function() {
		this._curve.areaStart();
	},
	areaEnd: function() {
		this._curve.areaEnd();
	},
	lineStart: function() {
		this._curve.lineStart();
	},
	lineEnd: function() {
		this._curve.lineEnd();
	},
	point: function(a, r) {
		this._curve.point(r * Math.sin(a), r * -Math.cos(a));
	}
};
function curveRadial(curve) {
	function radial(context) {
		return new Radial(curve(context));
	}
	radial._curve = curve;
	return radial;
}
//#endregion
//#region node_modules/d3-shape/src/lineRadial.js
function lineRadial(l) {
	var c = l.curve;
	l.angle = l.x, delete l.x;
	l.radius = l.y, delete l.y;
	l.curve = function(_) {
		return arguments.length ? c(curveRadial(_)) : c()._curve;
	};
	return l;
}
function lineRadial_default() {
	return lineRadial(line_default().curve(curveRadialLinear));
}
//#endregion
//#region node_modules/d3-shape/src/areaRadial.js
function areaRadial_default() {
	var a = area_default().curve(curveRadialLinear), c = a.curve, x0 = a.lineX0, x1 = a.lineX1, y0 = a.lineY0, y1 = a.lineY1;
	a.angle = a.x, delete a.x;
	a.startAngle = a.x0, delete a.x0;
	a.endAngle = a.x1, delete a.x1;
	a.radius = a.y, delete a.y;
	a.innerRadius = a.y0, delete a.y0;
	a.outerRadius = a.y1, delete a.y1;
	a.lineStartAngle = function() {
		return lineRadial(x0());
	}, delete a.lineX0;
	a.lineEndAngle = function() {
		return lineRadial(x1());
	}, delete a.lineX1;
	a.lineInnerRadius = function() {
		return lineRadial(y0());
	}, delete a.lineY0;
	a.lineOuterRadius = function() {
		return lineRadial(y1());
	}, delete a.lineY1;
	a.curve = function(_) {
		return arguments.length ? c(curveRadial(_)) : c()._curve;
	};
	return a;
}
//#endregion
//#region node_modules/d3-shape/src/link.js
function linkSource(d) {
	return d.source;
}
function linkTarget(d) {
	return d.target;
}
function link(curve) {
	let source = linkSource, target = linkTarget, x = x$2, y = y$2, context = null, output = null, path = withPath(link);
	function link() {
		let buffer;
		const argv = slice$3.call(arguments);
		const s = source.apply(this, argv);
		const t = target.apply(this, argv);
		if (context == null) output = curve(buffer = path());
		output.lineStart();
		argv[0] = s, output.point(+x.apply(this, argv), +y.apply(this, argv));
		argv[0] = t, output.point(+x.apply(this, argv), +y.apply(this, argv));
		output.lineEnd();
		if (buffer) return output = null, buffer + "" || null;
	}
	link.source = function(_) {
		return arguments.length ? (source = _, link) : source;
	};
	link.target = function(_) {
		return arguments.length ? (target = _, link) : target;
	};
	link.x = function(_) {
		return arguments.length ? (x = typeof _ === "function" ? _ : constant_default$7(+_), link) : x;
	};
	link.y = function(_) {
		return arguments.length ? (y = typeof _ === "function" ? _ : constant_default$7(+_), link) : y;
	};
	link.context = function(_) {
		return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), link) : context;
	};
	return link;
}
function linkHorizontal() {
	return link(bumpX);
}
function linkVertical() {
	return link(bumpY);
}
function linkRadial() {
	const l = link(bumpRadial);
	l.angle = l.x, delete l.x;
	l.radius = l.y, delete l.y;
	return l;
}
//#endregion
//#region node_modules/d3-shape/src/curve/bundle.js
function Bundle(context, beta) {
	this._basis = new Basis(context);
	this._beta = beta;
}
Bundle.prototype = {
	lineStart: function() {
		this._x = [];
		this._y = [];
		this._basis.lineStart();
	},
	lineEnd: function() {
		var x = this._x, y = this._y, j = x.length - 1;
		if (j > 0) {
			var x0 = x[0], y0 = y[0], dx = x[j] - x0, dy = y[j] - y0, i = -1, t;
			while (++i <= j) {
				t = i / j;
				this._basis.point(this._beta * x[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y[i] + (1 - this._beta) * (y0 + t * dy));
			}
		}
		this._x = this._y = null;
		this._basis.lineEnd();
	},
	point: function(x, y) {
		this._x.push(+x);
		this._y.push(+y);
	}
};
var bundle_default = (function custom(beta) {
	function bundle(context) {
		return beta === 1 ? new Basis(context) : new Bundle(context, beta);
	}
	bundle.beta = function(beta) {
		return custom(+beta);
	};
	return bundle;
})(.85);
//#endregion
//#region node_modules/d3-shape/src/curve/cardinal.js
function point$2(that, x, y) {
	that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x), that._y2 + that._k * (that._y1 - y), that._x2, that._y2);
}
function Cardinal(context, tension) {
	this._context = context;
	this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x2, this._y2);
				break;
			case 3:
				point$2(this, this._x1, this._y1);
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
				this._x1 = x, this._y1 = y;
				break;
			case 2: this._point = 3;
			default:
				point$2(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var cardinal_default = (function custom(tension) {
	function cardinal(context) {
		return new Cardinal(context, tension);
	}
	cardinal.tension = function(tension) {
		return custom(+tension);
	};
	return cardinal;
})(0);
//#endregion
//#region node_modules/d3-shape/src/curve/cardinalClosed.js
function CardinalClosed(context, tension) {
	this._context = context;
	this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
	areaStart: noop_default$1,
	areaEnd: noop_default$1,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
		this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x3, this._y3);
				this._context.closePath();
				break;
			case 2:
				this._context.lineTo(this._x3, this._y3);
				this._context.closePath();
				break;
			case 3:
				this.point(this._x3, this._y3);
				this.point(this._x4, this._y4);
				this.point(this._x5, this._y5);
				break;
		}
	},
	point: function(x, y) {
		x = +x, y = +y;
		switch (this._point) {
			case 0:
				this._point = 1;
				this._x3 = x, this._y3 = y;
				break;
			case 1:
				this._point = 2;
				this._context.moveTo(this._x4 = x, this._y4 = y);
				break;
			case 2:
				this._point = 3;
				this._x5 = x, this._y5 = y;
				break;
			default:
				point$2(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var cardinalClosed_default = (function custom(tension) {
	function cardinal(context) {
		return new CardinalClosed(context, tension);
	}
	cardinal.tension = function(tension) {
		return custom(+tension);
	};
	return cardinal;
})(0);
//#endregion
//#region node_modules/d3-shape/src/curve/cardinalOpen.js
function CardinalOpen(context, tension) {
	this._context = context;
	this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
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
				this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
				break;
			case 3: this._point = 4;
			default:
				point$2(this, x, y);
				break;
		}
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var cardinalOpen_default = (function custom(tension) {
	function cardinal(context) {
		return new CardinalOpen(context, tension);
	}
	cardinal.tension = function(tension) {
		return custom(+tension);
	};
	return cardinal;
})(0);
//#endregion
//#region node_modules/d3-shape/src/curve/catmullRom.js
function point$1(that, x, y) {
	var x1 = that._x1, y1 = that._y1, x2 = that._x2, y2 = that._y2;
	if (that._l01_a > 1e-12) {
		var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
		x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
		y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
	}
	if (that._l23_a > 1e-12) {
		var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
		x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
		y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
	}
	that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
	this._context = context;
	this._alpha = alpha;
}
CatmullRom.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
		this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x2, this._y2);
				break;
			case 3:
				this.point(this._x2, this._y2);
				break;
		}
		if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		if (this._point) {
			var x23 = this._x2 - x, y23 = this._y2 - y;
			this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
		}
		switch (this._point) {
			case 0:
				this._point = 1;
				this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
				break;
			case 1:
				this._point = 2;
				break;
			case 2: this._point = 3;
			default:
				point$1(this, x, y);
				break;
		}
		this._l01_a = this._l12_a, this._l12_a = this._l23_a;
		this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var catmullRom_default = (function custom(alpha) {
	function catmullRom(context) {
		return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
	}
	catmullRom.alpha = function(alpha) {
		return custom(+alpha);
	};
	return catmullRom;
})(.5);
//#endregion
//#region node_modules/d3-shape/src/curve/catmullRomClosed.js
function CatmullRomClosed(context, alpha) {
	this._context = context;
	this._alpha = alpha;
}
CatmullRomClosed.prototype = {
	areaStart: noop_default$1,
	areaEnd: noop_default$1,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
		this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x3, this._y3);
				this._context.closePath();
				break;
			case 2:
				this._context.lineTo(this._x3, this._y3);
				this._context.closePath();
				break;
			case 3:
				this.point(this._x3, this._y3);
				this.point(this._x4, this._y4);
				this.point(this._x5, this._y5);
				break;
		}
	},
	point: function(x, y) {
		x = +x, y = +y;
		if (this._point) {
			var x23 = this._x2 - x, y23 = this._y2 - y;
			this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
		}
		switch (this._point) {
			case 0:
				this._point = 1;
				this._x3 = x, this._y3 = y;
				break;
			case 1:
				this._point = 2;
				this._context.moveTo(this._x4 = x, this._y4 = y);
				break;
			case 2:
				this._point = 3;
				this._x5 = x, this._y5 = y;
				break;
			default:
				point$1(this, x, y);
				break;
		}
		this._l01_a = this._l12_a, this._l12_a = this._l23_a;
		this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var catmullRomClosed_default = (function custom(alpha) {
	function catmullRom(context) {
		return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
	}
	catmullRom.alpha = function(alpha) {
		return custom(+alpha);
	};
	return catmullRom;
})(.5);
//#endregion
//#region node_modules/d3-shape/src/curve/catmullRomOpen.js
function CatmullRomOpen(context, alpha) {
	this._context = context;
	this._alpha = alpha;
}
CatmullRomOpen.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
		this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	},
	lineEnd: function() {
		if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
		this._line = 1 - this._line;
	},
	point: function(x, y) {
		x = +x, y = +y;
		if (this._point) {
			var x23 = this._x2 - x, y23 = this._y2 - y;
			this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
		}
		switch (this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
				break;
			case 3: this._point = 4;
			default:
				point$1(this, x, y);
				break;
		}
		this._l01_a = this._l12_a, this._l12_a = this._l23_a;
		this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
		this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	}
};
var catmullRomOpen_default = (function custom(alpha) {
	function catmullRom(context) {
		return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
	}
	catmullRom.alpha = function(alpha) {
		return custom(+alpha);
	};
	return catmullRom;
})(.5);
//#endregion
//#region node_modules/d3-shape/src/offset/diverging.js
function diverging_default(series, order) {
	if (!((n = series.length) > 0)) return;
	for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) for (yp = yn = 0, i = 0; i < n; ++i) if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) d[0] = yp, d[1] = yp += dy;
	else if (dy < 0) d[1] = yn, d[0] = yn += dy;
	else d[0] = 0, d[1] = dy;
}
//#endregion
//#region node_modules/d3-shape/src/order/appearance.js
function appearance_default(series) {
	var peaks = series.map(peak);
	return none_default$1(series).sort(function(a, b) {
		return peaks[a] - peaks[b];
	});
}
function peak(series) {
	var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
	while (++i < n) if ((vi = +series[i][1]) > vj) vj = vi, j = i;
	return j;
}
//#endregion
//#region node_modules/d3-shape/src/order/ascending.js
function ascending_default(series) {
	var sums = series.map(sum$1);
	return none_default$1(series).sort(function(a, b) {
		return sums[a] - sums[b];
	});
}
function sum$1(series) {
	var s = 0, i = -1, n = series.length, v;
	while (++i < n) if (v = +series[i][1]) s += v;
	return s;
}
//#endregion
//#region node_modules/d3-shape/src/order/descending.js
function descending_default(series) {
	return ascending_default(series).reverse();
}
//#endregion
//#region node_modules/d3-shape/src/order/insideOut.js
function insideOut_default(series) {
	var n = series.length, i, j, sums = series.map(sum$1), order = appearance_default(series), top = 0, bottom = 0, tops = [], bottoms = [];
	for (i = 0; i < n; ++i) {
		j = order[i];
		if (top < bottom) {
			top += sums[j];
			tops.push(j);
		} else {
			bottom += sums[j];
			bottoms.push(j);
		}
	}
	return bottoms.reverse().concat(tops);
}
//#endregion
//#region node_modules/d3-shape/src/order/reverse.js
function reverse_default(series) {
	return none_default$1(series).reverse();
}
//#endregion
//#region node_modules/d3-array/src/blur.js
function blur(values, r) {
	if (!((r = +r) >= 0)) throw new RangeError("invalid r");
	let length = values.length;
	if (!((length = Math.floor(length)) >= 0)) throw new RangeError("invalid length");
	if (!length || !r) return values;
	const blur = blurf(r);
	const temp = values.slice();
	blur(values, temp, 0, length, 1);
	blur(temp, values, 0, length, 1);
	blur(values, temp, 0, length, 1);
	return values;
}
var blur2 = Blur2(blurf);
var blurImage = Blur2(blurfImage);
function Blur2(blur) {
	return function(data, rx, ry = rx) {
		if (!((rx = +rx) >= 0)) throw new RangeError("invalid rx");
		if (!((ry = +ry) >= 0)) throw new RangeError("invalid ry");
		let { data: values, width, height } = data;
		if (!((width = Math.floor(width)) >= 0)) throw new RangeError("invalid width");
		if (!((height = Math.floor(height !== void 0 ? height : values.length / width)) >= 0)) throw new RangeError("invalid height");
		if (!width || !height || !rx && !ry) return data;
		const blurx = rx && blur(rx);
		const blury = ry && blur(ry);
		const temp = values.slice();
		if (blurx && blury) {
			blurh(blurx, temp, values, width, height);
			blurh(blurx, values, temp, width, height);
			blurh(blurx, temp, values, width, height);
			blurv(blury, values, temp, width, height);
			blurv(blury, temp, values, width, height);
			blurv(blury, values, temp, width, height);
		} else if (blurx) {
			blurh(blurx, values, temp, width, height);
			blurh(blurx, temp, values, width, height);
			blurh(blurx, values, temp, width, height);
		} else if (blury) {
			blurv(blury, values, temp, width, height);
			blurv(blury, temp, values, width, height);
			blurv(blury, values, temp, width, height);
		}
		return data;
	};
}
function blurh(blur, T, S, w, h) {
	for (let y = 0, n = w * h; y < n;) blur(T, S, y, y += w, 1);
}
function blurv(blur, T, S, w, h) {
	for (let x = 0, n = w * h; x < w; ++x) blur(T, S, x, x + n, w);
}
function blurfImage(radius) {
	const blur = blurf(radius);
	return (T, S, start, stop, step) => {
		start <<= 2, stop <<= 2, step <<= 2;
		blur(T, S, start + 0, stop + 0, step);
		blur(T, S, start + 1, stop + 1, step);
		blur(T, S, start + 2, stop + 2, step);
		blur(T, S, start + 3, stop + 3, step);
	};
}
function blurf(radius) {
	const radius0 = Math.floor(radius);
	if (radius0 === radius) return bluri(radius);
	const t = radius - radius0;
	const w = 2 * radius + 1;
	return (T, S, start, stop, step) => {
		if (!((stop -= step) >= start)) return;
		let sum = radius0 * S[start];
		const s0 = step * radius0;
		const s1 = s0 + step;
		for (let i = start, j = start + s0; i < j; i += step) sum += S[Math.min(stop, i)];
		for (let i = start, j = stop; i <= j; i += step) {
			sum += S[Math.min(stop, i + s0)];
			T[i] = (sum + t * (S[Math.max(start, i - s1)] + S[Math.min(stop, i + s1)])) / w;
			sum -= S[Math.max(start, i - s0)];
		}
	};
}
function bluri(radius) {
	const w = 2 * radius + 1;
	return (T, S, start, stop, step) => {
		if (!((stop -= step) >= start)) return;
		let sum = radius * S[start];
		const s = step * radius;
		for (let i = start, j = start + s; i < j; i += step) sum += S[Math.min(stop, i)];
		for (let i = start, j = stop; i <= j; i += step) {
			sum += S[Math.min(stop, i + s)];
			T[i] = sum / w;
			sum -= S[Math.max(start, i - s)];
		}
	};
}
//#endregion
//#region node_modules/d3-array/src/count.js
function count(values, valueof) {
	let count = 0;
	if (valueof === void 0) {
		for (let value of values) if (value != null && (value = +value) >= value) ++count;
	} else {
		let index = -1;
		for (let value of values) if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) ++count;
	}
	return count;
}
//#endregion
//#region node_modules/d3-array/src/cross.js
function length$1(array) {
	return array.length | 0;
}
function empty$1(length) {
	return !(length > 0);
}
function arrayify(values) {
	return typeof values !== "object" || "length" in values ? values : Array.from(values);
}
function reducer(reduce) {
	return (values) => reduce(...values);
}
function cross(...values) {
	const reduce = typeof values[values.length - 1] === "function" && reducer(values.pop());
	values = values.map(arrayify);
	const lengths = values.map(length$1);
	const j = values.length - 1;
	const index = new Array(j + 1).fill(0);
	const product = [];
	if (j < 0 || lengths.some(empty$1)) return product;
	while (true) {
		product.push(index.map((j, i) => values[i][j]));
		let i = j;
		while (++index[i] === lengths[i]) {
			if (i === 0) return reduce ? product.map(reduce) : product;
			index[i--] = 0;
		}
	}
}
//#endregion
//#region node_modules/d3-array/src/cumsum.js
function cumsum(values, valueof) {
	var sum = 0, index = 0;
	return Float64Array.from(values, valueof === void 0 ? (v) => sum += +v || 0 : (v) => sum += +valueof(v, index++, values) || 0);
}
//#endregion
//#region node_modules/d3-array/src/variance.js
function variance(values, valueof) {
	let count = 0;
	let delta;
	let mean = 0;
	let sum = 0;
	if (valueof === void 0) {
		for (let value of values) if (value != null && (value = +value) >= value) {
			delta = value - mean;
			mean += delta / ++count;
			sum += delta * (value - mean);
		}
	} else {
		let index = -1;
		for (let value of values) if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
			delta = value - mean;
			mean += delta / ++count;
			sum += delta * (value - mean);
		}
	}
	if (count > 1) return sum / (count - 1);
}
//#endregion
//#region node_modules/d3-array/src/deviation.js
function deviation(values, valueof) {
	const v = variance(values, valueof);
	return v ? Math.sqrt(v) : v;
}
//#endregion
//#region node_modules/d3-array/src/identity.js
function identity$3(x) {
	return x;
}
//#endregion
//#region node_modules/d3-array/src/group.js
function group(values, ...keys) {
	return nest(values, identity$3, identity$3, keys);
}
function groups(values, ...keys) {
	return nest(values, Array.from, identity$3, keys);
}
function flatten(groups, keys) {
	for (let i = 1, n = keys.length; i < n; ++i) groups = groups.flatMap((g) => g.pop().map(([key, value]) => [
		...g,
		key,
		value
	]));
	return groups;
}
function flatGroup(values, ...keys) {
	return flatten(groups(values, ...keys), keys);
}
function flatRollup(values, reduce, ...keys) {
	return flatten(rollups(values, reduce, ...keys), keys);
}
function rollup(values, reduce, ...keys) {
	return nest(values, identity$3, reduce, keys);
}
function rollups(values, reduce, ...keys) {
	return nest(values, Array.from, reduce, keys);
}
function index(values, ...keys) {
	return nest(values, identity$3, unique, keys);
}
function indexes(values, ...keys) {
	return nest(values, Array.from, unique, keys);
}
function unique(values) {
	if (values.length !== 1) throw new Error("duplicate key");
	return values[0];
}
function nest(values, map, reduce, keys) {
	return (function regroup(values, i) {
		if (i >= keys.length) return reduce(values);
		const groups = new InternMap();
		const keyof = keys[i++];
		let index = -1;
		for (const value of values) {
			const key = keyof(value, ++index, values);
			const group = groups.get(key);
			if (group) group.push(value);
			else groups.set(key, [value]);
		}
		for (const [key, values] of groups) groups.set(key, regroup(values, i));
		return map(groups);
	})(values, 0);
}
//#endregion
//#region node_modules/d3-array/src/groupSort.js
function groupSort(values, reduce, key) {
	return (reduce.length !== 2 ? sort(rollup(values, reduce, key), (([ak, av], [bk, bv]) => ascending(av, bv) || ascending(ak, bk))) : sort(group(values, key), (([ak, av], [bk, bv]) => reduce(av, bv) || ascending(ak, bk)))).map(([key]) => key);
}
//#endregion
//#region node_modules/d3-array/src/array.js
var array$1 = Array.prototype;
var slice$2 = array$1.slice;
array$1.map;
//#endregion
//#region node_modules/d3-array/src/constant.js
function constant(x) {
	return () => x;
}
//#endregion
//#region node_modules/d3-array/src/nice.js
function nice(start, stop, count) {
	let prestep;
	while (true) {
		const step = tickIncrement(start, stop, count);
		if (step === prestep || step === 0 || !isFinite(step)) return [start, stop];
		else if (step > 0) {
			start = Math.floor(start / step) * step;
			stop = Math.ceil(stop / step) * step;
		} else if (step < 0) {
			start = Math.ceil(start * step) / step;
			stop = Math.floor(stop * step) / step;
		}
		prestep = step;
	}
}
//#endregion
//#region node_modules/d3-array/src/threshold/sturges.js
function thresholdSturges(values) {
	return Math.max(1, Math.ceil(Math.log(count(values)) / Math.LN2) + 1);
}
//#endregion
//#region node_modules/d3-array/src/bin.js
function bin() {
	var value = identity$3, domain = extent, threshold = thresholdSturges;
	function histogram(data) {
		if (!Array.isArray(data)) data = Array.from(data);
		var i, n = data.length, x, step, values = new Array(n);
		for (i = 0; i < n; ++i) values[i] = value(data[i], i, data);
		var xz = domain(values), x0 = xz[0], x1 = xz[1], tz = threshold(values, x0, x1);
		if (!Array.isArray(tz)) {
			const max = x1, tn = +tz;
			if (domain === extent) [x0, x1] = nice(x0, x1, tn);
			tz = ticks(x0, x1, tn);
			if (tz[0] <= x0) step = tickIncrement(x0, x1, tn);
			if (tz[tz.length - 1] >= x1) if (max >= x1 && domain === extent) {
				const step = tickIncrement(x0, x1, tn);
				if (isFinite(step)) {
					if (step > 0) x1 = (Math.floor(x1 / step) + 1) * step;
					else if (step < 0) x1 = (Math.ceil(x1 * -step) + 1) / -step;
				}
			} else tz.pop();
		}
		var m = tz.length, a = 0, b = m;
		while (tz[a] <= x0) ++a;
		while (tz[b - 1] > x1) --b;
		if (a || b < m) tz = tz.slice(a, b), m = b - a;
		var bins = new Array(m + 1), bin;
		for (i = 0; i <= m; ++i) {
			bin = bins[i] = [];
			bin.x0 = i > 0 ? tz[i - 1] : x0;
			bin.x1 = i < m ? tz[i] : x1;
		}
		if (isFinite(step)) {
			if (step > 0) {
				for (i = 0; i < n; ++i) if ((x = values[i]) != null && x0 <= x && x <= x1) bins[Math.min(m, Math.floor((x - x0) / step))].push(data[i]);
			} else if (step < 0) {
				for (i = 0; i < n; ++i) if ((x = values[i]) != null && x0 <= x && x <= x1) {
					const j = Math.floor((x0 - x) * step);
					bins[Math.min(m, j + (tz[j] <= x))].push(data[i]);
				}
			}
		} else for (i = 0; i < n; ++i) if ((x = values[i]) != null && x0 <= x && x <= x1) bins[bisectRight(tz, x, 0, m)].push(data[i]);
		return bins;
	}
	histogram.value = function(_) {
		return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
	};
	histogram.domain = function(_) {
		return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
	};
	histogram.thresholds = function(_) {
		return arguments.length ? (threshold = typeof _ === "function" ? _ : constant(Array.isArray(_) ? slice$2.call(_) : _), histogram) : threshold;
	};
	return histogram;
}
//#endregion
//#region node_modules/d3-array/src/threshold/freedmanDiaconis.js
function thresholdFreedmanDiaconis(values, min, max) {
	const c = count(values), d = quantile(values, .75) - quantile(values, .25);
	return c && d ? Math.ceil((max - min) / (2 * d * Math.pow(c, -1 / 3))) : 1;
}
//#endregion
//#region node_modules/d3-array/src/threshold/scott.js
function thresholdScott(values, min, max) {
	const c = count(values), d = deviation(values);
	return c && d ? Math.ceil((max - min) * Math.cbrt(c) / (3.49 * d)) : 1;
}
//#endregion
//#region node_modules/d3-array/src/median.js
function median(values, valueof) {
	return quantile(values, .5, valueof);
}
function medianIndex(values, valueof) {
	return quantileIndex(values, .5, valueof);
}
//#endregion
//#region node_modules/d3-array/src/mode.js
function mode(values, valueof) {
	const counts = new InternMap();
	if (valueof === void 0) {
		for (let value of values) if (value != null && value >= value) counts.set(value, (counts.get(value) || 0) + 1);
	} else {
		let index = -1;
		for (let value of values) if ((value = valueof(value, ++index, values)) != null && value >= value) counts.set(value, (counts.get(value) || 0) + 1);
	}
	let modeValue;
	let modeCount = 0;
	for (const [value, count] of counts) if (count > modeCount) {
		modeCount = count;
		modeValue = value;
	}
	return modeValue;
}
//#endregion
//#region node_modules/d3-array/src/pairs.js
function pairs(values, pairof = pair) {
	const pairs = [];
	let previous;
	let first = false;
	for (const value of values) {
		if (first) pairs.push(pairof(previous, value));
		previous = value;
		first = true;
	}
	return pairs;
}
function pair(a, b) {
	return [a, b];
}
//#endregion
//#region node_modules/d3-array/src/rank.js
function rank(values, valueof = ascending) {
	if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
	let V = Array.from(values);
	const R = new Float64Array(V.length);
	if (valueof.length !== 2) V = V.map(valueof), valueof = ascending;
	const compareIndex = (i, j) => valueof(V[i], V[j]);
	let k, r;
	values = Uint32Array.from(V, (_, i) => i);
	values.sort(valueof === ascending ? (i, j) => ascendingDefined(V[i], V[j]) : compareDefined(compareIndex));
	values.forEach((j, i) => {
		const c = compareIndex(j, k === void 0 ? j : k);
		if (c >= 0) {
			if (k === void 0 || c > 0) k = j, r = i;
			R[j] = r;
		} else R[j] = NaN;
	});
	return R;
}
//#endregion
//#region node_modules/d3-array/src/least.js
function least(values, compare = ascending) {
	let min;
	let defined = false;
	if (compare.length === 1) {
		let minValue;
		for (const element of values) {
			const value = compare(element);
			if (defined ? ascending(value, minValue) < 0 : ascending(value, value) === 0) {
				min = element;
				minValue = value;
				defined = true;
			}
		}
	} else for (const value of values) if (defined ? compare(value, min) < 0 : compare(value, value) === 0) {
		min = value;
		defined = true;
	}
	return min;
}
//#endregion
//#region node_modules/d3-array/src/leastIndex.js
function leastIndex(values, compare = ascending) {
	if (compare.length === 1) return minIndex(values, compare);
	let minValue;
	let min = -1;
	let index = -1;
	for (const value of values) {
		++index;
		if (min < 0 ? compare(value, value) === 0 : compare(value, minValue) < 0) {
			minValue = value;
			min = index;
		}
	}
	return min;
}
//#endregion
//#region node_modules/d3-array/src/greatestIndex.js
function greatestIndex(values, compare = ascending) {
	if (compare.length === 1) return maxIndex(values, compare);
	let maxValue;
	let max = -1;
	let index = -1;
	for (const value of values) {
		++index;
		if (max < 0 ? compare(value, value) === 0 : compare(value, maxValue) > 0) {
			maxValue = value;
			max = index;
		}
	}
	return max;
}
//#endregion
//#region node_modules/d3-array/src/scan.js
function scan(values, compare) {
	const index = leastIndex(values, compare);
	return index < 0 ? void 0 : index;
}
//#endregion
//#region node_modules/d3-array/src/shuffle.js
var shuffle_default = shuffler(Math.random);
function shuffler(random) {
	return function shuffle(array, i0 = 0, i1 = array.length) {
		let m = i1 - (i0 = +i0);
		while (m) {
			const i = random() * m-- | 0, t = array[m + i0];
			array[m + i0] = array[i + i0];
			array[i + i0] = t;
		}
		return array;
	};
}
//#endregion
//#region node_modules/d3-array/src/transpose.js
function transpose(matrix) {
	if (!(n = matrix.length)) return [];
	for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) row[j] = matrix[j][i];
	return transpose;
}
function length(d) {
	return d.length;
}
//#endregion
//#region node_modules/d3-array/src/zip.js
function zip() {
	return transpose(arguments);
}
//#endregion
//#region node_modules/d3-array/src/every.js
function every(values, test) {
	if (typeof test !== "function") throw new TypeError("test is not a function");
	let index = -1;
	for (const value of values) if (!test(value, ++index, values)) return false;
	return true;
}
//#endregion
//#region node_modules/d3-array/src/some.js
function some(values, test) {
	if (typeof test !== "function") throw new TypeError("test is not a function");
	let index = -1;
	for (const value of values) if (test(value, ++index, values)) return true;
	return false;
}
//#endregion
//#region node_modules/d3-array/src/filter.js
function filter(values, test) {
	if (typeof test !== "function") throw new TypeError("test is not a function");
	const array = [];
	let index = -1;
	for (const value of values) if (test(value, ++index, values)) array.push(value);
	return array;
}
//#endregion
//#region node_modules/d3-array/src/map.js
function map(values, mapper) {
	if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
	if (typeof mapper !== "function") throw new TypeError("mapper is not a function");
	return Array.from(values, (value, index) => mapper(value, index, values));
}
//#endregion
//#region node_modules/d3-array/src/reduce.js
function reduce(values, reducer, value) {
	if (typeof reducer !== "function") throw new TypeError("reducer is not a function");
	const iterator = values[Symbol.iterator]();
	let done, next, index = -1;
	if (arguments.length < 3) {
		({done, value} = iterator.next());
		if (done) return;
		++index;
	}
	while ({done, value: next} = iterator.next(), !done) value = reducer(value, next, ++index, values);
	return value;
}
//#endregion
//#region node_modules/d3-array/src/reverse.js
function reverse(values) {
	if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
	return Array.from(values).reverse();
}
//#endregion
//#region node_modules/d3-array/src/difference.js
function difference(values, ...others) {
	values = new InternSet(values);
	for (const other of others) for (const value of other) values.delete(value);
	return values;
}
//#endregion
//#region node_modules/d3-array/src/disjoint.js
function disjoint(values, other) {
	const iterator = other[Symbol.iterator](), set = new InternSet();
	for (const v of values) {
		if (set.has(v)) return false;
		let value, done;
		while ({value, done} = iterator.next()) {
			if (done) break;
			if (Object.is(v, value)) return false;
			set.add(value);
		}
	}
	return true;
}
//#endregion
//#region node_modules/d3-array/src/intersection.js
function intersection(values, ...others) {
	values = new InternSet(values);
	others = others.map(set$2);
	out: for (const value of values) for (const other of others) if (!other.has(value)) {
		values.delete(value);
		continue out;
	}
	return values;
}
function set$2(values) {
	return values instanceof InternSet ? values : new InternSet(values);
}
//#endregion
//#region node_modules/d3-array/src/superset.js
function superset(values, other) {
	const iterator = values[Symbol.iterator](), set = /* @__PURE__ */ new Set();
	for (const o of other) {
		const io = intern(o);
		if (set.has(io)) continue;
		let value, done;
		while ({value, done} = iterator.next()) {
			if (done) return false;
			const ivalue = intern(value);
			set.add(ivalue);
			if (Object.is(io, ivalue)) break;
		}
	}
	return true;
}
function intern(value) {
	return value !== null && typeof value === "object" ? value.valueOf() : value;
}
//#endregion
//#region node_modules/d3-array/src/subset.js
function subset(values, other) {
	return superset(other, values);
}
//#endregion
//#region node_modules/d3-array/src/union.js
function union(...others) {
	const set = new InternSet();
	for (const other of others) for (const o of other) set.add(o);
	return set;
}
//#endregion
//#region node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees$1 = 180 / Math.PI;
//#endregion
//#region node_modules/d3-color/src/lab.js
var K = 18, Xn = .96422, Yn = 1, Zn = .82521, t0 = 4 / 29, t1 = 6 / 29, t2 = 3 * t1 * t1, t3 = t1 * t1 * t1;
function labConvert(o) {
	if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	if (o instanceof Hcl) return hcl2lab(o);
	if (!(o instanceof Rgb)) o = rgbConvert(o);
	var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((.2225045 * r + .7168786 * g + .0606169 * b) / Yn), x, z;
	if (r === g && g === b) x = z = y;
	else {
		x = xyz2lab((.4360747 * r + .3850649 * g + .1430804 * b) / Xn);
		z = xyz2lab((.0139322 * r + .0971045 * g + .7141733 * b) / Zn);
	}
	return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}
function gray(l, opacity) {
	return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}
function lab$1(l, a, b, opacity) {
	return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}
function Lab(l, a, b, opacity) {
	this.l = +l;
	this.a = +a;
	this.b = +b;
	this.opacity = +opacity;
}
define_default(Lab, lab$1, extend(Color, {
	brighter(k) {
		return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
	},
	darker(k) {
		return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
	},
	rgb() {
		var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
		x = Xn * lab2xyz(x);
		y = Yn * lab2xyz(y);
		z = Zn * lab2xyz(z);
		return new Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - .4906146 * z), lrgb2rgb(-.9787684 * x + 1.9161415 * y + .033454 * z), lrgb2rgb(.0719453 * x - .2289914 * y + 1.4052427 * z), this.opacity);
	}
}));
function xyz2lab(t) {
	return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
	return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x) {
	return 255 * (x <= .0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - .055);
}
function rgb2lrgb(x) {
	return (x /= 255) <= .04045 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4);
}
function hclConvert(o) {
	if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	if (!(o instanceof Lab)) o = labConvert(o);
	if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
	var h = Math.atan2(o.b, o.a) * degrees$1;
	return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function lch(l, c, h, opacity) {
	return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function hcl(h, c, l, opacity) {
	return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c, l, opacity) {
	this.h = +h;
	this.c = +c;
	this.l = +l;
	this.opacity = +opacity;
}
function hcl2lab(o) {
	if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
	var h = o.h * radians;
	return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
	brighter(k) {
		return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
	},
	darker(k) {
		return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
	},
	rgb() {
		return hcl2lab(this).rgb();
	}
}));
//#endregion
//#region node_modules/d3-color/src/cubehelix.js
var A = -.14861, B = 1.78277, C = -.29227, D = -.90649, E = 1.97294, ED = E * D, EB = E * B, BC_DA = B * C - D * A;
function cubehelixConvert(o) {
	if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	if (!(o instanceof Rgb)) o = rgbConvert(o);
	var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * degrees$1 - 120 : NaN;
	return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
	return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l, opacity) {
	this.h = +h;
	this.s = +s;
	this.l = +l;
	this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
	brighter(k) {
		k = k == null ? brighter : Math.pow(brighter, k);
		return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	},
	darker(k) {
		k = k == null ? darker : Math.pow(darker, k);
		return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	},
	rgb() {
		var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
		return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
	}
}));
//#endregion
//#region node_modules/d3-interpolate/src/discrete.js
function discrete_default(range) {
	var n = range.length;
	return function(t) {
		return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/hue.js
function hue_default(a, b) {
	var i = hue(+a, +b);
	return function(t) {
		var x = i(t);
		return x - 360 * Math.floor(x / 360);
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;
var identity$2 = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function decompose_default(a, b, c, d, e, f) {
	var scaleX, scaleY, skewX;
	if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	return {
		translateX: e,
		translateY: f,
		rotate: Math.atan2(b, a) * degrees,
		skewX: Math.atan(skewX) * degrees,
		scaleX,
		scaleY
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
	const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
	return m.isIdentity ? identity$2 : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
	if (value == null) return identity$2;
	if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgNode.setAttribute("transform", value);
	if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
	value = value.matrix;
	return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}
//#endregion
//#region node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
	function pop(s) {
		return s.length ? s.pop() + " " : "";
	}
	function translate(xa, ya, xb, yb, s, q) {
		if (xa !== xb || ya !== yb) {
			var i = s.push("translate(", null, pxComma, null, pxParen);
			q.push({
				i: i - 4,
				x: number_default(xa, xb)
			}, {
				i: i - 2,
				x: number_default(ya, yb)
			});
		} else if (xb || yb) s.push("translate(" + xb + pxComma + yb + pxParen);
	}
	function rotate(a, b, s, q) {
		if (a !== b) {
			if (a - b > 180) b += 360;
			else if (b - a > 180) a += 360;
			q.push({
				i: s.push(pop(s) + "rotate(", null, degParen) - 2,
				x: number_default(a, b)
			});
		} else if (b) s.push(pop(s) + "rotate(" + b + degParen);
	}
	function skewX(a, b, s, q) {
		if (a !== b) q.push({
			i: s.push(pop(s) + "skewX(", null, degParen) - 2,
			x: number_default(a, b)
		});
		else if (b) s.push(pop(s) + "skewX(" + b + degParen);
	}
	function scale(xa, ya, xb, yb, s, q) {
		if (xa !== xb || ya !== yb) {
			var i = s.push(pop(s) + "scale(", null, ",", null, ")");
			q.push({
				i: i - 4,
				x: number_default(xa, xb)
			}, {
				i: i - 2,
				x: number_default(ya, yb)
			});
		} else if (xb !== 1 || yb !== 1) s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	}
	return function(a, b) {
		var s = [], q = [];
		a = parse(a), b = parse(b);
		translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
		rotate(a.rotate, b.rotate, s, q);
		skewX(a.skewX, b.skewX, s, q);
		scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
		a = b = null;
		return function(t) {
			var i = -1, n = q.length, o;
			while (++i < n) s[(o = q[i]).i] = o.x(t);
			return s.join("");
		};
	};
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
//#endregion
//#region node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x) {
	return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
	return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
	return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
var zoom_default = (function zoomRho(rho, rho2, rho4) {
	function zoom(p0, p1) {
		var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
		if (d2 < epsilon2) {
			S = Math.log(w1 / w0) / rho;
			i = function(t) {
				return [
					ux0 + t * dx,
					uy0 + t * dy,
					w0 * Math.exp(rho * t * S)
				];
			};
		} else {
			var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
			S = (Math.log(Math.sqrt(b1 * b1 + 1) - b1) - r0) / rho;
			i = function(t) {
				var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
				return [
					ux0 + u * dx,
					uy0 + u * dy,
					w0 * coshr0 / cosh(rho * s + r0)
				];
			};
		}
		i.duration = S * 1e3 * rho / Math.SQRT2;
		return i;
	}
	zoom.rho = function(_) {
		var _1 = Math.max(.001, +_), _2 = _1 * _1;
		return zoomRho(_1, _2, _2 * _2);
	};
	return zoom;
})(Math.SQRT2, 2, 4);
//#endregion
//#region node_modules/d3-interpolate/src/hsl.js
function hsl$1(hue) {
	return function(start, end) {
		var h = hue((start = hsl(start)).h, (end = hsl(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
		return function(t) {
			start.h = h(t);
			start.s = s(t);
			start.l = l(t);
			start.opacity = opacity(t);
			return start + "";
		};
	};
}
var hsl_default = hsl$1(hue);
var hslLong = hsl$1(nogamma);
//#endregion
//#region node_modules/d3-interpolate/src/lab.js
function lab(start, end) {
	var l = nogamma((start = lab$1(start)).l, (end = lab$1(end)).l), a = nogamma(start.a, end.a), b = nogamma(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
	return function(t) {
		start.l = l(t);
		start.a = a(t);
		start.b = b(t);
		start.opacity = opacity(t);
		return start + "";
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/hcl.js
function hcl$1(hue) {
	return function(start, end) {
		var h = hue((start = hcl(start)).h, (end = hcl(end)).h), c = nogamma(start.c, end.c), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
		return function(t) {
			start.h = h(t);
			start.c = c(t);
			start.l = l(t);
			start.opacity = opacity(t);
			return start + "";
		};
	};
}
var hcl_default = hcl$1(hue);
var hclLong = hcl$1(nogamma);
//#endregion
//#region node_modules/d3-interpolate/src/cubehelix.js
function cubehelix$1(hue) {
	return (function cubehelixGamma(y) {
		y = +y;
		function cubehelix$2(start, end) {
			var h = hue((start = cubehelix(start)).h, (end = cubehelix(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
			return function(t) {
				start.h = h(t);
				start.s = s(t);
				start.l = l(Math.pow(t, y));
				start.opacity = opacity(t);
				return start + "";
			};
		}
		cubehelix$2.gamma = cubehelixGamma;
		return cubehelix$2;
	})(1);
}
var cubehelix_default = cubehelix$1(hue);
var cubehelixLong = cubehelix$1(nogamma);
//#endregion
//#region node_modules/d3-interpolate/src/quantize.js
function quantize_default(interpolator, n) {
	var samples = new Array(n);
	for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
	return samples;
}
//#endregion
//#region node_modules/d3-geo/src/clip/extent.js
function extent_default() {
	var x0 = 0, y0 = 0, x1 = 960, y1 = 500, cache, cacheStream, clip;
	return clip = {
		stream: function(stream) {
			return cache && cacheStream === stream ? cache : cache = clipRectangle(x0, y0, x1, y1)(cacheStream = stream);
		},
		extent: function(_) {
			return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
		}
	};
}
//#endregion
//#region node_modules/d3-geo/src/path/area.js
var areaSum = new Adder(), areaRingSum = new Adder(), x00$2, y00$2, x0$2, y0$2;
var areaStream = {
	point: noop$1,
	lineStart: noop$1,
	lineEnd: noop$1,
	polygonStart: function() {
		areaStream.lineStart = areaRingStart;
		areaStream.lineEnd = areaRingEnd;
	},
	polygonEnd: function() {
		areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop$1;
		areaSum.add(abs$3(areaRingSum));
		areaRingSum = new Adder();
	},
	result: function() {
		var area = areaSum / 2;
		areaSum = new Adder();
		return area;
	}
};
function areaRingStart() {
	areaStream.point = areaPointFirst;
}
function areaPointFirst(x, y) {
	areaStream.point = areaPoint;
	x00$2 = x0$2 = x, y00$2 = y0$2 = y;
}
function areaPoint(x, y) {
	areaRingSum.add(y0$2 * x - x0$2 * y);
	x0$2 = x, y0$2 = y;
}
function areaRingEnd() {
	areaPoint(x00$2, y00$2);
}
//#endregion
//#region node_modules/d3-geo/src/path/centroid.js
var X0 = 0, Y0 = 0, Z0 = 0, X1 = 0, Y1 = 0, Z1 = 0, X2 = 0, Y2 = 0, Z2 = 0, x00$1, y00$1, x0$1, y0$1;
var centroidStream = {
	point: centroidPoint,
	lineStart: centroidLineStart,
	lineEnd: centroidLineEnd,
	polygonStart: function() {
		centroidStream.lineStart = centroidRingStart;
		centroidStream.lineEnd = centroidRingEnd;
	},
	polygonEnd: function() {
		centroidStream.point = centroidPoint;
		centroidStream.lineStart = centroidLineStart;
		centroidStream.lineEnd = centroidLineEnd;
	},
	result: function() {
		var centroid = Z2 ? [X2 / Z2, Y2 / Z2] : Z1 ? [X1 / Z1, Y1 / Z1] : Z0 ? [X0 / Z0, Y0 / Z0] : [NaN, NaN];
		X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
		return centroid;
	}
};
function centroidPoint(x, y) {
	X0 += x;
	Y0 += y;
	++Z0;
}
function centroidLineStart() {
	centroidStream.point = centroidPointFirstLine;
}
function centroidPointFirstLine(x, y) {
	centroidStream.point = centroidPointLine;
	centroidPoint(x0$1 = x, y0$1 = y);
}
function centroidPointLine(x, y) {
	var dx = x - x0$1, dy = y - y0$1, z = sqrt$2(dx * dx + dy * dy);
	X1 += z * (x0$1 + x) / 2;
	Y1 += z * (y0$1 + y) / 2;
	Z1 += z;
	centroidPoint(x0$1 = x, y0$1 = y);
}
function centroidLineEnd() {
	centroidStream.point = centroidPoint;
}
function centroidRingStart() {
	centroidStream.point = centroidPointFirstRing;
}
function centroidRingEnd() {
	centroidPointRing(x00$1, y00$1);
}
function centroidPointFirstRing(x, y) {
	centroidStream.point = centroidPointRing;
	centroidPoint(x00$1 = x0$1 = x, y00$1 = y0$1 = y);
}
function centroidPointRing(x, y) {
	var dx = x - x0$1, dy = y - y0$1, z = sqrt$2(dx * dx + dy * dy);
	X1 += z * (x0$1 + x) / 2;
	Y1 += z * (y0$1 + y) / 2;
	Z1 += z;
	z = y0$1 * x - x0$1 * y;
	X2 += z * (x0$1 + x);
	Y2 += z * (y0$1 + y);
	Z2 += z * 3;
	centroidPoint(x0$1 = x, y0$1 = y);
}
//#endregion
//#region node_modules/d3-geo/src/path/context.js
function PathContext(context) {
	this._context = context;
}
PathContext.prototype = {
	_radius: 4.5,
	pointRadius: function(_) {
		return this._radius = _, this;
	},
	polygonStart: function() {
		this._line = 0;
	},
	polygonEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		if (this._line === 0) this._context.closePath();
		this._point = NaN;
	},
	point: function(x, y) {
		switch (this._point) {
			case 0:
				this._context.moveTo(x, y);
				this._point = 1;
				break;
			case 1:
				this._context.lineTo(x, y);
				break;
			default:
				this._context.moveTo(x + this._radius, y);
				this._context.arc(x, y, this._radius, 0, tau$3);
				break;
		}
	},
	result: noop$1
};
//#endregion
//#region node_modules/d3-geo/src/path/measure.js
var lengthSum = new Adder(), lengthRing, x00, y00, x0, y0;
var lengthStream = {
	point: noop$1,
	lineStart: function() {
		lengthStream.point = lengthPointFirst;
	},
	lineEnd: function() {
		if (lengthRing) lengthPoint(x00, y00);
		lengthStream.point = noop$1;
	},
	polygonStart: function() {
		lengthRing = true;
	},
	polygonEnd: function() {
		lengthRing = null;
	},
	result: function() {
		var length = +lengthSum;
		lengthSum = new Adder();
		return length;
	}
};
function lengthPointFirst(x, y) {
	lengthStream.point = lengthPoint;
	x00 = x0 = x, y00 = y0 = y;
}
function lengthPoint(x, y) {
	x0 -= x, y0 -= y;
	lengthSum.add(sqrt$2(x0 * x0 + y0 * y0));
	x0 = x, y0 = y;
}
//#endregion
//#region node_modules/d3-geo/src/path/string.js
var cacheDigits, cacheAppend, cacheRadius, cacheCircle;
var PathString = class {
	constructor(digits) {
		this._append = digits == null ? append : appendRound(digits);
		this._radius = 4.5;
		this._ = "";
	}
	pointRadius(_) {
		this._radius = +_;
		return this;
	}
	polygonStart() {
		this._line = 0;
	}
	polygonEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		if (this._line === 0) this._ += "Z";
		this._point = NaN;
	}
	point(x, y) {
		switch (this._point) {
			case 0:
				this._append`M${x},${y}`;
				this._point = 1;
				break;
			case 1:
				this._append`L${x},${y}`;
				break;
			default:
				this._append`M${x},${y}`;
				if (this._radius !== cacheRadius || this._append !== cacheAppend) {
					const r = this._radius;
					const s = this._;
					this._ = "";
					this._append`m0,${r}a${r},${r} 0 1,1 0,${-2 * r}a${r},${r} 0 1,1 0,${2 * r}z`;
					cacheRadius = r;
					cacheAppend = this._append;
					cacheCircle = this._;
					this._ = s;
				}
				this._ += cacheCircle;
				break;
		}
	}
	result() {
		const result = this._;
		this._ = "";
		return result.length ? result : null;
	}
};
function append(strings) {
	let i = 1;
	this._ += strings[0];
	for (const j = strings.length; i < j; ++i) this._ += arguments[i] + strings[i];
}
function appendRound(digits) {
	const d = Math.floor(digits);
	if (!(d >= 0)) throw new RangeError(`invalid digits: ${digits}`);
	if (d > 15) return append;
	if (d !== cacheDigits) {
		const k = 10 ** d;
		cacheDigits = d;
		cacheAppend = function append(strings) {
			let i = 1;
			this._ += strings[0];
			for (const j = strings.length; i < j; ++i) this._ += Math.round(arguments[i] * k) / k + strings[i];
		};
	}
	return cacheAppend;
}
//#endregion
//#region node_modules/d3-geo/src/path/index.js
function path_default(projection, context) {
	let digits = 3, pointRadius = 4.5, projectionStream, contextStream;
	function path(object) {
		if (object) {
			if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
			stream_default(object, projectionStream(contextStream));
		}
		return contextStream.result();
	}
	path.area = function(object) {
		stream_default(object, projectionStream(areaStream));
		return areaStream.result();
	};
	path.measure = function(object) {
		stream_default(object, projectionStream(lengthStream));
		return lengthStream.result();
	};
	path.bounds = function(object) {
		stream_default(object, projectionStream(boundsStream));
		return boundsStream.result();
	};
	path.centroid = function(object) {
		stream_default(object, projectionStream(centroidStream));
		return centroidStream.result();
	};
	path.projection = function(_) {
		if (!arguments.length) return projection;
		projectionStream = _ == null ? (projection = null, identity_default$3) : (projection = _).stream;
		return path;
	};
	path.context = function(_) {
		if (!arguments.length) return context;
		contextStream = _ == null ? (context = null, new PathString(digits)) : new PathContext(context = _);
		if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
		return path;
	};
	path.pointRadius = function(_) {
		if (!arguments.length) return pointRadius;
		pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
		return path;
	};
	path.digits = function(_) {
		if (!arguments.length) return digits;
		if (_ == null) digits = null;
		else {
			const d = Math.floor(_);
			if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
			digits = d;
		}
		if (context === null) contextStream = new PathString(digits);
		return path;
	};
	return path.projection(projection).digits(digits).context(context);
}
//#endregion
//#region node_modules/d3-geo/src/projection/conic.js
function conicProjection(projectAt) {
	var phi0 = 0, phi1 = pi$3 / 3, m = projectionMutator(projectAt), p = m(phi0, phi1);
	p.parallels = function(_) {
		return arguments.length ? m(phi0 = _[0] * radians$1, phi1 = _[1] * radians$1) : [phi0 * degrees$2, phi1 * degrees$2];
	};
	return p;
}
//#endregion
//#region node_modules/d3-geo/src/projection/cylindricalEqualArea.js
function cylindricalEqualAreaRaw(phi0) {
	var cosPhi0 = cos$2(phi0);
	function forward(lambda, phi) {
		return [lambda * cosPhi0, sin$2(phi) / cosPhi0];
	}
	forward.invert = function(x, y) {
		return [x / cosPhi0, asin$1(y * cosPhi0)];
	};
	return forward;
}
//#endregion
//#region node_modules/d3-geo/src/projection/conicEqualArea.js
function conicEqualAreaRaw(y0, y1) {
	var sy0 = sin$2(y0), n = (sy0 + sin$2(y1)) / 2;
	if (abs$3(n) < 1e-6) return cylindricalEqualAreaRaw(y0);
	var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt$2(c) / n;
	function project(x, y) {
		var r = sqrt$2(c - 2 * n * sin$2(y)) / n;
		return [r * sin$2(x *= n), r0 - r * cos$2(x)];
	}
	project.invert = function(x, y) {
		var r0y = r0 - y, l = atan2$1(x, abs$3(r0y)) * sign(r0y);
		if (r0y * n < 0) l -= pi$3 * sign(x) * sign(r0y);
		return [l / n, asin$1((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
	};
	return project;
}
function conicEqualArea_default() {
	return conicProjection(conicEqualAreaRaw).scale(155.424).center([0, 33.6442]);
}
//#endregion
//#region node_modules/d3-geo/src/projection/albers.js
function albers_default() {
	return conicEqualArea_default().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-.6, 38.7]);
}
//#endregion
//#region node_modules/d3-geo/src/projection/albersUsa.js
function multiplex(streams) {
	var n = streams.length;
	return {
		point: function(x, y) {
			var i = -1;
			while (++i < n) streams[i].point(x, y);
		},
		sphere: function() {
			var i = -1;
			while (++i < n) streams[i].sphere();
		},
		lineStart: function() {
			var i = -1;
			while (++i < n) streams[i].lineStart();
		},
		lineEnd: function() {
			var i = -1;
			while (++i < n) streams[i].lineEnd();
		},
		polygonStart: function() {
			var i = -1;
			while (++i < n) streams[i].polygonStart();
		},
		polygonEnd: function() {
			var i = -1;
			while (++i < n) streams[i].polygonEnd();
		}
	};
}
function albersUsa_default() {
	var cache, cacheStream, lower48 = albers_default(), lower48Point, alaska = conicEqualArea_default().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, hawaii = conicEqualArea_default().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, point, pointStream = { point: function(x, y) {
		point = [x, y];
	} };
	function albersUsa(coordinates) {
		var x = coordinates[0], y = coordinates[1];
		return point = null, (lower48Point.point(x, y), point) || (alaskaPoint.point(x, y), point) || (hawaiiPoint.point(x, y), point);
	}
	albersUsa.invert = function(coordinates) {
		var k = lower48.scale(), t = lower48.translate(), x = (coordinates[0] - t[0]) / k, y = (coordinates[1] - t[1]) / k;
		return (y >= .12 && y < .234 && x >= -.425 && x < -.214 ? alaska : y >= .166 && y < .234 && x >= -.214 && x < -.115 ? hawaii : lower48).invert(coordinates);
	};
	albersUsa.stream = function(stream) {
		return cache && cacheStream === stream ? cache : cache = multiplex([
			lower48.stream(cacheStream = stream),
			alaska.stream(stream),
			hawaii.stream(stream)
		]);
	};
	albersUsa.precision = function(_) {
		if (!arguments.length) return lower48.precision();
		lower48.precision(_), alaska.precision(_), hawaii.precision(_);
		return reset();
	};
	albersUsa.scale = function(_) {
		if (!arguments.length) return lower48.scale();
		lower48.scale(_), alaska.scale(_ * .35), hawaii.scale(_);
		return albersUsa.translate(lower48.translate());
	};
	albersUsa.translate = function(_) {
		if (!arguments.length) return lower48.translate();
		var k = lower48.scale(), x = +_[0], y = +_[1];
		lower48Point = lower48.translate(_).clipExtent([[x - .455 * k, y - .238 * k], [x + .455 * k, y + .238 * k]]).stream(pointStream);
		alaskaPoint = alaska.translate([x - .307 * k, y + .201 * k]).clipExtent([[x - .425 * k + epsilon$3, y + .12 * k + epsilon$3], [x - .214 * k - epsilon$3, y + .234 * k - epsilon$3]]).stream(pointStream);
		hawaiiPoint = hawaii.translate([x - .205 * k, y + .212 * k]).clipExtent([[x - .214 * k + epsilon$3, y + .166 * k + epsilon$3], [x - .115 * k - epsilon$3, y + .234 * k - epsilon$3]]).stream(pointStream);
		return reset();
	};
	albersUsa.fitExtent = function(extent, object) {
		return fitExtent(albersUsa, extent, object);
	};
	albersUsa.fitSize = function(size, object) {
		return fitSize(albersUsa, size, object);
	};
	albersUsa.fitWidth = function(width, object) {
		return fitWidth(albersUsa, width, object);
	};
	albersUsa.fitHeight = function(height, object) {
		return fitHeight(albersUsa, height, object);
	};
	function reset() {
		cache = cacheStream = null;
		return albersUsa;
	}
	return albersUsa.scale(1070);
}
//#endregion
//#region node_modules/d3-geo/src/projection/azimuthalEqualArea.js
var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
	return sqrt$2(2 / (1 + cxcy));
});
azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
	return 2 * asin$1(z / 2);
});
function azimuthalEqualArea_default() {
	return projection(azimuthalEqualAreaRaw).scale(124.75).clipAngle(179.999);
}
//#endregion
//#region node_modules/d3-geo/src/projection/azimuthalEquidistant.js
var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
	return (c = acos$1(c)) && c / sin$2(c);
});
azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
	return z;
});
function azimuthalEquidistant_default() {
	return projection(azimuthalEquidistantRaw).scale(79.4188).clipAngle(179.999);
}
//#endregion
//#region node_modules/d3-geo/src/projection/conicConformal.js
function tany(y) {
	return tan((halfPi$3 + y) / 2);
}
function conicConformalRaw(y0, y1) {
	var cy0 = cos$2(y0), n = y0 === y1 ? sin$2(y0) : log$1(cy0 / cos$2(y1)) / log$1(tany(y1) / tany(y0)), f = cy0 * pow$1(tany(y0), n) / n;
	if (!n) return mercatorRaw;
	function project(x, y) {
		if (f > 0) {
			if (y < -halfPi$3 + 1e-6) y = -halfPi$3 + epsilon$3;
		} else if (y > halfPi$3 - 1e-6) y = halfPi$3 - epsilon$3;
		var r = f / pow$1(tany(y), n);
		return [r * sin$2(n * x), f - r * cos$2(n * x)];
	}
	project.invert = function(x, y) {
		var fy = f - y, r = sign(n) * sqrt$2(x * x + fy * fy), l = atan2$1(x, abs$3(fy)) * sign(fy);
		if (fy * n < 0) l -= pi$3 * sign(x) * sign(fy);
		return [l / n, 2 * atan(pow$1(f / r, 1 / n)) - halfPi$3];
	};
	return project;
}
function conicConformal_default() {
	return conicProjection(conicConformalRaw).scale(109.5).parallels([30, 30]);
}
//#endregion
//#region node_modules/d3-geo/src/projection/equirectangular.js
function equirectangularRaw(lambda, phi) {
	return [lambda, phi];
}
equirectangularRaw.invert = equirectangularRaw;
function equirectangular_default() {
	return projection(equirectangularRaw).scale(152.63);
}
//#endregion
//#region node_modules/d3-geo/src/projection/conicEquidistant.js
function conicEquidistantRaw(y0, y1) {
	var cy0 = cos$2(y0), n = y0 === y1 ? sin$2(y0) : (cy0 - cos$2(y1)) / (y1 - y0), g = cy0 / n + y0;
	if (abs$3(n) < 1e-6) return equirectangularRaw;
	function project(x, y) {
		var gy = g - y, nx = n * x;
		return [gy * sin$2(nx), g - gy * cos$2(nx)];
	}
	project.invert = function(x, y) {
		var gy = g - y, l = atan2$1(x, abs$3(gy)) * sign(gy);
		if (gy * n < 0) l -= pi$3 * sign(x) * sign(gy);
		return [l / n, g - sign(n) * sqrt$2(x * x + gy * gy)];
	};
	return project;
}
function conicEquidistant_default() {
	return conicProjection(conicEquidistantRaw).scale(131.154).center([0, 13.9389]);
}
//#endregion
//#region node_modules/d3-geo/src/projection/equalEarth.js
var A1 = 1.340264, A2 = -.081106, A3 = 893e-6, A4 = .003796, M = sqrt$2(3) / 2, iterations = 12;
function equalEarthRaw(lambda, phi) {
	var l = asin$1(M * sin$2(phi)), l2 = l * l, l6 = l2 * l2 * l2;
	return [lambda * cos$2(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))), l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))];
}
equalEarthRaw.invert = function(x, y) {
	var l = y, l2 = l * l, l6 = l2 * l2 * l2;
	for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
		fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
		fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
		l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
		if (abs$3(delta) < 1e-12) break;
	}
	return [M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos$2(l), asin$1(sin$2(l) / M)];
};
function equalEarth_default() {
	return projection(equalEarthRaw).scale(177.158);
}
//#endregion
//#region node_modules/d3-geo/src/projection/gnomonic.js
function gnomonicRaw(x, y) {
	var cy = cos$2(y), k = cos$2(x) * cy;
	return [cy * sin$2(x) / k, sin$2(y) / k];
}
gnomonicRaw.invert = azimuthalInvert(atan);
function gnomonic_default() {
	return projection(gnomonicRaw).scale(144.049).clipAngle(60);
}
//#endregion
//#region node_modules/d3-geo/src/projection/identity.js
function identity_default() {
	var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, alpha = 0, ca, sa, x0 = null, y0, x1, y1, kx = 1, ky = 1, transform = transformer({ point: function(x, y) {
		var p = projection([x, y]);
		this.stream.point(p[0], p[1]);
	} }), postclip = identity_default$3, cache, cacheStream;
	function reset() {
		kx = k * sx;
		ky = k * sy;
		cache = cacheStream = null;
		return projection;
	}
	function projection(p) {
		var x = p[0] * kx, y = p[1] * ky;
		if (alpha) {
			var t = y * ca - x * sa;
			x = x * ca + y * sa;
			y = t;
		}
		return [x + tx, y + ty];
	}
	projection.invert = function(p) {
		var x = p[0] - tx, y = p[1] - ty;
		if (alpha) {
			var t = y * ca + x * sa;
			x = x * ca - y * sa;
			y = t;
		}
		return [x / kx, y / ky];
	};
	projection.stream = function(stream) {
		return cache && cacheStream === stream ? cache : cache = transform(postclip(cacheStream = stream));
	};
	projection.postclip = function(_) {
		return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
	};
	projection.clipExtent = function(_) {
		return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity_default$3) : clipRectangle(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
	};
	projection.scale = function(_) {
		return arguments.length ? (k = +_, reset()) : k;
	};
	projection.translate = function(_) {
		return arguments.length ? (tx = +_[0], ty = +_[1], reset()) : [tx, ty];
	};
	projection.angle = function(_) {
		return arguments.length ? (alpha = _ % 360 * radians$1, sa = sin$2(alpha), ca = cos$2(alpha), reset()) : alpha * degrees$2;
	};
	projection.reflectX = function(_) {
		return arguments.length ? (sx = _ ? -1 : 1, reset()) : sx < 0;
	};
	projection.reflectY = function(_) {
		return arguments.length ? (sy = _ ? -1 : 1, reset()) : sy < 0;
	};
	projection.fitExtent = function(extent, object) {
		return fitExtent(projection, extent, object);
	};
	projection.fitSize = function(size, object) {
		return fitSize(projection, size, object);
	};
	projection.fitWidth = function(width, object) {
		return fitWidth(projection, width, object);
	};
	projection.fitHeight = function(height, object) {
		return fitHeight(projection, height, object);
	};
	return projection;
}
//#endregion
//#region node_modules/d3-geo/src/projection/naturalEarth1.js
function naturalEarth1Raw(lambda, phi) {
	var phi2 = phi * phi, phi4 = phi2 * phi2;
	return [lambda * (.8707 - .131979 * phi2 + phi4 * (-.013791 + phi4 * (.003971 * phi2 - .001529 * phi4))), phi * (1.007226 + phi2 * (.015085 + phi4 * (-.044475 + .028874 * phi2 - .005916 * phi4)))];
}
naturalEarth1Raw.invert = function(x, y) {
	var phi = y, i = 25, delta;
	do {
		var phi2 = phi * phi, phi4 = phi2 * phi2;
		phi -= delta = (phi * (1.007226 + phi2 * (.015085 + phi4 * (-.044475 + .028874 * phi2 - .005916 * phi4))) - y) / (1.007226 + phi2 * (.015085 * 3 + phi4 * (-.044475 * 7 + .028874 * 9 * phi2 - .005916 * 11 * phi4)));
	} while (abs$3(delta) > 1e-6 && --i > 0);
	return [x / (.8707 + (phi2 = phi * phi) * (-.131979 + phi2 * (-.013791 + phi2 * phi2 * phi2 * (.003971 - .001529 * phi2)))), phi];
};
function naturalEarth1_default() {
	return projection(naturalEarth1Raw).scale(175.295);
}
//#endregion
//#region node_modules/d3-geo/src/projection/orthographic.js
function orthographicRaw(x, y) {
	return [cos$2(y) * sin$2(x), sin$2(y)];
}
orthographicRaw.invert = azimuthalInvert(asin$1);
function orthographic_default() {
	return projection(orthographicRaw).scale(249.5).clipAngle(90 + epsilon$3);
}
//#endregion
//#region node_modules/d3-geo/src/projection/transverseMercator.js
function transverseMercatorRaw(lambda, phi) {
	return [log$1(tan((halfPi$3 + phi) / 2)), -lambda];
}
transverseMercatorRaw.invert = function(x, y) {
	return [-y, 2 * atan(exp(x)) - halfPi$3];
};
function transverseMercator_default() {
	var m = mercatorProjection(transverseMercatorRaw), center = m.center, rotate = m.rotate;
	m.center = function(_) {
		return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
	};
	m.rotate = function(_) {
		return arguments.length ? rotate([
			_[0],
			_[1],
			_.length > 2 ? _[2] + 90 : 90
		]) : (_ = rotate(), [
			_[0],
			_[1],
			_[2] - 90
		]);
	};
	return rotate([
		0,
		0,
		90
	]).scale(159.155);
}
//#endregion
//#region node_modules/d3-scale-chromatic/src/colors.js
function colors_default(specifier) {
	var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
	while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
	return colors;
}
//#endregion
//#region node_modules/d3-scale-chromatic/src/categorical/category10.js
var category10_default = colors_default("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
//#endregion
//#region node_modules/d3-scale-chromatic/src/categorical/Accent.js
var Accent_default = colors_default("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
//#endregion
//#region node_modules/d3-scale-chromatic/src/categorical/Dark2.js
var Dark2_default = colors_default("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
//#endregion
//#region node_modules/d3-scale-chromatic/src/categorical/observable10.js
var observable10_default = colors_default("4269d0efb118ff725c6cc5b03ca951ff8ab7a463f297bbf59c6b4e9498a0");
//#endregion
//#region node_modules/d3-scale-chromatic/src/categorical/Paired.js
var Paired_default = colors_default("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
//#endregion
//#region node_modules/d3-scale-chromatic/src/categorical/Pastel1.js
var Pastel1_default = colors_default("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
//#endregion
//#region node_modules/d3-scale-chromatic/src/categorical/Pastel2.js
var Pastel2_default = colors_default("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
//#endregion
//#region node_modules/d3-scale-chromatic/src/categorical/Set1.js
var Set1_default = colors_default("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
//#endregion
//#region node_modules/d3-scale-chromatic/src/categorical/Set2.js
var Set2_default = colors_default("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
//#endregion
//#region node_modules/d3-scale-chromatic/src/categorical/Set3.js
var Set3_default = colors_default("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");
//#endregion
//#region node_modules/d3-scale-chromatic/src/categorical/Tableau10.js
var Tableau10_default = colors_default("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
//#endregion
//#region node_modules/d3-scale-chromatic/src/ramp.js
var ramp_default = (scheme) => rgbBasis(scheme[scheme.length - 1]);
//#endregion
//#region node_modules/d3-scale-chromatic/src/diverging/BrBG.js
var scheme$1 = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(colors_default);
var BrBG_default = ramp_default(scheme$1);
//#endregion
//#region node_modules/d3-scale-chromatic/src/diverging/PRGn.js
var scheme$9 = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(colors_default);
var PRGn_default = ramp_default(scheme$9);
//#endregion
//#region node_modules/d3-scale-chromatic/src/diverging/PiYG.js
var scheme$10 = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(colors_default);
var PiYG_default = ramp_default(scheme$10);
//#endregion
//#region node_modules/d3-scale-chromatic/src/diverging/PuOr.js
var scheme$13 = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(colors_default);
var PuOr_default = ramp_default(scheme$13);
//#endregion
//#region node_modules/d3-scale-chromatic/src/diverging/RdBu.js
var scheme$16 = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(colors_default);
var RdBu_default = ramp_default(scheme$16);
//#endregion
//#region node_modules/d3-scale-chromatic/src/diverging/RdGy.js
var scheme$17 = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(colors_default);
var RdGy_default = ramp_default(scheme$17);
//#endregion
//#region node_modules/d3-scale-chromatic/src/diverging/RdYlBu.js
var scheme$19 = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(colors_default);
var RdYlBu_default = ramp_default(scheme$19);
//#endregion
//#region node_modules/d3-scale-chromatic/src/diverging/RdYlGn.js
var scheme$20 = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(colors_default);
var RdYlGn_default = ramp_default(scheme$20);
//#endregion
//#region node_modules/d3-scale-chromatic/src/diverging/Spectral.js
var scheme$22 = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(colors_default);
var Spectral_default = ramp_default(scheme$22);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/BuGn.js
var scheme$2 = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(colors_default);
var BuGn_default = ramp_default(scheme$2);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/BuPu.js
var scheme$3 = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(colors_default);
var BuPu_default = ramp_default(scheme$3);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/GnBu.js
var scheme$4 = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(colors_default);
var GnBu_default = ramp_default(scheme$4);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/OrRd.js
var scheme$7 = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(colors_default);
var OrRd_default = ramp_default(scheme$7);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/PuBuGn.js
var scheme$12 = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(colors_default);
var PuBuGn_default = ramp_default(scheme$12);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/PuBu.js
var scheme$11 = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(colors_default);
var PuBu_default = ramp_default(scheme$11);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/PuRd.js
var scheme$14 = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(colors_default);
var PuRd_default = ramp_default(scheme$14);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/RdPu.js
var scheme$18 = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(colors_default);
var RdPu_default = ramp_default(scheme$18);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/YlGnBu.js
var scheme$24 = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(colors_default);
var YlGnBu_default = ramp_default(scheme$24);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/YlGn.js
var scheme$23 = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(colors_default);
var YlGn_default = ramp_default(scheme$23);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/YlOrBr.js
var scheme$25 = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(colors_default);
var YlOrBr_default = ramp_default(scheme$25);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/YlOrRd.js
var scheme$26 = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(colors_default);
var YlOrRd_default = ramp_default(scheme$26);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-single/Blues.js
var scheme = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(colors_default);
var Blues_default = ramp_default(scheme);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-single/Greens.js
var scheme$5 = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(colors_default);
var Greens_default = ramp_default(scheme$5);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-single/Greys.js
var scheme$6 = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(colors_default);
var Greys_default = ramp_default(scheme$6);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-single/Purples.js
var scheme$15 = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(colors_default);
var Purples_default = ramp_default(scheme$15);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-single/Reds.js
var scheme$21 = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(colors_default);
var Reds_default = ramp_default(scheme$21);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-single/Oranges.js
var scheme$8 = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(colors_default);
var Oranges_default = ramp_default(scheme$8);
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/cividis.js
function cividis_default(t) {
	t = Math.max(0, Math.min(1, t));
	return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67))))))) + ")";
}
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/cubehelix.js
var cubehelix_default$1 = cubehelixLong(cubehelix(300, .5, 0), cubehelix(-240, .5, 1));
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js
var warm = cubehelixLong(cubehelix(-100, .75, .35), cubehelix(80, 1.5, .8));
var cool = cubehelixLong(cubehelix(260, .75, .35), cubehelix(80, 1.5, .8));
var c$3 = cubehelix();
function rainbow_default(t) {
	if (t < 0 || t > 1) t -= Math.floor(t);
	var ts = Math.abs(t - .5);
	c$3.h = 360 * t - 100;
	c$3.s = 1.5 - 1.5 * ts;
	c$3.l = .8 - .9 * ts;
	return c$3 + "";
}
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/sinebow.js
var c$2 = rgb(), pi_1_3 = Math.PI / 3, pi_2_3 = Math.PI * 2 / 3;
function sinebow_default(t) {
	var x;
	t = (.5 - t) * Math.PI;
	c$2.r = 255 * (x = Math.sin(t)) * x;
	c$2.g = 255 * (x = Math.sin(t + pi_1_3)) * x;
	c$2.b = 255 * (x = Math.sin(t + pi_2_3)) * x;
	return c$2 + "";
}
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js
function ramp(range) {
	var n = range.length;
	return function(t) {
		return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
	};
}
var viridis_default = ramp(colors_default("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var magma = ramp(colors_default("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var inferno = ramp(colors_default("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var plasma = ramp(colors_default("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
//#endregion
//#region node_modules/d3-selection/src/create.js
function create_default(name) {
	return select_default(creator_default(name).call(document.documentElement));
}
//#endregion
//#region node_modules/d3-selection/src/local.js
var nextId = 0;
function local() {
	return new Local();
}
function Local() {
	this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
	constructor: Local,
	get: function(node) {
		var id = this._;
		while (!(id in node)) if (!(node = node.parentNode)) return;
		return node[id];
	},
	set: function(node, value) {
		return node[this._] = value;
	},
	remove: function(node) {
		return this._ in node && delete node[this._];
	},
	toString: function() {
		return this._;
	}
};
//#endregion
//#region node_modules/d3-selection/src/pointers.js
function pointers_default(events, node) {
	if (events.target) {
		events = sourceEvent_default(events);
		if (node === void 0) node = events.currentTarget;
		events = events.touches || [events];
	}
	return Array.from(events, (event) => pointer_default(event, node));
}
//#endregion
//#region node_modules/d3-selection/src/selectAll.js
function selectAll_default(selector) {
	return typeof selector === "string" ? new Selection$1([document.querySelectorAll(selector)], [document.documentElement]) : new Selection$1([array$2(selector)], root$1);
}
//#endregion
//#region node_modules/d3-axis/src/identity.js
function identity_default$1(x) {
	return x;
}
//#endregion
//#region node_modules/d3-axis/src/axis.js
var top = 1, right = 2, bottom = 3, left = 4, epsilon$1 = 1e-6;
function translateX(x) {
	return "translate(" + x + ",0)";
}
function translateY(y) {
	return "translate(0," + y + ")";
}
function number(scale) {
	return (d) => +scale(d);
}
function center(scale, offset) {
	offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
	if (scale.round()) offset = Math.round(offset);
	return (d) => +scale(d) + offset;
}
function entering() {
	return !this.__axis;
}
function axis(orient, scale) {
	var tickArguments = [], tickValues = null, tickFormat = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : .5, k = orient === top || orient === left ? -1 : 1, x = orient === left || orient === right ? "x" : "y", transform = orient === top || orient === bottom ? translateX : translateY;
	function axis(context) {
		var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity_default$1 : tickFormat, spacing = Math.max(tickSizeInner, 0) + tickPadding, range = scale.range(), range0 = +range[0] + offset, range1 = +range[range.length - 1] + offset, position = (scale.bandwidth ? center : number)(scale.copy(), offset), selection = context.selection ? context.selection() : context, path = selection.selectAll(".domain").data([null]), tick = selection.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text = tick.select("text");
		path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
		tick = tick.merge(tickEnter);
		line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x + "2", k * tickSizeInner));
		text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x, k * spacing).attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
		if (context !== selection) {
			path = path.transition(context);
			tick = tick.transition(context);
			line = line.transition(context);
			text = text.transition(context);
			tickExit = tickExit.transition(context).attr("opacity", epsilon$1).attr("transform", function(d) {
				return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform");
			});
			tickEnter.attr("opacity", epsilon$1).attr("transform", function(d) {
				var p = this.parentNode.__axis;
				return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset);
			});
		}
		tickExit.remove();
		path.attr("d", orient === left || orient === right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1);
		tick.attr("opacity", 1).attr("transform", function(d) {
			return transform(position(d) + offset);
		});
		line.attr(x + "2", k * tickSizeInner);
		text.attr(x, k * spacing).text(format);
		selection.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
		selection.each(function() {
			this.__axis = position;
		});
	}
	axis.scale = function(_) {
		return arguments.length ? (scale = _, axis) : scale;
	};
	axis.ticks = function() {
		return tickArguments = Array.from(arguments), axis;
	};
	axis.tickArguments = function(_) {
		return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis) : tickArguments.slice();
	};
	axis.tickValues = function(_) {
		return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis) : tickValues && tickValues.slice();
	};
	axis.tickFormat = function(_) {
		return arguments.length ? (tickFormat = _, axis) : tickFormat;
	};
	axis.tickSize = function(_) {
		return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
	};
	axis.tickSizeInner = function(_) {
		return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
	};
	axis.tickSizeOuter = function(_) {
		return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
	};
	axis.tickPadding = function(_) {
		return arguments.length ? (tickPadding = +_, axis) : tickPadding;
	};
	axis.offset = function(_) {
		return arguments.length ? (offset = +_, axis) : offset;
	};
	return axis;
}
function axisTop(scale) {
	return axis(top, scale);
}
function axisRight(scale) {
	return axis(right, scale);
}
function axisBottom(scale) {
	return axis(bottom, scale);
}
function axisLeft(scale) {
	return axis(left, scale);
}
//#endregion
//#region node_modules/d3-dispatch/src/dispatch.js
var noop = { value: () => {} };
function dispatch() {
	for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
		if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
		_[t] = [];
	}
	return new Dispatch(_);
}
function Dispatch(_) {
	this._ = _;
}
function parseTypenames(typenames, types) {
	return typenames.trim().split(/^|\s+/).map(function(t) {
		var name = "", i = t.indexOf(".");
		if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
		if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
		return {
			type: t,
			name
		};
	});
}
Dispatch.prototype = dispatch.prototype = {
	constructor: Dispatch,
	on: function(typename, callback) {
		var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
		if (arguments.length < 2) {
			while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
			return;
		}
		if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
		while (++i < n) if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
		else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
		return this;
	},
	copy: function() {
		var copy = {}, _ = this._;
		for (var t in _) copy[t] = _[t].slice();
		return new Dispatch(copy);
	},
	call: function(type, that) {
		if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
		if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
		for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	},
	apply: function(type, that, args) {
		if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
		for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	}
};
function get$1(type, name) {
	for (var i = 0, n = type.length, c; i < n; ++i) if ((c = type[i]).name === name) return c.value;
}
function set$1(type, name, callback) {
	for (var i = 0, n = type.length; i < n; ++i) if (type[i].name === name) {
		type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
		break;
	}
	if (callback != null) type.push({
		name,
		value: callback
	});
	return type;
}
//#endregion
//#region node_modules/d3-drag/src/noevent.js
var nonpassive = { passive: false };
var nonpassivecapture = {
	capture: true,
	passive: false
};
function nopropagation$2(event) {
	event.stopImmediatePropagation();
}
function noevent_default$2(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
}
//#endregion
//#region node_modules/d3-drag/src/nodrag.js
function nodrag_default(view) {
	var root = view.document.documentElement, selection = select_default(view).on("dragstart.drag", noevent_default$2, nonpassivecapture);
	if ("onselectstart" in root) selection.on("selectstart.drag", noevent_default$2, nonpassivecapture);
	else {
		root.__noselect = root.style.MozUserSelect;
		root.style.MozUserSelect = "none";
	}
}
function yesdrag(view, noclick) {
	var root = view.document.documentElement, selection = select_default(view).on("dragstart.drag", null);
	if (noclick) {
		selection.on("click.drag", noevent_default$2, nonpassivecapture);
		setTimeout(function() {
			selection.on("click.drag", null);
		}, 0);
	}
	if ("onselectstart" in root) selection.on("selectstart.drag", null);
	else {
		root.style.MozUserSelect = root.__noselect;
		delete root.__noselect;
	}
}
//#endregion
//#region node_modules/d3-drag/src/constant.js
var constant_default$6 = (x) => () => x;
//#endregion
//#region node_modules/d3-drag/src/event.js
function DragEvent(type, { sourceEvent, subject, target, identifier, active, x, y, dx, dy, dispatch }) {
	Object.defineProperties(this, {
		type: {
			value: type,
			enumerable: true,
			configurable: true
		},
		sourceEvent: {
			value: sourceEvent,
			enumerable: true,
			configurable: true
		},
		subject: {
			value: subject,
			enumerable: true,
			configurable: true
		},
		target: {
			value: target,
			enumerable: true,
			configurable: true
		},
		identifier: {
			value: identifier,
			enumerable: true,
			configurable: true
		},
		active: {
			value: active,
			enumerable: true,
			configurable: true
		},
		x: {
			value: x,
			enumerable: true,
			configurable: true
		},
		y: {
			value: y,
			enumerable: true,
			configurable: true
		},
		dx: {
			value: dx,
			enumerable: true,
			configurable: true
		},
		dy: {
			value: dy,
			enumerable: true,
			configurable: true
		},
		_: { value: dispatch }
	});
}
DragEvent.prototype.on = function() {
	var value = this._.on.apply(this._, arguments);
	return value === this._ ? this : value;
};
//#endregion
//#region node_modules/d3-drag/src/drag.js
function defaultFilter$2(event) {
	return !event.ctrlKey && !event.button;
}
function defaultContainer() {
	return this.parentNode;
}
function defaultSubject(event, d) {
	return d == null ? {
		x: event.x,
		y: event.y
	} : d;
}
function defaultTouchable$2() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function drag_default() {
	var filter = defaultFilter$2, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable$2, gestures = {}, listeners = dispatch("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
	function drag(selection) {
		selection.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved, nonpassive).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function mousedowned(event, d) {
		if (touchending || !filter.call(this, event, d)) return;
		var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
		if (!gesture) return;
		select_default(event.view).on("mousemove.drag", mousemoved, nonpassivecapture).on("mouseup.drag", mouseupped, nonpassivecapture);
		nodrag_default(event.view);
		nopropagation$2(event);
		mousemoving = false;
		mousedownx = event.clientX;
		mousedowny = event.clientY;
		gesture("start", event);
	}
	function mousemoved(event) {
		noevent_default$2(event);
		if (!mousemoving) {
			var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
			mousemoving = dx * dx + dy * dy > clickDistance2;
		}
		gestures.mouse("drag", event);
	}
	function mouseupped(event) {
		select_default(event.view).on("mousemove.drag mouseup.drag", null);
		yesdrag(event.view, mousemoving);
		noevent_default$2(event);
		gestures.mouse("end", event);
	}
	function touchstarted(event, d) {
		if (!filter.call(this, event, d)) return;
		var touches = event.changedTouches, c = container.call(this, event, d), n = touches.length, i, gesture;
		for (i = 0; i < n; ++i) if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
			nopropagation$2(event);
			gesture("start", event, touches[i]);
		}
	}
	function touchmoved(event) {
		var touches = event.changedTouches, n = touches.length, i, gesture;
		for (i = 0; i < n; ++i) if (gesture = gestures[touches[i].identifier]) {
			noevent_default$2(event);
			gesture("drag", event, touches[i]);
		}
	}
	function touchended(event) {
		var touches = event.changedTouches, n = touches.length, i, gesture;
		if (touchending) clearTimeout(touchending);
		touchending = setTimeout(function() {
			touchending = null;
		}, 500);
		for (i = 0; i < n; ++i) if (gesture = gestures[touches[i].identifier]) {
			nopropagation$2(event);
			gesture("end", event, touches[i]);
		}
	}
	function beforestart(that, container, event, d, identifier, touch) {
		var dispatch = listeners.copy(), p = pointer_default(touch || event, container), dx, dy, s;
		if ((s = subject.call(that, new DragEvent("beforestart", {
			sourceEvent: event,
			target: drag,
			identifier,
			active,
			x: p[0],
			y: p[1],
			dx: 0,
			dy: 0,
			dispatch
		}), d)) == null) return;
		dx = s.x - p[0] || 0;
		dy = s.y - p[1] || 0;
		return function gesture(type, event, touch) {
			var p0 = p, n;
			switch (type) {
				case "start":
					gestures[identifier] = gesture, n = active++;
					break;
				case "end": delete gestures[identifier], --active;
				case "drag":
					p = pointer_default(touch || event, container), n = active;
					break;
			}
			dispatch.call(type, that, new DragEvent(type, {
				sourceEvent: event,
				subject: s,
				target: drag,
				identifier,
				active: n,
				x: p[0] + dx,
				y: p[1] + dy,
				dx: p[0] - p0[0],
				dy: p[1] - p0[1],
				dispatch
			}), d);
		};
	}
	drag.filter = function(_) {
		return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default$6(!!_), drag) : filter;
	};
	drag.container = function(_) {
		return arguments.length ? (container = typeof _ === "function" ? _ : constant_default$6(_), drag) : container;
	};
	drag.subject = function(_) {
		return arguments.length ? (subject = typeof _ === "function" ? _ : constant_default$6(_), drag) : subject;
	};
	drag.touchable = function(_) {
		return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default$6(!!_), drag) : touchable;
	};
	drag.on = function() {
		var value = listeners.on.apply(listeners, arguments);
		return value === listeners ? drag : value;
	};
	drag.clickDistance = function(_) {
		return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
	};
	return drag;
}
//#endregion
//#region node_modules/d3-timer/src/timer.js
var frame = 0, timeout = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
	setTimeout(f, 17);
};
function now() {
	return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
	clockNow = 0;
}
function Timer() {
	this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
	constructor: Timer,
	restart: function(callback, delay, time) {
		if (typeof callback !== "function") throw new TypeError("callback is not a function");
		time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
		if (!this._next && taskTail !== this) {
			if (taskTail) taskTail._next = this;
			else taskHead = this;
			taskTail = this;
		}
		this._call = callback;
		this._time = time;
		sleep();
	},
	stop: function() {
		if (this._call) {
			this._call = null;
			this._time = Infinity;
			sleep();
		}
	}
};
function timer(callback, delay, time) {
	var t = new Timer();
	t.restart(callback, delay, time);
	return t;
}
function timerFlush() {
	now();
	++frame;
	var t = taskHead, e;
	while (t) {
		if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
		t = t._next;
	}
	--frame;
}
function wake() {
	clockNow = (clockLast = clock.now()) + clockSkew;
	frame = timeout = 0;
	try {
		timerFlush();
	} finally {
		frame = 0;
		nap();
		clockNow = 0;
	}
}
function poke() {
	var now = clock.now(), delay = now - clockLast;
	if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}
function nap() {
	var t0, t1 = taskHead, t2, time = Infinity;
	while (t1) if (t1._call) {
		if (time > t1._time) time = t1._time;
		t0 = t1, t1 = t1._next;
	} else {
		t2 = t1._next, t1._next = null;
		t1 = t0 ? t0._next = t2 : taskHead = t2;
	}
	taskTail = t0;
	sleep(time);
}
function sleep(time) {
	if (frame) return;
	if (timeout) timeout = clearTimeout(timeout);
	if (time - clockNow > 24) {
		if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
		if (interval) interval = clearInterval(interval);
	} else {
		if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
		frame = 1, setFrame(wake);
	}
}
//#endregion
//#region node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
	var t = new Timer();
	delay = delay == null ? 0 : +delay;
	t.restart((elapsed) => {
		t.stop();
		callback(elapsed + delay);
	}, delay, time);
	return t;
}
//#endregion
//#region node_modules/d3-timer/src/interval.js
function interval_default(callback, delay, time) {
	var t = new Timer(), total = delay;
	if (delay == null) return t.restart(callback, delay, time), t;
	t._restart = t.restart;
	t.restart = function(callback, delay, time) {
		delay = +delay, time = time == null ? now() : +time;
		t._restart(function tick(elapsed) {
			elapsed += total;
			t._restart(tick, total += delay, time);
			callback(elapsed);
		}, delay, time);
	};
	t.restart(callback, delay, time);
	return t;
}
//#endregion
//#region node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];
function schedule_default(node, name, id, index, group, timing) {
	var schedules = node.__transition;
	if (!schedules) node.__transition = {};
	else if (id in schedules) return;
	create(node, id, {
		name,
		index,
		group,
		on: emptyOn,
		tween: emptyTween,
		time: timing.time,
		delay: timing.delay,
		duration: timing.duration,
		ease: timing.ease,
		timer: null,
		state: 0
	});
}
function init(node, id) {
	var schedule = get(node, id);
	if (schedule.state > 0) throw new Error("too late; already scheduled");
	return schedule;
}
function set(node, id) {
	var schedule = get(node, id);
	if (schedule.state > 3) throw new Error("too late; already running");
	return schedule;
}
function get(node, id) {
	var schedule = node.__transition;
	if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
	return schedule;
}
function create(node, id, self) {
	var schedules = node.__transition, tween;
	schedules[id] = self;
	self.timer = timer(schedule, 0, self.time);
	function schedule(elapsed) {
		self.state = 1;
		self.timer.restart(start, self.delay, self.time);
		if (self.delay <= elapsed) start(elapsed - self.delay);
	}
	function start(elapsed) {
		var i, j, n, o;
		if (self.state !== 1) return stop();
		for (i in schedules) {
			o = schedules[i];
			if (o.name !== self.name) continue;
			if (o.state === 3) return timeout_default(start);
			if (o.state === 4) {
				o.state = 6;
				o.timer.stop();
				o.on.call("interrupt", node, node.__data__, o.index, o.group);
				delete schedules[i];
			} else if (+i < id) {
				o.state = 6;
				o.timer.stop();
				o.on.call("cancel", node, node.__data__, o.index, o.group);
				delete schedules[i];
			}
		}
		timeout_default(function() {
			if (self.state === 3) {
				self.state = 4;
				self.timer.restart(tick, self.delay, self.time);
				tick(elapsed);
			}
		});
		self.state = 2;
		self.on.call("start", node, node.__data__, self.index, self.group);
		if (self.state !== 2) return;
		self.state = 3;
		tween = new Array(n = self.tween.length);
		for (i = 0, j = -1; i < n; ++i) if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) tween[++j] = o;
		tween.length = j + 1;
	}
	function tick(elapsed) {
		var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = 5, 1), i = -1, n = tween.length;
		while (++i < n) tween[i].call(node, t);
		if (self.state === 5) {
			self.on.call("end", node, node.__data__, self.index, self.group);
			stop();
		}
	}
	function stop() {
		self.state = 6;
		self.timer.stop();
		delete schedules[id];
		for (var i in schedules) return;
		delete node.__transition;
	}
}
//#endregion
//#region node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
	var schedules = node.__transition, schedule, active, empty = true, i;
	if (!schedules) return;
	name = name == null ? null : name + "";
	for (i in schedules) {
		if ((schedule = schedules[i]).name !== name) {
			empty = false;
			continue;
		}
		active = schedule.state > 2 && schedule.state < 5;
		schedule.state = 6;
		schedule.timer.stop();
		schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
		delete schedules[i];
	}
	if (empty) delete node.__transition;
}
//#endregion
//#region node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default$1(name) {
	return this.each(function() {
		interrupt_default(this, name);
	});
}
//#endregion
//#region node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id, name) {
	var tween0, tween1;
	return function() {
		var schedule = set(this, id), tween = schedule.tween;
		if (tween !== tween0) {
			tween1 = tween0 = tween;
			for (var i = 0, n = tween1.length; i < n; ++i) if (tween1[i].name === name) {
				tween1 = tween1.slice();
				tween1.splice(i, 1);
				break;
			}
		}
		schedule.tween = tween1;
	};
}
function tweenFunction(id, name, value) {
	var tween0, tween1;
	if (typeof value !== "function") throw new Error();
	return function() {
		var schedule = set(this, id), tween = schedule.tween;
		if (tween !== tween0) {
			tween1 = (tween0 = tween).slice();
			for (var t = {
				name,
				value
			}, i = 0, n = tween1.length; i < n; ++i) if (tween1[i].name === name) {
				tween1[i] = t;
				break;
			}
			if (i === n) tween1.push(t);
		}
		schedule.tween = tween1;
	};
}
function tween_default(name, value) {
	var id = this._id;
	name += "";
	if (arguments.length < 2) {
		var tween = get(this.node(), id).tween;
		for (var i = 0, n = tween.length, t; i < n; ++i) if ((t = tween[i]).name === name) return t.value;
		return null;
	}
	return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}
function tweenValue(transition, name, value) {
	var id = transition._id;
	transition.each(function() {
		var schedule = set(this, id);
		(schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	});
	return function(node) {
		return get(node, id).value[name];
	};
}
//#endregion
//#region node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default$1(a, b) {
	var c;
	return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}
//#endregion
//#region node_modules/d3-transition/src/transition/attr.js
function attrRemove(name) {
	return function() {
		this.removeAttribute(name);
	};
}
function attrRemoveNS(fullname) {
	return function() {
		this.removeAttributeNS(fullname.space, fullname.local);
	};
}
function attrConstant(name, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = this.getAttribute(name);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function attrConstantNS(fullname, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = this.getAttributeNS(fullname.space, fullname.local);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function attrFunction(name, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0, value1 = value(this), string1;
		if (value1 == null) return void this.removeAttribute(name);
		string0 = this.getAttribute(name);
		string1 = value1 + "";
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function attrFunctionNS(fullname, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0, value1 = value(this), string1;
		if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
		string0 = this.getAttributeNS(fullname.space, fullname.local);
		string1 = value1 + "";
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function attr_default(name, value) {
	var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default$1;
	return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}
//#endregion
//#region node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
	return function(t) {
		this.setAttribute(name, i.call(this, t));
	};
}
function attrInterpolateNS(fullname, i) {
	return function(t) {
		this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
	};
}
function attrTweenNS(fullname, value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function attrTween(name, value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function attrTween_default(name, value) {
	var key = "attr." + name;
	if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	var fullname = namespace_default(name);
	return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
//#endregion
//#region node_modules/d3-transition/src/transition/delay.js
function delayFunction(id, value) {
	return function() {
		init(this, id).delay = +value.apply(this, arguments);
	};
}
function delayConstant(id, value) {
	return value = +value, function() {
		init(this, id).delay = value;
	};
}
function delay_default(value) {
	var id = this._id;
	return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : get(this.node(), id).delay;
}
//#endregion
//#region node_modules/d3-transition/src/transition/duration.js
function durationFunction(id, value) {
	return function() {
		set(this, id).duration = +value.apply(this, arguments);
	};
}
function durationConstant(id, value) {
	return value = +value, function() {
		set(this, id).duration = value;
	};
}
function duration_default(value) {
	var id = this._id;
	return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : get(this.node(), id).duration;
}
//#endregion
//#region node_modules/d3-transition/src/transition/ease.js
function easeConstant(id, value) {
	if (typeof value !== "function") throw new Error();
	return function() {
		set(this, id).ease = value;
	};
}
function ease_default(value) {
	var id = this._id;
	return arguments.length ? this.each(easeConstant(id, value)) : get(this.node(), id).ease;
}
//#endregion
//#region node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (typeof v !== "function") throw new Error();
		set(this, id).ease = v;
	};
}
function easeVarying_default(value) {
	if (typeof value !== "function") throw new Error();
	return this.each(easeVarying(this._id, value));
}
//#endregion
//#region node_modules/d3-transition/src/transition/filter.js
function filter_default(match) {
	if (typeof match !== "function") match = matcher_default(match);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
	return new Transition(subgroups, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/merge.js
function merge_default(transition) {
	if (transition._id !== this._id) throw new Error();
	for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group0[i] || group1[i]) merge[i] = node;
	for (; j < m0; ++j) merges[j] = groups0[j];
	return new Transition(merges, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/on.js
function start(name) {
	return (name + "").trim().split(/^|\s+/).every(function(t) {
		var i = t.indexOf(".");
		if (i >= 0) t = t.slice(0, i);
		return !t || t === "start";
	});
}
function onFunction(id, name, listener) {
	var on0, on1, sit = start(name) ? init : set;
	return function() {
		var schedule = sit(this, id), on = schedule.on;
		if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
		schedule.on = on1;
	};
}
function on_default(name, listener) {
	var id = this._id;
	return arguments.length < 2 ? get(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
}
//#endregion
//#region node_modules/d3-transition/src/transition/remove.js
function removeFunction(id) {
	return function() {
		var parent = this.parentNode;
		for (var i in this.__transition) if (+i !== id) return;
		if (parent) parent.removeChild(this);
	};
}
function remove_default$1() {
	return this.on("end.remove", removeFunction(this._id));
}
//#endregion
//#region node_modules/d3-transition/src/transition/select.js
function select_default$1(select) {
	var name = this._name, id = this._id;
	if (typeof select !== "function") select = selector_default(select);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
		if ("__data__" in node) subnode.__data__ = node.__data__;
		subgroup[i] = subnode;
		schedule_default(subgroup[i], name, id, i, subgroup, get(node, id));
	}
	return new Transition(subgroups, this._parents, name, id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default$1(select) {
	var name = this._name, id = this._id;
	if (typeof select !== "function") select = selectorAll_default(select);
	for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
		for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) if (child = children[k]) schedule_default(child, name, id, k, children, inherit);
		subgroups.push(children);
		parents.push(node);
	}
	return new Transition(subgroups, parents, name, id);
}
//#endregion
//#region node_modules/d3-transition/src/transition/selection.js
var Selection = selection.prototype.constructor;
function selection_default() {
	return new Selection(this._groups, this._parents);
}
//#endregion
//#region node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
	var string00, string10, interpolate0;
	return function() {
		var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
	};
}
function styleRemove(name) {
	return function() {
		this.style.removeProperty(name);
	};
}
function styleConstant(name, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = styleValue(this, name);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function styleFunction(name, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
		if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function styleMaybeRemove(id, name) {
	var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
	return function() {
		var schedule = set(this, id), on = schedule.on, listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : void 0;
		if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
		schedule.on = on1;
	};
}
function style_default(name, value, priority) {
	var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default$1;
	return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}
//#endregion
//#region node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
	return function(t) {
		this.style.setProperty(name, i.call(this, t), priority);
	};
}
function styleTween(name, value, priority) {
	var t, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
		return t;
	}
	tween._value = value;
	return tween;
}
function styleTween_default(name, value, priority) {
	var key = "style." + (name += "");
	if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
//#endregion
//#region node_modules/d3-transition/src/transition/text.js
function textConstant(value) {
	return function() {
		this.textContent = value;
	};
}
function textFunction(value) {
	return function() {
		var value1 = value(this);
		this.textContent = value1 == null ? "" : value1;
	};
}
function text_default$1(value) {
	return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
//#endregion
//#region node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
	return function(t) {
		this.textContent = i.call(this, t);
	};
}
function textTween(value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function textTween_default(value) {
	var key = "text";
	if (arguments.length < 1) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	return this.tween(key, textTween(value));
}
//#endregion
//#region node_modules/d3-transition/src/transition/transition.js
function transition_default$1() {
	var name = this._name, id0 = this._id, id1 = newId();
	for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
		var inherit = get(node, id0);
		schedule_default(node, name, id1, i, group, {
			time: inherit.time + inherit.delay + inherit.duration,
			delay: 0,
			duration: inherit.duration,
			ease: inherit.ease
		});
	}
	return new Transition(groups, this._parents, name, id1);
}
//#endregion
//#region node_modules/d3-transition/src/transition/end.js
function end_default() {
	var on0, on1, that = this, id = that._id, size = that.size();
	return new Promise(function(resolve, reject) {
		var cancel = { value: reject }, end = { value: function() {
			if (--size === 0) resolve();
		} };
		that.each(function() {
			var schedule = set(this, id), on = schedule.on;
			if (on !== on0) {
				on1 = (on0 = on).copy();
				on1._.cancel.push(cancel);
				on1._.interrupt.push(cancel);
				on1._.end.push(end);
			}
			schedule.on = on1;
		});
		if (size === 0) resolve();
	});
}
//#endregion
//#region node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups, parents, name, id) {
	this._groups = groups;
	this._parents = parents;
	this._name = name;
	this._id = id;
}
function transition(name) {
	return selection().transition(name);
}
function newId() {
	return ++id;
}
var selection_prototype = selection.prototype;
Transition.prototype = transition.prototype = {
	constructor: Transition,
	select: select_default$1,
	selectAll: selectAll_default$1,
	selectChild: selection_prototype.selectChild,
	selectChildren: selection_prototype.selectChildren,
	filter: filter_default,
	merge: merge_default,
	selection: selection_default,
	transition: transition_default$1,
	call: selection_prototype.call,
	nodes: selection_prototype.nodes,
	node: selection_prototype.node,
	size: selection_prototype.size,
	empty: selection_prototype.empty,
	each: selection_prototype.each,
	on: on_default,
	attr: attr_default,
	attrTween: attrTween_default,
	style: style_default,
	styleTween: styleTween_default,
	text: text_default$1,
	textTween: textTween_default,
	remove: remove_default$1,
	tween: tween_default,
	delay: delay_default,
	duration: duration_default,
	ease: ease_default,
	easeVarying: easeVarying_default,
	end: end_default,
	[Symbol.iterator]: selection_prototype[Symbol.iterator]
};
//#endregion
//#region node_modules/d3-ease/src/linear.js
var linear = (t) => +t;
//#endregion
//#region node_modules/d3-ease/src/quad.js
function quadIn(t) {
	return t * t;
}
function quadOut(t) {
	return t * (2 - t);
}
function quadInOut(t) {
	return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
//#endregion
//#region node_modules/d3-ease/src/cubic.js
function cubicIn(t) {
	return t * t * t;
}
function cubicOut(t) {
	return --t * t * t + 1;
}
function cubicInOut(t) {
	return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
//#endregion
//#region node_modules/d3-ease/src/poly.js
var exponent = 3;
var polyIn = (function custom(e) {
	e = +e;
	function polyIn(t) {
		return Math.pow(t, e);
	}
	polyIn.exponent = custom;
	return polyIn;
})(exponent);
var polyOut = (function custom(e) {
	e = +e;
	function polyOut(t) {
		return 1 - Math.pow(1 - t, e);
	}
	polyOut.exponent = custom;
	return polyOut;
})(exponent);
var polyInOut = (function custom(e) {
	e = +e;
	function polyInOut(t) {
		return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
	}
	polyInOut.exponent = custom;
	return polyInOut;
})(exponent);
//#endregion
//#region node_modules/d3-ease/src/sin.js
var pi$1 = Math.PI, halfPi$1 = pi$1 / 2;
function sinIn(t) {
	return +t === 1 ? 1 : 1 - Math.cos(t * halfPi$1);
}
function sinOut(t) {
	return Math.sin(t * halfPi$1);
}
function sinInOut(t) {
	return (1 - Math.cos(pi$1 * t)) / 2;
}
//#endregion
//#region node_modules/d3-ease/src/math.js
function tpmt(x) {
	return (Math.pow(2, -10 * x) - .0009765625) * 1.0009775171065494;
}
//#endregion
//#region node_modules/d3-ease/src/exp.js
function expIn(t) {
	return tpmt(1 - +t);
}
function expOut(t) {
	return 1 - tpmt(t);
}
function expInOut(t) {
	return ((t *= 2) <= 1 ? tpmt(1 - t) : 2 - tpmt(t - 1)) / 2;
}
//#endregion
//#region node_modules/d3-ease/src/circle.js
function circleIn(t) {
	return 1 - Math.sqrt(1 - t * t);
}
function circleOut(t) {
	return Math.sqrt(1 - --t * t);
}
function circleInOut(t) {
	return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
//#endregion
//#region node_modules/d3-ease/src/bounce.js
var b1 = 4 / 11, b2 = 6 / 11, b3 = 8 / 11, b4 = 3 / 4, b5 = 9 / 11, b6 = 10 / 11, b7 = 15 / 16, b8 = 21 / 22, b9 = 63 / 64, b0 = 1 / b1 / b1;
function bounceIn(t) {
	return 1 - bounceOut(1 - t);
}
function bounceOut(t) {
	return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}
function bounceInOut(t) {
	return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}
//#endregion
//#region node_modules/d3-ease/src/back.js
var overshoot = 1.70158;
var backIn = (function custom(s) {
	s = +s;
	function backIn(t) {
		return (t = +t) * t * (s * (t - 1) + t);
	}
	backIn.overshoot = custom;
	return backIn;
})(overshoot);
var backOut = (function custom(s) {
	s = +s;
	function backOut(t) {
		return --t * t * ((t + 1) * s + t) + 1;
	}
	backOut.overshoot = custom;
	return backOut;
})(overshoot);
var backInOut = (function custom(s) {
	s = +s;
	function backInOut(t) {
		return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
	}
	backInOut.overshoot = custom;
	return backInOut;
})(overshoot);
//#endregion
//#region node_modules/d3-ease/src/elastic.js
var tau$1 = 2 * Math.PI, amplitude = 1, period = .3;
var elasticIn = (function custom(a, p) {
	var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau$1);
	function elasticIn(t) {
		return a * tpmt(- --t) * Math.sin((s - t) / p);
	}
	elasticIn.amplitude = function(a) {
		return custom(a, p * tau$1);
	};
	elasticIn.period = function(p) {
		return custom(a, p);
	};
	return elasticIn;
})(amplitude, period);
var elasticOut = (function custom(a, p) {
	var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau$1);
	function elasticOut(t) {
		return 1 - a * tpmt(t = +t) * Math.sin((t + s) / p);
	}
	elasticOut.amplitude = function(a) {
		return custom(a, p * tau$1);
	};
	elasticOut.period = function(p) {
		return custom(a, p);
	};
	return elasticOut;
})(amplitude, period);
var elasticInOut = (function custom(a, p) {
	var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau$1);
	function elasticInOut(t) {
		return ((t = t * 2 - 1) < 0 ? a * tpmt(-t) * Math.sin((s - t) / p) : 2 - a * tpmt(t) * Math.sin((s + t) / p)) / 2;
	}
	elasticInOut.amplitude = function(a) {
		return custom(a, p * tau$1);
	};
	elasticInOut.period = function(p) {
		return custom(a, p);
	};
	return elasticInOut;
})(amplitude, period);
//#endregion
//#region node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
	time: null,
	delay: 0,
	duration: 250,
	ease: cubicInOut
};
function inherit(node, id) {
	var timing;
	while (!(timing = node.__transition) || !(timing = timing[id])) if (!(node = node.parentNode)) throw new Error(`transition ${id} not found`);
	return timing;
}
function transition_default(name) {
	var id, timing;
	if (name instanceof Transition) id = name._id, name = name._name;
	else id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
	for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) schedule_default(node, name, id, i, group, timing || inherit(node, id));
	return new Transition(groups, this._parents, name, id);
}
//#endregion
//#region node_modules/d3-transition/src/selection/index.js
selection.prototype.interrupt = interrupt_default$1;
selection.prototype.transition = transition_default;
//#endregion
//#region node_modules/d3-transition/src/active.js
var root = [null];
function active_default(node, name) {
	var schedules = node.__transition, schedule, i;
	if (schedules) {
		name = name == null ? null : name + "";
		for (i in schedules) if ((schedule = schedules[i]).state > 1 && schedule.name === name) return new Transition([[node]], root, name, +i);
	}
	return null;
}
//#endregion
//#region node_modules/d3-brush/src/constant.js
var constant_default$5 = (x) => () => x;
//#endregion
//#region node_modules/d3-brush/src/event.js
function BrushEvent(type, { sourceEvent, target, selection, mode, dispatch }) {
	Object.defineProperties(this, {
		type: {
			value: type,
			enumerable: true,
			configurable: true
		},
		sourceEvent: {
			value: sourceEvent,
			enumerable: true,
			configurable: true
		},
		target: {
			value: target,
			enumerable: true,
			configurable: true
		},
		selection: {
			value: selection,
			enumerable: true,
			configurable: true
		},
		mode: {
			value: mode,
			enumerable: true,
			configurable: true
		},
		_: { value: dispatch }
	});
}
//#endregion
//#region node_modules/d3-brush/src/noevent.js
function nopropagation$1(event) {
	event.stopImmediatePropagation();
}
function noevent_default$1(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
}
//#endregion
//#region node_modules/d3-brush/src/brush.js
var MODE_DRAG = { name: "drag" }, MODE_SPACE = { name: "space" }, MODE_HANDLE = { name: "handle" }, MODE_CENTER = { name: "center" };
var { abs: abs$1, max: max$2, min: min$1 } = Math;
function number1(e) {
	return [+e[0], +e[1]];
}
function number2(e) {
	return [number1(e[0]), number1(e[1])];
}
var X = {
	name: "x",
	handles: ["w", "e"].map(type),
	input: function(x, e) {
		return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]];
	},
	output: function(xy) {
		return xy && [xy[0][0], xy[1][0]];
	}
};
var Y = {
	name: "y",
	handles: ["n", "s"].map(type),
	input: function(y, e) {
		return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]];
	},
	output: function(xy) {
		return xy && [xy[0][1], xy[1][1]];
	}
};
var XY = {
	name: "xy",
	handles: [
		"n",
		"w",
		"e",
		"s",
		"nw",
		"ne",
		"sw",
		"se"
	].map(type),
	input: function(xy) {
		return xy == null ? null : number2(xy);
	},
	output: function(xy) {
		return xy;
	}
};
var cursors = {
	overlay: "crosshair",
	selection: "move",
	n: "ns-resize",
	e: "ew-resize",
	s: "ns-resize",
	w: "ew-resize",
	nw: "nwse-resize",
	ne: "nesw-resize",
	se: "nwse-resize",
	sw: "nesw-resize"
};
var flipX = {
	e: "w",
	w: "e",
	nw: "ne",
	ne: "nw",
	se: "sw",
	sw: "se"
};
var flipY = {
	n: "s",
	s: "n",
	nw: "sw",
	ne: "se",
	se: "ne",
	sw: "nw"
};
var signsX = {
	overlay: 1,
	selection: 1,
	n: null,
	e: 1,
	s: null,
	w: -1,
	nw: -1,
	ne: 1,
	se: 1,
	sw: -1
};
var signsY = {
	overlay: 1,
	selection: 1,
	n: -1,
	e: null,
	s: 1,
	w: null,
	nw: -1,
	ne: -1,
	se: 1,
	sw: 1
};
function type(t) {
	return { type: t };
}
function defaultFilter$1(event) {
	return !event.ctrlKey && !event.button;
}
function defaultExtent$1() {
	var svg = this.ownerSVGElement || this;
	if (svg.hasAttribute("viewBox")) {
		svg = svg.viewBox.baseVal;
		return [[svg.x, svg.y], [svg.x + svg.width, svg.y + svg.height]];
	}
	return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
}
function defaultTouchable$1() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function local$1(node) {
	while (!node.__brush) if (!(node = node.parentNode)) return;
	return node.__brush;
}
function empty(extent) {
	return extent[0][0] === extent[1][0] || extent[0][1] === extent[1][1];
}
function brushSelection(node) {
	var state = node.__brush;
	return state ? state.dim.output(state.selection) : null;
}
function brushX() {
	return brush(X);
}
function brushY() {
	return brush(Y);
}
function brush_default() {
	return brush(XY);
}
function brush(dim) {
	var extent = defaultExtent$1, filter = defaultFilter$1, touchable = defaultTouchable$1, keys = true, listeners = dispatch("start", "brush", "end"), handleSize = 6, touchending;
	function brush(group) {
		var overlay = group.property("__brush", initialize).selectAll(".overlay").data([type("overlay")]);
		overlay.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", cursors.overlay).merge(overlay).each(function() {
			var extent = local$1(this).extent;
			select_default(this).attr("x", extent[0][0]).attr("y", extent[0][1]).attr("width", extent[1][0] - extent[0][0]).attr("height", extent[1][1] - extent[0][1]);
		});
		group.selectAll(".selection").data([type("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", cursors.selection).attr("fill", "#777").attr("fill-opacity", .3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
		var handle = group.selectAll(".handle").data(dim.handles, function(d) {
			return d.type;
		});
		handle.exit().remove();
		handle.enter().append("rect").attr("class", function(d) {
			return "handle handle--" + d.type;
		}).attr("cursor", function(d) {
			return cursors[d.type];
		});
		group.each(redraw).attr("fill", "none").attr("pointer-events", "all").on("mousedown.brush", started).filter(touchable).on("touchstart.brush", started).on("touchmove.brush", touchmoved).on("touchend.brush touchcancel.brush", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	brush.move = function(group, selection, event) {
		if (group.tween) group.on("start.brush", function(event) {
			emitter(this, arguments).beforestart().start(event);
		}).on("interrupt.brush end.brush", function(event) {
			emitter(this, arguments).end(event);
		}).tween("brush", function() {
			var that = this, state = that.__brush, emit = emitter(that, arguments), selection0 = state.selection, selection1 = dim.input(typeof selection === "function" ? selection.apply(this, arguments) : selection, state.extent), i = value_default(selection0, selection1);
			function tween(t) {
				state.selection = t === 1 && selection1 === null ? null : i(t);
				redraw.call(that);
				emit.brush();
			}
			return selection0 !== null && selection1 !== null ? tween : tween(1);
		});
		else group.each(function() {
			var that = this, args = arguments, state = that.__brush, selection1 = dim.input(typeof selection === "function" ? selection.apply(that, args) : selection, state.extent), emit = emitter(that, args).beforestart();
			interrupt_default(that);
			state.selection = selection1 === null ? null : selection1;
			redraw.call(that);
			emit.start(event).brush(event).end(event);
		});
	};
	brush.clear = function(group, event) {
		brush.move(group, null, event);
	};
	function redraw() {
		var group = select_default(this), selection = local$1(this).selection;
		if (selection) {
			group.selectAll(".selection").style("display", null).attr("x", selection[0][0]).attr("y", selection[0][1]).attr("width", selection[1][0] - selection[0][0]).attr("height", selection[1][1] - selection[0][1]);
			group.selectAll(".handle").style("display", null).attr("x", function(d) {
				return d.type[d.type.length - 1] === "e" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2;
			}).attr("y", function(d) {
				return d.type[0] === "s" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2;
			}).attr("width", function(d) {
				return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + handleSize : handleSize;
			}).attr("height", function(d) {
				return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + handleSize : handleSize;
			});
		} else group.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null);
	}
	function emitter(that, args, clean) {
		var emit = that.__brush.emitter;
		return emit && (!clean || !emit.clean) ? emit : new Emitter(that, args, clean);
	}
	function Emitter(that, args, clean) {
		this.that = that;
		this.args = args;
		this.state = that.__brush;
		this.active = 0;
		this.clean = clean;
	}
	Emitter.prototype = {
		beforestart: function() {
			if (++this.active === 1) this.state.emitter = this, this.starting = true;
			return this;
		},
		start: function(event, mode) {
			if (this.starting) this.starting = false, this.emit("start", event, mode);
			else this.emit("brush", event);
			return this;
		},
		brush: function(event, mode) {
			this.emit("brush", event, mode);
			return this;
		},
		end: function(event, mode) {
			if (--this.active === 0) delete this.state.emitter, this.emit("end", event, mode);
			return this;
		},
		emit: function(type, event, mode) {
			var d = select_default(this.that).datum();
			listeners.call(type, this.that, new BrushEvent(type, {
				sourceEvent: event,
				target: brush,
				selection: dim.output(this.state.selection),
				mode,
				dispatch: listeners
			}), d);
		}
	};
	function started(event) {
		if (touchending && !event.touches) return;
		if (!filter.apply(this, arguments)) return;
		var that = this, type = event.target.__data__.type, mode = (keys && event.metaKey ? type = "overlay" : type) === "selection" ? MODE_DRAG : keys && event.altKey ? MODE_CENTER : MODE_HANDLE, signX = dim === Y ? null : signsX[type], signY = dim === X ? null : signsY[type], state = local$1(that), extent = state.extent, selection = state.selection, W = extent[0][0], w0, w1, N = extent[0][1], n0, n1, E = extent[1][0], e0, e1, S = extent[1][1], s0, s1, dx = 0, dy = 0, moving, shifting = signX && signY && keys && event.shiftKey, lockX, lockY, points = Array.from(event.touches || [event], (t) => {
			const i = t.identifier;
			t = pointer_default(t, that);
			t.point0 = t.slice();
			t.identifier = i;
			return t;
		});
		interrupt_default(that);
		var emit = emitter(that, arguments, true).beforestart();
		if (type === "overlay") {
			if (selection) moving = true;
			const pts = [points[0], points[1] || points[0]];
			state.selection = selection = [[w0 = dim === Y ? W : min$1(pts[0][0], pts[1][0]), n0 = dim === X ? N : min$1(pts[0][1], pts[1][1])], [e0 = dim === Y ? E : max$2(pts[0][0], pts[1][0]), s0 = dim === X ? S : max$2(pts[0][1], pts[1][1])]];
			if (points.length > 1) move(event);
		} else {
			w0 = selection[0][0];
			n0 = selection[0][1];
			e0 = selection[1][0];
			s0 = selection[1][1];
		}
		w1 = w0;
		n1 = n0;
		e1 = e0;
		s1 = s0;
		var group = select_default(that).attr("pointer-events", "none");
		var overlay = group.selectAll(".overlay").attr("cursor", cursors[type]);
		if (event.touches) {
			emit.moved = moved;
			emit.ended = ended;
		} else {
			var view = select_default(event.view).on("mousemove.brush", moved, true).on("mouseup.brush", ended, true);
			if (keys) view.on("keydown.brush", keydowned, true).on("keyup.brush", keyupped, true);
			nodrag_default(event.view);
		}
		redraw.call(that);
		emit.start(event, mode.name);
		function moved(event) {
			for (const p of event.changedTouches || [event]) for (const d of points) if (d.identifier === p.identifier) d.cur = pointer_default(p, that);
			if (shifting && !lockX && !lockY && points.length === 1) {
				const point = points[0];
				if (abs$1(point.cur[0] - point[0]) > abs$1(point.cur[1] - point[1])) lockY = true;
				else lockX = true;
			}
			for (const point of points) if (point.cur) point[0] = point.cur[0], point[1] = point.cur[1];
			moving = true;
			noevent_default$1(event);
			move(event);
		}
		function move(event) {
			const point = points[0], point0 = point.point0;
			var t;
			dx = point[0] - point0[0];
			dy = point[1] - point0[1];
			switch (mode) {
				case MODE_SPACE:
				case MODE_DRAG:
					if (signX) dx = max$2(W - w0, min$1(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
					if (signY) dy = max$2(N - n0, min$1(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
					break;
				case MODE_HANDLE:
					if (points[1]) {
						if (signX) w1 = max$2(W, min$1(E, points[0][0])), e1 = max$2(W, min$1(E, points[1][0])), signX = 1;
						if (signY) n1 = max$2(N, min$1(S, points[0][1])), s1 = max$2(N, min$1(S, points[1][1])), signY = 1;
					} else {
						if (signX < 0) dx = max$2(W - w0, min$1(E - w0, dx)), w1 = w0 + dx, e1 = e0;
						else if (signX > 0) dx = max$2(W - e0, min$1(E - e0, dx)), w1 = w0, e1 = e0 + dx;
						if (signY < 0) dy = max$2(N - n0, min$1(S - n0, dy)), n1 = n0 + dy, s1 = s0;
						else if (signY > 0) dy = max$2(N - s0, min$1(S - s0, dy)), n1 = n0, s1 = s0 + dy;
					}
					break;
				case MODE_CENTER:
					if (signX) w1 = max$2(W, min$1(E, w0 - dx * signX)), e1 = max$2(W, min$1(E, e0 + dx * signX));
					if (signY) n1 = max$2(N, min$1(S, n0 - dy * signY)), s1 = max$2(N, min$1(S, s0 + dy * signY));
					break;
			}
			if (e1 < w1) {
				signX *= -1;
				t = w0, w0 = e0, e0 = t;
				t = w1, w1 = e1, e1 = t;
				if (type in flipX) overlay.attr("cursor", cursors[type = flipX[type]]);
			}
			if (s1 < n1) {
				signY *= -1;
				t = n0, n0 = s0, s0 = t;
				t = n1, n1 = s1, s1 = t;
				if (type in flipY) overlay.attr("cursor", cursors[type = flipY[type]]);
			}
			if (state.selection) selection = state.selection;
			if (lockX) w1 = selection[0][0], e1 = selection[1][0];
			if (lockY) n1 = selection[0][1], s1 = selection[1][1];
			if (selection[0][0] !== w1 || selection[0][1] !== n1 || selection[1][0] !== e1 || selection[1][1] !== s1) {
				state.selection = [[w1, n1], [e1, s1]];
				redraw.call(that);
				emit.brush(event, mode.name);
			}
		}
		function ended(event) {
			nopropagation$1(event);
			if (event.touches) {
				if (event.touches.length) return;
				if (touchending) clearTimeout(touchending);
				touchending = setTimeout(function() {
					touchending = null;
				}, 500);
			} else {
				yesdrag(event.view, moving);
				view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
			}
			group.attr("pointer-events", "all");
			overlay.attr("cursor", cursors.overlay);
			if (state.selection) selection = state.selection;
			if (empty(selection)) state.selection = null, redraw.call(that);
			emit.end(event, mode.name);
		}
		function keydowned(event) {
			switch (event.keyCode) {
				case 16:
					shifting = signX && signY;
					break;
				case 18:
					if (mode === MODE_HANDLE) {
						if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
						if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
						mode = MODE_CENTER;
						move(event);
					}
					break;
				case 32:
					if (mode === MODE_HANDLE || mode === MODE_CENTER) {
						if (signX < 0) e0 = e1 - dx;
						else if (signX > 0) w0 = w1 - dx;
						if (signY < 0) s0 = s1 - dy;
						else if (signY > 0) n0 = n1 - dy;
						mode = MODE_SPACE;
						overlay.attr("cursor", cursors.selection);
						move(event);
					}
					break;
				default: return;
			}
			noevent_default$1(event);
		}
		function keyupped(event) {
			switch (event.keyCode) {
				case 16:
					if (shifting) {
						lockX = lockY = shifting = false;
						move(event);
					}
					break;
				case 18:
					if (mode === MODE_CENTER) {
						if (signX < 0) e0 = e1;
						else if (signX > 0) w0 = w1;
						if (signY < 0) s0 = s1;
						else if (signY > 0) n0 = n1;
						mode = MODE_HANDLE;
						move(event);
					}
					break;
				case 32:
					if (mode === MODE_SPACE) {
						if (event.altKey) {
							if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
							if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
							mode = MODE_CENTER;
						} else {
							if (signX < 0) e0 = e1;
							else if (signX > 0) w0 = w1;
							if (signY < 0) s0 = s1;
							else if (signY > 0) n0 = n1;
							mode = MODE_HANDLE;
						}
						overlay.attr("cursor", cursors[type]);
						move(event);
					}
					break;
				default: return;
			}
			noevent_default$1(event);
		}
	}
	function touchmoved(event) {
		emitter(this, arguments).moved(event);
	}
	function touchended(event) {
		emitter(this, arguments).ended(event);
	}
	function initialize() {
		var state = this.__brush || { selection: null };
		state.extent = number2(extent.apply(this, arguments));
		state.dim = dim;
		return state;
	}
	brush.extent = function(_) {
		return arguments.length ? (extent = typeof _ === "function" ? _ : constant_default$5(number2(_)), brush) : extent;
	};
	brush.filter = function(_) {
		return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default$5(!!_), brush) : filter;
	};
	brush.touchable = function(_) {
		return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default$5(!!_), brush) : touchable;
	};
	brush.handleSize = function(_) {
		return arguments.length ? (handleSize = +_, brush) : handleSize;
	};
	brush.keyModifiers = function(_) {
		return arguments.length ? (keys = !!_, brush) : keys;
	};
	brush.on = function() {
		var value = listeners.on.apply(listeners, arguments);
		return value === listeners ? brush : value;
	};
	return brush;
}
//#endregion
//#region node_modules/d3-chord/src/math.js
var abs = Math.abs;
var cos = Math.cos;
var sin = Math.sin;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = pi * 2;
var max$1 = Math.max;
//#endregion
//#region node_modules/d3-chord/src/chord.js
function range$1(i, j) {
	return Array.from({ length: j - i }, (_, k) => i + k);
}
function compareValue(compare) {
	return function(a, b) {
		return compare(a.source.value + a.target.value, b.source.value + b.target.value);
	};
}
function chord_default() {
	return chord(false, false);
}
function chordTranspose() {
	return chord(false, true);
}
function chordDirected() {
	return chord(true, false);
}
function chord(directed, transpose) {
	var padAngle = 0, sortGroups = null, sortSubgroups = null, sortChords = null;
	function chord(matrix) {
		var n = matrix.length, groupSums = new Array(n), groupIndex = range$1(0, n), chords = new Array(n * n), groups = new Array(n), k = 0, dx;
		matrix = Float64Array.from({ length: n * n }, transpose ? (_, i) => matrix[i % n][i / n | 0] : (_, i) => matrix[i / n | 0][i % n]);
		for (let i = 0; i < n; ++i) {
			let x = 0;
			for (let j = 0; j < n; ++j) x += matrix[i * n + j] + directed * matrix[j * n + i];
			k += groupSums[i] = x;
		}
		k = max$1(0, tau - padAngle * n) / k;
		dx = k ? padAngle : tau / n;
		{
			let x = 0;
			if (sortGroups) groupIndex.sort((a, b) => sortGroups(groupSums[a], groupSums[b]));
			for (const i of groupIndex) {
				const x0 = x;
				if (directed) {
					const subgroupIndex = range$1(~n + 1, n).filter((j) => j < 0 ? matrix[~j * n + i] : matrix[i * n + j]);
					if (sortSubgroups) subgroupIndex.sort((a, b) => sortSubgroups(a < 0 ? -matrix[~a * n + i] : matrix[i * n + a], b < 0 ? -matrix[~b * n + i] : matrix[i * n + b]));
					for (const j of subgroupIndex) if (j < 0) {
						const chord = chords[~j * n + i] || (chords[~j * n + i] = {
							source: null,
							target: null
						});
						chord.target = {
							index: i,
							startAngle: x,
							endAngle: x += matrix[~j * n + i] * k,
							value: matrix[~j * n + i]
						};
					} else {
						const chord = chords[i * n + j] || (chords[i * n + j] = {
							source: null,
							target: null
						});
						chord.source = {
							index: i,
							startAngle: x,
							endAngle: x += matrix[i * n + j] * k,
							value: matrix[i * n + j]
						};
					}
					groups[i] = {
						index: i,
						startAngle: x0,
						endAngle: x,
						value: groupSums[i]
					};
				} else {
					const subgroupIndex = range$1(0, n).filter((j) => matrix[i * n + j] || matrix[j * n + i]);
					if (sortSubgroups) subgroupIndex.sort((a, b) => sortSubgroups(matrix[i * n + a], matrix[i * n + b]));
					for (const j of subgroupIndex) {
						let chord;
						if (i < j) {
							chord = chords[i * n + j] || (chords[i * n + j] = {
								source: null,
								target: null
							});
							chord.source = {
								index: i,
								startAngle: x,
								endAngle: x += matrix[i * n + j] * k,
								value: matrix[i * n + j]
							};
						} else {
							chord = chords[j * n + i] || (chords[j * n + i] = {
								source: null,
								target: null
							});
							chord.target = {
								index: i,
								startAngle: x,
								endAngle: x += matrix[i * n + j] * k,
								value: matrix[i * n + j]
							};
							if (i === j) chord.source = chord.target;
						}
						if (chord.source && chord.target && chord.source.value < chord.target.value) {
							const source = chord.source;
							chord.source = chord.target;
							chord.target = source;
						}
					}
					groups[i] = {
						index: i,
						startAngle: x0,
						endAngle: x,
						value: groupSums[i]
					};
				}
				x += dx;
			}
		}
		chords = Object.values(chords);
		chords.groups = groups;
		return sortChords ? chords.sort(sortChords) : chords;
	}
	chord.padAngle = function(_) {
		return arguments.length ? (padAngle = max$1(0, _), chord) : padAngle;
	};
	chord.sortGroups = function(_) {
		return arguments.length ? (sortGroups = _, chord) : sortGroups;
	};
	chord.sortSubgroups = function(_) {
		return arguments.length ? (sortSubgroups = _, chord) : sortSubgroups;
	};
	chord.sortChords = function(_) {
		return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, chord) : sortChords && sortChords._;
	};
	return chord;
}
//#endregion
//#region node_modules/d3-chord/src/array.js
var slice$1 = Array.prototype.slice;
//#endregion
//#region node_modules/d3-chord/src/constant.js
function constant_default$4(x) {
	return function() {
		return x;
	};
}
//#endregion
//#region node_modules/d3-chord/src/ribbon.js
function defaultSource(d) {
	return d.source;
}
function defaultTarget(d) {
	return d.target;
}
function defaultRadius$1(d) {
	return d.radius;
}
function defaultStartAngle(d) {
	return d.startAngle;
}
function defaultEndAngle(d) {
	return d.endAngle;
}
function defaultPadAngle() {
	return 0;
}
function defaultArrowheadRadius() {
	return 10;
}
function ribbon(headRadius) {
	var source = defaultSource, target = defaultTarget, sourceRadius = defaultRadius$1, targetRadius = defaultRadius$1, startAngle = defaultStartAngle, endAngle = defaultEndAngle, padAngle = defaultPadAngle, context = null;
	function ribbon() {
		var buffer, s = source.apply(this, arguments), t = target.apply(this, arguments), ap = padAngle.apply(this, arguments) / 2, argv = slice$1.call(arguments), sr = +sourceRadius.apply(this, (argv[0] = s, argv)), sa0 = startAngle.apply(this, argv) - halfPi, sa1 = endAngle.apply(this, argv) - halfPi, tr = +targetRadius.apply(this, (argv[0] = t, argv)), ta0 = startAngle.apply(this, argv) - halfPi, ta1 = endAngle.apply(this, argv) - halfPi;
		if (!context) context = buffer = path();
		if (ap > 1e-12) {
			if (abs(sa1 - sa0) > ap * 2 + 1e-12) sa1 > sa0 ? (sa0 += ap, sa1 -= ap) : (sa0 -= ap, sa1 += ap);
			else sa0 = sa1 = (sa0 + sa1) / 2;
			if (abs(ta1 - ta0) > ap * 2 + 1e-12) ta1 > ta0 ? (ta0 += ap, ta1 -= ap) : (ta0 -= ap, ta1 += ap);
			else ta0 = ta1 = (ta0 + ta1) / 2;
		}
		context.moveTo(sr * cos(sa0), sr * sin(sa0));
		context.arc(0, 0, sr, sa0, sa1);
		if (sa0 !== ta0 || sa1 !== ta1) if (headRadius) {
			var tr2 = tr - +headRadius.apply(this, arguments), ta2 = (ta0 + ta1) / 2;
			context.quadraticCurveTo(0, 0, tr2 * cos(ta0), tr2 * sin(ta0));
			context.lineTo(tr * cos(ta2), tr * sin(ta2));
			context.lineTo(tr2 * cos(ta1), tr2 * sin(ta1));
		} else {
			context.quadraticCurveTo(0, 0, tr * cos(ta0), tr * sin(ta0));
			context.arc(0, 0, tr, ta0, ta1);
		}
		context.quadraticCurveTo(0, 0, sr * cos(sa0), sr * sin(sa0));
		context.closePath();
		if (buffer) return context = null, buffer + "" || null;
	}
	if (headRadius) ribbon.headRadius = function(_) {
		return arguments.length ? (headRadius = typeof _ === "function" ? _ : constant_default$4(+_), ribbon) : headRadius;
	};
	ribbon.radius = function(_) {
		return arguments.length ? (sourceRadius = targetRadius = typeof _ === "function" ? _ : constant_default$4(+_), ribbon) : sourceRadius;
	};
	ribbon.sourceRadius = function(_) {
		return arguments.length ? (sourceRadius = typeof _ === "function" ? _ : constant_default$4(+_), ribbon) : sourceRadius;
	};
	ribbon.targetRadius = function(_) {
		return arguments.length ? (targetRadius = typeof _ === "function" ? _ : constant_default$4(+_), ribbon) : targetRadius;
	};
	ribbon.startAngle = function(_) {
		return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default$4(+_), ribbon) : startAngle;
	};
	ribbon.endAngle = function(_) {
		return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default$4(+_), ribbon) : endAngle;
	};
	ribbon.padAngle = function(_) {
		return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant_default$4(+_), ribbon) : padAngle;
	};
	ribbon.source = function(_) {
		return arguments.length ? (source = _, ribbon) : source;
	};
	ribbon.target = function(_) {
		return arguments.length ? (target = _, ribbon) : target;
	};
	ribbon.context = function(_) {
		return arguments.length ? (context = _ == null ? null : _, ribbon) : context;
	};
	return ribbon;
}
function ribbon_default() {
	return ribbon();
}
function ribbonArrow() {
	return ribbon(defaultArrowheadRadius);
}
var slice = Array.prototype.slice;
//#endregion
//#region node_modules/d3-contour/src/ascending.js
function ascending_default$1(a, b) {
	return a - b;
}
//#endregion
//#region node_modules/d3-contour/src/area.js
function area_default$3(ring) {
	var i = 0, n = ring.length, area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
	while (++i < n) area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
	return area;
}
//#endregion
//#region node_modules/d3-contour/src/constant.js
var constant_default$3 = (x) => () => x;
//#endregion
//#region node_modules/d3-contour/src/contains.js
function contains_default$2(ring, hole) {
	var i = -1, n = hole.length, c;
	while (++i < n) if (c = ringContains(ring, hole[i])) return c;
	return 0;
}
function ringContains(ring, point) {
	var x = point[0], y = point[1], contains = -1;
	for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
		var pi = ring[i], xi = pi[0], yi = pi[1], pj = ring[j], xj = pj[0], yj = pj[1];
		if (segmentContains(pi, pj, point)) return 0;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) contains = -contains;
	}
	return contains;
}
function segmentContains(a, b, c) {
	var i;
	return collinear(a, b, c) && within(a[i = +(a[0] === b[0])], c[i], b[i]);
}
function collinear(a, b, c) {
	return (b[0] - a[0]) * (c[1] - a[1]) === (c[0] - a[0]) * (b[1] - a[1]);
}
function within(p, q, r) {
	return p <= q && q <= r || r <= q && q <= p;
}
//#endregion
//#region node_modules/d3-contour/src/noop.js
function noop_default() {}
//#endregion
//#region node_modules/d3-contour/src/contours.js
var cases = [
	[],
	[[[1, 1.5], [.5, 1]]],
	[[[1.5, 1], [1, 1.5]]],
	[[[1.5, 1], [.5, 1]]],
	[[[1, .5], [1.5, 1]]],
	[[[1, 1.5], [.5, 1]], [[1, .5], [1.5, 1]]],
	[[[1, .5], [1, 1.5]]],
	[[[1, .5], [.5, 1]]],
	[[[.5, 1], [1, .5]]],
	[[[1, 1.5], [1, .5]]],
	[[[.5, 1], [1, .5]], [[1.5, 1], [1, 1.5]]],
	[[[1.5, 1], [1, .5]]],
	[[[.5, 1], [1.5, 1]]],
	[[[1, 1.5], [1.5, 1]]],
	[[[.5, 1], [1, 1.5]]],
	[]
];
function contours_default() {
	var dx = 1, dy = 1, threshold = thresholdSturges, smooth = smoothLinear;
	function contours(values) {
		var tz = threshold(values);
		if (!Array.isArray(tz)) {
			const e = extent(values, finite);
			tz = ticks(...nice(e[0], e[1], tz), tz);
			while (tz[tz.length - 1] >= e[1]) tz.pop();
			while (tz[1] < e[0]) tz.shift();
		} else tz = tz.slice().sort(ascending_default$1);
		return tz.map((value) => contour(values, value));
	}
	function contour(values, value) {
		const v = value == null ? NaN : +value;
		if (isNaN(v)) throw new Error(`invalid value: ${value}`);
		var polygons = [], holes = [];
		isorings(values, v, function(ring) {
			smooth(ring, values, v);
			if (area_default$3(ring) > 0) polygons.push([ring]);
			else holes.push(ring);
		});
		holes.forEach(function(hole) {
			for (var i = 0, n = polygons.length, polygon; i < n; ++i) if (contains_default$2((polygon = polygons[i])[0], hole) !== -1) {
				polygon.push(hole);
				return;
			}
		});
		return {
			type: "MultiPolygon",
			value,
			coordinates: polygons
		};
	}
	function isorings(values, value, callback) {
		var fragmentByStart = new Array(), fragmentByEnd = new Array(), x = y = -1, y, t0, t1 = above(values[0], value), t2, t3;
		cases[t1 << 1].forEach(stitch);
		while (++x < dx - 1) {
			t0 = t1, t1 = above(values[x + 1], value);
			cases[t0 | t1 << 1].forEach(stitch);
		}
		cases[t1 << 0].forEach(stitch);
		while (++y < dy - 1) {
			x = -1;
			t1 = above(values[y * dx + dx], value);
			t2 = above(values[y * dx], value);
			cases[t1 << 1 | t2 << 2].forEach(stitch);
			while (++x < dx - 1) {
				t0 = t1, t1 = above(values[y * dx + dx + x + 1], value);
				t3 = t2, t2 = above(values[y * dx + x + 1], value);
				cases[t0 | t1 << 1 | t2 << 2 | t3 << 3].forEach(stitch);
			}
			cases[t1 | t2 << 3].forEach(stitch);
		}
		x = -1;
		t2 = values[y * dx] >= value;
		cases[t2 << 2].forEach(stitch);
		while (++x < dx - 1) {
			t3 = t2, t2 = above(values[y * dx + x + 1], value);
			cases[t2 << 2 | t3 << 3].forEach(stitch);
		}
		cases[t2 << 3].forEach(stitch);
		function stitch(line) {
			var start = [line[0][0] + x, line[0][1] + y], end = [line[1][0] + x, line[1][1] + y], startIndex = index(start), endIndex = index(end), f, g;
			if (f = fragmentByEnd[startIndex]) if (g = fragmentByStart[endIndex]) {
				delete fragmentByEnd[f.end];
				delete fragmentByStart[g.start];
				if (f === g) {
					f.ring.push(end);
					callback(f.ring);
				} else fragmentByStart[f.start] = fragmentByEnd[g.end] = {
					start: f.start,
					end: g.end,
					ring: f.ring.concat(g.ring)
				};
			} else {
				delete fragmentByEnd[f.end];
				f.ring.push(end);
				fragmentByEnd[f.end = endIndex] = f;
			}
			else if (f = fragmentByStart[endIndex]) if (g = fragmentByEnd[startIndex]) {
				delete fragmentByStart[f.start];
				delete fragmentByEnd[g.end];
				if (f === g) {
					f.ring.push(end);
					callback(f.ring);
				} else fragmentByStart[g.start] = fragmentByEnd[f.end] = {
					start: g.start,
					end: f.end,
					ring: g.ring.concat(f.ring)
				};
			} else {
				delete fragmentByStart[f.start];
				f.ring.unshift(start);
				fragmentByStart[f.start = startIndex] = f;
			}
			else fragmentByStart[startIndex] = fragmentByEnd[endIndex] = {
				start: startIndex,
				end: endIndex,
				ring: [start, end]
			};
		}
	}
	function index(point) {
		return point[0] * 2 + point[1] * (dx + 1) * 4;
	}
	function smoothLinear(ring, values, value) {
		ring.forEach(function(point) {
			var x = point[0], y = point[1], xt = x | 0, yt = y | 0, v1 = valid(values[yt * dx + xt]);
			if (x > 0 && x < dx && xt === x) point[0] = smooth1(x, valid(values[yt * dx + xt - 1]), v1, value);
			if (y > 0 && y < dy && yt === y) point[1] = smooth1(y, valid(values[(yt - 1) * dx + xt]), v1, value);
		});
	}
	contours.contour = contour;
	contours.size = function(_) {
		if (!arguments.length) return [dx, dy];
		var _0 = Math.floor(_[0]), _1 = Math.floor(_[1]);
		if (!(_0 >= 0 && _1 >= 0)) throw new Error("invalid size");
		return dx = _0, dy = _1, contours;
	};
	contours.thresholds = function(_) {
		return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant_default$3(slice.call(_)) : constant_default$3(_), contours) : threshold;
	};
	contours.smooth = function(_) {
		return arguments.length ? (smooth = _ ? smoothLinear : noop_default, contours) : smooth === smoothLinear;
	};
	return contours;
}
function finite(x) {
	return isFinite(x) ? x : NaN;
}
function above(x, value) {
	return x == null ? false : +x >= value;
}
function valid(v) {
	return v == null || isNaN(v = +v) ? -Infinity : v;
}
function smooth1(x, v0, v1, value) {
	const a = value - v0;
	const b = v1 - v0;
	const d = isFinite(a) || isFinite(b) ? a / b : Math.sign(a) / Math.sign(b);
	return isNaN(d) ? x : x + d - .5;
}
//#endregion
//#region node_modules/d3-contour/src/density.js
function defaultX$1(d) {
	return d[0];
}
function defaultY$1(d) {
	return d[1];
}
function defaultWeight() {
	return 1;
}
function density_default() {
	var x = defaultX$1, y = defaultY$1, weight = defaultWeight, dx = 960, dy = 500, r = 20, k = 2, o = r * 3, n = dx + o * 2 >> k, m = dy + o * 2 >> k, threshold = constant_default$3(20);
	function grid(data) {
		var values = new Float32Array(n * m), pow2k = Math.pow(2, -k), i = -1;
		for (const d of data) {
			var xi = (x(d, ++i, data) + o) * pow2k, yi = (y(d, i, data) + o) * pow2k, wi = +weight(d, i, data);
			if (wi && xi >= 0 && xi < n && yi >= 0 && yi < m) {
				var x0 = Math.floor(xi), y0 = Math.floor(yi), xt = xi - x0 - .5, yt = yi - y0 - .5;
				values[x0 + y0 * n] += (1 - xt) * (1 - yt) * wi;
				values[x0 + 1 + y0 * n] += xt * (1 - yt) * wi;
				values[x0 + 1 + (y0 + 1) * n] += xt * yt * wi;
				values[x0 + (y0 + 1) * n] += (1 - xt) * yt * wi;
			}
		}
		blur2({
			data: values,
			width: n,
			height: m
		}, r * pow2k);
		return values;
	}
	function density(data) {
		var values = grid(data), tz = threshold(values), pow4k = Math.pow(2, 2 * k);
		if (!Array.isArray(tz)) tz = ticks(Number.MIN_VALUE, max(values) / pow4k, tz);
		return contours_default().size([n, m]).thresholds(tz.map((d) => d * pow4k))(values).map((c, i) => (c.value = +tz[i], transform(c)));
	}
	density.contours = function(data) {
		var values = grid(data), contours = contours_default().size([n, m]), pow4k = Math.pow(2, 2 * k), contour = (value) => {
			value = +value;
			var c = transform(contours.contour(values, value * pow4k));
			c.value = value;
			return c;
		};
		Object.defineProperty(contour, "max", { get: () => max(values) / pow4k });
		return contour;
	};
	function transform(geometry) {
		geometry.coordinates.forEach(transformPolygon);
		return geometry;
	}
	function transformPolygon(coordinates) {
		coordinates.forEach(transformRing);
	}
	function transformRing(coordinates) {
		coordinates.forEach(transformPoint);
	}
	function transformPoint(coordinates) {
		coordinates[0] = coordinates[0] * Math.pow(2, k) - o;
		coordinates[1] = coordinates[1] * Math.pow(2, k) - o;
	}
	function resize() {
		o = r * 3;
		n = dx + o * 2 >> k;
		m = dy + o * 2 >> k;
		return density;
	}
	density.x = function(_) {
		return arguments.length ? (x = typeof _ === "function" ? _ : constant_default$3(+_), density) : x;
	};
	density.y = function(_) {
		return arguments.length ? (y = typeof _ === "function" ? _ : constant_default$3(+_), density) : y;
	};
	density.weight = function(_) {
		return arguments.length ? (weight = typeof _ === "function" ? _ : constant_default$3(+_), density) : weight;
	};
	density.size = function(_) {
		if (!arguments.length) return [dx, dy];
		var _0 = +_[0], _1 = +_[1];
		if (!(_0 >= 0 && _1 >= 0)) throw new Error("invalid size");
		return dx = _0, dy = _1, resize();
	};
	density.cellSize = function(_) {
		if (!arguments.length) return 1 << k;
		if (!((_ = +_) >= 1)) throw new Error("invalid cell size");
		return k = Math.floor(Math.log(_) / Math.LN2), resize();
	};
	density.thresholds = function(_) {
		return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant_default$3(slice.call(_)) : constant_default$3(_), density) : threshold;
	};
	density.bandwidth = function(_) {
		if (!arguments.length) return Math.sqrt(r * (r + 1));
		if (!((_ = +_) >= 0)) throw new Error("invalid bandwidth");
		return r = (Math.sqrt(4 * _ * _ + 1) - 1) / 2, resize();
	};
	return density;
}
//#endregion
//#region node_modules/d3-dsv/src/dsv.js
var EOL = {}, EOF = {}, QUOTE = 34, NEWLINE = 10, RETURN = 13;
function objectConverter(columns) {
	return new Function("d", "return {" + columns.map(function(name, i) {
		return JSON.stringify(name) + ": d[" + i + "] || \"\"";
	}).join(",") + "}");
}
function customConverter(columns, f) {
	var object = objectConverter(columns);
	return function(row, i) {
		return f(object(row), i, columns);
	};
}
function inferColumns(rows) {
	var columnSet = Object.create(null), columns = [];
	rows.forEach(function(row) {
		for (var column in row) if (!(column in columnSet)) columns.push(columnSet[column] = column);
	});
	return columns;
}
function pad(value, width) {
	var s = value + "", length = s.length;
	return length < width ? new Array(width - length + 1).join(0) + s : s;
}
function formatYear(year) {
	return year < 0 ? "-" + pad(-year, 6) : year > 9999 ? "+" + pad(year, 6) : pad(year, 4);
}
function formatDate(date) {
	var hours = date.getUTCHours(), minutes = date.getUTCMinutes(), seconds = date.getUTCSeconds(), milliseconds = date.getUTCMilliseconds();
	return isNaN(date) ? "Invalid Date" : formatYear(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2) + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z" : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z" : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z" : "");
}
function dsv_default(delimiter) {
	var reFormat = new RegExp("[\"" + delimiter + "\n\r]"), DELIMITER = delimiter.charCodeAt(0);
	function parse(text, f) {
		var convert, columns, rows = parseRows(text, function(row, i) {
			if (convert) return convert(row, i - 1);
			columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
		});
		rows.columns = columns || [];
		return rows;
	}
	function parseRows(text, f) {
		var rows = [], N = text.length, I = 0, n = 0, t, eof = N <= 0, eol = false;
		if (text.charCodeAt(N - 1) === NEWLINE) --N;
		if (text.charCodeAt(N - 1) === RETURN) --N;
		function token() {
			if (eof) return EOF;
			if (eol) return eol = false, EOL;
			var i, j = I, c;
			if (text.charCodeAt(j) === QUOTE) {
				while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
				if ((i = I) >= N) eof = true;
				else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
				else if (c === RETURN) {
					eol = true;
					if (text.charCodeAt(I) === NEWLINE) ++I;
				}
				return text.slice(j + 1, i - 1).replace(/""/g, "\"");
			}
			while (I < N) {
				if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
				else if (c === RETURN) {
					eol = true;
					if (text.charCodeAt(I) === NEWLINE) ++I;
				} else if (c !== DELIMITER) continue;
				return text.slice(j, i);
			}
			return eof = true, text.slice(j, N);
		}
		while ((t = token()) !== EOF) {
			var row = [];
			while (t !== EOL && t !== EOF) row.push(t), t = token();
			if (f && (row = f(row, n++)) == null) continue;
			rows.push(row);
		}
		return rows;
	}
	function preformatBody(rows, columns) {
		return rows.map(function(row) {
			return columns.map(function(column) {
				return formatValue(row[column]);
			}).join(delimiter);
		});
	}
	function format(rows, columns) {
		if (columns == null) columns = inferColumns(rows);
		return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
	}
	function formatBody(rows, columns) {
		if (columns == null) columns = inferColumns(rows);
		return preformatBody(rows, columns).join("\n");
	}
	function formatRows(rows) {
		return rows.map(formatRow).join("\n");
	}
	function formatRow(row) {
		return row.map(formatValue).join(delimiter);
	}
	function formatValue(value) {
		return value == null ? "" : value instanceof Date ? formatDate(value) : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\"" : value;
	}
	return {
		parse,
		parseRows,
		format,
		formatBody,
		formatRows,
		formatRow,
		formatValue
	};
}
//#endregion
//#region node_modules/d3-dsv/src/csv.js
var csv$1 = dsv_default(",");
var csvParse = csv$1.parse;
var csvParseRows = csv$1.parseRows;
var csvFormat = csv$1.format;
var csvFormatBody = csv$1.formatBody;
var csvFormatRows = csv$1.formatRows;
var csvFormatRow = csv$1.formatRow;
var csvFormatValue = csv$1.formatValue;
//#endregion
//#region node_modules/d3-dsv/src/tsv.js
var tsv$1 = dsv_default("	");
var tsvParse = tsv$1.parse;
var tsvParseRows = tsv$1.parseRows;
var tsvFormat = tsv$1.format;
var tsvFormatBody = tsv$1.formatBody;
var tsvFormatRows = tsv$1.formatRows;
var tsvFormatRow = tsv$1.formatRow;
var tsvFormatValue = tsv$1.formatValue;
//#endregion
//#region node_modules/d3-dsv/src/autoType.js
function autoType(object) {
	for (var key in object) {
		var value = object[key].trim(), number, m;
		if (!value) value = null;
		else if (value === "true") value = true;
		else if (value === "false") value = false;
		else if (value === "NaN") value = NaN;
		else if (!isNaN(number = +value)) value = number;
		else if (m = value.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)) {
			if (fixtz && !!m[4] && !m[7]) value = value.replace(/-/g, "/").replace(/T/, " ");
			value = new Date(value);
		} else continue;
		object[key] = value;
	}
	return object;
}
var fixtz = (/* @__PURE__ */ new Date("2019-01-01T00:00")).getHours() || (/* @__PURE__ */ new Date("2019-07-01T00:00")).getHours();
//#endregion
//#region node_modules/d3-fetch/src/blob.js
function responseBlob(response) {
	if (!response.ok) throw new Error(response.status + " " + response.statusText);
	return response.blob();
}
function blob_default(input, init) {
	return fetch(input, init).then(responseBlob);
}
//#endregion
//#region node_modules/d3-fetch/src/buffer.js
function responseArrayBuffer(response) {
	if (!response.ok) throw new Error(response.status + " " + response.statusText);
	return response.arrayBuffer();
}
function buffer_default(input, init) {
	return fetch(input, init).then(responseArrayBuffer);
}
//#endregion
//#region node_modules/d3-fetch/src/text.js
function responseText(response) {
	if (!response.ok) throw new Error(response.status + " " + response.statusText);
	return response.text();
}
function text_default(input, init) {
	return fetch(input, init).then(responseText);
}
//#endregion
//#region node_modules/d3-fetch/src/dsv.js
function dsvParse(parse) {
	return function(input, init, row) {
		if (arguments.length === 2 && typeof init === "function") row = init, init = void 0;
		return text_default(input, init).then(function(response) {
			return parse(response, row);
		});
	};
}
function dsv(delimiter, input, init, row) {
	if (arguments.length === 3 && typeof init === "function") row = init, init = void 0;
	var format = dsv_default(delimiter);
	return text_default(input, init).then(function(response) {
		return format.parse(response, row);
	});
}
var csv = dsvParse(csvParse);
var tsv = dsvParse(tsvParse);
//#endregion
//#region node_modules/d3-fetch/src/image.js
function image_default(input, init) {
	return new Promise(function(resolve, reject) {
		var image = new Image();
		for (var key in init) image[key] = init[key];
		image.onerror = reject;
		image.onload = function() {
			resolve(image);
		};
		image.src = input;
	});
}
//#endregion
//#region node_modules/d3-fetch/src/json.js
function responseJson(response) {
	if (!response.ok) throw new Error(response.status + " " + response.statusText);
	if (response.status === 204 || response.status === 205) return;
	return response.json();
}
function json_default(input, init) {
	return fetch(input, init).then(responseJson);
}
//#endregion
//#region node_modules/d3-fetch/src/xml.js
function parser(type) {
	return (input, init) => text_default(input, init).then((text) => new DOMParser().parseFromString(text, type));
}
var xml_default = parser("application/xml");
var html = parser("text/html");
var svg = parser("image/svg+xml");
//#endregion
//#region node_modules/d3-force/src/center.js
function center_default(x, y) {
	var nodes, strength = 1;
	if (x == null) x = 0;
	if (y == null) y = 0;
	function force() {
		var i, n = nodes.length, node, sx = 0, sy = 0;
		for (i = 0; i < n; ++i) node = nodes[i], sx += node.x, sy += node.y;
		for (sx = (sx / n - x) * strength, sy = (sy / n - y) * strength, i = 0; i < n; ++i) node = nodes[i], node.x -= sx, node.y -= sy;
	}
	force.initialize = function(_) {
		nodes = _;
	};
	force.x = function(_) {
		return arguments.length ? (x = +_, force) : x;
	};
	force.y = function(_) {
		return arguments.length ? (y = +_, force) : y;
	};
	force.strength = function(_) {
		return arguments.length ? (strength = +_, force) : strength;
	};
	return force;
}
//#endregion
//#region node_modules/d3-quadtree/src/add.js
function add_default(d) {
	const x = +this._x.call(null, d), y = +this._y.call(null, d);
	return add(this.cover(x, y), x, y, d);
}
function add(tree, x, y, d) {
	if (isNaN(x) || isNaN(y)) return tree;
	var parent, node = tree._root, leaf = { data: d }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j;
	if (!node) return tree._root = leaf, tree;
	while (node.length) {
		if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
		if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;
		else y1 = ym;
		if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
	}
	xp = +tree._x.call(null, node.data);
	yp = +tree._y.call(null, node.data);
	if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
	do {
		parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
		if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
		if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;
		else y1 = ym;
	} while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
	return parent[j] = node, parent[i] = leaf, tree;
}
function addAll(data) {
	var d, i, n = data.length, x, y, xz = new Array(n), yz = new Array(n), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
	for (i = 0; i < n; ++i) {
		if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
		xz[i] = x;
		yz[i] = y;
		if (x < x0) x0 = x;
		if (x > x1) x1 = x;
		if (y < y0) y0 = y;
		if (y > y1) y1 = y;
	}
	if (x0 > x1 || y0 > y1) return this;
	this.cover(x0, y0).cover(x1, y1);
	for (i = 0; i < n; ++i) add(this, xz[i], yz[i], data[i]);
	return this;
}
//#endregion
//#region node_modules/d3-quadtree/src/cover.js
function cover_default(x, y) {
	if (isNaN(x = +x) || isNaN(y = +y)) return this;
	var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
	if (isNaN(x0)) {
		x1 = (x0 = Math.floor(x)) + 1;
		y1 = (y0 = Math.floor(y)) + 1;
	} else {
		var z = x1 - x0 || 1, node = this._root, parent, i;
		while (x0 > x || x >= x1 || y0 > y || y >= y1) {
			i = (y < y0) << 1 | x < x0;
			parent = new Array(4), parent[i] = node, node = parent, z *= 2;
			switch (i) {
				case 0:
					x1 = x0 + z, y1 = y0 + z;
					break;
				case 1:
					x0 = x1 - z, y1 = y0 + z;
					break;
				case 2:
					x1 = x0 + z, y0 = y1 - z;
					break;
				case 3:
					x0 = x1 - z, y0 = y1 - z;
					break;
			}
		}
		if (this._root && this._root.length) this._root = node;
	}
	this._x0 = x0;
	this._y0 = y0;
	this._x1 = x1;
	this._y1 = y1;
	return this;
}
//#endregion
//#region node_modules/d3-quadtree/src/data.js
function data_default() {
	var data = [];
	this.visit(function(node) {
		if (!node.length) do
			data.push(node.data);
		while (node = node.next);
	});
	return data;
}
//#endregion
//#region node_modules/d3-quadtree/src/extent.js
function extent_default$1(_) {
	return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
//#endregion
//#region node_modules/d3-quadtree/src/quad.js
function quad_default(node, x0, y0, x1, y1) {
	this.node = node;
	this.x0 = x0;
	this.y0 = y0;
	this.x1 = x1;
	this.y1 = y1;
}
//#endregion
//#region node_modules/d3-quadtree/src/find.js
function find_default$1(x, y, radius) {
	var data, x0 = this._x0, y0 = this._y0, x1, y1, x2, y2, x3 = this._x1, y3 = this._y1, quads = [], node = this._root, q, i;
	if (node) quads.push(new quad_default(node, x0, y0, x3, y3));
	if (radius == null) radius = Infinity;
	else {
		x0 = x - radius, y0 = y - radius;
		x3 = x + radius, y3 = y + radius;
		radius *= radius;
	}
	while (q = quads.pop()) {
		if (!(node = q.node) || (x1 = q.x0) > x3 || (y1 = q.y0) > y3 || (x2 = q.x1) < x0 || (y2 = q.y1) < y0) continue;
		if (node.length) {
			var xm = (x1 + x2) / 2, ym = (y1 + y2) / 2;
			quads.push(new quad_default(node[3], xm, ym, x2, y2), new quad_default(node[2], x1, ym, xm, y2), new quad_default(node[1], xm, y1, x2, ym), new quad_default(node[0], x1, y1, xm, ym));
			if (i = (y >= ym) << 1 | x >= xm) {
				q = quads[quads.length - 1];
				quads[quads.length - 1] = quads[quads.length - 1 - i];
				quads[quads.length - 1 - i] = q;
			}
		} else {
			var dx = x - +this._x.call(null, node.data), dy = y - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
			if (d2 < radius) {
				var d = Math.sqrt(radius = d2);
				x0 = x - d, y0 = y - d;
				x3 = x + d, y3 = y + d;
				data = node.data;
			}
		}
	}
	return data;
}
//#endregion
//#region node_modules/d3-quadtree/src/remove.js
function remove_default(d) {
	if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this;
	var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x, y, xm, ym, right, bottom, i, j;
	if (!node) return this;
	if (node.length) while (true) {
		if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
		if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;
		else y1 = ym;
		if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
		if (!node.length) break;
		if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3]) retainer = parent, j = i;
	}
	while (node.data !== d) if (!(previous = node, node = node.next)) return this;
	if (next = node.next) delete node.next;
	if (previous) return next ? previous.next = next : delete previous.next, this;
	if (!parent) return this._root = next, this;
	next ? parent[i] = next : delete parent[i];
	if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) if (retainer) retainer[j] = node;
	else this._root = node;
	return this;
}
function removeAll(data) {
	for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
	return this;
}
//#endregion
//#region node_modules/d3-quadtree/src/root.js
function root_default() {
	return this._root;
}
//#endregion
//#region node_modules/d3-quadtree/src/size.js
function size_default() {
	var size = 0;
	this.visit(function(node) {
		if (!node.length) do
			++size;
		while (node = node.next);
	});
	return size;
}
//#endregion
//#region node_modules/d3-quadtree/src/visit.js
function visit_default(callback) {
	var quads = [], q, node = this._root, child, x0, y0, x1, y1;
	if (node) quads.push(new quad_default(node, this._x0, this._y0, this._x1, this._y1));
	while (q = quads.pop()) if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
		var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
		if (child = node[3]) quads.push(new quad_default(child, xm, ym, x1, y1));
		if (child = node[2]) quads.push(new quad_default(child, x0, ym, xm, y1));
		if (child = node[1]) quads.push(new quad_default(child, xm, y0, x1, ym));
		if (child = node[0]) quads.push(new quad_default(child, x0, y0, xm, ym));
	}
	return this;
}
//#endregion
//#region node_modules/d3-quadtree/src/visitAfter.js
function visitAfter_default(callback) {
	var quads = [], next = [], q;
	if (this._root) quads.push(new quad_default(this._root, this._x0, this._y0, this._x1, this._y1));
	while (q = quads.pop()) {
		var node = q.node;
		if (node.length) {
			var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
			if (child = node[0]) quads.push(new quad_default(child, x0, y0, xm, ym));
			if (child = node[1]) quads.push(new quad_default(child, xm, y0, x1, ym));
			if (child = node[2]) quads.push(new quad_default(child, x0, ym, xm, y1));
			if (child = node[3]) quads.push(new quad_default(child, xm, ym, x1, y1));
		}
		next.push(q);
	}
	while (q = next.pop()) callback(q.node, q.x0, q.y0, q.x1, q.y1);
	return this;
}
//#endregion
//#region node_modules/d3-quadtree/src/x.js
function defaultX(d) {
	return d[0];
}
function x_default$1(_) {
	return arguments.length ? (this._x = _, this) : this._x;
}
//#endregion
//#region node_modules/d3-quadtree/src/y.js
function defaultY(d) {
	return d[1];
}
function y_default$1(_) {
	return arguments.length ? (this._y = _, this) : this._y;
}
//#endregion
//#region node_modules/d3-quadtree/src/quadtree.js
function quadtree(nodes, x, y) {
	var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
	return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x, y, x0, y0, x1, y1) {
	this._x = x;
	this._y = y;
	this._x0 = x0;
	this._y0 = y0;
	this._x1 = x1;
	this._y1 = y1;
	this._root = void 0;
}
function leaf_copy(leaf) {
	var copy = { data: leaf.data }, next = copy;
	while (leaf = leaf.next) next = next.next = { data: leaf.data };
	return copy;
}
var treeProto = quadtree.prototype = Quadtree.prototype;
treeProto.copy = function() {
	var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
	if (!node) return copy;
	if (!node.length) return copy._root = leaf_copy(node), copy;
	nodes = [{
		source: node,
		target: copy._root = new Array(4)
	}];
	while (node = nodes.pop()) for (var i = 0; i < 4; ++i) if (child = node.source[i]) if (child.length) nodes.push({
		source: child,
		target: node.target[i] = new Array(4)
	});
	else node.target[i] = leaf_copy(child);
	return copy;
};
treeProto.add = add_default;
treeProto.addAll = addAll;
treeProto.cover = cover_default;
treeProto.data = data_default;
treeProto.extent = extent_default$1;
treeProto.find = find_default$1;
treeProto.remove = remove_default;
treeProto.removeAll = removeAll;
treeProto.root = root_default;
treeProto.size = size_default;
treeProto.visit = visit_default;
treeProto.visitAfter = visitAfter_default;
treeProto.x = x_default$1;
treeProto.y = y_default$1;
//#endregion
//#region node_modules/d3-force/src/constant.js
function constant_default$2(x) {
	return function() {
		return x;
	};
}
//#endregion
//#region node_modules/d3-force/src/jiggle.js
function jiggle_default(random) {
	return (random() - .5) * 1e-6;
}
//#endregion
//#region node_modules/d3-force/src/collide.js
function x$1(d) {
	return d.x + d.vx;
}
function y$1(d) {
	return d.y + d.vy;
}
function collide_default(radius) {
	var nodes, radii, random, strength = 1, iterations = 1;
	if (typeof radius !== "function") radius = constant_default$2(radius == null ? 1 : +radius);
	function force() {
		var i, n = nodes.length, tree, node, xi, yi, ri, ri2;
		for (var k = 0; k < iterations; ++k) {
			tree = quadtree(nodes, x$1, y$1).visitAfter(prepare);
			for (i = 0; i < n; ++i) {
				node = nodes[i];
				ri = radii[node.index], ri2 = ri * ri;
				xi = node.x + node.vx;
				yi = node.y + node.vy;
				tree.visit(apply);
			}
		}
		function apply(quad, x0, y0, x1, y1) {
			var data = quad.data, rj = quad.r, r = ri + rj;
			if (data) {
				if (data.index > node.index) {
					var x = xi - data.x - data.vx, y = yi - data.y - data.vy, l = x * x + y * y;
					if (l < r * r) {
						if (x === 0) x = jiggle_default(random), l += x * x;
						if (y === 0) y = jiggle_default(random), l += y * y;
						l = (r - (l = Math.sqrt(l))) / l * strength;
						node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
						node.vy += (y *= l) * r;
						data.vx -= x * (r = 1 - r);
						data.vy -= y * r;
					}
				}
				return;
			}
			return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
		}
	}
	function prepare(quad) {
		if (quad.data) return quad.r = radii[quad.data.index];
		for (var i = quad.r = 0; i < 4; ++i) if (quad[i] && quad[i].r > quad.r) quad.r = quad[i].r;
	}
	function initialize() {
		if (!nodes) return;
		var i, n = nodes.length, node;
		radii = new Array(n);
		for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
	}
	force.initialize = function(_nodes, _random) {
		nodes = _nodes;
		random = _random;
		initialize();
	};
	force.iterations = function(_) {
		return arguments.length ? (iterations = +_, force) : iterations;
	};
	force.strength = function(_) {
		return arguments.length ? (strength = +_, force) : strength;
	};
	force.radius = function(_) {
		return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default$2(+_), initialize(), force) : radius;
	};
	return force;
}
//#endregion
//#region node_modules/d3-force/src/link.js
function index$1(d) {
	return d.index;
}
function find(nodeById, nodeId) {
	var node = nodeById.get(nodeId);
	if (!node) throw new Error("node not found: " + nodeId);
	return node;
}
function link_default(links) {
	var id = index$1, strength = defaultStrength, strengths, distance = constant_default$2(30), distances, nodes, count, bias, random, iterations = 1;
	if (links == null) links = [];
	function defaultStrength(link) {
		return 1 / Math.min(count[link.source.index], count[link.target.index]);
	}
	function force(alpha) {
		for (var k = 0, n = links.length; k < iterations; ++k) for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
			link = links[i], source = link.source, target = link.target;
			x = target.x + target.vx - source.x - source.vx || jiggle_default(random);
			y = target.y + target.vy - source.y - source.vy || jiggle_default(random);
			l = Math.sqrt(x * x + y * y);
			l = (l - distances[i]) / l * alpha * strengths[i];
			x *= l, y *= l;
			target.vx -= x * (b = bias[i]);
			target.vy -= y * b;
			source.vx += x * (b = 1 - b);
			source.vy += y * b;
		}
	}
	function initialize() {
		if (!nodes) return;
		var i, n = nodes.length, m = links.length, nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d])), link;
		for (i = 0, count = new Array(n); i < m; ++i) {
			link = links[i], link.index = i;
			if (typeof link.source !== "object") link.source = find(nodeById, link.source);
			if (typeof link.target !== "object") link.target = find(nodeById, link.target);
			count[link.source.index] = (count[link.source.index] || 0) + 1;
			count[link.target.index] = (count[link.target.index] || 0) + 1;
		}
		for (i = 0, bias = new Array(m); i < m; ++i) link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
		strengths = new Array(m), initializeStrength();
		distances = new Array(m), initializeDistance();
	}
	function initializeStrength() {
		if (!nodes) return;
		for (var i = 0, n = links.length; i < n; ++i) strengths[i] = +strength(links[i], i, links);
	}
	function initializeDistance() {
		if (!nodes) return;
		for (var i = 0, n = links.length; i < n; ++i) distances[i] = +distance(links[i], i, links);
	}
	force.initialize = function(_nodes, _random) {
		nodes = _nodes;
		random = _random;
		initialize();
	};
	force.links = function(_) {
		return arguments.length ? (links = _, initialize(), force) : links;
	};
	force.id = function(_) {
		return arguments.length ? (id = _, force) : id;
	};
	force.iterations = function(_) {
		return arguments.length ? (iterations = +_, force) : iterations;
	};
	force.strength = function(_) {
		return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default$2(+_), initializeStrength(), force) : strength;
	};
	force.distance = function(_) {
		return arguments.length ? (distance = typeof _ === "function" ? _ : constant_default$2(+_), initializeDistance(), force) : distance;
	};
	return force;
}
//#endregion
//#region node_modules/d3-force/src/lcg.js
var a$1 = 1664525;
var c$1 = 1013904223;
var m$1 = 4294967296;
function lcg_default$1() {
	let s = 1;
	return () => (s = (a$1 * s + c$1) % m$1) / m$1;
}
//#endregion
//#region node_modules/d3-force/src/simulation.js
function x(d) {
	return d.x;
}
function y(d) {
	return d.y;
}
var initialRadius = 10, initialAngle = Math.PI * (3 - Math.sqrt(5));
function simulation_default(nodes) {
	var simulation, alpha = 1, alphaMin = .001, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = .6, forces = /* @__PURE__ */ new Map(), stepper = timer(step), event = dispatch("tick", "end"), random = lcg_default$1();
	if (nodes == null) nodes = [];
	function step() {
		tick();
		event.call("tick", simulation);
		if (alpha < alphaMin) {
			stepper.stop();
			event.call("end", simulation);
		}
	}
	function tick(iterations) {
		var i, n = nodes.length, node;
		if (iterations === void 0) iterations = 1;
		for (var k = 0; k < iterations; ++k) {
			alpha += (alphaTarget - alpha) * alphaDecay;
			forces.forEach(function(force) {
				force(alpha);
			});
			for (i = 0; i < n; ++i) {
				node = nodes[i];
				if (node.fx == null) node.x += node.vx *= velocityDecay;
				else node.x = node.fx, node.vx = 0;
				if (node.fy == null) node.y += node.vy *= velocityDecay;
				else node.y = node.fy, node.vy = 0;
			}
		}
		return simulation;
	}
	function initializeNodes() {
		for (var i = 0, n = nodes.length, node; i < n; ++i) {
			node = nodes[i], node.index = i;
			if (node.fx != null) node.x = node.fx;
			if (node.fy != null) node.y = node.fy;
			if (isNaN(node.x) || isNaN(node.y)) {
				var radius = initialRadius * Math.sqrt(.5 + i), angle = i * initialAngle;
				node.x = radius * Math.cos(angle);
				node.y = radius * Math.sin(angle);
			}
			if (isNaN(node.vx) || isNaN(node.vy)) node.vx = node.vy = 0;
		}
	}
	function initializeForce(force) {
		if (force.initialize) force.initialize(nodes, random);
		return force;
	}
	initializeNodes();
	return simulation = {
		tick,
		restart: function() {
			return stepper.restart(step), simulation;
		},
		stop: function() {
			return stepper.stop(), simulation;
		},
		nodes: function(_) {
			return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
		},
		alpha: function(_) {
			return arguments.length ? (alpha = +_, simulation) : alpha;
		},
		alphaMin: function(_) {
			return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
		},
		alphaDecay: function(_) {
			return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
		},
		alphaTarget: function(_) {
			return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
		},
		velocityDecay: function(_) {
			return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
		},
		randomSource: function(_) {
			return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
		},
		force: function(name, _) {
			return arguments.length > 1 ? (_ == null ? forces.delete(name) : forces.set(name, initializeForce(_)), simulation) : forces.get(name);
		},
		find: function(x, y, radius) {
			var i = 0, n = nodes.length, dx, dy, d2, node, closest;
			if (radius == null) radius = Infinity;
			else radius *= radius;
			for (i = 0; i < n; ++i) {
				node = nodes[i];
				dx = x - node.x;
				dy = y - node.y;
				d2 = dx * dx + dy * dy;
				if (d2 < radius) closest = node, radius = d2;
			}
			return closest;
		},
		on: function(name, _) {
			return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
		}
	};
}
//#endregion
//#region node_modules/d3-force/src/manyBody.js
function manyBody_default() {
	var nodes, node, random, alpha, strength = constant_default$2(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = .81;
	function force(_) {
		var i, n = nodes.length, tree = quadtree(nodes, x, y).visitAfter(accumulate);
		for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
	}
	function initialize() {
		if (!nodes) return;
		var i, n = nodes.length, node;
		strengths = new Array(n);
		for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
	}
	function accumulate(quad) {
		var strength = 0, q, c, weight = 0, x, y, i;
		if (quad.length) {
			for (x = y = i = 0; i < 4; ++i) if ((q = quad[i]) && (c = Math.abs(q.value))) strength += q.value, weight += c, x += c * q.x, y += c * q.y;
			quad.x = x / weight;
			quad.y = y / weight;
		} else {
			q = quad;
			q.x = q.data.x;
			q.y = q.data.y;
			do
				strength += strengths[q.data.index];
			while (q = q.next);
		}
		quad.value = strength;
	}
	function apply(quad, x1, _, x2) {
		if (!quad.value) return true;
		var x = quad.x - node.x, y = quad.y - node.y, w = x2 - x1, l = x * x + y * y;
		if (w * w / theta2 < l) {
			if (l < distanceMax2) {
				if (x === 0) x = jiggle_default(random), l += x * x;
				if (y === 0) y = jiggle_default(random), l += y * y;
				if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
				node.vx += x * quad.value * alpha / l;
				node.vy += y * quad.value * alpha / l;
			}
			return true;
		} else if (quad.length || l >= distanceMax2) return;
		if (quad.data !== node || quad.next) {
			if (x === 0) x = jiggle_default(random), l += x * x;
			if (y === 0) y = jiggle_default(random), l += y * y;
			if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
		}
		do
			if (quad.data !== node) {
				w = strengths[quad.data.index] * alpha / l;
				node.vx += x * w;
				node.vy += y * w;
			}
		while (quad = quad.next);
	}
	force.initialize = function(_nodes, _random) {
		nodes = _nodes;
		random = _random;
		initialize();
	};
	force.strength = function(_) {
		return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default$2(+_), initialize(), force) : strength;
	};
	force.distanceMin = function(_) {
		return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
	};
	force.distanceMax = function(_) {
		return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
	};
	force.theta = function(_) {
		return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
	};
	return force;
}
//#endregion
//#region node_modules/d3-force/src/radial.js
function radial_default(radius, x, y) {
	var nodes, strength = constant_default$2(.1), strengths, radiuses;
	if (typeof radius !== "function") radius = constant_default$2(+radius);
	if (x == null) x = 0;
	if (y == null) y = 0;
	function force(alpha) {
		for (var i = 0, n = nodes.length; i < n; ++i) {
			var node = nodes[i], dx = node.x - x || 1e-6, dy = node.y - y || 1e-6, r = Math.sqrt(dx * dx + dy * dy), k = (radiuses[i] - r) * strengths[i] * alpha / r;
			node.vx += dx * k;
			node.vy += dy * k;
		}
	}
	function initialize() {
		if (!nodes) return;
		var i, n = nodes.length;
		strengths = new Array(n);
		radiuses = new Array(n);
		for (i = 0; i < n; ++i) {
			radiuses[i] = +radius(nodes[i], i, nodes);
			strengths[i] = isNaN(radiuses[i]) ? 0 : +strength(nodes[i], i, nodes);
		}
	}
	force.initialize = function(_) {
		nodes = _, initialize();
	};
	force.strength = function(_) {
		return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default$2(+_), initialize(), force) : strength;
	};
	force.radius = function(_) {
		return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default$2(+_), initialize(), force) : radius;
	};
	force.x = function(_) {
		return arguments.length ? (x = +_, force) : x;
	};
	force.y = function(_) {
		return arguments.length ? (y = +_, force) : y;
	};
	return force;
}
//#endregion
//#region node_modules/d3-force/src/x.js
function x_default(x) {
	var strength = constant_default$2(.1), nodes, strengths, xz;
	if (typeof x !== "function") x = constant_default$2(x == null ? 0 : +x);
	function force(alpha) {
		for (var i = 0, n = nodes.length, node; i < n; ++i) node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
	}
	function initialize() {
		if (!nodes) return;
		var i, n = nodes.length;
		strengths = new Array(n);
		xz = new Array(n);
		for (i = 0; i < n; ++i) strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
	}
	force.initialize = function(_) {
		nodes = _;
		initialize();
	};
	force.strength = function(_) {
		return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default$2(+_), initialize(), force) : strength;
	};
	force.x = function(_) {
		return arguments.length ? (x = typeof _ === "function" ? _ : constant_default$2(+_), initialize(), force) : x;
	};
	return force;
}
//#endregion
//#region node_modules/d3-force/src/y.js
function y_default(y) {
	var strength = constant_default$2(.1), nodes, strengths, yz;
	if (typeof y !== "function") y = constant_default$2(y == null ? 0 : +y);
	function force(alpha) {
		for (var i = 0, n = nodes.length, node; i < n; ++i) node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
	}
	function initialize() {
		if (!nodes) return;
		var i, n = nodes.length;
		strengths = new Array(n);
		yz = new Array(n);
		for (i = 0; i < n; ++i) strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
	}
	force.initialize = function(_) {
		nodes = _;
		initialize();
	};
	force.strength = function(_) {
		return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default$2(+_), initialize(), force) : strength;
	};
	force.y = function(_) {
		return arguments.length ? (y = typeof _ === "function" ? _ : constant_default$2(+_), initialize(), force) : y;
	};
	return force;
}
//#endregion
//#region node_modules/d3-hierarchy/src/cluster.js
function defaultSeparation$1(a, b) {
	return a.parent === b.parent ? 1 : 2;
}
function meanX(children) {
	return children.reduce(meanXReduce, 0) / children.length;
}
function meanXReduce(x, c) {
	return x + c.x;
}
function maxY(children) {
	return 1 + children.reduce(maxYReduce, 0);
}
function maxYReduce(y, c) {
	return Math.max(y, c.y);
}
function leafLeft(node) {
	var children;
	while (children = node.children) node = children[0];
	return node;
}
function leafRight(node) {
	var children;
	while (children = node.children) node = children[children.length - 1];
	return node;
}
function cluster_default() {
	var separation = defaultSeparation$1, dx = 1, dy = 1, nodeSize = false;
	function cluster(root) {
		var previousNode, x = 0;
		root.eachAfter(function(node) {
			var children = node.children;
			if (children) {
				node.x = meanX(children);
				node.y = maxY(children);
			} else {
				node.x = previousNode ? x += separation(node, previousNode) : 0;
				node.y = 0;
				previousNode = node;
			}
		});
		var left = leafLeft(root), right = leafRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
		return root.eachAfter(nodeSize ? function(node) {
			node.x = (node.x - root.x) * dx;
			node.y = (root.y - node.y) * dy;
		} : function(node) {
			node.x = (node.x - x0) / (x1 - x0) * dx;
			node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
		});
	}
	cluster.separation = function(x) {
		return arguments.length ? (separation = x, cluster) : separation;
	};
	cluster.size = function(x) {
		return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], cluster) : nodeSize ? null : [dx, dy];
	};
	cluster.nodeSize = function(x) {
		return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], cluster) : nodeSize ? [dx, dy] : null;
	};
	return cluster;
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/count.js
function count$1(node) {
	var sum = 0, children = node.children, i = children && children.length;
	if (!i) sum = 1;
	else while (--i >= 0) sum += children[i].value;
	node.value = sum;
}
function count_default() {
	return this.eachAfter(count$1);
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/each.js
function each_default(callback, that) {
	let index = -1;
	for (const node of this) callback.call(that, node, ++index, this);
	return this;
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/eachBefore.js
function eachBefore_default(callback, that) {
	var node = this, nodes = [node], children, i, index = -1;
	while (node = nodes.pop()) {
		callback.call(that, node, ++index, this);
		if (children = node.children) for (i = children.length - 1; i >= 0; --i) nodes.push(children[i]);
	}
	return this;
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/eachAfter.js
function eachAfter_default(callback, that) {
	var node = this, nodes = [node], next = [], children, i, n, index = -1;
	while (node = nodes.pop()) {
		next.push(node);
		if (children = node.children) for (i = 0, n = children.length; i < n; ++i) nodes.push(children[i]);
	}
	while (node = next.pop()) callback.call(that, node, ++index, this);
	return this;
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/find.js
function find_default(callback, that) {
	let index = -1;
	for (const node of this) if (callback.call(that, node, ++index, this)) return node;
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/sum.js
function sum_default(value) {
	return this.eachAfter(function(node) {
		var sum = +value(node.data) || 0, children = node.children, i = children && children.length;
		while (--i >= 0) sum += children[i].value;
		node.value = sum;
	});
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/sort.js
function sort_default(compare) {
	return this.eachBefore(function(node) {
		if (node.children) node.children.sort(compare);
	});
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/path.js
function path_default$1(end) {
	var start = this, ancestor = leastCommonAncestor(start, end), nodes = [start];
	while (start !== ancestor) {
		start = start.parent;
		nodes.push(start);
	}
	var k = nodes.length;
	while (end !== ancestor) {
		nodes.splice(k, 0, end);
		end = end.parent;
	}
	return nodes;
}
function leastCommonAncestor(a, b) {
	if (a === b) return a;
	var aNodes = a.ancestors(), bNodes = b.ancestors(), c = null;
	a = aNodes.pop();
	b = bNodes.pop();
	while (a === b) {
		c = a;
		a = aNodes.pop();
		b = bNodes.pop();
	}
	return c;
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/ancestors.js
function ancestors_default() {
	var node = this, nodes = [node];
	while (node = node.parent) nodes.push(node);
	return nodes;
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/descendants.js
function descendants_default() {
	return Array.from(this);
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/leaves.js
function leaves_default() {
	var leaves = [];
	this.eachBefore(function(node) {
		if (!node.children) leaves.push(node);
	});
	return leaves;
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/links.js
function links_default() {
	var root = this, links = [];
	root.each(function(node) {
		if (node !== root) links.push({
			source: node.parent,
			target: node
		});
	});
	return links;
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/iterator.js
function* iterator_default() {
	var node = this, current, next = [node], children, i, n;
	do {
		current = next.reverse(), next = [];
		while (node = current.pop()) {
			yield node;
			if (children = node.children) for (i = 0, n = children.length; i < n; ++i) next.push(children[i]);
		}
	} while (next.length);
}
//#endregion
//#region node_modules/d3-hierarchy/src/hierarchy/index.js
function hierarchy(data, children) {
	if (data instanceof Map) {
		data = [void 0, data];
		if (children === void 0) children = mapChildren;
	} else if (children === void 0) children = objectChildren;
	var root = new Node(data), node, nodes = [root], child, childs, i, n;
	while (node = nodes.pop()) if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
		node.children = childs;
		for (i = n - 1; i >= 0; --i) {
			nodes.push(child = childs[i] = new Node(childs[i]));
			child.parent = node;
			child.depth = node.depth + 1;
		}
	}
	return root.eachBefore(computeHeight);
}
function node_copy() {
	return hierarchy(this).eachBefore(copyData);
}
function objectChildren(d) {
	return d.children;
}
function mapChildren(d) {
	return Array.isArray(d) ? d[1] : null;
}
function copyData(node) {
	if (node.data.value !== void 0) node.value = node.data.value;
	node.data = node.data.data;
}
function computeHeight(node) {
	var height = 0;
	do
		node.height = height;
	while ((node = node.parent) && node.height < ++height);
}
function Node(data) {
	this.data = data;
	this.depth = this.height = 0;
	this.parent = null;
}
Node.prototype = hierarchy.prototype = {
	constructor: Node,
	count: count_default,
	each: each_default,
	eachAfter: eachAfter_default,
	eachBefore: eachBefore_default,
	find: find_default,
	sum: sum_default,
	sort: sort_default,
	path: path_default$1,
	ancestors: ancestors_default,
	descendants: descendants_default,
	leaves: leaves_default,
	links: links_default,
	copy: node_copy,
	[Symbol.iterator]: iterator_default
};
//#endregion
//#region node_modules/d3-hierarchy/src/accessors.js
function optional(f) {
	return f == null ? null : required(f);
}
function required(f) {
	if (typeof f !== "function") throw new Error();
	return f;
}
//#endregion
//#region node_modules/d3-hierarchy/src/constant.js
function constantZero() {
	return 0;
}
function constant_default$1(x) {
	return function() {
		return x;
	};
}
//#endregion
//#region node_modules/d3-hierarchy/src/lcg.js
var a = 1664525;
var c = 1013904223;
var m = 4294967296;
function lcg_default() {
	let s = 1;
	return () => (s = (a * s + c) % m) / m;
}
//#endregion
//#region node_modules/d3-hierarchy/src/array.js
function array_default$1(x) {
	return typeof x === "object" && "length" in x ? x : Array.from(x);
}
function shuffle(array, random) {
	let m = array.length, t, i;
	while (m) {
		i = random() * m-- | 0;
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}
//#endregion
//#region node_modules/d3-hierarchy/src/pack/enclose.js
function enclose_default(circles) {
	return packEncloseRandom(circles, lcg_default());
}
function packEncloseRandom(circles, random) {
	var i = 0, n = (circles = shuffle(Array.from(circles), random)).length, B = [], p, e;
	while (i < n) {
		p = circles[i];
		if (e && enclosesWeak(e, p)) ++i;
		else e = encloseBasis(B = extendBasis(B, p)), i = 0;
	}
	return e;
}
function extendBasis(B, p) {
	var i, j;
	if (enclosesWeakAll(p, B)) return [p];
	for (i = 0; i < B.length; ++i) if (enclosesNot(p, B[i]) && enclosesWeakAll(encloseBasis2(B[i], p), B)) return [B[i], p];
	for (i = 0; i < B.length - 1; ++i) for (j = i + 1; j < B.length; ++j) if (enclosesNot(encloseBasis2(B[i], B[j]), p) && enclosesNot(encloseBasis2(B[i], p), B[j]) && enclosesNot(encloseBasis2(B[j], p), B[i]) && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) return [
		B[i],
		B[j],
		p
	];
	throw new Error();
}
function enclosesNot(a, b) {
	var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
	return dr < 0 || dr * dr < dx * dx + dy * dy;
}
function enclosesWeak(a, b) {
	var dr = a.r - b.r + Math.max(a.r, b.r, 1) * 1e-9, dx = b.x - a.x, dy = b.y - a.y;
	return dr > 0 && dr * dr > dx * dx + dy * dy;
}
function enclosesWeakAll(a, B) {
	for (var i = 0; i < B.length; ++i) if (!enclosesWeak(a, B[i])) return false;
	return true;
}
function encloseBasis(B) {
	switch (B.length) {
		case 1: return encloseBasis1(B[0]);
		case 2: return encloseBasis2(B[0], B[1]);
		case 3: return encloseBasis3(B[0], B[1], B[2]);
	}
}
function encloseBasis1(a) {
	return {
		x: a.x,
		y: a.y,
		r: a.r
	};
}
function encloseBasis2(a, b) {
	var x1 = a.x, y1 = a.y, r1 = a.r, x2 = b.x, y2 = b.y, r2 = b.r, x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1, l = Math.sqrt(x21 * x21 + y21 * y21);
	return {
		x: (x1 + x2 + x21 / l * r21) / 2,
		y: (y1 + y2 + y21 / l * r21) / 2,
		r: (l + r1 + r2) / 2
	};
}
function encloseBasis3(a, b, c) {
	var x1 = a.x, y1 = a.y, r1 = a.r, x2 = b.x, y2 = b.y, r2 = b.r, x3 = c.x, y3 = c.y, r3 = c.r, a2 = x1 - x2, a3 = x1 - x3, b2 = y1 - y2, b3 = y1 - y3, c2 = r2 - r1, c3 = r3 - r1, d1 = x1 * x1 + y1 * y1 - r1 * r1, d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2, d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3, ab = a3 * b2 - a2 * b3, xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1, xb = (b3 * c2 - b2 * c3) / ab, ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1, yb = (a2 * c3 - a3 * c2) / ab, A = xb * xb + yb * yb - 1, B = 2 * (r1 + xa * xb + ya * yb), C = xa * xa + ya * ya - r1 * r1, r = -(Math.abs(A) > 1e-6 ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
	return {
		x: x1 + xa + xb * r,
		y: y1 + ya + yb * r,
		r
	};
}
//#endregion
//#region node_modules/d3-hierarchy/src/pack/siblings.js
function place(b, a, c) {
	var dx = b.x - a.x, x, a2, dy = b.y - a.y, y, b2, d2 = dx * dx + dy * dy;
	if (d2) {
		a2 = a.r + c.r, a2 *= a2;
		b2 = b.r + c.r, b2 *= b2;
		if (a2 > b2) {
			x = (d2 + b2 - a2) / (2 * d2);
			y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
			c.x = b.x - x * dx - y * dy;
			c.y = b.y - x * dy + y * dx;
		} else {
			x = (d2 + a2 - b2) / (2 * d2);
			y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
			c.x = a.x + x * dx - y * dy;
			c.y = a.y + x * dy + y * dx;
		}
	} else {
		c.x = a.x + c.r;
		c.y = a.y;
	}
}
function intersects(a, b) {
	var dr = a.r + b.r - 1e-6, dx = b.x - a.x, dy = b.y - a.y;
	return dr > 0 && dr * dr > dx * dx + dy * dy;
}
function score(node) {
	var a = node._, b = node.next._, ab = a.r + b.r, dx = (a.x * b.r + b.x * a.r) / ab, dy = (a.y * b.r + b.y * a.r) / ab;
	return dx * dx + dy * dy;
}
function Node$1(circle) {
	this._ = circle;
	this.next = null;
	this.previous = null;
}
function packSiblingsRandom(circles, random) {
	if (!(n = (circles = array_default$1(circles)).length)) return 0;
	var a = circles[0], b, c, n, aa, ca, i, j, k, sj, sk;
	a.x = 0, a.y = 0;
	if (!(n > 1)) return a.r;
	b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
	if (!(n > 2)) return a.r + b.r;
	place(b, a, c = circles[2]);
	a = new Node$1(a), b = new Node$1(b), c = new Node$1(c);
	a.next = c.previous = b;
	b.next = a.previous = c;
	c.next = b.previous = a;
	pack: for (i = 3; i < n; ++i) {
		place(a._, b._, c = circles[i]), c = new Node$1(c);
		j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
		do
			if (sj <= sk) {
				if (intersects(j._, c._)) {
					b = j, a.next = b, b.previous = a, --i;
					continue pack;
				}
				sj += j._.r, j = j.next;
			} else {
				if (intersects(k._, c._)) {
					a = k, a.next = b, b.previous = a, --i;
					continue pack;
				}
				sk += k._.r, k = k.previous;
			}
		while (j !== k.next);
		c.previous = a, c.next = b, a.next = b.previous = b = c;
		aa = score(a);
		while ((c = c.next) !== b) if ((ca = score(c)) < aa) a = c, aa = ca;
		b = a.next;
	}
	a = [b._], c = b;
	while ((c = c.next) !== b) a.push(c._);
	c = packEncloseRandom(a, random);
	for (i = 0; i < n; ++i) a = circles[i], a.x -= c.x, a.y -= c.y;
	return c.r;
}
function siblings_default(circles) {
	packSiblingsRandom(circles, lcg_default());
	return circles;
}
//#endregion
//#region node_modules/d3-hierarchy/src/pack/index.js
function defaultRadius(d) {
	return Math.sqrt(d.value);
}
function pack_default() {
	var radius = null, dx = 1, dy = 1, padding = constantZero;
	function pack(root) {
		const random = lcg_default();
		root.x = dx / 2, root.y = dy / 2;
		if (radius) root.eachBefore(radiusLeaf(radius)).eachAfter(packChildrenRandom(padding, .5, random)).eachBefore(translateChild(1));
		else root.eachBefore(radiusLeaf(defaultRadius)).eachAfter(packChildrenRandom(constantZero, 1, random)).eachAfter(packChildrenRandom(padding, root.r / Math.min(dx, dy), random)).eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
		return root;
	}
	pack.radius = function(x) {
		return arguments.length ? (radius = optional(x), pack) : radius;
	};
	pack.size = function(x) {
		return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
	};
	pack.padding = function(x) {
		return arguments.length ? (padding = typeof x === "function" ? x : constant_default$1(+x), pack) : padding;
	};
	return pack;
}
function radiusLeaf(radius) {
	return function(node) {
		if (!node.children) node.r = Math.max(0, +radius(node) || 0);
	};
}
function packChildrenRandom(padding, k, random) {
	return function(node) {
		if (children = node.children) {
			var children, i, n = children.length, r = padding(node) * k || 0, e;
			if (r) for (i = 0; i < n; ++i) children[i].r += r;
			e = packSiblingsRandom(children, random);
			if (r) for (i = 0; i < n; ++i) children[i].r -= r;
			node.r = e + r;
		}
	};
}
function translateChild(k) {
	return function(node) {
		var parent = node.parent;
		node.r *= k;
		if (parent) {
			node.x = parent.x + k * node.x;
			node.y = parent.y + k * node.y;
		}
	};
}
//#endregion
//#region node_modules/d3-hierarchy/src/treemap/round.js
function round_default$1(node) {
	node.x0 = Math.round(node.x0);
	node.y0 = Math.round(node.y0);
	node.x1 = Math.round(node.x1);
	node.y1 = Math.round(node.y1);
}
//#endregion
//#region node_modules/d3-hierarchy/src/treemap/dice.js
function dice_default(parent, x0, y0, x1, y1) {
	var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (x1 - x0) / parent.value;
	while (++i < n) {
		node = nodes[i], node.y0 = y0, node.y1 = y1;
		node.x0 = x0, node.x1 = x0 += node.value * k;
	}
}
//#endregion
//#region node_modules/d3-hierarchy/src/partition.js
function partition_default() {
	var dx = 1, dy = 1, padding = 0, round = false;
	function partition(root) {
		var n = root.height + 1;
		root.x0 = root.y0 = padding;
		root.x1 = dx;
		root.y1 = dy / n;
		root.eachBefore(positionNode(dy, n));
		if (round) root.eachBefore(round_default$1);
		return root;
	}
	function positionNode(dy, n) {
		return function(node) {
			if (node.children) dice_default(node, node.x0, dy * (node.depth + 1) / n, node.x1, dy * (node.depth + 2) / n);
			var x0 = node.x0, y0 = node.y0, x1 = node.x1 - padding, y1 = node.y1 - padding;
			if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
			if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
			node.x0 = x0;
			node.y0 = y0;
			node.x1 = x1;
			node.y1 = y1;
		};
	}
	partition.round = function(x) {
		return arguments.length ? (round = !!x, partition) : round;
	};
	partition.size = function(x) {
		return arguments.length ? (dx = +x[0], dy = +x[1], partition) : [dx, dy];
	};
	partition.padding = function(x) {
		return arguments.length ? (padding = +x, partition) : padding;
	};
	return partition;
}
//#endregion
//#region node_modules/d3-hierarchy/src/stratify.js
var preroot = { depth: -1 }, ambiguous = {}, imputed = {};
function defaultId(d) {
	return d.id;
}
function defaultParentId(d) {
	return d.parentId;
}
function stratify_default() {
	var id = defaultId, parentId = defaultParentId, path;
	function stratify(data) {
		var nodes = Array.from(data), currentId = id, currentParentId = parentId, n, d, i, root, parent, node, nodeId, nodeKey, nodeByKey = /* @__PURE__ */ new Map();
		if (path != null) {
			const I = nodes.map((d, i) => normalize(path(d, i, data)));
			const P = I.map(parentof);
			const S = new Set(I).add("");
			for (const i of P) if (!S.has(i)) {
				S.add(i);
				I.push(i);
				P.push(parentof(i));
				nodes.push(imputed);
			}
			currentId = (_, i) => I[i];
			currentParentId = (_, i) => P[i];
		}
		for (i = 0, n = nodes.length; i < n; ++i) {
			d = nodes[i], node = nodes[i] = new Node(d);
			if ((nodeId = currentId(d, i, data)) != null && (nodeId += "")) {
				nodeKey = node.id = nodeId;
				nodeByKey.set(nodeKey, nodeByKey.has(nodeKey) ? ambiguous : node);
			}
			if ((nodeId = currentParentId(d, i, data)) != null && (nodeId += "")) node.parent = nodeId;
		}
		for (i = 0; i < n; ++i) {
			node = nodes[i];
			if (nodeId = node.parent) {
				parent = nodeByKey.get(nodeId);
				if (!parent) throw new Error("missing: " + nodeId);
				if (parent === ambiguous) throw new Error("ambiguous: " + nodeId);
				if (parent.children) parent.children.push(node);
				else parent.children = [node];
				node.parent = parent;
			} else {
				if (root) throw new Error("multiple roots");
				root = node;
			}
		}
		if (!root) throw new Error("no root");
		if (path != null) {
			while (root.data === imputed && root.children.length === 1) root = root.children[0], --n;
			for (let i = nodes.length - 1; i >= 0; --i) {
				node = nodes[i];
				if (node.data !== imputed) break;
				node.data = null;
			}
		}
		root.parent = preroot;
		root.eachBefore(function(node) {
			node.depth = node.parent.depth + 1;
			--n;
		}).eachBefore(computeHeight);
		root.parent = null;
		if (n > 0) throw new Error("cycle");
		return root;
	}
	stratify.id = function(x) {
		return arguments.length ? (id = optional(x), stratify) : id;
	};
	stratify.parentId = function(x) {
		return arguments.length ? (parentId = optional(x), stratify) : parentId;
	};
	stratify.path = function(x) {
		return arguments.length ? (path = optional(x), stratify) : path;
	};
	return stratify;
}
function normalize(path) {
	path = `${path}`;
	let i = path.length;
	if (slash(path, i - 1) && !slash(path, i - 2)) path = path.slice(0, -1);
	return path[0] === "/" ? path : `/${path}`;
}
function parentof(path) {
	let i = path.length;
	if (i < 2) return "";
	while (--i > 1) if (slash(path, i)) break;
	return path.slice(0, i);
}
function slash(path, i) {
	if (path[i] === "/") {
		let k = 0;
		while (i > 0 && path[--i] === "\\") ++k;
		if ((k & 1) === 0) return true;
	}
	return false;
}
//#endregion
//#region node_modules/d3-hierarchy/src/tree.js
function defaultSeparation(a, b) {
	return a.parent === b.parent ? 1 : 2;
}
function nextLeft(v) {
	var children = v.children;
	return children ? children[0] : v.t;
}
function nextRight(v) {
	var children = v.children;
	return children ? children[children.length - 1] : v.t;
}
function moveSubtree(wm, wp, shift) {
	var change = shift / (wp.i - wm.i);
	wp.c -= change;
	wp.s += shift;
	wm.c += change;
	wp.z += shift;
	wp.m += shift;
}
function executeShifts(v) {
	var shift = 0, change = 0, children = v.children, i = children.length, w;
	while (--i >= 0) {
		w = children[i];
		w.z += shift;
		w.m += shift;
		shift += w.s + (change += w.c);
	}
}
function nextAncestor(vim, v, ancestor) {
	return vim.a.parent === v.parent ? vim.a : ancestor;
}
function TreeNode(node, i) {
	this._ = node;
	this.parent = null;
	this.children = null;
	this.A = null;
	this.a = this;
	this.z = 0;
	this.m = 0;
	this.c = 0;
	this.s = 0;
	this.t = null;
	this.i = i;
}
TreeNode.prototype = Object.create(Node.prototype);
function treeRoot(root) {
	var tree = new TreeNode(root, 0), node, nodes = [tree], child, children, i, n;
	while (node = nodes.pop()) if (children = node._.children) {
		node.children = new Array(n = children.length);
		for (i = n - 1; i >= 0; --i) {
			nodes.push(child = node.children[i] = new TreeNode(children[i], i));
			child.parent = node;
		}
	}
	(tree.parent = new TreeNode(null, 0)).children = [tree];
	return tree;
}
function tree_default() {
	var separation = defaultSeparation, dx = 1, dy = 1, nodeSize = null;
	function tree(root) {
		var t = treeRoot(root);
		t.eachAfter(firstWalk), t.parent.m = -t.z;
		t.eachBefore(secondWalk);
		if (nodeSize) root.eachBefore(sizeNode);
		else {
			var left = root, right = root, bottom = root;
			root.eachBefore(function(node) {
				if (node.x < left.x) left = node;
				if (node.x > right.x) right = node;
				if (node.depth > bottom.depth) bottom = node;
			});
			var s = left === right ? 1 : separation(left, right) / 2, tx = s - left.x, kx = dx / (right.x + s + tx), ky = dy / (bottom.depth || 1);
			root.eachBefore(function(node) {
				node.x = (node.x + tx) * kx;
				node.y = node.depth * ky;
			});
		}
		return root;
	}
	function firstWalk(v) {
		var children = v.children, siblings = v.parent.children, w = v.i ? siblings[v.i - 1] : null;
		if (children) {
			executeShifts(v);
			var midpoint = (children[0].z + children[children.length - 1].z) / 2;
			if (w) {
				v.z = w.z + separation(v._, w._);
				v.m = v.z - midpoint;
			} else v.z = midpoint;
		} else if (w) v.z = w.z + separation(v._, w._);
		v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
	}
	function secondWalk(v) {
		v._.x = v.z + v.parent.m;
		v.m += v.parent.m;
	}
	function apportion(v, w, ancestor) {
		if (w) {
			var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
			while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
				vom = nextLeft(vom);
				vop = nextRight(vop);
				vop.a = v;
				shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
				if (shift > 0) {
					moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
					sip += shift;
					sop += shift;
				}
				sim += vim.m;
				sip += vip.m;
				som += vom.m;
				sop += vop.m;
			}
			if (vim && !nextRight(vop)) {
				vop.t = vim;
				vop.m += sim - sop;
			}
			if (vip && !nextLeft(vom)) {
				vom.t = vip;
				vom.m += sip - som;
				ancestor = v;
			}
		}
		return ancestor;
	}
	function sizeNode(node) {
		node.x *= dx;
		node.y = node.depth * dy;
	}
	tree.separation = function(x) {
		return arguments.length ? (separation = x, tree) : separation;
	};
	tree.size = function(x) {
		return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree) : nodeSize ? null : [dx, dy];
	};
	tree.nodeSize = function(x) {
		return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree) : nodeSize ? [dx, dy] : null;
	};
	return tree;
}
//#endregion
//#region node_modules/d3-hierarchy/src/treemap/slice.js
function slice_default(parent, x0, y0, x1, y1) {
	var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (y1 - y0) / parent.value;
	while (++i < n) {
		node = nodes[i], node.x0 = x0, node.x1 = x1;
		node.y0 = y0, node.y1 = y0 += node.value * k;
	}
}
//#endregion
//#region node_modules/d3-hierarchy/src/treemap/squarify.js
var phi = (1 + Math.sqrt(5)) / 2;
function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
	var rows = [], nodes = parent.children, row, nodeValue, i0 = 0, i1 = 0, n = nodes.length, dx, dy, value = parent.value, sumValue, minValue, maxValue, newRatio, minRatio, alpha, beta;
	while (i0 < n) {
		dx = x1 - x0, dy = y1 - y0;
		do
			sumValue = nodes[i1++].value;
		while (!sumValue && i1 < n);
		minValue = maxValue = sumValue;
		alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
		beta = sumValue * sumValue * alpha;
		minRatio = Math.max(maxValue / beta, beta / minValue);
		for (; i1 < n; ++i1) {
			sumValue += nodeValue = nodes[i1].value;
			if (nodeValue < minValue) minValue = nodeValue;
			if (nodeValue > maxValue) maxValue = nodeValue;
			beta = sumValue * sumValue * alpha;
			newRatio = Math.max(maxValue / beta, beta / minValue);
			if (newRatio > minRatio) {
				sumValue -= nodeValue;
				break;
			}
			minRatio = newRatio;
		}
		rows.push(row = {
			value: sumValue,
			dice: dx < dy,
			children: nodes.slice(i0, i1)
		});
		if (row.dice) dice_default(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
		else slice_default(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
		value -= sumValue, i0 = i1;
	}
	return rows;
}
var squarify_default = (function custom(ratio) {
	function squarify(parent, x0, y0, x1, y1) {
		squarifyRatio(ratio, parent, x0, y0, x1, y1);
	}
	squarify.ratio = function(x) {
		return custom((x = +x) > 1 ? x : 1);
	};
	return squarify;
})(phi);
//#endregion
//#region node_modules/d3-hierarchy/src/treemap/index.js
function treemap_default() {
	var tile = squarify_default, round = false, dx = 1, dy = 1, paddingStack = [0], paddingInner = constantZero, paddingTop = constantZero, paddingRight = constantZero, paddingBottom = constantZero, paddingLeft = constantZero;
	function treemap(root) {
		root.x0 = root.y0 = 0;
		root.x1 = dx;
		root.y1 = dy;
		root.eachBefore(positionNode);
		paddingStack = [0];
		if (round) root.eachBefore(round_default$1);
		return root;
	}
	function positionNode(node) {
		var p = paddingStack[node.depth], x0 = node.x0 + p, y0 = node.y0 + p, x1 = node.x1 - p, y1 = node.y1 - p;
		if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
		if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
		node.x0 = x0;
		node.y0 = y0;
		node.x1 = x1;
		node.y1 = y1;
		if (node.children) {
			p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
			x0 += paddingLeft(node) - p;
			y0 += paddingTop(node) - p;
			x1 -= paddingRight(node) - p;
			y1 -= paddingBottom(node) - p;
			if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
			if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
			tile(node, x0, y0, x1, y1);
		}
	}
	treemap.round = function(x) {
		return arguments.length ? (round = !!x, treemap) : round;
	};
	treemap.size = function(x) {
		return arguments.length ? (dx = +x[0], dy = +x[1], treemap) : [dx, dy];
	};
	treemap.tile = function(x) {
		return arguments.length ? (tile = required(x), treemap) : tile;
	};
	treemap.padding = function(x) {
		return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
	};
	treemap.paddingInner = function(x) {
		return arguments.length ? (paddingInner = typeof x === "function" ? x : constant_default$1(+x), treemap) : paddingInner;
	};
	treemap.paddingOuter = function(x) {
		return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
	};
	treemap.paddingTop = function(x) {
		return arguments.length ? (paddingTop = typeof x === "function" ? x : constant_default$1(+x), treemap) : paddingTop;
	};
	treemap.paddingRight = function(x) {
		return arguments.length ? (paddingRight = typeof x === "function" ? x : constant_default$1(+x), treemap) : paddingRight;
	};
	treemap.paddingBottom = function(x) {
		return arguments.length ? (paddingBottom = typeof x === "function" ? x : constant_default$1(+x), treemap) : paddingBottom;
	};
	treemap.paddingLeft = function(x) {
		return arguments.length ? (paddingLeft = typeof x === "function" ? x : constant_default$1(+x), treemap) : paddingLeft;
	};
	return treemap;
}
//#endregion
//#region node_modules/d3-hierarchy/src/treemap/binary.js
function binary_default(parent, x0, y0, x1, y1) {
	var nodes = parent.children, i, n = nodes.length, sum, sums = new Array(n + 1);
	for (sums[0] = sum = i = 0; i < n; ++i) sums[i + 1] = sum += nodes[i].value;
	partition(0, n, parent.value, x0, y0, x1, y1);
	function partition(i, j, value, x0, y0, x1, y1) {
		if (i >= j - 1) {
			var node = nodes[i];
			node.x0 = x0, node.y0 = y0;
			node.x1 = x1, node.y1 = y1;
			return;
		}
		var valueOffset = sums[i], valueTarget = value / 2 + valueOffset, k = i + 1, hi = j - 1;
		while (k < hi) {
			var mid = k + hi >>> 1;
			if (sums[mid] < valueTarget) k = mid + 1;
			else hi = mid;
		}
		if (valueTarget - sums[k - 1] < sums[k] - valueTarget && i + 1 < k) --k;
		var valueLeft = sums[k] - valueOffset, valueRight = value - valueLeft;
		if (x1 - x0 > y1 - y0) {
			var xk = value ? (x0 * valueRight + x1 * valueLeft) / value : x1;
			partition(i, k, valueLeft, x0, y0, xk, y1);
			partition(k, j, valueRight, xk, y0, x1, y1);
		} else {
			var yk = value ? (y0 * valueRight + y1 * valueLeft) / value : y1;
			partition(i, k, valueLeft, x0, y0, x1, yk);
			partition(k, j, valueRight, x0, yk, x1, y1);
		}
	}
}
//#endregion
//#region node_modules/d3-hierarchy/src/treemap/sliceDice.js
function sliceDice_default(parent, x0, y0, x1, y1) {
	(parent.depth & 1 ? slice_default : dice_default)(parent, x0, y0, x1, y1);
}
//#endregion
//#region node_modules/d3-hierarchy/src/treemap/resquarify.js
var resquarify_default = (function custom(ratio) {
	function resquarify(parent, x0, y0, x1, y1) {
		if ((rows = parent._squarify) && rows.ratio === ratio) {
			var rows, row, nodes, i, j = -1, n, m = rows.length, value = parent.value;
			while (++j < m) {
				row = rows[j], nodes = row.children;
				for (i = row.value = 0, n = nodes.length; i < n; ++i) row.value += nodes[i].value;
				if (row.dice) dice_default(row, x0, y0, x1, value ? y0 += (y1 - y0) * row.value / value : y1);
				else slice_default(row, x0, y0, value ? x0 += (x1 - x0) * row.value / value : x1, y1);
				value -= row.value;
			}
		} else {
			parent._squarify = rows = squarifyRatio(ratio, parent, x0, y0, x1, y1);
			rows.ratio = ratio;
		}
	}
	resquarify.ratio = function(x) {
		return custom((x = +x) > 1 ? x : 1);
	};
	return resquarify;
})(phi);
//#endregion
//#region node_modules/d3-polygon/src/area.js
function area_default$2(polygon) {
	var i = -1, n = polygon.length, a, b = polygon[n - 1], area = 0;
	while (++i < n) {
		a = b;
		b = polygon[i];
		area += a[1] * b[0] - a[0] * b[1];
	}
	return area / 2;
}
//#endregion
//#region node_modules/d3-polygon/src/centroid.js
function centroid_default$1(polygon) {
	var i = -1, n = polygon.length, x = 0, y = 0, a, b = polygon[n - 1], c, k = 0;
	while (++i < n) {
		a = b;
		b = polygon[i];
		k += c = a[0] * b[1] - b[0] * a[1];
		x += (a[0] + b[0]) * c;
		y += (a[1] + b[1]) * c;
	}
	return k *= 3, [x / k, y / k];
}
//#endregion
//#region node_modules/d3-polygon/src/cross.js
function cross_default$1(a, b, c) {
	return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}
//#endregion
//#region node_modules/d3-polygon/src/hull.js
function lexicographicOrder(a, b) {
	return a[0] - b[0] || a[1] - b[1];
}
function computeUpperHullIndexes(points) {
	const n = points.length, indexes = [0, 1];
	let size = 2, i;
	for (i = 2; i < n; ++i) {
		while (size > 1 && cross_default$1(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) --size;
		indexes[size++] = i;
	}
	return indexes.slice(0, size);
}
function hull_default(points) {
	if ((n = points.length) < 3) return null;
	var i, n, sortedPoints = new Array(n), flippedPoints = new Array(n);
	for (i = 0; i < n; ++i) sortedPoints[i] = [
		+points[i][0],
		+points[i][1],
		i
	];
	sortedPoints.sort(lexicographicOrder);
	for (i = 0; i < n; ++i) flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]];
	var upperIndexes = computeUpperHullIndexes(sortedPoints), lowerIndexes = computeUpperHullIndexes(flippedPoints);
	var skipLeft = lowerIndexes[0] === upperIndexes[0], skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1], hull = [];
	for (i = upperIndexes.length - 1; i >= 0; --i) hull.push(points[sortedPoints[upperIndexes[i]][2]]);
	for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i) hull.push(points[sortedPoints[lowerIndexes[i]][2]]);
	return hull;
}
//#endregion
//#region node_modules/d3-polygon/src/contains.js
function contains_default$1(polygon, point) {
	var n = polygon.length, p = polygon[n - 1], x = point[0], y = point[1], x0 = p[0], y0 = p[1], x1, y1, inside = false;
	for (var i = 0; i < n; ++i) {
		p = polygon[i], x1 = p[0], y1 = p[1];
		if (y1 > y !== y0 > y && x < (x0 - x1) * (y - y1) / (y0 - y1) + x1) inside = !inside;
		x0 = x1, y0 = y1;
	}
	return inside;
}
//#endregion
//#region node_modules/d3-polygon/src/length.js
function length_default$1(polygon) {
	var i = -1, n = polygon.length, b = polygon[n - 1], xa, ya, xb = b[0], yb = b[1], perimeter = 0;
	while (++i < n) {
		xa = xb;
		ya = yb;
		b = polygon[i];
		xb = b[0];
		yb = b[1];
		xa -= xb;
		ya -= yb;
		perimeter += Math.hypot(xa, ya);
	}
	return perimeter;
}
//#endregion
//#region node_modules/d3-random/src/defaultSource.js
var defaultSource_default = Math.random;
//#endregion
//#region node_modules/d3-random/src/uniform.js
var uniform_default = (function sourceRandomUniform(source) {
	function randomUniform(min, max) {
		min = min == null ? 0 : +min;
		max = max == null ? 1 : +max;
		if (arguments.length === 1) max = min, min = 0;
		else max -= min;
		return function() {
			return source() * max + min;
		};
	}
	randomUniform.source = sourceRandomUniform;
	return randomUniform;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/int.js
var int_default = (function sourceRandomInt(source) {
	function randomInt(min, max) {
		if (arguments.length < 2) max = min, min = 0;
		min = Math.floor(min);
		max = Math.floor(max) - min;
		return function() {
			return Math.floor(source() * max + min);
		};
	}
	randomInt.source = sourceRandomInt;
	return randomInt;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/normal.js
var normal_default = (function sourceRandomNormal(source) {
	function randomNormal(mu, sigma) {
		var x, r;
		mu = mu == null ? 0 : +mu;
		sigma = sigma == null ? 1 : +sigma;
		return function() {
			var y;
			if (x != null) y = x, x = null;
			else do {
				x = source() * 2 - 1;
				y = source() * 2 - 1;
				r = x * x + y * y;
			} while (!r || r > 1);
			return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
		};
	}
	randomNormal.source = sourceRandomNormal;
	return randomNormal;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/logNormal.js
var logNormal_default = (function sourceRandomLogNormal(source) {
	var N = normal_default.source(source);
	function randomLogNormal() {
		var randomNormal = N.apply(this, arguments);
		return function() {
			return Math.exp(randomNormal());
		};
	}
	randomLogNormal.source = sourceRandomLogNormal;
	return randomLogNormal;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/irwinHall.js
var irwinHall_default = (function sourceRandomIrwinHall(source) {
	function randomIrwinHall(n) {
		if ((n = +n) <= 0) return () => 0;
		return function() {
			for (var sum = 0, i = n; i > 1; --i) sum += source();
			return sum + i * source();
		};
	}
	randomIrwinHall.source = sourceRandomIrwinHall;
	return randomIrwinHall;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/bates.js
var bates_default = (function sourceRandomBates(source) {
	var I = irwinHall_default.source(source);
	function randomBates(n) {
		if ((n = +n) === 0) return source;
		var randomIrwinHall = I(n);
		return function() {
			return randomIrwinHall() / n;
		};
	}
	randomBates.source = sourceRandomBates;
	return randomBates;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/exponential.js
var exponential_default = (function sourceRandomExponential(source) {
	function randomExponential(lambda) {
		return function() {
			return -Math.log1p(-source()) / lambda;
		};
	}
	randomExponential.source = sourceRandomExponential;
	return randomExponential;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/pareto.js
var pareto_default = (function sourceRandomPareto(source) {
	function randomPareto(alpha) {
		if ((alpha = +alpha) < 0) throw new RangeError("invalid alpha");
		alpha = 1 / -alpha;
		return function() {
			return Math.pow(1 - source(), alpha);
		};
	}
	randomPareto.source = sourceRandomPareto;
	return randomPareto;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/bernoulli.js
var bernoulli_default = (function sourceRandomBernoulli(source) {
	function randomBernoulli(p) {
		if ((p = +p) < 0 || p > 1) throw new RangeError("invalid p");
		return function() {
			return Math.floor(source() + p);
		};
	}
	randomBernoulli.source = sourceRandomBernoulli;
	return randomBernoulli;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/geometric.js
var geometric_default = (function sourceRandomGeometric(source) {
	function randomGeometric(p) {
		if ((p = +p) < 0 || p > 1) throw new RangeError("invalid p");
		if (p === 0) return () => Infinity;
		if (p === 1) return () => 1;
		p = Math.log1p(-p);
		return function() {
			return 1 + Math.floor(Math.log1p(-source()) / p);
		};
	}
	randomGeometric.source = sourceRandomGeometric;
	return randomGeometric;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/gamma.js
var gamma_default = (function sourceRandomGamma(source) {
	var randomNormal = normal_default.source(source)();
	function randomGamma(k, theta) {
		if ((k = +k) < 0) throw new RangeError("invalid k");
		if (k === 0) return () => 0;
		theta = theta == null ? 1 : +theta;
		if (k === 1) return () => -Math.log1p(-source()) * theta;
		var d = (k < 1 ? k + 1 : k) - 1 / 3, c = 1 / (3 * Math.sqrt(d)), multiplier = k < 1 ? () => Math.pow(source(), 1 / k) : () => 1;
		return function() {
			do {
				do
					var x = randomNormal(), v = 1 + c * x;
				while (v <= 0);
				v *= v * v;
				var u = 1 - source();
			} while (u >= 1 - .0331 * x * x * x * x && Math.log(u) >= .5 * x * x + d * (1 - v + Math.log(v)));
			return d * v * multiplier() * theta;
		};
	}
	randomGamma.source = sourceRandomGamma;
	return randomGamma;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/beta.js
var beta_default = (function sourceRandomBeta(source) {
	var G = gamma_default.source(source);
	function randomBeta(alpha, beta) {
		var X = G(alpha), Y = G(beta);
		return function() {
			var x = X();
			return x === 0 ? 0 : x / (x + Y());
		};
	}
	randomBeta.source = sourceRandomBeta;
	return randomBeta;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/binomial.js
var binomial_default = (function sourceRandomBinomial(source) {
	var G = geometric_default.source(source), B = beta_default.source(source);
	function randomBinomial(n, p) {
		n = +n;
		if ((p = +p) >= 1) return () => n;
		if (p <= 0) return () => 0;
		return function() {
			var acc = 0, nn = n, pp = p;
			while (nn * pp > 16 && nn * (1 - pp) > 16) {
				var i = Math.floor((nn + 1) * pp), y = B(i, nn - i + 1)();
				if (y <= pp) {
					acc += i;
					nn -= i;
					pp = (pp - y) / (1 - y);
				} else {
					nn = i - 1;
					pp /= y;
				}
			}
			var sign = pp < .5, g = G(sign ? pp : 1 - pp);
			for (var s = g(), k = 0; s <= nn; ++k) s += g();
			return acc + (sign ? k : nn - k);
		};
	}
	randomBinomial.source = sourceRandomBinomial;
	return randomBinomial;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/weibull.js
var weibull_default = (function sourceRandomWeibull(source) {
	function randomWeibull(k, a, b) {
		var outerFunc;
		if ((k = +k) === 0) outerFunc = (x) => -Math.log(x);
		else {
			k = 1 / k;
			outerFunc = (x) => Math.pow(x, k);
		}
		a = a == null ? 0 : +a;
		b = b == null ? 1 : +b;
		return function() {
			return a + b * outerFunc(-Math.log1p(-source()));
		};
	}
	randomWeibull.source = sourceRandomWeibull;
	return randomWeibull;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/cauchy.js
var cauchy_default = (function sourceRandomCauchy(source) {
	function randomCauchy(a, b) {
		a = a == null ? 0 : +a;
		b = b == null ? 1 : +b;
		return function() {
			return a + b * Math.tan(Math.PI * source());
		};
	}
	randomCauchy.source = sourceRandomCauchy;
	return randomCauchy;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/logistic.js
var logistic_default = (function sourceRandomLogistic(source) {
	function randomLogistic(a, b) {
		a = a == null ? 0 : +a;
		b = b == null ? 1 : +b;
		return function() {
			var u = source();
			return a + b * Math.log(u / (1 - u));
		};
	}
	randomLogistic.source = sourceRandomLogistic;
	return randomLogistic;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/poisson.js
var poisson_default = (function sourceRandomPoisson(source) {
	var G = gamma_default.source(source), B = binomial_default.source(source);
	function randomPoisson(lambda) {
		return function() {
			var acc = 0, l = lambda;
			while (l > 16) {
				var n = Math.floor(.875 * l), t = G(n)();
				if (t > l) return acc + B(n - 1, l / t)();
				acc += n;
				l -= t;
			}
			for (var s = -Math.log1p(-source()), k = 0; s <= l; ++k) s -= Math.log1p(-source());
			return acc + k;
		};
	}
	randomPoisson.source = sourceRandomPoisson;
	return randomPoisson;
})(defaultSource_default);
//#endregion
//#region node_modules/d3-random/src/lcg.js
var mul = 1664525;
var inc = 1013904223;
var eps = 1 / 4294967296;
function lcg(seed = Math.random()) {
	let state = (0 <= seed && seed < 1 ? seed / eps : Math.abs(seed)) | 0;
	return () => (state = mul * state + inc | 0, eps * (state >>> 0));
}
//#endregion
//#region node_modules/d3-zoom/src/constant.js
var constant_default = (x) => () => x;
//#endregion
//#region node_modules/d3-zoom/src/event.js
function ZoomEvent(type, { sourceEvent, target, transform, dispatch }) {
	Object.defineProperties(this, {
		type: {
			value: type,
			enumerable: true,
			configurable: true
		},
		sourceEvent: {
			value: sourceEvent,
			enumerable: true,
			configurable: true
		},
		target: {
			value: target,
			enumerable: true,
			configurable: true
		},
		transform: {
			value: transform,
			enumerable: true,
			configurable: true
		},
		_: { value: dispatch }
	});
}
//#endregion
//#region node_modules/d3-zoom/src/transform.js
function Transform(k, x, y) {
	this.k = k;
	this.x = x;
	this.y = y;
}
Transform.prototype = {
	constructor: Transform,
	scale: function(k) {
		return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
	},
	translate: function(x, y) {
		return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
	},
	apply: function(point) {
		return [point[0] * this.k + this.x, point[1] * this.k + this.y];
	},
	applyX: function(x) {
		return x * this.k + this.x;
	},
	applyY: function(y) {
		return y * this.k + this.y;
	},
	invert: function(location) {
		return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
	},
	invertX: function(x) {
		return (x - this.x) / this.k;
	},
	invertY: function(y) {
		return (y - this.y) / this.k;
	},
	rescaleX: function(x) {
		return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
	},
	rescaleY: function(y) {
		return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
};
var identity$1 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
	while (!node.__zoom) if (!(node = node.parentNode)) return identity$1;
	return node.__zoom;
}
//#endregion
//#region node_modules/d3-zoom/src/noevent.js
function nopropagation(event) {
	event.stopImmediatePropagation();
}
function noevent_default(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
}
//#endregion
//#region node_modules/d3-zoom/src/zoom.js
function defaultFilter(event) {
	return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
	var e = this;
	if (e instanceof SVGElement) {
		e = e.ownerSVGElement || e;
		if (e.hasAttribute("viewBox")) {
			e = e.viewBox.baseVal;
			return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
		}
		return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
	}
	return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
	return this.__zoom || identity$1;
}
function defaultWheelDelta(event) {
	return -event.deltaY * (event.deltaMode === 1 ? .05 : event.deltaMode ? 1 : .002) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform, extent, translateExtent) {
	var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
	return transform.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
}
function zoom_default$1() {
	var filter = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom_default, listeners = dispatch("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
	function zoom(selection) {
		selection.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	zoom.transform = function(collection, transform, point, event) {
		var selection = collection.selection ? collection.selection() : collection;
		selection.property("__zoom", defaultTransform);
		if (collection !== selection) schedule(collection, transform, point, event);
		else selection.interrupt().each(function() {
			gesture(this, arguments).event(event).start().zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform).end();
		});
	};
	zoom.scaleBy = function(selection, k, p, event) {
		zoom.scaleTo(selection, function() {
			return this.__zoom.k * (typeof k === "function" ? k.apply(this, arguments) : k);
		}, p, event);
	};
	zoom.scaleTo = function(selection, k, p, event) {
		zoom.transform(selection, function() {
			var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
			return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
		}, p, event);
	};
	zoom.translateBy = function(selection, x, y, event) {
		zoom.transform(selection, function() {
			return constrain(this.__zoom.translate(typeof x === "function" ? x.apply(this, arguments) : x, typeof y === "function" ? y.apply(this, arguments) : y), extent.apply(this, arguments), translateExtent);
		}, null, event);
	};
	zoom.translateTo = function(selection, x, y, p, event) {
		zoom.transform(selection, function() {
			var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
			return constrain(identity$1.translate(p0[0], p0[1]).scale(t.k).translate(typeof x === "function" ? -x.apply(this, arguments) : -x, typeof y === "function" ? -y.apply(this, arguments) : -y), e, translateExtent);
		}, p, event);
	};
	function scale(transform, k) {
		k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
		return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
	}
	function translate(transform, p0, p1) {
		var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
		return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
	}
	function centroid(extent) {
		return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
	}
	function schedule(transition, transform, point, event) {
		transition.on("start.zoom", function() {
			gesture(this, arguments).event(event).start();
		}).on("interrupt.zoom end.zoom", function() {
			gesture(this, arguments).event(event).end();
		}).tween("zoom", function() {
			var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform === "function" ? transform.apply(that, args) : transform, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
			return function(t) {
				if (t === 1) t = b;
				else {
					var l = i(t), k = w / l[2];
					t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
				}
				g.zoom(null, t);
			};
		});
	}
	function gesture(that, args, clean) {
		return !clean && that.__zooming || new Gesture(that, args);
	}
	function Gesture(that, args) {
		this.that = that;
		this.args = args;
		this.active = 0;
		this.sourceEvent = null;
		this.extent = extent.apply(that, args);
		this.taps = 0;
	}
	Gesture.prototype = {
		event: function(event) {
			if (event) this.sourceEvent = event;
			return this;
		},
		start: function() {
			if (++this.active === 1) {
				this.that.__zooming = this;
				this.emit("start");
			}
			return this;
		},
		zoom: function(key, transform) {
			if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
			if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
			if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
			this.that.__zoom = transform;
			this.emit("zoom");
			return this;
		},
		end: function() {
			if (--this.active === 0) {
				delete this.that.__zooming;
				this.emit("end");
			}
			return this;
		},
		emit: function(type) {
			var d = select_default(this.that).datum();
			listeners.call(type, this.that, new ZoomEvent(type, {
				sourceEvent: this.sourceEvent,
				target: zoom,
				type,
				transform: this.that.__zoom,
				dispatch: listeners
			}), d);
		}
	};
	function wheeled(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer_default(event);
		if (g.wheel) {
			if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) g.mouse[1] = t.invert(g.mouse[0] = p);
			clearTimeout(g.wheel);
		} else if (t.k === k) return;
		else {
			g.mouse = [p, t.invert(p)];
			interrupt_default(this);
			g.start();
		}
		noevent_default(event);
		g.wheel = setTimeout(wheelidled, wheelDelay);
		g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
		function wheelidled() {
			g.wheel = null;
			g.end();
		}
	}
	function mousedowned(event, ...args) {
		if (touchending || !filter.apply(this, arguments)) return;
		var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select_default(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer_default(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
		nodrag_default(event.view);
		nopropagation(event);
		g.mouse = [p, this.__zoom.invert(p)];
		interrupt_default(this);
		g.start();
		function mousemoved(event) {
			noevent_default(event);
			if (!g.moved) {
				var dx = event.clientX - x0, dy = event.clientY - y0;
				g.moved = dx * dx + dy * dy > clickDistance2;
			}
			g.event(event).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer_default(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
		}
		function mouseupped(event) {
			v.on("mousemove.zoom mouseup.zoom", null);
			yesdrag(event.view, g.moved);
			noevent_default(event);
			g.event(event).end();
		}
	}
	function dblclicked(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var t0 = this.__zoom, p0 = pointer_default(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? .5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
		noevent_default(event);
		if (duration > 0) select_default(this).transition().duration(duration).call(schedule, t1, p0, event);
		else select_default(this).call(zoom.transform, t1, p0, event);
	}
	function touchstarted(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
		nopropagation(event);
		for (i = 0; i < n; ++i) {
			t = touches[i], p = pointer_default(t, this);
			p = [
				p,
				this.__zoom.invert(p),
				t.identifier
			];
			if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
			else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
		}
		if (touchstarting) touchstarting = clearTimeout(touchstarting);
		if (started) {
			if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() {
				touchstarting = null;
			}, touchDelay);
			interrupt_default(this);
			g.start();
		}
	}
	function touchmoved(event, ...args) {
		if (!this.__zooming) return;
		var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
		noevent_default(event);
		for (i = 0; i < n; ++i) {
			t = touches[i], p = pointer_default(t, this);
			if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
			else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
		}
		t = g.that.__zoom;
		if (g.touch1) {
			var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
			t = scale(t, Math.sqrt(dp / dl));
			p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
			l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
		} else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
		else return;
		g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
	}
	function touchended(event, ...args) {
		if (!this.__zooming) return;
		var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
		nopropagation(event);
		if (touchending) clearTimeout(touchending);
		touchending = setTimeout(function() {
			touchending = null;
		}, touchDelay);
		for (i = 0; i < n; ++i) {
			t = touches[i];
			if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
			else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
		}
		if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
		if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
		else {
			g.end();
			if (g.taps === 2) {
				t = pointer_default(t, this);
				if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
					var p = select_default(this).on("dblclick.zoom");
					if (p) p.apply(this, arguments);
				}
			}
		}
	}
	zoom.wheelDelta = function(_) {
		return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant_default(+_), zoom) : wheelDelta;
	};
	zoom.filter = function(_) {
		return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default(!!_), zoom) : filter;
	};
	zoom.touchable = function(_) {
		return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default(!!_), zoom) : touchable;
	};
	zoom.extent = function(_) {
		return arguments.length ? (extent = typeof _ === "function" ? _ : constant_default([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
	};
	zoom.scaleExtent = function(_) {
		return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
	};
	zoom.translateExtent = function(_) {
		return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
	};
	zoom.constrain = function(_) {
		return arguments.length ? (constrain = _, zoom) : constrain;
	};
	zoom.duration = function(_) {
		return arguments.length ? (duration = +_, zoom) : duration;
	};
	zoom.interpolate = function(_) {
		return arguments.length ? (interpolate = _, zoom) : interpolate;
	};
	zoom.on = function() {
		var value = listeners.on.apply(listeners, arguments);
		return value === listeners ? zoom : value;
	};
	zoom.clickDistance = function(_) {
		return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
	};
	zoom.tapDistance = function(_) {
		return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
	};
	return zoom;
}
//#endregion
export { Adder, Delaunay, FormatSpecifier, InternMap, InternSet, Node, Path, Voronoi, Transform as ZoomTransform, active_default as active, arc_default as arc, area_default as area, areaRadial_default as areaRadial, areaRadial_default as radialArea, ascending, autoType, axisBottom, axisLeft, axisRight, axisTop, bin, bin as histogram, bisectRight as bisect, bisectRight, bisectCenter, bisectLeft, bisector, blob_default as blob, blur, blur2, blurImage, brush_default as brush, brushSelection, brushX, brushY, buffer_default as buffer, chord_default as chord, chordDirected, chordTranspose, cluster_default as cluster, color, density_default as contourDensity, contours_default as contours, count, create_default as create, creator_default as creator, cross, csv, csvFormat, csvFormatBody, csvFormatRow, csvFormatRows, csvFormatValue, csvParse, csvParseRows, cubehelix, cumsum, basis_default as curveBasis, basisClosed_default as curveBasisClosed, basisOpen_default as curveBasisOpen, bumpX as curveBumpX, bumpY as curveBumpY, bundle_default as curveBundle, cardinal_default as curveCardinal, cardinalClosed_default as curveCardinalClosed, cardinalOpen_default as curveCardinalOpen, catmullRom_default as curveCatmullRom, catmullRomClosed_default as curveCatmullRomClosed, catmullRomOpen_default as curveCatmullRomOpen, linear_default as curveLinear, linearClosed_default as curveLinearClosed, monotoneX as curveMonotoneX, monotoneY as curveMonotoneY, natural_default as curveNatural, step_default as curveStep, stepAfter as curveStepAfter, stepBefore as curveStepBefore, descending, deviation, difference, disjoint, dispatch, drag_default as drag, nodrag_default as dragDisable, yesdrag as dragEnable, dsv, dsv_default as dsvFormat, backInOut as easeBack, backInOut as easeBackInOut, backIn as easeBackIn, backOut as easeBackOut, bounceOut as easeBounce, bounceOut as easeBounceOut, bounceIn as easeBounceIn, bounceInOut as easeBounceInOut, circleInOut as easeCircle, circleInOut as easeCircleInOut, circleIn as easeCircleIn, circleOut as easeCircleOut, cubicInOut as easeCubic, cubicInOut as easeCubicInOut, cubicIn as easeCubicIn, cubicOut as easeCubicOut, elasticOut as easeElastic, elasticOut as easeElasticOut, elasticIn as easeElasticIn, elasticInOut as easeElasticInOut, expInOut as easeExp, expInOut as easeExpInOut, expIn as easeExpIn, expOut as easeExpOut, linear as easeLinear, polyInOut as easePoly, polyInOut as easePolyInOut, polyIn as easePolyIn, polyOut as easePolyOut, quadInOut as easeQuad, quadInOut as easeQuadInOut, quadIn as easeQuadIn, quadOut as easeQuadOut, sinInOut as easeSin, sinInOut as easeSinInOut, sinIn as easeSinIn, sinOut as easeSinOut, every, extent, fcumsum, filter, flatGroup, flatRollup, center_default as forceCenter, collide_default as forceCollide, link_default as forceLink, manyBody_default as forceManyBody, radial_default as forceRadial, simulation_default as forceSimulation, x_default as forceX, y_default as forceY, format, defaultLocale as formatDefaultLocale, locale_default as formatLocale, formatPrefix, formatSpecifier, fsum, albers_default as geoAlbers, albersUsa_default as geoAlbersUsa, area_default$1 as geoArea, azimuthalEqualArea_default as geoAzimuthalEqualArea, azimuthalEqualAreaRaw as geoAzimuthalEqualAreaRaw, azimuthalEquidistant_default as geoAzimuthalEquidistant, azimuthalEquidistantRaw as geoAzimuthalEquidistantRaw, bounds_default as geoBounds, centroid_default as geoCentroid, circle_default as geoCircle, antimeridian_default as geoClipAntimeridian, circle_default$1 as geoClipCircle, extent_default as geoClipExtent, clipRectangle as geoClipRectangle, conicConformal_default as geoConicConformal, conicConformalRaw as geoConicConformalRaw, conicEqualArea_default as geoConicEqualArea, conicEqualAreaRaw as geoConicEqualAreaRaw, conicEquidistant_default as geoConicEquidistant, conicEquidistantRaw as geoConicEquidistantRaw, contains_default as geoContains, distance_default as geoDistance, equalEarth_default as geoEqualEarth, equalEarthRaw as geoEqualEarthRaw, equirectangular_default as geoEquirectangular, equirectangularRaw as geoEquirectangularRaw, gnomonic_default as geoGnomonic, gnomonicRaw as geoGnomonicRaw, graticule as geoGraticule, graticule10 as geoGraticule10, identity_default as geoIdentity, interpolate_default as geoInterpolate, length_default as geoLength, mercator_default as geoMercator, mercatorRaw as geoMercatorRaw, naturalEarth1_default as geoNaturalEarth1, naturalEarth1Raw as geoNaturalEarth1Raw, orthographic_default as geoOrthographic, orthographicRaw as geoOrthographicRaw, path_default as geoPath, projection as geoProjection, projectionMutator as geoProjectionMutator, rotation_default as geoRotation, stereographic_default as geoStereographic, stereographicRaw as geoStereographicRaw, stream_default as geoStream, transform_default as geoTransform, transverseMercator_default as geoTransverseMercator, transverseMercatorRaw as geoTransverseMercatorRaw, gray, greatest, greatestIndex, group, groupSort, groups, hcl, hierarchy, hsl, html, image_default as image, index, indexes, value_default as interpolate, array_default as interpolateArray, basis_default$1 as interpolateBasis, basisClosed_default$1 as interpolateBasisClosed, Blues_default as interpolateBlues, BrBG_default as interpolateBrBG, BuGn_default as interpolateBuGn, BuPu_default as interpolateBuPu, cividis_default as interpolateCividis, cool as interpolateCool, cubehelix_default as interpolateCubehelix, cubehelix_default$1 as interpolateCubehelixDefault, cubehelixLong as interpolateCubehelixLong, date_default as interpolateDate, discrete_default as interpolateDiscrete, GnBu_default as interpolateGnBu, Greens_default as interpolateGreens, Greys_default as interpolateGreys, hcl_default as interpolateHcl, hclLong as interpolateHclLong, hsl_default as interpolateHsl, hslLong as interpolateHslLong, hue_default as interpolateHue, inferno as interpolateInferno, lab as interpolateLab, magma as interpolateMagma, number_default as interpolateNumber, numberArray_default as interpolateNumberArray, object_default as interpolateObject, OrRd_default as interpolateOrRd, Oranges_default as interpolateOranges, PRGn_default as interpolatePRGn, PiYG_default as interpolatePiYG, plasma as interpolatePlasma, PuBu_default as interpolatePuBu, PuBuGn_default as interpolatePuBuGn, PuOr_default as interpolatePuOr, PuRd_default as interpolatePuRd, Purples_default as interpolatePurples, rainbow_default as interpolateRainbow, RdBu_default as interpolateRdBu, RdGy_default as interpolateRdGy, RdPu_default as interpolateRdPu, RdYlBu_default as interpolateRdYlBu, RdYlGn_default as interpolateRdYlGn, Reds_default as interpolateReds, rgb_default as interpolateRgb, rgbBasis as interpolateRgbBasis, rgbBasisClosed as interpolateRgbBasisClosed, round_default as interpolateRound, sinebow_default as interpolateSinebow, Spectral_default as interpolateSpectral, string_default as interpolateString, interpolateTransformCss, interpolateTransformSvg, turbo_default as interpolateTurbo, viridis_default as interpolateViridis, warm as interpolateWarm, YlGn_default as interpolateYlGn, YlGnBu_default as interpolateYlGnBu, YlOrBr_default as interpolateYlOrBr, YlOrRd_default as interpolateYlOrRd, zoom_default as interpolateZoom, interrupt_default as interrupt, intersection, interval_default as interval, formatIso as isoFormat, parseIso as isoParse, json_default as json, lab$1 as lab, lch, least, leastIndex, line_default as line, lineRadial_default as lineRadial, lineRadial_default as radialLine, link, linkHorizontal, linkRadial, linkVertical, local, map, matcher_default as matcher, max, maxIndex, mean, median, medianIndex, merge, min, minIndex, mode, namespace_default as namespace, namespaces_default as namespaces, nice, now, pack_default as pack, enclose_default as packEnclose, siblings_default as packSiblings, pairs, partition_default as partition, path, pathRound, permute, pie_default as pie, piecewise, pointRadial_default as pointRadial, pointer_default as pointer, pointers_default as pointers, area_default$2 as polygonArea, centroid_default$1 as polygonCentroid, contains_default$1 as polygonContains, hull_default as polygonHull, length_default$1 as polygonLength, precisionFixed_default as precisionFixed, precisionPrefix_default as precisionPrefix, precisionRound_default as precisionRound, quadtree, quantile, quantileIndex, quantileSorted, quantize_default as quantize, quickselect, bates_default as randomBates, bernoulli_default as randomBernoulli, beta_default as randomBeta, binomial_default as randomBinomial, cauchy_default as randomCauchy, exponential_default as randomExponential, gamma_default as randomGamma, geometric_default as randomGeometric, int_default as randomInt, irwinHall_default as randomIrwinHall, lcg as randomLcg, logNormal_default as randomLogNormal, logistic_default as randomLogistic, normal_default as randomNormal, pareto_default as randomPareto, poisson_default as randomPoisson, uniform_default as randomUniform, weibull_default as randomWeibull, range, rank, reduce, reverse, rgb, ribbon_default as ribbon, ribbonArrow, rollup, rollups, band as scaleBand, diverging as scaleDiverging, divergingLog as scaleDivergingLog, divergingPow as scaleDivergingPow, divergingSqrt as scaleDivergingSqrt, divergingSymlog as scaleDivergingSymlog, identity as scaleIdentity, implicit as scaleImplicit, linear$1 as scaleLinear, log as scaleLog, ordinal as scaleOrdinal, point as scalePoint, pow as scalePow, quantile$1 as scaleQuantile, quantize as scaleQuantize, radial as scaleRadial, sequential as scaleSequential, sequentialLog as scaleSequentialLog, sequentialPow as scaleSequentialPow, sequentialQuantile as scaleSequentialQuantile, sequentialSqrt as scaleSequentialSqrt, sequentialSymlog as scaleSequentialSymlog, sqrt as scaleSqrt, symlog as scaleSymlog, threshold as scaleThreshold, time as scaleTime, utcTime as scaleUtc, scan, Accent_default as schemeAccent, scheme as schemeBlues, scheme$1 as schemeBrBG, scheme$2 as schemeBuGn, scheme$3 as schemeBuPu, category10_default as schemeCategory10, Dark2_default as schemeDark2, scheme$4 as schemeGnBu, scheme$5 as schemeGreens, scheme$6 as schemeGreys, observable10_default as schemeObservable10, scheme$7 as schemeOrRd, scheme$8 as schemeOranges, scheme$9 as schemePRGn, Paired_default as schemePaired, Pastel1_default as schemePastel1, Pastel2_default as schemePastel2, scheme$10 as schemePiYG, scheme$11 as schemePuBu, scheme$12 as schemePuBuGn, scheme$13 as schemePuOr, scheme$14 as schemePuRd, scheme$15 as schemePurples, scheme$16 as schemeRdBu, scheme$17 as schemeRdGy, scheme$18 as schemeRdPu, scheme$19 as schemeRdYlBu, scheme$20 as schemeRdYlGn, scheme$21 as schemeReds, Set1_default as schemeSet1, Set2_default as schemeSet2, Set3_default as schemeSet3, scheme$22 as schemeSpectral, Tableau10_default as schemeTableau10, scheme$23 as schemeYlGn, scheme$24 as schemeYlGnBu, scheme$25 as schemeYlOrBr, scheme$26 as schemeYlOrRd, select_default as select, selectAll_default as selectAll, selection, selector_default as selector, selectorAll_default as selectorAll, shuffle_default as shuffle, shuffler, some, sort, stack_default as stack, diverging_default as stackOffsetDiverging, expand_default as stackOffsetExpand, none_default as stackOffsetNone, silhouette_default as stackOffsetSilhouette, wiggle_default as stackOffsetWiggle, appearance_default as stackOrderAppearance, ascending_default as stackOrderAscending, descending_default as stackOrderDescending, insideOut_default as stackOrderInsideOut, none_default$1 as stackOrderNone, reverse_default as stackOrderReverse, stratify_default as stratify, styleValue as style, subset, sum, superset, svg, Symbol$1 as symbol, asterisk_default as symbolAsterisk, circle_default$2 as symbolCircle, cross_default as symbolCross, diamond_default as symbolDiamond, diamond2_default as symbolDiamond2, plus_default as symbolPlus, square_default as symbolSquare, square2_default as symbolSquare2, star_default as symbolStar, times_default as symbolTimes, times_default as symbolX, triangle_default as symbolTriangle, triangle2_default as symbolTriangle2, wye_default as symbolWye, symbolsFill as symbols, symbolsFill, symbolsStroke, text_default as text, thresholdFreedmanDiaconis, thresholdScott, thresholdSturges, tickFormat, tickIncrement, tickStep, ticks, timeDay, timeDays, timeFormat, defaultLocale$1 as timeFormatDefaultLocale, formatLocale as timeFormatLocale, timeFriday, timeFridays, timeHour, timeHours, timeInterval, millisecond as timeMillisecond, millisecond as utcMillisecond, milliseconds as timeMilliseconds, milliseconds as utcMilliseconds, timeMinute, timeMinutes, timeMonday, timeMondays, timeMonth, timeMonths, timeParse, timeSaturday, timeSaturdays, second as timeSecond, second as utcSecond, seconds as timeSeconds, seconds as utcSeconds, timeSunday, timeSunday as timeWeek, timeSundays, timeSundays as timeWeeks, timeThursday, timeThursdays, timeTickInterval, timeTicks, timeTuesday, timeTuesdays, timeWednesday, timeWednesdays, timeYear, timeYears, timeout_default as timeout, timer, timerFlush, transition, transpose, tree_default as tree, treemap_default as treemap, binary_default as treemapBinary, dice_default as treemapDice, resquarify_default as treemapResquarify, slice_default as treemapSlice, sliceDice_default as treemapSliceDice, squarify_default as treemapSquarify, tsv, tsvFormat, tsvFormatBody, tsvFormatRow, tsvFormatRows, tsvFormatValue, tsvParse, tsvParseRows, union, unixDay, unixDays, utcDay, utcDays, utcFormat, utcFriday, utcFridays, utcHour, utcHours, utcMinute, utcMinutes, utcMonday, utcMondays, utcMonth, utcMonths, utcParse, utcSaturday, utcSaturdays, utcSunday, utcSunday as utcWeek, utcSundays, utcSundays as utcWeeks, utcThursday, utcThursdays, utcTickInterval, utcTicks, utcTuesday, utcTuesdays, utcWednesday, utcWednesdays, utcYear, utcYears, variance, window_default as window, xml_default as xml, zip, zoom_default$1 as zoom, identity$1 as zoomIdentity, transform as zoomTransform };

//# sourceMappingURL=d3.js.map