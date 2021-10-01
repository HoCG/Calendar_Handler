<template>
    <v-card width="100%">
        <v-toolbar :color="dialogVaule.color">
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
                prepend-icon="mdi-folder-marker"
                ></v-text-field>
            <v-textarea
                label="상세설명"
                v-model="dialogVaule.detail"
                prepend-icon="mdi-pencil"
                ></v-textarea>
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
                                :value="String(dialogVaule.start)"
                                class=""></v-text-field>
                        </template>
                        <v-date-picker v-model="dialogVaule.start"></v-date-picker>
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
                                :value="dialogVaule.end"
                                class=""></v-text-field>
                        </template>
                        <v-date-picker v-model="dialogVaule.end"></v-date-picker>
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
                    <v-btn text="text" class="primary white--text mx-2 mt-3">
                        추가
                    </v-btn>
                    <v-btn text="text" class="primary white--text mx-2 mt-3">
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
            return {startTime: "", endTime: "", startTimer: false, endTimer: false}
        },
        mounted() {
            this.startTime = this.Make_startTime();
            this.endTime = this.Make_endTime();
        },
        methods: {
            selectTime() {
                this.endTimer = false;
                this.startTimer = false;
            },
            Make_startTime(){
                String(this.dialogVaule.start.getHours())
                + ":" + String(this.dialogVaule.start.getMinutes())
            },
            Make_endTime(){
                String(this.dialogVaule.end.getHours())
                + ":" + String(this.dialogVaule.end.getMinutes())
            }
        }
    }
</script>