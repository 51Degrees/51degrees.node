#include <node.h>
#include <v8.h>
#include "api.h"

using namespace v8;

Handle<Value> Method(const Arguments& args) {
  HandleScope scope;
  return scope.Close(String::New("world"));
}