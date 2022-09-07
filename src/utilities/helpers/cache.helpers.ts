/* eslint-disable space-before-function-paren */
/* eslint-disable operator-linebreak */
import { APP_NAME } from "../../constants";
import SecureLocalStorage from "./secureLocalStorage.helpers";

interface ICache {
    data: any;
    ttl: number;
}
interface ICacheOptions {
    name?: string;
    ttl?: number;
    version?: string | number;
    prefix?: string;
}
interface ICacheHandlerOptions {
    key: string;
    ttl?: number;
    getter: Function;
    args: any[];
}

export default class CacheHelpers {
    static async #handleMemoryCache(options: ICacheHandlerOptions) {
        const { key, getter, args } = options;
        const ttl = options.ttl || Infinity;

        const cache = new Map();

        const cacheResult = cache.has(key) ? (cache.get(key) as ICache) : undefined;
        const isUpdate = (cacheResult?.ttl || Infinity) > Date.now();

        if (cacheResult && isUpdate) return cacheResult.data;

        const result = await getter.apply(this, args);
        const newCache: ICache = { data: result, ttl: Date.now() + ttl };
        cache.set(key, newCache);

        return result;
    }

    static async #handleStorageCache(options: ICacheHandlerOptions) {
        const { key, getter, args } = options;
        const ttl = options.ttl || Infinity;

        const storageResult = SecureLocalStorage.getItem(key);
        const cacheResult = storageResult ? (JSON.parse(storageResult) as ICache) : undefined;
        const isUpdate = (cacheResult?.ttl || Infinity) > Date.now();

        if (cacheResult && isUpdate) return cacheResult.data;

        const result = await getter.apply(this, args);
        const newCache: ICache = { data: result, ttl: Date.now() + ttl };
        SecureLocalStorage.setItem(key, JSON.stringify(newCache));

        return result;
    }

    // functions -----------------
    static memoryCache<TArgs extends unknown[], TResult>(
        getter: (...args: TArgs) => TResult,
        options?: ICacheOptions
    ) {
        const cacheHandler = CacheHelpers.#handleMemoryCache;

        const name = options?.name || getter.name;
        const ttl = options?.ttl;

        return (...args: TArgs): Promise<TResult> => {
            const key = `${name}-${args.join()}`;

            const handleOptions = { key, getter, args, ttl };
            return cacheHandler.bind(this)(handleOptions);
        };
    }

    static storageCache<TArgs extends unknown[], TResult>(
        getter: (...args: TArgs) => TResult,
        options?: ICacheOptions
    ) {
        const cacheHandler = CacheHelpers.#handleStorageCache;

        const name = options?.name || getter.name;
        const version = options?.version || "0.0.0";
        const prefix = options?.prefix || "sc";
        const ttl = options?.ttl;

        return (...args: TArgs): Promise<TResult> => {
            const key = `${prefix}-${APP_NAME}-${name}-${version}-${args.join()}`;

            const handleOptions = { key, getter, args, ttl };
            return cacheHandler.bind(this)(handleOptions);
        };
    }

    // methods ---------
    static methodStorageCache(options?: ICacheOptions) {
        return (_target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
            const getter = descriptor.value as Function;
            const cacheHandler = CacheHelpers.#handleStorageCache;

            const name = options?.name || getter.name || propertyKey.toString();
            const version = options?.version || "0.0.0";
            const prefix = options?.prefix || "msc";
            const ttl = options?.ttl;

            descriptor.value = function (...args: any[]) {
                const key = `${prefix}-${APP_NAME}-${name}-${version}-${args.join()}`;

                const handleOptions = { key, getter, args, ttl };
                return cacheHandler.bind(this)(handleOptions);
            };
        };
    }
}
