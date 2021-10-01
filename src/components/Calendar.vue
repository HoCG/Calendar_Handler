<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat="flat">
                    <v-btn outlined="outlined" class="mr-4" color="grey darken-2" @click="setToday">
                        Today
                    </v-btn>
                    <v-btn fab="fab" text="text" small="small" color="grey darken-2" @click="prev">
                        <v-icon small="small">
                            mdi-chevron-left
                        </v-icon>
                    </v-btn>
                    <v-btn fab="fab" text="text" small="small" color="grey darken-2" @click="next">
                        <v-icon small="small">
                            mdi-chevron-right
                        </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                        {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu bottom="bottom" right="right">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn outlined="outlined" color="grey darken-2" v-bind="attrs" v-on="on">
                                <span>{{ typeToLabel[type] }}</span>
                                <v-icon right="right">
                                    mdi-menu-down
                                </v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="type = 'day'">
                                <v-list-item-title>Day</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'week'">
                                <v-list-item-title>Week</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'month'">
                                <v-list-item-title>Month</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = '4day'">
                                <v-list-item-title>4 days</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
                <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    :type="type"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="showEventForNewDateClick"
                    @change="updateRange"></v-calendar>
                <v-menu
                    min-width="350px"
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x="offset-x">
                    <v-card color="grey lighten-4" width="600px" min-width="350px" flat="flat">
                        <Dialog v-bind:dialogVaule="selectedEvent"/> 
                        <!--컴포넌트 데이터 전달을 거쳐서 데이터를 넘겨주도록 수정해보자.-->
                        <!--<v-toolbar :color="selectedEvent.color" dark="dark">
                            <v-btn icon="icon">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon="icon">
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                            <v-btn icon="icon">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-card-text>
                            <span v-html="selectedEvent.details"></span>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn text="text" color="secondary" @click="selectedOpen = false">
                                Cancel
                            </v-btn>
                        </v-card-actions>
                        -->
                    </v-card>
                </v-menu>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
    import CalendarData from "../assets/calendar.json"
    import Dialog from "./Dialog.vue"
    export default {
        data: () => ({
            dialog: false,
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days'
            },
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            colors: [
                'blue',
                'indigo',
                'deep-purple',
                'cyan',
                'green',
                'orange',
                'grey darken-1'
            ]
        }),
        components: {
          Dialog
        },
        mounted() {
            this
                .$refs
                .calendar
                .checkChange()
        },
        methods: {
            viewDay({date}) {
                this.focus = date
                this.type = 'day'
            },
            getEventColor(event) {
                return event.color
            },
            setToday() {
                this.focus = ''
            },
            prev() {
                this
                    .$refs
                    .calendar
                    .prev()
            },
            next() {
                this
                    .$refs
                    .calendar
                    .next()
            },
            showEvent({nativeEvent, event}) {
                const open = () => {
                    this.selectedEvent = event
                    this.selectedElement = nativeEvent.target
                    requestAnimationFrame(
                        () => requestAnimationFrame(() => this.selectedOpen = true)
                    )
                }
                if (this.selectedOpen) {
                    this.selectedOpen = false
                    requestAnimationFrame(() => requestAnimationFrame(() => open()))
                } else {
                    open()
                }
                nativeEvent.stopPropagation()
            },
            showEventForNewDateClick({date}) {
                const open = () => {
                    this.selectedEvent = {
                        name : "",
                        start : new Date(date),
                        end : new Date(date),
                        color : this.colors[this.rnd(0, this.colors.length - 1)],
                        timed : true,
                        detail: ""
                    };
                    requestAnimationFrame(
                        () => requestAnimationFrame(() => this.selectedOpen = true)
                    )
                }
                if (this.selectedOpen) {
                    this.selectedOpen = false
                    requestAnimationFrame(() => requestAnimationFrame(() => open()))
                } else {
                    open()
                }
            },
            updateRange() {
                let startYear;
                let startMonth;
                let startDate;
                let endYear;
                let endMonth;
                let endDate;
                const events = [];
                for (let data of CalendarData.schedules) {
                    const allDay = this.rnd(0, 3) === 0;
                    [startYear, startMonth, startDate] = this.Make_YearMonthDate(data.start);
                    [endYear, endMonth, endDate] = this.Make_YearMonthDate(data.end);
                    events.push({
                        name : data.name,
                        start : new Date(startYear, startMonth - 1, startDate),
                        end : new Date(endYear, endMonth - 1, endDate),
                        color : this.colors[this.rnd(0, this.colors.length - 1)],
                        timed : !allDay,
                        detail: data.detail
                    });
                }
                this.events = events
            },
            rnd(a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },
            Make_YearMonthDate(timelineNumber) {
                let Year = parseInt(timelineNumber / 10000);
                let Month = parseInt((timelineNumber % 10000) / 100);
                let Date = parseInt((timelineNumber % 100));
                return [Year, Month, Date];
            }
        }
    }
</script>