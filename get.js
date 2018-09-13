/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @see has, hasIn, set, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */

 function get(object, path, defaultValue){
 	const result = object == null ? undefined : baseGet(object, path);
 	return result === undefined ? defaultValue : result;

 	function baseGet(object, path){
 		path = castPath(path, object);
 		let index = 0;
 		const length = path.length;
 		while(object != null && index < length) {
 			object = object[toKey(path[index++])];
 		}
 		return (index && index === length) ? object : undefined;
 	}

 	function castPath(value, object){
 		if(Array.isArray(value)){
 			return value;
 		}
 		return isKey(value, object) ? [value] : stringToPath(value);
 	}

 	function isKey(value, object){
 		const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
 		const reIsPlainProp = /^\w*$/;
 		if(Array.isArray(value)){
 			return false;
 		}
 		const type = typeof value;
 		if(type === 'number' || type === 'boolean' || value == null || isSymbol(value)){
 			return true;
 		}
 		return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (object != null && value in Object(object));
 	}

 	function isSymbol(value){
 		const type = typeof value;
 		return type === 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]');
 	}

 	function getTag(value){
 		const dataViewTag = '[object DateView]';
 		const mapTag = '[object Map]';
 		const objectTag = '[object Object]';
 		const promiseTag = '[object Promise]';
 		const setTag = '[object Set]';
 		const weakMapTag = '[object WeakMap]';

 		const dataViewCtorString = `${DataView}`;
 		const mapCtorString = `${Map}`;
 		const promiseCtorString = `${Promise}`;
 		const setCtorString = `${Set}`;
 		const weakMapCtorString = `${WeakMap}`;

 		let getTag = baseGetTag;
 		if((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) || 
 				(getTag(new Map) != mapTag) ||
 				(getTag(new Promise.resolve()) != promiseTag) ||
 				(getTag(new Set) != setTag) || 
 				(getTag(new WeakMap) != weakMapTag) 
 			) {
 			getTag = (value) => {
 				const result  =baseGetTag(value);
 				const Ctor = result == objectTag ? value.constructor : undefined ;
 				const ctorString = Ctor ? `${Ctor}` : '';
 				if(ctorString){
 					switch(ctorString){
 						case dataViewCtorString: return dataViewTag
				        case mapCtorString: return mapTag
				        case promiseCtorString: return promiseTag
				        case setCtorString: return setTag
				        case weakMapCtorString: return weakMapTag
 					}
 				}
 				return result;
 			}
 		}
 	}

 	function baseGetTag(value){
 		const objectProto = Object.prototype;
 		const hasOwnProperty = objectProto.hasOwnProperty;
 		const toString = objectProto.toString;
 		const symToStringTag = typeof Symbol != 'undefined' ? Symbol.toStringTag : undefined;
 		if(value == null){
 			return value === undefined ? '[object undefined]' : '[object Null]';
 		}
 		if(!(symToStringTag && symToStringTag in Object(value))){
 			return toString.call(value);
 		}
 		const isOwn = hasOwnProperty.call(value, symToStringTag);
 		const tag = value[symToStringTag];
 		let unmasked = false;
 		try{
 			value[symToStringTag] = undefined; //some browser dont support symbol setter
 			unmasked = true;
 		}catch(e){}
 		const result = toString.call(value); // [object Object]
 		if(unmasked){
 			if(isOwn){
 				value[symToStringTag] = tag;
 			}else{
 				delete value[symToStringTag];
 			}
 		}
 		return result;
 	}

 	function stringToPath(value){
 		const charCodeOfDot = '.'.charCodeAt(0);
 	}

 	function memoizeCapped(){

 	}
 }