<template>
    <div class="login-wrap">
        <header>
            <h1>
                <img :src="IMAGE_URL+'/mega_logo.png'" alt="메가스터디학원">
            </h1>
        </header>

        <div id="container">
            <div class="ct-login">
                <h2>
                    안녕하세요 <span class="emoji">👋</span><br />
                    메가스터디학원 관리자 사이트입니다.
                </h2>
                <div class="line">
                    <label for="userid" class="sr-only">아이디</label>
                    <input
                        id="userid"
                        v-model="loginForm.userid"
                        type="text"
                        size="37"
                        placeholder="아이디"
                    >
                </div>
                <div class="line">
                    <label for="passwd" class="sr-only">비밀번호</label>
                    <input
                        id="passwd"
                        v-model="loginForm.passwd"
                        type="password"
                        size="37"
                        @keydown.enter="checkLogin"
                        placeholder="비밀번호"
                    >
                </div>

                <button class="btn-login" @click="checkLogin"><span>로그인</span></button>

                <div class="id-chk btn-wrap">
                    <div>
                        <input type="checkbox" id="id_chk" name="id_chk" required="required" v-model="rememberId" />
                        <label for="id_chk">아이디 저장</label>
                    </div>
                    <a href="javascript:void(0)" @click.prevent="openPopup('popupLoginInfo')">
                        <span>관리자 신청/로그인 안내</span>
                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                    </a>
                </div>

                <!-- 인증번호 팝업 -->
                <PopupLayer
                    :visible="popups.popupCertNumber"
                    @close="closePopup('popupCertNumber')"
                >
                    <div class="popup-cert-number">
                        <h3><span class="emoji">🔒</span>로그인 인증확인</h3>
                        <p>
                            휴대전화번호로 전송된 인증번호 6자리 및<br />
                            업무시간 외 접속사유를 입력 후 <span>[인증하기]</span> 버튼을 눌러주세요.
                        </p>
                        <p>
                            휴대전화번호로 전송된 인증번호 6자리를 입력하신 후,<br />
                            <span>[인증하기]</span> 버튼을 눌러주세요.
                        </p>
                        <div class="cert-form">
                            <form
                                @submit.prevent="submitCode"
                            >
                                <label for="verificationCode"></label>
                                <input
                                    id="verificationCode"
                                    v-model="verificationCode"
                                    type="text"
                                    title="인증번호 6자리 입력"
                                    placeholder="인증번호 6자리 입력"
                                >
                                <button type="submit">인증하기</button>
                            </form>
                        </div>
                        
                        <div>
                            <button class="btn-link"  @click="resendVerificationCode">인증번호 재요청</button>
                        </div>
                        <p>
                            업무시간 외(00:00~06:00) 접속 시 접속사유를 입력해 주세요.<br />
                            입력하신 사유와 접속기록은 저장되어 별도 관리됩니다.
                        </p>
                        <textarea
                            id="rejectReason"
                            class="cert-txt"
                            name="rejectReason"
                            type="text"
                            title="시간 외 로그인"
                            placeholder="한글 5자(10byte) 이상 입력해 주세요."
                            v-model="rejectReason"
                        >
                        </textarea>
                    </div>
                </PopupLayer>
                <!-- // 인증번호 팝업 -->

                <!-- 관리자 신청/로그인 안내 팝업 -->
                <PopupLayer
                    :visible="popups.popupLoginInfo"
                    @close="closePopup('popupLoginInfo')"
                >
                    <div class="popup-login-info">
                        <h3><span class="emoji">📌</span>관리자 신청/로그인 안내</h3>
                        <dl>
                            <dt>
                                메가스터디학원 관리자 계정 신청 안내
                                <a :href="downloadLink" download>보안서약서&nbsp;
                                    <i class="ico ico-down"></i>
                                </a>
                            </dt>
                            <dd>
                                ① 보안서약서 파일 다운로드 후, 계정 신청자 본인 자필로 작성 및 서명<br>
                            </dd>
                            <dd>
                                ② <em>EKP > 결재 >  기안 > 계정 등록/변경 신청서(학원 관리자)</em>에 보안서약서를 첨부하여 결재 상신
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                로그인 안내
                            </dt>
                            <dd>
                                전사회원통합 SSO 도입(2024년 10월 16일) 이전에 회원가입한 ID를 <em>통합회원으로 ‘전환’ 하신 경우,</em><br>
                                <em>관리자 계정 신청서에 기재한 ID와 통합회원 전환 시 설정한 PW로 로그인할 수 있습니다.</em><br>
                                (단, 홈페이지 로그인이나 비밀번호 변경은 통합회원 ID를 기준으로 조회할 수 있습니다.)<br>
                            </dd>
                        </dl>
                    </div>
                </PopupLayer>
                <!-- // 관리자 신청/로그인 안내 팝업 -->

            </div>
        </div>
    </div>
