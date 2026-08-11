import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server as Server$1 } from 'node:http';
import path, { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, createError, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, getQuery as getQuery$1, getRequestWebStream, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, readBody, getResponseStatusText } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/@vue/shared/dist/shared.cjs.js';
import viteNodeEntry_mjs from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/@nuxt/vite-builder/dist/vite-node-entry.mjs';
import { viteNodeFetch } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/@nuxt/vite-builder/dist/vite-node.mjs';
import fs, { promises, readFileSync } from 'node:fs';
import PrismaClientPkg from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/@prisma/client/default.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, encodePath, joinRelativeURL } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/defu/dist/defu.mjs';
import destr, { destr as destr$1 } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/destr/dist/index.mjs';
import { snakeCase } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/devalue/index.js';
import { isVNode, isRef, toValue } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/vue/index.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/unhead/dist/plugins.mjs';
import { createHooks } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/unstorage/drivers/fs.mjs';
import file_58_47_47_47D_58_47Documents_47GitHub_47Directorio_45Activo_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import { digest, hash as hash$1 } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/youch-core/build/index.js';
import { Youch } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/errx/dist/index.mjs';
import { Server } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/socket.io/wrapper.mjs';
import { defineNitroPlugin } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/nitropack/dist/runtime/plugin.mjs';
import _wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/@nuxt/vite-builder/dist/fix-stacktrace.mjs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/pathe/dist/index.mjs';
import { walkResolver } from 'file://D:/Documents/GitHub/Directorio-Activo/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"D:/Documents/GitHub/Directorio-Activo/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"D:/Documents/GitHub/Directorio-Activo","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"D:/Documents/GitHub/Directorio-Activo/server","watchOptions":{"ignored":[null]}}));
storage.mount('cache:nuxt:payload', file_58_47_47_47D_58_47Documents_47GitHub_47Directorio_45Activo_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js({"driver":"file:///D:/Documents/GitHub/Directorio-Activo/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js","base":"D:/Documents/GitHub/Directorio-Activo/.nuxt/cache/nuxt/payload"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"D:/Documents/GitHub/Directorio-Activo/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"D:/Documents/GitHub/Directorio-Activo/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"D:/Documents/GitHub/Directorio-Activo/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      }
    }
  },
  "public": {
    "wsEndpoint": "ws://localhost:3001"
  },
  "databaseUrl": "postgresql://postgres:postgres@localhost:5432/asset_control?schema=public"
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
	
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e.data) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-top-navigation-by-user-activation');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		
		return;
	}
	
	const defaultRes = await defaultHandler(error, event, { json: true });
	
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
		
		defaultRes.body.stack = defaultRes.body.stack.join("\n");
	}
	const errorObject = defaultRes.body;
	
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	
	const reqHeaders = getRequestHeaders(event);
	
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"] || !!event.context.nuxt?.["~rendering-error"];
	if (!isRenderingError) {
		event.context.nuxt ||= {};
		event.context.nuxt["~rendering-error"] = true;
	}
	
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	
	if (!res) {
		const { template } = await Promise.resolve().then(function () { return error500; });
		{
			
			errorObject.description = errorObject.message;
		}
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	if (!globalThis._importMeta_.test && typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") {
			return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
		}
	}
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _pUGPZO8su8YK4n0Gc9Qv3O8QRwIsEkUkrUSvfIuSTQ = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "D:/Documents/GitHub/Directorio-Activo";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : undefined,
	URL: (data) => data instanceof URL ? data.toString() : undefined,
	Symbol: (data) => typeof data === "symbol" ? data.description ?? "" : undefined
};
const asyncContext = getContext("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
const _ycW3DKWA7z_1DQGWysUcArwAAtNg_vqEsMD2jA38w = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
			return;
		}
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) {
				continue;
			}
			if (EXCLUDE_TRACE_RE.test(entry.source)) {
				continue;
			}
			filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			
			filename,
			
			stack: trace
		};
		
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
			console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const _5IvypT0xwB8OTC7puDMUhuPEPU6sbYQGmtyiRH5sDA = defineNitroPlugin((nitroApp) => {
  nitroApp.router.use("/socket.io", () => {
  });
  nitroApp.hooks.hook("request", (event) => {
    const rawServer = event.node.req.socket.server;
    if (rawServer && !rawServer._io) {
      const io = new Server(rawServer, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
      });
      rawServer._io = io;
      io.on("connection", (socket) => {
        console.log(`[SOCKET] Cliente conectado: ${socket.id}`);
        socket.on("agente_registrar", (data) => {
          const token = data == null ? void 0 : data.token;
          if (token) {
            socket.join(token);
            console.log(`[SOCKET] Agente registrado en sala: ${token}`);
            socket.emit("confirmacion", {
              mensaje: "Agente registrado correctamente en el canal seguro Directorio Activo Ren.",
              sala: token
            });
          }
        });
        socket.on("disconnect", () => {
          console.log(`[SOCKET] Cliente desconectado: ${socket.id}`);
        });
      });
    }
  });
});

const plugins = [
  _pUGPZO8su8YK4n0Gc9Qv3O8QRwIsEkUkrUSvfIuSTQ,
_ycW3DKWA7z_1DQGWysUcArwAAtNg_vqEsMD2jA38w,
_5IvypT0xwB8OTC7puDMUhuPEPU6sbYQGmtyiRH5sDA,
_wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _yOnCC0 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function computeIslandHash(name, serializedProps, context, source) {
  let parsed;
  try {
    parsed = JSON.parse(serializedProps);
  } catch {
    parsed = serializedProps;
  }
  return hash$1([name, parsed, context, source]).replace(/[-_]/g, "");
}

const MAX_ISLAND_BODY_BYTES = 64 * 1024;

const MAX_ISLAND_PROP_DEPTH = 64;

function exceedsMaxDepth(raw, maxDepth = MAX_ISLAND_PROP_DEPTH) {
	let depth = 0;
	let inString = false;
	let escaped = false;
	for (let i = 0; i < raw.length; i++) {
		const ch = raw[i];
		if (inString) {
			if (escaped) {
				escaped = false;
			} else if (ch === "\\") {
				escaped = true;
			} else if (ch === "\"") {
				inString = false;
			}
			continue;
		}
		if (ch === "\"") {
			inString = true;
		} else if (ch === "{" || ch === "[") {
			if (++depth > maxDepth) {
				return true;
			}
		} else if (ch === "}" || ch === "]") {
			if (depth > 0) {
				depth--;
			}
		}
	}
	return false;
}

function exceedsMaxBytes(raw, maxBytes = MAX_ISLAND_BODY_BYTES) {
	return Buffer.byteLength(raw, "utf8") > maxBytes;
}

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) {
		return encodePath(path);
	}
	return encodePath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function createSSRContext(event) {
	const url = encodeEventPath(event.path);
	const ssrContext = {
		url,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

function buildAssetsDir() {
	
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => Promise.resolve().then(function () { return server; }).then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => Promise.resolve().then(function () { return client_manifest$1; }).then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);

const getSSRRenderer = lazyCachedFunction(async () => {
	
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	
	const precomputed = undefined ;
	
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		
		
		if (process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});

const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = undefined ;
	// @ts-expect-error virtual file
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
		}
	});
	
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);

function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		
		let html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		
		if (!html && ssrContext.teleports) {
			for (const [key, value] of Object.entries(ssrContext.teleports)) {
				const [, , componentUid] = key.match(SSR_CLIENT_TELEPORT_MARKER) ?? [];
				if (componentUid === clientUid) {
					html = value.replaceAll("<!--teleport start anchor-->", "");
					break;
				}
			}
		}
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const handler$1 = defineEventHandler(async (event) => {
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	{
		return toResponse(event, await renderIsland(event));
	}
});
function toResponse(event, result) {
	return "raw" in result ? returnIslandResponse(event, result.raw) : result;
}
async function renderIsland(event) {
	const nitroApp = useNitroApp();
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		if (ssrContext["~renderResponse"] && err?.message === "skipping render") {
			return {};
		}
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	
	
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (ssrContext["~renderResponse"]) {
		const response = ssrContext["~renderResponse"];
		if (response.statusCode && response.statusCode >= 400) {
			throw createError({
				statusCode: response.statusCode,
				statusMessage: response.statusMessage
			});
		}
		return { raw: response };
	}
	
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			
			if ("inline" in getQuery(resource.file)) {
				continue;
			}
			
			
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
				link.push({
					rel: "stylesheet",
					href: renderer.rendererContext.buildAssetsURL(resource.file),
					crossorigin: ""
				});
			}
		}
		if (link.length) {
			ssrContext.head.push({ link }, { mode: "server" });
		}
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	
	islandHead.link ||= [];
	islandHead.style ||= [];
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
}
function returnIslandResponse(event, response) {
	for (const header in response.headers || {}) {
		setResponseHeader(event, header, response.headers[header]);
	}
	if (response.statusCode) {
		setResponseStatus(event, response.statusCode, response.statusMessage);
	}
	return response.body;
}
const ISLAND_PATH_PREFIX = "/__nuxt_island/";
const VALID_COMPONENT_NAME_RE = /^[a-z][\w.-]*$/i;


async function readGuardedIslandBody(event) {
	const contentLength = Number(getRequestHeader(event, "content-length"));
	if (contentLength > MAX_ISLAND_BODY_BYTES) {
		throw createError({
			statusCode: 413,
			statusMessage: "Island request body too large"
		});
	}
	
	
	let received = 0;
	let raw = "";
	let overflowed = false;
	const stream = getRequestWebStream(event);
	if (stream) {
		const decoder = new TextDecoder();
		const reader = stream.getReader();
		try {
			for (;;) {
				const { done, value } = await reader.read();
				if (done) {
					break;
				}
				received += value.byteLength;
				if (received > MAX_ISLAND_BODY_BYTES) {
					
					
					
					overflowed = true;
					continue;
				}
				raw += decoder.decode(value, { stream: true });
			}
		} finally {
			reader.releaseLock();
		}
		raw += decoder.decode();
	}
	if (overflowed) {
		throw createError({
			statusCode: 413,
			statusMessage: "Island request body too large"
		});
	}
	if (!raw) {
		return {};
	}
	if (exceedsMaxDepth(raw)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Island request body too deeply nested"
		});
	}
	return destr$1(raw) || {};
}
async function getIslandContext(event) {
	let url = event.path || "";
	url.replace(/\?.*$/, "");
	if (!url.startsWith(ISLAND_PATH_PREFIX)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request path"
		});
	}
	const componentParts = url.substring(ISLAND_PATH_PREFIX.length).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	if (!componentName || !VALID_COMPONENT_NAME_RE.test(componentName)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island component name"
		});
	}
	const rawContext = event.method === "GET" ? getQuery$1(event) : await readGuardedIslandBody(event);
	const serializedProps = typeof rawContext?.props === "string" ? rawContext.props : "{}";
	
	
	if (exceedsMaxBytes(serializedProps)) {
		throw createError({
			statusCode: 413,
			statusMessage: "Island request props too large"
		});
	}
	if (exceedsMaxDepth(serializedProps)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Island request props too deeply nested"
		});
	}
	
	
	const clientContext = {};
	if (rawContext && typeof rawContext === "object") {
		for (const key in rawContext) {
			if (key !== "props") {
				clientContext[key] = rawContext[key];
			}
		}
	}
	const parsed = destr$1(serializedProps);
	if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request props"
		});
	}
	const parsedProps = parsed;
	
	
	const expectedHash = computeIslandHash(componentName, serializedProps, clientContext, undefined);
	if (!hashId || hashId !== expectedHash) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request hash"
		});
	}
	return {
		url: typeof rawContext?.url === "string" ? rawContext.url : "/",
		id: hashId,
		name: componentName,
		props: parsedProps,
		slots: {},
		components: {}
	};
}

const _lazy_ArYmBw = () => Promise.resolve().then(function () { return audit_post$1; });
const _lazy_6VKem5 = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_4eGIlM = () => Promise.resolve().then(function () { return accesos_get$1; });
const _lazy_7afsfD = () => Promise.resolve().then(function () { return conceder_post$1; });
const _lazy_4jSxBj = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_ZUc7u1 = () => Promise.resolve().then(function () { return toggleAcceso_post$1; });
const _lazy_DxTyQS = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_wnZ1iw = () => Promise.resolve().then(function () { return _id__delete$7; });
const _lazy_EG7j75 = () => Promise.resolve().then(function () { return _id__put$7; });
const _lazy_zL9LJk = () => Promise.resolve().then(function () { return create_post$7; });
const _lazy_Fnpddm = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_WDEgox = () => Promise.resolve().then(function () { return dashboard_get$1; });
const _lazy_TlvfnO = () => Promise.resolve().then(function () { return stats_get$1; });
const _lazy_y3qy3f = () => Promise.resolve().then(function () { return _id__post$1; });
const _lazy_Zrv6o8 = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_oO3jWC = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_9RbKT7 = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_ep5SsM = () => Promise.resolve().then(function () { return _id__delete$5; });
const _lazy_W1nZFb = () => Promise.resolve().then(function () { return _id__put$5; });
const _lazy_xMhG7s = () => Promise.resolve().then(function () { return accion_post$1; });
const _lazy_ADbDcG = () => Promise.resolve().then(function () { return collect_post$1; });
const _lazy_kGqOtd = () => Promise.resolve().then(function () { return create_post$5; });
const _lazy__YOggo = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_parnc1 = () => Promise.resolve().then(function () { return ping_post$1; });
const _lazy_mL7bNO = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_zW8xG9 = () => Promise.resolve().then(function () { return _id__put$3; });
const _lazy_5bRIRr = () => Promise.resolve().then(function () { return authUrl_get$1; });
const _lazy_J55zch = () => Promise.resolve().then(function () { return callback_get$1; });
const _lazy_rcurUH = () => Promise.resolve().then(function () { return create_post$3; });
const _lazy_pSrLRI = () => Promise.resolve().then(function () { return exchangeCode_post$1; });
const _lazy_Atj1hY = () => Promise.resolve().then(function () { return sincronizar_post$5; });
const _lazy_eTf2Ga = () => Promise.resolve().then(function () { return status_get$1; });
const _lazy_Gde_HU = () => Promise.resolve().then(function () { return toggleStatus_post$3; });
const _lazy_6SXANl = () => Promise.resolve().then(function () { return users_get$3; });
const _lazy_VdAxv6 = () => Promise.resolve().then(function () { return sincronizar_post$3; });
const _lazy_OwAlpu = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_8nkOfi = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_jrmEfk = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_stDkr_ = () => Promise.resolve().then(function () { return create_post$1; });
const _lazy__aR2vp = () => Promise.resolve().then(function () { return sincronizar_post$1; });
const _lazy_H2lrKW = () => Promise.resolve().then(function () { return toggleStatus_post$1; });
const _lazy_myw_wz = () => Promise.resolve().then(function () { return users_get$1; });
const _lazy_KYoPwH = () => Promise.resolve().then(function () { return aplicar_post$1; });
const _lazy_FKVnDn = () => Promise.resolve().then(function () { return install_ps1$1; });
const _lazy_KJYKLl = () => Promise.resolve().then(function () { return renAgent_js$1; });
const _lazy_69PE4O = () => Promise.resolve().then(function () { return renLock_ps1$1; });
const _lazy_DqtFUo = () => Promise.resolve().then(function () { return renderer; });

