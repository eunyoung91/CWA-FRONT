<template>

    <div class="title-menu">
        <div class="title-main">
            <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀">
            <span>공지사항</span>
        </div>
    </div>

    <div class="aca-list-area">

        <div class="aca-list">
            <span>&bull;</span>
            <div>
                <a @click.prevent="fetchData('all', true)">전체</a>
                <span class="divider">|</span>
                <a @click.prevent="fetchData('INTRO', true)">인트로</a>
            </div>
        </div>

        <div class="aca-list">
            <span>&bull;</span>
            <div>
                <template v-for="(tc, index) in TopCampusList" :key="index">
                    <span v-if="index !== 0" class="divider">|</span>
                    <a @click.prevent="fetchData(tc.campusCodeDetail, true)">
                        {{ tc.campusName }}
                    </a>
                </template>
            </div>
        </div>
    </div>

    <div class="search-area">
        <div class="search-area-inner">

            <div class="dis-flex">
                <div>&bull; 게시판 : </div>
                <div>
                    <select v-model="naviCode" class="select-basic">
                        <option
                        v-for="board in boardList"
                        :key="board.code"
                        :value="board.code"
                        >
                        {{ board.menuName }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="dis-flex">
                <div>&bull; 반분류 : </div>
                <div>
                    <select v-model="classGubun" class="select-basic">
                        <option
                        v-for="c in classList"
                        :key="c.code"
                        :value="c.code"
                        >
                        {{ c.name }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="dis-flex">
                <div>&bull; 기간검색 : </div>
                <div class="dis-flex">
                    <div class="date-picker">
                        <VueDatepicker
                            v-model="startDate"
                            :format="formatDate2"
                        /> 
                        <span>~</span>
                        <VueDatepicker
                            v-model="endDate"
                            :format="formatDate2"
                        />
                    </div>

                    <select
                        id="search_type"
                        v-model="searchType"
                        name="search_type"
                        class="select-basic"
                    >
                        <option value="1">제목 + 내용</option>
                        <option value="2">제목 </option>
                        <option value="3">내용 </option>
                    </select>

                    <input
                        name="searchword"
                        type="text"
                        value=""
                        class="input-basic w-140"
                    >

                    <CommonButton
                        variant="primary"
                        size="small"
                        @click="getSearchForm().submit()"
                        >
                        검색
                    </CommonButton>

                    <CommonButton
                        variant="primary"
                        size="small"
                        @click="resetCampusCode"
                        >
                        취소
                    </CommonButton>
                </div>
            </div>

        </div>
    </div>

    <div class="table-area">
        <table class="type-1 auto">
            <colgroup>
                <col width="4%">
                <col width="4%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="*">
                <col width="10%">
                <col width="8%">
                <col width="10%">
                <col width="4%">
                <col width="8%">
            </colgroup>

            <thead>
                <tr>
                    <th scope="col">선택</th>
                    <th scope="col">번호</th>
                    <th scope="col">학원명</th>
                    <th scope="col">게시판</th>
                    <th scope="col">반분류</th>
                    <th scope="col">제목</th>
                    <th scope="col">등록일</th>
                    <th scope="col">조회수</th>
                    <th scope="col">작성자</th>
                    <th scope="col">사용여부</th>
                    <th scope="col" class="brn">게시물확인</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(notice, index) in noticeList"
                    :key="notice.code"
                    :class="{ hot: notice.useHot === 'Y'}"
                >
                    <td>
                        <input
                            type="checkbox"
                            name="cb_list_selected"
                            value=""
                        >
                    </td>
                    <td> {{ index+1 }} </td>
                    <td> {{ notice.campusName }} </td>
                    <td> {{ notice.menuName }} </td>
                    <td> {{ notice.classGubunName }} </td>
                    <td class="taL"> 
                        <router-link :to="{ path: '/campus-notice/campus-notice-write', query: { code: notice.code, campusDetailCode: campusCodeDetail } }">
                            {{ notice.title }}
                        </router-link>
                    </td>
                    <td> {{ formatDate(notice.regDate) }} </td>
                    <td> {{ notice.hit }} </td>
                    <td> {{ notice.regName }} </td>
                    <td> {{ notice.useView }} </td>
                    <td class="brn"> 
                        <a href="javascript:;" class="link-blue text-under">PC</a>
                        <span> | </span>
                        <a href="javascript:;" class="link-blue text-under">MO</a>
                    </td>
                </tr>

                <tr v-if="noticeList.length === 0">
                    <td colspan="11" class="brn">데이터가 없습니다.</td>
                </tr>

            </tbody>
        </table>
    </div>

    <div class="btn-align between">
        <div class="btn-box">
            <CommonButton variant="primary" size="small">HOT 설정</CommonButton>
            <CommonButton variant="primary" size="small">HOT 해제</CommonButton>
            <CommonButton variant="primary" size="small">사용</CommonButton>
            <CommonButton variant="primary" size="small">미사용</CommonButton>
        </div>
        <div class="btn-box">
            <CommonButton
                variant="primary"
                size="small"
                :to="{ path: '/notice/campus-notice-write', query: { code: '', campusDetailCode: '' } }"
                >
                글쓰기
            </CommonButton>
        </div>
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

</template>

<script>
import axiosInstance from '@/axios';
import PaginationComponent from '../../components/PaginationComponent.vue';
import VueDatepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    components:{
        PaginationComponent,
        VueDatepicker
    },
    data() {
        return {
            campusCodeDetail: "INTRO",
            classGubun: "",
            classList: [],
            boardList: [],
            noticeList: [],
            TopCampusList: [],
            totalPages: 0,
            currentPage: 1,
            pageNumbers: [],
            hasPreviousPageSet: false,
            hasNextPageSet: false,
            previousPageSetEnd: 0,
            nextPageSetStart: 0,
            searchType: 1,
            searchWord: "",
            startDate: null,
            endDate: null,
            naviCode: 1136,
        };
    },
    created() {
        this.fetchData('INTRO', false);
    },
    methods: {
        fetchData(campusCodeDetail, flag){
        if (flag){
            this.naviCode = '';
            this.classGubun = '';
            this.startDate = '';
            this.endDate = '';
            this.searchType = '';
            this.searchWord = '';
            this.currentPage = 1;
            campusCodeDetail = '';
        }

        let naviCode = this.naviCode;
        let classGubun = this.classGubun;
        let startDate = this.startDate;
        let endDate = this.endDate;
        let searchType = this.searchType;
        let searchWord = this.searchWord;
        this.campusCodeDetail = campusCodeDetail;
        
        let page = this.currentPage;

        axiosInstance.get('/api/campus/campus-notice',{
            params: {naviCode, classGubun, startDate, endDate, searchType, searchWord, campusCodeDetail, page},
            withCredentials: true
        })
        .then(response => {
            this.noticeList = response.data.introResponses;
            this.pageNumbers = response.data.pageDto.pageNumbers;
            this.hasPreviousPageSet = response.data.pageDto.hasPreviousPageSet;
            this.hasNextPageSet = response.data.pageDto.hasNextPageSet;
            this.previousPageSetEnd = response.data.pageDto.previousPageSetEnd;
            this.nextPageSetStart = response.data.pageDto.nextPageSetStart;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        })

        axiosInstance.get('/api/campus/top-campus-list', {withCredentials: true})
        .then(response => {
            this.TopCampusList = response.data;
        })
        .catch(error => {
            console.error(error);
        })

        axiosInstance.get('/api/campus/notice-list', {
            params: {campusCodeDetail},
            withCredentials:true})
        .then(response => {
            this.boardList = response.data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        })

        axiosInstance.get('/api/campus/class-list', {withCredentials:true})
        .then(response => {
            this.classList = response.data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        })
        },
        formatDate(dateTime) {
            return dateTime.substring(0, 10);
        },
        fetchPage(pageNumber) {
            this.currentPage = pageNumber;
            this.fetchData(this.campusCodeDetail, false);
        },
        formatDate2(date){
            return date.toLocaleDateString("ko-KR");
        },

        resetCampusCode() {
            // campusCodeDetail 관련된 값만 초기화하고 데이터를 다시 불러오고 싶을 때
            this.campusCodeDetail = "INTRO"; // 또는 초기 상태 값
            this.fetchData("INTRO", true);   // 필요한 로직으로 조정

            // 또는 라우터의 쿼리 파라미터 초기화가 필요할 경우
            if (this.$route && this.$router) {
            this.$router.replace({ query: { ...this.$route.query, campuscodedetail: undefined } });
            }
        }
    },
};
</script>

