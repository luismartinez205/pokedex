const template = document.querySelector('#card-template');

class MiSkeleton extends HTMLElement {

  constructor() {
    super();

    const shadow = this.attachShadow({mode:'open'});

    shadow.appendChild(
      template.content.cloneNode(true)
    );
  }
}

customElements.define('mi-skeleton', MiSkeleton);