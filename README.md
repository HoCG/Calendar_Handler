# calendar_handler

😺vuetify에서 제공하고있는 캘린더 기능을 활용해서 깔끔하게 일정을 보여주는 프로그램을 제작하는 프로젝트입니다.

😺먼저 간단하게 처음 화면을 보여드리겠습니다. 화면은 아래와 같이 구성되어있습니다. 메인으로 사용된 캘린더 컴포넌트가 화면 대부분을 구성하고 있으며 앱바가 위를 잡아준 형태입니다.

<img width="764" alt="화면1" src="https://user-images.githubusercontent.com/52379503/137090630-7d211350-d75d-4c26-9707-046395f7c933.PNG">

😺두번째입니다. 만약 여기서 캘린더에 날짜중 하나를 클릭하거나 아래에 있는 일정추가 버튼을 누른다면 일정추가 다이얼로그가 나오게 됩니다. 여기서 작성하고싶은 정보들을 작성해주시고 DatePicker와 TimePicker를 통해 날짜와 시간을 지정해주시면 정상적으로 적용할 수 있습니다.

<img width="891" alt="화면2" src="https://user-images.githubusercontent.com/52379503/137091096-1e5eac5a-226f-4dbf-8109-45281c8a9491.PNG">

😺이렇게 정상적으로 일정이 추가된 것을 확인할 수 있답니다.

<img width="648" alt="화면3" src="https://user-images.githubusercontent.com/52379503/137091168-7839a7ea-aace-4bd6-8995-782c6ea56852.PNG">

😺그리고 일정을 누르게 되면 자세한 정보를 확인할 수 있는 다이얼로그가 출력되는데 이 다이얼로그내에 수정, 삭제, 닫기버튼을 통해 자유롭게 원하는 기능을 수행할 수 있습니다.

<img width="660" alt="화면4" src="https://user-images.githubusercontent.com/52379503/137091363-d1378f0f-e3a1-4a8e-8fbe-990dcf77a013.PNG">

😺저는 한번 수정버튼을 눌렀다고 가정해보겠습니다. 그럼 아래와 같이 일정추가를 할때 출력되었던 다이얼로그가 동일하게 출력되는것을 볼 수 있습니다. 하지만, 추가할때와는 다르게 해당 일정의 내용들이 이미 기입된 상태이며, 추가버튼이 수정버튼으로 변한점을 확인하실 수 있습니다.

<img width="688" alt="화면5" src="https://user-images.githubusercontent.com/52379503/137091756-3fdd6398-a579-4fa7-991e-d1a4581a2cbc.PNG">

😺최종적으로 다이얼로그내에 수정버튼을 누른다면 일정이 수정되어 반영된것을 확인할 수 있습니다.

<img width="662" alt="화면6" src="https://user-images.githubusercontent.com/52379503/137091974-296f96ef-ba00-4fa3-8a41-15bc64bc15a7.PNG">

😺삭제를 원한다면 일정을 누르고 자세한 정보를 담은 다이얼로그가 나왔을때 삭제버튼을 누르시면 됩니다.

<img width="635" alt="화면7" src="https://user-images.githubusercontent.com/52379503/137092072-2f043673-d054-435e-a40b-46ea7d2d33ed.PNG">

😺캘린더에 대한 더 자세한 정보는 https://vuetifyjs.com/en/components/calendars/ 해당 문서에서 확인 가능합니다.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
