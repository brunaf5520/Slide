export default class Slide {
  constructor(slide, container) {
    this.slide = document.querySelector(slide);
    this.container = document.querySelector(container);


  }

  onstart(e) {
    e.preventDefault();
    this.container.addEventListener('mousemove', this.onMove);
  }

  onMove(e) {

  }

  onEnd(e) {
    this.container.removeEventListener('mousemove', this.onMove);
  }

  addSlideEvent() {
    this.container.addEventListener('mousedown', this.onstart)
    this.container.addEventListener('mouseup', this.onEnd)
  }

  bindEvents() {
    this.onstart = this.onstart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvent();
    return this;
  }
}
