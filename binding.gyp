{
  "targets": [
    {
      "target_name": "pattern",
      "sources": [
        "src/snprintf/snprintf.c",
        "src/pattern/api.c",
        "src/pattern/exports.cc",
      ],
      "cflags": [
      ],
      "defines": [
        "HAVE_SNPRINTF"
      ],
    },
    {
      "target_name": "trie",
      "source": [
        "src/snprintf/snprintf.c",
        "src/trie/api.c",
        "src/trie/exports.cc",
      ],
      "cflags": [
      ],
      "defines": [
        "HAVE_SNPRINTF"
      ],
    },
  ]
}