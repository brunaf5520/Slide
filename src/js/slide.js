export default class Slide {
  constructor(slide, container) {
    this.slide = document.querySelector(slide);
    this.container = document.querySelector(container);

    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    }

  }

  moveSlide(distX) { 
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 2;
    return this.dist.finalPosition - this.dist.movement;
  }

  onstart(e) {
    e.preventDefault();
    this.dist.startX = e.clientX;
    this.container.addEventListener('mousemove', this.onMove);
  }

  onMove(e) {
    const finalPosition = this.updatePosition(e.clientX);
    this.moveSlide(finalPosition)
  }

  onEnd(e) {
    this.container.removeEventListener('mousemove', this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
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
