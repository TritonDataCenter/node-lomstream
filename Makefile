#
# Copyright 2015, Joyent, Inc.
#
# Makefile: top-level Makefile
#
# This Makefile contains only repo-specific logic and uses included makefiles
# to supply common targets (javascriptlint, jsstyle, restdown, etc.), which are
# used by other repos as well.
#

#
# Tools
#
NPM		 = npm

#
# Files
#
JS_FILES	:= $(shell find lib tests -name '*.js')
JSON_FILES	 = package.json
JSL_FILES_NODE   = $(JS_FILES)
JSSTYLE_FILES	 = $(JS_FILES)
JSL_CONF_NODE	 = jsl.node.conf

.PHONY: all
all:
	$(NPM) install

.PHONY: test
test:
	@for f in tests/tst.*.js; do node $$f || return; done
	@echo Tests passed successfully

include ./Makefile.targ
