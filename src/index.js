import IdealPostcodesAutocomplete from './components/IdealPostcodesAutocomplete';
import { Client } from '@ideal-postcodes/core-axios';

const IdealPostcodesVue = {
    install: (Vue, options) => {
        Vue.prototype.$idealPostcodesApiKey = options.key;
        Vue.prototype.$idealPostcodesClient = new Client({
            api_key: options.key,
        });

        Vue.component(IdealPostcodesAutocomplete.name, IdealPostcodesAutocomplete);
    },
};

export default IdealPostcodesVue;