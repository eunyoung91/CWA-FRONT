<template>
    <div class="title-menu">
        <div class="title-main">
            <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀" />
            <span>메인 탭 관리</span>
        </div>
    </div>

    <div class="aca-list-area">

        <div class="aca-list">
            <span>&bull;</span>
            <div>
                <a>합격수기 탭</a>
                <span class="divider">|</span>
                <a>합격자 인터뷰 탭</a>
            </div>
        </div>
    </div>

    <!-- 합격수기 탭 -->
    <div class="table-area">
        <table class="type-1 auto">
            <thead>
                <tr>
                    <th scope="col">학원</th>
                    <th scope="col">합격수기 탭</th>
                    <th scope="col">수기 노출 관리</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>강남 재수학원</td>
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

                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- 합격자 인터뷰 탭 -->

</template>

<script>

// import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
    components: {
        // PaginationComponent
    },
    data() {
        return {

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