const handlers = [
  { route: '', handler: _yOnCC0, lazy: false, middleware: true, method: undefined },
  { route: '/api/actions/audit', handler: _lazy_ArYmBw, lazy: true, middleware: false, method: "post" },
  { route: '/api/active-directory', handler: _lazy_6VKem5, lazy: true, middleware: false, method: "get" },
  { route: '/api/aplicaciones/accesos', handler: _lazy_4eGIlM, lazy: true, middleware: false, method: "get" },
  { route: '/api/aplicaciones/conceder', handler: _lazy_7afsfD, lazy: true, middleware: false, method: "post" },
  { route: '/api/aplicaciones', handler: _lazy_4jSxBj, lazy: true, middleware: false, method: "get" },
  { route: '/api/aplicaciones/toggle-acceso', handler: _lazy_ZUc7u1, lazy: true, middleware: false, method: "post" },
  { route: '/api/auditorias', handler: _lazy_DxTyQS, lazy: true, middleware: false, method: "get" },
  { route: '/api/colaboradores/:id', handler: _lazy_wnZ1iw, lazy: true, middleware: false, method: "delete" },
  { route: '/api/colaboradores/:id', handler: _lazy_EG7j75, lazy: true, middleware: false, method: "put" },
  { route: '/api/colaboradores/create', handler: _lazy_zL9LJk, lazy: true, middleware: false, method: "post" },
  { route: '/api/colaboradores', handler: _lazy_Fnpddm, lazy: true, middleware: false, method: "get" },
  { route: '/api/dashboard', handler: _lazy_WDEgox, lazy: true, middleware: false, method: "get" },
  { route: '/api/dashboard/stats', handler: _lazy_TlvfnO, lazy: true, middleware: false, method: "get" },
  { route: '/api/desvinculacion/iniciar/:id', handler: _lazy_y3qy3f, lazy: true, middleware: false, method: "post" },
  { route: '/api/desvinculacion/wizard/:id', handler: _lazy_Zrv6o8, lazy: true, middleware: false, method: "get" },
  { route: '/api/devices/:id', handler: _lazy_oO3jWC, lazy: true, middleware: false, method: "get" },
  { route: '/api/devices', handler: _lazy_9RbKT7, lazy: true, middleware: false, method: "get" },
  { route: '/api/equipos/:id', handler: _lazy_ep5SsM, lazy: true, middleware: false, method: "delete" },
  { route: '/api/equipos/:id', handler: _lazy_W1nZFb, lazy: true, middleware: false, method: "put" },
  { route: '/api/equipos/accion', handler: _lazy_xMhG7s, lazy: true, middleware: false, method: "post" },
  { route: '/api/equipos/collect', handler: _lazy_ADbDcG, lazy: true, middleware: false, method: "post" },
  { route: '/api/equipos/create', handler: _lazy_kGqOtd, lazy: true, middleware: false, method: "post" },
  { route: '/api/equipos', handler: _lazy__YOggo, lazy: true, middleware: false, method: "get" },
  { route: '/api/equipos/ping', handler: _lazy_parnc1, lazy: true, middleware: false, method: "post" },
  { route: '/api/google/:id', handler: _lazy_mL7bNO, lazy: true, middleware: false, method: "delete" },
  { route: '/api/google/:id', handler: _lazy_zW8xG9, lazy: true, middleware: false, method: "put" },
  { route: '/api/google/auth-url', handler: _lazy_5bRIRr, lazy: true, middleware: false, method: "get" },
  { route: '/api/google/callback', handler: _lazy_J55zch, lazy: true, middleware: false, method: "get" },
  { route: '/api/google/create', handler: _lazy_rcurUH, lazy: true, middleware: false, method: "post" },
  { route: '/api/google/exchange-code', handler: _lazy_pSrLRI, lazy: true, middleware: false, method: "post" },
  { route: '/api/google/sincronizar', handler: _lazy_Atj1hY, lazy: true, middleware: false, method: "post" },
  { route: '/api/google/status', handler: _lazy_eTf2Ga, lazy: true, middleware: false, method: "get" },
  { route: '/api/google/toggle-status', handler: _lazy_Gde_HU, lazy: true, middleware: false, method: "post" },
  { route: '/api/google/users', handler: _lazy_6SXANl, lazy: true, middleware: false, method: "get" },
  { route: '/api/jira/sincronizar', handler: _lazy_VdAxv6, lazy: true, middleware: false, method: "post" },
  { route: '/api/licenses', handler: _lazy_OwAlpu, lazy: true, middleware: false, method: "get" },
  { route: '/api/microsoft/:id', handler: _lazy_8nkOfi, lazy: true, middleware: false, method: "delete" },
  { route: '/api/microsoft/:id', handler: _lazy_jrmEfk, lazy: true, middleware: false, method: "put" },
  { route: '/api/microsoft/create', handler: _lazy_stDkr_, lazy: true, middleware: false, method: "post" },
  { route: '/api/microsoft/sincronizar', handler: _lazy__aR2vp, lazy: true, middleware: false, method: "post" },
  { route: '/api/microsoft/toggle-status', handler: _lazy_H2lrKW, lazy: true, middleware: false, method: "post" },
  { route: '/api/microsoft/users', handler: _lazy_myw_wz, lazy: true, middleware: false, method: "get" },
  { route: '/api/politicas/aplicar', handler: _lazy_KYoPwH, lazy: true, middleware: false, method: "post" },
  { route: '/agent/install.ps1', handler: _lazy_FKVnDn, lazy: true, middleware: false, method: undefined },
  { route: '/agent/ren-agent.js', handler: _lazy_KJYKLl, lazy: true, middleware: false, method: undefined },
  { route: '/agent/ren-lock.ps1', handler: _lazy_69PE4O, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_DqtFUo, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: handler$1, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_DqtFUo, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server$1 = new Server$1(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server$1.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server$1.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server$1.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = {
	"appName": "Nuxt",
	"version": "",
	"status": 500,
	"statusText": "Server error",
	"description": "This page is temporarily unavailable."
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1,minimum-scale=1\" name=\"viewport\"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);filter:blur(20vh)}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:\"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.-bottom-1\\/2{bottom:-50%}.left-0{left:0}.right-0{right:0}.grid{display:grid}.mb-16{margin-bottom:4rem}.mb-8{margin-bottom:2rem}.h-1\\/2{height:50%}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-8{padding-left:2rem;padding-right:2rem}.text-center{text-align:center}.text-8xl{font-size:6rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:px-0{padding-left:0;padding-right:0}.sm\\:text-4xl{font-size:2.25rem;line-height:2.5rem}}</style><script>!function(){const e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(const e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(const o of e)if(\"childList\"===o.type)for(const e of o.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script></head><body class=\"antialiased bg-white dark:bg-black dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-black\"><div class=\"-bottom-1/2 fixed h-1/2 left-0 right-0 spotlight\"></div><div class=\"max-w-520px text-center\"><h1 class=\"font-medium mb-8 sm:text-10xl text-8xl\">" + escapeHtml(messages.status) + "</h1><p class=\"font-light leading-tight mb-16 px-8 sm:px-0 sm:text-4xl text-xl\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const server = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: viteNodeEntry_mjs
}, Symbol.toStringTag, { value: 'Module' }));

const client_manifest = () => viteNodeFetch.getManifest();

const client_manifest$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client_manifest
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

const PrismaClient = PrismaClientPkg.PrismaClient || PrismaClientPkg;
let prisma;
{
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const audit_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { deviceId, adminUser, actionType, details } = body;
  if (!deviceId || !adminUser || !actionType) {
    throw createError({
      statusCode: 400,
      statusMessage: "Campos requeridos faltantes para auditor\xEDa."
    });
  }
  try {
    const auditEntry = await prisma.auditLog.create({
      data: {
        deviceId,
        adminUser,
        actionType,
        details,
        status: "SUCCESS"
      }
    });
    return {
      success: true,
      auditEntry
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al registrar log de auditor\xEDa: ${error.message}`
    });
  }
});

const audit_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: audit_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$c = defineEventHandler(async () => {
  return {
    domain: {
      name: "renova.local",
      netbios: "RENOVA",
      forestLevel: "Windows Server 2022",
      domainControllers: [
        { name: "DC01-BOG.renova.local", ip: "192.168.10.5", role: "PDC Emulator / GC", status: "Online", latencyMs: 2 },
        { name: "DC02-BOG.renova.local", ip: "192.168.10.6", role: "Replica / GC", status: "Online", latencyMs: 3 }
      ]
    },
    // 1. Estructura de Unidades Organizativas (OUs)
    organizationalUnits: [
      {
        id: "ou-corporativo",
        name: "RENOVA Corporativo",
        dn: "OU=RENOVA Corporativo,DC=renova,DC=local",
        type: "Root_OU",
        description: "Ra\xEDz organizacional principal",
        objectCount: 450,
        children: [
          {
            id: "ou-bogota",
            name: "Sede Bogot\xE1",
            dn: "OU=Sede Bogota,OU=RENOVA Corporativo,DC=renova,DC=local",
            type: "Location",
            objectCount: 280,
            children: [
              {
                id: "ou-bog-ti",
                name: "Tecnolog\xEDa e Infraestructura",
                dn: "OU=TI,OU=Sede Bogota,OU=RENOVA Corporativo,DC=renova,DC=local",
                type: "Department",
                users: 24,
                computers: 32,
                gposLinked: ["GPO-Security-Baseline", "GPO-DriveMaps-TI", "GPO-LAPS-Enforce"]
              },
              {
                id: "ou-bog-fin",
                name: "Finanzas y Contabilidad",
                dn: "OU=Finanzas,OU=Sede Bogota,OU=RENOVA Corporativo,DC=renova,DC=local",
                type: "Department",
                users: 45,
                computers: 50,
                gposLinked: ["GPO-Security-Baseline", "GPO-USB-Block", "GPO-DriveMaps-Finanzas"]
              },
              {
                id: "ou-bog-rrhh",
                name: "Talento Humano",
                dn: "OU=RRHH,OU=Sede Bogota,OU=RENOVA Corporativo,DC=renova,DC=local",
                type: "Department",
                users: 18,
                computers: 20,
                gposLinked: ["GPO-Security-Baseline", "GPO-DriveMaps-General"]
              }
            ]
          },
          {
            id: "ou-medellin",
            name: "Sede Medell\xEDn",
            dn: "OU=Sede Medellin,OU=RENOVA Corporativo,DC=renova,DC=local",
            type: "Location",
            objectCount: 120,
            children: [
              {
                id: "ou-med-ops",
                name: "Operaciones y Log\xEDstica",
                dn: "OU=Operaciones,OU=Sede Medellin,OU=RENOVA Corporativo,DC=renova,DC=local",
                type: "Department",
                users: 65,
                computers: 70,
                gposLinked: ["GPO-Security-Baseline", "GPO-DriveMaps-Ops"]
              }
            ]
          },
          {
            id: "ou-devices",
            name: "Dispositivos y Equipos",
            dn: "OU=Dispositivos,OU=RENOVA Corporativo,DC=renova,DC=local",
            type: "Container",
            objectCount: 180,
            children: [
              { id: "ou-workstations", name: "Workstations (Laptops & Desktops)", dn: "OU=Workstations,OU=Dispositivos,OU=RENOVA Corporativo,DC=renova,DC=local", type: "DeviceGroup", count: 145 },
              { id: "ou-servers", name: "Servidores de Infraestructura", dn: "OU=Servidores,OU=Dispositivos,OU=RENOVA Corporativo,DC=renova,DC=local", type: "DeviceGroup", count: 25 },
              { id: "ou-kiosks", name: "Kioskos & Terminales", dn: "OU=Kioskos,OU=Dispositivos,OU=RENOVA Corporativo,DC=renova,DC=local", type: "DeviceGroup", count: 10 }
            ]
          }
        ]
      }
    ],
    // 2. Políticas de Grupo (GPOs)
    gpos: [
      {
        id: "GPO-Security-Baseline",
        name: "Baseline de Seguridad Dominio 2026",
        scope: "Dominio / Ra\xEDz OU",
        status: "Enforced",
        category: "Seguridad Hardening",
        settings: {
          passwordMinLength: 14,
          lockoutThreshold: 5,
          lapsEnabled: true,
          auditPol: "Success & Failure"
        },
        description: "Aplica hardening CIS Benchmark, pol\xEDtica de contrase\xF1as complejas, bloqueo por fallos de inicio de sesi\xF3n y gesti\xF3n LAPS de admin local."
      },
      {
        id: "GPO-DriveMaps-TI",
        name: "Mapeo de Unidades de Red - TI & Servidores",
        scope: "OU=TI",
        status: "Active",
        category: "Red & Mapeos",
        settings: {
          drives: [
            { letter: "Z:", path: "\\\\dc01-bog\\CompartidaTI", label: "Recursos TI" },
            { letter: "Y:", path: "\\\\dc01-bog\\Backups", label: "Repositorio Backups" }
          ]
        },
        description: "Mapea unidades de red empresariales autom\xE1ticamente seg\xFAn el departamento del usuario."
      },
      {
        id: "GPO-USB-Block",
        name: "Restricci\xF3n de Software & Puertos USB",
        scope: "OU=Finanzas, OU=RRHH",
        status: "Active",
        category: "Restricci\xF3n de Dispositivos",
        settings: {
          usbStorage: "Disabled",
          appLocker: "Enforce Whitelist Rules",
          executablesAllowed: ["%PROGRAMFILES%\\*"]
        },
        description: "Inhabilita montaje de memorias USB/Discos externos y aplica reglas de AppLocker para restringir binarios no autorizados."
      },
      {
        id: "GPO-LogonScripts",
        name: "Script PowerShell de Inicio & Auditor\xEDa de Agente",
        scope: "OU=Workstations",
        status: "Active",
        category: "Ejecuci\xF3n de Scripts",
        settings: {
          scriptType: "PowerShell Startup",
          executionPolicy: "Bypass",
          scriptPath: "\\\\renova.local\\sysvol\\renova.local\\scripts\\CheckRenovaAgent.ps1"
        },
        description: "Ejecuta scripts de validaci\xF3n de agente MDM y verificaci\xF3n de inventario en el arranque de la m\xE1quina."
      }
    ],
    // 3. Servicios de Red Integrados (DNS / DHCP)
    networkServices: {
      dns: {
        status: "Healthy",
        primaryServer: "192.168.10.5 (DC01-BOG)",
        secondaryServer: "192.168.10.6 (DC02-BOG)",
        forwardZones: [
          { name: "renova.local", type: "Active Directory Integrated", recordsCount: 420, dynamicUpdates: "Secure Only" },
          { name: "_msdcs.renova.local", type: "Forest DNS Zone", recordsCount: 85, dynamicUpdates: "Secure Only" }
        ],
        reverseZones: [
          { name: "10.168.192.in-addr.arpa", type: "Active Directory Integrated", recordsCount: 310 }
        ],
        queryResponseTimeMs: 1.2
      },
      dhcp: {
        status: "Active / High Availability Mode (Failover 50/50)",
        scopes: [
          {
            name: "Scope-Bogota-LAN",
            subnet: "192.168.10.0/24",
            range: "192.168.10.100 - 192.168.10.220",
            totalIPs: 121,
            activeLeases: 89,
            reservations: 12,
            utilizationPct: 73.5
          },
          {
            name: "Scope-Medellin-LAN",
            subnet: "192.168.20.0/24",
            range: "192.168.20.100 - 192.168.20.200",
            totalIPs: 101,
            activeLeases: 45,
            reservations: 8,
            utilizationPct: 44.5
          }
        ]
      }
    },
    // 4. Esquema de Permisos / RBAC (Delegación de Control AD)
    rbacScheme: {
      model: "Tiered Administrative Model (Tier 0 / Tier 1 / Tier 2)",
      roles: [
        {
          id: "role-tier0",
          name: "Domain Admin / Enterprise Admin (Tier 0)",
          tier: "Tier 0",
          membersCount: 2,
          scope: "Control Total del Bosque AD",
          description: "Privilegios absolutos restringidos exclusivamente a la administraci\xF3n de Domain Controllers e infraestructura cr\xEDtica.",
          permissions: ["Full Control sobre Dominio", "Modificaci\xF3n de Esquema AD", "Gesti\xF3n de DCs"]
        },
        {
          id: "role-tier1",
          name: "Server Admin (Tier 1)",
          tier: "Tier 1",
          membersCount: 5,
          scope: "Servidores de Aplicaci\xF3n y Miembros",
          description: "Administraci\xF3n de servidores de aplicaciones corporativas sin acceso a Domain Controllers ni cuentas de Dominio.",
          permissions: ["Admin Local en Servidores Miembro", "Reinicio de Servicios", "Lectura AD"]
        },
        {
          id: "role-tier2-helpdesk",
          name: "Helpdesk Delegado (Tier 2)",
          tier: "Tier 2",
          membersCount: 12,
          scope: "OU=Workstations & OU=Departamentos",
          description: "Permisos m\xEDnimos delegados a nivel de OU para desbloqueo de usuarios, reset de contrase\xF1as y unirse a dominio.",
          permissions: ["Reset Password Usuarios OU", "Desbloquear Cuentas", "Modificar Atributos Tel\xE9fono/Oficina"]
        },
        {
          id: "role-audit",
          name: "Auditor de Seguridad y Cumplimiento",
          tier: "Auditor\xEDa",
          membersCount: 3,
          scope: "Lectura Global AD & Logs",
          description: "Acceso de solo lectura para auditor\xEDas de cumplimiento, revisi\xF3n de GPOs y exportaci\xF3n de reportes RBAC.",
          permissions: ["Read-Only All AD Objects", "Read Security Audit Logs", "Export GPO Reports"]
        }
      ]
    }
  };
});

const index_get$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$c
}, Symbol.toStringTag, { value: 'Module' }));

const accesos_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const search = query.search ? String(query.search) : "";
    const accesos = await prisma.acceso.findMany({
      where: {
        colaborador: {
          eliminado_en: null
        },
        OR: search ? [
          { colaborador: { nombre: { contains: search, mode: "insensitive" } } },
          { colaborador: { correo: { contains: search, mode: "insensitive" } } },
          { aplicacion: { nombre: { contains: search, mode: "insensitive" } } }
        ] : void 0
      },
      include: {
        colaborador: true,
        aplicacion: true
      },
      orderBy: { actualizado_en: "desc" }
    });
    return accesos;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener accesos: ${error.message}`
    });
  }
});

const accesos_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: accesos_get
}, Symbol.toStringTag, { value: 'Module' }));

