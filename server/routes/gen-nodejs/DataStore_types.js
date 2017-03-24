//
// Autogenerated by Thrift Compiler (0.10.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var Limits_ttypes = require('./Limits_types');
var Errors_ttypes = require('./Errors_types');
var Types_ttypes = require('./Types_types');
var Authentication_ttypes = require('./Authentication_types');


var ttypes = module.exports = {};
var SyncState = module.exports.SyncState = function(args) {
  this.currentTime = null;
  this.fullSyncBefore = null;
  if (args) {
    if (args.currentTime !== undefined && args.currentTime !== null) {
      this.currentTime = args.currentTime;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field currentTime is unset!');
    }
    if (args.fullSyncBefore !== undefined && args.fullSyncBefore !== null) {
      this.fullSyncBefore = args.fullSyncBefore;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field fullSyncBefore is unset!');
    }
  }
};
SyncState.prototype = {};
SyncState.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.currentTime = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I64) {
        this.fullSyncBefore = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

SyncState.prototype.write = function(output) {
  output.writeStructBegin('SyncState');
  if (this.currentTime !== null && this.currentTime !== undefined) {
    output.writeFieldBegin('currentTime', Thrift.Type.I64, 1);
    output.writeI64(this.currentTime);
    output.writeFieldEnd();
  }
  if (this.fullSyncBefore !== null && this.fullSyncBefore !== undefined) {
    output.writeFieldBegin('fullSyncBefore', Thrift.Type.I64, 2);
    output.writeI64(this.fullSyncBefore);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ttypes.HAMP_VERSION_MAJOR = 14;
ttypes.HAMP_VERSION_MINOR = 1;
