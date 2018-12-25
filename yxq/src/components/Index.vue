<template>
    <div class="Index">
        <v-header/>
        <div class="content">
            <v-sidebar/>
        </div>
    </div>
</template>
<script>
import Header from './Header'
import Sidebar from './Sidebar'
export default {
    data() {
        return {

        }
    },
    components: {
        'v-header': Header,
        'v-sidebar': Sidebar
    }
}
</script>