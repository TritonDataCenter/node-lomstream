/*
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE
 */

/*
 * Copyright 2015, Joyent, Inc.
 */

/*
 * Verify a basic offset stream works when it only uses the data callback
 */

var mod_assert = require('assert-plus');
var mod_lomstream = require('../lib/lomstream.js');
var sprintf = require('extsprintf').sprintf;

var tl_intmax = 42;
var tl_seen = 0;
var tl_ended = false;

function fetchInt(arg, lobj, datacb, cb)
{
	var i, max;
	var res = [];
	var done = false;

	mod_assert.object(lobj);
	mod_assert.number(lobj.offset);
	mod_assert.number(lobj.limit);

	i = lobj.offset;
	max = Math.min(i + lobj.limit, tl_intmax);

	for (; i < max - 1; i++) {
		datacb(i);
	}

	res.push(i);
	i++;

	if (i === tl_intmax)
		done = true;

	cb(null, { done: done, results: res });
}

function main()
{
	var s = new mod_lomstream.LOMStream({
	    fetch: fetchInt,
	    limit: 10,
	    offset: true
	});

	s.on('end', function () {
		tl_ended = true;
		mod_assert.ok(tl_seen === tl_intmax);
	});

	s.on('readable', function () {
		for (;;) {
			var d = s.read();
			if (d === null)
				return;
			mod_assert.ok(tl_seen === d);
			mod_assert.ok(tl_ended === false);
			tl_seen++;
		}
	});
}

process.on('exit', function () {
	mod_assert.ok(tl_seen === tl_intmax);
	mod_assert.ok(tl_ended === true);
});

main();
