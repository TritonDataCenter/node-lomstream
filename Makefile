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
TEST_FILES	:= $(shell find tests -name 'tst.*.js')
JSON_FILES	 = package.json
JSL_FILES_NODE   = $(JS_FILES)
JSSTYLE_FILES	 = $(JS_FILES)
JSL_CONF_NODE	 = jsl.node.conf

.PHONY: all
all:
	$(NPM) install

.PHONY: test
test: $(TEST_FILES:%=%.test)
	@echo Tests passed successfully

%.test: %
	@echo 'testing: $<'
	@node $<

include ./Makefile.targ
