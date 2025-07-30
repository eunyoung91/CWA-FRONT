<template>
    <PopupLayer :visible="visible" @close="$emit('close')">
        <template #header>
            <span>강의정보 수정</span>
        </template>

        <div class="summary-area mt0">
            <div class="numbering-box">
                <b>강사명 : </b>
            </div>
        </div>

        <div class="table-area">
            <table class="type-2 auto">
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
        </div>
    </PopupLayer>
</template>

<script>
import PopupLayer from '@/components/PopupLayer.vue';

export default {
    name: 'TeacherLectureModify',
    components: {
        PopupLayer
    },
    data() {
        return {
            academy: '', // 또는 null / 초기값
            academyType: '',
            academyList: [
                'INTRO',
                '강남',
                '서초',
                '강북',
                '노량진',
                '신촌',
                '송파',
                '평촌',
                '성북',
                '자연계 전문관',
                '최상위권 전문관',
                '수원',
                '안성기숙',
                '부천',
                '분당',
                '일산',
                '대입컨설팅센터',
                '바른길 입시컨설팅',
                '테스트 학원'
            ],
            academyTypeList: [], 
        };
    },
    props: {
        visible: Boolean
    }
};
</script>
