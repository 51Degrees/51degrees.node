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
  Workset *ws = NULL;
  DataSet *data_set = (DataSet *) malloc(sizeof(DataSet));
  char output[BUFFER_LENGTH];
  char *filename;
  char *required_properties;
  char *input;

  if (args[0]->IsUndefined())
    return NanThrowTypeError("filename required");

  v8::String::Utf8Value v8_filename(args[0]->ToString());
  v8::String::Utf8Value v8_properties(args[1]->ToString());
  v8::String::Utf8Value v8_input(args[2]->ToString());
  filename = *v8_filename;
  required_properties = *v8_properties;
  input = *v8_input;

  switch(initWithPropertyString(filename, data_set, required_properties)) {
    case DATA_SET_INIT_STATUS_INSUFFICIENT_MEMORY:
      return NanThrowError("Insufficient memory");
    case DATA_SET_INIT_STATUS_CORRUPT_DATA:
      return NanThrowError("Device data file is corrupted");
    case DATA_SET_INIT_STATUS_INCORRECT_VERSION:
      return NanThrowError("Device data file is not correct");
    case DATA_SET_INIT_STATUS_FILE_NOT_FOUND:
      return NanThrowError("Device data file not found");
    default:
      ws = createWorkset(data_set);
      ws->input = input;
      match(ws, ws->input);
      if (ws->profileCount > 0) {
        processDeviceCSV(ws, output, BUFFER_LENGTH);
        result->Set(NanNew<v8::String>("difference"), NanNew<v8::Integer>(ws->difference));
        result->Set(NanNew<v8::String>("method"), NanNew<v8::Integer>(ws->method));
        result->Set(NanNew<v8::String>("rootNodesEvaluated"), NanNew<v8::Integer>(ws->rootNodesEvaluated));
        result->Set(NanNew<v8::String>("nodesEvaluated"), NanNew<v8::Integer>(ws->nodesEvaluated));
        result->Set(NanNew<v8::String>("stringsRead"), NanNew<v8::Integer>(ws->stringsRead));
        result->Set(NanNew<v8::String>("signaturesRead"), NanNew<v8::Integer>(ws->signaturesRead));
        result->Set(NanNew<v8::String>("signaturesCompared"), NanNew<v8::Integer>(ws->signaturesCompared));
        result->Set(NanNew<v8::String>("closestSignatures"), NanNew<v8::Integer>(ws->closestSignatures));
        result->Set(NanNew<v8::String>("output"), NanNew<v8::String>(output));
        // XXX: call without error
        // freeWorkset(ws);
      } else {
        printf("null\n");
      }
      destroy(data_set);
      break;
  }

  NanReturnValue(result);
}

void Init(Handle<v8::Object> exports) {
  exports->Set(NanNew<v8::String>("parseFile"),
    NanNew<FunctionTemplate>(ParseFile)->GetFunction());
}

NODE_MODULE(pattern, Init)
