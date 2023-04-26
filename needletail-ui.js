(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 775:
/***/ ((module) => {

!function(t,e){if(true)module.exports=e();else { var i, n; }}(window,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e,n){"use strict";var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(r,s){function o(t){try{c(i.next(t))}catch(t){s(t)}}function u(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,u)}c((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.BaseEndpoint=void 0;const r=n(1);e.BaseEndpoint=class{constructor(t,e){this.apiKey=t,this.baseUrl=e}getApiKey(){return this.apiKey}get(t,e={}){return i(this,void 0,void 0,(function*(){try{const n=yield fetch(this.baseUrl+t,Object.assign({method:"GET"},this.getOptions(e))),i=n;return n.body&&(i.data=yield n.json()),i}catch(t){console.error(t)}}))}post(t,e={}){return i(this,void 0,void 0,(function*(){try{const n=yield fetch(this.baseUrl+t,Object.assign({method:"POST"},this.getOptions(e))),i=n;return n.body&&(i.data=yield n.json()),i}catch(t){console.error(t)}}))}getOptions(t={}){return{headers:Object.assign({"content-type":"application/json; charset=UTF-8",[r.Config.headers.apiKey]:this.getApiKey()},t.headers),body:JSON.stringify(t.data)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Config=void 0;class i{}e.Config=i,i.baseUrl="https://api.needletail.io/3.0/",i.headers={apiKey:"x-needletail-api-key"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Bucket=void 0;const i=n(4),r=n(3);class s extends r.BaseEntity{setName(t){return this.name=t,this}getName(){return this.name}setShowScore(t){return this.showScore=t,this}isShowScore(){return this.showScore}setDocumentCount(t){return this.documentCount=t,this}getDocumentCount(){return this.documentCount}setSearchableAttributes(t){return this.searchableAttributes=t,this}getSearchableAttributes(){return this.searchableAttributes}setRetrievableAttributes(t){return this.retrievableAttributes=t,this}getRetrievableAttributes(){return this.retrievableAttributes}setGroupBy(t){return this.groupBy=t,this}getGroupBy(){return this.groupBy}setAttributes(t){return this.attributes=t,this}getAttributes(){return this.attributes}setBoosts(t){return this.boosts=t,this}getBoosts(){return this.boosts}synonyms(){return new i.Synonyms(this.getApiKey(),this,this.getBaseUrl())}alternatives(){return new i.Alternatives(this.getApiKey(),this,this.getBaseUrl())}setBaseUrl(t){return this.baseUrl=t,this}getBaseUrl(){return this.baseUrl}}e.Bucket=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.BaseEntity=void 0;e.BaseEntity=class{setApiKey(t){return this.apiKey=t,this}getApiKey(){if(!this.apiKey)throw new Error("API key not set");return this.apiKey}}},function(t,e,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),r=this&&this.__exportStar||function(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||i(e,t,n)};Object.defineProperty(e,"__esModule",{value:!0}),r(n(9),e),r(n(12),e),r(n(13),e),r(n(14),e),r(n(15),e)},function(t,e,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),r=this&&this.__exportStar||function(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||i(e,t,n)};Object.defineProperty(e,"__esModule",{value:!0}),r(n(2),e),r(n(10),e),r(n(11),e)},function(t,e,n){t.exports=n(7)},function(t,e,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),r=this&&this.__exportStar||function(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||i(e,t,n)};Object.defineProperty(e,"__esModule",{value:!0}),r(n(8),e),r(n(1),e),r(n(16),e),r(n(18),e),r(n(22),e)},function(t,e,n){"use strict";var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(r,s){function o(t){try{c(i.next(t))}catch(t){s(t)}}function u(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,u)}c((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.Client=void 0;const r=n(4),s=n(2),o=n(1);e.Client=class{constructor(t,e){this.readKey=t,this.baseUrl=null!=e?e:o.Config.baseUrl}bulk(t){return i(this,void 0,void 0,(function*(){return yield new r.BulkSearch(this.getReadKey(),this.baseUrl).find(t)}))}search(t){return i(this,void 0,void 0,(function*(){return yield new r.Search(this.getReadKey(),this.baseUrl).find(t)}))}buckets(){return new r.Buckets(this.getReadKey(),this.baseUrl)}alternatives(t){const e=new s.Bucket;return e.setApiKey(this.getReadKey()).setName(t),e.alternatives()}synonyms(t){const e=new s.Bucket;return e.setApiKey(this.getReadKey()).setName(t),e.synonyms()}getReadKey(){return this.readKey}}},function(t,e,n){"use strict";var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(r,s){function o(t){try{c(i.next(t))}catch(t){s(t)}}function u(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,u)}c((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.Alternatives=void 0;const r=n(0),s=n(5);class o extends r.BaseEndpoint{constructor(t,e,n){super(t,n),this.bucket=e}all(){return i(this,void 0,void 0,(function*(){const t=yield this.get(`buckets/${this.bucket.getName()}/alternatives`),e=[];return t.forEach(t=>{e.push(this.toEntity(t))}),e}))}find(t){return i(this,void 0,void 0,(function*(){const e=yield this.get(`buckets/${this.bucket.getName()}/alternatives/${t}`);return this.toEntity(e)}))}toEntity(t){return(new s.Alternative).setApiKey(this.getApiKey()).setId(t.id).setOriginalWord(t.original_word).setAlternativeWords(t.alternative_words)}}e.Alternatives=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Synonym=void 0;const i=n(3);class r extends i.BaseEntity{setBucket(t){return this.bucket=t,this}getBucket(){return this.bucket}setId(t){return this.id=t,this}getId(){return this.id}setWords(t){return this.words=t,this}getWords(){return this.words}}e.Synonym=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Alternative=void 0;const i=n(3);class r extends i.BaseEntity{setBucket(t){return this.bucket=t,this}getBucket(){return this.bucket}setId(t){return this.id=t,this}getId(){return this.id}setOriginalWord(t){return this.originalWord=t,this}getOriginalWord(){return this.originalWord}setAlternativeWords(t){return this.alternativeWords=t,this}getAlternativeWords(){return this.alternativeWords}}e.Alternative=r},function(t,e,n){"use strict";var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(r,s){function o(t){try{c(i.next(t))}catch(t){s(t)}}function u(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,u)}c((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.Buckets=void 0;const r=n(0),s=n(2);class o extends r.BaseEndpoint{all(){return i(this,void 0,void 0,(function*(){const t=yield this.get("buckets"),e=[];return t.forEach(t=>{e.push(this.toEntity(t))}),e}))}find(t){return i(this,void 0,void 0,(function*(){const e=yield this.get("buckets/"+t);return this.toEntity(e)}))}toEntity(t){return(new s.Bucket).setApiKey(this.getApiKey()).setName(t.name).setShowScore(t.show_score).setDocumentCount(t.document_count).setSearchableAttributes(t.searchable_attributes).setRetrievableAttributes(t.retrievable_attributes).setGroupBy(t.group_by).setAttributes(t.attributes).setBoosts(t.boosts)}}e.Buckets=o},function(t,e,n){"use strict";var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(r,s){function o(t){try{c(i.next(t))}catch(t){s(t)}}function u(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,u)}c((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.Synonyms=void 0;const r=n(0),s=n(5);class o extends r.BaseEndpoint{constructor(t,e,n){super(t,n),this.bucket=e}all(){return i(this,void 0,void 0,(function*(){const t=yield this.get(`buckets/${this.bucket.getName()}/synonyms`),e=[];return t.forEach(t=>{e.push(this.toEntity(t))}),e}))}find(t){return i(this,void 0,void 0,(function*(){const e=yield this.get(`buckets/${this.bucket.getName()}/synonyms/${t}`);return this.toEntity(e)}))}toEntity(t){return(new s.Synonym).setApiKey(this.getApiKey()).setId(t.id).setWords(t.words)}}e.Synonyms=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.BulkSearch=void 0;const i=n(0);class r extends i.BaseEndpoint{find(t){return this.post("search/bulk",{data:t})}}e.BulkSearch=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Search=void 0;const i=n(0);class r extends i.BaseEndpoint{find(t){return this.post("search",{data:t})}}e.Search=r},function(t,e,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),r=this&&this.__exportStar||function(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||i(e,t,n)};Object.defineProperty(e,"__esModule",{value:!0}),r(n(17),e)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.geoPoint=void 0,e.geoPoint=function(t,e,n){return{geo_point:{lat:t,lng:e,distance:n}}}},function(t,e,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),r=this&&this.__exportStar||function(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||i(e,t,n)};Object.defineProperty(e,"__esModule",{value:!0}),r(n(19),e),r(n(20),e),r(n(21),e)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.equals=void 0,e.equals=function(t={}){return{equals:t}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.notEquals=void 0,e.notEquals=function(t={}){return{not_equals:t}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.should=void 0,e.should=function(t={}){return{should:t}}},function(t,e,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),r=this&&this.__exportStar||function(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||i(e,t,n)};Object.defineProperty(e,"__esModule",{value:!0}),r(n(23),e),r(n(24),e),r(n(25),e),r(n(26),e),r(n(27),e),r(n(28),e),r(n(29),e)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.field=void 0,e.field=function(t){return{field:{field:t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.fuzzy=void 0,e.fuzzy=function(t,e){return{fuzzy:{field:t,value:e}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.like=void 0,e.like=function(t,e){return{like:{fields:"string"==typeof t?[t]:t,value:e}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.match=void 0,e.match=function(t,e){return{match:{field:t,values:"string"==typeof e?[e]:e}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.range=void 0,e.range=function(t,e,n){return{range:{field:t,gte:e,lte:n}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.regex=void 0,e.regex=function(t,e){return{regex:{field:t,value:e}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.startsWith=void 0,e.startsWith=function(t,e){return{starts_with:{field:t,value:e}}}}])}));

/***/ }),

/***/ 3665:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "needletail.min.css");

/***/ }),

/***/ 2213:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-aggregation needletail-aggregation-checkbox needletail-aggregation-checkbox-{{ class_title }} {{ collapsible }} {{ collapsed }}\"> <div class=\"needletail-aggregation-checkbox-title\"> {{ title }} </div> <div class=\"needletail-collapsible-container\"> {{#options}} <label class=\"needletail-aggregation-checkbox-option {{#show_more_options}}needletail-hidden{{/show_more_options}}\"> <input type=\"checkbox\" name=\"{{ name }}\" value=\"{{ value }}\" class=\"needletail-aggregation-checkbox-option-input needletail-aggregation-checkbox-option-input-{{ name }}\"> <span class=\"needletail-aggregation-checkbox-option-checkmark\"></span> <span class=\"needletail-aggregation-checkbox-option-label\">{{ value }}</span> <span class=\"needletail-aggregation-checkbox-option-count\">{{ count }}</span> </label> {{/options}} {{#show_more_options}} <div class=\"needletail-show-more-options\">{{{ show_more_options_text }}}</div> <div class=\"needletail-show-less-options needletail-hidden\">{{{ show_less_options_text }}}</div> {{/show_more_options}} </div> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 9256:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-aggregation needletail-aggregation-radio needletail-aggregation-radio-{{ class_title }} {{ collapsible }} {{ collapsed }}\"> <div class=\"needletail-aggregation-radio-title\"> {{ title }} </div> <div class=\"needletail-collapsible-container\"> {{#options}} <label class=\"needletail-aggregation-radio-option {{#show_more_options}}needletail-hidden{{/show_more_options}}\"> <input type=\"radio\" name=\"{{ name }}\" value=\"{{ value }}\" class=\"needletail-aggregation-radio-option-input needletail-aggregation-radio-option-input-{{ name }}\"> <span class=\"needletail-aggregation-radio-option-checkmark\"></span> <span class=\"needletail-aggregation-radio-option-label\">{{ value }}</span> <span class=\"needletail-aggregation-radio-option-count\">{{ count }}</span> </label> {{/options}} {{#show_more_options}} <div class=\"needletail-show-more-options\">{{{ show_more_options_text }}}</div> <div class=\"needletail-show-less-options needletail-hidden\">{{{ show_less_options_text }}}</div> {{/show_more_options}} </div> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 4131:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-aggregation needletail-aggregation-slider needletail-aggregation-slider-{{ class_title }} {{ collapsible }} {{ collapsed }}\"> <div class=\"needletail-aggregation-slider-title\"> {{ title }} </div> <div class=\"needletail-collapsible-container\"> <div class=\"needletail-aggregation-slider-container\"> <input type=\"range\" name=\"{{ name }}\" min=\"{{ min }}\" max=\"{{ max }}\" value=\"{{ value }}\" class=\"needletail-aggregation-slider-input needletail-aggregation-slider-input-{{ name }}\"> </div> </div> </div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 6345:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-aggregation needletail-aggregation-slider needletail-aggregation-slider-{{ class_title }} {{ collapsible }} {{ collapsed }}\"> <div class=\"needletail-aggregation-slider-title\"> {{ title }} </div> <div class=\"needletail-collapsible-container\"> <div class=\"needletail-aggregation-slider-container__range\"> {{#inputs_top}} <div class=\"needletail-aggregation-slider-inputs top\"> <input type=\"number\" class=\"needletail-aggregation-slider-input-min {{ display_only }}\"> <input type=\"number\" class=\"needletail-aggregation-slider-input-max {{ display_only }}\"> </div> {{/inputs_top}} <div class=\"needletail-aggregation-slider-range-container\"> <div class=\"needletail-aggregation-slider-range\"> <div class=\"needletail-aggregation-slider-range-left\"></div> <div class=\"needletail-aggregation-slider-range-divider\"></div> <div class=\"needletail-aggregation-slider-range-right\"></div> </div> </div> {{#inputs_bottom}} <div class=\"needletail-aggregation-slider-inputs bottom\"> <input type=\"number\" class=\"needletail-aggregation-slider-input-min {{ display_only }}\"> <input type=\"number\" class=\"needletail-aggregation-slider-input-max {{ display_only }}\"> </div> {{/inputs_bottom}} </div> </div> </div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 8306:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-aggregation needletail-aggregation-switch needletail-aggregation-switch-{{ class_title }} {{ collapsible }} {{ collapsed }}\"> <div class=\"needletail-aggregation-switch-title\"> {{ title }} </div> <div class=\"needletail-collapsible-container\"> <span class=\"needletail-aggregation-boolean-label\">{{ off_value }}</span> <label class=\"needletail-aggregation-switch-container\"> <input type=\"checkbox\" name=\"{{ name }}\" value=\"{{ value }}\" class=\"needletail-aggregation-switch-input needletail-aggregation-switch-input-{{ name }}\"> <span class=\"needletail-aggregation-switch-slider\"></span> </label> <span class=\"needletail-aggregation-boolean-label\">{{ on_value }}</span> </div> </div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 5581:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-aggregation-bar\"> {{#show_clear_filters_top}} <div class=\"needletail-clear-filters-top\"> {{{ clear_filters }}} </div> {{/show_clear_filters_top}} {{#fields}} <div class=\"needletail-aggregation-item\"> {{{ . }}} </div> {{/fields}} {{#show_clear_filters_bottom}} <div class=\"needletail-clear-filters-bottom\"> {{{ clear_filters }}} </div> {{/show_clear_filters_bottom}} </div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 4773:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-autocomplete-bar needletail-autocomplete-bar-{{ name }}\"> <input type=\"text\" class=\"needletail-autocomplete-bar-input needletail-empty\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"{{ placeholder }}\"> {{{ results }}} </div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 5542:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-autocomplete-bar-results\"> {{#initial_input}} <div class=\"needletail-autocomplete-bar-result needletail-initial-input\" data-attribute=\"{{ initial_input }}\"> {{ initial_input }} </div> {{/initial_input}} {{#results}} <div class=\"needletail-autocomplete-bar-result\" data-attribute=\"{{ raw.title }}\"> {{#highlight.title}}{{{ highlight.title }}}{{/highlight.title}}{{^highlight.title}}{{ title }}{{/highlight.title}} </div> {{/results}} {{^results}} <div class=\"needletail-autocomplete-bar-no-result\"> {{{ no_result_message }}} </div> {{/results}} </div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 757:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<span class=\"needletail-clear-filters {{ hidden }}\">{{{ text }}}</span>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 7512:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-grouped-search-bar needletail-grouped-search-bar-{{ name }}\"> <input type=\"text\" class=\"needletail-grouped-search-bar-input needletail-empty\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"{{ placeholder }}\"> {{{ results }}} </div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 3070:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-grouped-search-bar-results\"> <div class=\"needletail-grouped-search-bar-result-results\"> {{#initial_input}} <div class=\"needletail-grouped-search-bar-result needletail-initial-input\" data-attribute=\"{{ initial_input }}\"> {{{ initial_input }}} </div> {{/initial_input}} </div> {{#results}} {{{ . }}} {{/results}} {{^results}} <div class=\"needletail-grouped-search-bar-no-result\"> {{{ no_result_message }}} </div> {{/results}} </div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 7302:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-grouped-search-bar-result-title\"> {{ key }} </div> <div class=\"needletail-grouped-search-bar-result-results\"> {{#results}} <div class=\"needletail-grouped-search-bar-result\" data-attribute=\"{{ raw.title }}\"> {{#highlight.title}}{{{ highlight.title }}}{{/highlight.title}}{{^highlight.title}}{{ title }}{{/highlight.title}} </div> {{/results}} </div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 9567:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-result\"> <div class=\"needletail-total-results\"> {{ total_results_text }} </div> {{#use_sort_select}} {{{ sort_select }}} {{/use_sort_select}} <div class=\"needletail-result-results {{ hide_on_initial_request }}\"> {{{results}}} </div> {{#infinite_scroll}} <div class=\"needletail-loader infinity-scroll\"></div> {{/infinite_scroll}} <div class=\"needletail-result-pagination {{ hide_pagination }}\"> {{#first_button}} <div class=\"needletail-result-pagination-page needletail-result-pagination-first {{ disable_first_button }}\" data-page=\"{{ first_page }}\">{{{ first_button }}}</div> {{/first_button}} <div class=\"needletail-result-pagination-page needletail-result-pagination-previous {{ disable_previous_button }}\" data-page=\"{{ previous_page }}\">{{{ previous_button }}}</div> {{#pages}} <div class=\"needletail-result-pagination-page {{active}}\" data-offset=\"{{offset}}\" data-page=\"{{page}}\"> {{page}} </div> {{/pages}} <div class=\"needletail-result-pagination-page needletail-result-pagination-next {{ disable_next_button }}\" data-page=\"{{ next_page }}\">{{{ next_button }}}</div> {{#last_button}} <div class=\"needletail-result-pagination-page needletail-result-pagination-last {{ disable_last_button }}\" data-page=\"{{ last_page }}\">{{{ last_button }}}</div> {{/last_button}} </div> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 8506:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "{{#results}} <div class=\"needletail-result-result\"> <div class=\"needletail-result-title\">{{ title }}</div> <div class=\"needletail-result-body\">{{ body }}</div> </div> {{/results}} {{^results}} <div class=\"needletail-result-no-result\"> {{{ no_result_message }}} </div> {{/results}}";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 9660:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<select class=\"needletail-sort-select\"> {{#options}} <option value=\"{{ name }}\" data-attribute=\"{{ attribute }}\" data-direction=\"{{ direction }}\">{{#display_name}}{{{ display_name }}}{{/display_name}}{{^display_name}}{{ name }}{{/display_name}}</option> {{/options}} </select>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 4148:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"needletail-skeleton needletail-result\"> <ul class=\"needletail-skeleton-spacing needletail-skeleton-spacing--l\"> {{#records}} <li class=\"needletail-skeleton-base\"> <div class=\"needletail-skeleton-media\"> <span class=\"needletail-skeleton-box\" style=\"width:100px;height:100px\"></span> </div> <div class=\"needletail-skeleton-body\"> <div class=\"needletail-skeleton-spacing\"> <h3 class=\"needletail-skeleton-header\"> <span class=\"needletail-skeleton-box\" style=\"width:55%\"></span> </h3> <p> <span class=\"needletail-skeleton-box\" style=\"width:80%\"></span> <span class=\"needletail-skeleton-box\" style=\"width:90%\"></span> <span class=\"needletail-skeleton-box\" style=\"width:83%\"></span> <span class=\"needletail-skeleton-box\" style=\"width:80%\"></span> </p> </div> </div> </li> {{/records}} </ul> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 2705:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(5639);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 4239:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2705),
    getRawTag = __webpack_require__(9607),
    objectToString = __webpack_require__(2333);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 7561:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(7990);

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ 1957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ 9607:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2705);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 2333:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 5639:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(1957);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 7990:
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ 3279:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(3218),
    now = __webpack_require__(7771),
    toNumber = __webpack_require__(4841);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ 3218:
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 7005:
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 3448:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(4239),
    isObjectLike = __webpack_require__(7005);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 7771:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(5639);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ 4841:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(7561),
    isObject = __webpack_require__(3218),
    isSymbol = __webpack_require__(3448);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ 466:
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, (function () { 'use strict';

  /*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   */

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  /**
   * Safe way of detecting whether or not the given thing is a primitive and
   * whether it has the given property
   */
  function primitiveHasOwnProperty (primitive, propName) {
    return (
      primitive != null
      && typeof primitive !== 'object'
      && primitive.hasOwnProperty
      && primitive.hasOwnProperty(propName)
    );
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   *
   * Tokens for partials also contain two more elements: 1) a string value of
   * indendation prior to that tag and 2) the index of that tag on that line -
   * eg a value of 2 indicates the partial is the third tag on this line.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];
    var lineHasNonSpace = false;
    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?
    var indentation = '';  // Tracks indentation for tags that use it
    var tagIndex = 0;      // Stores a count of number of tags encountered on a line

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
            indentation += chr;
          } else {
            nonSpace = true;
            lineHasNonSpace = true;
            indentation += ' ';
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
            indentation = '';
            tagIndex = 0;
            lineHasNonSpace = false;
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      if (type == '>') {
        token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
      } else {
        token = [ type, value, start, scanner.pos ];
      }
      tagIndex++;
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    stripSpace();

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, intermediateValue, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          intermediateValue = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           *
           * In the case where dot notation is used, we consider the lookup
           * to be successful even if the last "object" in the path is
           * not actually an object but a primitive (e.g., a string, or an
           * integer), because it is sometimes useful to access a property
           * of an autoboxed primitive, such as the length of a string.
           **/
          while (intermediateValue != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = (
                hasProperty(intermediateValue, names[index])
                || primitiveHasOwnProperty(intermediateValue, names[index])
              );

            intermediateValue = intermediateValue[names[index++]];
          }
        } else {
          intermediateValue = context.view[name];

          /**
           * Only checking against `hasProperty`, which always returns `false` if
           * `context.view` is not an object. Deliberately omitting the check
           * against `primitiveHasOwnProperty` if dot notation is not used.
           *
           * Consider this example:
           * ```
           * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
           * ```
           *
           * If we were to check also against `primitiveHasOwnProperty`, as we do
           * in the dot notation case, then render call would return:
           *
           * "The length of a football field is 9."
           *
           * rather than the expected:
           *
           * "The length of a football field is 100 yards."
           **/
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit) {
          value = intermediateValue;
          break;
        }

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.templateCache = {
      _cache: {},
      set: function set (key, value) {
        this._cache[key] = value;
      },
      get: function get (key) {
        return this._cache[key];
      },
      clear: function clear () {
        this._cache = {};
      }
    };
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    if (typeof this.templateCache !== 'undefined') {
      this.templateCache.clear();
    }
  };

  /**
   * Parses and caches the given `template` according to the given `tags` or
   * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.templateCache;
    var cacheKey = template + ':' + (tags || mustache.tags).join(':');
    var isCacheEnabled = typeof cache !== 'undefined';
    var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

    if (tokens == undefined) {
      tokens = parseTemplate(template, tags);
      isCacheEnabled && cache.set(cacheKey, tokens);
    }
    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   *
   * If the optional `config` argument is given here, then it should be an
   * object with a `tags` attribute or an `escape` attribute or both.
   * If an array is passed, then it will be interpreted the same way as
   * a `tags` attribute on a `config` object.
   *
   * The `tags` attribute of a `config` object must be an array with two
   * string values: the opening and closing tags used in the template (e.g.
   * [ "<%", "%>" ]). The default is to mustache.tags.
   *
   * The `escape` attribute of a `config` object must be a function which
   * accepts a string as input and outputs a safely escaped string.
   * If an `escape` function is not provided, then an HTML-safe string
   * escaping function is used as the default.
   */
  Writer.prototype.render = function render (template, view, partials, config) {
    var tags = this.getConfigTags(config);
    var tokens = this.parse(template, tags);
    var context = (view instanceof Context) ? view : new Context(view, undefined);
    return this.renderTokens(tokens, context, partials, template, config);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, config) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context, config);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate, config) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials, config);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate, config) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate, config);
  };

  Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
    var filteredIndentation = indentation.replace(/[^ \t]/g, '');
    var partialByNl = partial.split('\n');
    for (var i = 0; i < partialByNl.length; i++) {
      if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
        partialByNl[i] = filteredIndentation + partialByNl[i];
      }
    }
    return partialByNl.join('\n');
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials, config) {
    if (!partials) return;
    var tags = this.getConfigTags(config);

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) {
      var lineHasNonSpace = token[6];
      var tagIndex = token[5];
      var indentation = token[4];
      var indentedValue = value;
      if (tagIndex == 0 && indentation) {
        indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
      }
      var tokens = this.parse(indentedValue, tags);
      return this.renderTokens(tokens, context, partials, indentedValue, config);
    }
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context, config) {
    var escape = this.getConfigEscape(config) || mustache.escape;
    var value = context.lookup(token[1]);
    if (value != null)
      return (typeof value === 'number' && escape === mustache.escape) ? String(value) : escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  Writer.prototype.getConfigTags = function getConfigTags (config) {
    if (isArray(config)) {
      return config;
    }
    else if (config && typeof config === 'object') {
      return config.tags;
    }
    else {
      return undefined;
    }
  };

  Writer.prototype.getConfigEscape = function getConfigEscape (config) {
    if (config && typeof config === 'object' && !isArray(config)) {
      return config.escape;
    }
    else {
      return undefined;
    }
  };

  var mustache = {
    name: 'mustache.js',
    version: '4.2.0',
    tags: [ '{{', '}}' ],
    clearCache: undefined,
    escape: undefined,
    parse: undefined,
    render: undefined,
    Scanner: undefined,
    Context: undefined,
    Writer: undefined,
    /**
     * Allows a user to override the default caching strategy, by providing an
     * object with set, get and clear methods. This can also be used to disable
     * the cache by setting it to the literal `undefined`.
     */
    set templateCache (cache) {
      defaultWriter.templateCache = cache;
    },
    /**
     * Gets the default or overridden caching object from the default writer.
     */
    get templateCache () {
      return defaultWriter.templateCache;
    }
  };

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view`, `partials`, and `config`
   * using the default writer.
   */
  mustache.render = function render (template, view, partials, config) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials, config);
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  return mustache;

})));


/***/ }),

/***/ 2894:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Aggregation = void 0;
class Aggregation {
    constructor(options = {}) {
        /**
         * @type {string} A custom template for the aggregation, if not set a default will be used
         */
        this.template = null;
        /**
         * The values that are set for the aggregation
         */
        this.values = {};
        /**
         * The value sent to the search
         */
        this.value = {};
        /**
         * Is the item collapsible or not
         */
        this.collapsible = false;
        /**
         * Is the item default collapsed
         */
        this.defaultCollapsed = false;
        this.hasActiveAggregation = true;
        this.setTitle(options.title || '');
        this.setClassTitle(this.getTitle() || '');
        this.setTemplate(options.template || '');
        this.setAttribute(options.attribute || this.getTitle());
        this.setCollapsible(options.collapsible || this.getCollapsible());
        this.setDefaultCollapsed(options.default_collapsed || this.getDefaultCollapsed());
    }
    setClassTitle(classTitle) {
        this.classTitle = classTitle.replace(/ /g, '-');
        return this;
    }
    getClassTitle() {
        return this.classTitle;
    }
    setAttribute(attribute) {
        this.attribute = attribute;
        if (!this.value.field) {
            this.value = {
                field: this.attribute,
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            };
        }
        return this;
    }
    getAttribute() {
        return this.attribute;
    }
    setCollapsible(collapsible) {
        this.collapsible = collapsible;
        return this;
    }
    getCollapsible() {
        return this.collapsible;
    }
    setDefaultCollapsed(defaultCollapsed) {
        this.defaultCollapsed = defaultCollapsed;
        return this;
    }
    getDefaultCollapsed() {
        return this.defaultCollapsed;
    }
    setTitle(title) {
        this.title = title;
        this.setClassTitle(this.title);
        return this;
    }
    getTitle() {
        return this.title;
    }
    setTemplate(template) {
        this.template = template;
        return this;
    }
    getTemplate() {
        return this.template;
    }
    /**
     * This function will be used to render the HTML
     * This is done by using Mustache-JS
     * @return {string}
     */
    render() {
        return this.getTemplate();
    }
    /**
     * The after load Javascript, used for event listeners etc.
     */
    executeJS() {
    }
    reset() {
    }
}
exports.Aggregation = Aggregation;


/***/ }),

/***/ 8762:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Widget = void 0;
class Widget {
    constructor(options = {}) {
        this.setEl(options.el || '');
    }
    setEl(el) {
        this.el = el;
        return this;
    }
    getEl() {
        return this.el;
    }
    getTemplate() {
        return this.template;
    }
    setTemplate(template) {
        this.template = template;
        return this;
    }
    setClient(client) {
        this.client = client;
        return this;
    }
    /**
     * Render the HTML and transform it into a HTML Node
     * @param {{}} options
     * @return {Node}
     */
    render(options = {}) {
        const template = this.getTemplate();
        return document.createRange().createContextualFragment(template);
    }
    executeJS() { }
    /**
     * Render and append the widgets into the right position
     * @param {{}} options
     */
    build(options = {}) {
        const elements = document.querySelectorAll(this.getEl());
        const domHtml = this.render(options);
        elements.forEach((element) => {
            element.innerHTML = '';
            element.appendChild(domHtml.cloneNode(true));
        });
        this.executeJS();
    }
}
exports.Widget = Widget;


/***/ }),

/***/ 6108:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Client = void 0;
const js_1 = __webpack_require__(775);
const Collections_1 = __webpack_require__(7288);
class Client extends js_1.Client {
    constructor(readKey, baseUrl = null) {
        super(readKey, baseUrl);
        this.widgets = new Collections_1.WidgetCollection(this);
    }
    /**
     * Add a widget to the client
     * @param {WidgetOptions} widget
     * @return {Client}
     */
    addWidget(widget) {
        this.widgets.add(widget);
        return this;
    }
    /**
     * Add multiple widgets at the same time
     * @param {WidgetOptions[]} widgets
     * @return {Client}
     */
    addMultipleWidgets(widgets) {
        this.widgets.addMultiple(widgets);
        return this;
    }
}
exports.Client = Client;


/***/ }),

/***/ 6137:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WidgetCollection = void 0;
class WidgetCollection {
    constructor(client) {
        /**
         * @type {AutocompleteBar[]} All the autocomplete bar widgets
         */
        this.autocompleteBar = [];
        /**
         * @type {GroupedSearchBar[]} All the grouped search bar widgets
         */
        this.groupedSearchBar = [];
        /**
         * @type {Result[]} All the result widgets
         */
        this.result = [];
        /**
         * @type {AggregationBar[]} All the aggregation bar widgets
         */
        this.aggregationBar = [];
        this.client = client;
    }
    add(widget) {
        switch (widget.discriminator) {
            case 'AutocompleteBar':
                this.autocompleteBar.push(widget);
                break;
            case 'GroupedSearchBar':
                this.groupedSearchBar.push(widget);
                break;
            case 'Result':
                this.result.push(widget);
                break;
            case 'AggregationBar':
                this.aggregationBar.push(widget);
                break;
            default:
                // If the widget does not have an array throw an error
                console.error(widget);
                throw new Error('Unsupported widget: ' + widget.discriminator);
        }
        widget.setClient(this.client)
            .build();
    }
    addMultiple(widgets) {
        widgets.forEach((widget) => {
            this.add(widget);
        });
    }
}
exports.WidgetCollection = WidgetCollection;


/***/ }),

/***/ 7673:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Events = void 0;
class Events {
    static emit(name, data = {}) {
        const event = new CustomEvent(name, {
            'detail': data,
        });
        document.dispatchEvent(event);
    }
}
/**
 * Called when the grouped search bar is submitted
 */
Events.onSubmitGroupedSearch = 'onSubmitGroupedSearch';
/**
 * Called when the grouped search bar starts searching
 */
Events.onGroupedSearch = 'onGroupedSearch';
/**
 * Called before the grouped search bar starts searching
 */
Events.onBeforeGroupedSearch = 'onBeforeGroupedSearch';
/**
 * Called after the grouped search bar finishes searching
 */
Events.onAfterGroupedSearch = 'onAfterGroupedSearch';
/**
 * When the arrow up or down is pressed
 */
Events.onArrowMovementGroupedSearch = 'onArrowMovementGroupedSearch';
/**
 * Called when the autocomplete bar is submitted
 */
Events.onSubmitSearch = 'onSubmitSearch';
/**
 * Called when the autocomplete bar starts searching
 */
Events.onSearch = 'onSearch';
/**
 * Called before the autocomplete bar starts searching
 */
Events.onBeforeSearch = 'onBeforeSearch';
/**
 * Called after the autocomplete bar finishes searching
 */
Events.onAfterSearch = 'onAfterSearch';
/**
 * When the arrow up or down is pressed
 */
Events.onArrowMovementSearch = 'onArrowMovementSearch';
Events.onForceResultBlur = 'onForceResultBlur';
/**
 * When the result should be updated
 */
Events.onResultRequest = 'onResultRequest';
/**
 * Before the results are updated
 */
Events.onBeforeResultRequest = 'onBeforeResultRequest';
/**
 * After the results are updated
 */
Events.onAfterResultRequest = 'onAfterResultRequest';
/**
 * When a page gets changed
 */
Events.onPageChange = 'onPageChange';
Events.onClickResult = 'onClickResult';
/**
 * When any of the aggregations are updated
 */
Events.onAggsUpdate = 'onAggsUpdate';
Events.onAggregationValueChange = 'onAggregationValueChange';
Events.autocompleteBarFinished = 'autocompleteBarFinished';
Events.groupedSearchBarFinished = 'groupedSearchBarFinished';
Events.resultFinished = 'resultFinished';
Events.aggregationFinished = 'aggregationFinished';
exports.Events = Events;


/***/ }),

/***/ 6121:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.optional = void 0;
class Optional {
    constructor(value) {
        this.value = value;
        if (typeof this.value === 'object' &&
            this.value !== null) {
            return new Proxy(this.value, {
                get(target, name, receiver) {
                    return Reflect.get(target, name, receiver);
                },
            });
        }
    }
}
function optional(value = null, callback = null) {
    if (callback === null) {
        return new Optional(value);
    }
    else if (value !== null) {
        return callback(value);
    }
}
exports.optional = optional;


/***/ }),

/***/ 8637:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URIHelper = void 0;
class URIHelper {
    static addToHistory(name, value, deleteOnExist = false) {
        const currentUrl = new URL(window.location.href);
        if (deleteOnExist && currentUrl.searchParams.has(name)) {
            const values = currentUrl.searchParams.getAll(name);
            const index = values.indexOf(String(value));
            if (index > -1) {
                currentUrl.searchParams.delete(name);
                delete values[index];
                values.forEach((v) => currentUrl.searchParams.append(name, v));
            }
            else {
                currentUrl.searchParams.append(name, value);
            }
        }
        else {
            currentUrl.searchParams.delete(name);
            if (value) {
                currentUrl.searchParams.append(name, value);
            }
        }
        let query = currentUrl.searchParams.toString();
        query = (query) ? `?${query}` : currentUrl.pathname;
        history.pushState({}, document.title, query);
    }
    static getSearchParam(name) {
        const currentUrl = new URL(window.location.href);
        return currentUrl.searchParams.get(name);
    }
    static getSearchParams(name) {
        const currentUrl = new URL(window.location.href);
        return currentUrl.searchParams.getAll(name);
    }
}
exports.URIHelper = URIHelper;


/***/ }),

/***/ 4753:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(8944), exports);
__exportStar(__webpack_require__(1142), exports);
__exportStar(__webpack_require__(4716), exports);
__exportStar(__webpack_require__(8987), exports);


/***/ }),

/***/ 7624:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(2894), exports);
__exportStar(__webpack_require__(8762), exports);


/***/ }),

/***/ 7288:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6137), exports);


/***/ }),

/***/ 844:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(8637), exports);
__exportStar(__webpack_require__(6121), exports);
__exportStar(__webpack_require__(7673), exports);


/***/ }),

/***/ 3910:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(8485), exports);
__exportStar(__webpack_require__(4226), exports);
__exportStar(__webpack_require__(4488), exports);
__exportStar(__webpack_require__(2260), exports);


/***/ }),

/***/ 15:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6108), exports);
__exportStar(__webpack_require__(4753), exports);
__exportStar(__webpack_require__(3910), exports);
__exportStar(__webpack_require__(7673), exports);


/***/ }),

/***/ 2260:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AggregationBar = void 0;
const BaseClasses_1 = __webpack_require__(7624);
const aggregation_bar_html_1 = __importDefault(__webpack_require__(5581));
const clear_filters_html_1 = __importDefault(__webpack_require__(757));
const mustache_1 = __importDefault(__webpack_require__(466));
const Helpers_1 = __webpack_require__(844);
class AggregationBar extends BaseClasses_1.Widget {
    constructor(options = {}) {
        super(options);
        this.discriminator = 'AggregationBar';
        this.useClearFilters = false;
        this.clearFiltersTop = false;
        this.clearFiltersBottom = false;
        this.clearFiltersText = 'Clear filters';
        this.clearFiltersHideOnNoneActive = true;
        this.aggregationActives = {};
        this.fields = [];
        this.setUseClearFilters((0, Helpers_1.optional)(options.clear_filters).use || this.getUseClearFilters());
        this.setClearFiltersTop((0, Helpers_1.optional)(options.clear_filters).top || this.getClearFiltersTop());
        this.setClearFiltersBottom((0, Helpers_1.optional)(options.clear_filters).bottom || this.getClearFiltersBottom());
        this.setClearFiltersText((0, Helpers_1.optional)(options.clear_filters).text || this.getClearFiltersText());
        this.setClearFiltersHideOnNoneActive((0, Helpers_1.optional)(options.clear_filters).hide_on_none_active ||
            this.getClearFiltersHideOnNoneActive());
    }
    setUseClearFilters(useClearFilters) {
        this.useClearFilters = useClearFilters;
        return this;
    }
    getUseClearFilters() {
        return this.useClearFilters;
    }
    setClearFiltersTop(clearFiltersTop) {
        this.clearFiltersTop = clearFiltersTop;
        return this;
    }
    getClearFiltersTop() {
        return this.clearFiltersTop;
    }
    setClearFiltersBottom(clearFiltersBottom) {
        this.clearFiltersBottom = clearFiltersBottom;
        return this;
    }
    getClearFiltersBottom() {
        return this.clearFiltersBottom;
    }
    setClearFiltersText(clearFiltersText) {
        this.clearFiltersText = clearFiltersText;
        return this;
    }
    getClearFiltersText() {
        return this.clearFiltersText;
    }
    setClearFiltersHideOnNoneActive(hideOnNoneActive) {
        this.clearFiltersHideOnNoneActive = hideOnNoneActive;
        return this;
    }
    getClearFiltersHideOnNoneActive() {
        return this.clearFiltersHideOnNoneActive;
    }
    addField(field) {
        this.fields.push(field);
        return this;
    }
    addMultipleFields(fields) {
        fields.forEach((field) => {
            this.fields.push(field);
        });
        return this;
    }
    getTemplate() {
        if (this.template) {
            return this.template;
        }
        return aggregation_bar_html_1.default;
    }
    setDiscriminator(discriminator) {
        this.discriminator = discriminator;
        return this;
    }
    getDiscriminator() {
        return this.discriminator;
    }
    render() {
        const template = this.getTemplate();
        const fields = [];
        this.fields.forEach((field) => {
            const renderedField = field.render();
            fields.push(renderedField);
        });
        const rendered = mustache_1.default.render(template, {
            fields: fields,
            clear_filters: this.renderClearFilters(),
            show_clear_filters_top: this.getClearFiltersTop(),
            show_clear_filters_bottom: this.getClearFiltersBottom(),
        });
        return document.createRange().createContextualFragment(rendered);
    }
    setClearFiltersTemplate(template) {
        this.clearFiltersTemplate = template;
        return this;
    }
    getClearFiltersTemplate() {
        if (this.clearFiltersTemplate) {
            return this.clearFiltersTemplate;
        }
        return clear_filters_html_1.default;
    }
    renderClearFilters() {
        const template = this.getClearFiltersTemplate();
        return mustache_1.default.render(template, {
            text: this.getClearFiltersText(),
            hidden: (this.getClearFiltersHideOnNoneActive()) ? 'needletail-hidden' : '',
        });
    }
    /**
     * Execute the JS for all the added fields
     */
    executeJS() {
        const elements = document.getElementsByClassName('needletail-clear-filters');
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', () => {
                this.fields.forEach((field) => {
                    field.reset();
                });
            });
        }
        document.addEventListener('DOMContentLoaded', () => {
            this.fields.forEach((field) => {
                // Dirty second fix, but works
                setTimeout(() => {
                    field.setDefaultCollapsed(false);
                }, 1000);
            });
            Helpers_1.Events.emit(Helpers_1.Events.onAggregationValueChange, {});
        });
        document.addEventListener(Helpers_1.Events.onAggregationValueChange, (e) => {
            this.aggregationActives[e.detail.name] = e.detail.hasActive;
            const clearFilters = document.getElementsByClassName('needletail-clear-filters');
            let hasShown = false;
            this.fields.forEach((field) => {
                let title = field.getTitle();
                if (field.discriminator === 'Range') {
                    title = field.getTitle() + '[min]';
                }
                if (!hasShown && Helpers_1.URIHelper.getSearchParam(title)) {
                    for (let i = 0; i < clearFilters.length; i++) {
                        clearFilters[i].classList.remove('needletail-hidden');
                    }
                    hasShown = true;
                }
            });
            if (!hasShown) {
                for (let i = 0; i < clearFilters.length; i++) {
                    clearFilters[i].classList.add('needletail-hidden');
                }
            }
        });
        this.fields.forEach((field) => {
            field.executeJS();
        });
        Helpers_1.Events.emit(Helpers_1.Events.aggregationFinished, {
            name: this.getDiscriminator(),
        });
    }
    getValues() {
        return this.fields.reduce((res, field) => {
            if (Object.keys(field.value).length > 0) {
                res.push(field.value);
            }
            return res;
        }, []);
    }
}
exports.AggregationBar = AggregationBar;


/***/ }),

/***/ 1142:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Checkbox = void 0;
const checkbox_html_1 = __importDefault(__webpack_require__(2213));
const BaseClasses_1 = __webpack_require__(7624);
const mustache_1 = __importDefault(__webpack_require__(466));
const Helpers_1 = __webpack_require__(844);
class Checkbox extends BaseClasses_1.Aggregation {
    constructor(options = {}) {
        super(options);
        this.discriminator = 'Checkbox';
        this.hideOnEmpty = true;
        this.useShowMoreOptions = true;
        this.showMoreOptionsText = 'Show more options';
        this.showLessOptionsText = 'Show less options';
        this.showMoreOptionsLoad = 10;
        this.optionOrder = [];
        this.neverHideChecked = true;
        this.showSelectedZero = true;
        this.setHideOnEmpty(options.hide_on_empty || this.getHideOnEmpty());
        this.setUseShowMoreOptions((typeof (0, Helpers_1.optional)(options.show_more_options).use !== 'undefined') ?
            options.show_more_options.use : this.getUseShowMoreOptions());
        this.setShowMoreOptionsText((0, Helpers_1.optional)(options.show_more_options).text ?
            options.show_more_options.text : this.getShowMoreOptionsText());
        this.setShowLessOptionsText((0, Helpers_1.optional)(options.show_more_options).less_text ?
            options.show_more_options.less_text : this.getShowLessOptionsText());
        this.setShowMoreOptionsLoad((0, Helpers_1.optional)(options.show_more_options).load ?
            options.show_more_options.load : this.getShowMoreOptionsLoad());
        this.setOptionOrder(options.option_order || this.getOptionOrder());
        this.setNeverHideChecked((0, Helpers_1.optional)(options.show_more_options).never_hide_checked ?
            options.show_more_options.never_hide_checked : this.getNeverHideChecked());
        this.setShowSelectedZero((typeof options.show_selected_zero !== 'undefined') ?
            options.show_selected_zero : this.getShowSelectedZero());
        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };
    }
    setOptionOrder(optionOrder) {
        this.optionOrder = optionOrder.map((o) => {
            return o.toLowerCase();
        });
        return this;
    }
    getOptionOrder() {
        return this.optionOrder;
    }
    setShowSelectedZero(showSelectedZero) {
        this.showSelectedZero = showSelectedZero;
        return this;
    }
    getShowSelectedZero() {
        return this.showSelectedZero;
    }
    setNeverHideChecked(neverHideChecked) {
        this.neverHideChecked = neverHideChecked;
        return this;
    }
    getNeverHideChecked() {
        return this.neverHideChecked;
    }
    setUseShowMoreOptions(useShowMoreOptions) {
        this.useShowMoreOptions = useShowMoreOptions;
        return this;
    }
    getUseShowMoreOptions() {
        return this.useShowMoreOptions;
    }
    setShowMoreOptionsText(showMoreOptionsText) {
        this.showMoreOptionsText = showMoreOptionsText;
        return this;
    }
    getShowMoreOptionsText() {
        return this.showMoreOptionsText;
    }
    setShowLessOptionsText(showLessOptionsText) {
        this.showLessOptionsText = showLessOptionsText;
        return this;
    }
    getShowLessOptionsText() {
        return this.showLessOptionsText;
    }
    setShowMoreOptionsLoad(showMoreOptionsLoad) {
        this.showMoreOptionsLoad = showMoreOptionsLoad;
        return this;
    }
    getShowMoreOptionsLoad() {
        return this.showMoreOptionsLoad;
    }
    getTemplate() {
        if (this.template) {
            return this.template;
        }
        return checkbox_html_1.default;
    }
    setHideOnEmpty(hideOnEmpty) {
        this.hideOnEmpty = hideOnEmpty;
        return this;
    }
    getHideOnEmpty() {
        return this.hideOnEmpty;
    }
    render(options = []) {
        const template = this.getTemplate();
        if (this.getOptionOrder()) {
            options.sort((a, b) => {
                let indexA = this.getOptionOrder().indexOf(a.value.toLowerCase());
                let indexB = this.getOptionOrder().indexOf(b.value.toLowerCase());
                if (indexA === -1) {
                    indexA = 9999;
                }
                if (indexB === -1) {
                    indexB = 9999;
                }
                return indexA - indexB;
            });
        }
        return mustache_1.default.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            options: options,
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '',
            show_more_options: this.getUseShowMoreOptions(),
            show_more_options_text: this.getShowMoreOptionsText(),
            show_less_options_text: this.getShowLessOptionsText(),
        });
    }
    /**
     * Add listeners, set the default value
     */
    executeJS() {
        const title = this.getTitle();
        document.addEventListener(Helpers_1.Events.onAggsUpdate, (e) => {
            if (e.detail[this.getAttribute()]) {
                const options = [];
                e.detail[this.getAttribute()].forEach((val) => {
                    options.push(Object.assign({ name: this.getClassTitle() }, val));
                });
                // Whenever the aggregation gets updated it has to be rerendered
                const textElement = this.render(options);
                const node = document.createRange().createContextualFragment(textElement);
                let wasCollapsed = false;
                let wasShownMoreOptions = false;
                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-checkbox.needletail-aggregation-checkbox-${this.getClassTitle()}`)
                    .forEach((element) => {
                    wasCollapsed = element.classList.contains('needletail-collapsed');
                    const showMoreOptionsElement = element.querySelector('.needletail-show-more-options');
                    const showLessOptionsElement = element.querySelector('.needletail-show-less-options');
                    if (this.getUseShowMoreOptions()) {
                        wasShownMoreOptions = !showMoreOptionsElement.classList.contains('needletail-hidden');
                        const bothHidden = (showMoreOptionsElement.classList.contains('needletail-hidden') &&
                            showLessOptionsElement.classList.contains('needletail-hidden'));
                        if (bothHidden) {
                            wasShownMoreOptions = true;
                        }
                    }
                    element.replaceWith(node.cloneNode(true));
                });
                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-checkbox.needletail-aggregation-checkbox-${this.getClassTitle()}`)
                    .forEach((element) => {
                    if (this.getCollapsible()) {
                        element.querySelector('.needletail-aggregation-checkbox-title')
                            .addEventListener('click', (e) => {
                            if (element.classList.contains('needletail-collapsed')) {
                                element.classList.remove('needletail-collapsed');
                            }
                            else {
                                element.classList.add('needletail-collapsed');
                            }
                        });
                        if (wasCollapsed) {
                            element.classList.add('needletail-collapsed');
                        }
                    }
                    element.setAttribute('data-option-count', options.length.toString());
                    if (this.getHideOnEmpty()) {
                        if (options.length === 0) {
                            element.classList.add('needletail-empty');
                        }
                        else {
                            element.classList.remove('needletail-empty');
                        }
                    }
                    if (this.getUseShowMoreOptions()) {
                        const showMoreOptions = element
                            .querySelector('.needletail-show-more-options');
                        const showLessOptions = element
                            .querySelector('.needletail-show-less-options');
                        const checkboxOptions = element
                            .querySelectorAll('.needletail-aggregation-checkbox-option');
                        if (checkboxOptions.length <= this.getShowMoreOptionsLoad()) {
                            showMoreOptions.classList.add('needletail-hidden');
                        }
                        const max = (this.getShowMoreOptionsLoad() > checkboxOptions.length) ?
                            checkboxOptions.length : this.getShowMoreOptionsLoad();
                        for (let i = 0; i < max; i++) {
                            checkboxOptions.item(i).classList.remove('needletail-hidden');
                        }
                        showMoreOptions.addEventListener('click', (e) => {
                            showMoreOptions.classList.add('needletail-hidden');
                            showLessOptions.classList.remove('needletail-hidden');
                            for (let i = this.getShowMoreOptionsLoad(); i < checkboxOptions.length; i++) {
                                checkboxOptions.item(i).classList.remove('needletail-hidden');
                            }
                        });
                        showLessOptions.addEventListener('click', (e) => {
                            showLessOptions.classList.add('needletail-hidden');
                            showMoreOptions.classList.remove('needletail-hidden');
                            for (let i = this.getShowMoreOptionsLoad(); i < checkboxOptions.length; i++) {
                                const item = checkboxOptions.item(i);
                                const input = item
                                    .querySelector('.needletail-aggregation-checkbox-option-input');
                                if (!input.checked || !this.getNeverHideChecked()) {
                                    item.classList.add('needletail-hidden');
                                }
                            }
                        });
                        if (!wasShownMoreOptions &&
                            checkboxOptions.length > this.getShowMoreOptionsLoad()) {
                            showMoreOptions.click();
                        }
                    }
                });
                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation-checkbox-option-input.needletail-aggregation-checkbox-option-input-${this.getClassTitle()}`)
                    .forEach((element) => {
                    element.addEventListener('change', () => {
                        this.handle(element);
                    });
                });
                // Set the default value for the aggregation
                const params = Helpers_1.URIHelper.getSearchParams(title);
                if (params) {
                    params.forEach((value) => {
                        // eslint-disable-next-line max-len
                        const elements = document.querySelectorAll(`.needletail-aggregation-checkbox-option-input-${this.getClassTitle()}[value='${value}']`);
                        if (elements.length === 0) {
                            if (this.getShowSelectedZero()) {
                                const strippedValue = value.replace(/(<([^>]+)>)/gi, '');
                                if (strippedValue) {
                                    // eslint-disable-next-line max-len
                                    const lastItems = document.querySelectorAll(`.needletail-aggregation-checkbox-${this.getClassTitle()} .needletail-aggregation-checkbox-option`);
                                    const lastItem = lastItems[lastItems.length - 1];
                                    const newItem = lastItem.cloneNode(true);
                                    lastItem.after(newItem);
                                    // eslint-disable-next-line max-len
                                    const newLastItems = document.querySelectorAll(`.needletail-aggregation-checkbox-${this.getClassTitle()} .needletail-aggregation-checkbox-option`);
                                    const newLastItem = newLastItems[newLastItems.length - 1];
                                    const text = newLastItem.querySelector('.needletail-aggregation-checkbox-option-label');
                                    const count = newLastItem.querySelector('.needletail-aggregation-checkbox-option-count');
                                    // eslint-disable-next-line max-len
                                    const input = newLastItem.querySelector('.needletail-aggregation-checkbox-option-input');
                                    if (text) {
                                        text.innerHTML = strippedValue;
                                    }
                                    if (count) {
                                        count.innerHTML = '0';
                                    }
                                    if (input) {
                                        input.setAttribute('value', strippedValue);
                                        input.checked = true;
                                        this.values[strippedValue] = strippedValue;
                                        input.addEventListener('change', () => {
                                            this.handle(input);
                                        });
                                    }
                                }
                            }
                        }
                        else {
                            elements.forEach((element) => {
                                element.checked = true;
                                element.parentElement.classList.remove('needletail-hidden');
                            });
                        }
                    });
                }
            }
            else {
                if (this.getHideOnEmpty()) {
                    // eslint-disable-next-line max-len
                    document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-checkbox.needletail-aggregation-checkbox-${this.getClassTitle()}`)
                        .forEach((element) => {
                        element.classList.add('needletail-empty');
                    });
                }
            }
        });
        const params = Helpers_1.URIHelper.getSearchParams(title);
        // On load set the values for the aggregation search
        if (params) {
            params.forEach((value) => {
                if (value) {
                    this.values[value] = value;
                }
            });
            this.value = {
                field: this.getAttribute(),
                value: Object.keys(this.values),
                is_aggregation: true,
            };
            this.hasActiveAggregation = true;
            if (Object.keys(this.values).length === 0) {
                this.hasActiveAggregation = false;
                this.value = {
                    field: this.getAttribute(),
                    value: '',
                    is_aggregation: true,
                    exclude_from_search: true,
                };
            }
            Helpers_1.Events.emit(Helpers_1.Events.onAggregationValueChange, {
                'name': this.getAttribute(),
                'hasActive': this.hasActiveAggregation,
            });
        }
    }
    handle(element, skipHistory = false) {
        if (!skipHistory) {
            Helpers_1.URIHelper.addToHistory(this.getTitle(), element.value, true);
        }
        if (this.values[element.value]) {
            delete this.values[element.value];
        }
        else {
            this.values[element.value] = element.value;
        }
        this.value = {
            field: this.getAttribute(),
            value: Object.keys(this.values),
            is_aggregation: true,
        };
        this.hasActiveAggregation = true;
        if (Object.keys(this.values).length === 0) {
            this.value = {
                field: this.getAttribute(),
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            };
            this.hasActiveAggregation = false;
        }
        Helpers_1.Events.emit(Helpers_1.Events.onBeforeResultRequest, {});
        Helpers_1.Events.emit(Helpers_1.Events.onAggregationValueChange, {
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
        });
    }
    reset() {
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-checkbox-option-input.needletail-aggregation-checkbox-option-input-${this.getClassTitle()}`)
            .forEach((element) => {
            if (element.checked) {
                element.checked = false;
                this.handle(element);
            }
        });
    }
}
exports.Checkbox = Checkbox;


/***/ }),

/***/ 4716:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Radio = void 0;
const radio_html_1 = __importDefault(__webpack_require__(9256));
const BaseClasses_1 = __webpack_require__(7624);
const mustache_1 = __importDefault(__webpack_require__(466));
const Helpers_1 = __webpack_require__(844);
class Radio extends BaseClasses_1.Aggregation {
    constructor(options = {}) {
        super(options);
        this.discriminator = 'Radio';
        this.hideOnEmpty = true;
        this.useShowMoreOptions = true;
        this.showMoreOptionsText = 'Show more options';
        this.showLessOptionsText = 'Show less options';
        this.showMoreOptionsLoad = 10;
        this.optionOrder = [];
        this.setHideOnEmpty(options.hide_on_empty || this.getHideOnEmpty());
        this.setUseShowMoreOptions((typeof (0, Helpers_1.optional)(options.show_more_options).use !== 'undefined') ?
            options.show_more_options.use : this.getUseShowMoreOptions());
        this.setShowMoreOptionsText((0, Helpers_1.optional)(options.show_more_options).text ?
            options.show_more_options.text : this.getShowMoreOptionsText());
        this.setShowLessOptionsText((0, Helpers_1.optional)(options.show_more_options).less_text ?
            options.show_more_options.less_text : this.getShowLessOptionsText());
        this.setShowMoreOptionsLoad((0, Helpers_1.optional)(options.show_more_options).load ?
            options.show_more_options.load : this.getShowMoreOptionsLoad());
        this.setOptionOrder(options.option_order || this.getOptionOrder());
        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };
    }
    setOptionOrder(optionOrder) {
        this.optionOrder = optionOrder.map((o) => {
            return o.toLowerCase();
        });
        return this;
    }
    getOptionOrder() {
        return this.optionOrder;
    }
    setUseShowMoreOptions(useShowMoreOptions) {
        this.useShowMoreOptions = useShowMoreOptions;
        return this;
    }
    getUseShowMoreOptions() {
        return this.useShowMoreOptions;
    }
    setShowMoreOptionsText(showMoreOptionsText) {
        this.showMoreOptionsText = showMoreOptionsText;
        return this;
    }
    getShowMoreOptionsText() {
        return this.showMoreOptionsText;
    }
    setShowLessOptionsText(showLessOptionsText) {
        this.showLessOptionsText = showLessOptionsText;
        return this;
    }
    getShowLessOptionsText() {
        return this.showLessOptionsText;
    }
    setShowMoreOptionsLoad(showMoreOptionsLoad) {
        this.showMoreOptionsLoad = showMoreOptionsLoad;
        return this;
    }
    getShowMoreOptionsLoad() {
        return this.showMoreOptionsLoad;
    }
    getTemplate() {
        if (this.template) {
            return this.template;
        }
        return radio_html_1.default;
    }
    setHideOnEmpty(hideOnEmpty) {
        this.hideOnEmpty = hideOnEmpty;
        return this;
    }
    getHideOnEmpty() {
        return this.hideOnEmpty;
    }
    render(options = []) {
        const template = this.getTemplate();
        if (this.getOptionOrder()) {
            options.sort((a, b) => {
                let indexA = this.getOptionOrder().indexOf(a.value.toLowerCase());
                let indexB = this.getOptionOrder().indexOf(b.value.toLowerCase());
                if (indexA === -1) {
                    indexA = 9999;
                }
                if (indexB === -1) {
                    indexB = 9999;
                }
                return indexA - indexB;
            });
        }
        return mustache_1.default.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            options: options,
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '',
            show_more_options: this.getUseShowMoreOptions(),
            show_more_options_text: this.getShowMoreOptionsText(),
            show_less_options_text: this.getShowLessOptionsText(),
        });
    }
    /**
     * Add listeners, set the default value
     */
    executeJS() {
        const title = this.getTitle();
        const prevVal = Helpers_1.URIHelper.getSearchParam(title);
        document.addEventListener(Helpers_1.Events.onAggsUpdate, (e) => {
            if (e.detail[this.getAttribute()]) {
                const options = [];
                e.detail[this.getAttribute()].forEach((val) => {
                    options.push(Object.assign({ name: this.getClassTitle() }, val));
                });
                // Re-render the options
                const textElement = this.render(options);
                const node = document.createRange().createContextualFragment(textElement);
                let wasCollapsed = false;
                let wasShownMoreOptions = false;
                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-radio.needletail-aggregation-radio-${this.getClassTitle()}`)
                    .forEach((element) => {
                    wasCollapsed = element.classList.contains('needletail-collapsed');
                    const showMoreOptionsElement = element.querySelector('.needletail-show-more-options');
                    const showLessOptionsElement = element.querySelector('.needletail-show-less-options');
                    if (this.getUseShowMoreOptions()) {
                        wasShownMoreOptions = !showMoreOptionsElement.classList.contains('needletail-hidden');
                        const bothHidden = (showMoreOptionsElement.classList.contains('needletail-hidden') &&
                            showLessOptionsElement.classList.contains('needletail-hidden'));
                        if (bothHidden) {
                            wasShownMoreOptions = true;
                        }
                    }
                    element.replaceWith(node.cloneNode(true));
                });
                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-radio.needletail-aggregation-radio-${this.getClassTitle()}`)
                    .forEach((element) => {
                    if (this.getCollapsible()) {
                        element.querySelector('.needletail-aggregation-radio-title')
                            .addEventListener('click', (e) => {
                            if (element.classList.contains('needletail-collapsed')) {
                                element.classList.remove('needletail-collapsed');
                            }
                            else {
                                element.classList.add('needletail-collapsed');
                            }
                        });
                        if (wasCollapsed) {
                            element.classList.add('needletail-collapsed');
                        }
                    }
                    element.setAttribute('data-option-count', options.length.toString());
                    if (this.getHideOnEmpty()) {
                        if (options.length === 0) {
                            element.classList.add('needletail-empty');
                        }
                        else {
                            element.classList.remove('needletail-empty');
                        }
                    }
                    if (this.getUseShowMoreOptions()) {
                        const showMoreOptions = element.querySelector('.needletail-show-more-options');
                        const showLessOptions = element.querySelector('.needletail-show-less-options');
                        const radioOptions = element.querySelectorAll('.needletail-aggregation-radio-option');
                        if (radioOptions.length <= this.getShowMoreOptionsLoad()) {
                            showMoreOptions.classList.add('needletail-hidden');
                        }
                        const max = (this.getShowMoreOptionsLoad() > radioOptions.length) ?
                            radioOptions.length : this.getShowMoreOptionsLoad();
                        for (let i = 0; i < max; i++) {
                            radioOptions.item(i).classList.remove('needletail-hidden');
                        }
                        showMoreOptions.addEventListener('click', (e) => {
                            showMoreOptions.classList.add('needletail-hidden');
                            showLessOptions.classList.remove('needletail-hidden');
                            for (let i = this.getShowMoreOptionsLoad(); i < radioOptions.length; i++) {
                                radioOptions.item(i).classList.remove('needletail-hidden');
                            }
                        });
                        showLessOptions.addEventListener('click', (e) => {
                            showLessOptions.classList.add('needletail-hidden');
                            showMoreOptions.classList.remove('needletail-hidden');
                            for (let i = this.getShowMoreOptionsLoad(); i < radioOptions.length; i++) {
                                radioOptions.item(i).classList.add('needletail-hidden');
                            }
                        });
                        if (!wasShownMoreOptions &&
                            radioOptions.length > this.getShowMoreOptionsLoad()) {
                            showMoreOptions.click();
                        }
                    }
                });
                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.getClassTitle()}`)
                    .forEach((element) => {
                    element.addEventListener('change', () => {
                        this.handle(element);
                    });
                });
                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.getClassTitle()}`)
                    .forEach((element) => {
                    // If the value is in the parameters check it
                    element.checked = (Helpers_1.URIHelper.getSearchParam(title) === element.value);
                    element.addEventListener('change', () => {
                        this.handle(element);
                    });
                });
            }
        });
        this.value = {
            field: this.getAttribute(),
            value: prevVal,
            is_aggregation: true,
        };
    }
    handle(element, skipHistory = false, removeFromHistory = false) {
        if (!skipHistory) {
            Helpers_1.URIHelper.addToHistory(this.getTitle(), element.value, removeFromHistory);
        }
        if (removeFromHistory) {
            element.value = '';
        }
        this.value = {
            field: this.getAttribute(),
            value: element.value,
            is_aggregation: true,
        };
        this.hasActiveAggregation = true;
        if (!element.value) {
            this.value = {
                field: this.getAttribute(),
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            };
            this.hasActiveAggregation = false;
        }
        Helpers_1.Events.emit(Helpers_1.Events.onBeforeResultRequest, {});
        Helpers_1.Events.emit(Helpers_1.Events.onAggregationValueChange, {
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
        });
    }
    reset() {
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.getClassTitle()}`)
            .forEach((element) => {
            if (element.checked) {
                element.checked = false;
                this.handle(element, false, true);
            }
        });
    }
}
exports.Radio = Radio;


/***/ }),

/***/ 8987:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Slider = void 0;
const slider_html_1 = __importDefault(__webpack_require__(4131));
const slider_range_html_1 = __importDefault(__webpack_require__(6345));
const BaseClasses_1 = __webpack_require__(7624);
const mustache_1 = __importDefault(__webpack_require__(466));
const debounce_1 = __importDefault(__webpack_require__(3279));
const Helpers_1 = __webpack_require__(844);
class Slider extends BaseClasses_1.Aggregation {
    constructor(options = {}) {
        super(options);
        this.discriminator = 'Range';
        this.range = false;
        this.type = 'to';
        this.allowedTypes = ['to', 'from', 'from:to'];
        this.inputs = 'top';
        this.allowedInputs = ['top', 'bottom'];
        this.displayOnly = false;
        this.setRange(options.min || 0, options.max || 10);
        this.setDefaultValue((typeof options.default_value === 'number') ? options.default_value : 5);
        this.setRangeSlider((typeof options.range !== 'undefined') ?
            options.range : this.getRangeSlider());
        this.setDefaultRangeMin(options.default_range_min || this.getMin());
        this.setDefaultRangeMax(options.default_range_max || this.getMax());
        this.setType(options.type || this.getType());
        this.setInputs(options.inputs || this.getInputs());
        this.setDisplayOnly((typeof options.display_only !== 'undefined') ?
            options.display_only : this.getDisplayOnly());
        let value = this.getDefaultValue().toString();
        if (this.getRangeSlider()) {
            this.setType('from:to');
            value = this.getDefaultRangeMin() + ':' + this.getDefaultRangeMax();
        }
        this.value = {
            field: this.getAttribute(),
            value: value,
            type: this.getType(),
            is_aggregation: true,
            exclude_from_search: true,
        };
        this.ranges = {};
        this.elements = {};
    }
    setDisplayOnly(displayOnly) {
        this.displayOnly = displayOnly;
        return this;
    }
    getDisplayOnly() {
        return this.displayOnly;
    }
    setType(type) {
        if (this.allowedTypes.indexOf(type) === -1) {
            type = 'to';
        }
        else if (type === 'from:to' && !this.getRangeSlider()) {
            type = 'to';
        }
        this.type = type;
        return this;
    }
    getType() {
        return this.type;
    }
    setInputs(inputs) {
        if (this.allowedInputs.indexOf(inputs) === -1) {
            inputs = 'top';
        }
        this.inputs = inputs;
        return this;
    }
    getInputs() {
        return this.inputs;
    }
    setRangeSlider(rangeSlider) {
        this.range = rangeSlider;
        return this;
    }
    getRangeSlider() {
        return this.range;
    }
    setMin(min) {
        this.min = min;
        return this;
    }
    getMin() {
        return this.min;
    }
    setMax(max) {
        this.max = max;
        return this;
    }
    getMax() {
        return this.max;
    }
    setDefaultValue(value) {
        this.defaultValue = value;
        return this;
    }
    getDefaultValue() {
        return this.defaultValue;
    }
    setDefaultRangeMin(min) {
        this.defaultRangeMin = min;
        return this;
    }
    getDefaultRangeMin() {
        return this.defaultRangeMin;
    }
    setDefaultRangeMax(max) {
        this.defaultRangeMax = max;
        return this;
    }
    getDefaultRangeMax() {
        return this.defaultRangeMax;
    }
    setRange(min, max) {
        this.setMin(min);
        this.setMax(max);
        return this;
    }
    getTemplate() {
        if (this.template) {
            return this.template;
        }
        if (this.getRangeSlider()) {
            return slider_range_html_1.default;
        }
        return slider_html_1.default;
    }
    render() {
        const template = this.getTemplate();
        return mustache_1.default.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            name: this.getClassTitle(),
            min: this.getMin(),
            max: this.getMax(),
            value: this.getDefaultValue(),
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '',
            inputs_bottom: (this.getInputs() === 'bottom'),
            inputs_top: (this.getInputs() === 'top'),
            display_only: (this.getDisplayOnly()) ? 'display-only' : '',
        });
    }
    /**
     * Add listeners, set the default value
     */
    executeJS() {
        const title = this.getTitle();
        const prevVal = Helpers_1.URIHelper.getSearchParam(title);
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-slider-input.needletail-aggregation-slider-input-${this.getClassTitle()}`)
            .forEach((element) => {
            element.value = prevVal || this.getDefaultValue().toString();
            document.addEventListener('DOMContentLoaded', () => {
                this.handle(element, true);
            });
            element.addEventListener('change', () => {
                this.handle(element);
            });
        });
        document.querySelectorAll('.needletail-aggregation-slider-container__range').forEach((element) => {
            document.addEventListener('DOMContentLoaded', () => {
                this.elements[this.getClassTitle()] = {
                    slider: element.querySelector('.needletail-aggregation-slider-range'),
                    inputMin: element.querySelector('.needletail-aggregation-slider-input-min'),
                    inputMax: element.querySelector('.needletail-aggregation-slider-input-max'),
                    leftSlider: element.querySelector('.needletail-aggregation-slider-range-left'),
                    rightSlider: element.querySelector('.needletail-aggregation-slider-range-right'),
                    divider: element.querySelector('.needletail-aggregation-slider-range-divider'),
                };
                const slider = this.elements[this.getClassTitle()].slider;
                const inputMin = this.elements[this.getClassTitle()].inputMin;
                const inputMax = this.elements[this.getClassTitle()].inputMax;
                const leftSlider = this.elements[this.getClassTitle()].leftSlider;
                const rightSlider = this.elements[this.getClassTitle()].rightSlider;
                const divider = this.elements[this.getClassTitle()].divider;
                inputMin.value = Helpers_1.URIHelper.getSearchParam(title + '[min]') || this.getDefaultRangeMin().toString();
                inputMax.value = Helpers_1.URIHelper.getSearchParam(title + '[max]') || this.getDefaultRangeMax().toString();
                [inputMin, inputMax].forEach((input) => {
                    input.min = this.getMin().toString();
                    input.max = this.getMax().toString();
                });
                this.ranges[this.getClassTitle()] = this.calculatePositions(slider, leftSlider, rightSlider);
                window.onresize = (e) => {
                    this.ranges[this.getClassTitle()] = this.calculatePositions(slider, leftSlider, rightSlider);
                    this.calculateDivider(divider, leftSlider, rightSlider);
                };
                inputMin.addEventListener('change', (0, debounce_1.default)(() => {
                    if (parseInt(inputMin.value) < this.getMin()) {
                        inputMin.value = this.getMin().toString();
                    }
                    else if (parseInt(inputMin.value) > parseInt(inputMax.value)) {
                        inputMin.value = inputMax.value;
                    }
                    const percentage = ((100 / this.getMax()) * parseInt(inputMin.value));
                    leftSlider.style.left = percentage + '%';
                    inputMax.min = inputMin.value;
                    this.calculateDivider(divider, leftSlider, rightSlider);
                    this.handleRange(inputMin, inputMax);
                }, 200));
                inputMax.addEventListener('change', (0, debounce_1.default)(() => {
                    if (parseInt(inputMax.value) > this.getMax()) {
                        inputMax.value = this.getMax().toString();
                    }
                    else if (parseInt(inputMax.value) < parseInt(inputMin.value)) {
                        inputMax.value = inputMin.value;
                    }
                    const percentage = ((100 / this.getMax()) * parseInt(inputMax.value));
                    rightSlider.style.left = `${percentage}%`;
                    inputMin.max = inputMax.value;
                    this.calculateDivider(divider, leftSlider, rightSlider);
                    this.handleRange(inputMin, inputMax);
                }, 200));
                leftSlider.addEventListener('mousedown', (e) => {
                    document.onmousemove = (e) => {
                        e.preventDefault();
                        this.moveLeft(e);
                    };
                    document.onmouseup = (e) => {
                        document.onmouseup = null;
                        document.onmousemove = null;
                    };
                });
                leftSlider.addEventListener('touchstart', (e) => {
                    document.ontouchmove = (e) => {
                        e.preventDefault();
                        this.moveLeft(e);
                    };
                    document.ontouchend = (e) => {
                        document.ontouchend = null;
                        document.ontouchmove = null;
                    };
                });
                rightSlider.addEventListener('mousedown', (e) => {
                    document.onmousemove = (e) => {
                        e.preventDefault();
                        this.moveRight(e);
                    };
                    document.onmouseup = (e) => {
                        document.onmouseup = null;
                        document.onmousemove = null;
                    };
                });
                rightSlider.addEventListener('touchstart', (e) => {
                    document.ontouchmove = (e) => {
                        e.preventDefault();
                        this.moveRight(e);
                    };
                    document.ontouchend = (e) => {
                        document.ontouchend = null;
                        document.ontouchmove = null;
                    };
                });
                if (Helpers_1.URIHelper.getSearchParam(title + '[min]')) {
                    leftSlider.style.left = (100 / this.getMax()) * parseInt(inputMin.value) + '%';
                }
                if (Helpers_1.URIHelper.getSearchParam(title + '[max]')) {
                    rightSlider.style.left = `${(100 / this.getMax()) * parseInt(inputMax.value)}%`;
                }
                this.calculateDivider(divider, leftSlider, rightSlider);
            });
        });
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-slider.needletail-aggregation-slider-${this.getClassTitle()}`)
            .forEach((element) => {
            if (this.getCollapsible()) {
                element.querySelector('.needletail-aggregation-slider-title')
                    .addEventListener('click', (e) => {
                    if (element.classList.contains('needletail-collapsed')) {
                        element.classList.remove('needletail-collapsed');
                    }
                    else {
                        element.classList.add('needletail-collapsed');
                    }
                });
            }
        });
    }
    handle(element, skipHistory = false) {
        if (!skipHistory) {
            Helpers_1.URIHelper.addToHistory(this.getTitle(), element.value);
        }
        this.value = {
            field: this.getAttribute(),
            value: element.value,
            type: this.getType(),
            is_aggregation: true,
        };
        this.hasActiveAggregation = true;
        if (!element.value) {
            this.value = {
                field: this.getAttribute(),
                value: this.getDefaultValue(),
                type: this.getType(),
                is_aggregation: true,
                exclude_from_search: true,
            };
            this.hasActiveAggregation = false;
        }
        Helpers_1.Events.emit(Helpers_1.Events.onBeforeResultRequest, {});
        Helpers_1.Events.emit(Helpers_1.Events.onAggregationValueChange, {
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
        });
    }
    handleRange(inputMin, inputMax, skipHistory = false) {
        if (!skipHistory) {
            Helpers_1.URIHelper.addToHistory(this.getTitle() + '[min]', inputMin.value);
            Helpers_1.URIHelper.addToHistory(this.getTitle() + '[max]', inputMax.value);
        }
        this.value = {
            field: this.getAttribute(),
            value: inputMin.value + ':' + inputMax.value,
            type: this.getType(),
            is_aggregation: true,
        };
        this.hasActiveAggregation = true;
        if (!inputMin.value && !inputMax.value) {
            this.value = {
                field: this.getAttribute(),
                value: this.getMin() + ':' + this.getMax(),
                type: this.getType(),
                is_aggregation: true,
                exclude_from_search: true,
            };
            this.hasActiveAggregation = false;
        }
        Helpers_1.Events.emit(Helpers_1.Events.onBeforeResultRequest, {});
        Helpers_1.Events.emit(Helpers_1.Events.onAggregationValueChange, {
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
        });
    }
    reset() {
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-slider-input.needletail-aggregation-slider-input-${this.getClassTitle()}`)
            .forEach((element) => {
            element.value = this.getDefaultValue().toString();
            this.handle(element);
            Helpers_1.URIHelper.addToHistory(this.getTitle(), element.value, true);
            Helpers_1.Events.emit(Helpers_1.Events.onAggregationValueChange, {
                'name': this.getAttribute(),
                'hasActive': false,
            });
        });
        document.querySelectorAll('.needletail-aggregation-slider-container__range')
            .forEach((element) => {
            const inputMin = this.elements[this.getClassTitle()].inputMin;
            const inputMax = this.elements[this.getClassTitle()].inputMax;
            const leftSlider = this.elements[this.getClassTitle()].leftSlider;
            const rightSlider = this.elements[this.getClassTitle()].rightSlider;
            const divider = this.elements[this.getClassTitle()].divider;
            inputMin.value = this.getDefaultRangeMin().toString();
            inputMax.value = this.getDefaultRangeMax().toString();
            leftSlider.style.left = (100 / this.getMax()) * parseInt(inputMin.value) + '%';
            rightSlider.style.left = (100 / this.getMax()) * parseInt(inputMax.value) + '%';
            this.handleRange(inputMin, inputMax);
            this.calculateDivider(divider, leftSlider, rightSlider);
            Helpers_1.URIHelper.addToHistory(this.getTitle() + '[min]', inputMin.value, true);
            Helpers_1.URIHelper.addToHistory(this.getTitle() + '[max]', inputMax.value, true);
            Helpers_1.Events.emit(Helpers_1.Events.onAggregationValueChange, {
                'name': this.getAttribute(),
                'hasActive': false,
            });
            this.ranges[this.getClassTitle()].leftPosition = this.ranges[this.getClassTitle()].startLeft;
            this.ranges[this.getClassTitle()].rightPosition = this.ranges[this.getClassTitle()].startRight;
        });
    }
    calculatePositions(slider, leftSlider, rightSlider) {
        const startLeft = slider.getBoundingClientRect().x;
        const startRight = slider.getBoundingClientRect().x + slider.offsetWidth;
        const leftPosition = leftSlider.getBoundingClientRect().x;
        const rightPosition = rightSlider.getBoundingClientRect().x;
        const total = startRight - startLeft;
        return {
            startLeft: startLeft,
            startRight: startRight,
            leftPosition: leftPosition,
            rightPosition: rightPosition,
            total: total,
        };
    }
    calculateDivider(divider, leftSlider, rightSlider) {
        const width = rightSlider.offsetLeft - leftSlider.offsetLeft;
        divider.style.width = width + 'px';
        divider.style.left = `${leftSlider.style.left}`;
    }
    moveRight(e) {
        var _a;
        const clientX = (_a = e.clientX) !== null && _a !== void 0 ? _a : e.touches[0].clientX;
        const inputMax = this.elements[this.getClassTitle()].inputMax;
        const leftSlider = this.elements[this.getClassTitle()].leftSlider;
        const rightSlider = this.elements[this.getClassTitle()].rightSlider;
        const divider = this.elements[this.getClassTitle()].divider;
        if (!this.ranges[this.getClassTitle()]) {
            return;
        }
        let newLeft = (clientX - rightSlider.offsetWidth);
        if (newLeft < this.ranges[this.getClassTitle()].leftPosition) {
            newLeft = this.ranges[this.getClassTitle()].leftPosition;
        }
        else if (newLeft > this.ranges[this.getClassTitle()].startRight) {
            newLeft = this.ranges[this.getClassTitle()].startRight;
        }
        this.ranges[this.getClassTitle()].rightPosition = newLeft;
        const percentage = (100 / this.ranges[this.getClassTitle()].total) *
            (newLeft - this.ranges[this.getClassTitle()].startLeft);
        rightSlider.style.left = `${percentage}%`;
        inputMax.value = Math.round(((this.getMax() / 100) * percentage) + this.getMin()).toString();
        inputMax.dispatchEvent(new Event('change'));
        this.calculateDivider(divider, leftSlider, rightSlider);
    }
    moveLeft(e) {
        var _a;
        const clientX = (_a = e.clientX) !== null && _a !== void 0 ? _a : e.touches[0].clientX;
        const inputMin = this.elements[this.getClassTitle()].inputMin;
        const leftSlider = this.elements[this.getClassTitle()].leftSlider;
        const rightSlider = this.elements[this.getClassTitle()].rightSlider;
        const divider = this.elements[this.getClassTitle()].divider;
        if (!this.ranges[this.getClassTitle()]) {
            return;
        }
        let newLeft = (clientX - (leftSlider.offsetWidth / 2));
        if (newLeft > this.ranges[this.getClassTitle()].rightPosition) {
            newLeft = this.ranges[this.getClassTitle()].rightPosition;
        }
        else if (newLeft < this.ranges[this.getClassTitle()].startLeft) {
            newLeft = this.ranges[this.getClassTitle()].startLeft;
        }
        this.ranges[this.getClassTitle()].leftPosition = newLeft;
        const percentage = (100 / this.ranges[this.getClassTitle()].total) *
            (newLeft - this.ranges[this.getClassTitle()].startLeft);
        leftSlider.style.left = percentage + '%';
        inputMin.value = Math.round(((this.getMax() / 100) * percentage) + this.getMin()).toString();
        inputMin.dispatchEvent(new Event('change'));
        this.calculateDivider(divider, leftSlider, rightSlider);
    }
}
exports.Slider = Slider;


