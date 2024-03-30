<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;

class UploadedFileService
{
    public function __construct(private ParameterBagInterface $parameterBag)
    {

    }
    //TODO: instead of 127.0.0.1:8000 needs to be more dynamic and use server name.
    //TODO: WHEN we updating we have to is there a file which starts with data:image or something like that. and also check which files is does not exist too
    public function handleImage($imageDataUri) :string
    {
        $base64Image = substr($imageDataUri, strpos($imageDataUri, ',') + 1);
        $imageData = base64_decode($base64Image);
        $uniqId = uniqid();
        $filePath = $this->parameterBag->get('public_storage_path') . $uniqId . '.png';

        file_put_contents($filePath, $imageData);
        return "http://127.0.0.1:8000/storage/$uniqId.png";
    }
    public function handleNoteContent(string $content) : string
    {
        $imageSources = $this->extractImageSourcesFromContent($content);
        $updatedImageSources = array();
        foreach ($imageSources as $source)
            $updatedImageSources[] = $this->handleImage($source);
        return $this->updateNoteContent($content, $updatedImageSources);
    }

    public function removeChangedImages(string $updatedContent, string $oldContent) : void
    {
        $newSources = $this->extractImageSourcesFromContent($updatedContent, 'storage');
        $oldSources = $this->extractImageSourcesFromContent($oldContent, 'storage');

        foreach ($oldSources as $source)
        {
            if(!in_array($source, $newSources))
            {
                $filename = pathinfo($source, PATHINFO_BASENAME);
                try{
                    unlink($this->parameterBag->get('public_storage_path') . $filename);
                }
                catch(\Exception $e) {}
            }
        }
    }

    /**
     * @param string $content
     * @param string $alias - this will help to found specific sources of the image. This is gonna
     *                        be the search criterie
     *                        by which this method will try to find those image sources
     * @return array
     */
    private function extractImageSourcesFromContent(string $content, string $alias="data:image"): array
    {
        $imageSources = array();

        // Match all img tags and extract src attributes
        // preg_match_all('/<img[^>]+src=["\']([^1"\']+)["\'][^>]*>/i', $content, $matches);
        //preg_match_all('/<img[^>]+src=["\']([^1"\']*' . $alias . '[^"\']+)["\'][^>]*>/i', $content, $matches);

        preg_match_all('/<img[^>]+src=["\'](?=.*' . $alias .')([^"\']+)["\'][^>]*>/i', $content, $matches);


        // Extract src attributes from the matches
        foreach ($matches[1] as $src) {
            $imageSources[] = $src;
        }

        return $imageSources;
    }

    /**
     * @param string $content
     * @param array $imageSources
     * @return string
     */
    private function updateNoteContent(string $content, array $imageSources): string
    {
        // Match all img tags in the content
        //preg_match_all('/<img[^>]+>/i', $content, $matches);
        preg_match_all('/<img[^>]+src=["\']([^1"\']*data:image[^"\']+)["\'][^>]*>/i', $content, $matches);


        // Replace src attributes with new values
        foreach ($matches[0] as $index => $imgTag) {
            // Match src attribute within the img tag
            preg_match('/src=["\']([^"\']+)["\']/', $imgTag, $srcMatch);
            if (isset($srcMatch[1]) && isset($imageSources[$index])) {
                // Replace src attribute value with the new source
                $newImgTag = str_replace($srcMatch[1], $imageSources[$index], $imgTag);
                // Replace original img tag with updated img tag
               // $content = str_replace($imgTag, $newImgTag, $content);

//                $content = preg_replace('!#@abc#!' . $imgTag .'!#@abc#!', $newImgTag, $content, 1);

                $pos = strpos($content, $imgTag);
                if ($pos !== false)
                    $content = substr_replace($content, $newImgTag, $pos, strlen($imgTag));
            }
        }

        return $content;
    }

}