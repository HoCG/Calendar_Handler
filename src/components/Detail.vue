<template>
    <v-row justify="center">
        <v-dialog max-width="400" persistent v-model="dialog">
            <v-card>
                <v-card-title class="headline">{{this.$store.state.calendar.event.name}}</v-card-title>
                <v-card-text class="font-weight-bold" style="font-size: 1rem">{{this.$store.state.calendar.event.content}}</v-card-text>

                <div class="ml-5 font-weight-light">
                    <div>시작일: {{this.$store.state.calendar.event.start}}</div>
                    <div>종료일: {{this.$store.state.calendar.event.end}}</div>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="update()" color="green darken-1" text>수정</v-btn>
                    <v-btn @click="cancel()" color="green darken-1" text>삭제</v-btn>
                    <v-btn @click="close()" color="red darken-1" text>닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "EventDetail",
        computed: {
            dialog() {
                //이렇게 다이얼로그라는 매체로 연결하여 vuex에서 false가 되더라도 그 내용이 반영될 수 있도록 수정.
                return this.$store.state.calendar.eventDetailDialog;
            },
            event() {
                return this.$store.state.calendar.event;
            }
        },
        methods: {
            update() {
                return this.$store.commit('UPDATE_EVENT_BY_DETAIL', this.event);
            },
            cancel(){
              return this.$store.commit('DELETE_EVENT_ABOUT_DETAIL', this.event);
            },
            close() {
                return this.$store.commit('CLOSE_EVENT_ABOUT_DETAIL');
            }
        }
    }
</script>

<style scoped>
</style>