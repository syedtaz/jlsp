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
    // [$.symbol],
    // [$.keyword],
    [$.many_symchars]
  ],

  rules: {
    main: $ =>
      repeat($.value), // root

    value: $ =>
      seq(repeat(choice($.ws, $.reader_mac)), $.raw_value, repeat($.ws)),

    ws: $ =>
      new RustRegex("[ \t\r\f\n\0\v]"), // whitespace

    reader_mac: $ =>
      new RustRegex("[';~,|]"), // reader macro

    raw_value: $ =>
      choice($.keyword, $.comment, $.symbol),

    comment: _ =>
      token(seq('#', /.*/)), // comments

    constant: $ => "",

    number: $ => "",

    string: $ => "",

    buffer: $ => "",

    long_string: $ => "",

    long_buffer: $ => "",

    parray: $ => "",

    barray: $ => "",

    ptuple: $ => "",

    btuple: $ => "",

    struct: $ => "",

    dict: $ => "",

    symbol: $ => $.many_symchars,

    many_symchars: $ => repeat1(choice(new RustRegex('[a-zA-Z0-9\x80-\xFF]'), new RustRegex('[!$%&*+-./:<?=>@^_]'))),

    keyword: $ =>
      seq(":", $.many_symchars),
  }
});
