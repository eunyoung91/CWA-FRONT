<template>

    <div class="title-menu">
        <div class="title-main">
            <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀">
            <span>공지사항</span>
        </div>
    </div>
    <div class="title-sub">
        <img src="https://campus.megastudy.net/admin/image/dot_icon04.png" alt="서브타이틀">
        <span>공지사항 등록</span>
    </div>

    <div class="table-area">
        <table class="type-2">
            <colgroup>
                <col scope="col" width="15%">
                <col scope="col" width="35%">
                <col scope="col" width="15%">
                <col scope="col" width="35%">        
            </colgroup>           
            <tbody>
                <tr>
                    <th scope="col">학원<span></span></th>
                    <td>
                        <b>{{ campusName }}</b>
                    </td>
                    <th scope="col">게시판</th>
                    <td class="brn dis-flex">
                        <select name="bbsgubun" class="select-basic w-200">
                            <option value="<%=BBS_GUBUN_CODE%>">공지사항</option>
                        </select>
                        <input type="checkbox" id="intro" v-model="isIntro"><label for="intro">설명회</label>
                    </td>
                </tr>
                <tr>
                    <th scope="col">등록일</th>
                    <td width="367">
                        <VueDatepicker size="15" :start-date="focusDate" focus-start-date :disabled-dates="disabledDates" v-model="regDate" :format="formatDate2" :key="key"/>
                    </td>
                    <th width="122">사용여부</th>
                    <td class="brn">
                        <div class="dis-flex">
                            <input type="radio" id="use1" v-model="useView" value="Y"><label for="use1">Y</label>
                            <input type="radio" id="use2" v-model="useView" value="N"><label for="use2">N</label>
                        </div> 
                    </td>
                </tr>
                <tr>
                    <th scope="col">반분류</th>
                    <td width="367">
                    <select v-model="classGubun" class="select-basic w-200">
                        <option v-for="c in classList" :key="c.code" :value="c.code">
                        {{ c.name }}
                        </option>
                    </select>
                    </td>
                    <th width="122">작성자</th>
                    <td class="brn">
                        <b>{{ regName }}</b>
                    </td>
                </tr>
                <tr>
                    <th scope="col">HOT 설정</th>
                    <td colspan="3" class="brn">
                        <div class="dis-flex">
                            <input type="radio" id="rad1" v-model="useHot" value="N"><label for="rad1">설정</label>
                            <input type="radio" id="rad2" v-model="useHot" value="Y"><label for="rad2">HOT 아이콘 활성화 노출기간 설정 (설정한 기간동안 게시판 상단에 노출됩니다.)</label>
                        </div>

                        <div id="hot_div" v-if="useHot === 'Y'">
                            <div class="mt10">- 노출기간</div>
                            <div class="dis-flex">
                                <input type="radio" id="per1" v-model="hotPeriod" value="3" @click="fnDateSet(3);"><label for="per1">3일</label>
                                <input type="radio" id="per2" v-model="hotPeriod" value="5" @click="fnDateSet(5);"><label for="per2">5일</label>
                                <input type="radio" id="per3" v-model="hotPeriod" value="7" @click="fnDateSet(7);"><label for="per3">7일</label>
                                <input type="radio" id="per4" v-model="hotPeriod" value="30" @click="fnDateSet(30);"><label for="per4">30일</label>
                                <input type="radio" id="per5" v-model="hotPeriod" value="0"><label for="per5">직접설정</label>

                                <div class="date-picker">
                                    <VueDatepicker
                                        :start-date="focusDate" 
                                        focus-start-date :disabled-dates="disabledDates" v-model="hotSdate" :format="formatDate2" :key="key"
                                    /> 
                                    <span>~</span>
                                    <VueDatepicker
                                        :start-date="focusDate" 
                                        focus-start-date :disabled-dates="disabledDates" v-model="hotEdate" :format="formatDate2" :key="key"
                                    />
                                </div>
                            </div>
                        </div>	
                    </td>
                </tr>

                <tr>
                    <th scope="col">제목</th>
                    <td colspan="3" class="brn">
                        <input name="title" id="title" type="text" class="input-basic w-200" v-model="title">&nbsp;<span id="TitleByteChkView"></span>
                        <span class="noti color-red"> * 태그형식 사용 불가</span>
                    </td>
                </tr>

                <tr>
                    <th scope="col">대표이미지</th>
                    <td colspan="3" class="brn">
                        <div class="file-basic">
                            <input 
                            id="mainImageInput"
                            type="file"
                            class="input-basic"
                            @change="handleMainFileChange"
                            >
                            <div class="file-name">{{ mainFileName }}</div>
                            <label for="mainImageInput">찾아보기</label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td colspan="4" class="brn" id="content">                        
                        <div class="btn-align">
                            <div class="btn-box">
                                <CommonButton 
                                    variant="primary" 
                                    size="small" 
                                >
                                    사이트용
                                </CommonButton>

                                <CommonButton 
                                    variant="primary" 
                                    size="small" 
                                >
                                    모바일용
                                </CommonButton>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" class="brn">
                        <textarea cols="80" name="ck_contents" rows="10" id="editor"></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>




    <div class="fair-info-area">

        <div id="fair_tr1" v-if="isIntro">
            <div class="dis-flex">
                <div>
                    <strong>■ 설명회 기본 정보 & 사전예약 등록</strong>
                </div>
                <div>
                    <CommonButton 
                    variant="primary" 
                    size="small"
                    >
                    설명회 추가 연결
                    </CommonButton>
                </div>
            </div>
        </div>

        <div id="fair_tr1" v-if="isIntro">
            <div class="dis-flex">
                <div>
                    <strong>설명회 코드</strong>&emsp;
                    <input type="text" placeholder="숫자만 입력" class="input-basic w-200" v-model="fairCode" maxlength="4">
                </div>
                <div>
                    <CommonButton 
                    variant="primary" 
                    size="small"
                    >
                    등록
                    </CommonButton>
                </div>
            </div>
            <div class="dis-flex">
                <div>
                    <strong>설명회 코드</strong>&emsp;
                    <input type="text" placeholder="숫자만 입력" class="input-basic w-200" v-model="fairCode" maxlength="4">
                </div>
                <div>
                    <CommonButton 
                    variant="primary" 
                    size="small"
                    >
                    등록
                    </CommonButton>
                </div>
            </div>
        </div>

        <div id="fair_tr2" v-if="isIntro" class="fair-info-notice">
            <div class="color-red">
                * 설명회 사전예약 코드번호를 입력하고 ‘등록’ 버튼을 누르면 작성한 공지 하단에 설명회 기본정보와 사전예약버튼이 노출 됩니다.<br>
                * 설명회 기본정보와 사전예약 내용은 “설명회 사전예약”에서 수정하면 그대로 반영 됩니다.<br>
                * 설명회 코드는 한줄당 한개만 입력해주세요.
            </div>
        </div>
    </div>









    <div class="table-area">
        <table class="type-2">
            <colgroup>
                <col scope="col" width="15%">
                <col scope="col" width="35%">
                <col scope="col" width="15%">
                <col scope="col" width="35%">        
            </colgroup>           
            <tbody>
                <tr>
                    <th valign="top">
                        파일첨부<br>
                        <CommonButton 
                        variant="primary" 
                        size="small"
                        class="mt5"
                        @click.stop="attachAdd"
                        >
                        추가
                        </CommonButton>
                    </th>
                    <td colspan="3" class="brn">
                        <div v-for="(input, index) in fileInputs" :key="index">
                            <div class="file-basic">
                                <input 
                                    :id="'fileInput_' + index"
                                    type="file"
                                    class="input-basic"
                                    @change="handleFileChange($event, index)"
                                >
                                <div class="file-name">{{ input.fileName }}</div>
                                <label :for="'fileInput_' + index">찾아보기</label>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th scope="col">메인노출</th>
                    <td colspan="3" class="brn">
                        <div class="dis-flex">
                            <input type="radio" id="main1" v-model="useViewMain" value="Y"><label for="main1">Y</label>
                            <input type="radio" id="main2" v-model="useViewMain" value="N"><label for="main2">N</label>
                        </div> 
                    </td>
                </tr>
                
                <tr>
                    <th scope="col">노출대상</th>
                    <td colspan="3" class="brn">
                        <div class="dis-flex-col">
                            <div class="show-list first dis-flex">
                                <div class="campus">
                                    <b>학원선택</b>
                                </div>
                                <div class="path">
                                    <input type="checkbox" id="navicodeAll" class="pointer" v-model="navicodeAll" @change="navicodeCheckAllClicked">
                                    <label for="navicodeAll" class="lbl pointer"><b> 모두선택</b></label>
                                </div>
                            </div>

                            <template v-for="gubun in gubunMenu" :key="gubun.code">
                                <div class="show-list dis-flex" v-if="gubun.code === '-1' && gubun.seq > -1"> 
                                    <div v-if="gubun.code === '-1' && gubun.seq > -1" class="campus">
                                        <b>[{{ gubun.campusNameDetail }}]</b>
                                    </div>
                                    <div v-if="gubun.code === '-1' && gubun.seq > -1" class="path">
                                        <ul class="dis-flex">
                                            <template v-for="subgubun in gubunMenu" :key="subgubun.code">
                                                <li class="dis-flex" v-if="subgubun.seq === gubun.seq && Number(subgubun.code) > 0">
                                                    <input type="checkbox" navicode="Y" class="pointer" :id="'chknavicode' + subgubun.code" :value=subgubun.code v-model="subgubun.checked">
                                                    <label :for="'chknavicode' + subgubun.code" class="lbl pointer">{{ subgubun.menuPath }}</label>
                                                </li>
                                            </template>
                                        </ul>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </td>
                </tr> 
            </tbody>
        </table>
    </div>


    <div class="btn-align between">
        <div class="btn-box">
            <CommonButton 
                variant="primary" 
                size="small" 
            >
                삭제
            </CommonButton>
        </div>
        <div class="btn-box">
            <CommonButton 
                variant="primary" 
                size="small" 
            >
                확인
            </CommonButton>
            <CommonButton 
                variant="secondary" 
                size="small" 
            >
                취소
            </CommonButton>
        </div>
    </div>