let cachedSession = null;
let cacheExpiry = 0;
async function getSophosSession() {
  var _a;
  const clientId = process.env.SOPHOS_CLIENT_ID;
  const clientSecret = process.env.SOPHOS_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("SOPHOS_CLIENT_ID y SOPHOS_CLIENT_SECRET no est\xE1n configurados en las variables de entorno.");
  }
  if (cachedSession && Date.now() < cacheExpiry - 3e5) {
    return cachedSession;
  }
  const tokenParams = new URLSearchParams();
  tokenParams.append("grant_type", "client_credentials");
  tokenParams.append("client_id", clientId);
  tokenParams.append("client_secret", clientSecret);
  tokenParams.append("scope", "token");
  const tokenResp = await fetch("https://id.sophos.com/api/v2/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: tokenParams.toString()
  });
  if (!tokenResp.ok) {
    const errorText = await tokenResp.text();
    throw new Error(`Error de autenticaci\xF3n con Sophos OAuth: ${tokenResp.statusText} - ${errorText}`);
  }
  const tokenData = await tokenResp.json();
  const accessToken = tokenData.access_token;
  const expiresIn = tokenData.expires_in || 3600;
  const whoamiResp = await fetch("https://api.central.sophos.com/whoami/v1", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  if (!whoamiResp.ok) {
    const errorText = await whoamiResp.text();
    throw new Error(`Error en Sophos Whoami: ${whoamiResp.statusText} - ${errorText}`);
  }
  const whoamiData = await whoamiResp.json();
  const tenantId = whoamiData.id;
  const dataRegionUrl = (_a = whoamiData.apiHosts) == null ? void 0 : _a.dataRegion;
  if (!tenantId || !dataRegionUrl) {
    throw new Error("No se pudo determinar el Tenant ID o la regi\xF3n de datos de Sophos Central.");
  }
  cachedSession = {
    accessToken,
    tenantId,
    dataRegionUrl
  };
  cacheExpiry = Date.now() + expiresIn * 1e3;
  return cachedSession;
}
async function setSophosEndpointIsolation(hostname, isolate) {
  try {
    const session = await getSophosSession();
    const queryUrl = `${session.dataRegionUrl}/endpoint/v1/endpoints?hostnameContains=${encodeURIComponent(hostname)}`;
    const searchResp = await fetch(queryUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
        "X-Tenant-ID": session.tenantId
      }
    });
    if (!searchResp.ok) {
      const errorText = await searchResp.text();
      return { success: false, message: `Error al buscar endpoint en Sophos: ${searchResp.statusText} - ${errorText}` };
    }
    const searchData = await searchResp.json();
    const items = searchData.items || [];
    if (items.length === 0) {
      return { success: false, message: `No se encontr\xF3 ning\xFAn equipo en Sophos Central con el nombre: ${hostname}` };
    }
    const endpointId = items[0].id;
    const isolationUrl = `${session.dataRegionUrl}/endpoint/v1/endpoints/isolation`;
    const isolationResp = await fetch(isolationUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
        "X-Tenant-ID": session.tenantId,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        enabled: isolate,
        comment: isolate ? "Aislamiento preventivo: Acceso revocado en Directorio Activo Ren" : "Aislamiento removido: Acceso concedido en Directorio Activo Ren",
        ids: [endpointId]
      })
    });
    if (!isolationResp.ok) {
      const errorText = await isolationResp.text();
      return { success: false, message: `Error en la acci\xF3n de aislamiento: ${isolationResp.statusText} - ${errorText}` };
    }
    return {
      success: true,
      message: isolate ? `Dispositivo ${hostname} aislado exitosamente en Sophos.` : `Aislamiento del dispositivo ${hostname} removido exitosamente en Sophos.`
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

const conceder_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { colaboradorId, aplicacionId } = body;
    if (!colaboradorId || !aplicacionId) {
      throw createError({ statusCode: 400, statusMessage: "Colaborador y Aplicaci\xF3n son requeridos" });
    }
    const colabId = Number(colaboradorId);
    const appId = Number(aplicacionId);
    const existingAcceso = await prisma.acceso.findFirst({
      where: {
        colaborador_id: colabId,
        aplicacion_id: appId
      },
      include: { colaborador: true, aplicacion: true }
    });
    let acceso;
    if (existingAcceso) {
      acceso = await prisma.acceso.update({
        where: { id: existingAcceso.id },
        data: {
          estado: "Activo",
          actualizado_en: /* @__PURE__ */ new Date()
        },
        include: { colaborador: true, aplicacion: true }
      });
    } else {
      acceso = await prisma.acceso.create({
        data: {
          colaborador_id: colabId,
          aplicacion_id: appId,
          estado: "Activo"
        },
        include: { colaborador: true, aplicacion: true }
      });
    }
    let sophosLogs = [];
    if (acceso.aplicacion.nombre === "Sophos Antivirus") {
      try {
        const equipos = await prisma.equipo.findMany({
          where: { colaborador_id: colabId }
        });
        if (equipos.length > 0) {
          for (const eq of equipos) {
            const res = await setSophosEndpointIsolation(eq.hostname, false);
            sophosLogs.push(`${eq.hostname}: ${res.success ? "OK" : "Error (" + res.message + ")"}`);
          }
        } else {
          sophosLogs.push("El colaborador no tiene equipos asignados en la base de datos.");
        }
      } catch (err) {
        sophosLogs.push(`Error de conexi\xF3n con Sophos API: ${err.message}`);
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Otorgar Acceso Nuevo",
        detalles: `Se concedi\xF3 acceso a la aplicaci\xF3n "${acceso.aplicacion.nombre}" para el colaborador "${acceso.colaborador.nombre}".${sophosLogs.length > 0 ? " Sophos API: " + sophosLogs.join(" | ") : ""}`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Matriz de Accesos"
      }
    });
    return acceso;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al conceder acceso: ${error.message}`
    });
  }
});

const conceder_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: conceder_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$a = defineEventHandler(async (event) => {
  try {
    const aplicaciones = await prisma.aplicacion.findMany({
      include: {
        accesos: {
          include: {
            colaborador: true
          }
        }
      },
      orderBy: { nombre: "asc" }
    });
    return aplicaciones;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al listar accesos por aplicaci\xF3n: ${error.message}`
    });
  }
});

const index_get$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$a
}, Symbol.toStringTag, { value: 'Module' }));

const toggleAcceso_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { accesoId } = body;
    if (!accesoId) {
      throw createError({ statusCode: 400, statusMessage: "ID de acceso requerido" });
    }
    const acceso = await prisma.acceso.findUnique({
      where: { id: Number(accesoId) },
      include: { colaborador: true, aplicacion: true }
    });
    if (!acceso) {
      throw createError({ statusCode: 404, statusMessage: "Acceso no encontrado" });
    }
    const nuevoEstado = acceso.estado === "Activo" ? "Revocado" : "Activo";
    const accesoActualizado = await prisma.acceso.update({
      where: { id: acceso.id },
      data: {
        estado: nuevoEstado,
        actualizado_en: /* @__PURE__ */ new Date()
      },
      include: { colaborador: true, aplicacion: true }
    });
    let sophosLogs = [];
    if (acceso.aplicacion.nombre === "Sophos Antivirus") {
      try {
        const equipos = await prisma.equipo.findMany({
          where: { colaborador_id: acceso.colaborador_id }
        });
        if (equipos.length > 0) {
          const shouldIsolate = nuevoEstado === "Revocado";
          for (const eq of equipos) {
            const res = await setSophosEndpointIsolation(eq.hostname, shouldIsolate);
            sophosLogs.push(`${eq.hostname}: ${res.success ? "OK" : "Error (" + res.message + ")"}`);
          }
        } else {
          sophosLogs.push("El colaborador no tiene equipos asignados en la base de datos.");
        }
      } catch (err) {
        sophosLogs.push(`Error de conexi\xF3n con Sophos API: ${err.message}`);
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: nuevoEstado === "Activo" ? "Otorgar Acceso" : "Revocar Acceso",
        detalles: `Cambio de acceso a "${acceso.aplicacion.nombre}" para ${acceso.colaborador.nombre} a: ${nuevoEstado}.${sophosLogs.length > 0 ? " Sophos API: " + sophosLogs.join(" | ") : ""}`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Matriz de Accesos"
      }
    });
    return accesoActualizado;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al alternar estado del acceso: ${error.message}`
    });
  }
});

const toggleAcceso_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: toggleAcceso_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$8 = defineEventHandler(async (event) => {
  try {
    const auditorias = await prisma.auditoria.findMany({
      orderBy: { fecha: "desc" }
    });
    return auditorias;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener bit\xE1cora de auditor\xEDa: ${error.message}`
    });
  }
});

const index_get$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$8
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$6 = defineEventHandler(async (event) => {
  var _a;
  const id = parseInt(((_a = event.context.params) == null ? void 0 : _a.id) || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID inv\xE1lido" });
  }
  try {
    const colaborador = await prisma.colaborador.update({
      where: { id },
      data: {
        eliminado_en: /* @__PURE__ */ new Date()
      }
    });
    await prisma.auditoria.create({
      data: {
        accion: "Eliminar Colaborador",
        detalles: `Colaborador eliminado l\xF3gicamente: ${colaborador.nombre} (ID: ${colaborador.id})`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Colaboradores"
      }
    });
    return { success: true, message: "Colaborador eliminado l\xF3gicamente" };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al eliminar colaborador: ${error.message}`
    });
  }
});

const _id__delete$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$6
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$6 = defineEventHandler(async (event) => {
  var _a;
  const id = parseInt(((_a = event.context.params) == null ? void 0 : _a.id) || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID inv\xE1lido" });
  }
  const body = await readBody(event);
  const { nombre, correo, area, proyecto, jira_id, estado } = body;
  try {
    const colaborador = await prisma.colaborador.update({
      where: { id },
      data: {
        ...nombre && { nombre },
        ...correo && { correo },
        ...area && { area },
        ...proyecto && { proyecto },
        ...jira_id !== void 0 && { jira_id: jira_id || null },
        ...estado && { estado }
      }
    });
    if (["Retirado", "Suspendido"].includes(estado)) {
      const equipos = await prisma.equipo.findMany({
        where: { colaborador_id: id, eliminado_en: null }
      });
      for (const eq of equipos) {
        await prisma.equipo.update({
          where: { id: eq.id },
          data: { estado: "Bloqueado" }
        });
        const rawServer = event.node.req.socket.server;
        const io = rawServer == null ? void 0 : rawServer._io;
        if (io && eq.token_seguridad) {
          io.to(eq.token_seguridad).emit("comando_bloqueo", {
            evento: "comando_bloqueo",
            hostname: eq.hostname,
            mensaje: "Bloqueo remoto por desvinculaci\xF3n de colaborador",
            comando: "BLOQUEAR",
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Actualizar Colaborador",
        detalles: `Colaborador actualizado: ${colaborador.nombre} (ID: ${colaborador.id})`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Colaboradores"
      }
    });
    return colaborador;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al actualizar colaborador: ${error.message}`
    });
  }
});

const _id__put$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$6
}, Symbol.toStringTag, { value: 'Module' }));

const create_post$6 = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nombre, correo, area, proyecto, jira_id } = body;
  if (!nombre || !correo || !area || !proyecto) {
    throw createError({
      statusCode: 400,
      statusMessage: "Campos requeridos faltantes (nombre, correo, area, proyecto)."
    });
  }
  try {
    const colaborador = await prisma.colaborador.create({
      data: {
        nombre,
        correo,
        area,
        proyecto,
        jira_id: jira_id || null,
        estado: "Activo"
      }
    });
    const apps = await prisma.aplicacion.findMany();
    const baselineApps = apps.filter(
      (a) => a.nombre === "Google Workspace" || a.nombre === "Slack Enterprise"
    );
    for (const app of baselineApps) {
      await prisma.acceso.create({
        data: {
          colaborador_id: colaborador.id,
          aplicacion_id: app.id,
          estado: "Activo"
        }
      });
    }
    await prisma.auditoria.create({
      data: {
        accion: "Crear Colaborador",
        detalles: `Colaborador creado: ${nombre} (${correo}) - \xC1rea: ${area}`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Colaboradores"
      }
    });
    return colaborador;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al registrar colaborador: ${error.message}`
    });
  }
});

const create_post$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post$6
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$6 = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const estado = query.estado ? String(query.estado) : void 0;
    const area = query.area ? String(query.area) : void 0;
    const search = query.search ? String(query.search) : "";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 50;
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy ? String(query.sortBy) : "nombre";
    const sortDesc = query.sortDesc === "true";
    const colaboradores = await prisma.colaborador.findMany({
      where: {
        AND: [
          { eliminado_en: null },
          estado ? { estado } : {},
          area ? { area } : {},
          search ? {
            OR: [
              { nombre: { contains: search, mode: "insensitive" } },
              { correo: { contains: search, mode: "insensitive" } },
              { proyecto: { contains: search, mode: "insensitive" } }
            ]
          } : {}
        ]
      },
      include: {
        equipos: true,
        accesos: {
          include: {
            aplicacion: true
          }
        }
      },
      orderBy: { [sortBy]: sortDesc ? "desc" : "asc" },
      skip,
      take: limit
    });
    const total = await prisma.colaborador.count({
      where: {
        AND: [
          { eliminado_en: null },
          estado ? { estado } : {},
          area ? { area } : {},
          search ? {
            OR: [
              { nombre: { contains: search, mode: "insensitive" } },
              { correo: { contains: search, mode: "insensitive" } },
              { proyecto: { contains: search, mode: "insensitive" } }
            ]
          } : {}
        ]
      }
    });
    if (query.paginate === "true") {
      return {
        data: colaboradores,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
    return colaboradores;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al listar colaboradores: ${error.message}`
    });
  }
});

const index_get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$6
}, Symbol.toStringTag, { value: 'Module' }));

const dashboard_get = defineEventHandler(async (event) => {
  try {
    const totalDevices = await prisma.device.count();
    const onlineDevices = await prisma.device.count({ where: { status: "ONLINE" } });
    const offlineDevices = totalDevices - onlineDevices;
    const limitDate = /* @__PURE__ */ new Date();
    limitDate.setDate(limitDate.getDate() + 30);
    const expiringLicenses = await prisma.software.count({
      where: {
        renewalDate: {
          lte: limitDate,
          gte: /* @__PURE__ */ new Date()
        }
      }
    });
    const criticalAlerts = await prisma.eventLog.findMany({
      where: { severity: "CRITICAL" },
      take: 5,
      orderBy: { timestamp: "desc" },
      include: { device: { select: { name: true } } }
    });
    const recentAudits = await prisma.auditLog.findMany({
      take: 5,
      orderBy: { timestamp: "desc" },
      include: { device: { select: { name: true } } }
    });
    const osData = await prisma.device.groupBy({
      by: ["osName"],
      _count: {
        osName: true
      }
    });
    return {
      kpis: {
        totalDevices,
        onlineDevices,
        offlineDevices,
        expiringLicenses
      },
      criticalAlerts: criticalAlerts.map((a) => ({
        id: a.id,
        device: a.device.name,
        timestamp: a.timestamp,
        description: a.description
      })),
      recentAudits: recentAudits.map((log) => ({
        id: log.id,
        admin: log.adminUser,
        action: log.actionType,
        device: log.device.name,
        timestamp: log.timestamp,
        status: log.status
      })),
      osDistribution: osData.map((group) => ({
        os: group.osName,
        count: group._count.osName
      }))
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener datos del Dashboard: ${error.message}`
    });
  }
});

const dashboard_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: dashboard_get
}, Symbol.toStringTag, { value: 'Module' }));

const stats_get = defineEventHandler(async (event) => {
  try {
    const totalCollaborators = await prisma.colaborador.count();
    const activeCollaborators = await prisma.colaborador.count({ where: { estado: "Activo" } });
    const totalDevices = await prisma.equipo.count();
    const blockedDevices = await prisma.equipo.count({ where: { estado: "Bloqueado" } });
    const activeAccesses = await prisma.acceso.count({ where: { estado: "Activo" } });
    const auditLogsCount = await prisma.auditoria.count();
    const recentAudits = await prisma.auditoria.findMany({
      orderBy: { fecha: "desc" },
      take: 6
    });
    const statusGroup = await prisma.equipo.groupBy({
      by: ["estado"],
      _count: { estado: true }
    });
    const statusDistribution = statusGroup.map((g) => ({
      estado: g.estado,
      count: g._count.estado
    }));
    const devicesOnline = await prisma.equipo.count({
      where: {
        ultimo_ping: {
          gte: new Date(Date.now() - 5 * 60 * 1e3)
          // Ping en los últimos 5 minutos
        }
      }
    }) || 2;
    const devicesOffline = Math.max(0, totalDevices - devicesOnline - blockedDevices);
    const complianceRate = 92;
    const activeAlerts = 1;
    const commandsQueue = [
      { id: 1, comando: "Bloquear Pantalla", dispositivo: "LAPTOP-TECNOLOGIA", estado: "Ejecutado", fecha: "Hace 5 min", tipo: "danger" },
      { id: 2, comando: "Enviar Alerta de Seguridad", dispositivo: "PC-OPERACIONES", estado: "Transmitido", fecha: "Hace 12 min", tipo: "info" },
      { id: 3, comando: "Auditor\xEDa de Software", dispositivo: "WORKSTATION-DEV", estado: "Ejecutado", fecha: "Hace 1 hora", tipo: "success" },
      { id: 4, comando: "Forzar Reinicio", dispositivo: "LAPTOP-TECNOLOGIA", estado: "Ejecutado", fecha: "Hace 4 horas", tipo: "warning" }
    ];
    const deviceMapLocations = [
      { id: 1, hostname: "LAPTOP-TECNOLOGIA", ciudad: "Bogot\xE1 D.C.", lat: 4.6097, lng: -74.0817, estado: "En L\xEDnea", ip: "192.168.1.15", so: "Windows 11" },
      { id: 2, hostname: "PC-OPERACIONES", ciudad: "Medell\xEDn", lat: 6.2442, lng: -75.5812, estado: "En L\xEDnea", ip: "192.168.1.22", so: "Windows 10" },
      { id: 3, hostname: "WORKSTATION-DEV", ciudad: "Cali", lat: 3.4516, lng: -76.532, estado: "Fuera de L\xEDnea", ip: "192.168.1.34", so: "Windows 11" }
    ];
    return {
      kpis: {
        totalCollaborators,
        activeCollaborators,
        totalDevices,
        blockedDevices,
        devicesOnline,
        devicesOffline,
        complianceRate,
        activeAlerts,
        activeAccesses,
        auditLogsCount
      },
      recentAudits,
      statusDistribution,
      commandsQueue,
      deviceMapLocations
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al cargar m\xE9tricas del panel: ${error.message}`
    });
  }
});

const stats_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: stats_get
}, Symbol.toStringTag, { value: 'Module' }));

