{
  "targets": [
    {
      "target_name": "pattern",
      "sources": [
        "src/snprintf/snprintf.c",
        "src/pattern/api.c",
        "src/pattern/pattern.cc",
      ],
      "cflags": [
        "-Wno-trigraphs"
      ],
      "defines": [
        "HAVE_SNPRINTF"
      ],
      "include_dirs" : [
        "<!(node -e \"require('nan')\")"
      ],
    },
    {
      "target_name": "trie",
      "sources": [
        "src/snprintf/snprintf.c",
        "src/trie/api.c",
        "src/trie/trie.cc",
      ],
      "cflags": [
        "-Wno-trigraphs"
      ],
      "defines": [
        "HAVE_SNPRINTF"
      ],
      "include_dirs" : [
        "<!(node -e \"require('nan')\")"
      ],
    },
  ]
}
