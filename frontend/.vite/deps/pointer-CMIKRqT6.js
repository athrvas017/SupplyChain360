import { K as range$1 } from "./quantize-CsOVkTR9.js";
//#region node_modules/d3-array/src/extent.js
function extent(values, valueof) {
	let min;
	let max;
	if (valueof === void 0) {
		for (const value of values) if (value != null) if (min === void 0) {
			if (value >= value) min = max = value;
		} else {
			if (min > value) min = value;
			if (max < value) max = value;
		}
	} else {
		let index = -1;
		for (let value of values) if ((value = valueof(value, ++index, values)) != null) if (min === void 0) {
			if (value >= value) min = max = value;
		} else {
			if (min > value) min = value;
			if (max < value) max = value;
		}
	}
	return [min, max];
}
//#endregion
//#region node_modules/d3-array/src/fsum.js
var Adder = class {
	constructor() {
		this._partials = new Float64Array(32);
		this._n = 0;
	}
	add(x) {
		const p = this._partials;
		let i = 0;
		for (let j = 0; j < this._n && j < 32; j++) {
			const y = p[j], hi = x + y, lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
			if (lo) p[i++] = lo;
			x = hi;
		}
		p[i] = x;
		this._n = i + 1;
		return this;
	}
	valueOf() {
		const p = this._partials;
		let n = this._n, x, y, lo, hi = 0;
		if (n > 0) {
			hi = p[--n];
			while (n > 0) {
				x = hi;
				y = p[--n];
				hi = x + y;
				lo = y - (hi - x);
				if (lo) break;
			}
			if (n > 0 && (lo < 0 && p[n - 1] < 0 || lo > 0 && p[n - 1] > 0)) {
				y = lo * 2;
				x = hi + y;
				if (y == x - hi) hi = x;
			}
		}
		return hi;
	}
};
function fsum(values, valueof) {
	const adder = new Adder();
	if (valueof === void 0) {
		for (let value of values) if (value = +value) adder.add(value);
	} else {
		let index = -1;
		for (let value of values) if (value = +valueof(value, ++index, values)) adder.add(value);
	}
	return +adder;
}
function fcumsum(values, valueof) {
	const adder = new Adder();
	let index = -1;
	return Float64Array.from(values, valueof === void 0 ? (v) => adder.add(+v || 0) : (v) => adder.add(+valueof(v, ++index, values) || 0));
}
//#endregion
//#region node_modules/d3-array/src/mean.js
function mean(values, valueof) {
	let count = 0;
	let sum = 0;
	if (valueof === void 0) {
		for (let value of values) if (value != null && (value = +value) >= value) ++count, sum += value;
	} else {
		let index = -1;
		for (let value of values) if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) ++count, sum += value;
	}
	if (count) return sum / count;
}
//#endregion
//#region node_modules/d3-array/src/merge.js
function* flatten(arrays) {
	for (const array of arrays) yield* array;
}
function merge(arrays) {
	return Array.from(flatten(arrays));
}
//#endregion
//#region node_modules/d3-array/src/sum.js
function sum$1(values, valueof) {
	let sum = 0;
	if (valueof === void 0) {
		for (let value of values) if (value = +value) sum += value;
	} else {
		let index = -1;
		for (let value of values) if (value = +valueof(value, ++index, values)) sum += value;
	}
	return sum;
}
//#endregion
//#region node_modules/d3-geo/src/math.js
var epsilon$2 = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau$1 = pi * 2;
var degrees = 180 / pi;
var radians = pi / 180;
var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var ceil = Math.ceil;
var exp = Math.exp;
var hypot = Math.hypot;
var log = Math.log;
var pow$1 = Math.pow;
var sin = Math.sin;
var sign = Math.sign || function(x) {
	return x > 0 ? 1 : x < 0 ? -1 : 0;
};
var sqrt = Math.sqrt;
var tan = Math.tan;
function acos(x) {
	return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}
function asin(x) {
	return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}
