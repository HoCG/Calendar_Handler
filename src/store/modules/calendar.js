const state = {
    event: initEvent(), //새롭게 등록될 이벤트, 혹은 현재 이벤트.
    events: [], //저장된 일정들을 담는 배열.
    eventAddDialog: false, //추가 다이얼로그를 위한 변수
    eventDetailDialog: false, //날짜 클릭시 나오는 다이얼로그를 위한 변수
    eventAddDialogUpdateMode: false, //수정 모드일때에 다이얼로그를 위한 변수
    eventDetail: {}
};

//사용되는 동작들
const mutations = {
    //다이얼로그를 열때(이벤트 생성 다이얼로그)
    OPEN_DIALOG(state, payload) {
        state.event.startDate = payload.date;
        state.event.startTime = payload.time;
        state.eventAddDialog = true;
    },

    //다이얼로그를 닫을때
    CLOSE_DIALOG(state) {
        state.eventAddDialog = false;
    },

    //이벤트를 수정하는 동작이다. 클릭된 일정에 id가 일치하지 않는 event를 events내에서 찾아내고
    //찾아낸 이벤트값들로 events 배열을 재구성하고 최종적으로 수정된 event를 집어넣어주면 끝이다.
    UPDATE_EVENT(state, getEvent) {
        state.events = state
            .events
            .filter(e => e.id !== getEvent.id); //이벤트배열의 재구성.
        getEvent = makeEvent(state, getEvent); //그리고 배열을 추가.
        state
            .events
            .push(getEvent);
        state.eventAddDialogUpdateMode = false
        state.eventAddDialog = false;
        state.event = initEvent();
    },

    //이벤트를 추가하는 과정.
    ADD_EVENT(state, getEvent) {
        getEvent = makeEvent(state, getEvent);
        state
            .events
            .push(getEvent);
        state.eventAddDialog = false;
        state.event = initEvent();
    },

    //쓰는일이 없는 함수이지만, 혹시몰라서 냅둠.
    ADD_EVENTS(state, events) {
        state.events = [];
        events.forEach(e => {
            state
                .events
                .push(makeEvent(state, e));
        });
    },
    
    //바를 클릭했을때 나오는 디테일한 정보를 알려주는 다이얼로그를 보여주는 변수.
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

    //이벤트를 업데이트하는 다이얼로그를 출력하게 도와주는 함수.
    UPDATE_EVENT_BY_DETAIL(state, getEvent) {
        state.event = updateEvent(getEvent);
        state.eventDetailDialog = false;
        state.eventAddDialogUpdateMode = true; //이벤트를 추가하는 다이얼로그를 출력하긴 한다만,
        state.eventAddDialog = true; //이게 업데이트하는 모드라는걸 알려주기 위해서 이렇게한다.
    },

    //디테일 이벤트를 닫는 함수.
    CLOSE_EVENT_ABOUT_DETAIL(state) {
        state.eventDetailDialog = false;
        state.event = initEvent();
    },

    //이벤트를 삭제하는 함수. 디테일 다이얼로그내에서 진행되는 동작이기때문에 state.eventDetailDialog = false;
    //다음과같은 변수선언이 존재한다.
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
    //색이 겹치는 특수한 경우를 위해 색이 겹치지 않도록 만든 부분이다. 주목해야 할 점은 바에 특정부분이 조금이라도 겹친다면
    //해당 부분을 통해 색을 바꾼다는 점이다. 원래는 이를 함수화해야하지만 그 과정이 길어지기 때문에 생략하게 되었다.
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

//이벤트의 형태를 잡아주는 변수.
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