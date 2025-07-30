<template>
    <PopupLayer :visible="visible" @close="$emit('close')">
        <template #header>
            <span>아이디 검색</span>
        </template>

        <div class="search-area mt0">
            <div class="search-area-inner">
                <div class="dis-flex">
                <input
                    type="radio"
                    id="rad1"
                    name="searchType"
                    value="uId"
                    v-model="searchType"
                />
                <label for="rad1">아이디</label>

                <input
                    type="radio"
                    id="rad2"
                    name="searchType"
                    value="uName"
                    v-model="searchType"
                />
                <label for="rad2">이름</label>

                <input
                    name="keyword"
                    type="text"
                    class="input-basic w-180"
                    v-model="keyword"
                    @keyup.enter="onSearch"
                    placeholder="검색어 입력"
                />
                <CommonButton variant="primary" size="small" @click="onSearch">
                    검색
                </CommonButton>
                </div>
            </div>
        </div>

        <div class="table-area">
            <table class="type-1 auto">
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">아이디</th>
                        <th scope="col">이름</th>
                        <th scope="col">선택</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in searchList" :key="item.uid">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.uid }}</td>
                        <td>{{ item.uname }}</td>
                        <td class="brn">
                        <CommonButton
                            variant="primary"
                            size="small"
                            @click="selectTeacher(item)"
                        >
                            선택
                        </CommonButton>
                        </td>
                    </tr>
                    <!-- <tr v-if="searchList.length === 0 && keyword">
                        <td colspan="4" class="brn">목록이 없습니다.</td>
                    </tr> -->
                    <tr v-if="!keyword">
                        <td colspan="4" class="brn">검색어를 입력해 주십시오.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </PopupLayer>
</template>

<script>
import axiosInstance from '@/axios';
import PopupLayer from '@/components/PopupLayer.vue';

export default {
    name: 'TeacherIdSearch',
    components: {
        PopupLayer
    },
    props: {
        visible: Boolean
    },
    data() {
        return {
        keyword: '',
        searchType: 'uId', // 'id' -> 'uId', 'name' -> 'uName'으로 API에 맞게 수정
        searchList: []
        };
    },
    methods: {
        onSearch() {
        if (!this.keyword) {
            alert("검색어를 입력하세요.");
            return;
        }

        axiosInstance.get('/api/teacher/search', {
            params: {
                keyfield: this.searchType,
                keyword: this.keyword
            },
            withCredentials: true
        })
        .then((response) => {
            this.searchList = response.data;
        })
        .catch((error) => {
            console.error(error);
        });
        },
        selectTeacher(item) {
            this.$emit('select', item); // 부모에게 선택된 사용자 전달
            this.$emit('close');        // 팝업 닫기
        }
    }
};
</script>