function haversin(x) {
	return (x = sin(x / 2)) * x;
}
//#endregion
//#region node_modules/d3-geo/src/noop.js
function noop() {}
//#endregion
//#region node_modules/d3-geo/src/stream.js
function streamGeometry(geometry, stream) {
	if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) streamGeometryType[geometry.type](geometry, stream);
}
var streamObjectType = {
	Feature: function(object, stream) {
		streamGeometry(object.geometry, stream);
	},
	FeatureCollection: function(object, stream) {
		var features = object.features, i = -1, n = features.length;
		while (++i < n) streamGeometry(features[i].geometry, stream);
	}
};
var streamGeometryType = {
	Sphere: function(object, stream) {
		stream.sphere();
	},
	Point: function(object, stream) {
		object = object.coordinates;
		stream.point(object[0], object[1], object[2]);
	},
	MultiPoint: function(object, stream) {
		var coordinates = object.coordinates, i = -1, n = coordinates.length;
		while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
	},
	LineString: function(object, stream) {
		streamLine(object.coordinates, stream, 0);
	},
	MultiLineString: function(object, stream) {
		var coordinates = object.coordinates, i = -1, n = coordinates.length;
		while (++i < n) streamLine(coordinates[i], stream, 0);
	},
	Polygon: function(object, stream) {
		streamPolygon(object.coordinates, stream);
	},
	MultiPolygon: function(object, stream) {
		var coordinates = object.coordinates, i = -1, n = coordinates.length;
		while (++i < n) streamPolygon(coordinates[i], stream);
	},
	GeometryCollection: function(object, stream) {
		var geometries = object.geometries, i = -1, n = geometries.length;
		while (++i < n) streamGeometry(geometries[i], stream);
	}
};
function streamLine(coordinates, stream, closed) {
	var i = -1, n = coordinates.length - closed, coordinate;
	stream.lineStart();
	while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
	stream.lineEnd();
}
function streamPolygon(coordinates, stream) {
	var i = -1, n = coordinates.length;
	stream.polygonStart();
	while (++i < n) streamLine(coordinates[i], stream, 1);
	stream.polygonEnd();
}
function stream_default(object, stream) {
	if (object && streamObjectType.hasOwnProperty(object.type)) streamObjectType[object.type](object, stream);
	else streamGeometry(object, stream);
}
//#endregion
//#region node_modules/d3-geo/src/area.js
var areaRingSum = new Adder();
var areaSum = new Adder(), lambda00$2, phi00$2, lambda0$2, cosPhi0$1, sinPhi0$1;
var areaStream = {
	point: noop,
	lineStart: noop,
	lineEnd: noop,
	polygonStart: function() {
		areaRingSum = new Adder();
		areaStream.lineStart = areaRingStart;
		areaStream.lineEnd = areaRingEnd;
	},
	polygonEnd: function() {
		var areaRing = +areaRingSum;
		areaSum.add(areaRing < 0 ? tau$1 + areaRing : areaRing);
		this.lineStart = this.lineEnd = this.point = noop;
	},
	sphere: function() {
		areaSum.add(tau$1);
	}
};
function areaRingStart() {
	areaStream.point = areaPointFirst;
}
function areaRingEnd() {
	areaPoint(lambda00$2, phi00$2);
}
function areaPointFirst(lambda, phi) {
	areaStream.point = areaPoint;
	lambda00$2 = lambda, phi00$2 = phi;
	lambda *= radians, phi *= radians;
	lambda0$2 = lambda, cosPhi0$1 = cos(phi = phi / 2 + quarterPi), sinPhi0$1 = sin(phi);
}
function areaPoint(lambda, phi) {
	lambda *= radians, phi *= radians;
	phi = phi / 2 + quarterPi;
	var dLambda = lambda - lambda0$2, sdLambda = dLambda >= 0 ? 1 : -1, adLambda = sdLambda * dLambda, cosPhi = cos(phi), sinPhi = sin(phi), k = sinPhi0$1 * sinPhi, u = cosPhi0$1 * cosPhi + k * cos(adLambda), v = k * sdLambda * sin(adLambda);
	areaRingSum.add(atan2(v, u));
	lambda0$2 = lambda, cosPhi0$1 = cosPhi, sinPhi0$1 = sinPhi;
}
function area_default(object) {
	areaSum = new Adder();
	stream_default(object, areaStream);
	return areaSum * 2;
}
//#endregion
//#region node_modules/d3-geo/src/cartesian.js
function spherical(cartesian) {
	return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
}
function cartesian(spherical) {
	var lambda = spherical[0], phi = spherical[1], cosPhi = cos(phi);
	return [
		cosPhi * cos(lambda),
		cosPhi * sin(lambda),
		sin(phi)
	];
}
function cartesianDot(a, b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cartesianCross(a, b) {
	return [
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]
	];
}
function cartesianAddInPlace(a, b) {
	a[0] += b[0], a[1] += b[1], a[2] += b[2];
}
function cartesianScale(vector, k) {
	return [
		vector[0] * k,
		vector[1] * k,
		vector[2] * k
	];
}
function cartesianNormalizeInPlace(d) {
	var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
	d[0] /= l, d[1] /= l, d[2] /= l;
}
//#endregion
//#region node_modules/d3-geo/src/bounds.js
var lambda0$1, phi0, lambda1, phi1, lambda2, lambda00$1, phi00$1, p0, deltaSum, ranges, range;
var boundsStream$1 = {
	point: boundsPoint$1,
	lineStart: boundsLineStart,
	lineEnd: boundsLineEnd,
	polygonStart: function() {
		boundsStream$1.point = boundsRingPoint;
		boundsStream$1.lineStart = boundsRingStart;
		boundsStream$1.lineEnd = boundsRingEnd;
		deltaSum = new Adder();
		areaStream.polygonStart();
	},
	polygonEnd: function() {
		areaStream.polygonEnd();
		boundsStream$1.point = boundsPoint$1;
		boundsStream$1.lineStart = boundsLineStart;
		boundsStream$1.lineEnd = boundsLineEnd;
		if (areaRingSum < 0) lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
		else if (deltaSum > 1e-6) phi1 = 90;
		else if (deltaSum < -1e-6) phi0 = -90;
		range[0] = lambda0$1, range[1] = lambda1;
	},
	sphere: function() {
		lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
	}
};
function boundsPoint$1(lambda, phi) {
	ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
	if (phi < phi0) phi0 = phi;
	if (phi > phi1) phi1 = phi;
}
function linePoint(lambda, phi) {
	var p = cartesian([lambda * radians, phi * radians]);
	if (p0) {
		var normal = cartesianCross(p0, p), inflection = cartesianCross([
			normal[1],
			-normal[0],
			0
		], normal);
		cartesianNormalizeInPlace(inflection);
		inflection = spherical(inflection);
		var delta = lambda - lambda2, sign = delta > 0 ? 1 : -1, lambdai = inflection[0] * degrees * sign, phii, antimeridian = abs(delta) > 180;
		if (antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
			phii = inflection[1] * degrees;
			if (phii > phi1) phi1 = phii;
		} else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
			phii = -inflection[1] * degrees;
			if (phii < phi0) phi0 = phii;
		} else {
			if (phi < phi0) phi0 = phi;
			if (phi > phi1) phi1 = phi;
		}
		if (antimeridian) {
			if (lambda < lambda2) {
				if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
			} else if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
		} else if (lambda1 >= lambda0$1) {
			if (lambda < lambda0$1) lambda0$1 = lambda;
			if (lambda > lambda1) lambda1 = lambda;
		} else if (lambda > lambda2) {
			if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
		} else if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
	} else ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
	if (phi < phi0) phi0 = phi;
	if (phi > phi1) phi1 = phi;
	p0 = p, lambda2 = lambda;
}
function boundsLineStart() {
	boundsStream$1.point = linePoint;
}
function boundsLineEnd() {
	range[0] = lambda0$1, range[1] = lambda1;
	boundsStream$1.point = boundsPoint$1;
	p0 = null;
}
function boundsRingPoint(lambda, phi) {
	if (p0) {
		var delta = lambda - lambda2;
		deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
	} else lambda00$1 = lambda, phi00$1 = phi;
	areaStream.point(lambda, phi);
	linePoint(lambda, phi);
}
function boundsRingStart() {
	areaStream.lineStart();
}
function boundsRingEnd() {
	boundsRingPoint(lambda00$1, phi00$1);
	areaStream.lineEnd();
	if (abs(deltaSum) > 1e-6) lambda0$1 = -(lambda1 = 180);
	range[0] = lambda0$1, range[1] = lambda1;
	p0 = null;
}
function angle(lambda0, lambda1) {
	return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
}
function rangeCompare(a, b) {
	return a[0] - b[0];
}
function rangeContains(range, x) {
	return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
}
function bounds_default(feature) {
	var i, n, a, b, merged, deltaMax, delta;
	phi1 = lambda1 = -(lambda0$1 = phi0 = Infinity);
	ranges = [];
	stream_default(feature, boundsStream$1);
	if (n = ranges.length) {
		ranges.sort(rangeCompare);
		for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
			b = ranges[i];
			if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
				if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
				if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
			} else merged.push(a = b);
		}
		for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
			b = merged[i];
			if ((delta = angle(a[1], b[0])) > deltaMax) deltaMax = delta, lambda0$1 = b[0], lambda1 = a[1];
		}
	}
	ranges = range = null;
	return lambda0$1 === Infinity || phi0 === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[lambda0$1, phi0], [lambda1, phi1]];
}
//#endregion
//#region node_modules/d3-geo/src/centroid.js
var W0, W1, X0, Y0, Z0, X1, Y1, Z1, X2, Y2, Z2, lambda00, phi00, x0$1, y0$1, z0;
var centroidStream = {
	sphere: noop,
	point: centroidPoint,
	lineStart: centroidLineStart,
	lineEnd: centroidLineEnd,
	polygonStart: function() {
		centroidStream.lineStart = centroidRingStart;
		centroidStream.lineEnd = centroidRingEnd;
	},
	polygonEnd: function() {
		centroidStream.lineStart = centroidLineStart;
		centroidStream.lineEnd = centroidLineEnd;
	}
};
function centroidPoint(lambda, phi) {
	lambda *= radians, phi *= radians;
	var cosPhi = cos(phi);
	centroidPointCartesian(cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi));
}
function centroidPointCartesian(x, y, z) {
	++W0;
	X0 += (x - X0) / W0;
	Y0 += (y - Y0) / W0;
	Z0 += (z - Z0) / W0;
}
function centroidLineStart() {
	centroidStream.point = centroidLinePointFirst;
}
function centroidLinePointFirst(lambda, phi) {
	lambda *= radians, phi *= radians;
	var cosPhi = cos(phi);
	x0$1 = cosPhi * cos(lambda);
	y0$1 = cosPhi * sin(lambda);
	z0 = sin(phi);
	centroidStream.point = centroidLinePoint;
	centroidPointCartesian(x0$1, y0$1, z0);
}
function centroidLinePoint(lambda, phi) {
	lambda *= radians, phi *= radians;
	var cosPhi = cos(phi), x = cosPhi * cos(lambda), y = cosPhi * sin(lambda), z = sin(phi), w = atan2(sqrt((w = y0$1 * z - z0 * y) * w + (w = z0 * x - x0$1 * z) * w + (w = x0$1 * y - y0$1 * x) * w), x0$1 * x + y0$1 * y + z0 * z);
	W1 += w;
	X1 += w * (x0$1 + (x0$1 = x));
	Y1 += w * (y0$1 + (y0$1 = y));
	Z1 += w * (z0 + (z0 = z));
	centroidPointCartesian(x0$1, y0$1, z0);
}
function centroidLineEnd() {
	centroidStream.point = centroidPoint;
}
function centroidRingStart() {
	centroidStream.point = centroidRingPointFirst;
}
function centroidRingEnd() {
	centroidRingPoint(lambda00, phi00);
	centroidStream.point = centroidPoint;
}
function centroidRingPointFirst(lambda, phi) {
	lambda00 = lambda, phi00 = phi;
	lambda *= radians, phi *= radians;
	centroidStream.point = centroidRingPoint;
	var cosPhi = cos(phi);
	x0$1 = cosPhi * cos(lambda);
	y0$1 = cosPhi * sin(lambda);
	z0 = sin(phi);
	centroidPointCartesian(x0$1, y0$1, z0);
}
function centroidRingPoint(lambda, phi) {
	lambda *= radians, phi *= radians;
	var cosPhi = cos(phi), x = cosPhi * cos(lambda), y = cosPhi * sin(lambda), z = sin(phi), cx = y0$1 * z - z0 * y, cy = z0 * x - x0$1 * z, cz = x0$1 * y - y0$1 * x, m = hypot(cx, cy, cz), w = asin(m), v = m && -w / m;
	X2.add(v * cx);
	Y2.add(v * cy);
	Z2.add(v * cz);
	W1 += w;
	X1 += w * (x0$1 + (x0$1 = x));
	Y1 += w * (y0$1 + (y0$1 = y));
	Z1 += w * (z0 + (z0 = z));
	centroidPointCartesian(x0$1, y0$1, z0);
}
function centroid_default(object) {
	W0 = W1 = X0 = Y0 = Z0 = X1 = Y1 = Z1 = 0;
	X2 = new Adder();
	Y2 = new Adder();
	Z2 = new Adder();
	stream_default(object, centroidStream);
	var x = +X2, y = +Y2, z = +Z2, m = hypot(x, y, z);
	if (m < 1e-12) {
		x = X1, y = Y1, z = Z1;
		if (W1 < 1e-6) x = X0, y = Y0, z = Z0;
		m = hypot(x, y, z);
		if (m < 1e-12) return [NaN, NaN];
	}
	return [atan2(y, x) * degrees, asin(z / m) * degrees];
}
//#endregion
//#region node_modules/d3-geo/src/constant.js
function constant_default$1(x) {
	return function() {
		return x;
	};
}
//#endregion
//#region node_modules/d3-geo/src/compose.js
function compose_default(a, b) {
	function compose(x, y) {
		return x = a(x, y), b(x[0], x[1]);
	}
	if (a.invert && b.invert) compose.invert = function(x, y) {
		return x = b.invert(x, y), x && a.invert(x[0], x[1]);
	};
	return compose;
}
//#endregion
//#region node_modules/d3-geo/src/rotation.js
function rotationIdentity(lambda, phi) {
	if (abs(lambda) > pi) lambda -= Math.round(lambda / tau$1) * tau$1;
	return [lambda, phi];
}
rotationIdentity.invert = rotationIdentity;
function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
	return (deltaLambda %= tau$1) ? deltaPhi || deltaGamma ? compose_default(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
}
function forwardRotationLambda(deltaLambda) {
	return function(lambda, phi) {
		lambda += deltaLambda;
		if (abs(lambda) > pi) lambda -= Math.round(lambda / tau$1) * tau$1;
		return [lambda, phi];
	};
}
function rotationLambda(deltaLambda) {
	var rotation = forwardRotationLambda(deltaLambda);
	rotation.invert = forwardRotationLambda(-deltaLambda);
	return rotation;
}
function rotationPhiGamma(deltaPhi, deltaGamma) {
	var cosDeltaPhi = cos(deltaPhi), sinDeltaPhi = sin(deltaPhi), cosDeltaGamma = cos(deltaGamma), sinDeltaGamma = sin(deltaGamma);
	function rotation(lambda, phi) {
		var cosPhi = cos(phi), x = cos(lambda) * cosPhi, y = sin(lambda) * cosPhi, z = sin(phi), k = z * cosDeltaPhi + x * sinDeltaPhi;
		return [atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi), asin(k * cosDeltaGamma + y * sinDeltaGamma)];
	}
	rotation.invert = function(lambda, phi) {
		var cosPhi = cos(phi), x = cos(lambda) * cosPhi, y = sin(lambda) * cosPhi, z = sin(phi), k = z * cosDeltaGamma - y * sinDeltaGamma;
		return [atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi), asin(k * cosDeltaPhi - x * sinDeltaPhi)];
	};
	return rotation;
}
function rotation_default(rotate) {
	rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);
	function forward(coordinates) {
		coordinates = rotate(coordinates[0] * radians, coordinates[1] * radians);
		return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
	}
	forward.invert = function(coordinates) {
		coordinates = rotate.invert(coordinates[0] * radians, coordinates[1] * radians);
		return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
	};
	return forward;
}
//#endregion
//#region node_modules/d3-geo/src/circle.js
function circleStream(stream, radius, delta, direction, t0, t1) {
	if (!delta) return;
	var cosRadius = cos(radius), sinRadius = sin(radius), step = direction * delta;
	if (t0 == null) {
		t0 = radius + direction * tau$1;
		t1 = radius - step / 2;
	} else {
		t0 = circleRadius(cosRadius, t0);
		t1 = circleRadius(cosRadius, t1);
		if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau$1;
	}
	for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
		point = spherical([
			cosRadius,
			-sinRadius * cos(t),
			-sinRadius * sin(t)
		]);
		stream.point(point[0], point[1]);
	}
}
function circleRadius(cosRadius, point) {
	point = cartesian(point), point[0] -= cosRadius;
	cartesianNormalizeInPlace(point);
	var radius = acos(-point[1]);
	return ((-point[2] < 0 ? -radius : radius) + tau$1 - epsilon$2) % tau$1;
}
function circle_default$1() {
	var center = constant_default$1([0, 0]), radius = constant_default$1(90), precision = constant_default$1(2), ring, rotate, stream = { point };
	function point(x, y) {
		ring.push(x = rotate(x, y));
		x[0] *= degrees, x[1] *= degrees;
	}
	function circle() {
		var c = center.apply(this, arguments), r = radius.apply(this, arguments) * radians, p = precision.apply(this, arguments) * radians;
		ring = [];
		rotate = rotateRadians(-c[0] * radians, -c[1] * radians, 0).invert;
		circleStream(stream, r, p, 1);
		c = {
			type: "Polygon",
			coordinates: [ring]
		};
		ring = rotate = null;
		return c;
	}
	circle.center = function(_) {
		return arguments.length ? (center = typeof _ === "function" ? _ : constant_default$1([+_[0], +_[1]]), circle) : center;
	};
	circle.radius = function(_) {
		return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default$1(+_), circle) : radius;
	};
	circle.precision = function(_) {
		return arguments.length ? (precision = typeof _ === "function" ? _ : constant_default$1(+_), circle) : precision;
	};
	return circle;
}
//#endregion
//#region node_modules/d3-geo/src/clip/buffer.js
function buffer_default() {
	var lines = [], line;
	return {
		point: function(x, y, m) {
			line.push([
				x,
				y,
				m
			]);
		},
		lineStart: function() {
			lines.push(line = []);
		},
		lineEnd: noop,
		rejoin: function() {
			if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
		},
		result: function() {
			var result = lines;
			lines = [];
			line = null;
			return result;
		}
	};
}
//#endregion
//#region node_modules/d3-geo/src/pointEqual.js
function pointEqual_default(a, b) {
	return abs(a[0] - b[0]) < 1e-6 && abs(a[1] - b[1]) < 1e-6;
}
//#endregion
//#region node_modules/d3-geo/src/clip/rejoin.js
function Intersection(point, points, other, entry) {
	this.x = point;
	this.z = points;
	this.o = other;
	this.e = entry;
	this.v = false;
	this.n = this.p = null;
}
function rejoin_default(segments, compareIntersection, startInside, interpolate, stream) {
	var subject = [], clip = [], i, n;
	segments.forEach(function(segment) {
		if ((n = segment.length - 1) <= 0) return;
		var n, p0 = segment[0], p1 = segment[n], x;
		if (pointEqual_default(p0, p1)) {
			if (!p0[2] && !p1[2]) {
				stream.lineStart();
				for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
				stream.lineEnd();
				return;
			}
			p1[0] += 2 * epsilon$2;
		}
		subject.push(x = new Intersection(p0, segment, null, true));
		clip.push(x.o = new Intersection(p0, null, x, false));
		subject.push(x = new Intersection(p1, segment, null, false));
		clip.push(x.o = new Intersection(p1, null, x, true));
	});
	if (!subject.length) return;
	clip.sort(compareIntersection);
	link(subject);
	link(clip);
	for (i = 0, n = clip.length; i < n; ++i) clip[i].e = startInside = !startInside;
	var start = subject[0], points, point;
	while (1) {
		var current = start, isSubject = true;
		while (current.v) if ((current = current.n) === start) return;
		points = current.z;
		stream.lineStart();
		do {
			current.v = current.o.v = true;
			if (current.e) {
				if (isSubject) for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
				else interpolate(current.x, current.n.x, 1, stream);
				current = current.n;
			} else {
				if (isSubject) {
					points = current.p.z;
					for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
				} else interpolate(current.x, current.p.x, -1, stream);
				current = current.p;
			}
			current = current.o;
			points = current.z;
			isSubject = !isSubject;
		} while (!current.v);
		stream.lineEnd();
	}
}
function link(array) {
	if (!(n = array.length)) return;
	var n, i = 0, a = array[0], b;
	while (++i < n) {
		a.n = b = array[i];
		b.p = a;
		a = b;
	}
	a.n = b = array[0];
	b.p = a;
}
//#endregion
//#region node_modules/d3-geo/src/polygonContains.js
function longitude(point) {
	return abs(point[0]) <= pi ? point[0] : sign(point[0]) * ((abs(point[0]) + pi) % tau$1 - pi);
}
function polygonContains_default(polygon, point) {
	var lambda = longitude(point), phi = point[1], sinPhi = sin(phi), normal = [
		sin(lambda),
		-cos(lambda),
		0
	], angle = 0, winding = 0;
	var sum = new Adder();
	if (sinPhi === 1) phi = halfPi + epsilon$2;
	else if (sinPhi === -1) phi = -halfPi - epsilon$2;
	for (var i = 0, n = polygon.length; i < n; ++i) {
		if (!(m = (ring = polygon[i]).length)) continue;
		var ring, m, point0 = ring[m - 1], lambda0 = longitude(point0), phi0 = point0[1] / 2 + quarterPi, sinPhi0 = sin(phi0), cosPhi0 = cos(phi0);
		for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
			var point1 = ring[j], lambda1 = longitude(point1), phi1 = point1[1] / 2 + quarterPi, sinPhi1 = sin(phi1), cosPhi1 = cos(phi1), delta = lambda1 - lambda0, sign = delta >= 0 ? 1 : -1, absDelta = sign * delta, antimeridian = absDelta > pi, k = sinPhi0 * sinPhi1;
			sum.add(atan2(k * sign * sin(absDelta), cosPhi0 * cosPhi1 + k * cos(absDelta)));
			angle += antimeridian ? delta + sign * tau$1 : delta;
			if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
				var arc = cartesianCross(cartesian(point0), cartesian(point1));
				cartesianNormalizeInPlace(arc);
				var intersection = cartesianCross(normal, arc);
				cartesianNormalizeInPlace(intersection);
				var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
				if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) winding += antimeridian ^ delta >= 0 ? 1 : -1;
			}
		}
	}
	return (angle < -1e-6 || angle < 1e-6 && sum < -1e-12) ^ winding & 1;
}
//#endregion
//#region node_modules/d3-geo/src/clip/index.js
function clip_default(pointVisible, clipLine, interpolate, start) {
	return function(sink) {
		var line = clipLine(sink), ringBuffer = buffer_default(), ringSink = clipLine(ringBuffer), polygonStarted = false, polygon, segments, ring;
		var clip = {
			point,
			lineStart,
			lineEnd,
			polygonStart: function() {
				clip.point = pointRing;
				clip.lineStart = ringStart;
				clip.lineEnd = ringEnd;
				segments = [];
				polygon = [];
			},
			polygonEnd: function() {
				clip.point = point;
				clip.lineStart = lineStart;
				clip.lineEnd = lineEnd;
				segments = merge(segments);
				var startInside = polygonContains_default(polygon, start);
				if (segments.length) {
					if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
					rejoin_default(segments, compareIntersection, startInside, interpolate, sink);
				} else if (startInside) {
					if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
					sink.lineStart();
					interpolate(null, null, 1, sink);
					sink.lineEnd();
				}
				if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
				segments = polygon = null;
			},
			sphere: function() {
				sink.polygonStart();
				sink.lineStart();
				interpolate(null, null, 1, sink);
				sink.lineEnd();
				sink.polygonEnd();
			}
		};
		function point(lambda, phi) {
			if (pointVisible(lambda, phi)) sink.point(lambda, phi);
		}
		function pointLine(lambda, phi) {
			line.point(lambda, phi);
		}
		function lineStart() {
			clip.point = pointLine;
			line.lineStart();
		}
		function lineEnd() {
			clip.point = point;
			line.lineEnd();
		}
		function pointRing(lambda, phi) {
			ring.push([lambda, phi]);
			ringSink.point(lambda, phi);
		}
		function ringStart() {
			ringSink.lineStart();
			ring = [];
		}
		function ringEnd() {
			pointRing(ring[0][0], ring[0][1]);
			ringSink.lineEnd();
			var clean = ringSink.clean(), ringSegments = ringBuffer.result(), i, n = ringSegments.length, m, segment, point;
			ring.pop();
			polygon.push(ring);
			ring = null;
			if (!n) return;
			if (clean & 1) {
				segment = ringSegments[0];
				if ((m = segment.length - 1) > 0) {
					if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
					sink.lineStart();
					for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
					sink.lineEnd();
				}
				return;
			}
			if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
			segments.push(ringSegments.filter(validSegment));
		}
		return clip;
	};
}
function validSegment(segment) {
	return segment.length > 1;
}
function compareIntersection(a, b) {
	return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon$2 : halfPi - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon$2 : halfPi - b[1]);
}
//#endregion
//#region node_modules/d3-geo/src/clip/antimeridian.js
var antimeridian_default = clip_default(function() {
	return true;
}, clipAntimeridianLine, clipAntimeridianInterpolate, [-pi, -halfPi]);
function clipAntimeridianLine(stream) {
	var lambda0 = NaN, phi0 = NaN, sign0 = NaN, clean;
	return {
		lineStart: function() {
			stream.lineStart();
			clean = 1;
		},
		point: function(lambda1, phi1) {
			var sign1 = lambda1 > 0 ? pi : -pi, delta = abs(lambda1 - lambda0);
			if (abs(delta - pi) < 1e-6) {
				stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi : -halfPi);
				stream.point(sign0, phi0);
				stream.lineEnd();
				stream.lineStart();
				stream.point(sign1, phi0);
				stream.point(lambda1, phi0);
				clean = 0;
			} else if (sign0 !== sign1 && delta >= pi) {
				if (abs(lambda0 - sign0) < 1e-6) lambda0 -= sign0 * epsilon$2;
				if (abs(lambda1 - sign1) < 1e-6) lambda1 -= sign1 * epsilon$2;
				phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
				stream.point(sign0, phi0);
				stream.lineEnd();
				stream.lineStart();
				stream.point(sign1, phi0);
				clean = 0;
			}
			stream.point(lambda0 = lambda1, phi0 = phi1);
			sign0 = sign1;
		},
		lineEnd: function() {
			stream.lineEnd();
			lambda0 = phi0 = NaN;
		},
		clean: function() {
			return 2 - clean;
		}
	};
}
function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
	var cosPhi0, cosPhi1, sinLambda0Lambda1 = sin(lambda0 - lambda1);
	return abs(sinLambda0Lambda1) > 1e-6 ? atan((sin(phi0) * (cosPhi1 = cos(phi1)) * sin(lambda1) - sin(phi1) * (cosPhi0 = cos(phi0)) * sin(lambda0)) / (cosPhi0 * cosPhi1 * sinLambda0Lambda1)) : (phi0 + phi1) / 2;
}
function clipAntimeridianInterpolate(from, to, direction, stream) {
	var phi;
	if (from == null) {
		phi = direction * halfPi;
		stream.point(-pi, phi);
		stream.point(0, phi);
		stream.point(pi, phi);
		stream.point(pi, 0);
		stream.point(pi, -phi);
		stream.point(0, -phi);
		stream.point(-pi, -phi);
		stream.point(-pi, 0);
		stream.point(-pi, phi);
	} else if (abs(from[0] - to[0]) > 1e-6) {
		var lambda = from[0] < to[0] ? pi : -pi;
		phi = direction * lambda / 2;
		stream.point(-lambda, phi);
		stream.point(0, phi);
		stream.point(lambda, phi);
	} else stream.point(to[0], to[1]);
}
//#endregion
//#region node_modules/d3-geo/src/clip/circle.js
function circle_default(radius) {
	var cr = cos(radius), delta = 2 * radians, smallRadius = cr > 0, notHemisphere = abs(cr) > epsilon$2;
	function interpolate(from, to, direction, stream) {
		circleStream(stream, radius, delta, direction, from, to);
	}
	function visible(lambda, phi) {
		return cos(lambda) * cos(phi) > cr;
	}
	function clipLine(stream) {
		var point0, c0, v0, v00, clean;
		return {
			lineStart: function() {
				v00 = v0 = false;
				clean = 1;
			},
			point: function(lambda, phi) {
				var point1 = [lambda, phi], point2, v = visible(lambda, phi), c = smallRadius ? v ? 0 : code(lambda, phi) : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
				if (!point0 && (v00 = v0 = v)) stream.lineStart();
				if (v !== v0) {
					point2 = intersect(point0, point1);
					if (!point2 || pointEqual_default(point0, point2) || pointEqual_default(point1, point2)) point1[2] = 1;
				}
				if (v !== v0) {
					clean = 0;
					if (v) {
						stream.lineStart();
						point2 = intersect(point1, point0);
						stream.point(point2[0], point2[1]);
					} else {
						point2 = intersect(point0, point1);
						stream.point(point2[0], point2[1], 2);
						stream.lineEnd();
					}
					point0 = point2;
				} else if (notHemisphere && point0 && smallRadius ^ v) {
					var t;
					if (!(c & c0) && (t = intersect(point1, point0, true))) {
						clean = 0;
						if (smallRadius) {
							stream.lineStart();
							stream.point(t[0][0], t[0][1]);
							stream.point(t[1][0], t[1][1]);
							stream.lineEnd();
						} else {
							stream.point(t[1][0], t[1][1]);
							stream.lineEnd();
							stream.lineStart();
							stream.point(t[0][0], t[0][1], 3);
						}
					}
				}
				if (v && (!point0 || !pointEqual_default(point0, point1))) stream.point(point1[0], point1[1]);
				point0 = point1, v0 = v, c0 = c;
			},
			lineEnd: function() {
				if (v0) stream.lineEnd();
				point0 = null;
			},
			clean: function() {
				return clean | (v00 && v0) << 1;
			}
		};
	}
	function intersect(a, b, two) {
		var pa = cartesian(a), pb = cartesian(b);
		var n1 = [
			1,
			0,
			0
		], n2 = cartesianCross(pa, pb), n2n2 = cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
		if (!determinant) return !two && a;
		var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = cartesianCross(n1, n2), A = cartesianScale(n1, c1);
		cartesianAddInPlace(A, cartesianScale(n2, c2));
		var u = n1xn2, w = cartesianDot(A, u), uu = cartesianDot(u, u), t2 = w * w - uu * (cartesianDot(A, A) - 1);
		if (t2 < 0) return;
		var t = sqrt(t2), q = cartesianScale(u, (-w - t) / uu);
		cartesianAddInPlace(q, A);
		q = spherical(q);
		if (!two) return q;
		var lambda0 = a[0], lambda1 = b[0], phi0 = a[1], phi1 = b[1], z;
		if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;
		var delta = lambda1 - lambda0, polar = abs(delta - pi) < epsilon$2, meridian = polar || delta < 1e-6;
		if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;
		if (meridian ? polar ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < 1e-6 ? phi0 : phi1) : phi0 <= q[1] && q[1] <= phi1 : delta > pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
			var q1 = cartesianScale(u, (-w + t) / uu);
			cartesianAddInPlace(q1, A);
			return [q, spherical(q1)];
		}
	}
	function code(lambda, phi) {
		var r = smallRadius ? radius : pi - radius, code = 0;
		if (lambda < -r) code |= 1;
		else if (lambda > r) code |= 2;
		if (phi < -r) code |= 4;
		else if (phi > r) code |= 8;
		return code;
	}
	return clip_default(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi, radius - pi]);
}
//#endregion
//#region node_modules/d3-geo/src/clip/line.js
function line_default(a, b, x0, y0, x1, y1) {
	var ax = a[0], ay = a[1], bx = b[0], by = b[1], t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r = x0 - ax;
	if (!dx && r > 0) return;
	r /= dx;
	if (dx < 0) {
		if (r < t0) return;
		if (r < t1) t1 = r;
	} else if (dx > 0) {
		if (r > t1) return;
		if (r > t0) t0 = r;
	}
	r = x1 - ax;
	if (!dx && r < 0) return;
	r /= dx;
	if (dx < 0) {
		if (r > t1) return;
		if (r > t0) t0 = r;
	} else if (dx > 0) {
		if (r < t0) return;
		if (r < t1) t1 = r;
	}
	r = y0 - ay;
	if (!dy && r > 0) return;
	r /= dy;
	if (dy < 0) {
		if (r < t0) return;
		if (r < t1) t1 = r;
	} else if (dy > 0) {
		if (r > t1) return;
		if (r > t0) t0 = r;
	}
	r = y1 - ay;
	if (!dy && r < 0) return;
	r /= dy;
	if (dy < 0) {
		if (r > t1) return;
		if (r > t0) t0 = r;
	} else if (dy > 0) {
		if (r < t0) return;
		if (r < t1) t1 = r;
	}
	if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
	if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
	return true;
}
//#endregion
//#region node_modules/d3-geo/src/clip/rectangle.js
var clipMax = 1e9, clipMin = -clipMax;
function clipRectangle(x0, y0, x1, y1) {
	function visible(x, y) {
		return x0 <= x && x <= x1 && y0 <= y && y <= y1;
	}
	function interpolate(from, to, direction, stream) {
		var a = 0, a1 = 0;
		if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) do
			stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
		while ((a = (a + direction + 4) % 4) !== a1);
		else stream.point(to[0], to[1]);
	}
	function corner(p, direction) {
		return abs(p[0] - x0) < 1e-6 ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < 1e-6 ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < 1e-6 ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
	}
	function compareIntersection(a, b) {
		return comparePoint(a.x, b.x);
	}
	function comparePoint(a, b) {
		var ca = corner(a, 1), cb = corner(b, 1);
		return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
	}
	return function(stream) {
		var activeStream = stream, bufferStream = buffer_default(), segments, polygon, ring, x__, y__, v__, x_, y_, v_, first, clean;
		var clipStream = {
			point,
			lineStart,
			lineEnd,
			polygonStart,
			polygonEnd
		};
		function point(x, y) {
			if (visible(x, y)) activeStream.point(x, y);
		}
		function polygonInside() {
			var winding = 0;
			for (var i = 0, n = polygon.length; i < n; ++i) for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
				a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
				if (a1 <= y1) {
					if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding;
				} else if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding;
			}
			return winding;
		}
		function polygonStart() {
			activeStream = bufferStream, segments = [], polygon = [], clean = true;
		}
		function polygonEnd() {
			var startInside = polygonInside(), cleanInside = clean && startInside, visible = (segments = merge(segments)).length;
			if (cleanInside || visible) {
				stream.polygonStart();
				if (cleanInside) {
					stream.lineStart();
					interpolate(null, null, 1, stream);
					stream.lineEnd();
				}
				if (visible) rejoin_default(segments, compareIntersection, startInside, interpolate, stream);
				stream.polygonEnd();
			}
			activeStream = stream, segments = polygon = ring = null;
		}
		function lineStart() {
			clipStream.point = linePoint;
			if (polygon) polygon.push(ring = []);
			first = true;
			v_ = false;
			x_ = y_ = NaN;
		}
		function lineEnd() {
			if (segments) {
				linePoint(x__, y__);
				if (v__ && v_) bufferStream.rejoin();
				segments.push(bufferStream.result());
			}
			clipStream.point = point;
			if (v_) activeStream.lineEnd();
		}
		function linePoint(x, y) {
			var v = visible(x, y);
			if (polygon) ring.push([x, y]);
			if (first) {
				x__ = x, y__ = y, v__ = v;
				first = false;
				if (v) {
					activeStream.lineStart();
					activeStream.point(x, y);
				}
			} else if (v && v_) activeStream.point(x, y);
			else {
				var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))], b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
				if (line_default(a, b, x0, y0, x1, y1)) {
					if (!v_) {
						activeStream.lineStart();
						activeStream.point(a[0], a[1]);
					}
					activeStream.point(b[0], b[1]);
					if (!v) activeStream.lineEnd();
					clean = false;
				} else if (v) {
					activeStream.lineStart();
					activeStream.point(x, y);
					clean = false;
				}
			}
			x_ = x, y_ = y, v_ = v;
		}
		return clipStream;
	};
}
//#endregion
//#region node_modules/d3-geo/src/length.js
var lengthSum, lambda0, sinPhi0, cosPhi0;
var lengthStream = {
	sphere: noop,
	point: noop,
	lineStart: lengthLineStart,
	lineEnd: noop,
	polygonStart: noop,
	polygonEnd: noop
};
function lengthLineStart() {
	lengthStream.point = lengthPointFirst;
	lengthStream.lineEnd = lengthLineEnd;
}
function lengthLineEnd() {
	lengthStream.point = lengthStream.lineEnd = noop;
}
function lengthPointFirst(lambda, phi) {
	lambda *= radians, phi *= radians;
	lambda0 = lambda, sinPhi0 = sin(phi), cosPhi0 = cos(phi);
	lengthStream.point = lengthPoint;
}
function lengthPoint(lambda, phi) {
	lambda *= radians, phi *= radians;
	var sinPhi = sin(phi), cosPhi = cos(phi), delta = abs(lambda - lambda0), cosDelta = cos(delta), x = cosPhi * sin(delta), y = cosPhi0 * sinPhi - sinPhi0 * cosPhi * cosDelta, z = sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosDelta;
	lengthSum.add(atan2(sqrt(x * x + y * y), z));
	lambda0 = lambda, sinPhi0 = sinPhi, cosPhi0 = cosPhi;
}
function length_default(object) {
	lengthSum = new Adder();
	stream_default(object, lengthStream);
	return +lengthSum;
}
//#endregion
//#region node_modules/d3-geo/src/distance.js
var coordinates = [null, null], object = {
	type: "LineString",
	coordinates
};
function distance_default(a, b) {
	coordinates[0] = a;
	coordinates[1] = b;
	return length_default(object);
}
//#endregion
//#region node_modules/d3-geo/src/contains.js
var containsObjectType = {
	Feature: function(object, point) {
		return containsGeometry(object.geometry, point);
	},
	FeatureCollection: function(object, point) {
		var features = object.features, i = -1, n = features.length;
		while (++i < n) if (containsGeometry(features[i].geometry, point)) return true;
		return false;
	}
};
var containsGeometryType = {
	Sphere: function() {
		return true;
	},
	Point: function(object, point) {
		return containsPoint(object.coordinates, point);
	},
	MultiPoint: function(object, point) {
		var coordinates = object.coordinates, i = -1, n = coordinates.length;
		while (++i < n) if (containsPoint(coordinates[i], point)) return true;
		return false;
	},
	LineString: function(object, point) {
		return containsLine(object.coordinates, point);
	},
	MultiLineString: function(object, point) {
		var coordinates = object.coordinates, i = -1, n = coordinates.length;
		while (++i < n) if (containsLine(coordinates[i], point)) return true;
		return false;
	},
	Polygon: function(object, point) {
		return containsPolygon(object.coordinates, point);
	},
	MultiPolygon: function(object, point) {
		var coordinates = object.coordinates, i = -1, n = coordinates.length;
		while (++i < n) if (containsPolygon(coordinates[i], point)) return true;
		return false;
	},
	GeometryCollection: function(object, point) {
		var geometries = object.geometries, i = -1, n = geometries.length;
		while (++i < n) if (containsGeometry(geometries[i], point)) return true;
		return false;
	}
};
function containsGeometry(geometry, point) {
	return geometry && containsGeometryType.hasOwnProperty(geometry.type) ? containsGeometryType[geometry.type](geometry, point) : false;
}
function containsPoint(coordinates, point) {
	return distance_default(coordinates, point) === 0;
}
function containsLine(coordinates, point) {
	var ao, bo, ab;
	for (var i = 0, n = coordinates.length; i < n; i++) {
		bo = distance_default(coordinates[i], point);
		if (bo === 0) return true;
		if (i > 0) {
			ab = distance_default(coordinates[i], coordinates[i - 1]);
			if (ab > 0 && ao <= ab && bo <= ab && (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < 1e-12 * ab) return true;
		}
		ao = bo;
	}
	return false;
}
function containsPolygon(coordinates, point) {
	return !!polygonContains_default(coordinates.map(ringRadians), pointRadians(point));
}
function ringRadians(ring) {
	return ring = ring.map(pointRadians), ring.pop(), ring;
}
function pointRadians(point) {
	return [point[0] * radians, point[1] * radians];
}
function contains_default(object, point) {
	return (object && containsObjectType.hasOwnProperty(object.type) ? containsObjectType[object.type] : containsGeometry)(object, point);
}
//#endregion
//#region node_modules/d3-geo/src/graticule.js
function graticuleX(y0, y1, dy) {
	var y = range$1(y0, y1 - epsilon$2, dy).concat(y1);
	return function(x) {
		return y.map(function(y) {
			return [x, y];
		});
	};
}
function graticuleY(x0, x1, dx) {
	var x = range$1(x0, x1 - epsilon$2, dx).concat(x1);
	return function(y) {
		return x.map(function(x) {
			return [x, y];
		});
	};
}
function graticule() {
	var x1, x0, X1, X0, y1, y0, Y1, Y0, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
	function graticule() {
		return {
			type: "MultiLineString",
			coordinates: lines()
		};
	}
	function lines() {
		return range$1(ceil(X0 / DX) * DX, X1, DX).map(X).concat(range$1(ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(range$1(ceil(x0 / dx) * dx, x1, dx).filter(function(x) {
			return abs(x % DX) > epsilon$2;
		}).map(x)).concat(range$1(ceil(y0 / dy) * dy, y1, dy).filter(function(y) {
			return abs(y % DY) > epsilon$2;
		}).map(y));
	}
	graticule.lines = function() {
		return lines().map(function(coordinates) {
			return {
				type: "LineString",
				coordinates
			};
		});
	};
	graticule.outline = function() {
		return {
			type: "Polygon",
			coordinates: [X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1))]
		};
	};
	graticule.extent = function(_) {
		if (!arguments.length) return graticule.extentMinor();
		return graticule.extentMajor(_).extentMinor(_);
	};
	graticule.extentMajor = function(_) {
		if (!arguments.length) return [[X0, Y0], [X1, Y1]];
		X0 = +_[0][0], X1 = +_[1][0];
		Y0 = +_[0][1], Y1 = +_[1][1];
		if (X0 > X1) _ = X0, X0 = X1, X1 = _;
		if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
		return graticule.precision(precision);
	};
	graticule.extentMinor = function(_) {
		if (!arguments.length) return [[x0, y0], [x1, y1]];
		x0 = +_[0][0], x1 = +_[1][0];
		y0 = +_[0][1], y1 = +_[1][1];
		if (x0 > x1) _ = x0, x0 = x1, x1 = _;
		if (y0 > y1) _ = y0, y0 = y1, y1 = _;
		return graticule.precision(precision);
	};
	graticule.step = function(_) {
		if (!arguments.length) return graticule.stepMinor();
		return graticule.stepMajor(_).stepMinor(_);
	};
	graticule.stepMajor = function(_) {
		if (!arguments.length) return [DX, DY];
		DX = +_[0], DY = +_[1];
		return graticule;
	};
	graticule.stepMinor = function(_) {
		if (!arguments.length) return [dx, dy];
		dx = +_[0], dy = +_[1];
		return graticule;
	};
	graticule.precision = function(_) {
		if (!arguments.length) return precision;
		precision = +_;
		x = graticuleX(y0, y1, 90);
		y = graticuleY(x0, x1, precision);
		X = graticuleX(Y0, Y1, 90);
		Y = graticuleY(X0, X1, precision);
		return graticule;
	};
	return graticule.extentMajor([[-180, -90 + epsilon$2], [180, 90 - epsilon$2]]).extentMinor([[-180, -80 - epsilon$2], [180, 80 + epsilon$2]]);
}
function graticule10() {
	return graticule()();
}
//#endregion
//#region node_modules/d3-geo/src/interpolate.js
function interpolate_default(a, b) {
	var x0 = a[0] * radians, y0 = a[1] * radians, x1 = b[0] * radians, y1 = b[1] * radians, cy0 = cos(y0), sy0 = sin(y0), cy1 = cos(y1), sy1 = sin(y1), kx0 = cy0 * cos(x0), ky0 = cy0 * sin(x0), kx1 = cy1 * cos(x1), ky1 = cy1 * sin(x1), d = 2 * asin(sqrt(haversin(y1 - y0) + cy0 * cy1 * haversin(x1 - x0))), k = sin(d);
	var interpolate = d ? function(t) {
		var B = sin(t *= d) / k, A = sin(d - t) / k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
		return [atan2(y, x) * degrees, atan2(z, sqrt(x * x + y * y)) * degrees];
	} : function() {
		return [x0 * degrees, y0 * degrees];
	};
	interpolate.distance = d;
	return interpolate;
}
//#endregion
//#region node_modules/d3-geo/src/identity.js
var identity_default = (x) => x;
//#endregion
//#region node_modules/d3-geo/src/path/bounds.js
var x0 = Infinity, y0 = x0, x1 = -x0, y1 = x1;
var boundsStream = {
	point: boundsPoint,
	lineStart: noop,
	lineEnd: noop,
	polygonStart: noop,
	polygonEnd: noop,
	result: function() {
		var bounds = [[x0, y0], [x1, y1]];
		x1 = y1 = -(y0 = x0 = Infinity);
		return bounds;
	}
};
function boundsPoint(x, y) {
	if (x < x0) x0 = x;
	if (x > x1) x1 = x;
	if (y < y0) y0 = y;
	if (y > y1) y1 = y;
}
//#endregion
//#region node_modules/d3-geo/src/transform.js
function transform_default(methods) {
	return { stream: transformer(methods) };
}
function transformer(methods) {
	return function(stream) {
		var s = new TransformStream();
		for (var key in methods) s[key] = methods[key];
		s.stream = stream;
		return s;
	};
}
function TransformStream() {}
TransformStream.prototype = {
	constructor: TransformStream,
	point: function(x, y) {
		this.stream.point(x, y);
	},
	sphere: function() {
		this.stream.sphere();
	},
	lineStart: function() {
		this.stream.lineStart();
	},
	lineEnd: function() {
		this.stream.lineEnd();
	},
	polygonStart: function() {
		this.stream.polygonStart();
	},
	polygonEnd: function() {
		this.stream.polygonEnd();
	}
};
//#endregion
//#region node_modules/d3-geo/src/projection/fit.js
function fit(projection, fitBounds, object) {
	var clip = projection.clipExtent && projection.clipExtent();
	projection.scale(150).translate([0, 0]);
	if (clip != null) projection.clipExtent(null);
	stream_default(object, projection.stream(boundsStream));
	fitBounds(boundsStream.result());
	if (clip != null) projection.clipExtent(clip);
	return projection;
}
function fitExtent(projection, extent, object) {
	return fit(projection, function(b) {
		var w = extent[1][0] - extent[0][0], h = extent[1][1] - extent[0][1], k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])), x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2, y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
		projection.scale(150 * k).translate([x, y]);
	}, object);
}
function fitSize(projection, size, object) {
	return fitExtent(projection, [[0, 0], size], object);
}
function fitWidth(projection, width, object) {
	return fit(projection, function(b) {
		var w = +width, k = w / (b[1][0] - b[0][0]), x = (w - k * (b[1][0] + b[0][0])) / 2, y = -k * b[0][1];
		projection.scale(150 * k).translate([x, y]);
	}, object);
}
function fitHeight(projection, height, object) {
	return fit(projection, function(b) {
		var h = +height, k = h / (b[1][1] - b[0][1]), x = -k * b[0][0], y = (h - k * (b[1][1] + b[0][1])) / 2;
		projection.scale(150 * k).translate([x, y]);
	}, object);
}
//#endregion
//#region node_modules/d3-geo/src/projection/resample.js
var maxDepth = 16, cosMinDistance = cos(30 * radians);
function resample_default(project, delta2) {
	return +delta2 ? resample(project, delta2) : resampleNone(project);
}
function resampleNone(project) {
	return transformer({ point: function(x, y) {
		x = project(x, y);
		this.stream.point(x[0], x[1]);
	} });
}
function resample(project, delta2) {
	function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
		var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
		if (d2 > 4 * delta2 && depth--) {
			var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = sqrt(a * a + b * b + c * c), phi2 = asin(c /= m), lambda2 = abs(abs(c) - 1) < 1e-6 || abs(lambda0 - lambda1) < 1e-6 ? (lambda0 + lambda1) / 2 : atan2(b, a), p = project(lambda2, phi2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
			if (dz * dz / d2 > delta2 || abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
				resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
				stream.point(x2, y2);
				resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
			}
		}
	}
	return function(stream) {
		var lambda00, x00, y00, a00, b00, c00, lambda0, x0, y0, a0, b0, c0;
		var resampleStream = {
			point,
			lineStart,
			lineEnd,
			polygonStart: function() {
				stream.polygonStart();
				resampleStream.lineStart = ringStart;
			},
			polygonEnd: function() {
				stream.polygonEnd();
				resampleStream.lineStart = lineStart;
			}
		};
		function point(x, y) {
			x = project(x, y);
			stream.point(x[0], x[1]);
		}
		function lineStart() {
			x0 = NaN;
			resampleStream.point = linePoint;
			stream.lineStart();
		}
		function linePoint(lambda, phi) {
			var c = cartesian([lambda, phi]), p = project(lambda, phi);
			resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
			stream.point(x0, y0);
		}
		function lineEnd() {
			resampleStream.point = point;
			stream.lineEnd();
		}
		function ringStart() {
			lineStart();
			resampleStream.point = ringPoint;
			resampleStream.lineEnd = ringEnd;
		}
		function ringPoint(lambda, phi) {
			linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
			resampleStream.point = linePoint;
		}
		function ringEnd() {
			resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
			resampleStream.lineEnd = lineEnd;
			lineEnd();
		}
		return resampleStream;
	};
}
//#endregion
//#region node_modules/d3-geo/src/projection/index.js
var transformRadians = transformer({ point: function(x, y) {
	this.stream.point(x * radians, y * radians);
} });
function transformRotate(rotate) {
	return transformer({ point: function(x, y) {
		var r = rotate(x, y);
		return this.stream.point(r[0], r[1]);
	} });
}
function scaleTranslate(k, dx, dy, sx, sy) {
	function transform(x, y) {
		x *= sx;
		y *= sy;
		return [dx + k * x, dy - k * y];
	}
	transform.invert = function(x, y) {
		return [(x - dx) / k * sx, (dy - y) / k * sy];
	};
	return transform;
}
function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
	if (!alpha) return scaleTranslate(k, dx, dy, sx, sy);
	var cosAlpha = cos(alpha), sinAlpha = sin(alpha), a = cosAlpha * k, b = sinAlpha * k, ai = cosAlpha / k, bi = sinAlpha / k, ci = (sinAlpha * dy - cosAlpha * dx) / k, fi = (sinAlpha * dx + cosAlpha * dy) / k;
	function transform(x, y) {
		x *= sx;
		y *= sy;
		return [a * x - b * y + dx, dy - b * x - a * y];
	}
	transform.invert = function(x, y) {
		return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
	};
	return transform;
}
function projection(project) {
	return projectionMutator(function() {
		return project;
	})();
}
function projectionMutator(projectAt) {
	var project, k = 150, x = 480, y = 250, lambda = 0, phi = 0, deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, alpha = 0, sx = 1, sy = 1, theta = null, preclip = antimeridian_default, x0 = null, y0, x1, y1, postclip = identity_default, delta2 = .5, projectResample, projectTransform, projectRotateTransform, cache, cacheStream;
	function projection(point) {
		return projectRotateTransform(point[0] * radians, point[1] * radians);
	}
	function invert(point) {
		point = projectRotateTransform.invert(point[0], point[1]);
		return point && [point[0] * degrees, point[1] * degrees];
	}
	projection.stream = function(stream) {
		return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
	};
	projection.preclip = function(_) {
		return arguments.length ? (preclip = _, theta = void 0, reset()) : preclip;
	};
	projection.postclip = function(_) {
		return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
	};
	projection.clipAngle = function(_) {
		return arguments.length ? (preclip = +_ ? circle_default(theta = _ * radians) : (theta = null, antimeridian_default), reset()) : theta * degrees;
	};
	projection.clipExtent = function(_) {
		return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity_default) : clipRectangle(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
	};
	projection.scale = function(_) {
		return arguments.length ? (k = +_, recenter()) : k;
	};
	projection.translate = function(_) {
		return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
	};
	projection.center = function(_) {
		return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
	};
	projection.rotate = function(_) {
		return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [
			deltaLambda * degrees,
			deltaPhi * degrees,
			deltaGamma * degrees
		];
	};
	projection.angle = function(_) {
		return arguments.length ? (alpha = _ % 360 * radians, recenter()) : alpha * degrees;
	};
	projection.reflectX = function(_) {
		return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
	};
	projection.reflectY = function(_) {
		return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
	};
	projection.precision = function(_) {
		return arguments.length ? (projectResample = resample_default(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
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
	function recenter() {
		var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)), transform = scaleTranslateRotate(k, x - center[0], y - center[1], sx, sy, alpha);
		rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
		projectTransform = compose_default(project, transform);
		projectRotateTransform = compose_default(rotate, projectTransform);
		projectResample = resample_default(projectTransform, delta2);
		return reset();
	}
	function reset() {
		cache = cacheStream = null;
		return projection;
	}
	return function() {
		project = projectAt.apply(this, arguments);
		projection.invert = project.invert && invert;
		return recenter();
	};
}
//#endregion
//#region node_modules/d3-geo/src/projection/azimuthal.js
function azimuthalRaw(scale) {
	return function(x, y) {
		var cx = cos(x), cy = cos(y), k = scale(cx * cy);
		if (k === Infinity) return [2, 0];
		return [k * cy * sin(x), k * sin(y)];
	};
}
function azimuthalInvert(angle) {
	return function(x, y) {
		var z = sqrt(x * x + y * y), c = angle(z), sc = sin(c), cc = cos(c);
		return [atan2(x * sc, z * cc), asin(z && y * sc / z)];
	};
}
//#endregion
//#region node_modules/d3-geo/src/projection/mercator.js
function mercatorRaw(lambda, phi) {
	return [lambda, log(tan((halfPi + phi) / 2))];
}
mercatorRaw.invert = function(x, y) {
	return [x, 2 * atan(exp(y)) - halfPi];
};
function mercator_default() {
	return mercatorProjection(mercatorRaw).scale(961 / tau$1);
}
function mercatorProjection(project) {
	var m = projection(project), center = m.center, scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, x0 = null, y0, x1, y1;
	m.scale = function(_) {
		return arguments.length ? (scale(_), reclip()) : scale();
	};
	m.translate = function(_) {
		return arguments.length ? (translate(_), reclip()) : translate();
	};
	m.center = function(_) {
		return arguments.length ? (center(_), reclip()) : center();
	};
	m.clipExtent = function(_) {
		return arguments.length ? (_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
	};
	function reclip() {
		var k = pi * scale(), t = m(rotation_default(m.rotate()).invert([0, 0]));
		return clipExtent(x0 == null ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]] : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
	}
	return reclip();
}
//#endregion
//#region node_modules/d3-geo/src/projection/stereographic.js
function stereographicRaw(x, y) {
	var cy = cos(y), k = 1 + cos(x) * cy;
	return [cy * sin(x) / k, sin(y) / k];
}
stereographicRaw.invert = azimuthalInvert(function(z) {
	return 2 * atan(z);
});
function stereographic_default() {
	return projection(stereographicRaw).scale(250).clipAngle(142);
}
//#endregion
//#region node_modules/robust-predicates/esm/util.js
var epsilon$1 = 11102230246251565e-32;
var splitter = 134217729;
var resulterrbound = (3 + 8 * epsilon$1) * epsilon$1;
function sum(elen, e, flen, f, h) {
	let Q, Qnew, hh, bvirt;
	let enow = e[0];
	let fnow = f[0];
	let eindex = 0;
	let findex = 0;
	if (fnow > enow === fnow > -enow) {
		Q = enow;
		enow = e[++eindex];
	} else {
		Q = fnow;
		fnow = f[++findex];
	}
	let hindex = 0;
	if (eindex < elen && findex < flen) {
		if (fnow > enow === fnow > -enow) {
			Qnew = enow + Q;
			hh = Q - (Qnew - enow);
			enow = e[++eindex];
		} else {
			Qnew = fnow + Q;
			hh = Q - (Qnew - fnow);
			fnow = f[++findex];
		}
		Q = Qnew;
		if (hh !== 0) h[hindex++] = hh;
		while (eindex < elen && findex < flen) {
			if (fnow > enow === fnow > -enow) {
				Qnew = Q + enow;
				bvirt = Qnew - Q;
				hh = Q - (Qnew - bvirt) + (enow - bvirt);
				enow = e[++eindex];
			} else {
				Qnew = Q + fnow;
				bvirt = Qnew - Q;
				hh = Q - (Qnew - bvirt) + (fnow - bvirt);
				fnow = f[++findex];
			}
			Q = Qnew;
			if (hh !== 0) h[hindex++] = hh;
		}
	}
	while (eindex < elen) {
		Qnew = Q + enow;
		bvirt = Qnew - Q;
		hh = Q - (Qnew - bvirt) + (enow - bvirt);
		enow = e[++eindex];
		Q = Qnew;
		if (hh !== 0) h[hindex++] = hh;
	}
	while (findex < flen) {
		Qnew = Q + fnow;
		bvirt = Qnew - Q;
		hh = Q - (Qnew - bvirt) + (fnow - bvirt);
		fnow = f[++findex];
		Q = Qnew;
		if (hh !== 0) h[hindex++] = hh;
	}
	if (Q !== 0 || hindex === 0) h[hindex++] = Q;
	return hindex;
}
function estimate(elen, e) {
	let Q = e[0];
	for (let i = 1; i < elen; i++) Q += e[i];
	return Q;
}
function vec(n) {
	return new Float64Array(n);
}
//#endregion
//#region node_modules/robust-predicates/esm/orient2d.js
var ccwerrboundA = (3 + 16 * epsilon$1) * epsilon$1;
var ccwerrboundB = (2 + 12 * epsilon$1) * epsilon$1;
var ccwerrboundC = (9 + 64 * epsilon$1) * epsilon$1 * epsilon$1;
var B = vec(4);
var C1 = vec(8);
var C2 = vec(12);
var D = vec(16);
var u$2 = vec(4);
function orient2dadapt(ax, ay, bx, by, cx, cy, detsum) {
	let acxtail, acytail, bcxtail, bcytail;
	let bvirt, c, ahi, alo, bhi, blo, _i, _j, _0, s1, s0, t1, t0, u3;
	const acx = ax - cx;
	const bcx = bx - cx;
	const acy = ay - cy;
	const bcy = by - cy;
	s1 = acx * bcy;
	c = splitter * acx;
	ahi = c - (c - acx);
	alo = acx - ahi;
	c = splitter * bcy;
	bhi = c - (c - bcy);
	blo = bcy - bhi;
	s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
	t1 = acy * bcx;
	c = splitter * acy;
	ahi = c - (c - acy);
	alo = acy - ahi;
	c = splitter * bcx;
	bhi = c - (c - bcx);
	blo = bcx - bhi;
	t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
	_i = s0 - t0;
	bvirt = s0 - _i;
	B[0] = s0 - (_i + bvirt) + (bvirt - t0);
	_j = s1 + _i;
	bvirt = _j - s1;
	_0 = s1 - (_j - bvirt) + (_i - bvirt);
	_i = _0 - t1;
	bvirt = _0 - _i;
	B[1] = _0 - (_i + bvirt) + (bvirt - t1);
	u3 = _j + _i;
	bvirt = u3 - _j;
	B[2] = _j - (u3 - bvirt) + (_i - bvirt);
	B[3] = u3;
	let det = estimate(4, B);
	let errbound = ccwerrboundB * detsum;
	if (det >= errbound || -det >= errbound) return det;
	bvirt = ax - acx;
	acxtail = ax - (acx + bvirt) + (bvirt - cx);
	bvirt = bx - bcx;
	bcxtail = bx - (bcx + bvirt) + (bvirt - cx);
	bvirt = ay - acy;
	acytail = ay - (acy + bvirt) + (bvirt - cy);
	bvirt = by - bcy;
	bcytail = by - (bcy + bvirt) + (bvirt - cy);
	if (acxtail === 0 && acytail === 0 && bcxtail === 0 && bcytail === 0) return det;
	errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det);
	det += acx * bcytail + bcy * acxtail - (acy * bcxtail + bcx * acytail);
	if (det >= errbound || -det >= errbound) return det;
	s1 = acxtail * bcy;
	c = splitter * acxtail;
	ahi = c - (c - acxtail);
	alo = acxtail - ahi;
	c = splitter * bcy;
	bhi = c - (c - bcy);
	blo = bcy - bhi;
	s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
	t1 = acytail * bcx;
	c = splitter * acytail;
	ahi = c - (c - acytail);
	alo = acytail - ahi;
	c = splitter * bcx;
	bhi = c - (c - bcx);
	blo = bcx - bhi;
	t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
	_i = s0 - t0;
	bvirt = s0 - _i;
	u$2[0] = s0 - (_i + bvirt) + (bvirt - t0);
	_j = s1 + _i;
	bvirt = _j - s1;
	_0 = s1 - (_j - bvirt) + (_i - bvirt);
	_i = _0 - t1;
	bvirt = _0 - _i;
	u$2[1] = _0 - (_i + bvirt) + (bvirt - t1);
	u3 = _j + _i;
	bvirt = u3 - _j;
	u$2[2] = _j - (u3 - bvirt) + (_i - bvirt);
	u$2[3] = u3;
	const C1len = sum(4, B, 4, u$2, C1);
	s1 = acx * bcytail;
	c = splitter * acx;
	ahi = c - (c - acx);
	alo = acx - ahi;
	c = splitter * bcytail;
	bhi = c - (c - bcytail);
	blo = bcytail - bhi;
	s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
	t1 = acy * bcxtail;
	c = splitter * acy;
	ahi = c - (c - acy);
	alo = acy - ahi;
	c = splitter * bcxtail;
	bhi = c - (c - bcxtail);
	blo = bcxtail - bhi;
	t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
	_i = s0 - t0;
	bvirt = s0 - _i;
	u$2[0] = s0 - (_i + bvirt) + (bvirt - t0);
	_j = s1 + _i;
	bvirt = _j - s1;
	_0 = s1 - (_j - bvirt) + (_i - bvirt);
	_i = _0 - t1;
	bvirt = _0 - _i;
	u$2[1] = _0 - (_i + bvirt) + (bvirt - t1);
	u3 = _j + _i;
	bvirt = u3 - _j;
	u$2[2] = _j - (u3 - bvirt) + (_i - bvirt);
	u$2[3] = u3;
	const C2len = sum(C1len, C1, 4, u$2, C2);
	s1 = acxtail * bcytail;
	c = splitter * acxtail;
	ahi = c - (c - acxtail);
	alo = acxtail - ahi;
	c = splitter * bcytail;
	bhi = c - (c - bcytail);
	blo = bcytail - bhi;
	s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
	t1 = acytail * bcxtail;
	c = splitter * acytail;
	ahi = c - (c - acytail);
	alo = acytail - ahi;
	c = splitter * bcxtail;
	bhi = c - (c - bcxtail);
	blo = bcxtail - bhi;
	t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
	_i = s0 - t0;
	bvirt = s0 - _i;
	u$2[0] = s0 - (_i + bvirt) + (bvirt - t0);
	_j = s1 + _i;
	bvirt = _j - s1;
	_0 = s1 - (_j - bvirt) + (_i - bvirt);
	_i = _0 - t1;
	bvirt = _0 - _i;
	u$2[1] = _0 - (_i + bvirt) + (bvirt - t1);
	u3 = _j + _i;
	bvirt = u3 - _j;
	u$2[2] = _j - (u3 - bvirt) + (_i - bvirt);
	u$2[3] = u3;
	return D[sum(C2len, C2, 4, u$2, D) - 1];
}
function orient2d(ax, ay, bx, by, cx, cy) {
	const detleft = (ay - cy) * (bx - cx);
	const detright = (ax - cx) * (by - cy);
	const det = detleft - detright;
	const detsum = Math.abs(detleft + detright);
	if (Math.abs(det) >= ccwerrboundA * detsum) return det;
	return -orient2dadapt(ax, ay, bx, by, cx, cy, detsum);
}
(7 + 56 * epsilon$1) * epsilon$1;
(3 + 28 * epsilon$1) * epsilon$1;
(26 + 288 * epsilon$1) * epsilon$1 * epsilon$1;
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(8);
vec(8);
vec(8);
vec(4);
vec(8);
vec(8);
vec(16);
vec(12);
vec(192);
vec(192);
(10 + 96 * epsilon$1) * epsilon$1;
(4 + 48 * epsilon$1) * epsilon$1;
(44 + 576 * epsilon$1) * epsilon$1 * epsilon$1;
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(8);
vec(8);
vec(8);
vec(8);
vec(8);
vec(8);
vec(8);
vec(8);
vec(8);
vec(4);
vec(4);
vec(4);
vec(8);
vec(16);
vec(16);
vec(16);
vec(32);
vec(32);
vec(48);
vec(64);
vec(1152);
vec(1152);
(16 + 224 * epsilon$1) * epsilon$1;
(5 + 72 * epsilon$1) * epsilon$1;
(71 + 1408 * epsilon$1) * epsilon$1 * epsilon$1;
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(4);
vec(24);
vec(24);
vec(24);
vec(24);
vec(24);
vec(24);
vec(24);
vec(24);
vec(24);
vec(24);
vec(1152);
vec(1152);
vec(1152);
vec(1152);
vec(1152);
vec(2304);
vec(2304);
vec(3456);
vec(5760);
vec(8);
vec(8);
vec(8);
vec(16);
vec(24);
vec(48);
vec(48);
vec(96);
vec(192);
vec(384);
vec(384);
vec(384);
vec(768);
vec(96);
vec(96);
vec(96);
vec(1152);
//#endregion
//#region node_modules/delaunator/index.js
var EPSILON = Math.pow(2, -52);
var EDGE_STACK = new Uint32Array(512);
/** @template {ArrayLike<number>} T */
var Delaunator = class Delaunator {
	/**
	* Constructs a delaunay triangulation object given an array of points (`[x, y]` by default).
	* `getX` and `getY` are optional functions of the form `(point) => value` for custom point formats.
	*
	* @template P
	* @param {P[]} points
	* @param {(p: P) => number} [getX]
	* @param {(p: P) => number} [getY]
	*/
	static from(points, getX = defaultGetX, getY = defaultGetY) {
		const n = points.length;
		const coords = new Float64Array(n * 2);
		for (let i = 0; i < n; i++) {
			const p = points[i];
			coords[2 * i] = getX(p);
			coords[2 * i + 1] = getY(p);
		}
		return new Delaunator(coords);
	}
	/**
	* Constructs a delaunay triangulation object given an array of point coordinates of the form:
	* `[x0, y0, x1, y1, ...]` (use a typed array for best performance). Duplicate points are skipped.
	*
	* @param {T} coords
	*/
	constructor(coords) {
		const n = coords.length >> 1;
		if (n > 0 && typeof coords[0] !== "number") throw new Error("Expected coords to contain numbers.");
		this.coords = coords;
		const maxTriangles = Math.max(2 * n - 5, 0);
		/** @private */ this._triangles = new Uint32Array(maxTriangles * 3);
		/** @private */ this._halfedges = new Int32Array(maxTriangles * 3);
		/** @private */ this._hashSize = Math.ceil(Math.sqrt(n));
		/** @private */ this._hullPrev = new Uint32Array(n);
		/** @private */ this._hullNext = new Uint32Array(n);
		/** @private */ this._hullTri = new Uint32Array(n);
		/** @private */ this._hullHash = new Int32Array(this._hashSize);
		/** @private */ this._ids = new Uint32Array(n);
		/** @private */ this._dists = new Float64Array(n);
		/** @private */ this.trianglesLen = 0;
		/** @private */ this._cx = 0;
		/** @private */ this._cy = 0;
		/** @private */ this._hullStart = 0;
		/** A `Uint32Array` array of indices that reference points on the convex hull of the input data, counter-clockwise. */
		this.hull = this._triangles;
		/** A `Uint32Array` array of triangle vertex indices (each group of three numbers forms a triangle). All triangles are directed counterclockwise. */
		this.triangles = this._triangles;
		/**
		* A `Int32Array` array of triangle half-edge indices that allows you to traverse the triangulation.
		* `i`-th half-edge in the array corresponds to vertex `triangles[i]` the half-edge is coming from.
		* `halfedges[i]` is the index of a twin half-edge in an adjacent triangle (or `-1` for outer half-edges on the convex hull).
		*/
		this.halfedges = this._halfedges;
		this.update();
	}
	/**
	* Updates the triangulation if you modified `delaunay.coords` values in place, avoiding expensive memory allocations.
	* Useful for iterative relaxation algorithms such as Lloyd's.
	*/
	update() {
		const { coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash } = this;
		const n = coords.length >> 1;
		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;
		for (let i = 0; i < n; i++) {
			const x = coords[2 * i];
			const y = coords[2 * i + 1];
			if (x < minX) minX = x;
			if (y < minY) minY = y;
			if (x > maxX) maxX = x;
			if (y > maxY) maxY = y;
			this._ids[i] = i;
		}
		const cx = (minX + maxX) / 2;
		const cy = (minY + maxY) / 2;
		let i0 = 0, i1 = 0, i2 = 0;
		for (let i = 0, minDist = Infinity; i < n; i++) {
			const d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);
			if (d < minDist) {
				i0 = i;
				minDist = d;
			}
		}
		const i0x = coords[2 * i0];
		const i0y = coords[2 * i0 + 1];
		for (let i = 0, minDist = Infinity; i < n; i++) {
			if (i === i0) continue;
			const d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);
			if (d < minDist && d > 0) {
				i1 = i;
				minDist = d;
			}
		}
		let i1x = coords[2 * i1];
		let i1y = coords[2 * i1 + 1];
		let minRadius = Infinity;
		for (let i = 0; i < n; i++) {
			if (i === i0 || i === i1) continue;
			const r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);
			if (r < minRadius) {
				i2 = i;
				minRadius = r;
			}
		}
		let i2x = coords[2 * i2];
		let i2y = coords[2 * i2 + 1];
		if (minRadius === Infinity) {
			for (let i = 0; i < n; i++) this._dists[i] = coords[2 * i] - coords[0] || coords[2 * i + 1] - coords[1];
			quicksort(this._ids, this._dists, 0, n - 1);
			const hull = new Uint32Array(n);
			let j = 0;
			for (let i = 0, d0 = -Infinity; i < n; i++) {
				const id = this._ids[i];
				const d = this._dists[id];
				if (d > d0) {
					hull[j++] = id;
					d0 = d;
				}
			}
			this.hull = hull.subarray(0, j);
			this.triangles = new Uint32Array(0);
			this.halfedges = new Int32Array(0);
			return;
		}
		if (orient2d(i0x, i0y, i1x, i1y, i2x, i2y) < 0) {
			const i = i1;
			const x = i1x;
			const y = i1y;
			i1 = i2;
			i1x = i2x;
			i1y = i2y;
			i2 = i;
			i2x = x;
			i2y = y;
		}
		const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
		this._cx = center.x;
		this._cy = center.y;
		for (let i = 0; i < n; i++) this._dists[i] = dist(coords[2 * i], coords[2 * i + 1], center.x, center.y);
		quicksort(this._ids, this._dists, 0, n - 1);
		this._hullStart = i0;
		let hullSize = 3;
		hullNext[i0] = hullPrev[i2] = i1;
		hullNext[i1] = hullPrev[i0] = i2;
		hullNext[i2] = hullPrev[i1] = i0;
		hullTri[i0] = 0;
		hullTri[i1] = 1;
		hullTri[i2] = 2;
		hullHash.fill(-1);
		hullHash[this._hashKey(i0x, i0y)] = i0;
		hullHash[this._hashKey(i1x, i1y)] = i1;
		hullHash[this._hashKey(i2x, i2y)] = i2;
		this.trianglesLen = 0;
		this._addTriangle(i0, i1, i2, -1, -1, -1);
		for (let k = 0, xp = 0, yp = 0; k < this._ids.length; k++) {
			const i = this._ids[k];
			const x = coords[2 * i];
			const y = coords[2 * i + 1];
			if (k > 0 && Math.abs(x - xp) <= EPSILON && Math.abs(y - yp) <= EPSILON) continue;
			xp = x;
			yp = y;
			if (i === i0 || i === i1 || i === i2) continue;
			let start = 0;
			for (let j = 0, key = this._hashKey(x, y); j < this._hashSize; j++) {
				start = hullHash[(key + j) % this._hashSize];
				if (start !== -1 && start !== hullNext[start]) break;
			}
			start = hullPrev[start];
			let e = start, q;
			while (q = hullNext[e], orient2d(x, y, coords[2 * e], coords[2 * e + 1], coords[2 * q], coords[2 * q + 1]) >= 0) {
				e = q;
				if (e === start) {
					e = -1;
					break;
				}
			}
			if (e === -1) continue;
			let t = this._addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]);
			hullTri[i] = this._legalize(t + 2);
			hullTri[e] = t;
			hullSize++;
			let n = hullNext[e];
			while (q = hullNext[n], orient2d(x, y, coords[2 * n], coords[2 * n + 1], coords[2 * q], coords[2 * q + 1]) < 0) {
				t = this._addTriangle(n, i, q, hullTri[i], -1, hullTri[n]);
				hullTri[i] = this._legalize(t + 2);
				hullNext[n] = n;
				hullSize--;
				n = q;
			}
			if (e === start) while (q = hullPrev[e], orient2d(x, y, coords[2 * q], coords[2 * q + 1], coords[2 * e], coords[2 * e + 1]) < 0) {
				t = this._addTriangle(q, i, e, -1, hullTri[e], hullTri[q]);
				this._legalize(t + 2);
				hullTri[q] = t;
				hullNext[e] = e;
				hullSize--;
				e = q;
			}
			this._hullStart = hullPrev[i] = e;
			hullNext[e] = hullPrev[n] = i;
			hullNext[i] = n;
			hullHash[this._hashKey(x, y)] = i;
			hullHash[this._hashKey(coords[2 * e], coords[2 * e + 1])] = e;
		}
		this.hull = new Uint32Array(hullSize);
		for (let i = 0, e = this._hullStart; i < hullSize; i++) {
			this.hull[i] = e;
			e = hullNext[e];
		}
		this.triangles = this._triangles.subarray(0, this.trianglesLen);
		this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
	}
	/**
	* Calculate an angle-based key for the edge hash used for advancing convex hull.
	*
	* @param {number} x
	* @param {number} y
	* @private
	*/
	_hashKey(x, y) {
		return Math.floor(pseudoAngle(x - this._cx, y - this._cy) * this._hashSize) % this._hashSize;
	}
	/**
	* Flip an edge in a pair of triangles if it doesn't satisfy the Delaunay condition.
	*
	* @param {number} a
	* @private
	*/
	_legalize(a) {
		const { _triangles: triangles, _halfedges: halfedges, coords } = this;
		let i = 0;
		let ar = 0;
		while (true) {
			const b = halfedges[a];
			const a0 = a - a % 3;
			ar = a0 + (a + 2) % 3;
			if (b === -1) {
				if (i === 0) break;
				a = EDGE_STACK[--i];
				continue;
			}
			const b0 = b - b % 3;
			const al = a0 + (a + 1) % 3;
			const bl = b0 + (b + 2) % 3;
			const p0 = triangles[ar];
			const pr = triangles[a];
			const pl = triangles[al];
			const p1 = triangles[bl];
			if (inCircle(coords[2 * p0], coords[2 * p0 + 1], coords[2 * pr], coords[2 * pr + 1], coords[2 * pl], coords[2 * pl + 1], coords[2 * p1], coords[2 * p1 + 1])) {
				triangles[a] = p1;
				triangles[b] = p0;
				const hbl = halfedges[bl];
				if (hbl === -1) {
					let e = this._hullStart;
					do {
						if (this._hullTri[e] === bl) {
							this._hullTri[e] = a;
							break;
						}
						e = this._hullPrev[e];
					} while (e !== this._hullStart);
				}
				this._link(a, hbl);
				this._link(b, halfedges[ar]);
				this._link(ar, bl);
				const br = b0 + (b + 1) % 3;
				if (i < EDGE_STACK.length) EDGE_STACK[i++] = br;
			} else {
				if (i === 0) break;
				a = EDGE_STACK[--i];
			}
		}
		return ar;
	}
	/**
	* Link two half-edges to each other.
	* @param {number} a
	* @param {number} b
	* @private
	*/
	_link(a, b) {
		this._halfedges[a] = b;
		if (b !== -1) this._halfedges[b] = a;
	}
	/**
	* Add a new triangle given vertex indices and adjacent half-edge ids.
	*
	* @param {number} i0
	* @param {number} i1
	* @param {number} i2
	* @param {number} a
	* @param {number} b
	* @param {number} c
	* @private
	*/
	_addTriangle(i0, i1, i2, a, b, c) {
		const t = this.trianglesLen;
		this._triangles[t] = i0;
		this._triangles[t + 1] = i1;
		this._triangles[t + 2] = i2;
		this._link(t, a);
		this._link(t + 1, b);
		this._link(t + 2, c);
		this.trianglesLen += 3;
		return t;
	}
};
/**
* Monotonically increases with real angle, but doesn't need expensive trigonometry.
*
* @param {number} dx
* @param {number} dy
*/
function pseudoAngle(dx, dy) {
	const p = dx / (Math.abs(dx) + Math.abs(dy));
	return (dy > 0 ? 3 - p : 1 + p) / 4;
}
/**
* Squared distance between two points.
*
* @param {number} ax
* @param {number} ay
* @param {number} bx
* @param {number} by
*/
function dist(ax, ay, bx, by) {
	const dx = ax - bx;
	const dy = ay - by;
	return dx * dx + dy * dy;
}
/**
* Check whether point P is inside a circle formed by points A, B, C.
*
* @param {number} ax
* @param {number} ay
* @param {number} bx
* @param {number} by
* @param {number} cx
* @param {number} cy
* @param {number} px
* @param {number} py
*/
function inCircle(ax, ay, bx, by, cx, cy, px, py) {
	const dx = ax - px;
	const dy = ay - py;
	const ex = bx - px;
	const ey = by - py;
	const fx = cx - px;
	const fy = cy - py;
	const ap = dx * dx + dy * dy;
	const bp = ex * ex + ey * ey;
	const cp = fx * fx + fy * fy;
	return dx * (ey * cp - bp * fy) - dy * (ex * cp - bp * fx) + ap * (ex * fy - ey * fx) < 0;
}
/**
* Squared radius of the circle formed by points A, B, C.
*
* @param {number} ax
* @param {number} ay
* @param {number} bx
* @param {number} by
* @param {number} cx
* @param {number} cy
*/
function circumradius(ax, ay, bx, by, cx, cy) {
	const dx = bx - ax;
	const dy = by - ay;
	const ex = cx - ax;
	const ey = cy - ay;
	const bl = dx * dx + dy * dy;
	const cl = ex * ex + ey * ey;
	const d = .5 / (dx * ey - dy * ex);
	const x = (ey * bl - dy * cl) * d;
	const y = (dx * cl - ex * bl) * d;
	return x * x + y * y;
}
/**
* Get coordinates of a circumcenter for points A, B, C.
*
* @param {number} ax
* @param {number} ay
* @param {number} bx
* @param {number} by
* @param {number} cx
* @param {number} cy
*/
function circumcenter(ax, ay, bx, by, cx, cy) {
	const dx = bx - ax;
	const dy = by - ay;
	const ex = cx - ax;
	const ey = cy - ay;
	const bl = dx * dx + dy * dy;
	const cl = ex * ex + ey * ey;
	const d = .5 / (dx * ey - dy * ex);
	return {
		x: ax + (ey * bl - dy * cl) * d,
		y: ay + (dx * cl - ex * bl) * d
	};
}
/**
* Sort points by distance via an array of point indices and an array of calculated distances.
*
* @param {Uint32Array} ids
* @param {Float64Array} dists
* @param {number} left
* @param {number} right
*/
function quicksort(ids, dists, left, right) {
	if (right - left <= 20) for (let i = left + 1; i <= right; i++) {
		const temp = ids[i];
		const tempDist = dists[temp];
		let j = i - 1;
		while (j >= left && dists[ids[j]] > tempDist) ids[j + 1] = ids[j--];
		ids[j + 1] = temp;
	}
	else {
		const median = left + right >> 1;
		let i = left + 1;
		let j = right;
		swap(ids, median, i);
		if (dists[ids[left]] > dists[ids[right]]) swap(ids, left, right);
		if (dists[ids[i]] > dists[ids[right]]) swap(ids, i, right);
		if (dists[ids[left]] > dists[ids[i]]) swap(ids, left, i);
		const temp = ids[i];
		const tempDist = dists[temp];
		while (true) {
			do
				i++;
			while (dists[ids[i]] < tempDist);
			do
				j--;
			while (dists[ids[j]] > tempDist);
			if (j < i) break;
			swap(ids, i, j);
		}
		ids[left + 1] = ids[j];
		ids[j] = temp;
		if (right - i + 1 >= j - left) {
			quicksort(ids, dists, i, right);
			quicksort(ids, dists, left, j - 1);
		} else {
			quicksort(ids, dists, left, j - 1);
			quicksort(ids, dists, i, right);
		}
	}
}
/**
* @param {Uint32Array} arr
* @param {number} i
* @param {number} j
*/
function swap(arr, i, j) {
	const tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}
