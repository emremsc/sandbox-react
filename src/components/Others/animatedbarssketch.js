class AnimatedBars extends HTMLElement {
  constructor() {
    super();
    this.animationId = null;
  }

  connectedCallback() {
    this.render();
    this.startAnimation();
  }

  disconnectedCallback() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  render() {
    this.style.display = 'block';
    this.style.width = '200px';
    this.style.height = '600px';
    
    const mainContainer = document.createElement('div');
    mainContainer.style.width = '100%';
    mainContainer.style.height = '100%';
    mainContainer.style.background = '#1E1E1E';
    mainContainer.style.display = 'flex';
    mainContainer.style.flexDirection = 'column';

    const scale = 1.6;
    const totalScale = 1 + scale + (scale * scale);
    const baseHeight = 100 / totalScale;

    for (let i = 0; i < 9; i++) {
      const child = document.createElement('div');
      child.style.width = '100%';
      child.style.background = `hsl(${200 + (i * 10)}, 100%, 50%)`;
      mainContainer.appendChild(child);
    }

    this.appendChild(mainContainer);
    this.mainContainer = mainContainer;
    this.scale = scale;
    this.baseHeight = baseHeight;
  }

  startAnimation() {
    const loop = (timestamp) => {
      const time = (timestamp || 0) / 1000;
      const children = this.mainContainer.children;

      let cycle = (Math.sin(time * Math.PI) + 1) / 2;
      cycle = easeInOutQuad(cycle);

      for (let i = 0; i < children.length; i++) {
        const currentHeight = this.baseHeight * Math.pow(this.scale, i);
        const reverseHeight = this.baseHeight * Math.pow(this.scale, children.length - 1 - i);
        const animatedHeight = currentHeight + (reverseHeight - currentHeight) * cycle;
        children[i].style.height = `${animatedHeight}%`;
      }

      this.animationId = requestAnimationFrame(loop);
    };

    loop();
  }
}

customElements.define('animated-bars', AnimatedBars);