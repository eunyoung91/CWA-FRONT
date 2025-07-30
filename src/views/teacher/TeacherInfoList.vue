<template>
    <div class="title-menu">
        <div class="title-main">
            <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀" />
            <span>강사정보 관리</span>
        </div>
    </div>

    <div class="search-area">
        <div class="search-area-inner">
            <!-- 강사검색 -->
            <div class="dis-flex">
                <div>&bull; 강사검색 : </div>
                <div class="dis-flex">
                    
                    <input name="keyword" type="text" v-model="searchForm.keyword" class="input-basic w-200" />

                    <CommonButton variant="primary" size="small" @click="searchForm(true)">검색</CommonButton>
                    <CommonButton variant="primary" size="small" @click="searchForm(false)">취소</CommonButton>
                </div>
            </div>
        </div>
    </div>

    <div class="summary-area">
        <div class="dis-flex">
            
            <div class="dis-flex">
                <b>학원별 / 영역별 / 반분류 정렬하기</b>

                <select class="select-basic"
                v-model="form.schCampus"
                @change="formSubmit('', 1)"
                >
                    <option disabled value="">
                        학원선택
                    </option>
                    <option
                        v-for="(value, key) in acaCode"
                        :key="key"
                        :value="key"
                    >
                        {{ value }}
                    </option>
                </select>

                <select class="select-basic"
                v-model="form.schCampusDetail"
                @change="formSubmit('', 1)"
                >
                    <option
                        disabled
                        value=""
                    >
                        학원분류
                    </option>
                    <option
                        v-for="(value, key) in acaDetailCode"
                        :key="key"
                        :value="key"
                    >
                        {{ value }}
                    </option>
                </select>

                <select class="select-basic"
                v-model="form.schArea"
                @change="formSubmit(', 1')"
                >
                    <option
                        disabled
                        value=""
                    >
                        영역선택
                    </option>
                    <option
                        v-for="(value, key) in classCode"
                        :key="key"
                        :value="key"
                    >
                        {{ value }}
                    </option>
                </select>

                <select class="select-basic"
                v-model="form.schClass"
                @change="formSubmit('', 1)"
                >
                    <option disabled value="">반분류선택</option>
                    <option value="1">재수종합반</option>
                    <option value="2">단과반</option>
                    <option value="3">연합반</option>
                </select>

                <CommonButton variant="primary" size="small" @click="searchForm(true)">검색</CommonButton>
            </div>
        </div>

        <div class="numbering-box">
            <b>&middot; 검색된 강사 <span>{{ formattedTotal }}</span>명 </b>
        </div>
    </div>

    <div class="table-area">
        <form class="my-form" @submit.prevent="submitForm">
            <table class="type-1 auto">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">번호</th>
                        <th scope="col">강사명</th>
                        <th scope="col">사진</th>
                        <th scope="col">강사정보</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="teacher in teacherList" :key="teacher.code">
                        <td>
                            <input
                            v-model="checkedTeachers"
                            type="checkbox"
                            :value="teacher.code"
                            >
                        </td>
                        <td>{{ teacher.code }}</td>
                        <td>
                            <router-link :to="{ path: '/teacher/teacher-info-input', query: { tcCode: teacher.code } }">
                                {{ teacher.tcName }}
                            </router-link>
                        </td>
                        <td clsas="photo">
                            <img
                            :src="teacher.tcPhoto"
                            :alt="teacher.tcName"
                            @error="handleImageError(teacher)"
                            width="50"
                            height="auto"
                            >
                        </td>
                        <td>
                            <table class="type-3 auto">
                                <thead>
                                    <tr>
                                        <th scope="col">학원</th>
                                        <th scope="col">영역</th>
                                        <th scope="col">세부과목</th>
                                        <th scope="col">반분류</th>
                                        <th scope="col">페이지노출</th>
                                        <th scope="col">Q&A</th>
                                        <th scope="col">강좌 맛보기</th>
                                        <th scope="col">커리큘럼</th>
                                        <th scope="col" class="brn" >학력/저서</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                    v-for="detail in teacherDetails[teacher.code]"
                                    :key="detail.tcCname"
                                        >
                                        <td>{{ detail.tcCname }}</td>
                                        <td>{{ classCode[detail.tcArea] }}</td>
                                        <td>{{ detail.tcIcon }}</td>
                                        <td v-if="detail.tcClass === '1'">
                                            재수종합반
                                        </td>
                                        <td v-if="detail.tcClass === '2'">
                                            단과반
                                        </td>
                                        <td v-if="detail.tcClass === '3'">
                                            연합반
                                        </td>
                                        <td v-if="detail.tcView === 'Y'">
                                            노출
                                        </td>
                                        <td v-else>
                                            미노출
                                        </td>
                                        <td v-if="detail.tsQnaOk === 'Y'">
                                            <img :src="IMAGE_URL+'/btn_qna.gif'">
                                        </td>
                                        <td v-else>-</td>

                                        <td v-if="detail.tiMvOk === 'Y'">
                                            <a href="javascript:void(0)" @click="openMoviePopup(detail.mvUrl)">
                                                <img :src="IMAGE_URL + '/btn_movie.gif'" alt="영상 보기" />
                                            </a>
                                        </td>

                                        <td v-else>-</td>
                                        <td v-if="detail.tiCurriOk === 'Y'">
                                            <img :src="IMAGE_URL+'tn_curri.gif'">
                                        </td>
                                        <td v-else>-</td>
                                        <td v-if="teacher.tcSpecSchool || detail.tcSpecBook">

                                            <a href="javascript:void(0)" @click.prevent="showPopup('teacherProfile')">
                                                <img :src="IMAGE_URL+'/btn_profile.gif'">
                                            </a>

                                        </td>
                                        <td class="brn" v-else>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>

    </div>

    <PaginationComponent
    :current-page="currentPage"
    :page-numbers="pageNumbers"
    :has-previous-page-set="hasPreviousPageSet"
    :has-next-page-set="hasNextPageSet"
    :previous-page-set-end="previousPageSetEnd"
    :next-page-set-start="nextPageSetStart"
    @page-changed="fetchPage"
    />

    <!-- 선생님 프로필 팝업 -->
    <PopupLayer :visible="popups.teacherProfile" @close="hidePopup('teacherProfile')">
        <template #header>
            <span>선생님 프로필</span>
        </template>

        <div class="teacher-profile">
            <h3>선생님</h3>            
            <!-- <div class="mt10">슬로건</div>
            <ul class="profile_list">
                <li>슬로건1</li>
            </ul>

            <div class="mt10">학력/약력</div>
            <ul class="profile_list">
                <li>학력/약력1</li>
            </ul>
            
            <div class="mt10">저서</div>
            <ul class="profile_list">
                <li>저서1</li>
            </ul> -->
        </div>
    </PopupLayer>
    <!-- // 선생님 프로필 팝업 -->

