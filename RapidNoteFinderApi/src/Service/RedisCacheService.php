<?php

namespace App\Service;


use Symfony\Component\Cache\Adapter\FilesystemAdapter;

class RedisCacheService
{
    public function __construct(private FilesystemAdapter $cachePool)
    {

    }

    public function getItems($key) : array
    {
        $cacheKey = md5($key);
        $cacheItem = $this->cachePool->getItem($cacheKey);

        return $cacheItem->get($cacheKey) ?? [];
    }

    public function getItem($key, $assoc_key) : mixed
    {
        $items = $this->getItems($key);
        if(isset($items[$assoc_key]))
            return $items[$assoc_key];
        else 
            return null;
    }


    public function addItem($key, $assoc_key, $value) : void
    {
        $items = $this->getItems($key) ?? [];
        $items[$assoc_key] = $value;

        $cacheKey = md5($key);
        $cacheItem = $this->cachePool->getItem($cacheKey);
        $cacheItem->set($items);
        $this->cachePool->save($cacheItem);
    }

    public function deleteItems($key) : void 
    {
        $cacheKey = md5($key);
        $cacheItem = $this->cachePool->getItem($cacheKey);
        $cacheItem->set([]);
        $this->cachePool->save($cacheItem);
    } 
}