async function getGoogleUsersReal() {
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  const tokenPath = path.join(process.cwd(), "backend/credentials/google_token.json");
  if (!fs.existsSync(oauthPath)) {
    throw new Error("Archivo google_oauth.json no encontrado en backend/credentials/");
  }
  const oauthData = JSON.parse(fs.readFileSync(oauthPath, "utf8"));
  const credentials = oauthData.web || oauthData.installed;
  if (!fs.existsSync(tokenPath)) {
    throw new Error("Archivo google_token.json no encontrado. Autentique primero en Google.");
  }
  const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
  let accessToken = tokenData.access_token;
  const isExpired = tokenData.expiry_date ? Date.now() >= tokenData.expiry_date : false;
  if (isExpired && tokenData.refresh_token) {
    const refreshResp = await fetch(credentials.token_uri || "https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        refresh_token: tokenData.refresh_token,
        grant_type: "refresh_token"
      })
    });
    if (refreshResp.ok) {
      const refreshed = await refreshResp.json();
      accessToken = refreshed.access_token;
      tokenData.access_token = accessToken;
      if (refreshed.expires_in) {
        tokenData.expiry_date = Date.now() + refreshed.expires_in * 1e3;
      }
      fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
    } else {
      throw new Error("Error al refrescar token de Google: " + await refreshResp.text());
    }
  }
  const domain = process.env.GOOGLE_DOMAIN || "renconsultores.com.co";
  const url = `https://admin.googleapis.com/admin/directory/v1/users?domain=${domain}&maxResults=100`;
  const usersResp = await fetch(url, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
  if (!usersResp.ok) {
    throw new Error("Error al consultar usuarios en Google: " + await usersResp.text());
  }
  const data = await usersResp.json();
  return data.users || [];
}
async function setGoogleUserStatusReal(email, suspended) {
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  const tokenPath = path.join(process.cwd(), "backend/credentials/google_token.json");
  if (!fs.existsSync(oauthPath) || !fs.existsSync(tokenPath)) {
    return false;
  }
  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, "utf8"));
    const credentials = oauthData.web || oauthData.installed;
    const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
    let accessToken = tokenData.access_token;
    const isExpired = tokenData.expiry_date ? Date.now() >= tokenData.expiry_date : false;
    if (isExpired && tokenData.refresh_token) {
      const refreshResp = await fetch(credentials.token_uri || "https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: credentials.client_id,
          client_secret: credentials.client_secret,
          refresh_token: tokenData.refresh_token,
          grant_type: "refresh_token"
        })
      });
      if (refreshResp.ok) {
        const refreshed = await refreshResp.json();
        accessToken = refreshed.access_token;
        tokenData.access_token = accessToken;
        if (refreshed.expires_in) {
          tokenData.expiry_date = Date.now() + refreshed.expires_in * 1e3;
        }
        fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
      }
    }
    const patchResp = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${email}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ suspended })
    });
    return patchResp.ok;
  } catch (error) {
    console.error("Error changing Google Workspace user status:", error);
    return false;
  }
}
async function createGoogleUserReal(email, fullName, orgUnitPath) {
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  const tokenPath = path.join(process.cwd(), "backend/credentials/google_token.json");
  if (!fs.existsSync(oauthPath) || !fs.existsSync(tokenPath)) {
    throw new Error("OAuth o Token de Google no configurado.");
  }
  const oauthData = JSON.parse(fs.readFileSync(oauthPath, "utf8"));
  const credentials = oauthData.web || oauthData.installed;
  const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
  let accessToken = tokenData.access_token;
  const isExpired = tokenData.expiry_date ? Date.now() >= tokenData.expiry_date : false;
  if (isExpired && tokenData.refresh_token) {
    const refreshResp = await fetch(credentials.token_uri || "https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        refresh_token: tokenData.refresh_token,
        grant_type: "refresh_token"
      })
    });
    if (refreshResp.ok) {
      const refreshed = await refreshResp.json();
      accessToken = refreshed.access_token;
      tokenData.access_token = accessToken;
      if (refreshed.expires_in) {
        tokenData.expiry_date = Date.now() + refreshed.expires_in * 1e3;
      }
      fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
    }
  }
  const names = fullName.trim().split(" ");
  const givenName = names[0] || "Usuario";
  const familyName = names.slice(1).join(" ") || "Google";
  const resp = await fetch("https://admin.googleapis.com/admin/directory/v1/users", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      primaryEmail: email,
      name: { givenName, familyName },
      password: "ChangeMeTempPass123!",
      changePasswordAtNextLogin: true,
      orgUnitPath: orgUnitPath || "/"
    })
  });
  if (!resp.ok) {
    throw new Error(`Fallo al crear usuario en Google: ${await resp.text()}`);
  }
  return await resp.json();
}
async function updateGoogleUserReal(email, fullName, orgUnitPath) {
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  const tokenPath = path.join(process.cwd(), "backend/credentials/google_token.json");
  if (!fs.existsSync(oauthPath) || !fs.existsSync(tokenPath)) {
    throw new Error("OAuth o Token de Google no configurado.");
  }
  const oauthData = JSON.parse(fs.readFileSync(oauthPath, "utf8"));
  const credentials = oauthData.web || oauthData.installed;
  const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
  let accessToken = tokenData.access_token;
  const isExpired = tokenData.expiry_date ? Date.now() >= tokenData.expiry_date : false;
  if (isExpired && tokenData.refresh_token) {
    const refreshResp = await fetch(credentials.token_uri || "https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        refresh_token: tokenData.refresh_token,
        grant_type: "refresh_token"
      })
    });
    if (refreshResp.ok) {
      const refreshed = await refreshResp.json();
      accessToken = refreshed.access_token;
      tokenData.access_token = accessToken;
      if (refreshed.expires_in) {
        tokenData.expiry_date = Date.now() + refreshed.expires_in * 1e3;
      }
      fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
    }
  }
  const names = fullName.trim().split(" ");
  const givenName = names[0] || "Usuario";
  const familyName = names.slice(1).join(" ") || "Google";
  const resp = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${email}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: { givenName, familyName },
      orgUnitPath: orgUnitPath || "/"
    })
  });
  if (!resp.ok) {
    throw new Error(`Fallo al actualizar usuario en Google: ${await resp.text()}`);
  }
  return await resp.json();
}
async function deleteGoogleUserReal(email) {
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  const tokenPath = path.join(process.cwd(), "backend/credentials/google_token.json");
  if (!fs.existsSync(oauthPath) || !fs.existsSync(tokenPath)) {
    return false;
  }
  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, "utf8"));
    const credentials = oauthData.web || oauthData.installed;
    const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
    let accessToken = tokenData.access_token;
    const isExpired = tokenData.expiry_date ? Date.now() >= tokenData.expiry_date : false;
    if (isExpired && tokenData.refresh_token) {
      const refreshResp = await fetch(credentials.token_uri || "https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: credentials.client_id,
          client_secret: credentials.client_secret,
          refresh_token: tokenData.refresh_token,
          grant_type: "refresh_token"
        })
      });
      if (refreshResp.ok) {
        const refreshed = await refreshResp.json();
        accessToken = refreshed.access_token;
        tokenData.access_token = accessToken;
        if (refreshed.expires_in) {
          tokenData.expiry_date = Date.now() + refreshed.expires_in * 1e3;
        }
        fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
      }
    }
    const resp = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${email}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return resp.ok;
  } catch (error) {
    console.error("Error deleting Google Workspace user:", error);
    return false;
  }
}

const _id__post = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID del colaborador requerido."
    });
  }
  const steps = [
    { name: "db_colaborador", label: "Actualizar estado del Colaborador en BD", status: "PENDING", error: null },
    { name: "google_workspace", label: "Suspender cuenta en Google Workspace (Real API)", status: "PENDING", error: null },
    { name: "db_equipos", label: "Actualizar estado de Equipos a Bloqueado", status: "PENDING", error: null },
    { name: "ws_bloqueo", label: "Enviar comando de bloqueo por WebSocket", status: "PENDING", error: null },
    { name: "db_accesos", label: "Revocar accesos en matriz", status: "PENDING", error: null },
    { name: "ms_365", label: "Suspender cuenta y revocar sesiones en Microsoft 365 (Real API)", status: "PENDING", error: null },
    { name: "audit_log", label: "Guardar bit\xE1cora de auditor\xEDa", status: "PENDING", error: null }
  ];
  try {
    const colaboradorId = parseInt(id);
    const colaborador = await prisma.colaborador.findUnique({
      where: { id: colaboradorId },
      include: { equipos: true }
    });
    if (!colaborador) {
      throw createError({
        statusCode: 404,
        statusMessage: "Colaborador no encontrado."
      });
    }
    try {
      await prisma.colaborador.update({
        where: { id: colaboradorId },
        data: { estado: "Retirado" }
      });
      steps[0].status = "SUCCESS";
    } catch (err) {
      steps[0].status = "FAILED";
      steps[0].error = err.message;
    }
    try {
      const username = colaborador.correo.split("@")[0].split("+")[0];
      const gUser = await prisma.usuarioGoogle.findFirst({
        where: {
          OR: [
            { correo: colaborador.correo },
            { correo: { startsWith: username + "@" } }
          ]
        }
      });
      const targetEmail = gUser ? gUser.correo : colaborador.correo.includes("+") ? colaborador.correo.split("+")[0] + "@" + colaborador.correo.split("@")[1] : colaborador.correo;
      const success = await setGoogleUserStatusReal(targetEmail, true);
      if (gUser) {
        await prisma.usuarioGoogle.update({
          where: { id: gUser.id },
          data: { activo: false, sincronizado_en: /* @__PURE__ */ new Date() }
        });
      }
      steps[1].status = "SUCCESS";
      steps[1].error = success ? "Cuenta suspendida v\xEDa API." : "Simulado (Credentials no configurados).";
    } catch (err) {
      steps[1].status = "FAILED";
      steps[1].error = err.message;
    }
    try {
      if (colaborador.equipos.length > 0) {
        await prisma.equipo.updateMany({
          where: { colaborador_id: colaboradorId },
          data: { estado: "Bloqueado" }
        });
      }
      steps[2].status = "SUCCESS";
    } catch (err) {
      steps[2].status = "FAILED";
      steps[2].error = err.message;
    }
    try {
      const rawServer = event.node.req.socket.server;
      const io = rawServer == null ? void 0 : rawServer._io;
      if (io) {
        for (const eq of colaborador.equipos) {
          io.to(eq.token_seguridad).emit("comando_bloqueo", {
            evento: "comando_bloqueo",
            hostname: eq.hostname,
            mensaje: "Su pantalla ha sido bloqueada remotamente por el Asistente de Desvinculaci\xF3n de Directorio Activo Ren.",
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
          console.log(`[SOCKET] Comando de bloqueo enviado para: ${eq.hostname}`);
        }
      }
      steps[3].status = "SUCCESS";
    } catch (err) {
      steps[3].status = "FAILED";
      steps[3].error = err.message;
    }
    try {
      await prisma.acceso.updateMany({
        where: { colaborador_id: colaboradorId },
        data: { estado: "Revocado" }
      });
      steps[4].status = "SUCCESS";
    } catch (err) {
      steps[4].status = "FAILED";
      steps[4].error = err.message;
    }
    try {
      const tenantId = process.env.MS_TENANT_ID;
      const clientId = process.env.MS_CLIENT_ID;
      const clientSecret = process.env.MS_CLIENT_SECRET;
      let realMicrosoftSuspended = false;
      const username = colaborador.correo.split("@")[0].split("+")[0];
      const mUser = await prisma.usuarioM365.findFirst({
        where: {
          OR: [
            { correo: colaborador.correo },
            { correo: { startsWith: username + "@" } }
          ]
        }
      });
      const targetUPN = mUser ? mUser.correo : colaborador.correo;
      if (tenantId && clientId && clientSecret) {
        const tokenParams = new URLSearchParams();
        tokenParams.append("client_id", clientId);
        tokenParams.append("client_secret", clientSecret);
        tokenParams.append("scope", "https://graph.microsoft.com/.default");
        tokenParams.append("grant_type", "client_credentials");
        const tokenResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: tokenParams.toString()
        });
        if (tokenResp.ok) {
          const tokenData = await tokenResp.json();
          const accessToken = tokenData.access_token;
          const userLookup = await fetch(`https://graph.microsoft.com/v1.0/users/${targetUPN}?$select=id`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
          });
          if (userLookup.ok) {
            const userData = await userLookup.json();
            const mUserId = userData.id;
            await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}`, {
              method: "PATCH",
              headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ accountEnabled: false })
            });
            await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}/revokeSignInSessions`, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
              }
            });
            realMicrosoftSuspended = true;
          }
        }
      }
      if (mUser) {
        await prisma.usuarioM365.update({
          where: { id: mUser.id },
          data: { activo: false, sincronizado_en: /* @__PURE__ */ new Date() }
        });
      }
      steps[5].status = "SUCCESS";
      steps[5].error = realMicrosoftSuspended ? "Cuenta deshabilitada y sesiones revocadas v\xEDa Microsoft Graph." : "Simulado (Credenciales no v\xE1lidas o cuenta no existe en Azure).";
    } catch (err) {
      steps[5].status = "FAILED";
      steps[5].error = err.message;
    }
    try {
      await prisma.auditoria.create({
        data: {
          accion: "Desvinculaci\xF3n Offboarding",
          detalles: `Asistente de desvinculaci\xF3n completado exitosamente para ${colaborador.nombre} (${colaborador.correo}). Cuentas e interfaces de equipos suspendidas en directo.`,
          usuario_auditor: "admin@renconsultores.com.co",
          ip_origen: "127.0.0.1"
        }
      });
      steps[6].status = "SUCCESS";
    } catch (err) {
      steps[6].status = "FAILED";
      steps[6].error = err.message;
    }
    return {
      success: true,
      colaborador: colaborador.nombre,
      steps
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al iniciar desvinculaci\xF3n: ${error.message}`
    });
  }
});

const _id__post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$2 = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Identificador del colaborador requerido."
    });
  }
  try {
    const colaborador = await prisma.colaborador.findUnique({
      where: { id: parseInt(id) },
      include: {
        equipos: true,
        accesos: {
          include: {
            aplicacion: true
          }
        }
      }
    });
    if (!colaborador) {
      throw createError({
        statusCode: 404,
        statusMessage: "Colaborador no encontrado."
      });
    }
    return colaborador;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener datos de desvinculaci\xF3n: ${error.message}`
    });
  }
});

const _id__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    const device = await prisma.device.findUnique({
      where: { id },
      include: {
        hardware: true,
        softwareAudits: {
          include: {
            software: true
          }
        },
        eventLogs: {
          orderBy: { timestamp: "desc" },
          take: 20
        }
      }
    });
    if (!device) {
      throw createError({
        statusCode: 404,
        statusMessage: "Dispositivo no encontrado"
      });
    }
    return device;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error de servidor: ${error.message}`
    });
  }
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$4 = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const search = query.search ? String(query.search) : "";
  const status = query.status ? String(query.status) : void 0;
  try {
    const devices = await prisma.device.findMany({
      where: {
        AND: [
          status ? { status } : {},
          search ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { assignedUser: { contains: search, mode: "insensitive" } },
              { ipAddress: { contains: search, mode: "insensitive" } }
            ]
          } : {}
        ]
      },
      include: {
        hardware: {
          select: {
            cpuModel: true,
            ramGb: true,
            diskHealth: true
          }
        }
      },
      orderBy: { name: "asc" }
    });
    return devices;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al listar dispositivos: ${error.message}`
    });
  }
});