</template>

<script>
import axiosInstance from '@/axios';
import PaginationComponent from '@/components/PaginationComponent.vue';
import PopupLayer from '@/components/PopupLayer.vue';

export default {
    components:{
        PaginationComponent,
        PopupLayer,
    },
    data() {
        return {
            form: {
                keyword: "",
                schCampus: "",
                schCampusDetail: "",
                schArea: "",
                schClass: ""
            },
            checkedTeachers: [],
            total: 0,
            teacherList: [],
            teacherDetails: {},
            classCode: {},
            acaCode: {},
            acaDetailCode: {},
            totalPages: 0,
            currentPage: 1,
            pageNumbers: [],
            hasPreviousPageSet: false,
            hasNextPageSet: false,
            previousPageSetEnd: 0,
            nextPageSetStart: 0,
            popups: {
                teacherProfile: false,
            },
        };
    },

    computed: {
        formattedTotal() {
            return this.total.toLocaleString();
        },
    },

    created() {
        this.formSubmit("", 1);
    },

    methods: {
        searchForm(bMsg) {
            if (bMsg) {
                this.formSubmit("sbtn", 1);
            } else {
                this.clearForm();
                this.formSubmit("", 1);
            }
        },
        formSubmit(type, page) {

            this.teacherList.forEach(teacher => {
                const subject = teacher.tcSubject || '국어'; // 과목 정보가 있다면 사용
                const name = teacher.tcName || '기본이름';  // 이름 정보
                teacher.tcPhoto = `https://campus.megastudy.net/Data/Teacher/teacher_photo/${subject}_${name}.png`;
            });

            const keyword = this.form.keyword;

            console.log(keyword);

            if (keyword){
                if (keyword.length < 2){
                alert("검색어는 2글자 이상 입력해주세요.")
                return;
                }
            }
            else {
                if (type == "sbtn"){
                alert("검색어를 입력해주세요.");
                return ;
                }
            }

            const params = {
                keyword: keyword,
                cboCampus: this.form.schCampus,
                cboCampusDetail: this.form.schCampusDetail,
                cboArea: this.form.schArea,
                cboClass: this.form.schClass,
                page: page
            };

            axiosInstance.post('/api/teacher/teacher-info-list', params, {withCredentials: true})
            .then(response => {

                this.teacherList = response.data.teacherList;
                
                this.teacherList.forEach(teacher => {
                    const subject = teacher.tcSubject || '국어';
                    const name = teacher.tcName || '이름없음';
                    teacher.tcPhoto = `https://campus.megastudy.net/Data/Teacher/teacher_photo/${subject}_${name}.png`;
                });


                this.total = response.data.total;
                this.teacherDetails = response.data.teacherDetailMap;
                this.classCode = response.data.classCodeMap;
                this.acaCode = response.data.acaCodeMap;
                this.acaDetailCode = response.data.acaDetailCodeMap;

                this.pageNumbers = response.data.pageNumbers;
                this.hasPreviousPageSet = response.data.hasPreviousPageSet;
                this.hasNextPageSet = response.data.hasNextPageSet;
                this.previousPageSetEnd = response.data.previousPageSetEnd;
                this.nextPageSetStart = response.data.nextPageSetStart;
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
        },
        
        handleImageError(teacher) {
            teacher.tcPhoto = "https://campus.megastudy.net/Data/Teacher/teacher_photo/ready1.png"; // Set a default image if error occurs
        },
        clearForm() {
            this.form.keyword = "";
            this.form.schCampus = "";
            this.form.schCampusDetail = "";
            this.form.schArea = "";
            this.form.schClass = "";
        },

        fetchData(pageNumber) {
            this.currentPage = pageNumber;
            this.formSubmit("", pageNumber);
        },

        openMoviePopup(url) {
            // if (!url) {
            //     alert('영상 URL이 존재하지 않습니다.');
            //     return;
            // }
            window.open(
                url,
                'DNGPlayer',
                'width=320,height=312,scrollbars=no,resizable=no'
            );
        },

        showPopup(popupKey) {
            this.popups[popupKey] = true;
            document.body.style.overflow = 'hidden';
        },
        hidePopup(popupKey) {
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
        fetchPage(page) {
            this.currentPage = page;
            this.formSubmit('', page);
        },

    
    }
};
</script>
