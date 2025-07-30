<template>
    <aside class="admin-sidebar">
        <ul class="main-menu">
    
            <li class="menu-logo">
                <router-link to="/admin">
                    <img class="logo" :src="IMAGE_URL+'/admin_logo.png'" alt="메가스터디학원 관리자 사이트"/>
                </router-link>
            </li>
            <li
                v-for="(group, gIndex) in groupedMenus"
                :key="gIndex"
                class="menu-item"
            >
            
                <a class="menu-title" :class="{ 'has-active': isGroupActive(group) }">
                    {{ group.title }}
                </a>

                <ul class="sub-menu">
                    <li
                        v-for="(item, iIndex) in group.items"
                        :key="iIndex"
                    >
                        <router-link 
                        :to="getRoute(item.menuName2)" 
                        class="sub-menu-link"
                        :class="{ active: isActive(getRoute(item.menuName2)) }"
                        >
                            {{ item.menuName2 }}
                        </router-link>

                    </li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

<script>
import axiosInstance from '@/axios';

export default {
    name: 'SideBar',
    data() {
        return {
            menus: []
        };
    },
    computed: {
        groupedMenus() {
        const groups = {};
        this.menus.forEach(menu => {
            if (!groups[menu.seqGroup]) {
            groups[menu.seqGroup] = {
                title: menu.menuName1,
                items: []
            };
            }
            groups[menu.seqGroup].items.push(menu);
        });
        return Object.values(groups);
        }
    },
    mounted() {
        this.fetchMenuData();
    },
    methods: {

        async fetchMenuData() {
            try {
                const response = await axiosInstance.get('/api/menu', {
                    withCredentials: true
                });
                this.menus = response.data;
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        },
        manualRouteMap() {
            return {
                //수동 라우팅 매핑 정의
                //회원정보
                '회원리스트': '/member/member-list',
                '탈퇴리스트': '/member/member-signout',
                //강사정보
                '강사정보 관리': '/teacher/teacher-info-list',
                '강사진 관리': '/teacher/teacher-list',
                //학원관리 게시판
                '공지사항': '/notice/campus-notice',
                //사이트 관리
                '메뉴관리': '/site/site-menu',
                '메인 탭 관리': '/site/campus-main-tab',

            };
        },
        getRoute(menuName2) {
            const map = this.manualRouteMap();
            return map[menuName2] || '#'; // fallback 처리
        },

        //menu active
        isActive(path) {
        return this.$route.path === path;
        },
        isGroupActive(group) {
            return group.items.some(item => this.isActive(this.getRoute(item.menuName2)));
        }

    }
};
</script>