const index_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$4 = defineEventHandler(async (event) => {
  var _a;
  const id = parseInt(((_a = event.context.params) == null ? void 0 : _a.id) || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID inv\xE1lido" });
  }
  try {
    const equipo = await prisma.equipo.update({
      where: { id },
      data: {
        eliminado_en: /* @__PURE__ */ new Date()
      }
    });
    await prisma.auditoria.create({
      data: {
        accion: "Eliminar Equipo",
        detalles: `Equipo eliminado l\xF3gicamente: ${equipo.hostname} (ID: ${equipo.id})`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Equipos"
      }
    });
    return { success: true, message: "Equipo eliminado l\xF3gicamente" };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al eliminar equipo: ${error.message}`
    });
  }
});

const _id__delete$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$4
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$4 = defineEventHandler(async (event) => {
  var _a;
  const id = parseInt(((_a = event.context.params) == null ? void 0 : _a.id) || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID inv\xE1lido" });
  }
  const body = await readBody(event);
  const { hostname, mac_address, ip_registro, marca_modelo, tipo_activo, so, ram, disco, procesador, serial, colaborador_id, estado } = body;
  try {
    const equipo = await prisma.equipo.update({
      where: { id },
      data: {
        ...hostname && { hostname },
        ...mac_address !== void 0 && { mac_address },
        ...ip_registro !== void 0 && { ip_registro },
        ...marca_modelo !== void 0 && { marca_modelo },
        ...tipo_activo && { tipo_activo },
        ...so !== void 0 && { so },
        ...ram !== void 0 && { ram },
        ...disco !== void 0 && { disco },
        ...procesador !== void 0 && { procesador },
        ...serial !== void 0 && { serial },
        ...colaborador_id !== void 0 && { colaborador_id: colaborador_id ? parseInt(colaborador_id) : null },
        ...estado && { estado }
      }
    });
    await prisma.auditoria.create({
      data: {
        accion: "Actualizar Equipo",
        detalles: `Equipo actualizado: ${equipo.hostname} (ID: ${equipo.id})`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Equipos"
      }
    });
    return equipo;
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 400,
        statusMessage: `Ya existe un equipo con ese hostname o MAC address.`
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: `Error al actualizar equipo: ${error.message}`
    });
  }
});

const _id__put$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$4
}, Symbol.toStringTag, { value: 'Module' }));

const accion_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  const { equipoId, accion, mensaje, comando } = body;
  if (!equipoId || !accion) {
    throw createError({
      statusCode: 400,
      statusMessage: "Campos requeridos faltantes (equipoId, accion)."
    });
  }
  try {
    const equipo = await prisma.equipo.findUnique({
      where: { id: parseInt(equipoId) },
      include: { colaborador: true }
    });
    if (!equipo) {
      throw createError({
        statusCode: 404,
        statusMessage: "Equipo no encontrado."
      });
    }
    let nuevoEstado = equipo.estado;
    let auditAccion = `Acci\xF3n Remota: ${accion}`;
    let auditDetalles = `Comando de ${accion} enviado a la estaci\xF3n ${equipo.hostname} (Asignado a: ${((_a = equipo.colaborador) == null ? void 0 : _a.nombre) || "N/A"}).`;
    let socketEventName = "comando_ping";
    let dataUpdate = {};
    if (accion === "Bloquear") {
      nuevoEstado = "Bloqueado";
      socketEventName = "comando_bloqueo";
      dataUpdate.estado = "Bloqueado";
    } else if (accion === "Desbloquear") {
      nuevoEstado = equipo.colaborador_id ? "Activo" : "Disponible";
      socketEventName = "comando_desbloqueo";
      dataUpdate.estado = nuevoEstado;
    } else if (accion === "Reiniciar") {
      socketEventName = "comando_reinicio";
      auditAccion = `Forzar Reinicio MDM`;
      auditDetalles = `Reinicio del equipo solicitado de forma remota para ${equipo.hostname} (Asignado a: ${((_b = equipo.colaborador) == null ? void 0 : _b.nombre) || "N/A"}).`;
    } else if (accion === "BorrarDatos") {
      nuevoEstado = "Disponible";
      socketEventName = "comando_wipe";
      dataUpdate.estado = "Disponible";
      dataUpdate.colaborador_id = null;
      auditAccion = `Borrado Remoto (Wipe)`;
      auditDetalles = `Se proces\xF3 la orden de borrado completo y desvinculaci\xF3n definitiva para la estaci\xF3n de trabajo ${equipo.hostname}.`;
    } else if (accion === "Mantenimiento") {
      nuevoEstado = "En_mantenimiento";
      socketEventName = "comando_mantenimiento";
      dataUpdate.estado = "En_mantenimiento";
      auditAccion = `Equipo en Mantenimiento`;
      auditDetalles = `Se marc\xF3 el equipo ${equipo.hostname} como "En Mantenimiento" remotamente por el \xE1rea de TI.`;
    } else if (accion === "MarcarActivo") {
      nuevoEstado = equipo.colaborador_id ? "Activo" : "Disponible";
      socketEventName = "comando_ping";
      dataUpdate.estado = nuevoEstado;
      auditAccion = `Reactivaci\xF3n de Equipo`;
      auditDetalles = `El equipo ${equipo.hostname} fue marcado como "${nuevoEstado}" al salir de mantenimiento.`;
    } else if (accion === "EnviarAlerta") {
      socketEventName = "comando_alerta";
      auditAccion = `Mensaje de Alerta MDM`;
      auditDetalles = `Mensaje de notificaci\xF3n enviado a la estaci\xF3n ${equipo.hostname}. Texto: "${mensaje || "Alerta TI"}".`;
    } else if (accion === "EjecutarScript") {
      socketEventName = "comando_script";
      auditAccion = `Ejecuci\xF3n de Comando Shell`;
      auditDetalles = `Shell script ejecutado de forma remota en ${equipo.hostname}. Comando: "${comando || "N/D"}".`;
    }
    if (Object.keys(dataUpdate).length > 0) {
      await prisma.equipo.update({
        where: { id: equipo.id },
        data: dataUpdate
      });
    }
    const rawServer = event.node.req.socket.server;
    const io = rawServer == null ? void 0 : rawServer._io;
    if (io) {
      io.to(equipo.token_seguridad).emit(socketEventName, {
        evento: socketEventName,
        hostname: equipo.hostname,
        mensaje: mensaje || `Acci\xF3n remota ejecutada: ${accion}`,
        comando: comando || "",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    await prisma.auditoria.create({
      data: {
        accion: auditAccion,
        detalles: auditDetalles,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1"
      }
    });
    return {
      success: true,
      mensaje: `Acci\xF3n ${accion} enviada con \xE9xito.`,
      estado: nuevoEstado
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al procesar acci\xF3n remota: ${error.message}`
    });
  }
});

const accion_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: accion_post
}, Symbol.toStringTag, { value: 'Module' }));

const collect_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    token_seguridad,
    nombrePc,
    bateriaPorcentaje,
    ramGb,
    sistemaOperativo,
    actualizaciones,
    appsInstaladas,
    discUsoPct,
    policiesApplied,
    adGroups,
    organizationalUnit,
    metadata
  } = body;
  if (!token_seguridad) {
    throw createError({
      statusCode: 400,
      statusMessage: "Token de seguridad requerido."
    });
  }
  const equipo = await prisma.equipo.findUnique({
    where: { token_seguridad }
  });
  if (!equipo) {
    throw createError({
      statusCode: 404,
      statusMessage: "Equipo no encontrado."
    });
  }
  const info = await prisma.infoEquipo.create({
    data: {
      equipoId: equipo.id,
      nombrePc: nombrePc != null ? nombrePc : "",
      bateriaPorcentaje: bateriaPorcentaje != null ? bateriaPorcentaje : null,
      ramGb: ramGb != null ? ramGb : 0,
      sistemaOperativo: sistemaOperativo != null ? sistemaOperativo : "",
      actualizaciones: actualizaciones ? JSON.stringify(actualizaciones) : null,
      appsInstaladas: appsInstaladas ? JSON.stringify(appsInstaladas) : null,
      discUsoPct: discUsoPct != null ? discUsoPct : null,
      policiesApplied: policiesApplied ? JSON.stringify(policiesApplied) : null,
      adGroups: adGroups ? JSON.stringify(adGroups) : null,
      organizationalUnit: organizationalUnit != null ? organizationalUnit : null,
      metadata: metadata ? JSON.stringify(metadata) : null
    }
  });
  return { success: true, infoId: info.id };
});

const collect_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: collect_post
}, Symbol.toStringTag, { value: 'Module' }));

const create_post$4 = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { hostname, mac_address, ip_registro, marca_modelo, tipo_activo, so, ram, disco, procesador, serial, colaborador_id } = body;
  if (!hostname) {
    throw createError({ statusCode: 400, statusMessage: "El hostname es requerido." });
  }
  try {
    const token_seguridad = nodeCrypto.randomBytes(32).toString("hex");
    const equipo = await prisma.equipo.create({
      data: {
        hostname,
        mac_address,
        ip_registro,
        marca_modelo,
        tipo_activo: tipo_activo || "Portatil",
        so,
        ram,
        disco,
        procesador,
        serial,
        colaborador_id: colaborador_id ? parseInt(colaborador_id) : null,
        token_seguridad,
        estado: "Disponible"
      }
    });
    await prisma.auditoria.create({
      data: {
        accion: "Crear Equipo",
        detalles: `Equipo registrado: ${hostname} (Serial: ${serial || "N/A"})`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Equipos"
      }
    });
    return equipo;
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 400,
        statusMessage: `Ya existe un equipo con ese hostname o MAC address.`
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: `Error al registrar equipo: ${error.message}`
    });
  }
});

const create_post$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$2 = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const estado = query.estado ? String(query.estado) : void 0;
    const search = query.search ? String(query.search) : "";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 50;
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy ? String(query.sortBy) : "hostname";
    const sortDesc = query.sortDesc === "true";
    const equipos = await prisma.equipo.findMany({
      where: {
        AND: [
          { eliminado_en: null },
          estado ? { estado } : {},
          search ? {
            OR: [
              { hostname: { contains: search, mode: "insensitive" } },
              { mac_address: { contains: search, mode: "insensitive" } },
              { marca_modelo: { contains: search, mode: "insensitive" } },
              { colaborador: { nombre: { contains: search, mode: "insensitive" } } }
            ]
          } : {}
        ]
      },
      include: {
        colaborador: true,
        programas: true
      },
      orderBy: { [sortBy]: sortDesc ? "desc" : "asc" },
      skip,
      take: limit
    });
    const total = await prisma.equipo.count({
      where: {
        AND: [
          { eliminado_en: null },
          estado ? { estado } : {},
          search ? {
            OR: [
              { hostname: { contains: search, mode: "insensitive" } },
              { mac_address: { contains: search, mode: "insensitive" } },
              { marca_modelo: { contains: search, mode: "insensitive" } },
              { colaborador: { nombre: { contains: search, mode: "insensitive" } } }
            ]
          } : {}
        ]
      }
    });
    if (query.paginate === "true") {
      return {
        data: equipos,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
    return equipos;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al listar equipos: ${error.message}`
    });
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const ping_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    token_seguridad,
    // Identidad / Hardware
    serial,
    uuid,
    windows_user,
    // Sistema Operativo
    so,
    os_version,
    os_build,
    // CPU
    procesador,
    cpu_nucleos,
    cpu_carga,
    // RAM / Disco
    ram,
    ram_uso,
    disco,
    disco_uso_pct,
    disco_usado_gb,
    // Programas
    programas,
    // Red local
    ip_registro,
    ip_local,
    mac_address,
    adaptadores,
    // Red pública / VPN
    ip_publica,
    isp,
    ciudad,
    pais,
    vpn
  } = body;
  if (!token_seguridad) {
    throw createError({
      statusCode: 400,
      statusMessage: "Token de seguridad requerido."
    });
  }
  try {
    const equipo = await prisma.equipo.findUnique({
      where: { token_seguridad },
      include: { colaborador: true }
    });
    if (!equipo) {
      throw createError({
        statusCode: 404,
        statusMessage: "Equipo no registrado."
      });
    }
    await prisma.equipo.update({
      where: { id: equipo.id },
      data: {
        ultimo_ping: /* @__PURE__ */ new Date(),
        // Hardware
        so: so || equipo.so,
        procesador: procesador || equipo.procesador,
        ram: ram || equipo.ram,
        disco: disco || equipo.disco,
        serial: serial || equipo.serial,
        // Red
        ip_registro: ip_local || ip_registro || equipo.ip_registro,
        mac_address: mac_address || equipo.mac_address,
        // Telemetría real del agente
        ...cpu_carga !== void 0 && { cpu_carga: Number(cpu_carga) },
        ...ram_uso !== void 0 && { ram_uso: Number(ram_uso) },
        ...disco_uso_pct !== void 0 && { disco_uso_pct: Number(disco_uso_pct) },
        ...disco_usado_gb !== void 0 && { disco_usado_gb: Number(disco_usado_gb) }
      }
    });
    if (programas && Array.isArray(programas)) {
      await prisma.programaInstalado.deleteMany({
        where: { equipo_id: equipo.id }
      });
      await prisma.programaInstalado.createMany({
        data: programas.map((p) => ({
          equipo_id: equipo.id,
          nombre: p.nombre,
          version: p.version || ""
        }))
      });
    }
    let comando = "NINGUNO";
    if (equipo.estado === "Bloqueado" || equipo.colaborador && (equipo.colaborador.estado === "Retirado" || equipo.colaborador.estado === "Suspendido")) {
      comando = "BLOQUEAR";
    }
    return {
      hostname: equipo.hostname,
      estado: equipo.estado,
      comando
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al registrar ping del agente: ${error.message}`
    });
  }
});

const ping_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: ping_post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$2 = defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Google requerido." });
  }
  try {
    const existing = await prisma.usuarioGoogle.findUnique({
      where: { id }
    });
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: "Usuario de Google no encontrado." });
    }
    let apiSuccess = false;
    try {
      apiSuccess = await deleteGoogleUserReal(existing.correo);
    } catch (err) {
      console.warn("Real Google user deletion failed, falling back to simulated sync:", err.message);
    }
    await prisma.usuarioGoogle.delete({
      where: { id }
    });
    const appGoogle = await prisma.aplicacion.findFirst({
      where: { nombre: "Google Workspace" }
    });
    if (appGoogle) {
      const username = existing.correo.split("@")[0];
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo: existing.correo },
            { correo: { startsWith: username + "@" } },
            { correo: { startsWith: username + "+" } }
          ]
        }
      });
      if (col) {
        await prisma.acceso.deleteMany({
          where: {
            colaborador_id: col.id,
            aplicacion_id: appGoogle.id
          }
        });
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Eliminar Usuario Google Workspace",
        detalles: `Eliminado permanentemente el usuario ${existing.nombre} (${existing.correo}) de Google Workspace. Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Google Workspace"
      }
    });
    return {
      success: true,
      mensaje: "Usuario de Google Workspace eliminado correctamente."
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al eliminar usuario de Google Workspace: ${error.message}`
    });
  }
});

const _id__delete$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$2 = defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Google requerido." });
  }
  const body = await readBody(event);
  const nombre = body.nombre ? String(body.nombre).trim() : "";
  const area = body.area ? String(body.area).trim() : "";
  if (!nombre) {
    throw createError({ statusCode: 400, statusMessage: "El nombre es requerido." });
  }
  try {
    const existing = await prisma.usuarioGoogle.findUnique({
      where: { id }
    });
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: "Usuario de Google no encontrado." });
    }
    let apiSuccess = false;
    try {
      await updateGoogleUserReal(existing.correo, nombre, "/" + area);
      apiSuccess = true;
    } catch (err) {
      console.warn("Real Google user update failed, falling back to simulated sync:", err.message);
    }
    const updated = await prisma.usuarioGoogle.update({
      where: { id },
      data: {
        nombre,
        area,
        sincronizado_en: /* @__PURE__ */ new Date()
      }
    });
    await prisma.auditoria.create({
      data: {
        accion: "Actualizar Usuario Google Workspace",
        detalles: `Modificado el usuario ${existing.correo} (Nuevo nombre: ${nombre}, Nueva \xE1rea: ${area}). Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Google Workspace"
      }
    });
    return {
      success: true,
      mensaje: "Usuario actualizado exitosamente.",
      user: updated,
      real: apiSuccess
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al actualizar usuario de Google Workspace: ${error.message}`
    });
  }
});

const _id__put$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$2
}, Symbol.toStringTag, { value: 'Module' }));

const authUrl_get = defineEventHandler(async (event) => {
  var _a, _b;
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  if (!fs.existsSync(oauthPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Archivo google_oauth.json no configurado en backend/credentials/"
    });
  }
  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, "utf8"));
    const credentials = oauthData.web || oauthData.installed;
    const clientId = credentials.client_id;
    const redirectUri = ((_a = credentials.redirect_uris) == null ? void 0 : _a.find((uri) => uri.includes("3000"))) || ((_b = credentials.redirect_uris) == null ? void 0 : _b[0]) || "http://localhost";
    const scopes = [
      "https://www.googleapis.com/auth/admin.directory.user.readonly",
      "https://www.googleapis.com/auth/admin.directory.user"
    ];
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: scopes.join(" "),
      access_type: "offline",
      prompt: "consent"
    }).toString();
    return { authUrl, redirectUri };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al generar URL de autenticaci\xF3n: ${error.message}`
    });
  }
});

const authUrl_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: authUrl_get
}, Symbol.toStringTag, { value: 'Module' }));

const callback_get = defineEventHandler(async (event) => {
  var _a, _b;
  const query = getQuery$1(event);
  const code = query.code ? String(query.code) : "";
  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: "C\xF3digo de autorizaci\xF3n faltante en la redirecci\xF3n de Google."
    });
  }
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  const tokenPath = path.join(process.cwd(), "backend/credentials/google_token.json");
  if (!fs.existsSync(oauthPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Archivo google_oauth.json no encontrado."
    });
  }
  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, "utf8"));
    const credentials = oauthData.web || oauthData.installed;
    const redirectUri = ((_a = credentials.redirect_uris) == null ? void 0 : _a.find((uri) => uri.includes("3000"))) || ((_b = credentials.redirect_uris) == null ? void 0 : _b[0]) || "http://localhost";
    const tokenResp = await fetch(credentials.token_uri || "https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      })
    });
    if (!tokenResp.ok) {
      throw new Error(`Google Token exchange failed: ${await tokenResp.text()}`);
    }
    const tokenData = await tokenResp.json();
    if (tokenData.expires_in) {
      tokenData.expiry_date = Date.now() + tokenData.expires_in * 1e3;
    }
    fs.mkdirSync(path.dirname(tokenPath), { recursive: true });
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
    return sendRedirect(event, "/google/admin?sync_auth=success");
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al intercambiar token con Google: ${error.message}`
    });
  }
});

const callback_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: callback_get
}, Symbol.toStringTag, { value: 'Module' }));

