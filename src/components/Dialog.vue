<template v-if="is_show">
    <v-card width="100%">
        <v-toolbar :color="dialogVaule.color">
            <!--v-if default_check와 같은 함수들로 아래 버튼이 보일지 안보일지를 확인하도록 수정해보면 좋을듯.-->
            <v-btn icon="icon">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="dialogVaule.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon="icon">
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon="icon">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-toolbar>
        <v-form height="60%" class="px-3" ref="form">
            <v-text-field
                label="일정"
                v-model="dialogVaule.name"
                prepend-icon="mdi-folder-marker"></v-text-field>
            <v-textarea label="상세설명" v-model="dialogVaule.detail" prepend-icon="mdi-pencil"></v-textarea>
            <v-row>
                <v-col cols="6" class="pb-0">
                    <v-menu>
                        <template v-slot:activator="{on}">
                            <v-text-field
                                slot="activator"
                                label="시작일"
                                readonly="readonly"
                                prepend-icon="mdi-calendar-month"
                                v-on="on"
                                :value="StringStartDate"
                                class=""></v-text-field>
                        </template>
                        <v-date-picker v-model="StringStartDate"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="6" class="pb-0">
                    <v-menu
                        :close-on-content-click="false"
                        v-model="startTimer"
                        offset-y="offset-y">
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                label="시작 시간"
                                readonly="readonly"
                                :value="startTime"
                                prepend-icon="mdi-timer"
                                v-on="on"></v-text-field>
                        </template>
                        <v-time-picker v-if="startTimer" v-model="startTime">
                            <v-btn class="mx-auto" @click="selectTime">선택
                            </v-btn>
                        </v-time-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" class="pt-0">
                    <v-menu>
                        <template v-slot:activator="{on}">

                            <v-text-field
                                slot="activator"
                                label="종료일"
                                readonly="readonly"
                                prepend-icon="mdi-calendar-month"
                                v-on="on"
                                :value="StringEndDate"
                                class=""></v-text-field>
                        </template>
                        <v-date-picker v-model="StringEndDate"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="6" class="pt-0">
                    <v-menu :close-on-content-click="false" v-model="endTimer" offset-y="offset-y">
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                label="종료 시간"
                                readonly="readonly"
                                :value="endTime"
                                prepend-icon="mdi-timer"
                                v-on="on"></v-text-field>
                        </template>
                        <v-time-picker v-if="endTimer" v-model="endTime">
                            <v-btn class="mx-auto" @click="selectTime">선택
                            </v-btn>
                        </v-time-picker>
                    </v-menu>
                </v-col>
                <div class="text-center">
                    <v-btn text="text" v-if="updateMode" class="primary white--text mx-2 mt-3" @click="updateDate">
                        수정
                    </v-btn>
                    <v-btn text="text" v-else-if="newPushMode" class="primary white--text mx-2 mt-3" @click="updateDate">
                        추가
                    </v-btn>
                    <v-btn text="text" class="primary white--text mx-2 mt-3" @click="closeDialog">
                        닫기
                    </v-btn>
                </div>
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
    export default {
        props: ["dialogVaule"],
        data() {
            return {
                startTime: "", 
                endTime: "", 
                startTimer: false, 
                endTimer: false, 
                is_show: true, 
                StringStartDate: "", 
                StringEndDate: "",
                updateMode: false,
                newPushMode: false
            }
        },
        mounted() {
            this.startTime = this.Make_startTime();
            this.endTime = this.Make_endTime();
            this.Make_StringType_StartDate();
            this.Make_StringType_EndDate();
        },
        loaded(){},
        methods: {
            selectTime() {
                this.endTimer = false;
                this.startTimer = false;
            },
            Make_StringType_StartDate(){
                this.StringStartDate =
                String(this.dialogVaule.start.getFullYear()) + "-" +
                String(this.dialogVaule.start.getMonth()) + "-" +
                String(this.dialogVaule.start.getDate());
            },
            Make_StringType_EndDate(){
                this.StringEndDate =
                String(this.dialogVaule.end.getFullYear()) + "-" +
                String(this.dialogVaule.end.getMonth()) + "-" +
                String(this.dialogVaule.end.getDate());
            },
            Make_startTime() {
                String(this.dialogVaule.start.getHours()) + ":" + String(
                    this.dialogVaule.start.getMinutes()
                )
            },
            Make_endTime() {
                String(this.dialogVaule.end.getHours()) + ":" + String(
                    this.dialogVaule.end.getMinutes()
                )
            },
            form_toggle: function () {
                this.is_show = !this.is_show;
            },
            prevent_event: function (event) {
                if (event) 
                    event.preventDefault(); // 새로고침 방지
                this.updateDate(); // 상위 컴포넌트로 전달할 데이터 생성
            },
            // 폼 제출 후 데이터 초기화
            initialize_data: function () {
                /*
                this.input_name = '이름을 입력해주세요.';
                this.input_people_numbers = '0';
                */
               this.StringStartDate = "";
               this.StringEndDate = "";
            },
            updateDate: function () {
                // 입력 받은 데이터를 모아 하나의 객체로 생성
                let wait = {
                    'name': this.dialogVaule.name,
                    'start': this.dialogVaule.start,
                    'end': this.dialogVaule.end,
                    'detail': this.dialogVaule.detail
                }
                this.initialize_data(); // #폼 양식 초기화
                this.form_toggle(); // #모달창 닫기
                this.$emit('DialogEvent', wait); // #하위 컴포넌트에서 상위컴포넌트로 데이터 전달
            },
            closeDialog(){
                this.$emit('close-dialog')
            }

        }
    }
</script>