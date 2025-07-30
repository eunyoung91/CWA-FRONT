<template>
    <div class="title-menu">
        <div class="title-main">
            <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀" />
            <span>강사진 관리</span>
        </div>
    </div>
    <div class="title-sub">
        <img src="https://campus.megastudy.net/admin/image/dot_icon04.png" alt="서브타이틀">
        <span>강사정보</span>
    </div>

    <div class="table-area">
        <form ref="infoForm">
            <table class="type-2">
                <colgroup>
                    <col width="12%">
                    <col width="auto">
                    <col width="12%">
                    <col width="30%">          
                </colgroup>   
                <tbody>
                    <tr>
                        <th>강사명/아이디</th>
                        <td class="brn">
                            <div class="dis-flex">
                                <input
                                    v-model="tcData.tcName"
                                    name="tcName"
                                    type="text"
                                    tabindex="1"
                                    class="input-basic w-140"
                                >
                                <input
                                    v-model="tcData.tcId"
                                    name="tcId"
                                    type="text"
                                    tabindex="1"
                                    class="input-basic w-140"
                                >
                                <CommonButton 
                                    variant="primary" 
                                    size="small"
                                    @click="openPopup('teacherIdSearch')"
                                >
                                    찾기
                                </CommonButton>
                            </div>
                        </td>
                        <th>조교아이디</th>
                        <td class="brn">
                            <input
                                v-model="tcData.tcTId"
                                name="tcTId"
                                type="text"
                                tabindex="1"
                                class="input-basic w-140"
                            >
                        </td>
                    </tr>
                    <tr>
                        <th>
                            강의정보<br>
                            <CommonButton 
                                variant="primary" 
                                size="small"
                                class="mt5"
                            >
                                추가하기
                            </CommonButton>
                        </th>
                        <td class="brn" colspan="3">
                            <table class="type-3">
                                <colgroup>
                                    <col width="8%">
                                    <col width="14%">
                                    <col width="8%">
                                    <col width="10%">
                                    <col width="12%" span="5">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col">학원</th>
                                        <th scope="col">학원분류</th>
                                        <th scope="col">영역</th>
                                        <th scope="col">반분류</th>
                                        <th scope="col">페이지노출</th>
                                        <th scope="col">레벨업노출</th>
                                        <th scope="col">특강노출</th>
                                        <th scope="col">수정</th>
                                        <th scope="col">삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(lecture, index) in lectureList" :key="index">
                                        <td>{{ lecture.academy }}</td>
                                        <td>{{ lecture.academyType }}</td>
                                        <td>{{ lecture.subject }}</td>
                                        <td>{{ lecture.classType }}</td>
                                        <td>{{ lecture.pageVisible }}</td>
                                        <td>{{ lecture.levelupVisible }}</td>
                                        <td>{{ lecture.specialVisible }}</td>
                                        <td>
                                            <CommonButton 
                                                variant="primary" 
                                                size="small"
                                                @click="openPopup('teacherLectureModify')"
                                            >
                                                수정
                                            </CommonButton>
                                        </td>
                                        <td>
                                            <CommonButton 
                                                variant="primary" 
                                                size="small"
                                                @click.prevent="removeLecture(index)"
                                            >
                                                삭제
                                            </CommonButton>
                                        </td>
                                    </tr>
                                </tbody>   
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <th>썸네일</th>
                        <td class="brn" colspan="3">
                            <div class="dis-flex mb5">
                                <input 
                                type='checkbox' 
                                id="thumb_del"
                                ><label for="thumb_del">파일삭제</label> : 
                                <a href='' target='_blank'><u>이미지명.png</u></a>
                            </div>

                            <div class="dis-flex">
                                <div class="file-basic flex-1">
                                    <input
                                    id="thumbnailFile"
                                    ref="thumbnailInput"
                                    type="file"
                                    @change="handleFileChange($event, 'thumbnail')"
                                    style="display: none"
                                    />
                                    <input
                                    type="text"
                                    class="input-basic w-260"
                                    :value="files.thumbnail?.name || ''"
                                    readonly
                                    />
                                    <label for="thumbnailFile">찾아보기</label>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th>상세이미지</th>
                        <td class="brn" colspan="3">
                            <div class="dis-flex mb5">
                                <input 
                                type='checkbox' 
                                id="photo_del"
                                ><label for="photo_del">파일삭제</label> : 
                                <a href='' target='_blank'><u>이미지명.png</u></a>
                            </div>

                            <div class="dis-flex">
                                <div class="file-basic flex-1">
                                    <input
                                    id="detailFile"
                                    ref="detailInput"
                                    type="file"
                                    @change="handleFileChange($event, 'detail')"
                                    style="display: none"
                                    />
                                    <input
                                    type="text"
                                    class="input-basic w-260"
                                    :value="files.detail?.name || ''"
                                    readonly
                                    />
                                    <label for="detailFile">찾아보기</label>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>비고</th>
                        <td class="brn" colspan="3">
                            <textarea
                                class="textarea-basic"
                                v-model="tcData.tcEtc"
                                name="tcEtc"
                                rows="5"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>

    <div class="btn-align">
        <div class="btn-box center">
            <CommonButton 
                variant="primary" 
                size="small"
                @click.prevent="submitForm"
            >
                확인
            </CommonButton>
            <CommonButton 
                variant="secondary" 
                size="small"
                @click.prevent="resetForm"
            >
                취소
            </CommonButton>
        </div>
    </div>

    <TeacherIdSearch
        :visible="popups.teacherIdSearch"
        @close="closePopup('teacherIdSearch')"
    />
    <teacherLectureModify
        :visible="popups.teacherLectureModify"
        @close="closePopup('teacherLectureModify')"
    />

</template>

<script>
    import TeacherIdSearch from '@/views/teacher/TeacherIdSearch.vue'; 
    import teacherLectureModify from '@/views/teacher/teacherLectureModify.vue'; 
    export default {
        components:{
            TeacherIdSearch,
            teacherLectureModify
        },
        data() {
            return {
                tcData: {
                    tcName: '',
                    tcId: '',
                    tcTId: '',
                    tcEtc: ''
                },
                files: {
                    thumbnail: null,
                    detail: null
                },
                lectureList: [
                    {
                        academy: '강남',
                        academyType: '강남 재수학원',
                        subject: '국어',
                        classType: '재수종합반',
                        pageVisible: '비노출',
                        levelupVisible: '비노출',
                        specialVisible: '비노출'
                    }
                ],
                popups: {
                    teacherIdSearch: false,
                    teacherLectureModify: false,
                }
            };
        },
        methods: {
            search() {
            },
            handleFileChange(event, type) {
                const file = event.target.files[0];
                if (file) {
                    this.files[type] = file;
                }
            },
            submitForm() {
            },
            resetForm() {
                this.tcData = {
                    tcName: '',
                    tcId: '',
                    tcTId: '',
                    tcEtc: ''
                };
                this.files = {
                    thumbnail: null,
                    detail: null
                };
                this.lectureList = [];
            },
            addLecture() {
                this.lectureList.push({
                    academy: '학원명',
                    academyType: '학원분류',
                    subject: '과목',
                    classType: '반분류',
                    pageVisible: '비노출',
                    levelupVisible: '비노출',
                    specialVisible: '비노출'
                });
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
