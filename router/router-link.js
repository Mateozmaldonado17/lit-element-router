import { LitElement, html } from 'lit-element'

export class RouterLink extends LitElement {
    constructor() {
        super()
        this.addEventListener('click', this.clickHandler.bind(this))
    }
    clickHandler(event) {
        event.preventDefault();
        window.history.pushState({}, null, event.target.href + window.location.search)
        window.dispatchEvent(new CustomEvent('route'))
    }
    static get properties() {
        return {
            href: { type: String }
        }
    }
    render() {
        return html`
            <style>
                ::slotted(*) {
                    pointer-events: none;
                }
                a {
                    all: unset;
                    display: contents;
                    
                    /*Fallback for Edge*/
                    text-decoration: unset;
                    color: unset;
                }
            </style>
            <a href='${this.href}'>
                <slot></slot>
            </a>
        `
    }
}

customElements.define('router-link', RouterLink)
