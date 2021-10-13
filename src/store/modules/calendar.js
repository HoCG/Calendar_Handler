//import {requestAddEvent, requestQueryEvents, requestEventDetail} from "../apis/calendar_api";
//import {setSnackBarInfo} from "../apis/common_api";

const state = {
    event: initEvent(), //새롭게 등록될 이벤트, 혹은 현재 이벤트.
    events: [], //저장된 일정들을 담는 배열.
    eventAddDialog: false,
    eventDetailDialog: false,
    eventAddDialogUpdateMode: false,
    eventDetail: {}
};

const mutations = {
    OPEN_CALENDAR_DIALOG(state, payload) {
        state.event.startDate = payload.date;
        state.event.startTime = payload.time;
        state.eventAddDialog = true;
    },
    CLOSE_CALENDAR_DIALOG(state) {
        state.eventAddDialog = false;
    },
    UPDATE_EVENT(state, getEvent){
        state.events = state.events.filter(e => e.id !== getEvent.id);
        getEvent = makeEvent(getEvent);
        state.events.push(getEvent);
        state.eventAddDialogUpdateMode = false
        state.eventAddDialog = false;
        state.event = initEvent();
    },
    ADD_EVENT(state, getEvent) {
        getEvent = makeEvent(getEvent);
        state.events.push(getEvent);
        state.eventAddDialog = false;
        state.event = initEvent();
    },
    ADD_EVENTS(state, events) {
        state.events = [];
        events.forEach(e => {
            state.events.push(makeEvent(e));
        });
    },
    SHOW_EVENT_DETAIL(state, event) {
        state.events.forEach(e => {
            if(e.id === event.id){
                state.event = e;
            }
        })
        state.eventDetailDialog = true;
    },
    CLOSE_EVENT_DETAIL(state) {
        state.eventDetailDialog = false;
        state.event = initEvent();
    },
    UPDATE_EVENT_DETAIL(state, getEvent){
        state.event = updateEvent(getEvent); 
        state.eventDetailDialog = false;
        state.eventAddDialogUpdateMode = true;
        state.eventAddDialog = true;
    },
    DELETE_EVENT_DETAIL(state, getEvent){
        state.events = state.events.filter(e => e.id !== getEvent.id);
        state.eventDetailDialog = false;
        state.event = initEvent();
    }
};


const actions = {
    /*
    async REQUEST_ADD_EVENT(context, calendar) {
        try {
            const response = await requestAddEvent(calendar);

            const addedEvent = makeEvent(response.data);
            console.log('addedEvent', addedEvent);
            context.commit('ADD_EVENT', addedEvent);
            store.commit('SET_SNACKBAR', setSnackBarInfo('일정이 추가 되었습니다.', 'info', 'top'))
        } catch (e) {
            store.commit('SET_SNACKBAR', setSnackBarInfo('일정 추가 실패.', 'error', 'top'))
        }
    },
    //비동기 처리를 위한 Action들
    async REQEUST_QUERY_EVENTS_BY_DATE(context, date) {
        try {
            const response = await requestQueryEvents(date);
            context.commit('ADD_EVENTS', response.data);
            console.log(response.data);
        } catch (e) {
            store.commit('SET_SNACKBAR', setSnackBarInfo('이벤트 전체 조회를 실패하였습니다.', 'error', 'top'))
        }
    },

    async REQUEST_DETAIL_EVENT(context, eventId) {
        try {
            console.log('dispated');
            const respone = await requestEventDetail(eventId);
            console.log('dispatch Event', respone.data);
            context.commit('SHOW_EVENT_DETAIL', respone.data);
        } catch (e) {
            store.commit('SET_SNACKBAR', setSnackBarInfo('이벤트 상세 조회를 실패하였습니다.', 'error', 'top'))
        }
    },

    async REQEUST_DELETE_EVENT(context, eventId) {
        try {
            //const response = await requestDelteEvent(eventId);
            // console.log('일정 삭제 성공');
            // 이벤트를 뺼껀지, 혹은 다시 조회할껀지
            store.commit('SET_SNACKBAR', setSnackBarInfo('일정이 삭제 되었습니다.', 'info', 'top'))

        } catch (e) {
            // console.log('일정 삭제 실패' + e)
        }
    },

    async REQUEST_UPDATE_EVENT(context, event) {
        try {
            const event = {
                name: calendar.title,
                start: calendar.startDate + getTime(calendar.startTime),
                end: calendar.endDate + getTime(calendar.endTime),
            };

            const response = await requestUpdateEvent(event);
            // console.log('업데이트 성공');
            // 이벤트를 변경할 것인지, 다시 조회할것인지
        } catch (e) {
            // console.log('이벤트 수정 실패')
        }
    }
    */
};

const getTime = (time) => {
    return time === null ? '' : ` ${time}`;
};

const colors = ['blue', 'indigo', 'deep-purple', 'green', 'orange', 'red'];


const makeEvent = (event) => {
    return {
        id: state.events.length,
        name: event.title,
        content: event.content,
        start: event.startDate + getTime(event.startTime),
        end: event.endDate + getTime(event.endTime),
        color: colors[Math.floor(Math.random() * 6)]
    }
};

const updateEvent = (event) => {
    return {
        id: event.id,
        startDate: event.start.substr(0, 10),
        startTime: event.start.substr(11, 5),
        endDate: event.end.substr(0, 10),
        endTime: event.end.substr(11, 5),
        content: event.content,
        title: event.name
    }
}


function initEvent() {
    return {
        id: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        content: '',
        title: '',
    }
}

export default {mutations, state, actions};