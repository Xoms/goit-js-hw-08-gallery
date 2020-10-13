import galeryItems from '../gallery-items.js';

export default class ModalController{
    elements = {
        modalCloseBtn: document.querySelector('.lightbox__button'),
        modal: document.querySelector('.js-lightbox'),
        modalContent: document.querySelector('.lightbox__content'),
        galleryUl: document.querySelector('.js-gallery'),
        modalImg: document.querySelector('.js-lightbox .lightbox__image')
    };

    atr = {src: '', alt: ''}; //атрибуты картинки для отображения
    gallery = galeryItems; //массив с атрибутами картинок
    curSlideIndx = 0; //текущий слайд в модалке

    constructor() {
        this.elements.modal.addEventListener('click', this.modalClickHandler.bind(this));

        this.keysHandler = this.keysHandler.bind(this);
    }

    modalClickHandler(e){
        if (e.target === this.elements.modalCloseBtn || e.target === this.elements.modalContent) {
            this.closeModal()
            return
        }
    }

    closeModal(){
        this.elements.modal.classList.remove("is-open");
        this.elements.modalImg.setAttribute('src', '');
        document.removeEventListener('keydown', this.keysHandler) 
    }

    keysHandler(e) {

        switch (e.code) {
            case "Escape": this.closeModal();
                break;
            case 'ArrowLeft':
                this.getCurrentSlideIdx();
                this.getPrevSlide(this.curSlideIndx);
                this.setImgAttributes(this.atr);
                break;
            case 'ArrowRight':
                this.getCurrentSlideIdx();
                this.getNextSlide(this.curSlideIndx);
                this.setImgAttributes(this.atr);
                break;
        }
        
    }

    getCurrentSlideIdx(){
        this.curSlideIndx = this.gallery.findIndex( el => el.original === this.atr.src);
      }
  
    getPrevSlide(indx){
        const prevSlide =  indx - 1 < 0 ? this.gallery[this.gallery.length - 1] : this.gallery[indx - 1];
        this.atr.src = prevSlide.original;
        this.atr.alt = prevSlide.description;
      }
    getNextSlide(indx){
        const nxtSlide = ((indx + 1) > (this.gallery.length - 1)) ? this.gallery[0] : this.gallery[indx + 1];
        this.atr.src = nxtSlide.original;
        this.atr.alt = nxtSlide.description; 
      }

    setImgAttributes (atr = {}){ //меняет src и alt текущей картинки в модалке
        this.atr = atr;
        this.elements.modalImg.setAttribute('src', atr.src);
        this.elements.modalImg.setAttribute('alt', atr.alt)
    }

}