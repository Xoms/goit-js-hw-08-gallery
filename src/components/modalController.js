import galeryItems from '../gallery-items.js';

export default class ModalController{
    elements = {
        modalCloseBtn: document.querySelector('.lightbox__button'),
        modal: document.querySelector('.js-lightbox'),
        modalOverlay: document.querySelector('.lightbox__overlay'),
        galleryUl: document.querySelector('.js-gallery'),
        modalImg: document.querySelector('.js-lightbox .lightbox__image')
    };

    atr = {}; //атрибуты картинки для отображения
    gallery = galeryItems; //массив с атрибутами картинок
    curSlideIndx = 0; //текущий слайд в модалке

    keysHandlerRef; //сюда передается ссылка на обработчик эвентов кнопок

    constructor() {
        this.elements.modalCloseBtn.addEventListener('click', this.closeModalHandler.bind(this));
        this.elements.modal.addEventListener('click', this.modalClickHandler.bind(this));
    }

    modalClickHandler(e){
        //console.log(this.elements.modalOverlay, e.target)
        if (e.target === this.elements.modalCloseBtn || e.target === this.elements.modal.querySelector('.lightbox__content')) {
            this.closeModalHandler()
            return
        }
    }

    closeModalHandler(){
        this.elements.modal.classList.remove("is-open");
        this.elements.modalImg.setAttribute('src', '');
        console.log(this.keysHandlerRef);
        window.removeEventListener('keydown', this.keysHandlerRef) //тут чего-то не снимает хендлер
    }

    keysHandler(e) {

        switch (e.code) {
            case "Escape": this.closeModalHandler();
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
        const curImg = this.gallery.find( el => el.original === this.atr.src);
        this.curSlideIndx = this.gallery.indexOf(curImg);
        console.log('curSlide', this.curSlideIndx)
      }
  
    getPrevSlide(indx){
        const prevSlide =  indx - 1 < 0 ? this.gallery[this.gallery.length - 1] : this.gallery[indx - 1];
        this.atr.src = prevSlide.original;
        this.atr.alt = prevSlide.description;
        // console.log(prevSlide); 
      }
    getNextSlide(indx){
        const prevSlide = ((indx + 1) > (this.gallery.length - 1)) ? this.gallery[0] : this.gallery[indx + 1];
        this.atr.src = prevSlide.original;
        this.atr.alt = prevSlide.description; 
      }

    setImgAttributes (atr = {}){ //меняет src и alt текущей картинки в модалке
        //console.log(atr);
        if (atr)
            this.atr = atr;
        //console.log(this.atr)
        // console.log(this.elements.modalImg);
        this.elements.modalImg.setAttribute('src', atr.src);
        this.elements.modalImg.setAttribute('alt', atr.alt)
    }

}