/** @param {[number, number]} p */
function defaultGetX(p) {
	return p[0];
}
/** @param {[number, number]} p */
function defaultGetY(p) {
	return p[1];
}
//#endregion
//#region node_modules/d3-delaunay/src/path.js
var epsilon = 1e-6;
var Path = class {
	constructor() {
		this._x0 = this._y0 = this._x1 = this._y1 = null;
		this._ = "";
	}
	moveTo(x, y) {
		this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
	}
	closePath() {
		if (this._x1 !== null) {
			this._x1 = this._x0, this._y1 = this._y0;
			this._ += "Z";
		}
	}
	lineTo(x, y) {
		this._ += `L${this._x1 = +x},${this._y1 = +y}`;
	}
	arc(x, y, r) {
		x = +x, y = +y, r = +r;
		const x0 = x + r;
		const y0 = y;
		if (r < 0) throw new Error("negative radius");
		if (this._x1 === null) this._ += `M${x0},${y0}`;
		else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) this._ += "L" + x0 + "," + y0;
		if (!r) return;
		this._ += `A${r},${r},0,1,1,${x - r},${y}A${r},${r},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
	}
	rect(x, y, w, h) {
		this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${+w}v${+h}h${-w}Z`;
	}
	value() {
		return this._ || null;
	}
};
//#endregion
//#region node_modules/d3-delaunay/src/polygon.js
var Polygon = class {
	constructor() {
		this._ = [];
	}
	moveTo(x, y) {
		this._.push([x, y]);
	}
	closePath() {
		this._.push(this._[0].slice());
	}
	lineTo(x, y) {
		this._.push([x, y]);
	}
	value() {
		return this._.length ? this._ : null;
	}
};
//#endregion
//#region node_modules/d3-delaunay/src/voronoi.js
var Voronoi = class {
	constructor(delaunay, [xmin, ymin, xmax, ymax] = [
		0,
		0,
		960,
		500
	]) {
		if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin))) throw new Error("invalid bounds");
		this.delaunay = delaunay;
		this._circumcenters = new Float64Array(delaunay.points.length * 2);
		this.vectors = new Float64Array(delaunay.points.length * 2);
		this.xmax = xmax, this.xmin = xmin;
		this.ymax = ymax, this.ymin = ymin;
		this._init();
	}
	update() {
		this.delaunay.update();
		this._init();
		return this;
	}
	_init() {
		const { delaunay: { points, hull, triangles }, vectors } = this;
		let bx, by;
		const circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);
		for (let i = 0, j = 0, n = triangles.length, x, y; i < n; i += 3, j += 2) {
			const t1 = triangles[i] * 2;
			const t2 = triangles[i + 1] * 2;
			const t3 = triangles[i + 2] * 2;
			const x1 = points[t1];
			const y1 = points[t1 + 1];
			const x2 = points[t2];
			const y2 = points[t2 + 1];
			const x3 = points[t3];
			const y3 = points[t3 + 1];
			const dx = x2 - x1;
			const dy = y2 - y1;
			const ex = x3 - x1;
			const ey = y3 - y1;
			const ab = (dx * ey - dy * ex) * 2;
			if (Math.abs(ab) < 1e-9) {
				if (bx === void 0) {
					bx = by = 0;
					for (const i of hull) bx += points[i * 2], by += points[i * 2 + 1];
					bx /= hull.length, by /= hull.length;
				}
				const a = 1e9 * Math.sign((bx - x1) * ey - (by - y1) * ex);
				x = (x1 + x3) / 2 - a * ey;
				y = (y1 + y3) / 2 + a * ex;
			} else {
				const d = 1 / ab;
				const bl = dx * dx + dy * dy;
				const cl = ex * ex + ey * ey;
				x = x1 + (ey * bl - dy * cl) * d;
				y = y1 + (dx * cl - ex * bl) * d;
			}
			circumcenters[j] = x;
			circumcenters[j + 1] = y;
		}
		let h = hull[hull.length - 1];
		let p0, p1 = h * 4;
		let x0, x1 = points[2 * h];
		let y0, y1 = points[2 * h + 1];
		vectors.fill(0);
		for (let i = 0; i < hull.length; ++i) {
			h = hull[i];
			p0 = p1, x0 = x1, y0 = y1;
			p1 = h * 4, x1 = points[2 * h], y1 = points[2 * h + 1];
			vectors[p0 + 2] = vectors[p1] = y0 - y1;
			vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
		}
	}
	render(context) {
		const buffer = context == null ? context = new Path() : void 0;
		const { delaunay: { halfedges, inedges, hull }, circumcenters, vectors } = this;
		if (hull.length <= 1) return null;
		for (let i = 0, n = halfedges.length; i < n; ++i) {
			const j = halfedges[i];
			if (j < i) continue;
			const ti = Math.floor(i / 3) * 2;
			const tj = Math.floor(j / 3) * 2;
			const xi = circumcenters[ti];
			const yi = circumcenters[ti + 1];
			const xj = circumcenters[tj];
			const yj = circumcenters[tj + 1];
			this._renderSegment(xi, yi, xj, yj, context);
		}
		let h0, h1 = hull[hull.length - 1];
		for (let i = 0; i < hull.length; ++i) {
			h0 = h1, h1 = hull[i];
			const t = Math.floor(inedges[h1] / 3) * 2;
			const x = circumcenters[t];
			const y = circumcenters[t + 1];
			const v = h0 * 4;
			const p = this._project(x, y, vectors[v + 2], vectors[v + 3]);
			if (p) this._renderSegment(x, y, p[0], p[1], context);
		}
		return buffer && buffer.value();
	}
	renderBounds(context) {
		const buffer = context == null ? context = new Path() : void 0;
		context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
		return buffer && buffer.value();
	}
	renderCell(i, context) {
		const buffer = context == null ? context = new Path() : void 0;
		const points = this._clip(i);
		if (points === null || !points.length) return;
		context.moveTo(points[0], points[1]);
		let n = points.length;
		while (points[0] === points[n - 2] && points[1] === points[n - 1] && n > 1) n -= 2;
		for (let i = 2; i < n; i += 2) if (points[i] !== points[i - 2] || points[i + 1] !== points[i - 1]) context.lineTo(points[i], points[i + 1]);
		context.closePath();
		return buffer && buffer.value();
	}
	*cellPolygons() {
		const { delaunay: { points } } = this;
		for (let i = 0, n = points.length / 2; i < n; ++i) {
			const cell = this.cellPolygon(i);
			if (cell) cell.index = i, yield cell;
		}
	}
	cellPolygon(i) {
		const polygon = new Polygon();
		this.renderCell(i, polygon);
		return polygon.value();
	}
	_renderSegment(x0, y0, x1, y1, context) {
		let S;
		const c0 = this._regioncode(x0, y0);
		const c1 = this._regioncode(x1, y1);
		if (c0 === 0 && c1 === 0) {
			context.moveTo(x0, y0);
			context.lineTo(x1, y1);
		} else if (S = this._clipSegment(x0, y0, x1, y1, c0, c1)) {
			context.moveTo(S[0], S[1]);
			context.lineTo(S[2], S[3]);
		}
	}
	contains(i, x, y) {
		if ((x = +x, x !== x) || (y = +y, y !== y)) return false;
		return this.delaunay._step(i, x, y) === i;
	}
	*neighbors(i) {
		const ci = this._clip(i);
		if (ci) for (const j of this.delaunay.neighbors(i)) {
			const cj = this._clip(j);
			if (cj) {
				loop: for (let ai = 0, li = ci.length; ai < li; ai += 2) for (let aj = 0, lj = cj.length; aj < lj; aj += 2) if (ci[ai] === cj[aj] && ci[ai + 1] === cj[aj + 1] && ci[(ai + 2) % li] === cj[(aj + lj - 2) % lj] && ci[(ai + 3) % li] === cj[(aj + lj - 1) % lj]) {
					yield j;
					break loop;
				}
			}
		}
	}
	_cell(i) {
		const { circumcenters, delaunay: { inedges, halfedges, triangles } } = this;
		const e0 = inedges[i];
		if (e0 === -1) return null;
		const points = [];
		let e = e0;
		do {
			const t = Math.floor(e / 3);
			points.push(circumcenters[t * 2], circumcenters[t * 2 + 1]);
			e = e % 3 === 2 ? e - 2 : e + 1;
			if (triangles[e] !== i) break;
			e = halfedges[e];
		} while (e !== e0 && e !== -1);
		return points;
	}
	_clip(i) {
		if (i === 0 && this.delaunay.hull.length === 1) return [
			this.xmax,
			this.ymin,
			this.xmax,
			this.ymax,
			this.xmin,
			this.ymax,
			this.xmin,
			this.ymin
		];
		const points = this._cell(i);
		if (points === null) return null;
		const { vectors: V } = this;
		const v = i * 4;
		return this._simplify(V[v] || V[v + 1] ? this._clipInfinite(i, points, V[v], V[v + 1], V[v + 2], V[v + 3]) : this._clipFinite(i, points));
	}
	_clipFinite(i, points) {
		const n = points.length;
		let P = null;
		let x0, y0, x1 = points[n - 2], y1 = points[n - 1];
		let c0, c1 = this._regioncode(x1, y1);
		let e0, e1 = 0;
		for (let j = 0; j < n; j += 2) {
			x0 = x1, y0 = y1, x1 = points[j], y1 = points[j + 1];
			c0 = c1, c1 = this._regioncode(x1, y1);
			if (c0 === 0 && c1 === 0) {
				e0 = e1, e1 = 0;
				if (P) P.push(x1, y1);
				else P = [x1, y1];
			} else {
				let S, sx0, sy0, sx1, sy1;
				if (c0 === 0) {
					if ((S = this._clipSegment(x0, y0, x1, y1, c0, c1)) === null) continue;
					[sx0, sy0, sx1, sy1] = S;
				} else {
					if ((S = this._clipSegment(x1, y1, x0, y0, c1, c0)) === null) continue;
					[sx1, sy1, sx0, sy0] = S;
					e0 = e1, e1 = this._edgecode(sx0, sy0);
					if (e0 && e1) this._edge(i, e0, e1, P, P.length);
					if (P) P.push(sx0, sy0);
					else P = [sx0, sy0];
				}
				e0 = e1, e1 = this._edgecode(sx1, sy1);
				if (e0 && e1) this._edge(i, e0, e1, P, P.length);
				if (P) P.push(sx1, sy1);
				else P = [sx1, sy1];
			}
		}
		if (P) {
			e0 = e1, e1 = this._edgecode(P[0], P[1]);
			if (e0 && e1) this._edge(i, e0, e1, P, P.length);
		} else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) return [
			this.xmax,
			this.ymin,
			this.xmax,
			this.ymax,
			this.xmin,
			this.ymax,
			this.xmin,
			this.ymin
		];
		return P;
	}
	_clipSegment(x0, y0, x1, y1, c0, c1) {
		const flip = c0 < c1;
		if (flip) [x0, y0, x1, y1, c0, c1] = [
			x1,
			y1,
			x0,
			y0,
			c1,
			c0
		];
		while (true) {
			if (c0 === 0 && c1 === 0) return flip ? [
				x1,
				y1,
				x0,
				y0
			] : [
				x0,
				y0,
				x1,
				y1
			];
			if (c0 & c1) return null;
			let x, y, c = c0 || c1;
			if (c & 8) x = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y = this.ymax;
			else if (c & 4) x = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y = this.ymin;
			else if (c & 2) y = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x = this.xmax;
			else y = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x = this.xmin;
			if (c0) x0 = x, y0 = y, c0 = this._regioncode(x0, y0);
			else x1 = x, y1 = y, c1 = this._regioncode(x1, y1);
		}
	}
	_clipInfinite(i, points, vx0, vy0, vxn, vyn) {
		let P = Array.from(points), p;
		if (p = this._project(P[0], P[1], vx0, vy0)) P.unshift(p[0], p[1]);
		if (p = this._project(P[P.length - 2], P[P.length - 1], vxn, vyn)) P.push(p[0], p[1]);
		if (P = this._clipFinite(i, P)) for (let j = 0, n = P.length, c0, c1 = this._edgecode(P[n - 2], P[n - 1]); j < n; j += 2) {
			c0 = c1, c1 = this._edgecode(P[j], P[j + 1]);
			if (c0 && c1) j = this._edge(i, c0, c1, P, j), n = P.length;
		}
		else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) P = [
			this.xmin,
			this.ymin,
			this.xmax,
			this.ymin,
			this.xmax,
			this.ymax,
			this.xmin,
			this.ymax
		];
		return P;
	}
	_edge(i, e0, e1, P, j) {
		while (e0 !== e1) {
			let x, y;
			switch (e0) {
				case 5:
					e0 = 4;
					continue;
				case 4:
					e0 = 6, x = this.xmax, y = this.ymin;
					break;
				case 6:
					e0 = 2;
					continue;
				case 2:
					e0 = 10, x = this.xmax, y = this.ymax;
					break;
				case 10:
					e0 = 8;
					continue;
				case 8:
					e0 = 9, x = this.xmin, y = this.ymax;
					break;
				case 9:
					e0 = 1;
					continue;
				case 1:
					e0 = 5, x = this.xmin, y = this.ymin;
					break;
			}
			if ((P[j] !== x || P[j + 1] !== y) && this.contains(i, x, y)) P.splice(j, 0, x, y), j += 2;
		}
		return j;
	}
	_project(x0, y0, vx, vy) {
		let t = Infinity, c, x, y;
		if (vy < 0) {
			if (y0 <= this.ymin) return null;
			if ((c = (this.ymin - y0) / vy) < t) y = this.ymin, x = x0 + (t = c) * vx;
		} else if (vy > 0) {
			if (y0 >= this.ymax) return null;
			if ((c = (this.ymax - y0) / vy) < t) y = this.ymax, x = x0 + (t = c) * vx;
		}
		if (vx > 0) {
			if (x0 >= this.xmax) return null;
			if ((c = (this.xmax - x0) / vx) < t) x = this.xmax, y = y0 + (t = c) * vy;
		} else if (vx < 0) {
			if (x0 <= this.xmin) return null;
			if ((c = (this.xmin - x0) / vx) < t) x = this.xmin, y = y0 + (t = c) * vy;
		}
		return [x, y];
	}
	_edgecode(x, y) {
		return (x === this.xmin ? 1 : x === this.xmax ? 2 : 0) | (y === this.ymin ? 4 : y === this.ymax ? 8 : 0);
	}
	_regioncode(x, y) {
		return (x < this.xmin ? 1 : x > this.xmax ? 2 : 0) | (y < this.ymin ? 4 : y > this.ymax ? 8 : 0);
	}
	_simplify(P) {
		if (P && P.length > 4) {
			for (let i = 0; i < P.length; i += 2) {
				const j = (i + 2) % P.length, k = (i + 4) % P.length;
				if (P[i] === P[j] && P[j] === P[k] || P[i + 1] === P[j + 1] && P[j + 1] === P[k + 1]) P.splice(j, 2), i -= 2;
			}
			if (!P.length) P = null;
		}
		return P;
	}
};
//#endregion
//#region node_modules/d3-delaunay/src/delaunay.js
var tau = 2 * Math.PI, pow = Math.pow;
function pointX(p) {
	return p[0];
}
function pointY(p) {
	return p[1];
}
function collinear(d) {
	const { triangles, coords } = d;
	for (let i = 0; i < triangles.length; i += 3) {
		const a = 2 * triangles[i], b = 2 * triangles[i + 1], c = 2 * triangles[i + 2];
		if ((coords[c] - coords[a]) * (coords[b + 1] - coords[a + 1]) - (coords[b] - coords[a]) * (coords[c + 1] - coords[a + 1]) > 1e-10) return false;
	}
	return true;
}
function jitter(x, y, r) {
	return [x + Math.sin(x + y) * r, y + Math.cos(x - y) * r];
}
var Delaunay = class Delaunay {
	static from(points, fx = pointX, fy = pointY, that) {
		return new Delaunay("length" in points ? flatArray(points, fx, fy, that) : Float64Array.from(flatIterable(points, fx, fy, that)));
	}
	constructor(points) {
		this._delaunator = new Delaunator(points);
		this.inedges = new Int32Array(points.length / 2);
		this._hullIndex = new Int32Array(points.length / 2);
		this.points = this._delaunator.coords;
		this._init();
	}
	update() {
		this._delaunator.update();
		this._init();
		return this;
	}
	_init() {
		const d = this._delaunator, points = this.points;
		if (d.hull && d.hull.length > 2 && collinear(d)) {
			this.collinear = Int32Array.from({ length: points.length / 2 }, (_, i) => i).sort((i, j) => points[2 * i] - points[2 * j] || points[2 * i + 1] - points[2 * j + 1]);
			const e = this.collinear[0], f = this.collinear[this.collinear.length - 1], bounds = [
				points[2 * e],
				points[2 * e + 1],
				points[2 * f],
				points[2 * f + 1]
			], r = 1e-8 * Math.hypot(bounds[3] - bounds[1], bounds[2] - bounds[0]);
			for (let i = 0, n = points.length / 2; i < n; ++i) {
				const p = jitter(points[2 * i], points[2 * i + 1], r);
				points[2 * i] = p[0];
				points[2 * i + 1] = p[1];
			}
			this._delaunator = new Delaunator(points);
		} else delete this.collinear;
		const halfedges = this.halfedges = this._delaunator.halfedges;
		const hull = this.hull = this._delaunator.hull;
		const triangles = this.triangles = this._delaunator.triangles;
		const inedges = this.inedges.fill(-1);
		const hullIndex = this._hullIndex.fill(-1);
		for (let e = 0, n = halfedges.length; e < n; ++e) {
			const p = triangles[e % 3 === 2 ? e - 2 : e + 1];
			if (halfedges[e] === -1 || inedges[p] === -1) inedges[p] = e;
		}
		for (let i = 0, n = hull.length; i < n; ++i) hullIndex[hull[i]] = i;
		if (hull.length <= 2 && hull.length > 0) {
			this.triangles = new Int32Array(3).fill(-1);
			this.halfedges = new Int32Array(3).fill(-1);
			this.triangles[0] = hull[0];
			inedges[hull[0]] = 1;
			if (hull.length === 2) {
				inedges[hull[1]] = 0;
				this.triangles[1] = hull[1];
				this.triangles[2] = hull[1];
			}
		}
	}
	voronoi(bounds) {
		return new Voronoi(this, bounds);
	}
	*neighbors(i) {
		const { inedges, hull, _hullIndex, halfedges, triangles, collinear } = this;
		if (collinear) {
			const l = collinear.indexOf(i);
			if (l > 0) yield collinear[l - 1];
			if (l < collinear.length - 1) yield collinear[l + 1];
			return;
		}
		const e0 = inedges[i];
		if (e0 === -1) return;
		let e = e0, p0 = -1;
		do {
			yield p0 = triangles[e];
			e = e % 3 === 2 ? e - 2 : e + 1;
			if (triangles[e] !== i) return;
			e = halfedges[e];
			if (e === -1) {
				const p = hull[(_hullIndex[i] + 1) % hull.length];
				if (p !== p0) yield p;
				return;
			}
		} while (e !== e0);
	}
	find(x, y, i = 0) {
		if ((x = +x, x !== x) || (y = +y, y !== y)) return -1;
		const i0 = i;
		let c;
		while ((c = this._step(i, x, y)) >= 0 && c !== i && c !== i0) i = c;
		return c;
	}
	_step(i, x, y) {
		const { inedges, hull, _hullIndex, halfedges, triangles, points } = this;
		if (inedges[i] === -1 || !points.length) return (i + 1) % (points.length >> 1);
		let c = i;
		let dc = pow(x - points[i * 2], 2) + pow(y - points[i * 2 + 1], 2);
		const e0 = inedges[i];
		let e = e0;
		do {
			let t = triangles[e];
			const dt = pow(x - points[t * 2], 2) + pow(y - points[t * 2 + 1], 2);
			if (dt < dc) dc = dt, c = t;
			e = e % 3 === 2 ? e - 2 : e + 1;
			if (triangles[e] !== i) break;
			e = halfedges[e];
			if (e === -1) {
				e = hull[(_hullIndex[i] + 1) % hull.length];
				if (e !== t) {
					if (pow(x - points[e * 2], 2) + pow(y - points[e * 2 + 1], 2) < dc) return e;
				}
				break;
			}
		} while (e !== e0);
		return c;
	}
	render(context) {
		const buffer = context == null ? context = new Path() : void 0;
		const { points, halfedges, triangles } = this;
		for (let i = 0, n = halfedges.length; i < n; ++i) {
			const j = halfedges[i];
			if (j < i) continue;
			const ti = triangles[i] * 2;
			const tj = triangles[j] * 2;
			context.moveTo(points[ti], points[ti + 1]);
			context.lineTo(points[tj], points[tj + 1]);
		}
		this.renderHull(context);
		return buffer && buffer.value();
	}
	renderPoints(context, r) {
		if (r === void 0 && (!context || typeof context.moveTo !== "function")) r = context, context = null;
		r = r == void 0 ? 2 : +r;
		const buffer = context == null ? context = new Path() : void 0;
		const { points } = this;
		for (let i = 0, n = points.length; i < n; i += 2) {
			const x = points[i], y = points[i + 1];
			context.moveTo(x + r, y);
			context.arc(x, y, r, 0, tau);
		}
		return buffer && buffer.value();
	}
	renderHull(context) {
		const buffer = context == null ? context = new Path() : void 0;
		const { hull, points } = this;
		const h = hull[0] * 2, n = hull.length;
		context.moveTo(points[h], points[h + 1]);
		for (let i = 1; i < n; ++i) {
			const h = 2 * hull[i];
			context.lineTo(points[h], points[h + 1]);
		}
		context.closePath();
		return buffer && buffer.value();
	}
	hullPolygon() {
		const polygon = new Polygon();
		this.renderHull(polygon);
		return polygon.value();
	}
	renderTriangle(i, context) {
		const buffer = context == null ? context = new Path() : void 0;
		const { points, triangles } = this;
		const t0 = triangles[i *= 3] * 2;
		const t1 = triangles[i + 1] * 2;
		const t2 = triangles[i + 2] * 2;
		context.moveTo(points[t0], points[t0 + 1]);
		context.lineTo(points[t1], points[t1 + 1]);
		context.lineTo(points[t2], points[t2 + 1]);
		context.closePath();
		return buffer && buffer.value();
	}
	*trianglePolygons() {
		const { triangles } = this;
		for (let i = 0, n = triangles.length / 3; i < n; ++i) yield this.trianglePolygon(i);
	}
	trianglePolygon(i) {
		const polygon = new Polygon();
		this.renderTriangle(i, polygon);
		return polygon.value();
	}
};
function flatArray(points, fx, fy, that) {
	const n = points.length;
	const array = new Float64Array(n * 2);
	for (let i = 0; i < n; ++i) {
		const p = points[i];
		array[i * 2] = fx.call(that, p, i, points);
		array[i * 2 + 1] = fy.call(that, p, i, points);
	}
	return array;
}
function* flatIterable(points, fx, fy, that) {
	let i = 0;
	for (const p of points) {
		yield fx.call(that, p, i, points);
		yield fy.call(that, p, i, points);
		++i;
	}
}
//#endregion
//#region node_modules/d3-scale-chromatic/src/sequential-multi/turbo.js
function turbo_default(t) {
	t = Math.max(0, Math.min(1, t));
	return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66))))))) + ")";
}
var namespaces_default = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
//#endregion
//#region node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
	var prefix = name += "", i = prefix.indexOf(":");
	if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	return namespaces_default.hasOwnProperty(prefix) ? {
		space: namespaces_default[prefix],
		local: name
	} : name;
}
//#endregion
//#region node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
	return function() {
		var document = this.ownerDocument, uri = this.namespaceURI;
		return uri === "http://www.w3.org/1999/xhtml" && document.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? document.createElement(name) : document.createElementNS(uri, name);
	};
}
function creatorFixed(fullname) {
	return function() {
		return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	};
}
function creator_default(name) {
	var fullname = namespace_default(name);
	return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
//#endregion
//#region node_modules/d3-selection/src/selector.js
function none() {}
function selector_default(selector) {
	return selector == null ? none : function() {
		return this.querySelector(selector);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/select.js
function select_default$1(select) {
	if (typeof select !== "function") select = selector_default(select);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
		if ("__data__" in node) subnode.__data__ = node.__data__;
		subgroup[i] = subnode;
	}
	return new Selection(subgroups, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/array.js
function array(x) {
	return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
//#endregion
//#region node_modules/d3-selection/src/selectorAll.js
function empty() {
	return [];
}
function selectorAll_default(selector) {
	return selector == null ? empty : function() {
		return this.querySelectorAll(selector);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
	return function() {
		return array(select.apply(this, arguments));
	};
}
function selectAll_default(select) {
	if (typeof select === "function") select = arrayAll(select);
	else select = selectorAll_default(select);
	for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
		subgroups.push(select.call(node, node.__data__, i, group));
		parents.push(node);
	}
	return new Selection(subgroups, parents);
}
//#endregion
//#region node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
	return function() {
		return this.matches(selector);
	};
}
function childMatcher(selector) {
	return function(node) {
		return node.matches(selector);
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
	return function() {
		return find.call(this.children, match);
	};
}
function childFirst() {
	return this.firstElementChild;
}
function selectChild_default(match) {
	return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
//#endregion
//#region node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
	return Array.from(this.children);
}
function childrenFilter(match) {
	return function() {
		return filter.call(this.children, match);
	};
}
function selectChildren_default(match) {
	return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
//#endregion
//#region node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
	if (typeof match !== "function") match = matcher_default(match);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
	return new Selection(subgroups, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
	return new Array(update.length);
}
//#endregion
//#region node_modules/d3-selection/src/selection/enter.js
function enter_default() {
	return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum) {
	this.ownerDocument = parent.ownerDocument;
	this.namespaceURI = parent.namespaceURI;
	this._next = null;
	this._parent = parent;
	this.__data__ = datum;
}
EnterNode.prototype = {
	constructor: EnterNode,
	appendChild: function(child) {
		return this._parent.insertBefore(child, this._next);
	},
	insertBefore: function(child, next) {
		return this._parent.insertBefore(child, next);
	},
	querySelector: function(selector) {
		return this._parent.querySelector(selector);
	},
	querySelectorAll: function(selector) {
		return this._parent.querySelectorAll(selector);
	}
};
//#endregion
//#region node_modules/d3-selection/src/constant.js
function constant_default(x) {
	return function() {
		return x;
	};
}
//#endregion
//#region node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update, exit, data) {
	var i = 0, node, groupLength = group.length, dataLength = data.length;
	for (; i < dataLength; ++i) if (node = group[i]) {
		node.__data__ = data[i];
		update[i] = node;
	} else enter[i] = new EnterNode(parent, data[i]);
	for (; i < groupLength; ++i) if (node = group[i]) exit[i] = node;
}
function bindKey(parent, group, enter, update, exit, data, key) {
	var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
	for (i = 0; i < groupLength; ++i) if (node = group[i]) {
		keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
		if (nodeByKeyValue.has(keyValue)) exit[i] = node;
		else nodeByKeyValue.set(keyValue, node);
	}
	for (i = 0; i < dataLength; ++i) {
		keyValue = key.call(parent, data[i], i, data) + "";
		if (node = nodeByKeyValue.get(keyValue)) {
			update[i] = node;
			node.__data__ = data[i];
			nodeByKeyValue.delete(keyValue);
		} else enter[i] = new EnterNode(parent, data[i]);
	}
	for (i = 0; i < groupLength; ++i) if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) exit[i] = node;
}
function datum(node) {
	return node.__data__;
}
function data_default(value, key) {
	if (!arguments.length) return Array.from(this, datum);
	var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
	if (typeof value !== "function") value = constant_default(value);
	for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
		var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength);
		bind(parent, group, enterGroup, updateGroup, exit[j] = new Array(groupLength), data, key);
		for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) if (previous = enterGroup[i0]) {
			if (i0 >= i1) i1 = i0 + 1;
			while (!(next = updateGroup[i1]) && ++i1 < dataLength);
			previous._next = next || null;
		}
	}
	update = new Selection(update, parents);
	update._enter = enter;
	update._exit = exit;
	return update;
}
function arraylike(data) {
	return typeof data === "object" && "length" in data ? data : Array.from(data);
}
//#endregion
//#region node_modules/d3-selection/src/selection/exit.js
function exit_default() {
	return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
	var enter = this.enter(), update = this, exit = this.exit();
	if (typeof onenter === "function") {
		enter = onenter(enter);
		if (enter) enter = enter.selection();
	} else enter = enter.append(onenter + "");
	if (onupdate != null) {
		update = onupdate(update);
		if (update) update = update.selection();
	}
	if (onexit == null) exit.remove();
	else onexit(exit);
	return enter && update ? enter.merge(update).order() : update;
}
//#endregion
//#region node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
	var selection = context.selection ? context.selection() : context;
	for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group0[i] || group1[i]) merge[i] = node;
	for (; j < m0; ++j) merges[j] = groups0[j];
	return new Selection(merges, this._parents);
}
//#endregion
//#region node_modules/d3-selection/src/selection/order.js
function order_default() {
	for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) if (node = group[i]) {
		if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
		next = node;
	}
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
	if (!compare) compare = ascending;
	function compareNode(a, b) {
		return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	}
	for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
		for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group[i]) sortgroup[i] = node;
		sortgroup.sort(compareNode);
	}
	return new Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
	return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
