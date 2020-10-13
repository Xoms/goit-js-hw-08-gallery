import galleryItems from "./gallery-items.js";
import GalleryController from './components/galleryController.js';

const galleryController = new GalleryController(galleryItems);
galleryController.renderGallery(); 


