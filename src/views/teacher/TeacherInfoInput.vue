<template>
    <div class="title-menu">
        <div class="title-main">
            <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀" />
            <span>강사정보 관리</span>
        </div>
    </div>
    <div class="title-sub">
        <img src="https://campus.megastudy.net/admin/image/dot_icon04.png" alt="서브타이틀">
        <span>강사정보</span>
    </div>

    <div class="table-area">
        <form ref="infoForm" @submit.prevent="allSave">

            <table class="type-2">
                <colgroup>
                    <col width="12%">
                    <col width="auto">     
                </colgroup> 
                <tbody>
                    <tr>
                        <th>강사명</th>
                        <td class="brn">
                            {{ tcData.tcName }}
                        </td>
                    </tr>
                    <tr>
                        <th>강좌맛보기</th>
                        <td class="brn">
                            <table class="type-3">
                                <colgroup>
                                    <col style="width:auto" span="5">
                                    <col style="width:180px;">   
                                    <col style="width:80px;">   
                                    <col style="width:110px;">   
                                </colgroup>       
                                <thead>
                                    <tr>
                                        <th scope="col">학원</th>
                                        <th scope="col">학원분류</th>
                                        <th scope="col">영역</th>
                                        <th scope="col">세부과목</th>
                                        <th scope="col">반분류</th>
                                        <th scope="col">강좌 맛보기/<br>영상코드</th>
                                        <th scope="col">노출여부</th>
                                        <th scope="col">수정/저장</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="info in teacherInfoInput"
                                        :key="info.code"
                                    >
                                        <td>{{ info.tcCname }}</td>
                                        <td>{{ info.tcNameDetail }}</td>
                                        <td>{{ info.tcAreaName }}</td>
                                        <td>{{ info.tcIcon }}</td>
                                        <td>{{ info.tcClass }}</td>
                                        <td>
                                        <input
                                            v-model="info.tiMvCode"
                                            type="text"
                                            class="input-basic"
                                            :name="'mov_code_' + info.code"
                                            size="20"
                                            tabindex="1"
                                        >
                                        </td>
                                        <td>
                                            <div class="dis-flex center">
                                                <input
                                                    v-model="info.tiMvOk"
                                                    type="radio"
                                                    :value="'Y'"
                                                    :name="'mv_ok_' + info.code"
                                                    :checked="info.tiMvOk === 'Y' || info.tiMvOk != null"
                                                    id="mv_ok_Y"
                                                ><label for="mv_ok_Y">Y</label>
                                                <input
                                                    v-model="info.tiMvOk"
                                                    type="radio"
                                                    :value="'N'"
                                                    :name="'mv_ok_' + info.code"
                                                    :checked="info.tiMvOk !== 'Y'"
                                                    id="mv_ok_N"
                                                ><label for="mv_ok_N">N</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="btn-box center">
                                                <CommonButton 
                                                    variant="secondary" 
                                                    size="small"
                                                    @click="cancelBtn"
                                                >
                                                    취소
                                                </CommonButton>
                                                <CommonButton 
                                                    variant="primary" 
                                                    size="small"
                                                    @click="movSave(info, info.code)"
                                                >
                                                    저장
                                                </CommonButton>
                                            </div> 
                                        </td>
                                    </tr>
                                </tbody>   
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th>커리큘럼</th>
                        <td class="brn">
                            <table class="type-3">
                            <colgroup>
                                    <col style="width:auto" span="5">
                                    <col style="width:180px;">   
                                    <col style="width:80px;">   
                                    <col style="width:110px;">   
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>학원</th>
                                        <th>학원분류</th>
                                        <th>영역</th>
                                        <th>세부과목</th>
                                        <th> 반분류</th>
                                        <th>커리큘럼 파일등록</th>
                                        <th>노출여부</th>
                                        <th>수정/저장</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="info in teacherInfoInput"
                                        :key="info.code"
                                    >
                                        <td>{{ info.tcCname }}</td>
                                        <td>{{ info.tcNameDetail }}</td>
                                        <td>{{ info.tcAreaName }}</td>
                                        <td>{{ info.tcIcon }}</td>
                                        <td>{{ info.tcClass }}</td>
                                        <td>
                                            <div class="dis-flex center">
                                                <div class="file-basic">
                                                    <input
                                                        :id="'2' + + info.code"
                                                        :ref="'curri_file_' + info.code"
                                                        type="file"
                                                        name=""
                                                        style="display: none;"
                                                        @change="changeFile($event, '2', info)"
                                                    >
                                                    <input
                                                        v-model="info.tiCurriFile"
                                                        type="text"
                                                        tabindex="1"
                                                        class="input-basic w-90"
                                                        :data-id="2"
                                                    >
                                                    <label :for="'2' + + info.code">찾아보기</label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="dis-flex center">
                                                <input
                                                    v-model="info.tiCurriOk"
                                                    type="radio"
                                                    :value="'Y'"
                                                    :name="'curri_ok_' + info.code"
                                                    :checked="info.tiCurriOk === 'Y' || info.tiCurriOk != null"
                                                    id="curri_ok_Y"
                                                ><label for="curri_ok_Y">Y</label>
                                                <input
                                                    v-model="info.tiCurriOk"
                                                    type="radio"
                                                    :value="'N'"
                                                    :name="'curri_ok_' + info.code"
                                                    :checked="info.tiCurriOk !== 'Y'"
                                                    id="curri_ok_N"
                                                ><label for="curri_ok_N">N</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="btn-box center">
                                                <CommonButton 
                                                    variant="secondary" 
                                                    size="small"
                                                    @click="cancelBtn"
                                                >
                                                    취소
                                                </CommonButton>
                                                <CommonButton 
                                                    variant="primary" 
                                                    size="small"
                                                    @click="curriSave(info, info.code)"
                                                >
                                                    저장
                                                </CommonButton>
                                            </div> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="3">
                                            커리큘럼 일괄등록
                                        </th>
                                        <td colspan="5">
                                            <div class="dis-flex">
                                                <div class="file-basic flex-1">
                                                    <input
                                                        id="30"
                                                        type="file"
                                                        name=""
                                                        style="display: none;"
                                                        @change="changeFile($event, '3', info)"
                                                    >
                                                    <input
                                                        v-model="batchCurri"
                                                        type="text"
                                                        tabindex="1"
                                                        class="input-basic"
                                                        data-id="30"
                                                    >
                                                    <label for="30">찾아보기</label>
                                                </div>

                                                <CommonButton 
                                                    variant="primary" 
                                                    size="small"
                                                    @click="curriBatchSave"
                                                >
                                                    등록
                                                </CommonButton>
                                            </div>
                                            <p class="noti">
                                                ※ 커리큘럼 등록할 학원을 체크하고 등록하면 일괄적으로 등록됩니다.
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th>선생님 한마디</th>
                        <td class="brn">
                            <table class="type-3">
                            <colgroup>
                                    <col style="width:auto" span="5">
                                    <col style="width:180px;">   
                                    <col style="width:80px;">   
                                    <col style="width:110px;">   
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>학원</th>
                                        <th>학원분류</th>
                                        <th>영역</th>
                                        <th>세부과목</th>
                                        <th>반분류</th>
                                        <th>선생님 한마디</th>
                                        <th>노출여부</th>
                                        <th>수정/저장</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="info in teacherInfoInput"
                                        :key="info.code"
                                    >
                                        <td>{{ info.tcCname }}</td>
                                        <td>{{ info.tcNameDetail }}</td>
                                        <td>{{ info.tcAreaName }}</td>
                                        <td>{{ info.tcIcon }}</td>
                                        <td>{{ info.tcClass }}</td>
                                        <td>
                                            <textarea
                                                Class="textarea-basic"
                                                v-model="info.tiSloganTxt1" 
                                                rows="5"
                                                :name="'slogan_txt1_' + info.code"
                                            />
                                        </td>
                                        <td>
                                            <div class="dis-flex center">
                                                <input
                                                    v-model="info.tiSloganOk"
                                                    type="radio"
                                                    :value="'Y'"
                                                    :name="'slogan_ok_' + info.code"
                                                    :checked="info.tiSloganOk === 'Y' || info.tiSloganOk != null"
                                                    id="slogan_ok_Y"
                                                ><label for="slogan_ok_Y">Y</label>
                                                <input
                                                    v-model="info.tiSloganOk"
                                                    type="radio"
                                                    :value="'N'"
                                                    :name="'slogan_ok_' + info.code"
                                                    :checked="info.tiSloganOk !== 'Y'"
                                                    id="slogan_ok_N"
                                                ><label for="slogan_ok_N">N</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="btn-box center">
                                                <CommonButton 
                                                    variant="secondary" 
                                                    size="small"
                                                    @click="cancelBtn"
                                                >
                                                    취소
                                                </CommonButton>
                                                <CommonButton 
                                                    variant="primary" 
                                                    size="small"
                                                    @click="sloganSave(info, info.code)"
                                                >
                                                    저장
                                                </CommonButton>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="3">
                                        선생님 한마디 일괄등록
                                        </th>
                                        <td colspan="5">
                                            <div class="dis-flex">
                                                <textarea
                                                    Class="textarea-basic"
                                                    id="textarea2"
                                                    v-model="batchSlogan"
                                                    name="slogan_txt1_all"
                                                    rows="5"
                                                /> 
                                                <CommonButton 
                                                    variant="primary" 
                                                    size="small"
                                                    @click="sloganBatchSave"
                                                >
                                                    등록
                                                </CommonButton>
                                            </div>

                                            <p class="noti">※ 선생님한마디 내용은 200글자 까지 입력 가능합니다.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th>Q&amp;A게시판</th>
                        <td class="brn">
                            <table class="type-3">
                                <colgroup>
                                    <col style="width:auto" span="5">
                                    <col style="width:80px;">   
                                    <col style="width:80px;">   
                                    <col style="width:110px;">   
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>학원</th>
                                        <th>학원분류</th>
                                        <th>영역</th>
                                        <th>세부과목</th>
                                        <th>반분류</th>
                                        <th>Q&amp;A 사용여부</th>
                                        <th>학습자료실 사용여부</th>
                                        <th>수정/저장</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="info in teacherInfoInput"
                                        :key="info.code"
                                    >
                                        <td>{{ info.tcCname }}</td>
                                        <td>{{ info.tcNameDetail }}</td>
                                        <td>{{ info.tcAreaName }}</td>
                                        <td>{{ info.tcIcon }}</td>
                                        <td>{{ info.tcClass }}</td>
                                        <td>
                                            <div class="dis-flex center">
                                                <input
                                                    v-model="info.tsQnaOk"
                                                    type="radio"
                                                    :value="'Y'"
                                                    :name="'qna_ok_' + info.code"
                                                    :checked="info.tsQnaOk === 'Y' || info.tsQnaOk != null"
                                                    id="qna_ok_Y"
                                                ><label for="qna_ok_Y">Y</label>
                                                <input
                                                    v-model="info.tsQnaOk"
                                                    type="radio"
                                                    :value="'N'"
                                                    :name="'qna_ok_' + info.code"
                                                    :checked="info.tsQnaOk !== 'Y'"
                                                    id="qna_ok_N"
                                                ><label for="qna_ok_N">N</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="dis-flex center">
                                                <input
                                                    v-model="info.tsPdsOk"
                                                    type="radio"
                                                    :value="'Y'"
                                                    :name="'pds_ok_' + info.code"
                                                    :checked="info.tsPdsOk === 'Y' || info.tsPdsOk != null"
                                                    id="pds_ok_Y"
                                                ><label for="pds_ok_Y">Y</label>
                                                <input
                                                    v-model="info.tsPdsOk"
                                                    type="radio"
                                                    :value="'N'"
                                                    :name="'pds_ok_' + info.code"
                                                    :checked="info.tsPdsOk !== 'Y'"
                                                    id="pds_ok_N"
                                                ><label for="pds_ok_N">N</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="btn-box center">
                                                <CommonButton 
                                                    variant="secondary" 
                                                    size="small"
                                                    @click="cancelBtn"
                                                >
                                                    취소
                                                </CommonButton>
                                                <CommonButton 
                                                    variant="primary" 
                                                    size="small"
                                                    @click="qnaSave(info, info.code)"
                                                >
                                                    저장
                                                </CommonButton>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th>캠퍼스ID</th>
                        <td class="brn">
                            <div class="dis-flex">
                                <input
                                v-model="tcData.tcId"
                                name="tcId"
                                type="text"
                                tabindex="1"
                                class="input-basic w-200"
                                >
                                <CommonButton 
                                    variant="primary" 
                                    size="small"
                                    @click="openPopup('teacherIdSearch')"
                                >
                                    검색
                                </CommonButton>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>학력/약력</th>
                        <td class="brn">
                            <textarea
                            Class="textarea-basic"
                            v-model="tcData.tcSpecSchool"
                            name="tcSpecSchool"
                            rows="5"
                            />
                            <p class="noti">
                                ※ 학력/약력 입력 시 줄내림은 엔터키로 적용됩니다.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th>저서</th>
                        <td class="brn">
                            <textarea
                            Class="textarea-basic"
                            v-model="tcData.tcSpecBook"
                            name="tcSpecBook"
                            rows="5"
                            />
                            <p class="noti">
                                ※ 저서 입력 시 줄내림은 엔터키로 적용됩니다.
                            </p>
                        </td>
                    </tr>
                    <tr>
                    <th>수강생추천</th>
                        <td class="brn">
                        <table class="type-3">
                            <colgroup>
                                <col style="width:auto" span="5">
                                <col style="width:180px;">   
                                <col style="width:80px;">   
                                <col style="width:110px;">   
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>학원</th>
                                    <th>학원분류</th>
                                    <th>영역</th>
                                    <th>세부과목</th>
                                    <th>반분류</th>
                                    <th>수강생추천<br>파일등록</th>
                                    <th>노출여부</th>
                                    <th>수정/저장</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="info in teacherInfoInput"
                                    :key="info.code"
                                >
                                    <td>{{ info.tcCname }}</td>
                                    <td>{{ info.tcNameDetail }}</td>
                                    <td>{{ info.tcAreaName }}</td>
                                    <td>{{ info.tcIcon }}</td>
                                    <td>{{ info.tcClass }}</td>
                                    <td>
                                        <div class="dis-flex center">
                                            <div class="file-basic">
                                                <input
                                                    :id="'4' + info.code"
                                                    :ref="'recomm_file_' + info.code"
                                                    type="file"
                                                    name=""
                                                    style="display: none;"
                                                    @change="changeFile($event, '4', info)"
                                                >
                                                <input
                                                    v-model="info.tiRecommFile"
                                                    type="text"
                                                    tabindex="1"
                                                    class="input-basic w-90"
                                                    :data-id="4"
                                                >
                                                <label :for="'4' + info.code">찾아보기</label>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="dis-flex center">
                                            <input
                                                v-model="info.tiRecommOk"
                                                type="radio"
                                                :value="'Y'"
                                                :name="'recomm_ok_' + info.code"
                                                :checked="info.tiRecommOk === 'Y' || info.tiRecommOk === null"
                                                id="recomm_ok_Y"
                                            ><label for="recomm_ok_Y">Y</label>
                                            <input
                                                v-model="info.tiRecommOk"
                                                type="radio"
                                                :value="'N'"
                                                :name="'recomm_ok_' + info.code"
                                                :checked="info.tiRecommOk === 'N'"
                                                id="recomm_ok_N"
                                            ><label for="recomm_ok_N">N</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="btn-box center">
                                            <CommonButton 
                                                variant="secondary" 
                                                size="small"
                                                @click="cancelBtn"
                                            >
                                                취소
                                            </CommonButton>
                                            <CommonButton 
                                                variant="primary" 
                                                size="small"
                                                @click="recommSave(info, info.code)"
                                            >
                                                저장
                                            </CommonButton>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
            </table>

        </form>
    </div>


    <div class="btn-align">
        <div class="btn-box center">
            <CommonButton 
                variant="secondary" 
                size="small"
                onclick="location.href='/teacher/teacher-info-list'"
            >
                취소
            </CommonButton>
            <CommonButton 
                variant="primary" 
                size="small"
                @click="allSave"
            >
                저장
            </CommonButton>
        </div>
    </div>

    <TeacherIdSearch
        :visible="popups.teacherIdSearch"
        @close="closePopup('teacherIdSearch')"
    />

