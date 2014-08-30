{
  "targets": [
    {
      "target_name": "_51degress",
      #"type": "<(library)",
      "sources": [
        "src/console/Console.c",
        "src/snprintf/snprintf.c",
        #"src/pattern/51Degress.c",
        "src/trie/51Degress.c",
        "src/binding.cc",
      ],
      "cflags": [
        "-Wno-trigraphs",
      ],
      "defines": [
        "HAVE_SNPRINTF"
      ]
    }
  ]
}