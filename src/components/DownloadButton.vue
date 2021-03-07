<template>
    <v-tooltip top>
        <template v-slot:activator="{ on }">
            <v-btn
                v-on="on"
                class="mx-2"
                dark
                :color="`ryu_${color}`"
                :disabled="disabled"
                target="_blank"
                rel="noopener"
                :loading="loading"
                :href="href"
                @click.once="click"
            >
                <v-icon class="mx-5">fab fa-{{ platform }}</v-icon>
            </v-btn>
        </template>
        <span>{{ version }}</span>
    </v-tooltip>
</template>

<script>
export default {
    props: {
        platform: String,
        color: String,
        loading: Boolean,
        href: String,
        version: String,
        click: Function,
        disabled: Boolean
    }
}
</script>