<template>
    <div class="ideal-postcodes-autocomplete-wrapper">
        <input
                type="text"
                class="ideal-postcodes-autocomplete-input form-control"
                :placeholder="placeholder"
                v-model="query"
                @focus="show"
                @blur="hide"
        >
        <ul
                class="ideal-postcodes-autocomplete-suggestions"
                v-if="results.length && !hidden"
        >
            <li
                    class="ideal-postcodes-autocomplete-suggestion"
                    v-for="result in results"
                    @mousedown="select(result.udprn)"
            >
                {{ result.suggestion }}
            </li>
        </ul>
    </div>
</template>

<script>
    import { debounce } from 'lodash';

    export default {
        name: 'IdealPostcodesAutocomplete',
        props: {
            placeholder: {
                type: String,
                default: 'Search for an address',
            },
        },
        data() {
            return {
                query: '',
                results: [],
                hidden: true,
            }
        },
        methods: {
            hide() {
                this.hidden = true;
            },
            show() {
                this.hidden = false;
            },
            getResults: debounce(function () {
                if (!this.query) {
                    this.results = [];
                    return;
                }

                this.$idealPostcodesClient.autocomplete.list({
                    query: {
                        query: this.query,
                    },
                    header: this.header,
                }).then(response => {
                    this.show();
                    this.results = response.body.result.hits;
                }).catch(error => console.log(error));
            }, 100),
            select: debounce(function (udprn) {
                this.$idealPostcodesClient.udprn.retrieve(udprn, {
                    header: this.header,
                }).then(response => {
                    this.hide();
                    this.$emit('selected', response.body.result)
                }).catch(error => console.log(error));
            }, 100),
        },
        computed: {
            header() {
                return {
                    "Authorization": 'IDEALPOSTCODES api_key="' + this.$idealPostcodesApiKey + '"'
                };
            },
        },
        watch: {
            query: function () {
                this.getResults();
            },
        },
    };
</script>

<style scoped>
    .ideal-postcodes-autocomplete-wrapper {
        position: relative;
    }

    .ideal-postcodes-autocomplete-suggestions {
        position: absolute;
        list-style: none;
        margin: 0;
        padding: 0.5rem 0;
        width: 100%;
        background: #fff;
        border: 1px solid #c3c9cb;
        overflow: scroll;
        max-height: 50vh;
        z-index: 999;
    }

    .ideal-postcodes-autocomplete-suggestion {
        padding: 0.125rem 1rem;
        cursor: pointer;
    }

    .ideal-postcodes-autocomplete-suggestion:hover {
        background: #e5e5e5;
    }
</style>