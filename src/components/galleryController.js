import GalleryView from './galleryView.js';
import ModalController from './modalController.js'; 
export default class GaleryCotroller {

    galleryUl = document.querySelector('.js-gallery');
    modal = document.querySelector('.js-lightbox');
    atr = {};


    constructor(gallery = []){
        this.gallery = gallery;
        this.galleryView = new GalleryView();
        this.modalController = new ModalController();
        this.galleryUl.addEventListener('click', this.handleGalleryClick.bind(this));
    }

    makeGalleryTemplates(){
        const templates = [];
         this.gallery.forEach(slide => {
            let template = `<li class="gallery__item">
            <a
              class="gallery__link"
              href="${slide.original}"
            >
              <img
                class="gallery__image"
                src="${slide.preview}"
                data-source="${slide.original}"
                alt="${slide.description}"
              />
            </a>
          </li>`;
          templates.push(template);
        })
        return templates
    }

    renderGallery () {
        this.galleryView.render(this.makeGalleryTemplates(), this.galleryUl);
    }

    handleGalleryClick(e){
        e.preventDefault();
        if (e.target.nodeName !== 'IMG') {
            return
        }     

        this.openModal();

        const slide = e.target;
        this.getAttributes(slide);
        
    }
    
    openModal(){
        this.modal.classList.add('is-open');
        this.modalController.keysHandlerRef = this.modalController.keysHandler.bind(this.modalController);
        window.addEventListener('keydown',this.modalController.keysHandler.bind(this.modalController))
    }

    getAttributes (slide){
      this.atr.src = slide.dataset.source;  //получаем SRC оригинала
      this.atr.alt = slide.getAttribute('alt');
      this.modalController.setImgAttributes(this.atr); // отправляем атрибуты контролеру модалки
    }

}