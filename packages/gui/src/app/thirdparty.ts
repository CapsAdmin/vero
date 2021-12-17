// normalizes all css
import "normalize.css"

// this polyfills pointer events for browsers that don't support it
import "pepjs"

import _chroma from "chroma-js"
import _bowser from "bowser"
import _avataaars from "avataaars"
import _moment from "moment"

// autosizes text area height, used in translation editing
export const autosize = require("autosize")

// color library
export const chroma = _chroma

// browser detection library
export const bowser = _bowser

// used for the auto generated avatars
export const Avatar = _avataaars

// date and time library
export const moment = _moment

export const HumanizeDuration = require("humanize-duration")

export const ReactCollapse = require("react-collapse").UnmountClosed

export const CRC32 = require("crc-32")
