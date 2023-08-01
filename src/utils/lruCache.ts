import { LRUCache } from 'lru-cache';

const options = {
    max: 10,
    ttl: 1000 * 60 * 10,
    allowStale: false,
    updateAgeOnGet: false,
    updateAgeOnHas: false,
};

export const cache = new LRUCache(options);
