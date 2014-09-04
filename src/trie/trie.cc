/*

This Source Code Form is copyright of Yorkshire, Inc.
Copyright © 2014 Yorkshire, Inc,
Guiyang, Guizhou, China

This Source Code Form is copyright of 51Degrees Mobile Experts Limited.
Copyright © 2014 51Degrees Mobile Experts Limited, 5 Charlotte Close,
Caversham, Reading, Berkshire, United Kingdom RG4 7BY

This Source Code Form is the subject of the following patent
applications, owned by 51Degrees Mobile Experts Limited of 5 Charlotte
Close, Caversham, Reading, Berkshire, United Kingdom RG4 7BY:
European Patent Application No. 13192291.6; and
United States Patent Application Nos. 14/085,223 and 14/085,301.

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0.

If a copy of the MPL was not distributed with this file, You can obtain
one at http://mozilla.org/MPL/2.0/.

This Source Code Form is “Incompatible With Secondary Licenses”, as
defined by the Mozilla Public License, v. 2.0.

*/

#include <stdio.h>
#include <string.h>
#include <node.h>
#include <v8.h>
#include <nan.h>
#include "api.h"

#define BUFFER_LENGTH 50000


#ifdef _MSC_VER
#define _INTPTR 0
#endif

using namespace v8;

NAN_METHOD(ParseFile) {
  NanScope();
  Local<v8::Object> result = NanNew<v8::Object>();
  char output[BUFFER_LENGTH];
  char *filename;
  char *required_properties;
  char *input = NULL;

  if (args[0]->IsUndefined())
    return NanThrowTypeError("filename required");

  v8::String::Utf8Value v8_filename(args[0]->ToString());
  v8::String::Utf8Value v8_properties(args[1]->ToString());
  v8::String::Utf8Value v8_input(args[2]->ToString());
  filename = *v8_filename;
  required_properties = *v8_properties;
  input = *v8_input;

  switch(init(filename, required_properties)) {
    case DATA_SET_INIT_STATUS_INSUFFICIENT_MEMORY:
      return NanThrowError("Insufficient memory");
    case DATA_SET_INIT_STATUS_CORRUPT_DATA:
      return NanThrowError("Device data file is corrupted");
    case DATA_SET_INIT_STATUS_INCORRECT_VERSION:
      return NanThrowError("Device data file is not correct");
    case DATA_SET_INIT_STATUS_FILE_NOT_FOUND:
      return NanThrowError("Device data file not found");
    default:
      processDeviceJSON(getDeviceOffset(input), output, BUFFER_LENGTH);
      result->Set(NanNew<v8::String>("output"), NanNew<v8::String>(output));
      break;
  }
  NanReturnValue(result);
}

void Init(Handle<v8::Object> exports) {
  exports->Set(NanNew<v8::String>("parseFile"),
    NanNew<FunctionTemplate>(ParseFile)->GetFunction());
}

NODE_MODULE(trie, Init)
