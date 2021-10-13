
const state = {
    event: initEvent(), //새롭게 등록될 이벤트, 혹은 현재 이벤트.
    events: [], //저장된 일정들을 담는 배열.
    eventAddDialog: false,
    eventDetailDialog: false,
    eventAddDialogUpdateMode: false,
    eventDetail: {}
};

const mutations = {
    OPEN_DIALOG(state, payload) {
        state.event.startDate = payload.date;
        state.event.startTime = payload.time;
        state.eventAddDialog = true;
    },
    CLOSE_DIALOG(state) {
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
    UPDATE_EVENT_BY_DETAIL(state, getEvent){
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