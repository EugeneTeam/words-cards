import { Observable } from 'rxjs';
import { Cache } from 'cache-manager';
import { getDataFromObservableUtil } from './get-data-from-observable.util';
import {
  CACHE_TTL,
  USE_CACHE,
} from '../../../../common/config/cache/cache.config';

export class CacheWrapperUtil {
  /**
   * Wrapper method for microservice requests.
   * @param method - the microservice method to be called
   * @param cacheManager - manager
   * @param data - data for the "method" method/incoming parameters
   * @param key -the key to write the response to the cache
   */
  async cacheWrapper<TypeResponse = any, TypeInput = any>(
    method: (data: TypeInput) => Observable<TypeResponse>,
    cacheManager: Cache,
    key: string,
    data: TypeInput,
  ): Promise<TypeResponse> {
    const cacheData = await cacheManager.get(key);
    if (cacheData && USE_CACHE) {
      return cacheData as TypeResponse;
    }

    const observable: Observable<TypeResponse> = await method.call(this, data);
    const response: TypeResponse =
      await getDataFromObservableUtil<TypeResponse>(observable);
    await cacheManager.set(key, response, CACHE_TTL);
    return response;
  }

  async clearCacheByKey(cacheManager: Cache, key: string): Promise<void> {
    await cacheManager.del(key);
  }

  async clearCacheByUserUuid(
    cacheManager: Cache,
    userUuid: string,
  ): Promise<void> {
    const keys = await cacheManager.store.keys();
    for (const key of keys) {
      if (key.includes(userUuid)) {
        await cacheManager.del(key);
      }
    }
  }
}