</template>

<script>
import axiosInstance from '@/axios';
import { useLayoutStore } from '@/store/LayoutStore';
import VueDatepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    components:{
        VueDatepicker
    },
    data() {
        return {
            activeKey: 'pc',
            code: this.$route.query.code,
            campusDetailCode: this.$route.query.campusDetailCode,
            title: '',
            contentsPc: '',
            contentsMobile: '',
            classGubun: '',
            regName: '',
            regDate: new Date(),
            campusName: '',
            useView: 'Y',
            useViewMain: 'Y',
            useHot: 'N',
            gubunMenu: [],
            cnt: 0,
            targetMenu: [],
            classList: [],
            key: 0,
            isIntro: true,
            fairTitle: '',
            fairCode: null,
            hotSdate: null,
            hotEdate: null,
            hotPeriod: 0,
            focusDate: new Date(),
            noticeTopImage: 'https://img.megastudy.net/campus/library/v2015/library/notice/notice_211208.jpg',
            noticeReservationImage: '',
            noticeBottomImage: 'https://img.megastudy.net/campus/library/v2015/library/notice/notice_bnr_211208.jpg',
            noticeBottomLinkPC: 'https://campus.megastudy.net/',
            noticeBottomLinkMO: 'https://mcampus.megastudy.net/',
            noticeBottomLink: '',
            noticeBottomImageStyle: '',
            navicodeAll: false,

            currentMode: 'pc',
            
            //파일추가
            mainFileName: '',
            fileInputs: [
                { fileName: '' }  // ← 기본 1개
            ]


        };
    },
    watch: {
        '$route.query.code': 'fetchData',
        regDate() {
            this.key += 1;
        }
    },
    created(){
        if (this.$route.query.code === "" || this.$route.query.campusDetailCode === ""){
            const layoutStore = useLayoutStore();

            this.campusName = '하단 노출대상 선택';
            this.regName = layoutStore.username;
        }
        else { 
            this.fetchData();
        }

        this.getGubunMenu();
        this.getClassList();
        
    },
    mounted() {
        window.CKEDITOR.replace('editor', {
            width: '100%',
            height: '400px',	
            versionCheck: false,
            allowedContent: true,
            enterMode: window.CKEDITOR.ENTER_BR,
            shiftEnterMode: window.CKEDITOR.ENTER_BR,
            extraAllowedContent: 'img[*]{*}; iframe[*]{*}; script[*]',
            fullPage: false,
            toolbar: [
            { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print'] },
            { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'Undo', 'Redo'] },
            { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll'] },
            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat'] },
            { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'] },
            { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
            { name: 'styles', items: ['Styles', 'Format'] },
            { name: 'tools', items: ['Maximize'] },
            ],
            removePlugins: 'elementspath'
        });

        window.CKEDITOR.instances.editor.on('change', () => {
            this.onEditorChange();
        })
        // 초기 파일 이름을 비워놓음
        // this.fileName = '';

    },
    beforeUnmount() {
        if (window.CKEDITOR.instances.editor){
            window.CKEDITOR.instances.editor.destroy();
        }
    },
    methods: {

        //파일추가
        handleMainFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.mainFileName = file.name;
            }
        },
        attachAdd() {
             console.log('파일 추가 호출됨');
            this.fileInputs.push({ fileName: '' });
        },
        handleFileChange(event, index) {
            const file = event.target.files[0];
            if (file) {
            this.fileInputs[index].fileName = file.name;
            }
        },

        onEditorChange(){
            if (this.activeKey === 'pc'){
                this.contentsPc = window.CKEDITOR.instances.editor.getData();
            }else if (this.activeKey === 'mo'){
                this.contentsMobile = window.CKEDITOR.instances.editor.getData();
            }
        },
        setCurrentWriteMode(type) {
            this.activeKey = type;
            if (type === 'mo'){
                window.CKEDITOR.instances.editor.setData(this.contentsMobile);
            } else if (type === 'pc'){
                window.CKEDITOR.instances.editor.setData(this.contentsPc);
            }
        },
        fetchData() {
            const code = this.code;
            const campusDetailCode = this.campusDetailCode;

            axiosInstance.get('/api/campus/campus-notice-write', {
                params: {code, campusDetailCode},
                withCredentials: true
            })
            .then(response => {
                this.title = response.data.title;
                this.contentsPc = response.data.contentsPc;
                this.contentsMobile = response.data.contentsMobile;
                this.classGubun = response.data.classGubun;
                this.regName = response.data.regName;
                this.campusName = response.data.campusName;
                this.regDate = response.data.regDate;
                this.campusName = response.data.campusName;
                this.useView = response.data.useView;
                this.useViewMain = response.data.useViewMain;
                this.useHot = response.data.useHot;
                this.cnt = response.data.cnt;

                if (this.cnt > 1){
                    this.campusName += ' 외 ' + (this.cnt-1).toString();
                }

                if (this.cnt == 23){
                    this.navicodeAll = true;
                }

                window.CKEDITOR.instances.editor.setData(this.contentsPc);
            })
            .catch(error => {
                console.error(error);
            })
        },
        getGubunMenu(){
            axiosInstance.get('/api/campus/gubunmenu', {withCredentials: true})
            .then(response => {
                this.gubunMenu = response.data;
                console.log(this.gubunMenu);

                axiosInstance.get('/api/campus/target-navi-code', {params: {code: this.code}, withCredentials: true})
                .then(response => {
                    this.targetMenu = response.data;

                    this.gubunMenu.forEach(menu => {
                        menu.checked = this.targetMenu.includes(menu.code);
                    })
                })
            })
        },
        formatDate2(date){
            return date.toLocaleDateString("ko-KR");
        },
        disabledDates(date){
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return date < today;
        },
        getClassList(){
            axiosInstance.get('/api/campus/class-list', {withCredentials: true})
            .then(response => {
                this.classList = response.data
            })
        },
        getFairTitle(code) {
            axiosInstance.get('/api/campus/fair-title', {params: {code}, withCredentials: true})
            .then(response => {
                this.fairTitle = response.data.fairTitle;
                if (response.data.cancelYn === 'Y'){
                    this.fairTitle += ' (취소)'
                }
            })
        },
        countNavi(){
            let cnt = 0;
            this.gubunMenu.forEach(menu => {
                if (menu.checked) {
                    cnt += 1;
                }
            })
            return cnt;
        },
        fnDateSet(period) {
            var result = new Date(this.regDate);
            result.setDate(result.getDate() + period-1);

            this.hotSdate = this.regDate;
            this.hotEdate = result;
        },
        checkSave() {
            if (this.regDate == '') {
                alert("등록일을 지정해주세요.");
                return;
            }

            if (this.classGubun == '') {
                alert("반분류를 선택해주세요.");
                return;
            }

            if (this.title == '') {
                alert("제목을 입력해주세요.");
                return;
            }

            if (this.contentsPc == '') { 
                alert("사이트용 내용을 입력하셔야 합니다.");
                return;
            }

            if (this.contentsMobile == '') {
                // 모바일 내용이 입력되지 않은 경우, PC용 내용을 모바일 버전에 그대로 복사
                this.contentsMobile = this.contentsPc;
            }

            if (this.countNavi() === 0) {
                alert("노출대상 게시판을 1개이상 선택하셔야 합니다");
                return;
            }

            if (this.isIntro && this.fairTitle == '') {
                alert("설명회 코드를 확인해주세요.");
                return;
            }

            if (this.useHot == "Y"){
                if (this.hotSdate == null || this.hotEdate == null) {
                    alert("사용기간을 입력해주세요");
                    return;
                }

                if (this.hotSdate > this.hotEdate){
                    alert("시작일은 마감일보다 이전 일로 설정해주세요.");
                    return;
                }
            }

            const codeLst = [];

            this.gubunMenu.forEach(menu => {
                if (menu.checked){
                    codeLst.push(menu.code);
                }
            })

            console.log(codeLst)
            
            const message = {
                code : this.code,
                title : this.title,
                contentsPc : this.contentsPc,
                contentsMobile : this.contentsMobile,
                summary : this.summary,
                classGubun : this.classGubun,
                subjectGubun : this.subjectGubun,
                campuslifeGubun : this.campuslifeGubun,
                regCode : this.regCode,
                regName : this.regName,
                useView : this.useView,
                useViewMain : this.useViewMain,
                useHot : this.useHot,
                useOnline : this.useOnline,
                loginFg : this.loginFg,
                hit : this.hit,
                regYear : new Date(this.regDate).getFullYear(),
                regMonth : new Date(this.regDate).getMonth() + 1,
                regDate : this.regDate,
                fairCode : this.fairCode,
                occurDate : this.occurDate,
                seasonGubun : this.seasonGubun,
                hotPeriod : this.hotPeriod,
                hotSdate : this.hotSdate,
                hotEdate : this.hotEdate,
                useDate : this.useDate,
                sdate : this.sdate,
                edate : this.edate,
                codeLst: codeLst
            }

            axiosInstance.post('/api/campus/campus-bbs-save', message, {withCredentials:true})
            .then(response => {
                if (response.data == 1){
                    this.$router.go(-1);
                }
                else {
                    alert("저장에 실패하였습니다.");
                }
            })
        },
        getFairStringFormat(){
            //설명회 설정 문자열 반환 함수
			let stringData = ""; //editor에 입력될 문자열

            if(this.activeKey === 'pc'){
                this.noticeBottomLink = "location.href='" + this.noticeBottomLinkPC + "'";
                this.noticeReservationImage = "http://campus.megastudy.net/Data/editor/img/39908_20180518170435.jpg";
                if(this.noticeBottomLinkPC != ""){
                    this.noticeBottomImageStyle = "cursor : pointer;";
                }
            }
            else if(this.activeKey === 'mo'){
                this.noticeBottomLink = "location.href='" + this.noticeBottomLinkMO + "'";
                this.noticeReservationImage = "http://campus.megastudy.net/Data/editor/img/20133_20201102091002.jpg";
                if(this.noticeBottomLinkMO != ""){
                    this.noticeBottomImageStyle = "cursor : pointer;";
                }
            }
            else{
                alert("오류가 발생합니다");
                return ;
            }

            /* eslint-disable no-useless-escape */
            stringData = `
                <img src="${this.noticeTopImage}" /><br>
                <img src="${this.noticeReservationImage}" /><br>

                <iframe id="iframeFairView"></iframe><br>
                <script>
                    $(document).ready(function() {
                        // type -> 구분없음 : null / 재정 : N / 재학 : J (재학만 표시해도 구분처리됨)
                        // notice -> null 일 경우 팝업 / 그 외 공지사항
                        // url -> 바로 보내야할 url이 존재할경우 추가(notice값 무관하게 우선순위) {fair : "1234", notice : "19494", type : "N", url : "https://campus.megastudy.net/common/notice/report.asp"},
                        //마감된 설명회는 노출되지 않게 되어있음
                        
                        vArrCode = [
                            //{fair : "1234", notice : "19494", type : "N"}
                            //, {fair : "1235", notice : "19495", type : "J"}
                        ]
                        
                        fnFairNotice();
                    });
                <\/script><br>

                <img src="${this.noticeBottomImage}" onclick="${this.noticeBottomLink}" style="${this.noticeBottomImageStyle}"/><br>
            `;

            stringData = stringData.replace(/ {16}/g, "");

            if (confirm("이미 작성된 내용이 있습니다\n덮어 쓰시겠습니까?") == true){
                this.contentsPc = stringData;
                this.contentsMobile = stringData;
                window.CKEDITOR.instances.editor.setData(this.contentsPc);
                window.CKEDITOR.instances.editor.setData(this.contentsMobile);
            }
        },
        navicodeCheckAllClicked(){
            if (this.navicodeAll){
                this.gubunMenu.forEach(menu => {
                    if (menu.code != -1){
                        menu.checked = true;
                    }
                })
            } else {
                this.gubunMenu.forEach (menu => {
                    menu.checked = false;
                })
            }
        },
    }
};
</script>
