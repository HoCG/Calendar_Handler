<template>
    <v-app>
        <v-app-bar app="app" color="primary" dark="dark" class="justify-center">
            <v-layout row="row" wrap="wrap" width="100%" justify-center="justify-center">
                <!--맨위 고정 메뉴같은 부분이다.-->
                <div class="d-flex align-center">
                    <v-icon color="yellow">mdi-star</v-icon>
                    <h2>나의 일정관리</h2>
                    <v-icon color="yellow">mdi-star</v-icon>
                </div>
            </v-layout>
        </v-app-bar>
        <v-main>
            <Calendar/>
        </v-main>
    </v-app>
</template>

<script>
    import Calendar from './components/Calendar';

    export default {
        name: 'App',

        components: {
            Calendar
        },

        data: () => ({
            //
        })
    };
</script>