//#endregion
//#region node_modules/d3-selection/src/selection/call.js
function call_default() {
	var callback = arguments[0];
	arguments[0] = this;
	callback.apply(null, arguments);
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
	return Array.from(this);
}
//#endregion
//#region node_modules/d3-selection/src/selection/node.js
function node_default() {
	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
		var node = group[i];
		if (node) return node;
	}
	return null;
}
//#endregion
//#region node_modules/d3-selection/src/selection/size.js
function size_default() {
	let size = 0;
	for (const node of this) ++size;
	return size;
}
//#endregion
//#region node_modules/d3-selection/src/selection/empty.js
function empty_default() {
	return !this.node();
}
//#endregion
//#region node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) if (node = group[i]) callback.call(node, node.__data__, i, group);
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/attr.js
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
function attrConstant(name, value) {
	return function() {
		this.setAttribute(name, value);
	};
}
function attrConstantNS(fullname, value) {
	return function() {
		this.setAttributeNS(fullname.space, fullname.local, value);
	};
}
function attrFunction(name, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) this.removeAttribute(name);
		else this.setAttribute(name, v);
	};
}
function attrFunctionNS(fullname, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
		else this.setAttributeNS(fullname.space, fullname.local, v);
	};
}
function attr_default(name, value) {
	var fullname = namespace_default(name);
	if (arguments.length < 2) {
		var node = this.node();
		return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
	}
	return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
//#endregion
//#region node_modules/d3-selection/src/window.js
function window_default(node) {
	return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
//#endregion
//#region node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
	return function() {
		this.style.removeProperty(name);
	};
}
function styleConstant(name, value, priority) {
	return function() {
		this.style.setProperty(name, value, priority);
	};
}
function styleFunction(name, value, priority) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) this.style.removeProperty(name);
		else this.style.setProperty(name, v, priority);
	};
}
function style_default(name, value, priority) {
	return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
	return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}
