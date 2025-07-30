<template>
    <div class="title-menu">
        <div class="title-main">
            <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀" />
            <span>메뉴 관리</span>
        </div>
    </div>

    <div class="summary-area">
        
        <div class="dis-flex">
            <CommonButton variant="primary" size="small">신규등록</CommonButton>
            <CommonButton variant="primary" size="small">순서저장</CommonButton>
            <CommonButton variant="primary" size="small" class="color-blue">New등록</CommonButton>
            <CommonButton variant="primary" size="small" class="color-blue">New해제</CommonButton>
            <CommonButton variant="primary" size="small" class="color-brown">메뉴노출</CommonButton>
            <CommonButton variant="primary" size="small" class="color-brown">메뉴비노출</CommonButton>
            <CommonButton variant="primary" size="small" class="color-red">메뉴삭제</CommonButton>
        </div>

        <div class="dis-flex">
            <select class="select-basic"
            >
                <option>
                    --캠퍼스선택--
                </option>
                <option></option>
            </select>
            <select class="select-basic"
            >
                <option>
                    선택
                </option>
                <option></option>
            </select>
        </div>
    </div>

    <div class="table-area">
        <table class="type-1 auto">
            <thead>
                <tr>
                    <th scope="col">
                        <input type="checkbox">
                    </th>
                    <th scope="col">번호</th>
                    <th scope="col">순서</th>
                    <th scope="col">학원</th>
                    <th scope="col">구분</th>
                    <th scope="col">메뉴명</th>
                    <th scope="col">노출</th>
                    <th scope="col">바로가기</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in memberList" :key="item.id">
                    <td><input type="checkbox" /></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.order || '' }}</td>
                    <td>{{ item.academy || '' }}</td>
                    <td>{{ item.memberType }}</td>
                    <td>{{ item.nameMasked }}</td>
                    <td>{{ item.expose || '' }}</td>
                    <td>{{ item.megastudyId || '' }}</td>
                </tr>
                <!-- 캠퍼스 미선택 시 메시지 -->
                <tr>
                    <td colspan="8" class="brn">캠퍼스를 선택해주세요</td>
                </tr>

                <!-- 리스트가 비어있을 때 메시지 -->
                <tr v-if="memberList.length === 0">
                    <td colspan="8" class="brn">목록이 없습니다.</td>
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

    <div class="text-area">
        ※ 마이페이지 메뉴는 로그 아웃 상태에서 보여주는 공통적인 내용을 등록합니다. 
    </div>

</template>

<script>

import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
    components: {
        PaginationComponent
    },
    data() {
        return {
            // memberList: [],
            memberList: [{
                id: 'nai*****',
                idMasked: 'nai*****',
                nameMasked: '김*동',
                birthMasked: '2005.**.**',
                mobileMasked: '010****2224',
                type: '통합회원',
                memberType: '학생',
                joinPath: '유초중',
                joinDate: '2025-05-12',
                convertDate: '',
                studentId: '',
                megastudyId: '',
                order: 1,
                academy: '강남',
                expose: 'Y'
            }],

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
        fetchPage(page) {
            this.currentPage = page;
            // TODO: 페이지 데이터 fetch 구현
        }
    }
};
</script>
