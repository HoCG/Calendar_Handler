const state = {
    event: initEvent(), //새롭게 등록될 이벤트, 혹은 현재 이벤트.
    events: [], //저장된 일정들을 담는 배열.
    eventAddDialog: false,
    eventDetailDialog: false,
    eventAddDialogUpdateMode: false,
    eventDetail: {}
};

//사용되는 동작들
const mutations = {
    OPEN_DIALOG(state, payload) {
        state.event.startDate = payload.date;
        state.event.startTime = payload.time;
        state.eventAddDialog = true;
    },
    CLOSE_DIALOG(state) {
        state.eventAddDialog = false;
    },
    UPDATE_EVENT(state, getEvent) {
        state.events = state
            .events
            .filter(e => e.id !== getEvent.id);
        getEvent = makeEvent(state, getEvent);
        state
            .events
            .push(getEvent);
        state.eventAddDialogUpdateMode = false
        state.eventAddDialog = false;
        state.event = initEvent();
    },
    ADD_EVENT(state, getEvent) {
        getEvent = makeEvent(state, getEvent);
        console.log(getEvent.id);
        state
            .events
            .push(getEvent);
        state.eventAddDialog = false;
        state.event = initEvent();
    },
    ADD_EVENTS(state, events) {
        state.events = [];
        events.forEach(e => {
            state
                .events
                .push(makeEvent(state, e));
        });
    },
    SHOW_EVENT_DETAIL(state, event) {
        state
            .events
            .forEach(e => {
                if (e.id === event.id) {
                    state.event = e;
                }
            })
        state.eventDetailDialog = true;
    },
    UPDATE_EVENT_BY_DETAIL(state, getEvent) {
        state.event = updateEvent(getEvent);
        state.eventDetailDialog = false;
        state.eventAddDialogUpdateMode = true;
        state.eventAddDialog = true;
    },
    CLOSE_EVENT_ABOUT_DETAIL(state) {
        state.eventDetailDialog = false;
        state.event = initEvent();
    },
    DELETE_EVENT_ABOUT_DETAIL(state, getEvent) {
        state.events = state
            .events
            .filter(e => e.id !== getEvent.id);
        console.log(state.events);
        state.eventDetailDialog = false;
        state.event = initEvent();
    }
};

//비동기 처리들.
const actions = {};

const getTime = (time) => {
    return time === null
        ? ''
        : ` ${time}`;
};

const colors = [
    'blue',
    'indigo',
    'deep-purple',
    'green',
    'orange',
    'red'
];

// 백엔드의 관점에서 볼때 time과 date를 나눠서 저장하게 되면 변수도 많아질 뿐더러 굉장히 비효율적일 수 밖에 없다. 저장하는 변수의
// 양을 줄일 수 있다면 줄이는게 맞는것이므로 이렇게 합쳐서 저장한다.
const makeEvent = (state, event) => {
    let OnlyKeyID = 0;
    let CheckKeyID = 1;

    let newColor = colors[Math.floor(Math.random() * 6)]
    for (let e of state.events) {
        let MStart = parseInt(e.start.substr(0, 4) + e.start.substr(5, 2) + e.start.substr(8, 2));
        let MEnd = parseInt(e.end.substr(0, 4) + e.end.substr(5, 2) + e.end.substr(8, 2));
        let eventStart = parseInt(event.startDate.substr(0, 4) + event.startDate.substr(5, 2) + event.startDate.substr(8, 2));
        let eventEnd = parseInt(event.endDate.substr(0, 4) + event.endDate.substr(5, 2) + event.endDate.substr(8, 2));
        if ((MStart <= eventStart || eventStart <= MEnd) || (MStart <= eventEnd || eventEnd <= MEnd)) {
            if (e.color === newColor) {
                newColor = colors[Math.floor(Math.random() * 6)]
            }
        }
    }

    for (let e of state.events) {
        if (e.id === CheckKeyID) {
            CheckKeyID++;
            OnlyKeyID = CheckKeyID;
        } else {
            OnlyKeyID = CheckKeyID;
        }
    }
    return {
        id: OnlyKeyID,
        name: event.title,
        content: event.content,
        start: event.startDate + getTime(event.startTime),
        end: event.endDate + getTime(event.endTime),
        color: newColor
        //색은 랜덤으로 지정. 여기서 만약 겹치는 날짜를 가지고 있는 이벤트가 있다면 그 색이 겹치지 않도록 설정하는것도 필요할듯.
    }
};

//이벤트의 양식을 initEvent를 통해 만들어지는 이벤트 양식으로 맞춰준다.
const updateEvent = (event) => {
    return {
        id: event.id,
        startDate: event
            .start
            .substr(0, 10), //합쳐진 배열에서 Date와 Time의 위치는 항상 동일하므로 substr로
        startTime: event
            .start
            .substr(11, 5), //위치를 가져와도 무방하다.
        endDate: event
            .end
            .substr(0, 10),
        endTime: event
            .end
            .substr(11, 5),
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
        title: ''
    }
}

export default {mutations, state, actions};