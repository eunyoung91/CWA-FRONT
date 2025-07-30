<template>
    <div class="title-menu">
        <div class="title-main">
            <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀" />
            <span>강사진 관리</span>
        </div>
    </div>
    <div class="title-sub">
        <img src="https://campus.megastudy.net/admin/image/dot_icon04.png" alt="서브타이틀">
        <span>강사등록</span>
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
                        <td class="brn" colspan="3">
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
                    </tr>
                    <tr>
                        <th>
                            강의정보
                        </th>
                        <td class="brn" colspan="3">
                            <table class="type-3 auto">
                                <colgroup>
                                    <col width="20%" />
                                    <col width="80%" />
                                </colgroup>
                                <tbody>
                                    <!-- 학원선택 -->
                                    <tr>
                                        <th>학원선택</th>
                                        <td>
                                            <div class="dis-flex">
                                                <select class="select-basic w-200" v-model="academy">
                                                    <option value="">학원선택</option>
                                                    <option v-for="(item, index) in academyList" :key="index" :value="item">{{ item }}</option>
                                                </select>

                                                <select class="select-basic w-200" v-model="academyType">
                                                    <option value="">학원분류</option>
                                                    <option v-for="(item, index) in academyTypeList" :key="index" :value="item">{{ item }}</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>

                                    <!-- 영역선택 -->
                                    <tr>
                                        <th>영역선택</th>
                                        <td>
                                            <div class="dis-flex wrap">
                                                <input type="radio" id="subject_korean" name="subject" />
                                                <label for="subject_korean">국어</label>

                                                <input type="radio" id="subject_math" name="subject" />
                                                <label for="subject_math">수학</label>

                                                <input type="radio" id="subject_english" name="subject" />
                                                <label for="subject_english">영어</label>

                                                <input type="radio" id="subject_social" name="subject" />
                                                <label for="subject_social">사회탐구</label>

                                                <input type="radio" id="subject_science" name="subject" />
                                                <label for="subject_science">과학탐구</label>

                                                <input type="radio" id="subject_korea" name="subject" />
                                                <label for="subject_korea">한국사</label>

                                                <input type="radio" id="subject_uni" name="subject" />
                                                <label for="subject_uni">대학별고사</label>

                                                <input type="radio" id="subject_foreign" name="subject" />
                                                <label for="subject_foreign">제2외국어</label>

                                                <input type="radio" id="subject_mentor" name="subject" />
                                                <label for="subject_mentor">수업멘토/입시분석</label>

                                                <input type="radio" id="subject_strategy" name="subject" />
                                                <label for="subject_strategy">입시전략연구소</label>

                                                <input type="radio" id="subject_art" name="subject" />
                                                <label for="subject_art">심리미술</label>

                                                <input type="radio" id="subject_counsel" name="subject" />
                                                <label for="subject_counsel">심리상담</label>

                                                <input type="radio" id="subject_etc" name="subject" />
                                                <label for="subject_etc">기타</label>
                                            </div>
                                        </td>
                                    </tr>

                                    <!-- 반분류 -->
                                    <tr>
                                        <th>반분류</th>
                                        <td>
                                            <div class="dis-flex wrap">
                                                <input type="radio" id="class_re" name="classType" />
                                                <label for="class_re">재수종합반</label>

                                                <input type="radio" id="class_single" name="classType" />
                                                <label for="class_single">단과반</label>

                                                <input type="radio" id="class_union" name="classType" />
                                                <label for="class_union">연합반</label>
                                            </div>
                                        </td>
                                    </tr>

                                    <!-- 노출여부 -->
                                    <tr>
                                        <th>노출여부</th>
                                        <td>
                                            <div class="dis-flex column">
                                                <!-- 페이지 -->
                                                <div class="dis-flex">
                                                    <strong class="color-point">- 페이지 :</strong>
                                                    <input type="radio" id="page_show" name="page" />
                                                    <label for="page_show">노출</label>
                                                    <input type="radio" id="page_hide" name="page" />
                                                    <label for="page_hide">비노출</label>
                                                </div>

                                                <!-- 레벨업 -->
                                                <div class="dis-flex">
                                                    <strong class="color-point">- 레벨업 :</strong>
                                                    <input type="radio" id="levelup_show" name="levelup" />
                                                    <label for="levelup_show">노출</label>
                                                    <input type="radio" id="levelup_hide" name="levelup" />
                                                    <label for="levelup_hide">비노출</label>
                                                </div>

                                                <!-- 특강 -->
                                                <div class="dis-flex">
                                                    <strong class="color-point">- 특강 :</strong>
                                                    <input type="radio" id="special_show" name="special" />
                                                    <label for="special_show">노출</label>
                                                    <input type="radio" id="special_hide" name="special" />
                                                    <label for="special_hide">비노출</label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <th>썸네일</th>
                        <td class="brn" colspan="3">
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
