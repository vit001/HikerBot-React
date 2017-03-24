//
// Autogenerated by Thrift Compiler (0.10.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = module.exports = {};
ttypes.HAMP_ATTRIBUTE_LEN_MIN = 1;
ttypes.HAMP_ATTRIBUTE_LEN_MAX = 4096;
ttypes.HAMP_ATTRIBUTE_REGEX = '^[^\\p{Cc}\\p{Zl}\\p{Zp}]{1,4096}$';
ttypes.HAMP_TEXT_LEN_MIN = 1;
ttypes.HAMP_TEXT_LEN_MAX = 30000;
ttypes.HAMP_ATTRIBUTE_LIST_MAX = 100;
ttypes.HAMP_ATTRIBUTE_MAP_MAX = 100;
ttypes.HAMP_LATE6_MIN = -90000000;
ttypes.HAMP_LATE6_MAX = 90000000;
ttypes.HAMP_LONE6_MIN = -180000000;
ttypes.HAMP_LONE6_MAX = 180000000;
ttypes.HAMP_ELEME2_MIN = -50000;
ttypes.HAMP_ELEME2_MAX = 900000;
ttypes.HAMP_EMAIL_LEN_MIN = 6;
ttypes.HAMP_EMAIL_LEN_MAX = 255;
ttypes.HAMP_EMAIL_LOCAL_REGEX = '^[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(\\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*$';
ttypes.HAMP_EMAIL_DOMAIN_REGEX = '^[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.([A-Za-z]{2,})$';
ttypes.HAMP_EMAIL_REGEX = '^[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(\\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.([A-Za-z]{2,})$';
ttypes.HAMP_MIME_LEN_MIN = 3;
ttypes.HAMP_MIME_LEN_MAX = 255;
ttypes.HAMP_MIME_REGEX = '^[A-Za-z]+/[A-Za-z0-9._+-]+$';
ttypes.HAMP_FILE_PDF_MAX_SIZE_BYTES = 10485760;
ttypes.HAMP_MIME_TYPE_COMMENT = 'hikerbot/comment';
ttypes.HAMP_MIME_TYPE_ENCODED_PREVIEW_PATH = 'hikerbot/encoded_preview_path';
ttypes.HAMP_MIME_TYPE_SELECTOR_WIKI = 'hikerbot/selector_wiki';
ttypes.HAMP_MIME_TYPE_GIF = 'image/gif';
ttypes.HAMP_MIME_TYPE_JPEG = 'image/jpeg';
ttypes.HAMP_MIME_TYPE_PNG = 'image/png';
ttypes.HAMP_MIME_TYPE_WAV = 'audio/wav';
ttypes.HAMP_MIME_TYPE_MP3 = 'audio/mpeg';
ttypes.HAMP_MIME_TYPE_AAC = 'audio/aac';
ttypes.HAMP_MIME_TYPE_M4A = 'audio/mp4';
ttypes.HAMP_MIME_TYPE_MP4_VIDEO = 'video/mp4';
ttypes.HAMP_MIME_TYPE_PDF = 'application/pdf';
ttypes.HAMP_MIME_TYPE_DEFAULT = 'application/octet-stream';
ttypes.HAMP_MIME_TYPES = ['image/gif','image/jpeg','image/png','audio/wav','audio/mpeg','application/pdf','video/mp4','audio/aac','audio/mp4'];
ttypes.HAMP_HASH_LEN = 16;
ttypes.HAMP_USER_DISPLAYNAME_LEN_MIN = 2;
ttypes.HAMP_USER_DISPLAYNAME_LEN_MAX = 255;
ttypes.HAMP_USER_DISPLAYNAME_REGEX = '^[^\\p{Cc}\\p{Zl}\\p{Zp}]{1,255}$';
ttypes.HAMP_TAG_NAME_LEN_MIN = 1;
ttypes.HAMP_TAG_NAME_LEN_MAX = 100;
ttypes.HAMP_TAG_NAME_REGEX = '^[^,\\p{Cc}\\p{Z}]([^,\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^,\\p{Cc}\\p{Z}])?$';
ttypes.HAMP_POI_TITLE_LEN_MIN = 3;
ttypes.HAMP_POI_TITLE_LEN_MAX = 27;
ttypes.HAMP_POI_TITLE_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,253}[^\\p{Cc}\\p{Z}])?$';
ttypes.HAMP_TRACK_NAME_LEN_MIN = 3;
ttypes.HAMP_TRACK_NAME_LEN_MAX = 240;
ttypes.HAMP_TRACK_NAME_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,253}[^\\p{Cc}\\p{Z}])?$';
ttypes.HAMP_POI_TAGS_MAX = 1000;
ttypes.HAMP_POI_RESOURCES_MAX = 1000;
ttypes.HAMP_USER_POI_MAX = 100000;
ttypes.HAMP_USER_UPLOAD_LIMIT_BYTES = 62914560;
ttypes.HAMP_RESOURCE_SIZE_MAX_BYTES = 104857600;
