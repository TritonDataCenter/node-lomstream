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
 * Verify bad constructor arguments don't work.
 */

var mod_assert = require('assert-plus');
var mod_lomstream = require('../lib/lomstream.js');
var sprintf = require('extsprintf').sprintf;


/*
 * Token function
 */
function tlFunc()
{
}

var tl_bad = [
	{ arg: {},
	    str: 'empty obj' },
	{ arg: { limit: 1000, offset: true },
	    str: 'no fetch' },
	{ arg: { fetch: 'hello', limit: 1000, offset: true },
	    str: 'bad fetch (str)' },
	{ arg: { fetch: 69, limit: 1000, offset: true },
	    str: 'bad fetch (int)' },
	{ arg: { fetch: true, limit: 1000, offset: true },
	    str: 'bad fetch (bool)' },
	{ arg: { fetch: {}, limit: 1000, offset: true },
	    str: 'bad fetch (obj)' },
	{ arg: { fetch: [], limit: 1000, offset: true },
	    str: 'bad fetch (array)' },
	{ arg: { fetch: null, limit: 1000, offset: true },
	    str: 'bad fetch (null)' },
	{ arg: { fetch: undefined, limit: 1000, offset: true },
	    str: 'bad fetch (undefined)' },
	{ arg: { fetch: tlFunc, offset: true },
	    str: 'no limit' },

	{ arg: { fetch: tlFunc, offset: true },
	    str: 'no limit' },
	{ arg: { fetch: tlFunc, limit: 'hello', offset: true },
	    str: 'bad limit (str)' },
	{ arg: { fetch: tlFunc, limit: true, offset: true },
	    str: 'bad limit (bool)' },
	{ arg: { fetch: tlFunc, limit: {}, offset: true },
	    str: 'bad limit (obj)' },
	{ arg: { fetch: tlFunc, limit: [], offset: true },
	    str: 'bad limit (array)' },
	{ arg: { fetch: tlFunc, limit: tlFunc, offset: true },
	    str: 'bad limit (func)' },
	{ arg: { fetch: tlFunc, limit: null, offset: true },
	    str: 'bad limit (null)' },
	{ arg: { fetch: tlFunc, limit: undefined, offset: true },
	    str: 'bad limit (undefined)' },
	{ arg: { fetch: tlFunc, limit: -3, limit: undefined, offset: true },
	    str: 'bad limit (negative)' },
	{ arg: { fetch: tlFunc, limit: 0, limit: undefined, offset: true },
	    str: 'bad limit (zero)' },
	{ arg: { fetch: tlFunc, limit: 1001, limit: undefined, offset: true },
	    str: 'bad limit (too large)' },
	{ arg: { fetch: tlFunc, limit: 3.4, limit: undefined, offset: true },
	    str: 'bad limit (frac)' },

	{ arg: { fetch: tlFunc},
	    str: 'no offset' },
	{ arg: { fetch: tlFunc, limit: 1000, offset: 'hello' },
	    str: 'bad offset (str)' },
	{ arg: { fetch: tlFunc, limit: 1000, offset: 34 },
	    str: 'bad offset (num)' },
	{ arg: { fetch: tlFunc, limit: 1000, offset: {} },
	    str: 'bad offset (obj)' },
	{ arg: { fetch: tlFunc, limit: 1000, offset: [] },
	    str: 'bad offset (array)' },
	{ arg: { fetch: tlFunc, limit: 1000, offset: tlFunc },
	    str: 'bad offset (func)' },
	{ arg: { fetch: tlFunc, limit: 1000, offset: null },
	    str: 'bad offset (null)' },
	{ arg: { fetch: tlFunc, limit: 1000, offset: undefined },
	    str: 'bad offset (undefined)' },

	{ arg: { fetch: tlFunc, limit: 1000 },
	    str: 'no marker' },
	{ arg: { fetch: tlFunc, limit: 1000, marker: 'hello' },
	    str: 'bad marker (str)' },
	{ arg: { fetch: tlFunc, limit: 1000, marker: 34 },
	    str: 'bad marker (num)' },
	{ arg: { fetch: tlFunc, limit: 1000, marker: {} },
	    str: 'bad marker (obj)' },
	{ arg: { fetch: tlFunc, limit: 1000, marker: [] },
	    str: 'bad marker (array)' },
	{ arg: { fetch: tlFunc, limit: 1000, marker: true },
	    str: 'bad marker (bool)' },
	{ arg: { fetch: tlFunc, limit: 1000, marker: null },
	    str: 'bad marker (null)' },
	{ arg: { fetch: tlFunc, limit: 1000, marker: undefined },
	    str: 'bad marker (undefined)' },

	{ arg: { fetch: tlFunc, limit: 1000, marker: tlFunc,
	    streamOptions: 'hello' },
	    str: 'bad streamOptions (str)' },
	{ arg: { fetch: tlFunc, limit: 1000, marker: tlFunc,
	    streamOptions: 34 },
	    str: 'bad streamOptions (num)' },
	{ arg: { fetch: tlFunc, limit: 1000, marker: tlFunc,
	    streamOptions: tlFunc },
	    str: 'bad streamOptions (func)' },
	{ arg: { fetch: tlFunc, limit: 1000, marker: tlFunc,
	    streamOptions: true },
	    str: 'bad streamOptions (bool)' },

	{ arg: { fetch: tlFunc, limit: 1000, offset: true, marker: tlFunc },
	    str: 'both offset and marker' }
];

function main()
{
	var i, err, s;
	for (i = 0; i < tl_bad.length; i++) {
		err = false;
		try {
			s = new mod_lomstream.LOMStream(tl_bad[i].arg);
			mod_assert.ok(!s);
		} catch (e) {
			err = true;
		}
		mod_assert.ok(err === true, tl_bad[i].str);
	}
}

main();
