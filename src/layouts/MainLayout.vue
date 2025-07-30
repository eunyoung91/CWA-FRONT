<template>
    <div class="admin-container">
        <SideBar />

        <div class="admin-content">
            
            <ContentHeader
            :userName="userName"
            :userRole="userRole"
            :loginTime="loginTime"
            />

            <div class="main-content">
                <router-view />
            </div>
        </div>
        
    </div>
</template>

<script>
import axiosInstance from '@/axios';
import SideBar from '@/components/SideBar.vue';
import ContentHeader from '@/components/ContentHeader.vue';

import { useLayoutStore } from '@/store/LayoutStore';

export default {
    components: {
        SideBar,
        ContentHeader,
    },
    props: {
        userName: String,
        userRole: String,
        loginTime: String
    },
    data() {
        return {
            username: '',
            authority: '',
            loginDate: ''
        };
    },
    created() {
        this.fetchUserInfo();
    },
    methods: {
        async fetchUserInfo() {
            try {
                const response = await axiosInstance.get('/api/userinfo',{
                    withCredentials: true
                });
                this.username = response.data.username;
                this.authority = response.data.authority;
                this.loginDate = response.data.loginDate;

                const layoutStore = useLayoutStore();
                layoutStore.setUsername(this.username);
            } catch(error) {
                console.error('Failed to fetch user info:', error);
            }
        },
        async logout(){
            try{
                const response = await axiosInstance.get('/api/logout',{
                    withCredentials: true
                });

                if (response.status == 200) {
                    this.$router.push('/');
                }
            } catch(error) {
                console.error('로그아웃 실패:', error);
            }
        }
    }
};
</script>