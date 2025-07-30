import { createRouter, createWebHistory } from "vue-router";

import UserLogin from "@/views/login/UserLogin.vue";
import UserAdmin from "@/views/UserAdmin.vue";

import MainLayout from "@/layouts/MainLayout.vue";

import MemberList from "@/views/member/MemberList.vue";
import MemberSignout from "@/views/member/MemberSignout.vue";

import TeacherInfoList from "@/views/teacher/TeacherInfoList.vue";
import TeacherInfoInput from "@/views/teacher/TeacherInfoInput.vue";
import TeacherList from "@/views/teacher/TeacherList.vue";
import TeacherWrite from "@/views/teacher/TeacherWrite.vue";
import TeacherModify from "@/views/teacher/TeacherModify.vue";

import CampusNotice from "@/views/notice/CampusNotice.vue";
import CampusNoticeWrite from "@/views/notice/CampusNoticeWrite.vue";

import siteMenu from "@/views/site/siteMenu.vue";
import campusMainTab from "@/views/site/campusMainTab.vue";

const routes = [
    //로그인
    {
        path: '/',
        name: 'Login',
        component: UserLogin
    },
    //메인
    {
        path: '/admin',
        name: 'Admin',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'UserAdmin',
                component: UserAdmin
            }
        ]
    },
    
    //회원정보
    {
        path: '/member',
        component: MainLayout,
        children: [
            {
                path: 'member-list',
                name: 'MemberList',
                component: MemberList
            },
            {
                path: 'member-signout',
                name: 'MemberSignout',
                component: MemberSignout
            }
        ]
    },

    // 강사정보
    {
        path: '/teacher',
        component: MainLayout,
        children: [
            {
                path: 'teacher-info-list',
                name: 'TeacherInfoList',
                component: TeacherInfoList
            },
            {
                path: 'teacher-info-input',
                name: 'TeacherInfoInput',
                component: TeacherInfoInput
            },
            {
                path: 'teacher-list',
                name: 'TeacherList',
                component: TeacherList
            },
            {
                path: 'teacher-modify',
                name: 'TeacherModify',
                component: TeacherModify
            },
            {
                path: 'teacher-write',
                name: 'TeacherWrite',
                component: TeacherWrite
            },

        ]
    },

    // 사이트관리
    {
        path: '/site',
        component: MainLayout,
        children: [
            {
                path: 'site-menu',
                name: 'siteMenu',
                component: siteMenu
            },
            {
                path: 'campus-main-tab',
                name: 'campusMainTab',
                component: campusMainTab
            },
        ]
    },


    //학원관리 게시판
    {
        path: '/notice',
        component: MainLayout,
        children: [
            {
                path: 'campus-notice',
                name: 'CampusNotice',
                component: CampusNotice
            },
            {
                path: 'campus-notice-write',
                name: 'CampusNoticeWrite',
                component: CampusNoticeWrite
            }
        ]
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;