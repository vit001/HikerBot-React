//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = module.exports = {};
ttypes.SELECTED_LOCATION_SHARING_ONOFF = 'SELECTED_LOCATION_SHARING_ONOFF';
ttypes.SELECTED_LOCATION_SHARING_FREQUENCY = 'SELECTED_LOCATION_SHARING_FREQUENCY';
ttypes.SELECTED_LOCATION_SHARING_DELAY = 'SELECTED_LOCATION_SHARING_DELAY';
ttypes.SELECTED_LOCATION_SHARING_ACCURACY = 'SELECTED_LOCATION_SHARING_ACCURACY';
ttypes.DEFAULT_LOCATION_SHARING_ONOFF = false;
ttypes.ALLOWED_LOCATION_SHARING_FREQUENCY_TENMINUTES = 'Ten Minutes';
ttypes.ALLOWED_LOCATION_SHARING_FREQUENCY_ONEHOUR = 'One Hour';
ttypes.ALLOWED_LOCATION_SHARING_FREQUENCY_SIXHOURS = 'Six Hours';
ttypes.ALLOWED_LOCATION_SHARING_FREQUENCY_ONEDAY = 'One Day';
ttypes.DEFAULT_LOCATION_SHARING_FREQUENCY = 'Ten Minutes';
ttypes.ALLOWED_LOCATION_SHARING_FREQUENCY_VALUES = ['Ten Minutes','One Hour','Six Hours','One Day'];
ttypes.ALLOWED_LOCATION_SHARING_FREQUENCY_VALUES_MSEC = [600000,3600000,21600000,86400000];
ttypes.ALLOWED_LOCATION_SHARING_DELAY_NODELAY = 'No Delay';
ttypes.ALLOWED_LOCATION_SHARING_DELAY_ONEHOUR = 'One Hour';
ttypes.ALLOWED_LOCATION_SHARING_DELAY_TILL9AM = 'Till 9am';
ttypes.ALLOWED_LOCATION_SHARING_DELAY_24HRS = '24 Hours';
ttypes.DEFAULT_LOCATION_SHARING_DELAY = 'No Delay';
ttypes.ALLOWED_LOCATION_SHARING_DELAY_VALUES = ['No Delay','One Hour','Till 9am','24 Hours'];
ttypes.ALLOWED_LOCATION_SHARING_ACCURACY_FULL = 'Full Accuracy';
ttypes.ALLOWED_LOCATION_SHARING_ACCURACY_100YDS = '100 yds';
ttypes.ALLOWED_LOCATION_SHARING_ACCURACY_500YDS = '500 yds';
ttypes.ALLOWED_LOCATION_SHARING_ACCURACY_1MILE = '1 mile';
ttypes.DEFAULT_LOCATION_SHARING_ACCURACY = 'Full Accuracy';
ttypes.ALLOWED_LOCATION_SHARING_ACCURACY_VALUES = ['Full Accuracy','100 yds','500 yds','1 mile'];