//#endregion
//#region node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
	return function() {
		delete this[name];
	};
}
function propertyConstant(name, value) {
	return function() {
		this[name] = value;
	};
}
function propertyFunction(name, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (v == null) delete this[name];
		else this[name] = v;
	};
}
function property_default(name, value) {
	return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
//#endregion
//#region node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
	return string.trim().split(/^|\s+/);
}
function classList(node) {
	return node.classList || new ClassList(node);
}
function ClassList(node) {
	this._node = node;
	this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
	add: function(name) {
		if (this._names.indexOf(name) < 0) {
			this._names.push(name);
			this._node.setAttribute("class", this._names.join(" "));
		}
	},
	remove: function(name) {
		var i = this._names.indexOf(name);
		if (i >= 0) {
			this._names.splice(i, 1);
			this._node.setAttribute("class", this._names.join(" "));
		}
	},
	contains: function(name) {
		return this._names.indexOf(name) >= 0;
	}
};
function classedAdd(node, names) {
	var list = classList(node), i = -1, n = names.length;
	while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
	var list = classList(node), i = -1, n = names.length;
	while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
	return function() {
		classedAdd(this, names);
	};
}
function classedFalse(names) {
	return function() {
		classedRemove(this, names);
	};
}
function classedFunction(names, value) {
	return function() {
		(value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	};
}
function classed_default(name, value) {
	var names = classArray(name + "");
	if (arguments.length < 2) {
		var list = classList(this.node()), i = -1, n = names.length;
		while (++i < n) if (!list.contains(names[i])) return false;
		return true;
	}
	return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
//#endregion
//#region node_modules/d3-selection/src/selection/text.js
function textRemove() {
	this.textContent = "";
}
function textConstant(value) {
	return function() {
		this.textContent = value;
	};
}
function textFunction(value) {
	return function() {
		var v = value.apply(this, arguments);
		this.textContent = v == null ? "" : v;
	};
}
function text_default(value) {
	return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
//#endregion
//#region node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
	this.innerHTML = "";
}
function htmlConstant(value) {
	return function() {
		this.innerHTML = value;
	};
}
function htmlFunction(value) {
	return function() {
		var v = value.apply(this, arguments);
		this.innerHTML = v == null ? "" : v;
	};
}
function html_default(value) {
	return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
//#endregion
//#region node_modules/d3-selection/src/selection/raise.js
function raise() {
	if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
	return this.each(raise);
}
//#endregion
//#region node_modules/d3-selection/src/selection/lower.js
function lower() {
	if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
	return this.each(lower);
}
//#endregion
//#region node_modules/d3-selection/src/selection/append.js
function append_default(name) {
	var create = typeof name === "function" ? name : creator_default(name);
	return this.select(function() {
		return this.appendChild(create.apply(this, arguments));
	});
}
//#endregion
//#region node_modules/d3-selection/src/selection/insert.js
function constantNull() {
	return null;
}
function insert_default(name, before) {
	var create = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
	return this.select(function() {
		return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	});
}
//#endregion
//#region node_modules/d3-selection/src/selection/remove.js
function remove() {
	var parent = this.parentNode;
	if (parent) parent.removeChild(this);
}
function remove_default() {
	return this.each(remove);
}
//#endregion
//#region node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
	var clone = this.cloneNode(false), parent = this.parentNode;
	return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
	var clone = this.cloneNode(true), parent = this.parentNode;
	return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
	return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
//#endregion
//#region node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
	return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
//#endregion
//#region node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
	return function(event) {
		listener.call(this, event, this.__data__);
	};
}
function parseTypenames(typenames) {
	return typenames.trim().split(/^|\s+/).map(function(t) {
		var name = "", i = t.indexOf(".");
		if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
		return {
			type: t,
			name
		};
	});
}
function onRemove(typename) {
	return function() {
		var on = this.__on;
		if (!on) return;
		for (var j = 0, i = -1, m = on.length, o; j < m; ++j) if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) this.removeEventListener(o.type, o.listener, o.options);
		else on[++i] = o;
		if (++i) on.length = i;
		else delete this.__on;
	};
}
function onAdd(typename, value, options) {
	return function() {
		var on = this.__on, o, listener = contextListener(value);
		if (on) {
			for (var j = 0, m = on.length; j < m; ++j) if ((o = on[j]).type === typename.type && o.name === typename.name) {
				this.removeEventListener(o.type, o.listener, o.options);
				this.addEventListener(o.type, o.listener = listener, o.options = options);
				o.value = value;
				return;
			}
		}
		this.addEventListener(typename.type, listener, options);
		o = {
			type: typename.type,
			name: typename.name,
			value,
			listener,
			options
		};
		if (!on) this.__on = [o];
		else on.push(o);
	};
}
function on_default(typename, value, options) {
	var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
	if (arguments.length < 2) {
		var on = this.node().__on;
		if (on) {
			for (var j = 0, m = on.length, o; j < m; ++j) for (i = 0, o = on[j]; i < n; ++i) if ((t = typenames[i]).type === o.type && t.name === o.name) return o.value;
		}
		return;
	}
	on = value ? onAdd : onRemove;
	for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
	return this;
}
//#endregion
//#region node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type, params) {
	var window = window_default(node), event = window.CustomEvent;
	if (typeof event === "function") event = new event(type, params);
	else {
		event = window.document.createEvent("Event");
		if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
		else event.initEvent(type, false, false);
	}
	node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
	return function() {
		return dispatchEvent(this, type, params);
	};
}
function dispatchFunction(type, params) {
	return function() {
		return dispatchEvent(this, type, params.apply(this, arguments));
	};
}
function dispatch_default(type, params) {
	return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
//#endregion
//#region node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
	for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) if (node = group[i]) yield node;
}
//#endregion
//#region node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups, parents) {
	this._groups = groups;
	this._parents = parents;
}
function selection() {
	return new Selection([[document.documentElement]], root);
}
function selection_selection() {
	return this;
}
Selection.prototype = selection.prototype = {
	constructor: Selection,
	select: select_default$1,
	selectAll: selectAll_default,
	selectChild: selectChild_default,
	selectChildren: selectChildren_default,
	filter: filter_default,
	data: data_default,
	enter: enter_default,
	exit: exit_default,
	join: join_default,
	merge: merge_default,
	selection: selection_selection,
	order: order_default,
	sort: sort_default,
	call: call_default,
	nodes: nodes_default,
	node: node_default,
	size: size_default,
	empty: empty_default,
	each: each_default,
	attr: attr_default,
	style: style_default,
	property: property_default,
	classed: classed_default,
	text: text_default,
	html: html_default,
	raise: raise_default,
	lower: lower_default,
	append: append_default,
	insert: insert_default,
	remove: remove_default,
	clone: clone_default,
	datum: datum_default,
	on: on_default,
	dispatch: dispatch_default,
	[Symbol.iterator]: iterator_default
};
//#endregion
//#region node_modules/d3-selection/src/select.js
function select_default(selector) {
	return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}
