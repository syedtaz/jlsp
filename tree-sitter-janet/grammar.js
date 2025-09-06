/**
 * @file Parser for the Janet language
 * @author Tazmilur Saad <ssaad@colgate.edu>
 * @license ISC
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "janet",

  conflicts: $ => [
    [$.value],
  ],

  rules: {
    main: $ => repeat($.value), // root
    value: $ => seq(repeat(choice($.ws, $.reader_mac)), $.raw_value, repeat($.ws)),
    ws: $ => new RustRegex("[ \t\r\f\n\0\v]"), // whitespace
    reader_mac: $ => new RustRegex("[';~,|]"), // reader macro
    raw_value: $ => choice($.keyword, $.comment),
    comment: _ => token(seq('#', /.*/)), // comments
    symchars: $ => choice(new RustRegex('[a-zA-Z0-9\x80-\xFF]'), new RustRegex('[!$%&*+-./:<?=>@^_]')),
    keyword: $ => seq(":", repeat1($.symchars)),
  }
});
