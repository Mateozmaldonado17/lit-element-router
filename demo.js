import { } from '@webcomponents/webcomponentsjs/webcomponents-loader.js'
import { LitElement, html } from 'lit-element'
import { router, RouteContainer, RouterLink } from './lit-element-router'

class MyApp extends LitElement {

    createRenderRoot () {
        return this;
    }

    static get properties() {
        return {
            route: { type: String },
            params: { type: Object }
        }
    }

    constructor() {
        super()
        this.route = ''
        this.params = {}
        router([{
            name: 'home',
            pattern: '',
            callback: (route, params, query)=>{ console.log('callback', route, params, query)},
            guard: () => { return true }
        }, {
            name: 'info',
            pattern: 'info'
        }, {
            name: 'user',
            pattern: 'user/:id',
            guard: () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(true)
                    }, 1000);
                })
            }
        }, {
            name: 'not-found',
            pattern: '*'
        }], (route, params, query, data) => {
            this.route = route
            this.params = params
            console.log(route, params, query, data)
        })
    }

    render() {
        return html`
            <nav>
                <a is="router-link" href="/">Home</a>
                <a is="router-link" href="/info"><span>Info</span></a>
                <a is="router-link" href="/user/14">user/14</a>
                <a is="router-link" href="/user/16">user/16</a>
                <a is="router-link" href="/user/16/not/found">user/16/not/found</a>
            </nav>
            <route-container route='${this.route}'>
                <template route='home'>Home</template>
                <template route='info'>
                    <p class="info">Info</p>
                </template>
                <template route='user'>User ${this.params.id}</template>
                <template route='not-authorized'>Not Authorized</template>
                <template route='not-found'>Not Found</template>
            </route-container>
        `
    }
}

customElements.define('my-app', MyApp)