//#endregion
//#region node_modules/d3-selection/src/sourceEvent.js
function sourceEvent_default(event) {
	let sourceEvent;
	while (sourceEvent = event.sourceEvent) event = sourceEvent;
	return event;
}
//#endregion
//#region node_modules/d3-selection/src/pointer.js
function pointer_default(event, node) {
	event = sourceEvent_default(event);
	if (node === void 0) node = event.currentTarget;
	if (node) {
		var svg = node.ownerSVGElement || node;
		if (svg.createSVGPoint) {
			var point = svg.createSVGPoint();
			point.x = event.clientX, point.y = event.clientY;
			point = point.matrixTransform(node.getScreenCTM().inverse());
			return [point.x, point.y];
		}
		if (node.getBoundingClientRect) {
			var rect = node.getBoundingClientRect();
			return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
		}
	}
	return [event.pageX, event.pageY];
}
//#endregion
export { noop as $, fitExtent as A, graticule10 as B, mercatorProjection as C, Adder as Ct, azimuthalRaw as D, azimuthalInvert as E, extent as Et, transformer as F, circle_default as G, distance_default as H, boundsStream as I, rotation_default as J, antimeridian_default as K, identity_default as L, fitSize as M, fitWidth as N, projection as O, transform_default as P, stream_default as Q, interpolate_default as R, stereographic_default as S, mean as St, mercator_default as T, fsum as Tt, length_default as U, contains_default as V, clipRectangle as W, bounds_default as X, centroid_default as Y, area_default as Z, Delaunay as _, sqrt as _t, root as a, cos as at, orient2d as b, sum$1 as bt, window_default as c, epsilon2 as ct, array as d, log as dt, abs as et, selector_default as f, pi as ft, turbo_default as g, sin as gt, namespaces_default as h, sign as ht, Selection as i, atan2 as it, fitHeight as j, projectionMutator as k, matcher_default as l, exp as lt, namespace_default as m, radians as mt, sourceEvent_default as n, asin as nt, selection as o, degrees as ot, creator_default as p, pow$1 as pt, circle_default$1 as q, select_default as r, atan as rt, styleValue as s, epsilon$2 as st, pointer_default as t, acos as tt, selectorAll_default as u, halfPi as ut, Voronoi as v, tan as vt, mercatorRaw as w, fcumsum as wt, stereographicRaw as x, merge as xt, Delaunator as y, tau$1 as yt, graticule as z };

//# sourceMappingURL=pointer-CMIKRqT6.js.map