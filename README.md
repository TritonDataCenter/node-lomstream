# node-lomstream: Limit, Offset, Marker Stream

The lomstream is designed to be able to take a paginated resource that
supports either a limit and offset, or a limit and a marker, and takes
care of streaming, buffering, and fetching through the entire set of
paginated results. It's been designed, in particular, for use with
[moray](https://github.com/joyent/moray) and
[SDC](https://github.com/joyent/sdc) APIs.

## Usage

The module exports a single function, a LOMStream constructor, which can
be used to create a new instance of a LOMStream. The constructor takes the following arguments:

```
/*
 * Create a limit, offset, marker stream. We require the following options:
 *
 * fetch	A function that describes how to fetch data. The function will
 * 		be called as fetch(fetcharg, limitObj, datacb, donecb). The
 * 		limitObj will have limit set and one of offset and marker.
 * 		They mean:
 *
 * 			o offset	The offset to use for the request
 * 			o marker	The marker to use for the request
 * 			o limit		The limit to use for the request
 *
 * 		The datacb will be of the form datacb(obj). It should be used if
 * 		there's a single object for which data is available. If an error
 * 		occurs, then datacb() should not be called any additional times
 * 		and instead the donecb should be called with the error.
 *
 * 		The donecb will be of the form of donecb(err, result). The
 * 		result should be an object that has the form of:
 *
 * 			{
 * 				"done": <boolean>
 * 				"results": <array>
 *			}
 *
 *		The done boolean indicates that there will be no more results.
 *		The results array contains an array of items to emit. The type
 *		of the items is not important. The only times that results
 *		should be empty is when done is set to true or if all entries
 *		were pushed via the datacb(), then results may be empty.
 *
 *		The two different modes of passing results are designed to
 *		handle two different modes of clients. Using the data callback
 *		for each item is designed for a fetch() function which streams
 *		results. Where as the latter form is designed for a fetch() that
 *		batches results, eg. a rest API request that returns an array of
 *		limit objects.
 *
 *
 * limit	The maximum number of entries to grab at once.
 *
 * We require one of the following:
 *
 * offset	A boolean set to true to indicate that we should use offsets
 * marker	A function that given an object returns the marker from it.
 *
 * The following arguments are optional:
 *
 * fetcharg	An argument to be passed to the fetching function.
 *
 * streamOptions	Options to pass to the stream constructor
 */
```

## Contributions

Contributions welcome, and should be 'make prepush' clean.  The prepush checks
use [javascriptlint](https://github.com/davepacheco/javascriptlint) and
[jsstyle](https://github.com/davepacheco/jsstyle). All tests exit zero
if succesful. In addition to verifying that the tests still pass, please
consider adding any new relevant tests to cover new functionality,
exposed bugs, or regressions.
