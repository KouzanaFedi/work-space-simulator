import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                background: '#000',
                cardBackground: "#222224"
            },
        },
        options: {
            customProperties: true
        }
    }
});