/***/ }),

/***/ 8944:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Switch = void 0;
const switch_html_1 = __importDefault(__webpack_require__(8306));
const BaseClasses_1 = __webpack_require__(7624);
const mustache_1 = __importDefault(__webpack_require__(466));
const Helpers_1 = __webpack_require__(844);
class Switch extends BaseClasses_1.Aggregation {
    constructor(options = {}) {
        super(options);
        this.discriminator = 'Switch';
        this.onValue = 'On';
        this.offValue = 'Off';
        this.setOnValue(options.on_value || this.getOnValue());
        this.setOffValue(options.off_value || this.getOffValue());
        this.setAttributeValue(options.attribute_value || this.getAttributeValue());
        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };
    }
    setAttributeValue(attributeValue) {
        this.attributeValue = attributeValue;
        return this;
    }
    getAttributeValue() {
        return this.attributeValue.toString();
    }
    setOnValue(onValue) {
        this.onValue = onValue;
        return this;
    }
    getOnValue() {
        return this.onValue;
    }
    setOffValue(offValue) {
        this.offValue = offValue;
        return this;
    }
    getOffValue() {
        return this.offValue;
    }
    getTemplate() {
        if (this.template) {
            return this.template;
        }
        return switch_html_1.default;
    }
    render() {
        const template = this.getTemplate();
        return mustache_1.default.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            name: this.getClassTitle(),
            on_value: this.getOnValue(),
            off_value: this.getOffValue(),
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '',
        });
    }
    /**
     * Add listeners, set the default value
     */
    executeJS() {
        const title = this.getTitle();
        const prevVal = Helpers_1.URIHelper.getSearchParam(title);
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-switch-input.needletail-aggregation-switch-input-${this.getClassTitle()}`)
            .forEach((element) => {
            // Set the default value
            element.checked = (Helpers_1.URIHelper.getSearchParam(title) === this.getAttributeValue());
            element.addEventListener('change', () => {
                this.handle(element);
            });
            if (element.checked) {
                this.hasActiveAggregation = true;
                Helpers_1.Events.emit(Helpers_1.Events.onAggregationValueChange, {
                    'name': this.getAttribute(),
                    'hasActive': this.hasActiveAggregation,
                });
            }
        });
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-switch.needletail-aggregation-switch-${this.getClassTitle()}`)
            .forEach((element) => {
            if (this.getCollapsible()) {
                element.querySelector('.needletail-aggregation-switch-title')
                    .addEventListener('click', (e) => {
                    if (element.classList.contains('needletail-collapsed')) {
                        element.classList.remove('needletail-collapsed');
                    }
                    else {
                        element.classList.add('needletail-collapsed');
                    }
                });
            }
        });
        this.values[prevVal] = prevVal;
        this.value = {
            field: this.getAttribute(),
            value: prevVal,
            is_aggregation: true,
        };
    }
    handle(element, skipHistory = false) {
        const attributeValue = this.getAttributeValue();
        if (!skipHistory) {
            Helpers_1.URIHelper.addToHistory(this.getTitle(), attributeValue, true);
        }
        if (this.values[attributeValue]) {
            delete this.values[attributeValue];
        }
        else {
            this.values[attributeValue] = attributeValue;
        }
        this.value = {
            field: this.getAttribute(),
            value: (this.values[attributeValue]) ? attributeValue : '',
            is_aggregation: true,
        };
        this.hasActiveAggregation = true;
        if (!this.values[attributeValue]) {
            this.value = {
                field: this.getAttribute(),
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            };
            this.hasActiveAggregation = false;
        }
        Helpers_1.Events.emit(Helpers_1.Events.onBeforeResultRequest, {});
        Helpers_1.Events.emit(Helpers_1.Events.onAggregationValueChange, {
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
        });
    }
    reset() {
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-switch-input.needletail-aggregation-switch-input-${this.getClassTitle()}`)
            .forEach((element) => {
            if (element.checked) {
                element.checked = false;
                this.handle(element);
            }
        });
    }
}
exports.Switch = Switch;


/***/ }),

/***/ 8485:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutocompleteBar = void 0;
const BaseClasses_1 = __webpack_require__(7624);
const autocomplete_bar_html_1 = __importDefault(__webpack_require__(4773));
const autocomplete_bar_results_html_1 = __importDefault(__webpack_require__(5542));
const mustache_1 = __importDefault(__webpack_require__(466));
const debounce_1 = __importDefault(__webpack_require__(3279));
const Helpers_1 = __webpack_require__(844);
class AutocompleteBar extends BaseClasses_1.Widget {
    constructor(options = {}) {
        super(options);
        /**
         * The discriminator used for sorting the widget
         */
        this.discriminator = 'AutocompleteBar';
        /**
         * Use debounce or not
         */
        this.debounce = true;
        /**
         * The time to wait for the debounce
         */
        this.debounceWait = 200;
        /**
         * The time to wait for the URL debounce
         */
        this.debounceUrlWait = 2000;
        /**
         * The name used in the URL for the field
         */
        this.query = 'autocompleteBar';
        /**
         * Save the value in the url
         */
        this.inUrl = true;
        /**
         * The placeholder of the input field
         */
        this.placeholder = 'Start typing to search';
        /**
         * The message to show if there are no results
         */
        this.noResultMessage = 'No results where found';
        /**
         * The result that has the active class on it
         */
        this.selectedResult = -1;
        /**
         * The value to send to the search
         */
        this.value = {};
        /**
         * The amount of results to show
         */
        this.size = 10;
        /**
         * The minimum amount of characters before executing.
         */
        this.minimumCharacters = 3;
        this.groupBy = '';
        this.sortBy = '';
        this.sortDirection = 'asc';
        /**
         * Show the results below the search bar
         */
        this.showResults = true;
        this.useInResults = true;
        this.searchOnContentLoaded = true;
        this.liveResults = false;
        this.initialInput = true;
        this.forceUseOfResult = false;
        this.skipForceResults = 0;
        this.fillInputOnClick = false;
        this.showBucket = false;
        this.sortMode = 'min';
        this.allowedDirections = ['asc', 'desc'];
        this.setUseDebounce((typeof (0, Helpers_1.optional)(options.debounce).use !== 'undefined') ?
            options.debounce.use : this.getUseDebounce());
        this.setDebounceWait((0, Helpers_1.optional)(options.debounce).wait || this.getDebounceWait());
        this.setDebounceUrlWait((0, Helpers_1.optional)(options.debounce).url_wait || this.getDebounceUrlWait());
        this.setInUrl((typeof options.in_url !== 'undefined') ?
            options.in_url : this.getInUrl());
        this.setQuery(options.query || this.getQuery());
        this.setAttribute((0, Helpers_1.optional)(options.search).attribute || '');
        this.setAttributes((0, Helpers_1.optional)(options.search).attributes || '');
        this.setBuckets((0, Helpers_1.optional)(options.search).buckets || []);
        this.setPlaceholder(options.placeholder || this.getPlaceholder());
        this.setNoResultMessage(options.no_result_message || this.getNoResultMessage());
        this.setSize((0, Helpers_1.optional)(options.search).size || this.getSize());
        this.setGroupBy((0, Helpers_1.optional)(options.search).group_by || '');
        this.setSortBy((0, Helpers_1.optional)(options.search).sort_by || '');
        this.setSortDirection((0, Helpers_1.optional)(options.search).sort_direction || this.getSortDirection());
        this.setSortMode((0, Helpers_1.optional)(options.search).sort_mode || this.getSortMode());
        this.setMinimumCharacters((typeof options.minimum_characters !== 'undefined') ?
            options.minimum_characters : this.getMinimumCharacters());
        this.setShowResults((typeof options.show_results !== 'undefined') ?
            options.show_results : this.getShowResults());
        this.setForceUseOfResult((typeof options.force_use_of_result !== 'undefined') ?
            options.force_use_of_result : this.getForceUseOfResult());
        this.setUseInResults((typeof options.use_in_results !== 'undefined') ?
            options.use_in_results : this.getUseInResults());
        this.setSearchOnContentLoaded((typeof options.search_on_content_loaded !== 'undefined') ?
            options.search_on_content_loaded : this.getSearchOnContentLoaded());
        this.setLiveResults((typeof options.live_results !== 'undefined') ?
            options.live_results : this.getLiveResults());
        this.setInitialInput((typeof options.initial_input !== 'undefined') ?
            options.initial_input : this.getInitialInput());
        this.setFillInputOnClick((typeof options.fill_input_on_click !== 'undefined') ?
            options.fill_input_on_click : this.getFillInputOnClick());
        this.setShowBucket((typeof (0, Helpers_1.optional)(options.search).show_bucket !== 'undefined') ?
            options.search.show_bucket : this.getShowBucket());
        this.setBucketMapping((0, Helpers_1.optional)(options.search).bucket_mapping || this.getBucketMapping());
        if (this.getInitialInput()) {
            this.skipForceResults = 1;
        }
    }
    setMinimumCharacters(minimumCharacters) {
        this.minimumCharacters = minimumCharacters;
        return this;
    }
    getMinimumCharacters() {
        return this.minimumCharacters;
    }
    setSize(size) {
        this.size = size;
        return this;
    }
    getSize() {
        return this.size;
    }
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }
    getPlaceholder() {
        return this.placeholder;
    }
    setNoResultMessage(noResultMessage) {
        this.noResultMessage = noResultMessage;
        return this;
    }
    getNoResultMessage() {
        return this.noResultMessage;
    }
    setAttribute(attribute) {
        this.attribute = attribute;
        return this;
    }
    getAttribute() {
        return this.attribute;
    }
    setAttributes(attribute) {
        if (this.attribute === '') {
            this.attribute = attribute;
        }
        return this;
    }
    getAttributes() {
        return this.attribute;
    }
    setBuckets(buckets) {
        this.buckets = buckets;
        return this;
    }
    getBuckets() {
        return this.buckets;
    }
    setUseDebounce(use = true) {
        this.debounce = use;
        return this;
    }
    getUseDebounce() {
        return this.debounce;
    }
    setDebounceWait(wait) {
        this.debounceWait = wait;
        return this;
    }
    getDebounceWait() {
        return this.debounceWait;
    }
    setDebounceUrlWait(wait) {
        this.debounceUrlWait = wait;
        return this;
    }
    getDebounceUrlWait() {
        return this.debounceUrlWait;
    }
    getTemplate() {
        if (this.template) {
            return this.template;
        }
        return autocomplete_bar_html_1.default;
    }
    setResultTemplate(template) {
        this.resultTemplate = template;
        return this;
    }
    getResultTemplate() {
        if (this.resultTemplate) {
            return this.resultTemplate;
        }
        return autocomplete_bar_results_html_1.default;
    }
    setInUrl(inUrl) {
        this.inUrl = inUrl;
        return this;
    }
    getInUrl() {
        return this.inUrl;
    }
    setShowResults(showResults) {
        this.showResults = showResults;
        return this;
    }
    getShowResults() {
        return this.showResults;
    }
    setDiscriminator(discriminator) {
        this.discriminator = discriminator;
        return this;
    }
    getDiscriminator() {
        return this.discriminator;
    }
    setSearchOnContentLoaded(search) {
        this.searchOnContentLoaded = search;
        return this;
    }
    getSearchOnContentLoaded() {
        return this.searchOnContentLoaded;
    }
    setLiveResults(live) {
        this.liveResults = live;
        return this;
    }
    getLiveResults() {
        return this.liveResults;
    }
    setInitialInput(initialInput) {
        this.initialInput = initialInput;
        return this;
    }
    getInitialInput() {
        return this.initialInput;
    }
    setFillInputOnClick(fillInputOnClick) {
        this.fillInputOnClick = fillInputOnClick;
        return this;
    }
    getFillInputOnClick() {
        return this.fillInputOnClick;
    }
    setForceUseOfResult(forceUseOfresult) {
        this.forceUseOfResult = forceUseOfresult;
        return this;
    }
    getForceUseOfResult() {
        return this.forceUseOfResult;
    }
    setUseInResults(useInResults) {
        this.useInResults = useInResults;
        return this;
    }
    getUseInResults() {
        return this.useInResults;
    }
    setGroupBy(groupBy) {
        this.groupBy = groupBy;
        return this;
    }
    getGroupBy() {
        return this.groupBy;
    }
    setSortBy(sortBy) {
        this.sortBy = sortBy;
        return this;
    }
    getSortBy() {
        return this.sortBy;
    }
    setSortMode(sortMode) {
        this.sortMode = sortMode;
        return this;
    }
    getSortMode() {
        return this.sortMode;
    }
    setSortDirection(sortDirection) {
        if (this.allowedDirections.indexOf(sortDirection) === -1) {
            sortDirection = 'asc';
        }
        this.sortDirection = sortDirection;
        return this;
    }
    getSortDirection() {
        return this.sortDirection;
    }
    setShowBucket(showBucket) {
        this.showBucket = showBucket;
        return this;
    }
    getShowBucket() {
        return this.showBucket;
    }
    setBucketMapping(bucketMapping) {
        this.bucketMapping = bucketMapping;
        return this;
    }
    getBucketMapping() {
        return this.bucketMapping;
    }
    render(options = {}) {
        const template = this.getTemplate();
        options = Object.assign({ name: this.getQuery(), placeholder: this.getPlaceholder(), results: this.renderResults() }, options);
        const rendered = mustache_1.default.render(template, options);
        return document.createRange().createContextualFragment(rendered);
    }
    renderResults(options = {}) {
        const template = this.getResultTemplate();
        options = Object.assign({ no_result_message: this.getNoResultMessage() }, options);
        return mustache_1.default.render(template, options);
    }
    getQuery() {
        return this.query;
    }
    setQuery(query) {
        this.query = query;
        return this;
    }
    /**
     * Set listeners
     */
    executeJS() {
        const prevVal = Helpers_1.URIHelper.getSearchParam(this.getQuery());
        document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-input`)
            .forEach((element) => {
            if (this.getForceUseOfResult()) {
                element.setAttribute('data-force', 'on');
            }
            element.value = (prevVal) ? prevVal : '';
            // On load call the handle function to trigger a search
            document.addEventListener('DOMContentLoaded', () => {
                if (this.getSearchOnContentLoaded()) {
                    this.handle(element);
                }
            });
            element.addEventListener('focus', () => {
                element.classList.add('active');
            });
            element.addEventListener('blur', () => {
                setTimeout(() => {
                    element.classList.remove('active');
                }, 100);
                if (this.getForceUseOfResult()) {
                    // eslint-disable-next-line max-len
                    const results = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);
                    if (results.length < 1) {
                        Helpers_1.Events.emit(Helpers_1.Events.onForceResultBlur, {
                            query: this.getQuery(),
                            value: null,
                        });
                        return;
                    }
                    if (this.selectedResult === -1) {
                        this.selectedResult = 0;
                        this.switchActiveClass(results);
                        element.value = results[this.selectedResult].getAttribute('data-attribute');
                        this.handleUrlChange(element);
                        Helpers_1.Events.emit(Helpers_1.Events.onForceResultBlur, {
                            query: this.getQuery(),
                            value: results[this.selectedResult].dataset,
                        });
                    }
                }
            });
            if (this.getInitialInput()) {
                element.addEventListener('input', (e) => {
                    // eslint-disable-next-line max-len
                    const initialInput = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result.needletail-initial-input`);
                    initialInput.forEach((r) => {
                        r.setAttribute('data-attribute', element.value);
                    });
                    element.setAttribute('data-initial-value', element.value);
                });
            }
            if (this.getUseDebounce()) {
                // If debounce is turned on
                element.addEventListener('input', (0, debounce_1.default)(() => {
                    // eslint-disable-next-line max-len
                    const results = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);
                    this.selectedResult = -1;
                    this.switchActiveClass(results);
                    this.handle(element);
                }, this.getDebounceWait()));
                if (this.getInUrl()) {
                    // If the data should be saved in the URL
                    element.addEventListener('input', (0, debounce_1.default)(() => {
                        this.handleUrlChange(element);
                    }, this.getDebounceUrlWait()));
                }
            }
            else {
                element.addEventListener('input', () => {
                    // eslint-disable-next-line max-len
                    const results = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);
                    this.selectedResult = -1;
                    this.switchActiveClass(results);
                    // If the data should be saved in the URL
                    this.handleUrlChange(element);
                    this.handle(element);
                });
            }
            element.addEventListener('keydown', (e) => {
                element.classList.add('active');
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    // eslint-disable-next-line max-len
                    const results = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);
                    if (results.length < 1) {
                        return;
                    }
                    if (e.key === 'ArrowUp') {
                        // Move the active class up one
                        if (this.selectedResult > 0) {
                            this.selectedResult--;
                        }
                    }
                    else if (e.key === 'ArrowDown') {
                        // Move the active class down one
                        if (this.selectedResult < results.length - 1) {
                            this.selectedResult++;
                        }
                    }
                    this.switchActiveClass(results);
                    element.value = results[this.selectedResult].getAttribute('data-attribute');
                    if (this.getForceUseOfResult()) {
                        if (this.selectedResult < this.skipForceResults) {
                            element.setAttribute('data-force', 'on');
                        }
                        else {
                            element.setAttribute('data-force', 'off');
                        }
                    }
                    this.handleUrlChange(element);
                    Helpers_1.Events.emit(Helpers_1.Events.onArrowMovementSearch, {
                        query: this.getQuery(),
                        value: results[this.selectedResult].dataset,
                    });
                }
                else if (e.key === 'Enter') {
                    // eslint-disable-next-line max-len
                    const results = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);
                    if (this.getForceUseOfResult()) {
                        if (element.getAttribute('data-force') === 'on') {
                            element.value = results[this.skipForceResults].getAttribute('data-attribute');
                            this.selectedResult = this.skipForceResults;
                        }
                    }
                    this.handleUrlChange(element);
                    // Handle on enter key and fire an event.
                    // this.handle(element);
                    Helpers_1.Events.emit(Helpers_1.Events.onSubmitSearch, {
                        query: this.getQuery(),
                        value: (results[this.selectedResult]) ? results[this.selectedResult].dataset : element.value,
                    });
                }
                else if (e.key === 'Escape') {
                    if (this.getInitialInput()) {
                        element.value = element.getAttribute('data-initial-value');
                    }
                    // Remove the focus on escape to close the dropdown
                    document.querySelectorAll(':focus').forEach((el) => el.blur());
                }
            });
        });
        document.addEventListener(Helpers_1.Events.onBeforeSearch, (e) => __awaiter(this, void 0, void 0, function* () {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }
            e.detail.extra_search_values = {};
            // Start the actual search
            Helpers_1.Events.emit(Helpers_1.Events.onSearch, e.detail);
        }));
        document.addEventListener(Helpers_1.Events.onSearch, (e) => __awaiter(this, void 0, void 0, function* () {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }
            let attributes = this.getAttributes();
            if (typeof attributes === 'string') {
                attributes = [attributes];
            }
            const search = [];
            attributes.forEach((attribute) => {
                search.push({
                    field: attribute,
                    value: e.detail.value,
                });
            });
            // Make the search
            const result = yield this.client.search({
                buckets: this.getBuckets(),
                search: Object.assign({ should: {
                        fuzzy: search,
                    } }, e.detail.extra_search_values),
                sort: this.getSortBy(),
                direction: this.getSortDirection(),
                size: this.getSize(),
                group_by: this.getGroupBy(),
                highlight: true,
                show_bucket: this.getShowBucket(),
                mode: this.getSortMode(),
            });
            e.detail.status = result.status;
            // If there is data map it to include some easy access values
            if (result && result.data.count > 0) {
                e.detail.search_result = result.data.results.map((r) => {
                    const bucketName = (r.bucket) ? r.bucket.toString() : '';
                    const mapped = Object.assign(Object.assign({ id: r.id }, r.record), { bucket: (bucketName !== '' && this.getBucketMapping()[bucketName]) ?
                            this.getBucketMapping()[bucketName] : '', value: {}, raw: {} });
                    if (r.highlight) {
                        mapped.highlight = {};
                    }
                    let attributes = this.getAttributes();
                    if (typeof attributes === 'string') {
                        attributes = [attributes];
                    }
                    attributes.forEach((attribute) => {
                        mapped.value[attribute] = r.record[attribute];
                        mapped.raw[attribute] = r.record[attribute];
                        if (r.highlight) {
                            mapped.highlight[attribute] = r.highlight[attribute];
                        }
                    });
                    return mapped;
                });
            }
            Helpers_1.Events.emit(Helpers_1.Events.onAfterSearch, e.detail);
        }));
        document.addEventListener(Helpers_1.Events.onAfterSearch, (e) => __awaiter(this, void 0, void 0, function* () {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }
            // Render the results
            // eslint-disable-next-line camelcase
            let options = {
                results: [],
                // eslint-disable-next-line camelcase
                initial_input: '',
            };
            if (e.detail.search_result && e.detail.search_result.length > 0 &&
                (e.detail.value && e.detail.value.length !== 0)) {
                options = {
                    results: e.detail.search_result,
                    initial_input: (this.getInitialInput()) ? e.detail.value : '',
                };
            }
            this.buildResults(options);
            Helpers_1.Events.emit(Helpers_1.Events.autocompleteBarFinished, {
                name: this.getDiscriminator(),
            });
        }));
    }
    buildResults(options = {}) {
        if (!this.getShowResults()) {
            return;
        }
        const results = this.renderResults(options);
        const nodeResults = document.createRange().createContextualFragment(results);
        document.querySelectorAll(`.needletail-autocomplete-bar-${this.getQuery()}`)
            .forEach((element) => __awaiter(this, void 0, void 0, function* () {
            const currentChild = element.querySelector('.needletail-autocomplete-bar-results');
            yield element.replaceChild(nodeResults.cloneNode(true), currentChild);
            const newChild = element.querySelector('.needletail-autocomplete-bar-results');
            const newResults = newChild.querySelectorAll('.needletail-autocomplete-bar-result');
            newResults.forEach((element) => {
                element.addEventListener('mouseover', (e) => {
                    this.selectedResult = Array.prototype.indexOf.call(newResults, element);
                    newResults.forEach((rElement) => {
                        rElement.classList.remove('active');
                    });
                    newResults[this.selectedResult].classList.add('active');
                });
                // Add the click event
                element.addEventListener('click', (e) => {
                    if (this.getFillInputOnClick()) {
                        // eslint-disable-next-line max-len
                        const inputs = document.querySelectorAll(`.needletail-autocomplete-bar-${this.getQuery()} .needletail-autocomplete-bar-input`);
                        inputs.forEach((i) => {
                            i.value = element.getAttribute('data-attribute');
                            this.handleUrlChange(i);
                        });
                    }
                    // this.handle(element);
                    Helpers_1.Events.emit(Helpers_1.Events.onSubmitSearch, {
                        query: this.getQuery(),
                        value: element.dataset,
                    });
                });
            });
            const input = element.querySelector('.needletail-autocomplete-bar-input');
            if (input && input.value.length > 0) {
                input.classList.remove('needletail-empty');
            }
        }));
    }
    handleUrlChange(element) {
        var _a;
        if (!this.getInUrl()) {
            return;
        }
        // Put the value in the url
        Helpers_1.URIHelper.addToHistory(this.getQuery(), (_a = element.getAttribute('data-initial-value')) !== null && _a !== void 0 ? _a : element.value);
    }
    handle(element) {
        let data;
        const value = element.value;
        if (value && value.length < this.getMinimumCharacters()) {
            data = {
                value: '',
                search_result: {},
            };
            this.value = {
                field: this.getAttribute(),
                value: '',
            };
        }
        else {
            data = {
                value: value,
                search_result: {},
            };
            this.value = {
                field: this.getAttribute(),
                value: value,
            };
        }
        if (value.length == 0) {
            element.classList.add('needletail-empty');
        }
        data.query = this.getQuery();
        Helpers_1.Events.emit(Helpers_1.Events.onBeforeSearch, data);
        if (this.getLiveResults()) {
            Helpers_1.Events.emit(Helpers_1.Events.onBeforeResultRequest, {});
        }
    }
    switchActiveClass(results) {
        if (!this.getShowResults()) {
            return;
        }
        // Remove the active class from all results
        results.forEach((rElement) => {
            rElement.classList.remove('active');
        });
        if (this.selectedResult > -1) {
            // Add it to the new selected result
            results[this.selectedResult].classList.add('active');
        }
    }
}
exports.AutocompleteBar = AutocompleteBar;


/***/ }),

/***/ 4226:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroupedSearchBar = void 0;
const BaseClasses_1 = __webpack_require__(7624);
const grouped_search_bar_html_1 = __importDefault(__webpack_require__(7512));
const grouped_search_bar_results_html_1 = __importDefault(__webpack_require__(3070));
const grouped_search_bar_results_default_html_1 = __importDefault(__webpack_require__(7302));
const mustache_1 = __importDefault(__webpack_require__(466));
const debounce_1 = __importDefault(__webpack_require__(3279));
const Helpers_1 = __webpack_require__(844);
class GroupedSearchBar extends BaseClasses_1.Widget {
    constructor(options = {}) {
        super(options);
        /**
         * The discriminator used for sorting the widget
         */
        this.discriminator = 'GroupedSearchBar';
        /**
         * Use debounce or not
         */
        this.debounce = true;
        /**
         * The time to wait for the debounce
         */
        this.debounceWait = 200;
        /**
         * The time to wait for the URL debounce
         */
        this.debounceUrlWait = 2000;
        /**
         * The name used in the URL for the field
         */
        this.query = 'groupedSearchBar';
        /**
         * Save the value in the url
         */
        this.inUrl = true;
        /**
         * Which buckets to search on
         */
        this.buckets = [];
        /**
         * The placeholder of the input field
         */
        this.placeholder = 'Start typing to search';
        /**
         * The message to show if there are no results
         */
        this.noResultMessage = 'No results where found';
        /**
         * The result that has the active class on it
         */
        this.selectedResult = -1;
        /**
         * The value to send to the search
         */
        this.value = {};
        /**
         * The amount of results to show
         */
        this.size = 3;
        /**
         * The minimum amount of characters before executing.
         */
        this.minimumCharacters = 3;
        this.groupBy = '';
        this.sortBy = '';
        this.sortDirection = 'asc';
        /**
         * Show the results below the search bar
         */
        this.showResults = true;
        this.searchOnContentLoaded = true;
        this.initialInput = true;
        this.fillInputOnClick = false;
        this.sortMode = 'min';
        this.allowedDirections = ['asc', 'desc'];
        this.setUseDebounce((typeof (0, Helpers_1.optional)(options.debounce).use !== 'undefined') ?
            options.debounce.use : this.getUseDebounce());
        this.setDebounceWait((0, Helpers_1.optional)(options.debounce).wait || this.getDebounceWait());
        this.setDebounceUrlWait((0, Helpers_1.optional)(options.debounce).url_wait || this.getDebounceUrlWait());
        this.setInUrl((typeof options.in_url !== 'undefined') ?
            options.in_url : this.getInUrl());
        this.setQuery(options.query || this.getQuery());
        this.setAttribute((0, Helpers_1.optional)(options.search).attribute || '');
        this.setAttributes((0, Helpers_1.optional)(options.search).attributes || '');
        this.setBuckets((0, Helpers_1.optional)(options.search).buckets || []);
        this.setPlaceholder(options.placeholder || this.getPlaceholder());
        this.setNoResultMessage(options.no_result_message || this.getNoResultMessage());
        this.setSize((0, Helpers_1.optional)(options.search).size || this.getSize());
        this.setGroupBy((0, Helpers_1.optional)(options.search).group_by || '');
        this.setSortBy((0, Helpers_1.optional)(options.search).sort_by || '');
        this.setSortDirection((0, Helpers_1.optional)(options.search).sort_direction || this.getSortDirection());
        this.setSortMode((0, Helpers_1.optional)(options.search).sort_mode || this.getSortMode());
        this.setMinimumCharacters((typeof options.minimum_characters !== 'undefined') ?
            options.minimum_characters : this.getMinimumCharacters());
        this.setShowResults((typeof options.show_results !== 'undefined') ?
            options.show_results : this.getShowResults());
        this.setSearchOnContentLoaded((typeof options.search_on_content_loaded !== 'undefined') ?
            options.search_on_content_loaded : this.getSearchOnContentLoaded());
        this.setInitialInput((typeof options.initial_input !== 'undefined') ?
            options.initial_input : this.getInitialInput());
        this.setFillInputOnClick((typeof options.fill_input_on_click !== 'undefined') ?
            options.fill_input_on_click : this.getFillInputOnClick());
    }
    setMinimumCharacters(minimumCharacters) {
        this.minimumCharacters = minimumCharacters;
        return this;
    }
    getMinimumCharacters() {
        return this.minimumCharacters;
    }
    setSize(size) {
        this.size = size;
        return this;
    }
    getSize() {
        return this.size;
    }
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }
    getPlaceholder() {
        return this.placeholder;
    }
    setNoResultMessage(noResultMessage) {
        this.noResultMessage = noResultMessage;
        return this;
    }
    getNoResultMessage() {
        return this.noResultMessage;
    }
    setAttribute(attribute) {
        this.attribute = attribute;
        return this;
    }
    getAttribute() {
        return this.attribute;
    }
    setAttributes(attribute) {
        if (this.attribute === '') {
            this.attribute = attribute;
        }
        return this;
    }
    getAttributes() {
        return this.attribute;
    }
    setBuckets(buckets) {
        this.buckets = buckets;
        return this;
    }
    getBuckets() {
        return this.buckets;
    }
    setUseDebounce(use = true) {
        this.debounce = use;
        return this;
    }
    getUseDebounce() {
        return this.debounce;
    }
    setDebounceWait(wait) {
        this.debounceWait = wait;
        return this;
    }
    getDebounceWait() {
        return this.debounceWait;
    }
    setDebounceUrlWait(wait) {
        this.debounceUrlWait = wait;
        return this;
    }
    getDebounceUrlWait() {
        return this.debounceUrlWait;
    }
    getTemplate() {
        if (this.template) {
            return this.template;
        }
        return grouped_search_bar_html_1.default;
    }
    setResultTemplate(template) {
        this.resultTemplate = template;
        return this;
    }
    getResultTemplate() {
        if (this.resultTemplate) {
            return this.resultTemplate;
        }
        return grouped_search_bar_results_html_1.default;
    }
    setInnerResultTemplate(template) {
        this.innerResultTemplate = template;
        return this;
    }
    getInnerResultTemplate() {
        if (this.innerResultTemplate) {
            return this.innerResultTemplate;
        }
        return grouped_search_bar_results_default_html_1.default;
    }
    setInUrl(inUrl) {
        this.inUrl = inUrl;
        return this;
    }
    getInUrl() {
        return this.inUrl;
    }
    setShowResults(showResults) {
        this.showResults = showResults;
        return this;
    }
    getShowResults() {
        return this.showResults;
    }
    setDiscriminator(discriminator) {
        this.discriminator = discriminator;
        return this;
    }
    getDiscriminator() {
        return this.discriminator;
    }
    setSearchOnContentLoaded(search) {
        this.searchOnContentLoaded = search;
        return this;
    }
    getSearchOnContentLoaded() {
        return this.searchOnContentLoaded;
    }
    setInitialInput(initialInput) {
        this.initialInput = initialInput;
        return this;
    }
    getInitialInput() {
        return this.initialInput;
    }
    setGroupBy(groupBy) {
        this.groupBy = groupBy;
        return this;
    }
    getGroupBy() {
        return this.groupBy;
    }
    setSortBy(sortBy) {
        this.sortBy = sortBy;
        return this;
    }
    getSortBy() {
        return this.sortBy;
    }
    setSortMode(sortMode) {
        this.sortMode = sortMode;
        return this;
    }
    getSortMode() {
        return this.sortMode;
    }
    setSortDirection(sortDirection) {
        if (this.allowedDirections.indexOf(sortDirection) === -1) {
            sortDirection = 'asc';
        }
        this.sortDirection = sortDirection;
        return this;
    }
    getSortDirection() {
        return this.sortDirection;
    }
    setFillInputOnClick(fillInputOnClick) {
        this.fillInputOnClick = fillInputOnClick;
        return this;
    }
    getFillInputOnClick() {
        return this.fillInputOnClick;
    }
    render(options = {}) {
        const template = this.getTemplate();
        options = Object.assign({ name: this.getQuery(), placeholder: this.getPlaceholder(), results: this.renderResults() }, options);
        const rendered = mustache_1.default.render(template, options);
        return document.createRange().createContextualFragment(rendered);
    }
    renderResults(options = {}) {
        const template = this.getResultTemplate();
        options = Object.assign({ no_result_message: this.getNoResultMessage() }, options);
        return mustache_1.default.render(template, options);
    }
    renderResultTemplates(options = {}, template = null) {
        const use = (template) ? template : this.getInnerResultTemplate();
        return mustache_1.default.render(use, options);
    }
    getQuery() {
        return this.query;
    }
    setQuery(query) {
        this.query = query;
        return this;
    }
    /**
     * Set listeners
     */
    executeJS() {
        const prevVal = Helpers_1.URIHelper.getSearchParam(this.getQuery());
        document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-input`)
            .forEach((element) => {
            element.value = (prevVal) ? prevVal : '';
            // On load call the handle function to trigger a search
            document.addEventListener('DOMContentLoaded', () => {
                if (this.getSearchOnContentLoaded()) {
                    this.handle(element);
                }
            });
            element.addEventListener('focus', () => {
                element.classList.add('active');
            });
            element.addEventListener('blur', () => {
                setTimeout(() => {
                    element.classList.remove('active');
                }, 100);
            });
            if (this.getInitialInput()) {
                element.addEventListener('input', (e) => {
                    // eslint-disable-next-line max-len
                    const initialInput = document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-result.needletail-initial-input`);
                    initialInput.forEach((r) => {
                        r.innerHTML = element.value;
                        r.setAttribute('data-attribute', element.value);
                    });
                    element.setAttribute('data-initial-value', element.value);
                });
            }
            if (this.getUseDebounce()) {
                // If debounce is turned on
                element.addEventListener('input', (0, debounce_1.default)(() => {
                    // eslint-disable-next-line max-len
                    const results = document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-result`);
                    this.selectedResult = -1;
                    this.switchActiveClass(results);
                    this.handle(element);
                }, this.getDebounceWait()));
                if (this.getInUrl()) {
                    // If the data should be saved in the URL
                    element.addEventListener('input', (0, debounce_1.default)(() => {
                        this.handleUrlChange(element);
                    }, this.getDebounceUrlWait()));
                }
            }
            else {
                element.addEventListener('input', () => {
                    // eslint-disable-next-line max-len
                    const results = document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-result`);
                    this.selectedResult = -1;
                    this.switchActiveClass(results);
                    // If the data should be saved in the URL
                    this.handleUrlChange(element);
                    this.handle(element);
                });
            }
            element.addEventListener('keydown', (e) => {
                element.classList.add('active');
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    // eslint-disable-next-line max-len
                    const results = document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-result`);
                    if (results.length < 1) {
                        return;
                    }
                    if (e.key === 'ArrowUp') {
                        // Move the active class up one
                        if (this.selectedResult > 0) {
                            this.selectedResult--;
                        }
                    }
                    else if (e.key === 'ArrowDown') {
                        // Move the active class down one
                        if (this.selectedResult < results.length - 1) {
                            this.selectedResult++;
                        }
                    }
                    this.switchActiveClass(results);
                    element.value = results[this.selectedResult].getAttribute('data-attribute');
                    Helpers_1.Events.emit(Helpers_1.Events.onArrowMovementGroupedSearch, {
                        query: this.getQuery(),
                        value: results[this.selectedResult].dataset,
                    });
                }
                else if (e.key === 'Enter') {
                    // eslint-disable-next-line max-len
                    const results = document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-result`);
                    // Handle on enter key and fire an event.
                    // this.handle(element);
                    Helpers_1.Events.emit(Helpers_1.Events.onSubmitGroupedSearch, {
                        query: this.getQuery(),
                        value: (results[this.selectedResult]) ? results[this.selectedResult].dataset : element.value,
                    });
                }
                else if (e.key === 'Escape') {
                    if (this.getInitialInput()) {
                        element.value = element.getAttribute('data-initial-value');
                    }
                    // Remove the focus on escape to close the dropdown
                    document.querySelectorAll(':focus').forEach((el) => el.blur());
                }
            });
        });
        document.addEventListener(Helpers_1.Events.onBeforeGroupedSearch, (e) => __awaiter(this, void 0, void 0, function* () {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }
            e.detail.extra_search_values = {};
            // Start the actual search
            Helpers_1.Events.emit(Helpers_1.Events.onGroupedSearch, e.detail);
        }));
        document.addEventListener(Helpers_1.Events.onGroupedSearch, (e) => __awaiter(this, void 0, void 0, function* () {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }
            const buckets = {};
            // Prepare the options for the search
            this.getBuckets().forEach((val) => {
                if (typeof val === 'object') {
                    if (val.name) {
                        let attributes = val.attribute || this.getAttributes();
                        if (typeof attributes === 'string') {
                            attributes = [attributes];
                        }
                        const search = [];
                        attributes.forEach((attribute) => {
                            search.push({
                                field: attribute,
                                value: e.detail.value,
                            });
                        });
                        buckets[val.name] = {
                            search: Object.assign({ should: {
                                    fuzzy: search,
                                } }, e.detail.extra_search_values),
                            sort: val.sort || this.getSortBy(),
                            direction: val.direction || this.getSortDirection(),
                            size: val.size || this.getSize(),
                            group_by: val.group_by || this.getGroupBy(),
                            highlight: true,
                            mode: val.sort_mode || this.getSortMode(),
                        };
                    }
                }
                else {
                    let attributes = this.getAttributes();
                    if (typeof attributes === 'string') {
                        attributes = [attributes];
                    }
                    const search = [];
                    attributes.forEach((attribute) => {
                        search.push({
                            field: attribute,
                            value: e.detail.value,
                        });
                    });
                    buckets[val] = {
                        search: Object.assign({ should: {
                                fuzzy: search,
                            } }, e.detail.extra_search_values),
                        sort: this.getSortBy(),
                        direction: this.getSortDirection(),
                        size: this.getSize(),
                        group_by: this.getGroupBy(),
                        highlight: true,
                        mode: this.getSortMode(),
                    };
                }
            });
            // Make the search
            const result = yield this.client.bulk({
                buckets: buckets,
            });
            e.detail.status = result.status;
            if (result && result.data) {
                e.detail.search_result = [];
                Object.keys(result.data).forEach((bucketKey) => {
                    var _a;
                    const r = result.data[bucketKey];
                    const bucket = this.getBuckets().find((b) => {
                        return (b.name === bucketKey || b === bucketKey);
                    });
                    // If there is data map it to include some easy access values
                    if (r.count > 0) {
                        e.detail.search_result.push({
                            raw: bucket,
                            key: (_a = bucket.key) !== null && _a !== void 0 ? _a : bucketKey,
                            results: r.results.map((r) => {
                                var _a;
                                const mapped = Object.assign(Object.assign({ id: r.id }, r.record), { value: {}, raw: {} });
                                if (r.highlight) {
                                    mapped.highlight = {};
                                }
                                let attributes = (_a = bucket.attribute) !== null && _a !== void 0 ? _a : this.getAttributes();
                                if (typeof attributes === 'string') {
                                    attributes = [attributes];
                                }
                                attributes.forEach((attribute) => {
                                    mapped.value[attribute] = r.record[attribute];
                                    mapped.raw[attribute] = r.record[attribute];
                                    if (r.highlight) {
                                        mapped.highlight[attribute] = r.highlight[attribute];
                                    }
                                });
                                return mapped;
                            }),
                        });
                    }
                });
            }
            Helpers_1.Events.emit(Helpers_1.Events.onAfterGroupedSearch, e.detail);
        }));
        document.addEventListener(Helpers_1.Events.onAfterGroupedSearch, (e) => __awaiter(this, void 0, void 0, function* () {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }
            // Render the results
            let options = {};
            if (e.detail.search_result && Object.keys(e.detail.search_result).length > 0) {
                options = {
                    results: e.detail.search_result,
                    initial_input: e.detail.value,
                };
            }
            this.buildResults(options);
            Helpers_1.Events.emit(Helpers_1.Events.groupedSearchBarFinished, {
                name: this.getDiscriminator(),
            });
        }));
    }
    buildResults(options = {}) {
        if (!this.getShowResults()) {
            return;
        }
        const innerResults = [];
        if (options && options.results) {
            options.results.forEach((r) => {
                const bucket = this.getBuckets().find((b) => {
                    return (b.key === r.key || b === r.key);
                });
                if (bucket && bucket.template) {
                    innerResults.push(this.renderResultTemplates(r, bucket.template));
                }
                else {
                    innerResults.push(this.renderResultTemplates(r));
                }
            });
            options.results = innerResults;
        }
        const results = this.renderResults(options);
        const nodeResults = document.createRange().createContextualFragment(results);
        document.querySelectorAll(`.needletail-grouped-search-bar-${this.getQuery()}`)
            .forEach((element) => {
            const currentChild = element.querySelector('.needletail-grouped-search-bar-results');
            element.replaceChild(nodeResults.cloneNode(true), currentChild);
            const newChild = element.querySelector('.needletail-grouped-search-bar-results');
            const newResults = newChild.querySelectorAll('.needletail-grouped-search-bar-result');
            newResults.forEach((element) => {
                element.addEventListener('mouseover', (e) => {
                    this.selectedResult = Array.prototype.indexOf.call(newResults, element);
                    newResults.forEach((rElement) => {
                        rElement.classList.remove('active');
                    });
                    newResults[this.selectedResult].classList.add('active');
                });
                // Add the click event
                element.addEventListener('click', (e) => {
                    if (this.getFillInputOnClick()) {
                        // eslint-disable-next-line max-len
                        const inputs = document.querySelectorAll(`.needletail-grouped-search-bar-${this.getQuery()} .needletail-grouped-search-bar-input`);
                        inputs.forEach((i) => {
                            i.value = element.getAttribute('data-attribute');
                            this.handleUrlChange(i);
                        });
                    }
                    // this.handle(element);
                    Helpers_1.Events.emit(Helpers_1.Events.onSubmitGroupedSearch, {
                        query: this.getQuery(),
                        value: element.dataset,
                    });
                });
            });
            const input = element.querySelector('.needletail-grouped-search-bar-input');
            if (input && input.value.length > 0) {
                input.classList.remove('needletail-empty');
            }
        });
    }
    handleUrlChange(element) {
        if (!this.getInUrl()) {
            return;
        }
        // Put the value in the url
        Helpers_1.URIHelper.addToHistory(this.getQuery(), element.getAttribute('data-initial-value'));
    }
    handle(element) {
        let data;
        const value = element.value;
        if (value && value.length < this.getMinimumCharacters()) {
            data = {
                value: '',
                search_result: {},
            };
            this.value = {
                field: this.getAttributes(),
                value: '',
            };
        }
        else {
            data = {
                value: value,
                search_result: {},
            };
            this.value = {
                field: this.getAttributes(),
                value: value,
            };
        }
        if (value.length == 0) {
            element.classList.add('needletail-empty');
        }
        data.query = this.getQuery();
        Helpers_1.Events.emit(Helpers_1.Events.onBeforeGroupedSearch, data);
    }
    switchActiveClass(results) {
        if (!this.getShowResults()) {
            return;
        }
        // Remove the active class from all results
        results.forEach((rElement) => {
            rElement.classList.remove('active');
        });
        if (this.selectedResult > -1) {
            // Add it to the new selected result
            results[this.selectedResult].classList.add('active');
        }
    }
}
exports.GroupedSearchBar = GroupedSearchBar;


/***/ }),

/***/ 4488:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Result = void 0;
const BaseClasses_1 = __webpack_require__(7624);
const result_html_1 = __importDefault(__webpack_require__(9567));
const result_results_html_1 = __importDefault(__webpack_require__(8506));
const result_sort_select_html_1 = __importDefault(__webpack_require__(9660));
const skeleton_html_1 = __importDefault(__webpack_require__(4148));
const mustache_1 = __importDefault(__webpack_require__(466));
const Helpers_1 = __webpack_require__(844);
const debounce_1 = __importDefault(__webpack_require__(3279));
class Result extends BaseClasses_1.Widget {
    constructor(options = {}) {
        super(options);
        /**
         * The template used for the result dropdown
         */
        this.discriminator = 'Result';
        /**
         * The amount of records to show per page
         */
        this.perPage = 10;
        /**
         * The text for the previous button
         */
        this.previous = 'Previous';
        /**
         * The text for the next button
         */
        this.next = 'Next';
        /**
         * The text for the last button
         */
        this.last = 'Last';
        /**
         * The text for the first button
         */
        this.first = 'First';
        /**
         * Enable or disable the first and last button
         */
        this.showQuickPagination = false;
        /**
         * The amount of pages to show at the same time, this excludes the first and last page
         */
        this.minifyPages = 5;
        this.groupBy = '';
        this.sortBy = '';
        // eslint-disable-next-line camelcase
        this.sortSelect = {};
        this.sortDirection = '';
        this.noResultMessage = 'No results where found';
        this.initialRequest = true;
        this.scrollOffset = 100;
        this.scrollBackToTop = true;
        this.buckets = [];
        this.sortMode = 'min';
        this.allowedDirections = ['asc', 'desc'];
        this.activeClass = 'active';
        this.hideOnSinglePage = true;
        this.hidePagination = false;
        this.query = 'result';
        this.infiniteScroll = false;
        this.infinityPage = 1;
        this.hardReset = false;
        this.totalPages = 1;
        this.bottomScrollOffset = 0;
        this.loader = null;
        this.allowedLoaders = ['round-dots', 'round-line', 'straight-bars', 'straight-dots'];
        this.totalResults = 0;
        this.totalResultsText = ':count total results';
        this.extraOptions = {};
        this.useSkeleton = false;
        this.setQuery(options.query || this.getQuery());
        this.setPerPage(options.per_page || this.getPerPage());
        this.setPrevious((0, Helpers_1.optional)(options.pagination).previous || this.getPrevious());
        this.setNext((0, Helpers_1.optional)(options.pagination).next || this.getNext());
        this.setMinifyPages(options.minify_pages || this.getMinifyPages());
        this.setLast((0, Helpers_1.optional)(options.pagination).last || this.getLast());
        this.setFirst((0, Helpers_1.optional)(options.pagination).first || this.getFirst());
        this.setShowQuickPagination((typeof (0, Helpers_1.optional)(options.pagination).show_quick_pagination !== 'undefined') ?
            options.pagination.show_quick_pagination : this.getShowQuickPagination());
        this.setScrollOffset((0, Helpers_1.optional)(options.pagination).scroll_offset || this.getScrollOffset());
        this.setScrollBackToTop((typeof (0, Helpers_1.optional)(options.pagination).scroll_back_to_top !== 'undefined') ?
            options.pagination.scroll_back_to_top : this.getScrollBackToTop());
        this.setHideOnSinglePage((typeof (0, Helpers_1.optional)(options.pagination).hide_on_single_page !== 'undefined') ?
            options.pagination.hide_on_single_page : this.getHideOnSinglePage());
        this.setResultTemplate(options.result_template);
        this.setGroupBy(options.group_by || '');
        this.setSortSelect(options.sort_select || {});
        this.setSortSelectDefault(options.sort_select_default || '');
        this.setSortBy(options.sort_by || '');
        this.setSortDirection(options.sort_direction || this.getSortDirection());
        this.setSortMode(options.sort_mode || this.getSortMode());
        this.setNoResultMessage(options.no_result_message || this.getNoResultMessage());
        this.setBuckets(options.buckets || []);
        this.setPaginationActiveClass((0, Helpers_1.optional)(options.pagination).active_class || this.getPaginationActiveClass());
        this.setInfiniteScroll((0, Helpers_1.optional)(options.pagination).infinite_scroll || this.getInfiniteScroll());
        this.setBottomScrollOffset((0, Helpers_1.optional)(options.pagination).bottom_scroll_offset || this.getBottomScrollOffset());
        this.setLoader(options.loader || this.getLoader());
        this.setTotalResultsText(options.total_results_text || this.getTotalResultsText());
        this.setExtraOptions(options.extra_options || {});
        this.setUseSkeleton((typeof (0, Helpers_1.optional)(options).use_skeleton !== 'undefined') ?
            (0, Helpers_1.optional)(options).use_skeleton : this.getUseSkeleton());
        this.setSkeletonTemplate((0, Helpers_1.optional)(options).skeleton_template || this.getSkeletonTemplate());
    }
    getUseSkeleton() {
        return this.useSkeleton;
    }
    setUseSkeleton(useSkeleton) {
        this.useSkeleton = useSkeleton;
        return this;
    }
    getSkeletonTemplate() {
        if (this.skeletonTemplate) {
            return this.skeletonTemplate;
        }
        return skeleton_html_1.default;
    }
    setSkeletonTemplate(template) {
        this.skeletonTemplate = template;
        return this;
    }
    getQuery() {
        return this.query;
    }
    setQuery(query) {
        this.query = query;
        return this;
    }
    getTotalResults() {
        return this.totalResults;
    }
    setTotalResults(totalResults) {
        this.totalResults = totalResults;
        return this;
    }
    getTotalResultsText() {
        var _a;
        const count = (_a = this.getTotalResults()) !== null && _a !== void 0 ? _a : 0;
        let copy = this.totalResultsText;
        copy = copy.replace(/:count/ig, count.toString());
        const split = copy.split('|');
        if (split.length === 0) {
            return copy;
        }
        const singleRegex = /^{(\d+)} (.+)/;
        const multiRegex = /^\[(\d+),(\d+|\*)] (.+)/;
        let final = copy;
        split.forEach((s) => {
            const singleMatch = singleRegex.exec(s);
            if (singleMatch) {
                if (count === parseInt(singleMatch[1])) {
                    final = singleMatch[2];
                }
            }
            const multiMatch = multiRegex.exec(s);
            if (multiMatch) {
                let infinite = false;
                if (multiMatch[2] === '*') {
                    infinite = true;
                }
                if (count >= parseInt(multiMatch[1]) && (count <= parseInt(multiMatch[2]) || infinite)) {
                    final = multiMatch[3];
                }
            }
        });
        return final;
    }
    setTotalResultsText(totalResultsText) {
        this.totalResultsText = totalResultsText;
        return this;
    }
    getInfiniteScroll() {
        return this.infiniteScroll;
    }
    setInfiniteScroll(infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        return this;
    }
    getBottomScrollOffset() {
        return this.bottomScrollOffset;
    }
    setBottomScrollOffset(bottomScrollOffset) {
        this.bottomScrollOffset = bottomScrollOffset;
        return this;
    }
    getLoader() {
        return this.loader;
    }
    setLoader(loader) {
        if (this.allowedLoaders.indexOf(loader) !== -1) {
            this.loader = loader;
        }
        return this;
    }
    setHideOnSinglePage(hideOnSinglePage) {
        this.hideOnSinglePage = hideOnSinglePage;
        return this;
    }
    getHideOnSinglePage() {
        return this.hideOnSinglePage;
    }
    setPaginationActiveClass(activeClass) {
        this.activeClass = activeClass;
        return this;
    }
    getPaginationActiveClass() {
        return this.activeClass;
    }
    setBuckets(buckets) {
        this.buckets = buckets;
        return this;
    }
    getBuckets() {
        return this.buckets;
    }
    setScrollBackToTop(scrollBackToTop) {
        this.scrollBackToTop = scrollBackToTop;
        return this;
    }
    getScrollBackToTop() {
        return this.scrollBackToTop;
    }
    setScrollOffset(scrollOffset) {
        this.scrollOffset = scrollOffset;
        return this;
    }
    getScrollOffset() {
        return this.scrollOffset;
    }
    setPerPage(perPage) {
        this.perPage = perPage;
        return this;
    }
    getPerPage() {
        return this.perPage;
    }
    setShowQuickPagination(showQuickPagination) {
        this.showQuickPagination = showQuickPagination;
        return this;
    }
    getShowQuickPagination() {
        return this.showQuickPagination;
    }
    setMinifyPages(minifyPages) {
        this.minifyPages = minifyPages;
        return this;
    }
    getMinifyPages() {
        return this.minifyPages;
    }
    setPrevious(previous) {
        this.previous = previous;
        return this;
    }
    getPrevious() {
        return this.previous;
    }
    setNext(next) {
        this.next = next;
        return this;
    }
    getNext() {
        return this.next;
    }
    getTemplate() {
        if (this.template) {
            return this.template;
        }
        return result_html_1.default;
    }
    getResultTemplate() {
        if (this.resultTemplate) {
            return this.resultTemplate;
        }
        return result_results_html_1.default;
    }
    setResultTemplate(template) {
        this.resultTemplate = template;
        return this;
    }
    setResultSortSelectTemplate(template) {
        this.sortSelectTemplate = template;
        return this;
    }
    getResultSortSelectTemplate() {
        if (this.sortSelectTemplate) {
            return this.sortSelectTemplate;
        }
        return result_sort_select_html_1.default;
    }
    setFirst(first) {
        this.first = first;
        this.setShowQuickPagination(true);
        return this;
    }
    getFirst() {
        return this.first;
    }
    setLast(last) {
        this.last = last;
        this.setShowQuickPagination(true);
        return this;
    }
    getLast() {
        return this.last;
    }
    setGroupBy(groupBy) {
        this.groupBy = groupBy;
        return this;
    }
    getGroupBy() {
        return this.groupBy;
    }
    setSortBy(sortBy) {
        if (sortBy === '' && (Object.keys(this.getSortSelect()).length > 0)) {
            for (const key in this.getSortSelect()) {
                if (this.getSortSelect()[key].name === this.getSortSelectDefault()) {
                    sortBy = this.getSortSelect()[key].attribute || '';
                }
            }
        }
        this.sortBy = sortBy;
        return this;
    }
    getSortBy() {
        return this.sortBy;
    }
    setSortMode(sortMode) {
        this.sortMode = sortMode;
        return this;
    }
    getSortMode() {
        return this.sortMode;
    }
    setSortDirection(sortDirection) {
        if (sortDirection === '' && (Object.keys(this.getSortSelect()).length > 0)) {
            for (const key in this.getSortSelect()) {
                if (this.getSortSelect()[key].name === this.getSortSelectDefault()) {
                    sortDirection = this.getSortSelect()[key].direction || '';
                }
            }
        }
        if (this.allowedDirections.indexOf(sortDirection) === -1) {
            sortDirection = 'asc';
        }
        this.sortDirection = sortDirection;
        return this;
    }
    getSortDirection() {
        return this.sortDirection;
    }
    // eslint-disable-next-line max-len,camelcase
    setSortSelect(sortSelect) {
        this.sortSelect = sortSelect;
        return this;
    }
    // eslint-disable-next-line camelcase
    getSortSelect() {
        return this.sortSelect;
    }
    setSortSelectDefault(sortSelectDefault) {
        this.sortSelectDefault = sortSelectDefault;
        return this;
    }
    getSortSelectDefault() {
        return this.sortSelectDefault;
    }
    setNoResultMessage(noResultMessage) {
        this.noResultMessage = noResultMessage;
        return this;
    }
    getNoResultMessage() {
        return this.noResultMessage;
    }
    setExtraOptions(options) {
        this.extraOptions = options;
        return this;
    }
    getExtraOptions() {
        return this.extraOptions;
    }
    renderSkeleton() {
        const options = {
            records: new Array(this.getPerPage()).fill(null),
        };
        const rendered = mustache_1.default.render(this.getSkeletonTemplate(), options);
        return document.createRange().createContextualFragment(rendered);
    }
    // eslint-disable-next-line max-len
    render(results = [], pages = [], firstRender = true) {
        const template = this.getTemplate();
        const mappedResults = [];
        if (results) {
            Object.keys(results).forEach((key) => {
                mappedResults.push(Object.assign({ id: results[key].id }, results[key].record));
            });
        }
        // If the page does not exist, assume we're on the first page
        const currentPage = parseInt(Helpers_1.URIHelper.getSearchParam('page')) || 1;
        const lastPage = pages[pages.length - 1];
        const options = {
            previous_button: this.getPrevious(),
            next_button: this.getNext(),
            previous_page: currentPage - 1,
            next_page: currentPage + 1,
            // Disable it if there are no pages or the current page is 1
            disable_previous_button: (pages.length === 0 ||
                currentPage === 1) ? 'disabled' : '',
            // Disable it if there are no pages or the current page is the last page
            disable_next_button: (pages.length === 0 ||
                lastPage.page === currentPage) ? 'disabled' : '',
            pages: pages,
            results: this.renderResults({
                results: mappedResults,
                no_result_message: this.getNoResultMessage(),
            }),
            last_button: '',
            first_button: '',
            first_page: 0,
            last_page: 0,
            // Disable it if there are no pages or the current page is the last page
            disable_last_button: (pages.length === 0 ||
                lastPage.page === currentPage) ? 'disabled' : '',
            // Disable it if there are no pages or the current page is 1
            disable_first_button: (pages.length === 0 ||
                currentPage === 1) ? 'disabled' : '',
            use_sort_select: (Object.keys(this.getSortSelect()).length > 0),
            sort_select: this.renderSortSelect({
                options: this.getSortSelect(),
            }),
            hide_pagination: (this.hidePagination || this.getInfiniteScroll()) ? 'needletail-hidden' : '',
            hide_on_initial_request: (firstRender) ? 'needletail-hide-on-initial-request' : '',
            infinite_scroll: this.getInfiniteScroll(),
            total_results: this.getTotalResults(),
            total_results_text: this.getTotalResultsText(),
            extra_options: this.getExtraOptions(),
        };
        // Enable the quick navigation
        if (this.getShowQuickPagination()) {
            options.last_button = this.getLast();
            options.first_button = this.getFirst();
            options.first_page = 1;
            options.last_page = (0, Helpers_1.optional)(lastPage).page;
        }
        const rendered = mustache_1.default.render(template, options);
        return document.createRange().createContextualFragment(rendered);
    }
    renderResults(options = {}) {
        const template = this.getResultTemplate();
        options = Object.assign({}, options);
        return mustache_1.default.render(template, options);
    }
    renderSortSelect(options = {}) {
        const template = this.getResultSortSelectTemplate();
        options = Object.assign({}, options);
        return mustache_1.default.render(template, options);
    }
    executeJS() {
        document.addEventListener(Helpers_1.Events.onBeforeResultRequest, (0, debounce_1.default)((e) => {
            if (!e.detail.query) {
                e.detail.query = this.getQuery();
            }
            if (this.getUseSkeleton()) {
                const skeletonNode = this.renderSkeleton();
                document.querySelectorAll(this.getEl()).forEach((element) => {
                    const child = element.querySelector('.needletail-result');
                    element.replaceChild(skeletonNode.cloneNode(true), child);
                });
            }
            const autocompleteBars = this.client.widgets.autocompleteBar;
            const aggregationBars = this.client.widgets.aggregationBar;
            // Build the options for the search
            let buckets = autocompleteBars.reduce((res, bar) => {
                if (!bar.getUseInResults()) {
                    return res;
                }
                bar.getBuckets().forEach((bucket) => {
                    res.push(bucket);
                });
                return res;
            }, []);
            buckets = buckets.concat(this.getBuckets());
            const autocompleteValues = autocompleteBars.reduce((res, bar) => {
                if (!bar.getUseInResults()) {
                    return res;
                }
                if (Object.keys(bar.value).length > 0) {
                    if (typeof bar.value.field === 'string') {
                        res.push(bar.value);
                    }
                    else {
                        bar.value.field.forEach((field) => {
                            res.push({
                                field: field,
                                value: bar.value.value,
                            });
                        });
                    }
                }
                return res;
            }, []);
            const aggregationValues = aggregationBars.map((bar) => {
                return bar.getValues();
            });
            e.detail.buckets = buckets;
            e.detail.search_values = {};
            e.detail.equals_search_values = {
                'match': [
                    // eslint-disable-next-line prefer-spread
                    ...[].concat.apply([], aggregationValues),
                ],
            };
            e.detail.extra_search_values = {};
            e.detail.should_search_values = {
                'fuzzy': [
                    // eslint-disable-next-line prefer-spread
                    ...[].concat.apply([], autocompleteValues),
                ],
            };
            Helpers_1.Events.emit(Helpers_1.Events.onResultRequest, e.detail);
        }, 100));
        document.addEventListener(Helpers_1.Events.onResultRequest, (0, debounce_1.default)((e) => __awaiter(this, void 0, void 0, function* () {
            let currentPage = 1;
            let size = this.getPerPage();
            let offset;
            if (this.initialRequest) {
                this.infinityPage = parseInt(Helpers_1.URIHelper.getSearchParam('page')) || 1;
            }
            if (this.getInfiniteScroll()) {
                currentPage = this.infinityPage;
                offset = (currentPage - 1) * this.getPerPage();
                if (this.initialRequest) {
                    size *= currentPage;
                    offset = 0;
                }
            }
            else {
                // If there is no page, assume we're on page 1
                currentPage = parseInt(Helpers_1.URIHelper.getSearchParam('page')) || 1;
                offset = (currentPage - 1) * this.getPerPage();
            }
            // Perform the search
            const result = yield this.client.search({
                buckets: e.detail.buckets,
                search: Object.assign({ 'should': Object.assign({}, e.detail.should_search_values), 'equals': Object.assign(Object.assign({}, e.detail.search_values), e.detail.equals_search_values) }, e.detail.extra_search_values),
                size: size,
                mode: this.getSortMode(),
                group_by: this.getGroupBy(),
                sort: this.getSortBy(),
                direction: this.getSortDirection(),
                offset: offset,
            });
            e.detail.status = result.status;
            if (result && result.data) {
                e.detail.count = result.data.count;
                this.setTotalResults(e.detail.count);
                if (result.data.results) {
                    e.detail.pages = [];
                    // Add all the pages
                    for (let i = 0; i < Math.ceil(result.data.count / this.getPerPage()); i++) {
                        e.detail.pages.push({
                            page: (i + 1),
                            offset: i * this.getPerPage(),
                            active: ((i === 0 && !currentPage) ||
                                currentPage === (i + 1)) ? this.getPaginationActiveClass() : '',
                        });
                    }
                    const totalPages = e.detail.pages.length;
                    this.totalPages = totalPages;
                    if (totalPages === 1 && this.getHideOnSinglePage()) {
                        this.hidePagination = true;
                    }
                    else {
                        this.hidePagination = false;
                    }
                    // If there's more pages than the user wants to show start minifying
                    if (totalPages > this.getMinifyPages()) {
                        let start = 0;
                        const startArray = [];
                        const endArray = [];
                        let halfMinified = Math.ceil(this.getMinifyPages() / 2);
                        let takeFull = false;
                        // Get the last page and add a separator
                        if (totalPages - halfMinified >= currentPage) {
                            const last = e.detail.pages.pop();
                            // Separator
                            if (totalPages - halfMinified != currentPage) {
                                endArray.push({
                                    page: '...',
                                    offset: 0,
                                    active: 'disabled',
                                });
                            }
                            endArray.push(last);
                        }
                        else {
                            takeFull = true;
                        }
                        if (halfMinified < currentPage) {
                            const first = e.detail.pages.shift();
                            startArray.push(first);
                            // If the minify pages is an uneven number add 1 to the half minified
                            if (this.getMinifyPages() % 2 === 1) {
                                halfMinified++;
                            }
                            if (takeFull) {
                                let take = this.getMinifyPages();
                                // If the current page is the last page, minus one
                                if (currentPage == totalPages) {
                                    currentPage--;
                                    // If the current page is the second to last page, take half instead of full
                                }
                                else if (currentPage == (totalPages - 2)) {
                                    take = halfMinified;
                                }
                                start = currentPage - take;
                            }
                            else {
                                start = currentPage - halfMinified;
                            }
                            if (start > 0) {
                                // Separator
                                startArray.push({
                                    page: '...',
                                    offset: 0,
                                    active: 'disabled',
                                });
                            }
                        }
                        const items = e.detail.pages.splice(start, this.getMinifyPages());
                        e.detail.pages = [
                            ...items,
                        ];
                        if (startArray.length > 0) {
                            e.detail.pages.unshift(...startArray);
                        }
                        if (endArray.length > 0) {
                            e.detail.pages.push(...endArray);
                        }
                    }
                    e.detail.search_result = result.data.results;
                }
                if (result.data.aggs) {
                    Helpers_1.Events.emit(Helpers_1.Events.onAggsUpdate, result.data.aggs);
                }
            }
            Helpers_1.Events.emit(Helpers_1.Events.onAfterResultRequest, e.detail);
        }), 100));
        document.addEventListener(Helpers_1.Events.onPageChange, (e) => {
            if (!this.initialRequest && this.getScrollBackToTop()) {
                const elements = document.querySelectorAll(this.getEl());
                if (elements.length === 1) {
                    const element = elements.item(0);
                    const position = element.offsetTop;
                    const offsetPosition = position - this.getScrollOffset();
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                    });
                }
            }
        });
        document.addEventListener(Helpers_1.Events.onAfterResultRequest, (e) => {
            // Render the node
            const node = this.render(e.detail.search_result, e.detail.pages, false);
            document.querySelectorAll(this.getEl()).forEach((element) => {
                const child = element.querySelector('.needletail-result');
                if (this.getInfiniteScroll()) {
                    const lastItems = child.querySelectorAll('.needletail-result-result');
                    const lastItem = lastItems[lastItems.length - 1];
                    if (lastItem && !this.hardReset) {
                        let resultChild;
                        node.childNodes.forEach((childNode) => {
                            if (childNode.classList &&
                                childNode.classList.contains('needletail-result') &&
                                !resultChild) {
                                resultChild = childNode.querySelector('.needletail-result-results');
                            }
                        });
                        lastItem.after(...resultChild.childNodes);
                    }
                    else {
                        element.replaceChild(node.cloneNode(true), child);
                        this.hardReset = false;
                    }
                }
                else {
                    element.replaceChild(node.cloneNode(true), child);
                    element.querySelectorAll('.needletail-result-pagination-page:not(.disabled):not(.active)')
                        .forEach((paginationElement) => {
                        // Add the click event
                        paginationElement.addEventListener('click', (e) => {
                            const currentPage = Helpers_1.URIHelper.getSearchParam('page');
                            const pageNumber = paginationElement.getAttribute('data-page');
                            Helpers_1.URIHelper.addToHistory('page', pageNumber);
                            Helpers_1.Events.emit(Helpers_1.Events.onPageChange, {
                                current_page: currentPage,
                                new_page: pageNumber,
                            });
                            Helpers_1.Events.emit(Helpers_1.Events.onBeforeResultRequest, {
                                query: this.getQuery(),
                            });
                        });
                    });
                }
            });
            const sortSelect = document.getElementsByClassName('needletail-sort-select');
            for (let i = 0; i < sortSelect.length; i++) {
                sortSelect[i].value = this.getSortSelectDefault();
                sortSelect[i].addEventListener('change', (e) => {
                    this.setSortSelectDefault(e.target.value);
                    this.setSortBy(e.target.options[e.target.selectedIndex].getAttribute('data-attribute'));
                    this.setSortDirection(e.target.options[e.target.selectedIndex].getAttribute('data-direction') || 'asc');
                    Helpers_1.URIHelper.addToHistory('page', '1');
                    this.infinityPage = 1;
                    this.hardReset = true;
                    Helpers_1.Events.emit(Helpers_1.Events.onBeforeResultRequest, {
                        query: this.getQuery(),
                    });
                });
            }
            const elements = document.querySelectorAll('.needletail-result-result');
            elements.forEach((element, index) => {
                element.addEventListener('click', (e) => {
                    Helpers_1.URIHelper.addToHistory('index', index.toString());
                });
            });
            if (this.initialRequest) {
                const element = elements.item(parseInt(Helpers_1.URIHelper.getSearchParam('index')));
                const position = element.offsetTop;
                const offsetPosition = position - this.getScrollOffset();
                window.scrollTo({
                    top: offsetPosition,
                    behavior: this.getInfiniteScroll() ? 'smooth' : 'auto',
                });
            }
            this.stopLoader('infinity-scroll');
            this.initialRequest = false;
            Helpers_1.Events.emit(Helpers_1.Events.resultFinished, {
                name: this.discriminator,
            });
        });
        if (this.getInfiniteScroll()) {
            window.addEventListener('scroll', (0, debounce_1.default)(() => {
                const { scrollTop, scrollHeight, clientHeight, } = document.documentElement;
                if (scrollTop + clientHeight >= scrollHeight - this.getBottomScrollOffset() &&
                    this.totalPages >= this.infinityPage + 1) {
                    this.infinityPage++;
                    Helpers_1.URIHelper.addToHistory('page', this.infinityPage.toString());
                    this.startLoader('infinity-scroll');
                    Helpers_1.Events.emit(Helpers_1.Events.onBeforeResultRequest, {
                        query: this.getQuery(),
                    });
                }
            }, 200));
        }
        document.addEventListener(Helpers_1.Events.onAggregationValueChange, (e) => {
            if (!this.initialRequest) {
                Helpers_1.URIHelper.addToHistory('page', '1');
                this.infinityPage = 1;
                this.hardReset = true;
            }
        });
        Helpers_1.Events.emit(Helpers_1.Events.onBeforeResultRequest, {
            query: this.getQuery(),
        });
    }
    startLoader(name) {
        if (this.getLoader()) {
            const loaders = document.querySelectorAll(`.needletail-loader.${name}`);
            loaders.forEach((loader) => {
                loader.classList.add(`needletail-loader-${this.getLoader()}`);
            });
        }
    }
    stopLoader(name) {
        const loaders = document.querySelectorAll(`.needletail-loader.${name}`);
        loaders.forEach((loader) => {
            loader.classList.remove(`needletail-loader-${this.getLoader()}`);
        });
    }
}
exports.Result = Result;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(3665);
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(15);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});