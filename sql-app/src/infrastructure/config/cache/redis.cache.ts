import { createClient } from 'redis';
import { redis_env } from '../config';
import {ICacheService} from "../../../domain/interfaces/IRedisCache";

export class RedisCacheService implements ICacheService {
    private client:any;

    costructor(){
        this.client = createClient({url: redis_env.url});
        this.client.connect();
    }

    async get(key: string):Promise<string | null>{
        return this.client.get(key);
    }
    async set(key:string,value: string):Promise<void>{
        await this.client.set(key,value);
    }
}