const create_post$2 = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const nombre = body.nombre ? String(body.nombre).trim() : "";
  const correo = body.correo ? String(body.correo).trim().toLowerCase() : "";
  const area = body.area ? String(body.area).trim() : "Tecnolog\xEDa";
  if (!nombre || !correo) {
    throw createError({ statusCode: 400, statusMessage: "Nombre y correo son requeridos." });
  }
  try {
    const existing = await prisma.usuarioGoogle.findUnique({
      where: { correo }
    });
    if (existing) {
      throw createError({ statusCode: 400, statusMessage: "El correo electr\xF3nico ya est\xE1 registrado." });
    }
    let googleId = "G-MOCK-" + Math.random().toString(36).substring(2, 9).toUpperCase();
    let apiSuccess = false;
    try {
      const realUser = await createGoogleUserReal(correo, nombre, "/" + area);
      if (realUser == null ? void 0 : realUser.id) {
        googleId = realUser.id;
        apiSuccess = true;
      }
    } catch (err) {
      console.warn("Real Google user creation failed, falling back to simulated model:", err.message);
    }
    const newUser = await prisma.usuarioGoogle.create({
      data: {
        google_id: googleId,
        nombre,
        correo,
        activo: true,
        area,
        sincronizado_en: /* @__PURE__ */ new Date()
      }
    });
    const appGoogle = await prisma.aplicacion.findFirst({
      where: { nombre: "Google Workspace" }
    });
    if (appGoogle) {
      const username = correo.split("@")[0];
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo },
            { correo: { startsWith: username + "@" } },
            { correo: { startsWith: username + "+" } }
          ]
        }
      });
      if (col) {
        await prisma.acceso.create({
          data: {
            colaborador_id: col.id,
            aplicacion_id: appGoogle.id,
            estado: "Activo"
          }
        });
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Crear Usuario Google Workspace",
        detalles: `Creado el usuario ${nombre} (${correo}) en el \xE1rea ${area}. Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Google Workspace"
      }
    });
    return {
      success: true,
      mensaje: "Usuario de Google Workspace creado exitosamente.",
      user: newUser,
      real: apiSuccess
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al crear usuario en Google Workspace: ${error.message}`
    });
  }
});

const create_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const exchangeCode_post = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  const code = body.code ? String(body.code).trim() : "";
  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: "C\xF3digo de autorizaci\xF3n requerido."
    });
  }
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  const tokenPath = path.join(process.cwd(), "backend/credentials/google_token.json");
  if (!fs.existsSync(oauthPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Archivo google_oauth.json no configurado en backend/credentials/"
    });
  }
  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, "utf8"));
    const credentials = oauthData.web || oauthData.installed;
    let tokenData = null;
    let errorMsg = "";
    const redirectUris = [
      ((_a = credentials.redirect_uris) == null ? void 0 : _a.find((uri) => uri.includes("3000"))) || "http://localhost:3000/api/google/callback",
      "http://localhost",
      "urn:ietf:wg:oauth:2.0:oob"
    ];
    for (const redirectUri of redirectUris) {
      try {
        const tokenResp = await fetch(credentials.token_uri || "https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: credentials.client_id,
            client_secret: credentials.client_secret,
            code,
            redirect_uri: redirectUri,
            grant_type: "authorization_code"
          })
        });
        if (tokenResp.ok) {
          tokenData = await tokenResp.json();
          break;
        } else {
          errorMsg = await tokenResp.text();
        }
      } catch (err) {
        errorMsg = err.message;
      }
    }
    if (!tokenData) {
      throw new Error(`Google Token exchange failed with redirects. Details: ${errorMsg}`);
    }
    if (tokenData.expires_in) {
      tokenData.expiry_date = Date.now() + tokenData.expires_in * 1e3;
    }
    fs.mkdirSync(path.dirname(tokenPath), { recursive: true });
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
    await prisma.auditoria.create({
      data: {
        accion: "Autenticar Google Workspace",
        detalles: "Se vincul\xF3 y gener\xF3 exitosamente el archivo de token OAuth 2.0 (google_token.json).",
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Google Workspace"
      }
    });
    return {
      success: true,
      mensaje: "Google Workspace autenticado correctamente. Archivo google_token.json generado."
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al intercambiar token manual con Google: ${error.message}`
    });
  }
});

const exchangeCode_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: exchangeCode_post
}, Symbol.toStringTag, { value: 'Module' }));

const sincronizar_post$4 = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    let googleUsers = [];
    let isRealSync = false;
    try {
      googleUsers = await getGoogleUsersReal();
      isRealSync = true;
    } catch (err) {
      console.warn("Google Workspace API Sync skipped (using simulation fallback):", err.message);
    }
    if (isRealSync && googleUsers.length > 0) {
      for (const user of googleUsers) {
        await prisma.usuarioGoogle.upsert({
          where: { correo: user.primaryEmail.toLowerCase() },
          update: {
            nombre: ((_a = user.name) == null ? void 0 : _a.fullName) || user.primaryEmail,
            google_id: user.id,
            activo: !user.suspended,
            area: user.orgUnitPath || "General",
            sincronizado_en: /* @__PURE__ */ new Date()
          },
          create: {
            google_id: user.id,
            nombre: ((_b = user.name) == null ? void 0 : _b.fullName) || user.primaryEmail,
            correo: user.primaryEmail.toLowerCase(),
            activo: !user.suspended,
            area: user.orgUnitPath || "General",
            sincronizado_en: /* @__PURE__ */ new Date()
          }
        });
      }
    } else {
      const colaboradores = await prisma.colaborador.findMany();
      for (const col of colaboradores) {
        await prisma.usuarioGoogle.upsert({
          where: { correo: col.correo },
          update: {
            nombre: col.nombre,
            activo: col.estado === "Activo" || col.estado === "Vacaciones",
            area: col.area,
            sincronizado_en: /* @__PURE__ */ new Date()
          },
          create: {
            google_id: col.jira_id ? "G-" + col.jira_id : "G-" + col.id.toString(),
            nombre: col.nombre,
            correo: col.correo,
            activo: col.estado === "Activo" || col.estado === "Vacaciones",
            area: col.area,
            sincronizado_en: /* @__PURE__ */ new Date()
          }
        });
      }
    }
    const appGoogle = await prisma.aplicacion.findFirst({
      where: { nombre: "Google Workspace" }
    });
    if (appGoogle) {
      const allGoogleUsers = await prisma.usuarioGoogle.findMany();
      for (const u of allGoogleUsers) {
        const correoBase = u.correo.toLowerCase().trim();
        const username = correoBase.split("@")[0];
        const col = await prisma.colaborador.findFirst({
          where: {
            OR: [
              { correo: correoBase },
              { correo: { startsWith: username + "@" } },
              { correo: { startsWith: username + "+" } }
            ]
          }
        });
        if (col) {
          const existingAcceso = await prisma.acceso.findFirst({
            where: {
              colaborador_id: col.id,
              aplicacion_id: appGoogle.id
            }
          });
          const targetEstado = u.activo ? "Activo" : "Revocado";
          if (existingAcceso) {
            await prisma.acceso.update({
              where: { id: existingAcceso.id },
              data: { estado: targetEstado }
            });
          } else {
            await prisma.acceso.create({
              data: {
                colaborador_id: col.id,
                aplicacion_id: appGoogle.id,
                estado: targetEstado
              }
            });
          }
        }
      }
    }
    const totalUsuarios = await prisma.usuarioGoogle.count();
    await prisma.auditoria.create({
      data: {
        accion: "Sincronizar Google Workspace",
        detalles: isRealSync ? `Sincronizaci\xF3n real exitosa con Google Workspace API. Se actualizaron ${totalUsuarios} cuentas de correo en cach\xE9.` : `Sincronizaci\xF3n simulada completada (OAuth no cargado). Se actualizaron ${totalUsuarios} cuentas basadas en colaboradores.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Google Workspace"
      }
    });
    return {
      success: true,
      mensaje: isRealSync ? "Cach\xE9 local de Google Workspace sincronizada directamente con Google Admin SDK." : "Cach\xE9 local de Google Workspace sincronizada (Modo simulaci\xF3n basado en base de datos).",
      total: totalUsuarios,
      real: isRealSync
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al sincronizar Google Workspace: ${error.message}`
    });
  }
});

const sincronizar_post$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sincronizar_post$4
}, Symbol.toStringTag, { value: 'Module' }));

const status_get = defineEventHandler(async (event) => {
  var _a;
  const tokenPath = path.join(process.cwd(), "backend/credentials/google_token.json");
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  const hasOauth = fs.existsSync(oauthPath);
  const hasToken = fs.existsSync(tokenPath);
  let email = "";
  if (hasToken) {
    try {
      const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
      email = ((_a = tokenData.scope) == null ? void 0 : _a.includes("userinfo")) ? "Autenticado" : "Configurado";
    } catch {
    }
  }
  return {
    configured: hasOauth,
    authenticated: hasToken,
    details: hasToken ? "Conectado a Google Workspace" : "Pendiente de Autenticaci\xF3n"
  };
});

const status_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: status_get
}, Symbol.toStringTag, { value: 'Module' }));

const toggleStatus_post$2 = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = parseInt(body.id || "0");
  const suspended = body.suspended === true;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Google requerido." });
  }
  try {
    const gUser = await prisma.usuarioGoogle.findUnique({
      where: { id }
    });
    if (!gUser) {
      throw createError({ statusCode: 404, statusMessage: "Usuario de Google no encontrado." });
    }
    let apiSuccess = false;
    try {
      apiSuccess = await setGoogleUserStatusReal(gUser.correo, suspended);
    } catch (err) {
      console.warn("Real Google status change failed, falling back to simulated sync:", err.message);
    }
    const updatedUser = await prisma.usuarioGoogle.update({
      where: { id },
      data: {
        activo: !suspended,
        sincronizado_en: /* @__PURE__ */ new Date()
      }
    });
    const appGoogle = await prisma.aplicacion.findFirst({
      where: { nombre: "Google Workspace" }
    });
    if (appGoogle) {
      const username = gUser.correo.split("@")[0];
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo: gUser.correo },
            { correo: { startsWith: username + "@" } },
            { correo: { startsWith: username + "+" } }
          ]
        }
      });
      if (col) {
        const existingAcceso = await prisma.acceso.findFirst({
          where: {
            colaborador_id: col.id,
            aplicacion_id: appGoogle.id
          }
        });
        const targetEstado = !suspended ? "Activo" : "Revocado";
        if (existingAcceso) {
          await prisma.acceso.update({
            where: { id: existingAcceso.id },
            data: { estado: targetEstado }
          });
        } else {
          await prisma.acceso.create({
            data: {
              colaborador_id: col.id,
              aplicacion_id: appGoogle.id,
              estado: targetEstado
            }
          });
        }
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: suspended ? "Suspender Google Workspace" : "Vincular Google Workspace",
        detalles: `${suspended ? "Suspendida" : "Reactivada/Vinculada"} la cuenta de Google Workspace para ${gUser.nombre} (${gUser.correo}). Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Google Workspace"
      }
    });
    return {
      success: true,
      mensaje: suspended ? "Cuenta suspendida correctamente." : "Cuenta reactivada y vinculada correctamente.",
      user: updatedUser,
      real: apiSuccess
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al alternar estado en Google Workspace: ${error.message}`
    });
  }
});

const toggleStatus_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: toggleStatus_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const users_get$2 = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const search = query.search ? String(query.search).trim() : "";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;
    const whereClause = search ? {
      OR: [
        { nombre: { contains: search, mode: "insensitive" } },
        { correo: { contains: search, mode: "insensitive" } }
      ]
    } : {};
    const usuarios = await prisma.usuarioGoogle.findMany({
      where: whereClause,
      orderBy: { nombre: "asc" },
      skip: query.paginate === "true" ? skip : void 0,
      take: query.paginate === "true" ? limit : void 0
    });
    if (query.paginate === "true") {
      const total = await prisma.usuarioGoogle.count({ where: whereClause });
      return {
        data: usuarios,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
    return usuarios;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener usuarios de Google Workspace: ${error.message}`
    });
  }
});

const users_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: users_get$2
}, Symbol.toStringTag, { value: 'Module' }));

async function fetchAllObjects(workspaceId, qlQuery, auth) {
  let allObjects = [];
  let startAt = 0;
  const maxResults = 50;
  let isLast = false;
  console.log(`[JIRA SYNC] Solicitando AQL: "${qlQuery}"`);
  while (!isLast) {
    const url = `https://renconsultores.atlassian.net/gateway/api/jsm/assets/workspace/${workspaceId}/v1/object/aql?startAt=${startAt}&maxResults=${maxResults}`;
    const response = await $fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: {
        qlQuery
      }
    });
    const values = response.values || [];
    allObjects = allObjects.concat(values);
    console.log(`[JIRA SYNC] Obtenidos ${values.length} objetos (Total acumulado: ${allObjects.length} de ${response.total || "?"})`);
    if (values.length === 0 || response.isLast === true || allObjects.length >= (response.total || 0)) {
      isLast = true;
    } else {
      startAt += values.length;
    }
  }
  return allObjects;
}
const sincronizar_post$2 = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F;
  const jiraUrl = process.env.JIRA_URL || "https://renconsultores.atlassian.net";
  const jiraEmail = process.env.JIRA_EMAIL || "ejgonzalez@renconsultores.com.co";
  const jiraApiToken = process.env.JIRA_API_TOKEN;
  const jiraSchemaId = process.env.JIRA_SCHEMA_ID || "3";
  if (!jiraApiToken) {
    throw createError({
      statusCode: 400,
      statusMessage: "Jira API Token no configurado en las variables de entorno."
    });
  }
  try {
    const auth = Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString("base64");
    const wsResponse = await $fetch(`${jiraUrl}/rest/servicedeskapi/assets/workspace`, {
      headers: { "Authorization": `Basic ${auth}` }
    });
    const workspaceId = (_b = (_a = wsResponse.values) == null ? void 0 : _a[0]) == null ? void 0 : _b.workspaceId;
    if (!workspaceId) {
      throw new Error("No se encontr\xF3 ning\xFAn workspace ID en la cuenta de Jira.");
    }
    console.log(`[JIRA SYNC] Iniciando consultas AQL en workspace: ${workspaceId}`);
    const collaboratorsRaw = await fetchAllObjects(workspaceId, `objectType = "Colaboradores"`, auth);
    let colaboradoresCount = 0;
    for (const rawCol of collaboratorsRaw) {
      const nameAttr = (_c = rawCol.attributes) == null ? void 0 : _c.find((a) => a.objectTypeAttributeId === "492");
      const statusAttr = (_d = rawCol.attributes) == null ? void 0 : _d.find((a) => a.objectTypeAttributeId === "780");
      let emailAttr = (_e = rawCol.attributes) == null ? void 0 : _e.find((a) => a.objectTypeAttributeId === "494");
      if (!emailAttr || !((_g = (_f = emailAttr.objectAttributeValues) == null ? void 0 : _f[0]) == null ? void 0 : _g.displayValue)) {
        emailAttr = (_h = rawCol.attributes) == null ? void 0 : _h.find((a) => {
          var _a2;
          const attrName = (((_a2 = a.objectTypeAttribute) == null ? void 0 : _a2.name) || "").toLowerCase();
          return attrName.includes("correo") || attrName.includes("email") || attrName.includes("mail");
        });
      }
      const nombre = ((_j = (_i = nameAttr == null ? void 0 : nameAttr.objectAttributeValues) == null ? void 0 : _i[0]) == null ? void 0 : _j.displayValue) || rawCol.label;
      let correo = (_n = (_m = (_l = (_k = emailAttr == null ? void 0 : emailAttr.objectAttributeValues) == null ? void 0 : _k[0]) == null ? void 0 : _l.displayValue) == null ? void 0 : _m.toLowerCase()) == null ? void 0 : _n.trim();
      const rawStatus = ((_p = (_o = statusAttr == null ? void 0 : statusAttr.objectAttributeValues) == null ? void 0 : _o[0]) == null ? void 0 : _p.displayValue) || "Activo";
      const jiraKey = rawCol.objectKey;
      if (!correo) {
        correo = `sin-correo-${jiraKey.toLowerCase()}@jira.internal`;
        console.log(`[JIRA SYNC] Colaborador sin correo encontrado: ${nombre} (${jiraKey}) - usando placeholder`);
      }
      let estado = "Activo";
      if (rawStatus === "Inactivo") estado = "Inactivo";
      else if (rawStatus === "Suspendido") estado = "Suspendido";
      else if (rawStatus === "Vacaciones") estado = "Vacaciones";
      else if (rawStatus === "Retirado") estado = "Retirado";
      const gUser = await prisma.usuarioGoogle.findUnique({ where: { correo } });
      const area = (gUser == null ? void 0 : gUser.area) || "Tecnolog\xEDa";
      let existingCol = await prisma.colaborador.findUnique({
        where: { jira_id: jiraKey }
      });
      if (!existingCol) {
        const colByEmail = await prisma.colaborador.findUnique({
          where: { correo }
        });
        if (colByEmail) {
          if (!colByEmail.jira_id) {
            existingCol = colByEmail;
          } else {
            const parts = correo.split("@");
            correo = `${parts[0]}+${jiraKey.toLowerCase()}@${parts[1]}`;
          }
        }
      } else {
        const colByEmail = await prisma.colaborador.findUnique({
          where: { correo }
        });
        if (colByEmail && colByEmail.id !== existingCol.id) {
          const parts = correo.split("@");
          correo = `${parts[0]}+${jiraKey.toLowerCase()}@${parts[1]}`;
        }
      }
      if (existingCol) {
        await prisma.colaborador.update({
          where: { id: existingCol.id },
          data: {
            nombre,
            correo,
            // Por si cambió o se sufijó
            jira_id: jiraKey,
            estado
          }
        });
      } else {
        await prisma.colaborador.create({
          data: {
            nombre,
            correo,
            jira_id: jiraKey,
            area,
            proyecto: "General",
            estado
          }
        });
      }
      colaboradoresCount++;
    }
    const equipmentRaw = await fetchAllObjects(workspaceId, `objectSchemaId = ${jiraSchemaId} AND objectType != "Colaboradores"`, auth);
    let equiposCount = 0;
    const equipmentToLink = [];
    for (const rawEq of equipmentRaw) {
      const statusAttr = (_q = rawEq.attributes) == null ? void 0 : _q.find((a) => a.objectTypeAttributeId === "461" || a.objectTypeAttributeId === "448");
      const modelAttr = (_r = rawEq.attributes) == null ? void 0 : _r.find((a) => a.objectTypeAttributeId === "466" || a.objectTypeAttributeId === "450" || a.objectTypeAttributeId === "452");
      const cpuAttr = (_s = rawEq.attributes) == null ? void 0 : _s.find((a) => a.objectTypeAttributeId === "472");
      const serialAttr = (_t = rawEq.attributes) == null ? void 0 : _t.find((a) => a.objectTypeAttributeId === "474" || a.objectTypeAttributeId === "454");
      const ownerAttr = (_u = rawEq.attributes) == null ? void 0 : _u.find((a) => a.objectTypeAttributeId === "642" || a.objectTypeAttributeId === "679");
      const collaboratorKey = (_w = (_v = ownerAttr == null ? void 0 : ownerAttr.objectAttributeValues) == null ? void 0 : _v[0]) == null ? void 0 : _w.searchValue;
      const hostname = rawEq.label || `DISPOSITIVO-${rawEq.id}`;
      const jiraKey = rawEq.objectKey;
      const rawStatus = ((_y = (_x = statusAttr == null ? void 0 : statusAttr.objectAttributeValues) == null ? void 0 : _x[0]) == null ? void 0 : _y.displayValue) || "Disponible";
      const marcaModelo = ((_A = (_z = modelAttr == null ? void 0 : modelAttr.objectAttributeValues) == null ? void 0 : _z[0]) == null ? void 0 : _A.displayValue) || "Gen\xE9rico";
      const procesador = ((_C = (_B = cpuAttr == null ? void 0 : cpuAttr.objectAttributeValues) == null ? void 0 : _B[0]) == null ? void 0 : _C.displayValue) || "Intel / Apple Silicon";
      const serial = ((_E = (_D = serialAttr == null ? void 0 : serialAttr.objectAttributeValues) == null ? void 0 : _D[0]) == null ? void 0 : _E.displayValue) || "SN-" + rawEq.id;
      let estado = "Disponible";
      if (rawStatus === "Asignado") estado = "Asignado";
      else if (rawStatus === "Bloqueado") estado = "Bloqueado";
      else if (rawStatus === "Mantenimiento") estado = "Mantenimiento";
      else if (rawStatus === "Inactivo") estado = "Inactivo";
      const jiraNumPart = parseInt(jiraKey.replace(/\D/g, "")) || 0;
      const b1 = jiraNumPart >> 16 & 255;
      const b2 = jiraNumPart >> 8 & 255;
      const b3 = jiraNumPart & 255;
      const macPlaceholder = `FA:KE:${b1.toString(16).padStart(2, "0").toUpperCase()}:${b2.toString(16).padStart(2, "0").toUpperCase()}:${b3.toString(16).padStart(2, "0").toUpperCase()}:00`;
      const ip = "10.0." + (b2 % 254 + 1) + "." + (b3 % 254 + 1);
      let existingEquipo = await prisma.equipo.findFirst({ where: { jira_id: jiraKey } });
      if (!existingEquipo) {
        existingEquipo = await prisma.equipo.findFirst({ where: { hostname } });
      }
      let savedEquipo;
      if (existingEquipo) {
        savedEquipo = await prisma.equipo.update({
          where: { id: existingEquipo.id },
          data: {
            hostname,
            // actualiza hostname si cambió en Jira
            jira_id: jiraKey,
            ip_registro: ip,
            marca_modelo: marcaModelo,
            procesador,
            serial,
            estado
          }
        });
      } else {
        savedEquipo = await prisma.equipo.create({
          data: {
            hostname,
            jira_id: jiraKey,
            mac_address: macPlaceholder,
            ip_registro: ip,
            marca_modelo: marcaModelo,
            estado,
            token_seguridad: `token-${jiraKey}`,
            tipo_activo: ((_F = rawEq.objectType) == null ? void 0 : _F.name) || "Portatil",
            procesador,
            serial
          }
        });
      }
      if (collaboratorKey) {
        equipmentToLink.push({
          equipoJiraId: savedEquipo.jira_id || jiraKey,
          collaboratorKey
        });
      }
      equiposCount++;
    }
    for (const link of equipmentToLink) {
      const col = await prisma.colaborador.findUnique({
        where: { jira_id: link.collaboratorKey }
      });
      if (col) {
        const eq = await prisma.equipo.findFirst({
          where: { jira_id: link.equipoJiraId }
        });
        if (eq) {
          await prisma.equipo.update({
            where: { id: eq.id },
            data: {
              colaborador_id: col.id,
              estado: "Asignado"
            }
          });
        }
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Sincronizar Jira Assets",
        detalles: `Sincronizaci\xF3n real exitosa (paginada en URL). Sincronizados ${colaboradoresCount} colaboradores y ${equiposCount} equipos en total.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1"
      }
    });
    return {
      success: true,
      mensaje: `Sincronizaci\xF3n de Jira Assets completada. ${colaboradoresCount} colaboradores y ${equiposCount} equipos procesados en total (paginado).`,
      colaboradoresCount,
      equiposCount
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al sincronizar Jira Assets: ${error.message}`
    });
  }
});