</template>

<script>
    import axiosInstance from '@/axios';
    import TeacherIdSearch from '@/views/teacher/TeacherIdSearch.vue'; 

    export default {
        components:{
            TeacherIdSearch
        },
        data() {
            return {
                teacherInfoInput: [

                ],
                tcData: {},
                tcCode: this.$route.query.tcCode,
                batchCurri: "",
                batchSlogan: "",
                tiRecommFile : "",

                popups: {
                    teacherIdSearch: false,
                }
            };
        },
        watch: {
            '$route.query.tcCode': 'fetchData'
        },
        created(){
            this.fetchData();
        },
        methods: {

            fetchData(){
                const tcCode = this.tcCode;

                console.log(tcCode);
                axiosInstance.get('/api/teacher/teacher-info-input', {
                    params: {tcCode},
                    withCredentials: true
                })
                .then(response => {
                    this.teacherInfoInput = response.data.teacherInfoInput;
                    this.tcData = response.data.tcData;

                    this.teacherInfoInput.forEach(t => {
                    t.append("delCurri", false);
                    t.append("delRecomm", false);
                    })

                })
                .catch(error => {
                console.error(error);
                });
            },
            // search(){
            //     const url = '/teacher/search';
            //     window.open(url, 'searchWindow', 'width=480, height=580');

            //     window.addEventListener('message', (event) => {
            //         if (event.origin === window.location.origin){ 
            //         this.tcData.tcId = event.data.uid;
            //         }
            //     })
            // },

            cancelBtn(){
                location.reload();
            },

            movSave(info, mcode){
                if (mcode == ''){
                    alert('해당코드가 없습니다.');
                    return;
                }else{
                    const payload = {
                        mode: "perMove",
                        subCode: mcode,
                        [`mov_code_${info.code}`]: info.tiMvCode,
                        [`mv_ok_${info.code}`]: info.tiMvOk
                    };

                    axiosInstance.post('/api/teacher/teacher-info-regx', payload, {
                    withCredentials: true
                    })
                    .then(response => {
                        if (response.data == "save successful"){
                            alert("강좌 맛보기 저장 성공");
                        } else {
                            alert("저장실패");
                        }

                    })
                    .catch(error => {
                    console.error(error);
                    });
                }
            },

            curriSave(info, mcode){
                console.log(this.$refs);
                console.log('curri_file_' + mcode);
                if (!info.delCurri){
                    info.delCurri=false;
                }
                if (mcode == ''){
                    alert('해당코드가 없습니다.');
                    return;
                }else{
                    const payload = {
                    mode: "perCurri",
                    subCode: mcode,
                    [`curri_ok_${info.code}`]: info.tiCurriOk,
                    [`curri_file_${info.code}`]: info.tiCurriFile,
                    [`curri_Delfile_${info.code}`]: info.delCurri,
                    [`curri_del_file_${info.code}`]: info.tiCurriFile
                    };

                    axiosInstance.post('api/teacher/teacher-info-regx', payload, {
                    withCredentials: true
                    })
                    .then(response => {
                    if (response.data == "save successful"){
                        alert("강좌 맛보기 저장 성공");
                        if (info.delCurri === true){
                        info.tiCurriFile = "";
                        info.delCurri=false;
                        const fileInput = this.$refs['curri_file_' + mcode];
                        console.log(fileInput.value);
                        fileInput.value = '';
                        }
                    } else {
                        alert("저장실패");
                    }

                    })
                    .catch(error => {
                    console.error(error);
                    });
                }
            },

            sloganSave(info, mcode){

                if (mcode == ''){
                    alert('해당코드가 없습니다.');
                    return;
                }else{
                    const payload = {
                        mode: "perSlogan",
                        subCode: mcode,
                        [`slogan_txt1_${info.code}`]: info.tiSloganTxt1,
                        [`slogan_ok_${info.code}`]: info.tiSloganOk
                    };

                    axiosInstance.post('/api/teacher/teacher-info-regx', payload, {
                    withCredentials: true
                    })
                    .then(response => {
                        if (response.data == "save successful"){
                            alert("슬로건 저장 성공");
                        } else {
                            alert("저장실패");
                        }

                    })
                    .catch(error => {
                    console.error(error);
                    });
                }
            },

            qnaSave(info, mcode){
                if (mcode == ''){
                    alert('해당코드가 없습니다.');
                    return;
                }else{
                    const payload = {
                        mode: "perQna",
                        subCode: mcode,
                        [`qna_ok_${info.code}`]: info.tsQnaOk,
                        [`pds_ok_${info.code}`]: info.tsPdsOk
                    };

                    axiosInstance.post('/api/teacher/teacher-info-regx', payload, {
                    withCredentials: true
                    })
                    .then(response => {
                        if (response.data == "save successful"){
                            alert("qna 저장 성공");
                        } else {
                            alert("저장실패");
                        }

                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
            },

            curriBatchSave(){
                if (confirm('커리큘럼 일괄등록 하시겠습니까? 해당 강사의 모든 파일이 변경됩니다.')){

                    const payload = {
                    mode: "batchCurri",
                    tcCode: this.tcCode,
                    curri_file_all: this.batchCurri
                    };

                    axiosInstance.post('/api/teacher/teacher-info-regx', payload, {
                    withCredentials: true
                    })
                    .then(response => {
                    if (response.data == "save successful"){
                        alert(response.data);
                        this.teacherInfoInput.forEach(t => {
                        t.tiCurriFile = this.batchCurri;
                        });
                        this.batchCurri = "";
                    } else {
                        alert("저장실패");
                    }
                    })
                    .catch(error => {
                    console.error(error);
                    });
                }
            },

            sloganBatchSave(){
                if (confirm('선생님한마디 내용을 일괄등록 하시겠습니까?')){
                    const payload = {
                    mode: "batchSlogan",
                    tcCode: this.tcCode,
                    slogan_txt1_all: this.batchSlogan
                    };

                    axiosInstance.post('/api/teacher/teacher-info-regx', payload, {
                    withCredentials: true
                    })
                    .then(response => {
                    if (response.data == "save successful"){
                        alert(response.data);
                        this.teacherInfoInput.forEach(t => {
                        t.tiSloganTxt1 = this.batchSlogan;
                        });
                        this.batchSlogan = "";
                    } else {
                        alert("저장실패");
                    }
                    })
                    .catch(error => {
                    console.error(error);
                    });
                }
            },

            allSave(){
                const formData = new FormData(this.$refs.infoForm);

                formData.append('mode', 'allSave');
                formData.append('tcCode', this.tcCode);

                axiosInstance.post("/api/teacher/teacher-info-regx", formData, {
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                .then(response => {
                    alert(response.data);

                    this.$router.push('/teacher/teacher-info-list')
                })
                .catch(error => {
                    console.error(error);
                })
            },

            recommSave(info, mcode){
                if (!info.delRecomm){
                    info.delRecomm = false;
                }
                if (mcode == ''){
                    alert('해당코드가 없습니다.');
                    return;
                }else{
                    const payload = {
                        mode: "perRecomm",
                        subCode: mcode,
                        [`recomm_ok_${info.code}`]: info.tiRecommOk,
                        [`recomm_file_${info.code}`]: info.tiRecommFile,
                        [`recomm_Delfile_${info.code}`]: info.delRecomm,
                        [`recomm_del_file_${info.code}`]: info.tiRecommFile
                    };

                    axiosInstance.post('/api/teacher/teacher-info-regx', payload, {
                        withCredentials: true
                    })
                    .then(response => {
                    if (response.data == "save successful"){
                        alert("수강생 추천 저장 성공");
                        if (info.delRecomm === true){
                        info.tiRecommFile = "";
                        info.delRecomm = false;
                        }
                    } else {
                        alert("저장실패");
                    }

                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
            },

            changeFile(event, num, info){

                var fileName = event.target.files[0].name;
                if (num === '2'){
                    info.tiCurriFile = fileName;
                } 

                else if (num === '3'){
                    this.batchCurri = fileName;
                }

                else if (num === '4'){
                    info.tiRecommFile = fileName;
                }
            },

            openPopup(popupKey) {
                this.popups[popupKey] = true;
                document.body.style.overflow = 'hidden';
            },
            closePopup(popupKey) {
                this.popups[popupKey] = false;
                this.$nextTick(() => {
                    if (!this.isAnyPopupVisible()) {
                        document.body.style.overflow = '';
                    }
                });
            },
            isAnyPopupVisible() {
                return Object.values(this.popups).some(val => val);
            },

        }
    };
</script>
