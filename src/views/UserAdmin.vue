<template>
    <div>
        <div class="title-menu">
            <div class="title-main">
                <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀">
                <span>회원 현황 (금일 : <b>{{ today }}</b> 기준)</span>
            </div>
            <div>
                <CommonButton variant="primary" size="small" :to="{ name: 'MemberList' }">
                    바로가기
                </CommonButton>
            </div>
        </div>
        <div class="table-area">
            <form @submit.prevent="">
                <table class="type-1 auto">
                    <tbody>
                        <tr>
                            <th scope="col" colspan="3">금일 신규 회원수</th>
                            <th scope="col" rowspan="2">금일 탈퇴<br> 회원수</th>
                            <th scope="col" rowspan="2">전체 가입<br> 회원수</th>
                            <th scope="col" rowspan="2">전체 탈퇴<br> 회원수</th>
                            <th scope="col" rowspan="2">전체 휴면<br> 회원수</th>
                            <th scope="col" colspan="4" class="brn">회원별 학년 구분</th>
                        </tr>
                        <tr>
                            <td class="blue">총원</td>
                            <td class="blue">동시가입<br>(회원사이트)</td>
                            <td class="blue">동시가입<br>(고등사이트)</td>
                            <td class="blue">중1~3</td>
                            <td class="blue">고1~3</td>
                            <td class="blue">재수</td>
                            <td class="blue brn">재수이상</td>
                        </tr>
                        <tr>
                            <td
                                v-for="(value, idx) in memberStatusData"
                                :key="'memberStatusData-' + idx"
                                :class="value.class"
                                >
                                <b>{{ value.value }}</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

        <div class="column-area">
            <div class="column-2">
                <div class="title-menu">
                    <div class="title-main">
                        <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀">
                        <span>최근 등록 공지사항</span>
                    </div>
                    <div>
                        <CommonButton variant="primary" size="small" :to="{ name: 'CampusNotice' }">
                            바로가기
                        </CommonButton>
                    </div>
                </div>
                <div class="table-area">
                    <div class="table-wrapper">
                        <form @submit.prevent="">
                            <table class="type-1 auto">
                                <colgroup>
                                    <col style="width:25%;">
                                    <col style="width:55%;">
                                    <col style="width:20%;">
                                </colgroup>            
                                <tbody>
                                    <tr>
                                        <th scope="col" width="100">구분</th>
                                        <th scope="col">내용</th>
                                        <th scope="col" width="70" class="brn">날짜</th>
                                    </tr>
                                    <tr v-for="(row, idx) in noticeList" :key="idx">
                                        <td width="100">{{ row.category }}</td>
                                        <td>
                                            <a :href="row.link" v-html="row.title"></a>
                                        </td>
                                        <td width="70" class="brn">{{ row.date }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>

            <div class="column-2">
                <div class="title-menu">
                    <div class="title-main">
                        <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀">
                        <span>관리자 최근 로그인 현황</span>
                    </div>
                    <div>
                        <CommonButton variant="primary" size="small">바로가기</CommonButton>
                    </div>
                </div>

                <div class="table-area">
                    <div class="table-wrapper">
                        <form @submit.prevent="">
                            <table class="type-1 auto">
                                <colgroup>
                                    <col style="width:25%;" />
                                    <col style="width:55%;" />
                                    <col style="width:20%;" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th scope="col">구분</th>
                                        <th scope="col">이름(아이디)</th>
                                        <th scope="col" class="brn">날짜</th>
                                    </tr>
                                    <tr v-for="(row, index) in memberList" :key="index">
                                        <td class="blue">{{ row.branch }}</td>
                                        <td>{{ row.name }}</td>
                                        <td class="brn">{{ row.date }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>

            </div>
        </div>

        <div class="column-area">
            <div class="column-2">
                <div class="title-menu">
                    <div class="title-main">
                        <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀">
                        <span>최근 등록 Q&A</span>
                    </div>
                    <div>
                        <CommonButton variant="primary" size="small">바로가기</CommonButton>
                    </div>
                </div>

                <div class="table-area">
                    <div class="table-wrapper">
                    <form @submit.prevent="">
                        <table class="type-1 auto">
                        <colgroup>
                            <col style="width:25%;">
                            <col style="width:55%;">
                            <col style="width:20%;">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="col" width="100">구분</th>
                                <th scope="col">내용</th>
                                <th scope="col" width="70" class="brn">날짜</th>
                            </tr>
                            <tr v-for="(item, index) in recentQnaData" :key="index">
                                <td class="blue">{{ item.category }}</td>
                                <td>
                                    <a :href="item.link">{{ item.title }}</a>
                                </td>
                                <td class="brn">{{ item.date }}</td>
                            </tr>
                        </tbody>
                        </table>
                    </form>
                    </div>
                </div>

            </div>

            <div class="column-2">
                <div class="title-menu">
                    <div class="title-main">
                        <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀">
                        <span>학원별 Q&A 현황</span>
                    </div>
                    <div>
                        <CommonButton variant="primary" size="small">바로가기</CommonButton>
                    </div>
                </div>
                <div class="table-area">
                    <div class="table-wrapper">
                    <form @submit.prevent="">
                        <table class="type-1 auto">
                        <thead>
                            <tr>
                            <th scope="col" width="100">학원</th>
                            <th scope="col">건수</th>
                            <th scope="col" width="100">학원</th>
                            <th scope="col">건수</th>
                            <th scope="col" width="100">기숙학원</th>
                            <th scope="col" class="brn">건수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, rowIndex) in academyQnaStatus" :key="rowIndex">
                                <td class="blue">{{ row[0].name }}</td>
                                <td>
                                    <a :href="row[0].link">{{ row[0].count }}</a>
                                </td>

                                <td class="blue">{{ row[1].name }}</td>
                                <td>
                                    <a :href="row[1].link">{{ row[1].count }}</a>
                                </td>

                                <td class="blue">{{ row[2].name }}</td>
                                <td class="brn">
                                    <a :href="row[2].link">{{ row[2].count }}</a>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="column-area">
            <div class="column-2">
                <div class="title-menu">
                    <div class="title-main">
                        <img src="https://campus.megastudy.net/admin/image/dot_icon03.png" alt="타이틀">
                        <span>최근 삭제된 Q&A</span>
                    </div>
                    <div>
                        <CommonButton variant="primary" size="small">바로가기</CommonButton>
                    </div>
                </div>
                <div class="table-area">
                    <div class="table-wrapper">
                    <form @submit.prevent="">
                        <table class="type-1 auto">
                        <colgroup>
                            <col style="width:25%;" />
                            <col style="width:55%;" />
                            <col style="width:20%;" />
                        </colgroup>
                        <thead>
                            <tr>
                            <th scope="col" width="100">구분</th>
                            <th scope="col">내용</th>
                            <th scope="col" width="70" class="brn">날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in deletedQnaData" :key="index">
                            <td class="blue">{{ item.category }}</td>
                            <td>
                                <a :href="item.link">{{ item.content }}</a>
                            </td>
                            <td class="brn">{{ item.date }}</td>
                            </tr>
                        </tbody>
                        </table>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axiosInstance from '@/axios';

export default {
    data() {
        return {
            today: '2025-04-07',
            
            //회원 현황
            memberStatusData: [
                { value: '197명', class: '' },
                { value: '0명', class: '' },
                { value: '0명', class: '' },
                { value: '18명', class: '' },
                { value: '693,522명', class: '' },
                { value: '3,097명', class: '' },
                { value: '0명', class: '' },
                { value: '820명', class: '' },
                { value: '16,340명', class: '' },
                { value: '8,910명', class: '' },
                { value: '10명', class: 'brn' }
            ],
            //최근 등록 공지사항
            noticeList: [
                {
                    category: '송파 재수학원',
                    title: '★ N수 반수반 모집요강 알림 신청 ★',
                    link: '',
                    date: '2025-04-04'
                },
            ],
            //관리자 최근 로그인 현황
            memberList: [
                { branch: '본사', name: '박*영(eyp*****)', date: '2025-04-07' },
                { branch: '송파', name: '이*영(y08*****)', date: '2025-04-07' },
            ],
            //최근 등록 Q&A 
            recentQnaData: [
                {
                    category: "노량진 재수학원",
                    title: "재원증명서 발급 받고 싶습니다",
                    link: "",
                    date: "2025-04-06"
                },
                {
                    category: "송파 재수학원",
                    title: "검정고시",
                    link: "",
                    date: "2025-04-05"
                },
                {
                    category: "신촌 재수학원",
                    title: "6모 신청",
                    link: "",
                    date: "2025-04-04"
                },
                {
                    category: "신촌 재수학원",
                    title: "6모 신청",
                    link: "",
                    date: "2025-04-04"
                },
                {
                    category: "신촌 재수학원",
                    title: "6모 신청",
                    link: "",
                    date: "2025-04-04"
                }
            ],
            //학원별 Q&A 현황
            academyQnaStatus: [
                [
                    { name: "전체", count: "33건", link: "" },
                    { name: "송파 재수학원", count: "0건", link: "" },
                    { name: "최상위권 전문관", count: "3건", link: "" },
                ],
                [
                    { name: "강남 재수학원", count: "9건", link: "" },
                    { name: "부천 재수학원", count: "0건", link: "" },
                    { name: "자연계 전문관", count: "0건", link: "" },
                ],
                [
                    { name: "서초 재수학원", count: "4건", link: "" },
                    { name: "분당 재수학원", count: "0건", link: "" },
                    { name: "", count: "", link: "#" },
                ],
                [
                    { name: "강북 재수학원", count: "1건", link: "" },
                    { name: "일산 재수학원", count: "1건", link: "" },
                    { name: "", count: "", link: "#" },
                ],
                [
                    { name: "노량진 재수학원", count: "0건", link: "" },
                    { name: "평촌 재수학원", count: "0건", link: "" },
                    { name: "", count: "", link: "#" },
                ],
                [
                    { name: "신촌 재수학원", count: "0건", link: "" },
                    { name: "성북 재학학원", count: "6건", link: "" },
                    { name: "", count: "", link: "#" },
                ],
            ],
            //최근 삭제된 Q&A
            deletedQnaData: [
                {
                    category: "신촌 재수학원",
                    content: "6모 신청",
                    link: "",
                    date: "2025-04-04",
                },
            ],

        }
    }
}
</script>