# IdealPostcodes Vue Autocomplete Component

```javascript
import IdealPostcodesVue from 'ideal-postcodes-vue';

Vue.use(IdealPostcodesVue, {
    key: 'YOUR_KEY',
});
```

```vue
<IdealPostcodesAutocomplete v-on:selected="updateAddress($event)" />
```

```vue
methods: {
    updateSelected(address) {
        this.line_1 = address.line_1;
        this.line_2 = address.line_2;
        this.post_town = address.post_town;
        this.county = address.county;
        this.postcode = address.postcode;
        this.country = address.country;
    },
},
```