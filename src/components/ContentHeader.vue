<!-- 🔹 ContentHeader.vue: 관리자 상단 헤더 컴포넌트 (알림 및 로그인 정보 표시) -->
<template>
<div class="main-header">
    <div class="header-noti" :class="{ fixed: isFixed }">
    <p><strong>DEV-ADMIN 개발 서버 입니다.</strong></p>
    </div>
    <div class="header-login">
    <div>
        <img :src="IMAGE_URL+'/icon01.png'">
        <b>{{ userName }}({{ userRole }})님 |</b> {{ loginTime }} 로그인 하셨습니다.
    </div>
    <div>
        <CommonButton variant="secondary" size="large">로그아웃</CommonButton>
    </div>
    </div>
</div>
</template>

<script>
//   import CommonButton from '@/components/CommonButton.vue';

export default {
    name: 'ContentHeader',
    components: {
    // CommonButton
    },
    props: {
    userName: {
        type: String,
        // required: true,
        default: ''
    },
    userRole: {
        type: String,
        default: '관리자'
    },
    loginTime: {
        type: String,
        // required: true,
        default: function () {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        }
    },
    },
    data() {
        return {
            isFixed: false
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            const notiTop = this.$el.querySelector(".header-noti").offsetTop;
            this.isFixed = window.scrollY > notiTop;
        }
    }
}
</script>
