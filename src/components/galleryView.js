
export default class GalleryView {


    constructor (){
    }

    render(items = [], parent){
        items.forEach(el => {
            parent.innerHTML += el;
        })
    }
}