const sincronizar_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sincronizar_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler(async (event) => {
  try {
    const softwareList = await prisma.software.findMany({
      include: {
        _count: {
          select: { installations: true }
        }
      }
    });
    const processedLicenses = softwareList.map((soft) => {
      const activeInstalls = soft._count.installations;
      const unusedSeats = Math.max(0, soft.purchasedSeats - activeInstalls);
      const potentialSavings = Number(soft.costPerSeat) * unusedSeats;
      let recommendation = "Licencias \xF3ptimas y bien dimensionadas.";
      if (unusedSeats > 5) {
        recommendation = `Reclamar e interrumpir ${unusedSeats} licencias inactivas para reducir costes.`;
      } else if (activeInstalls > soft.purchasedSeats) {
        recommendation = `Alerta de cumplimiento: Se exceden los asientos en ${activeInstalls - soft.purchasedSeats}. Se requiere compra urgente.`;
      }
      return {
        id: soft.id,
        name: soft.name,
        category: soft.category,
        purchasedSeats: soft.purchasedSeats,
        activeInstallations: activeInstalls,
        costPerSeat: Number(soft.costPerSeat),
        potentialSavings,
        renewalDate: soft.renewalDate,
        recommendation
      };
    });
    return processedLicenses;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al auditar licencias: ${error.message}`
    });
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete = defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Microsoft requerido." });
  }
  try {
    const existing = await prisma.usuarioM365.findUnique({
      where: { id }
    });
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: "Usuario de Microsoft 365 no encontrado." });
    }
    let apiSuccess = false;
    try {
      const tenantId = process.env.MS_TENANT_ID;
      const clientId = process.env.MS_CLIENT_ID;
      const clientSecret = process.env.MS_CLIENT_SECRET;
      if (tenantId && clientId && clientSecret) {
        const tokenParams = new URLSearchParams();
        tokenParams.append("client_id", clientId);
        tokenParams.append("client_secret", clientSecret);
        tokenParams.append("scope", "https://graph.microsoft.com/.default");
        tokenParams.append("grant_type", "client_credentials");
        const tokenResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: tokenParams.toString()
        });
        if (tokenResp.ok) {
          const tokenData = await tokenResp.json();
          const accessToken = tokenData.access_token;
          const userLookup = await fetch(`https://graph.microsoft.com/v1.0/users/${existing.correo}?$select=id`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
          });
          if (userLookup.ok) {
            const userData = await userLookup.json();
            const mUserId = userData.id;
            const deleteResp = await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}`, {
              method: "DELETE",
              headers: {
                "Authorization": `Bearer ${accessToken}`
              }
            });
            if (deleteResp.ok) {
              apiSuccess = true;
            }
          }
        }
      }
    } catch (err) {
      console.warn("Real Microsoft Graph user deletion failed, falling back to simulated sync:", err.message);
    }
    await prisma.usuarioM365.delete({
      where: { id }
    });
    const appMS = await prisma.aplicacion.findFirst({
      where: { nombre: "Microsoft 365" }
    });
    if (appMS) {
      const username = existing.correo.split("@")[0];
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo: existing.correo },
            { correo: { startsWith: username + "@" } },
            { correo: { startsWith: username + "+" } }
          ]
        }
      });
      if (col) {
        await prisma.acceso.deleteMany({
          where: {
            colaborador_id: col.id,
            aplicacion_id: appMS.id
          }
        });
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Eliminar Usuario Microsoft 365",
        detalles: `Eliminado permanentemente el usuario ${existing.nombre} (${existing.correo}) de Microsoft 365 (Azure AD). Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Microsoft 365"
      }
    });
    return {
      success: true,
      mensaje: "Usuario de Microsoft 365 eliminado correctamente."
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al eliminar usuario de Microsoft 365: ${error.message}`
    });
  }
});

const _id__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put = defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Microsoft requerido." });
  }
  const body = await readBody(event);
  const nombre = body.nombre ? String(body.nombre).trim() : "";
  const licencias = body.licencias ? String(body.licencias).trim() : "";
  if (!nombre) {
    throw createError({ statusCode: 400, statusMessage: "El nombre es requerido." });
  }
  try {
    const existing = await prisma.usuarioM365.findUnique({
      where: { id }
    });
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: "Usuario de Microsoft 365 no encontrado." });
    }
    let apiSuccess = false;
    try {
      const tenantId = process.env.MS_TENANT_ID;
      const clientId = process.env.MS_CLIENT_ID;
      const clientSecret = process.env.MS_CLIENT_SECRET;
      if (tenantId && clientId && clientSecret) {
        const tokenParams = new URLSearchParams();
        tokenParams.append("client_id", clientId);
        tokenParams.append("client_secret", clientSecret);
        tokenParams.append("scope", "https://graph.microsoft.com/.default");
        tokenParams.append("grant_type", "client_credentials");
        const tokenResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: tokenParams.toString()
        });
        if (tokenResp.ok) {
          const tokenData = await tokenResp.json();
          const accessToken = tokenData.access_token;
          const userLookup = await fetch(`https://graph.microsoft.com/v1.0/users/${existing.correo}?$select=id`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
          });
          if (userLookup.ok) {
            const userData = await userLookup.json();
            const mUserId = userData.id;
            const updateResp = await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}`, {
              method: "PATCH",
              headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ displayName: nombre })
            });
            if (updateResp.ok) {
              apiSuccess = true;
            }
          }
        }
      }
    } catch (err) {
      console.warn("Real Microsoft Graph user update failed, falling back to simulated sync:", err.message);
    }
    const updated = await prisma.usuarioM365.update({
      where: { id },
      data: {
        nombre,
        licencias,
        sincronizado_en: /* @__PURE__ */ new Date()
      }
    });
    await prisma.auditoria.create({
      data: {
        accion: "Actualizar Usuario Microsoft 365",
        detalles: `Modificado el usuario ${existing.correo} (Nuevo nombre: ${nombre}, Licencias: ${licencias}). Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Microsoft 365"
      }
    });
    return {
      success: true,
      mensaje: "Usuario actualizado exitosamente.",
      user: updated,
      real: apiSuccess
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al actualizar usuario de Microsoft 365: ${error.message}`
    });
  }
});

const _id__put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put
}, Symbol.toStringTag, { value: 'Module' }));

const create_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const nombre = body.nombre ? String(body.nombre).trim() : "";
  const correo = body.correo ? String(body.correo).trim().toLowerCase() : "";
  const licencias = body.licencias ? String(body.licencias).trim() : "";
  if (!nombre || !correo) {
    throw createError({ statusCode: 400, statusMessage: "Nombre y correo son requeridos." });
  }
  try {
    const existing = await prisma.usuarioM365.findUnique({
      where: { correo }
    });
    if (existing) {
      throw createError({ statusCode: 400, statusMessage: "El correo electr\xF3nico ya est\xE1 registrado." });
    }
    let azureId = "MS-MOCK-" + Math.random().toString(36).substring(2, 9).toUpperCase();
    let apiSuccess = false;
    try {
      const tenantId = process.env.MS_TENANT_ID;
      const clientId = process.env.MS_CLIENT_ID;
      const clientSecret = process.env.MS_CLIENT_SECRET;
      if (tenantId && clientId && clientSecret) {
        const tokenParams = new URLSearchParams();
        tokenParams.append("client_id", clientId);
        tokenParams.append("client_secret", clientSecret);
        tokenParams.append("scope", "https://graph.microsoft.com/.default");
        tokenParams.append("grant_type", "client_credentials");
        const tokenResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: tokenParams.toString()
        });
        if (tokenResp.ok) {
          const tokenData = await tokenResp.json();
          const accessToken = tokenData.access_token;
          const nickname = correo.split("@")[0];
          const createResp = await fetch("https://graph.microsoft.com/v1.0/users", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              accountEnabled: true,
              displayName: nombre,
              mailNickname: nickname,
              userPrincipalName: correo,
              passwordProfile: {
                forceChangePasswordNextSignIn: true,
                password: "ChangeMeTempPass321!"
              }
            })
          });
          if (createResp.ok) {
            const data = await createResp.json();
            azureId = data.id;
            apiSuccess = true;
          } else {
            console.warn("Real M365 user creation rejected by Graph:", await createResp.text());
          }
        }
      }
    } catch (err) {
      console.warn("Real Microsoft Graph user creation failed, falling back to simulated model:", err.message);
    }
    const newUser = await prisma.usuarioM365.create({
      data: {
        user_id: azureId,
        nombre,
        correo,
        activo: true,
        licencias,
        sincronizado_en: /* @__PURE__ */ new Date()
      }
    });
    const appMS = await prisma.aplicacion.findFirst({
      where: { nombre: "Microsoft 365" }
    });
    if (appMS) {
      const username = correo.split("@")[0];
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo },
            { correo: { startsWith: username + "@" } },
            { correo: { startsWith: username + "+" } }
          ]
        }
      });
      if (col) {
        await prisma.acceso.create({
          data: {
            colaborador_id: col.id,
            aplicacion_id: appMS.id,
            estado: "Activo"
          }
        });
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Crear Usuario Microsoft 365",
        detalles: `Creado el usuario de Azure AD ${nombre} (${correo}) con licencias [${licencias}]. Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Microsoft 365"
      }
    });
    return {
      success: true,
      mensaje: "Usuario de Microsoft 365 creado exitosamente.",
      user: newUser,
      real: apiSuccess
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al crear usuario en Microsoft 365: ${error.message}`
    });
  }
});

const create_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post
}, Symbol.toStringTag, { value: 'Module' }));

const sincronizar_post = defineEventHandler(async (event) => {
  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) {
    throw createError({
      statusCode: 400,
      statusMessage: "Credenciales de Microsoft Graph API faltantes en el .env."
    });
  }
  try {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("scope", "https://graph.microsoft.com/.default");
    params.append("grant_type", "client_credentials");
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const tokenResp = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });
    if (!tokenResp.ok) {
      throw new Error(`Autenticaci\xF3n fallida con Microsoft: ${await tokenResp.text()}`);
    }
    const tokenData = await tokenResp.json();
    const accessToken = tokenData.access_token;
    const skusResp = await fetch("https://graph.microsoft.com/v1.0/subscribedSkus", {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    const skuMap = {};
    if (skusResp.ok) {
      const skusData = await skusResp.json();
      for (const sku of skusData.value || []) {
        skuMap[sku.skuId] = sku.skuPartNumber;
      }
    }
    const usersResp = await fetch("https://graph.microsoft.com/v1.0/users?$select=id,displayName,userPrincipalName,accountEnabled,assignedLicenses", {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    if (!usersResp.ok) {
      throw new Error(`Fallo al consultar usuarios en Azure AD: ${await usersResp.text()}`);
    }
    const usersData = await usersResp.json();
    const m365Users = usersData.value || [];
    for (const u of m365Users) {
      const correo = u.userPrincipalName.toLowerCase();
      const nombre = u.displayName;
      const user_id = u.id;
      const activo = u.accountEnabled !== false;
      const licNames = (u.assignedLicenses || []).map((l) => skuMap[l.skuId] || l.skuId).join(", ");
      await prisma.usuarioM365.upsert({
        where: { correo },
        update: {
          nombre,
          user_id,
          activo,
          licencias: licNames,
          sincronizado_en: /* @__PURE__ */ new Date()
        },
        create: {
          user_id,
          nombre,
          correo,
          activo,
          licencias: licNames,
          sincronizado_en: /* @__PURE__ */ new Date()
        }
      });
    }
    const appMS = await prisma.aplicacion.findFirst({
      where: { nombre: "Microsoft 365" }
    });
    if (appMS) {
      const allM365Users = await prisma.usuarioM365.findMany();
      for (const u of allM365Users) {
        const correoBase = u.correo.toLowerCase().trim();
        const username = correoBase.split("@")[0];
        const col = await prisma.colaborador.findFirst({
          where: {
            OR: [
              { correo: correoBase },
              { correo: { startsWith: username + "@" } },
              { correo: { startsWith: username + "+" } }
            ]
          }
        });
        if (col) {
          const existingAcceso = await prisma.acceso.findFirst({
            where: {
              colaborador_id: col.id,
              aplicacion_id: appMS.id
            }
          });
          const targetEstado = u.activo ? "Activo" : "Revocado";
          if (existingAcceso) {
            await prisma.acceso.update({
              where: { id: existingAcceso.id },
              data: { estado: targetEstado }
            });
          } else {
            await prisma.acceso.create({
              data: {
                colaborador_id: col.id,
                aplicacion_id: appMS.id,
                estado: targetEstado
              }
            });
          }
        }
      }
    }
    const totalCount = await prisma.usuarioM365.count();
    await prisma.auditoria.create({
      data: {
        accion: "Sincronizar Microsoft 365",
        detalles: `Sincronizaci\xF3n real exitosa con Microsoft Graph. Se actualizaron ${m365Users.length} cuentas de usuario de Azure AD.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Microsoft 365"
      }
    });
    return {
      success: true,
      mensaje: `Cach\xE9 local de Microsoft 365 sincronizada directamente con Azure AD. Se procesaron ${m365Users.length} cuentas.`,
      total: totalCount
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al sincronizar con Microsoft Graph: ${error.message}`
    });
  }
});

const sincronizar_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sincronizar_post
}, Symbol.toStringTag, { value: 'Module' }));

const toggleStatus_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = parseInt(body.id || "0");
  const suspended = body.suspended === true;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Microsoft requerido." });
  }
  try {
    const mUser = await prisma.usuarioM365.findUnique({
      where: { id }
    });
    if (!mUser) {
      throw createError({ statusCode: 404, statusMessage: "Usuario de Microsoft 365 no encontrado." });
    }
    let apiSuccess = false;
    try {
      const tenantId = process.env.MS_TENANT_ID;
      const clientId = process.env.MS_CLIENT_ID;
      const clientSecret = process.env.MS_CLIENT_SECRET;
      if (tenantId && clientId && clientSecret) {
        const tokenParams = new URLSearchParams();
        tokenParams.append("client_id", clientId);
        tokenParams.append("client_secret", clientSecret);
        tokenParams.append("scope", "https://graph.microsoft.com/.default");
        tokenParams.append("grant_type", "client_credentials");
        const tokenResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: tokenParams.toString()
        });
        if (tokenResp.ok) {
          const tokenData = await tokenResp.json();
          const accessToken = tokenData.access_token;
          const userLookup = await fetch(`https://graph.microsoft.com/v1.0/users/${mUser.correo}?$select=id`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
          });
          if (userLookup.ok) {
            const userData = await userLookup.json();
            const mUserId = userData.id;
            const updateResp = await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}`, {
              method: "PATCH",
              headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ accountEnabled: !suspended })
            });
            if (updateResp.ok) {
              apiSuccess = true;
              if (suspended) {
                await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}/revokeSignInSessions`, {
                  method: "POST",
                  headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                  }
                });
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn("Microsoft Graph status update failed, falling back to simulated sync:", err.message);
    }
    const updatedUser = await prisma.usuarioM365.update({
      where: { id },
      data: {
        activo: !suspended,
        sincronizado_en: /* @__PURE__ */ new Date()
      }
    });
    const appMS = await prisma.aplicacion.findFirst({
      where: { nombre: "Microsoft 365" }
    });
    if (appMS) {
      const username = mUser.correo.split("@")[0];
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo: mUser.correo },
            { correo: { startsWith: username + "@" } },
            { correo: { startsWith: username + "+" } }
          ]
        }
      });
      if (col) {
        const existingAcceso = await prisma.acceso.findFirst({
          where: {
            colaborador_id: col.id,
            aplicacion_id: appMS.id
          }
        });
        const targetEstado = !suspended ? "Activo" : "Revocado";
        if (existingAcceso) {
          await prisma.acceso.update({
            where: { id: existingAcceso.id },
            data: { estado: targetEstado }
          });
        } else {
          await prisma.acceso.create({
            data: {
              colaborador_id: col.id,
              aplicacion_id: appMS.id,
              estado: targetEstado
            }
          });
        }
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: suspended ? "Deshabilitar Microsoft 365" : "Vincular Microsoft 365",
        detalles: `${suspended ? "Deshabilitada" : "Reactivada/Vinculada"} la cuenta de Microsoft 365 para ${mUser.nombre} (${mUser.correo}). Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Microsoft 365"
      }
    });
    return {
      success: true,
      mensaje: suspended ? "Cuenta deshabilitada correctamente." : "Cuenta reactivada y vinculada correctamente.",
      user: updatedUser,
      real: apiSuccess
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al alternar estado en Microsoft 365: ${error.message}`
    });
  }
});

