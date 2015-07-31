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
 * Verify we get our same fetch arg.
 */

var mod_assert = require('assert-plus');
var mod_lomstream = require('../lib/lomstream.js');
var sprintf = require('extsprintf').sprintf;

var tl_sarg = false;
var tl_arg = 69;

function checkArg(arg, lobj, cb)
{
	mod_assert.ok(arg === tl_arg);
	tl_sarg = true;
	process.exit(0);
}

function main()
{
	var s = new mod_lomstream.LOMStream({
	    fetch: checkArg,
	    fetcharg: tl_arg,
	    limit: 10,
	    offset: true
	});

	s.on('end', function () {
		/*
		 * We shouldn't make it this far.
		 */
		process.abort();
	});

	s.on('readable', function () {
		for (;;) {
			s.read();
			mod_assert.ok(false);
		}
	});
}

process.on('exit', function () {
	mod_assert.ok(tl_sarg === true);
});

main();
