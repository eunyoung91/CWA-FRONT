<template>
    <div class="title-menu">
        <div class="title-main">
            <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀" />
            <span>탈퇴 리스트</span>
        </div>
    </div>

    <div class="search-area">
        <div class="search-area-inner">

            <!-- 기간검색 -->
            <div class="dis-flex">
                <div>&bull; 기간검색 : </div>
                <div class="dis-flex">
                    <CommonButton variant="primary" size="small" @click="setDateRange('today')">오늘</CommonButton>
                    <CommonButton variant="primary" size="small" @click="setDateRange('1w')">1주일</CommonButton>
                    <CommonButton variant="primary" size="small" @click="setDateRange('1m')">1달</CommonButton>
                    <CommonButton variant="primary" size="small" @click="setDateRange('2m')">2달</CommonButton>
                    <CommonButton variant="primary" size="small" @click="setDateRange('3m')">3달</CommonButton>
                    <CommonButton variant="primary" size="small" @click="setDateRange('6m')">최근 6개월</CommonButton>

                    <div class="date-picker">
                        <VueDatepicker v-model="filters.startDate" :format="formatDate" />
                        <span>~</span>
                        <VueDatepicker v-model="filters.endDate" :format="formatDate" />
                    </div>

                    <CommonButton variant="primary" size="small">검색</CommonButton>
                    <CommonButton variant="primary" size="small">취소</CommonButton>
                </div>
            </div>
        </div>
    </div>

    <div class="summary-area">
        <div class="numbering-box">
            <b>&middot; 현재까지 총 탈퇴 회원수 : <span>{{ withdrawList.length }}</span> 명</b>
        </div>
    </div>

    <div class="table-area">
        <table class="type-1 auto">
            <colgroup>
                <col width="10%">
                <col width="30%" span="3">
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">번호</th> 
                    <th scope="col">탈퇴일</th>
                    <th scope="col">가입일</th>
                    <th scope="col" class="brn">탈퇴구분</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(member, index) in withdrawList" :key="member.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ member.signoutDate }}</td>
                    <td>{{ member.joinDate }}</td>
                    <td class="brn">{{ member.type }}</td>
                </tr>
                <tr v-if="withdrawList.length === 0">
                    <td colspan="4" class="brn">데이터가 없습니다.</td>
                </tr>
            </tbody>
        </table>
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
import VueDatepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
    components: {
        VueDatepicker,
        PaginationComponent
    },
    data() {
        return {
            filters: {
                startDate: null,
                endDate: null
            },

            withdrawList: [ {
                signoutDate: '2025-05-12',
                joinDate: '2025-05-12',
                type: '통합회원',
            },],

            // PaginationComponent
            currentPage: 1,
            pageNumbers: [], // 페이지 번호 목록
            hasPreviousPageSet: false,
            hasNextPageSet: false,
            previousPageSetEnd: 0,
            nextPageSetStart: 0,

        };
    },
    methods: {
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            return d.toISOString().split('T')[0];
        },
        setDateRange(type) {
            const today = new Date();
            let start = new Date();

            switch (type) {
            case 'today':
                start = today;
                break;
            case '1w':
                start.setDate(today.getDate() - 7);
                break;
            case '1m':
                start.setMonth(today.getMonth() - 1);
                break;
            case '2m':
                start.setMonth(today.getMonth() - 2);
                break;
            case '3m':
                start.setMonth(today.getMonth() - 3);
                break;
            case '6m':
                start.setMonth(today.getMonth() - 6);
                break;
            }

            this.filters.startDate = start;
            this.filters.endDate = today;
        },
        fetchPage(page) {
            this.currentPage = page;
            this.formSubmit('', page);
        },
        formSubmit(page = 1) {
            // 실제로는 API 호출 또는 필터링 처리 등을 구현
            // 예시용: page 번호에 따라 페이지네이션 정보 갱신
            this.currentPage = page;

            // 예시로 더미 페이지 번호 1~5 생성
            this.pageNumbers = [1, 2, 3, 4, 5];

            this.hasPreviousPageSet = page > 5;
            this.hasNextPageSet = page < 6;

            this.previousPageSetEnd = page - 1;
            this.nextPageSetStart = page + 1;
        }
    }
};
</script>