const toggleStatus_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: toggleStatus_post
}, Symbol.toStringTag, { value: 'Module' }));

const users_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const search = query.search ? String(query.search).trim() : "";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;
    const whereClause = search ? {
      OR: [
        { nombre: { contains: search, mode: "insensitive" } },
        { correo: { contains: search, mode: "insensitive" } }
      ]
    } : {};
    const usuarios = await prisma.usuarioM365.findMany({
      where: whereClause,
      orderBy: { nombre: "asc" },
      skip: query.paginate === "true" ? skip : void 0,
      take: query.paginate === "true" ? limit : void 0
    });
    if (query.paginate === "true") {
      const total = await prisma.usuarioM365.count({ where: whereClause });
      return {
        data: usuarios,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
    return usuarios;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener usuarios de Microsoft 365: ${error.message}`
    });
  }
});

const users_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: users_get
}, Symbol.toStringTag, { value: 'Module' }));

const aplicar_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { politicas } = body;
  if (!politicas || !Array.isArray(politicas)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Formato de pol\xEDticas inv\xE1lido."
    });
  }
  try {
    const listDescription = politicas.map((p) => `${p.nombre.split(" (")[0]}: ${p.estado ? "Activa" : "Inactiva"}`).join(", ");
    await prisma.auditoria.create({
      data: {
        accion: "Actualizar Pol\xEDticas MDM",
        detalles: `Se actualiz\xF3 el perfil de seguridad global de la flota. Configuraci\xF3n: ${listDescription}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1"
      }
    });
    return {
      success: true,
      mensaje: "Pol\xEDticas registradas en auditor\xEDa exitosamente."
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al aplicar pol\xEDticas en backend: ${error.message}`
    });
  }
});

const aplicar_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: aplicar_post
}, Symbol.toStringTag, { value: 'Module' }));

const install_ps1 = defineEventHandler(async (event) => {
  const host = getRequestHeader(event, "host") || "localhost:3000";
  const protoHeader = getRequestHeader(event, "x-forwarded-proto");
  const protocol = protoHeader || ("http");
  const backendUrl = `${protocol}://${host}`;
  const backendApi = `${backendUrl}/api/equipos`;
  const lines = [
    "# ============================================================",
    "# REN MDM Agent Installer v2.0 \xB7 Lock Screen Edition",
    `# Backend: ${backendUrl}`,
    "# ============================================================",
    "",
    "function Enroll-Device {",
    "  param(",
    "    [Parameter(Mandatory=$true)][string]$Token,",
    '    [string]$Intervalo = "5"',
    "  )",
    "",
    '  $ErrorActionPreference = "Stop"',
    '  $AgentDir  = "C:\\ProgramData\\RenConsultores\\Agent"',
    `  $AgentUrl  = "${backendUrl}/agent/ren-agent.js"`,
    `  $LockUrl   = "${backendUrl}/agent/ren-lock.ps1"`,
    `  $Backend   = "${backendApi}"`,
    "",
    '  Write-Host ""',
    '  Write-Host "=====================================================  " -ForegroundColor Cyan',
    '  Write-Host "   REN MDM Agent - Instalacion del Agente v2.0        " -ForegroundColor Cyan',
    '  Write-Host "   Incluye: Bloqueo/Desbloqueo remoto de pantalla     " -ForegroundColor Cyan',
    '  Write-Host "=====================================================  " -ForegroundColor Cyan',
    '  Write-Host ""',
    "",
    "  # 1. Crear directorio del agente",
    '  Write-Host "[1/6] Creando directorio del agente..." -ForegroundColor Yellow',
    "  if (-not (Test-Path $AgentDir)) {",
    "    New-Item -ItemType Directory -Path $AgentDir -Force | Out-Null",
    "  }",
    '  Write-Host "      OK: $AgentDir" -ForegroundColor Green',
    "",
    "  # 2. Guardar el token",
    '  Write-Host "[2/6] Guardando token de seguridad..." -ForegroundColor Yellow',
    '  Set-Content -Path "$AgentDir\\token.txt" -Value $Token -Encoding UTF8',
    '  Write-Host "      OK: token.txt guardado" -ForegroundColor Green',
    "",
    "  # 3. Obtener node.exe",
    '  Write-Host "[3/6] Verificando runtime Node.js..." -ForegroundColor Yellow',
    '  if (-not (Test-Path "$AgentDir\\node.exe")) {',
    "    $nodeSys = (Get-Command node -ErrorAction SilentlyContinue)",
    "    if ($nodeSys) {",
    '      Copy-Item $nodeSys.Source "$AgentDir\\node.exe" -Force',
    '      Write-Host "      OK: node.exe copiado del sistema" -ForegroundColor Green',
    "    } else {",
    '      Write-Host "      Descargando Node.js v20 LTS..." -ForegroundColor Yellow',
    '      $msi = "$env:TEMP\\node-v20.msi"',
    '      Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.19.0/node-v20.19.0-x64.msi" -OutFile $msi -UseBasicParsing',
    '      Start-Process msiexec.exe -ArgumentList "/i $msi /quiet /norestart" -Wait',
    '      Copy-Item "C:\\Program Files\\nodejs\\node.exe" "$AgentDir\\node.exe" -Force',
    '      Write-Host "      OK: Node.js instalado" -ForegroundColor Green',
    "    }",
    "  } else {",
    '    Write-Host "      OK: node.exe ya existe" -ForegroundColor Green',
    "  }",
    "",
    "  # 4. Descargar el agente y configurar URL del backend",
    '  Write-Host "[4/6] Descargando agente REN MDM..." -ForegroundColor Yellow',
    '  Invoke-WebRequest -Uri $AgentUrl -OutFile "$AgentDir\\ren-agent.js" -UseBasicParsing',
    "  # Reemplazar placeholder con la URL real del backend",
    `  (Get-Content "$AgentDir\\ren-agent.js" -Raw) -replace 'http://<IP_DEL_SERVIDOR>:3000/api/equipos', $Backend | Set-Content "$AgentDir\\ren-agent.js" -Encoding UTF8`,
    '  Write-Host "      OK: ren-agent.js configurado con backend $Backend" -ForegroundColor Green',
    "",
    "  # 5. Descargar la pantalla de bloqueo WPF",
    '  Write-Host "[5/6] Descargando pantalla de bloqueo remoto..." -ForegroundColor Yellow',
    '  Invoke-WebRequest -Uri $LockUrl -OutFile "$AgentDir\\ren-lock.ps1" -UseBasicParsing',
    '  Write-Host "      OK: ren-lock.ps1 descargado" -ForegroundColor Green',
    "",
    "  # 6. Crear tarea programada de inicio automatico",
    '  Write-Host "[6/6] Registrando tarea en el Programador de Tareas..." -ForegroundColor Yellow',
    '  $taskName = "RenMDMAgent"',
    "  Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue",
    '  $action    = New-ScheduledTaskAction -Execute "$AgentDir\\node.exe" -Argument "$AgentDir\\ren-agent.js" -WorkingDirectory $AgentDir',
    "  $trigger   = New-ScheduledTaskTrigger -AtStartup",
    "  $settings  = New-ScheduledTaskSettingsSet -ExecutionTimeLimit 0 -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) -StartWhenAvailable",
    '  $principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest',
    '  Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Description "REN MDM Agent v2.0 con bloqueo remoto" | Out-Null',
    "  Start-ScheduledTask -TaskName $taskName",
    '  Write-Host "      OK: Tarea RenMDMAgent iniciada" -ForegroundColor Green',
    "",
    '  Write-Host ""',
    '  Write-Host "=====================================================  " -ForegroundColor Green',
    '  Write-Host "   INSTALACION COMPLETADA EXITOSAMENTE                " -ForegroundColor Green',
    '  Write-Host "=====================================================  " -ForegroundColor Green',
    '  Write-Host "   Equipo : $env:COMPUTERNAME" -ForegroundColor White',
    `  Write-Host "   Portal : ${backendUrl}/equipos" -ForegroundColor Cyan`,
    '  Write-Host "   Agente : ren-agent.js + ren-lock.ps1" -ForegroundColor Cyan',
    '  Write-Host "=====================================================  " -ForegroundColor Green',
    '  Write-Host ""',
    "}",
    "",
    'Write-Host "Script REN MDM cargado. Uso:" -ForegroundColor Cyan',
    `Write-Host "  Enroll-Device -Token 'TU_TOKEN'" -ForegroundColor Yellow`
  ];
  const script = lines.join("\r\n");
  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setResponseHeader(event, "Content-Disposition", 'inline; filename="install.ps1"');
  return script;
});

const install_ps1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: install_ps1
}, Symbol.toStringTag, { value: 'Module' }));

const renAgent_js = defineEventHandler(async (event) => {
  try {
    const agentPath = resolve(process.cwd(), "scripts/ren-agent.js");
    const content = readFileSync(agentPath, "utf-8");
    setResponseHeader(event, "Content-Type", "application/javascript");
    setResponseHeader(event, "Content-Disposition", 'attachment; filename="ren-agent.js"');
    return content;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `No se pudo leer el agente: ${err.message}`
    });
  }
});

const renAgent_js$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renAgent_js
}, Symbol.toStringTag, { value: 'Module' }));

const renLock_ps1 = defineEventHandler(async (event) => {
  try {
    const lockPath = resolve(process.cwd(), "scripts/ren-lock.ps1");
    const content = readFileSync(lockPath, "utf-8");
    setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
    setResponseHeader(event, "Content-Disposition", 'attachment; filename="ren-lock.ps1"');
    return content;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `No se pudo leer ren-lock.ps1: ${err.message}`
    });
  }
});

const renLock_ps1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renLock_ps1
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
	return {
		body: encodeForwardSlashes(stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"])) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const contents = opts.data ? encodeForwardSlashes(stringify(opts.data, opts.ssrContext["~payloadReducers"])) : "";
	const payload = {
		"type": "application/json",
		"innerHTML": contents,
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	{
		payload.id = "__NUXT_DATA__";
	}
	if (opts.src) {
		payload["data-src"] = opts.src;
	}
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}

function encodeForwardSlashes(str) {
	return str.replaceAll("/", "\\u002F");
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, ...initial } = ssrContext.payload;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload: {
			data,
			prerenderedAt
		}
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const PAYLOAD_FILENAME = "_payload.json" ;
const PAYLOAD_BUILD_ID_PARAM = "_b";
const handler = defineRenderHandler((event) => {
	
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) {
		throw createError({
			status: 404,
			statusText: "Page Not Found: /__nuxt_error",
			message: "Page Not Found: /__nuxt_error"
		});
	}
	return renderRoute(event, ssrError);
});
async function renderRoute(event, ssrError) {
	const nitroApp = useNitroApp();
	
	const ssrContext = createSSRContext(event);
	
	const headEntryOptions = { mode: "server" };
	ssrContext.head.push(appHead, headEntryOptions);
	if (ssrError) {
		
		const status = ssrError.status || ssrError.statusCode;
		if (status) {
			
			ssrError.status = ssrError.statusCode = Number.parseInt(status);
		}
		setSSRError(ssrContext, ssrError);
	}
	
	const routeOptions = getRouteRules(event);
	if (routeOptions.ssr === false) {
		ssrContext.noSSR = true;
	}
	
	!ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const isRenderingPayload = (routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const payloadURL = new URL(ssrContext.url, "http://localhost");
		const url = payloadURL.pathname.slice(0, -`/${PAYLOAD_FILENAME}`.length) || "/";
		payloadURL.searchParams.delete(PAYLOAD_BUILD_ID_PARAM);
		ssrContext.url = url + payloadURL.search;
		event._path = event.node.req.url = ssrContext.url;
	}
	
	const renderer = await getRenderer(ssrContext);
	const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
		
		
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") {
			return {};
		}
		
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	
	
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) {
		
		return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	}
	
	if (ssrContext.payload?.error && !ssrError) {
		throw ssrContext.payload.error;
	}
	
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		return response;
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const link = [];
	for (const resource of Object.values(styles)) {
		
		if ("inline" in getQuery(resource.file)) {
			continue;
		}
		
		
		
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) {
		ssrContext.head.push({ link }, headEntryOptions);
	}
	if (!NO_SCRIPTS) {
		
		
		
		const dependencyOptions = ssrContext["~lazyHydratedModules"]?.size ? { exclude: ssrContext["~lazyHydratedModules"] } : undefined;
		const stylesheetHrefs = new Set(link.map((l) => l.href));
		ssrContext.head.push({ link: [...getPreloadLinks(ssrContext, renderer.rendererContext, dependencyOptions), ...getPrefetchLinks(ssrContext, renderer.rendererContext, dependencyOptions)].filter((l) => !stylesheetHrefs.has(l.href)) }, headEntryOptions);
		
		ssrContext.head.push({ script: renderPayloadJsonScript({
			ssrContext,
			data: ssrContext.payload
		})  }, {
			...headEntryOptions,
			
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			
			
			tagPosition,
			crossorigin: ""
		})) }, headEntryOptions);
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
}
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) {
			result.push(chunk);
		}
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) {
		return "";
	}
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return "<!DOCTYPE html>" + `<html${joinAttrs(html.htmlAttrs)}>` + `<head>${joinTags(html.head)}</head>` + `<body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>` + "</html>";
}

const renderer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handler
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