</template>

<script>

import axiosInstance from '@/axios';
import PopupLayer from '@/components/PopupLayer.vue';

export default {
    components :{
        PopupLayer,
    },

    data() {
        return {
            popups: {
                popupLoginInfo: false,
                popupCertNumber: false
            },
            loginForm: {
                userid: '',
                passwd: '',
            },
            rememberId: false,
            showVerificationForm: false,
            verificationCode: '',
            downloadLink: 'https://campus.megastudy.net/admin/docs/보안서약서.zip',
            rejectReason: '',
        };
    },

    mounted() {
        const storedId = localStorage.getItem('savedId');
        if (storedId) {
            this.loginForm.userid = storedId;
            
            this.rememberId = true;
        }
    },
    methods: {

        openPopup(popupKey) {
            this.popups[popupKey] = true;
            document.body.style.overflow = 'hidden';
        },
        closePopup(popupKey) {
            this.popups[popupKey] = false;
            this.$nextTick(() => {
                if (!this.isAnyPopupVisible()) {
                    document.body.style.overflow = '';
                }
            });
        },
        isAnyPopupVisible() {
            return Object.values(this.popups).some(val => val);
        },

        checkLogin() {
            if (!this.loginForm.userid) {
                alert('아이디를 입력하세요!');
                return;
            }
            if (!this.loginForm.passwd) {
                alert('비밀번호를 입력하세요!');
                return;
            }
            this.submitLoginForm();
        },
        submitLoginForm() {
            if (this.rememberId) {
                localStorage.setItem('savedId', this.loginForm.userid);
            } else {
                localStorage.removeItem('savedId');
            }

            // 인증번호 발급 API 요청
            axiosInstance
                .post('/api/perform-login', {
                    userid: this.loginForm.userid,
                    passwd: this.loginForm.passwd,
                })
                .then((response) => {
                    if (response.data.length > 6) {
                        alert(response.data);
                        location.reload();
                    } else {
                        this.verificationCode = response.data; // 인증번호 저장
                        this.popups.popupCertNumber = true;
                        document.body.style.overflow = 'hidden';
                    }
                })
                .catch((error) => {
                    alert('Login failed: ' + error.response.data);
                });
        },

        submitCode() {
            if (!this.verificationCode) {
                alert('인증번호를 입력하세요!');
                return;
            }

            axiosInstance
                .post('/api/login', {
                    userid: this.loginForm.userid,
                    passwd: this.loginForm.passwd,
                    verificationCode: this.verificationCode,
                }, {withCredentials: true,})
                .then((response) => {
                    if (response.data.length > 7) {
                        alert(response.data);
                        location.reload();
                    } else {
                        // 팝업 닫기를 하지 않더라도 overflow 원상복구
                        document.body.style.overflow = '';
                        this.$router.push('/admin');
                    }
                })
                .catch((error) => {
                    alert('Login failed: ' + error.response.data);
                });
            },

            resendVerificationCode() {
                // axiosInstance
                //     .post('/api/resend-code', {
                //         userid: this.loginForm.userid,
                //     })
                //     .then(() => {
                //         alert('인증번호를 재전송했습니다.');
                //     })
                //     .catch(() => {
                //         alert('인증번호 재요청에 실패했습니다.');
                //     });
            }
    },
};
</script>