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
    let movetype;
    if (e.type === 'mousedown') {
      e.preventDefault();
      this.dist.startX = e.clientX;
      movetype = 'mousemove';
    } else {
      this.dist.startX = e.changedTouches[0].clientX;
      movetype = 'touchmove';
    }
    this.container.addEventListener(movetype, this.onMove);
  }

  onMove(e) {
    const pointerPosition = (e.type === 'mousemove') ? e.clientX : e.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition)
  }

  onEnd(e) {
    const movetype = (e.type === 'mouseup') ? movetype = 'mousemove' : 'touchmove';
    this.container.removeEventListener(movetype, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  addSlideEvent() {
    this.container.addEventListener('mousedown', this.onstart)
    this.container.addEventListener('touchstart', this.onstart)
    this.container.addEventListener('mouseup', this.onEnd)
    this.container.addEventListener('touchend', this.onEnd)
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
