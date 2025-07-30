<template>
  <div class="table-container">
    <table
      width="940px"
      border="0"
      cellspacing="0"
      cellpadding="0"
    >
      <tr>
        <td height="30px">
&nbsp;
        </td>
      </tr>
      <tr>
        <td>
          <table
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
          >
            <tr>
              <td class="t_tit01">
                <img
                  :src="IMAGE_URL+'/dot_icon03.png'"
                  width="12"
                  height="13"
                > 합격 수기
              </td>
              <td align="right" />
            </tr>
            <tr>
              <td
                height="10px"
                colspan="2"
              />
            </tr>
            <tr>
              <td colspan="2">
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr>
                    <td
                      align="center"
                      bgcolor="#f2f2f2"
                      style="padding:10px 10px;"
                    >
                      <form
                        id="form_search"
                        name="form_search"
                        action="?"
                        method="GET"
                      >
                        <input
                          type="hidden"
                          name="campuscodedetail"
                          value=""
                        >
                        <table
                          width="900"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                        >
                          <tr>
                            <td
                              height="1"
                              colspan="2"
                              bgcolor="#dcdcdc"
                            />
                          </tr>
                          <tr>
                            <td height="30">
                              <img
                                :src="IMAGE_URL+'/dot_icon01.png'"
                                width="3"
                                height="3"
                              >
                            </td>
                            <td style="padding-top:4px;">
                              <b>
                                <a @click.prevent="filterSugi('all')">전체</a>
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img
                                :src="IMAGE_URL+'/dot_icon01.png'"
                                width="3"
                                height="3"
                              >
                            </td>
                            <td
                              height="25"
                              style="padding-top:4px;padding-left:4px;"
                            >
                              <b>
                                <a
                                  v-for="(tc, index) in TopCampusList"
                                  :key="index"
                                  @click.prevent="filterSugi(tc)"
                                >{{ tc.campusName }} | </a>
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td height="30">
                              <img
                                :src="IMAGE_URL+'/dot_icon01.png'"
                                width="3"
                                height="3"
                              >
                            </td>
                            <td style="padding-top:4px;">
                              <b>연도 : </b>
                              <select
                                id="sugi_year"
                                v-model="sugi_year"
                                name="sugi_year"
                                @change="fetchData"
                              >	  
                                <option
                                  v-for="year in years"
                                  :key="year"
                                  :value="year"
                                >
                                  {{ year }}
                                </option>
                              </select>
                                
                              <b>대학별 : </b>
                              <select
                                id="sch_univ_ord"
                                v-model="sch_univ_ord"
                                name="sch_univ_ord"
                              >
                                <option value="">
                                  전체
                                </option>
                                <option value="1">
                                  01. 서울
                                </option>
                                <option value="2">
                                  02. 의예
                                </option>
                                <option value="3">
                                  03. 치의예
                                </option>
                                <option value="4">
                                  04. 한의예
                                </option>
                                <option value="5">
                                  05. 연세
                                </option>
                                <option value="6">
                                  06. 고려
                                </option>
                                <option value="7">
                                  07. 서강
                                </option>
                                <option value="8">
                                  08. 성균관
                                </option>
                                <option value="9">
                                  09. 한양
                                </option>
                                <option value="10">
                                  10. 이화
                                </option>
                                <option value="11">
                                  11. 중앙
                                </option>
                                <option value="12">
                                  12. 경희
                                </option>
                                <option value="13">
                                  13. 외대
                                </option>
                                <option value="14">
                                  14. 시립대
                                </option>
                                <option value="15">
                                  15. 건국
                                </option>
                                <option value="16">
                                  16. 동국
                                </option>
                                <option value="17">
                                  17. 홍익
                                </option>
                                <option value="18">
                                  18. 숙명
                                </option>
                              </select>
                              <select
                                id="sch_keyfield"
                                v-model="sch_keyfield"
                                name="sch_keyfield"
                                class="input"
                              >
                                <option value="1">
                                  제목 + 내용
                                </option>
                                <option value="2">
                                  제목
                                </option>
                                <option value="3">
                                  내용
                                </option>
                              </select>
                              <input
                                id="sch_keyword"
                                v-model="sch_keyword"
                                name="sch_keyword"
                                type="text"
                                size="15"
                                tabindex="1"
                                class="input_search"
                              >

                              <a
                                class="btn_01"
                                @click="fetchData"
                              >검색</a>
                              <a
                                href="?"
                                class="btn_01"
                              >취소</a>
                            </td>
                          </tr>
                        </table>
                      </form>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table
      width="940px"
      border="0"
      cellspacing="0"
      cellpadding="0"
    >
      <tr>
        <td
          height="30"
          colspan="2"
        />
      </tr>
      <tr>
        <td class="num_page">
          <a
            href="javascript:chgOrder();"
            class="btn_01"
          >순서변경</a>
          <a
            href="javascript:chgViewYn('Y');"
            class="btn_01"
          >노출</a>
          <a
            href="javascript:chgViewYn('N');"
            class="btn_01"
          >비노출</a>
        </td>
        <td align="right">
          <a class="btn_01">
            <router-link :to="{ path: '/site/site-sugi-write', query: { sugi_year: sugi_year}}">
              등록
            </router-link></a>
        </td>
      </tr>
    </table>
    <table
      width="940px"
      border="0"
      cellspacing="0"
      cellpadding="0"
    >      
      <tr>
        <td>
          <table
            width="940"
            border="0"
            cellspacing="0"
            cellpadding="0"
          >         
            <tr>
              <td colspan="2">
                <form
                  name="Listform"
                  method="post"
                  action=""
                >
                  <input
                    type="hidden"
                    name="mode"
                    value=""
                  >
                  <input
                    type="hidden"
                    name="value"
                    value=""
                  >
                    
                  <table
                    id="tb_sugi_list"
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    class="type01"
                  >
                    <thead>
                      <tr>
                        <th>
                          <input
                            id="cbChkAll"
                            type="checkbox"
                            style="cursor:pointer;"
                          >
                        </th>
                        <th>번호</th>
                        <th>학원명</th>
                        <th width="300">
                          제목
                        </th>
                        <th>등록일</th>
                        <th>조회수</th>
                        <th>작성자</th>
                        <th>노출</th>
                        <th>대학구분</th>
                        <th class="brn">
                          순서
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(ss, index) in SuccessStories"
                        :key="ss.code"
                      >
                        <td>
                          <input
                            type="checkbox"
                            name="cb_list_selected"
                            value=""
                            style="cursor:pointer;"
                          >
                        </td>
                        <td>{{ index+1 }}</td>
                        <td>{{ ss.name }}</td>
                        <td class="left">
                          <router-link :to="{ path: '/site/site-sugi-write', query: { c: ss.code, sugi_year: sugi_year}}">
                            {{ ss.sugiTitle }}
                          </router-link>
                        </td>
                        <td>{{ formatDate(ss.regDate) }}</td>
                        <td>{{ ss.viewCnt }}</td>
                        <td>{{ ss.mnName }}</td>
                        <td>{{ ss.viewYn }}</td>
                        <td />
                        <td>
                          ↑↓
                          <input
                            id=""
                            type="hidden"
                            name=""
                            value=""
                          >
                          <input
                            id=""
                            type="hidden"
                            name=""
                            value=""
                            style="ime-mode:disabled"
                            onkeypress="is_int_press3()"
                            maxlength="2"
                            size="3"
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axiosInstance from '@/axios';

export default {
    data() {
        return {
            SuccessStories: [],
            TopCampusList: [],
            years: [],
            sugi_year : new Date().getFullYear(),
            campuscodedetail : this.$route.query.campuscodedetail || '',
            campuscode : this.$route.query.campuscode || '',
            sch_univ_ord: this.$route.query.sch_univ_ord || '',
            sch_keyfield: 1,
            sch_keyword: this.$route.query.sch_keyword || ''
        };
    },
    created() {
        this.fetchData();
        
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 2018; year--){
            this.years.push(year);
        }
    },
    methods: {
        fetchData(){
            const params = {
                sugi_year : this.sugi_year,
                campuscodedetail : this.campuscodedetail,
                campuscode : this.campuscode,
                sch_univ_ord: this.sch_univ_ord,
                sch_keyfield: this.sch_keyfield,
                sch_keyword:this.sch_keyword
            }
            axiosInstance.get('/api/site/site-sugi', {
                params: params,
                withCredentials: true})
            .then(response => {
                this.SuccessStories = response.data;
            })
            .catch(error => {
                console.log.error(error);
            });

            axiosInstance.get('/api/site/top-campus-list', {withCredentials: true})
            .then(response => {
                this.TopCampusList = response.data;
            })
            .catch(error => {
                console.error(error);
            })
        },
        formatDate(dateTime) {
            return dateTime.substring(0, 10);
        },
        filterSugi(ca){

            let param = {
                campuscodedetail : "",
                campuscode : "",
                sugi_year : this.sugi_year,
                sch_univ_ord: "",
                sch_keyfield: "",
                sch_keyword: ""
            };

            if (ca != 'all') {
                console.log(ca);
                param = {
                    campuscodedetail : ca.campusCodeDetail,
                    campuscode : ca.campusCode,
                    sugi_year : this.sugi_year,
                    sch_univ_ord: this.sch_univ_ord,
                    sch_keyfield: this.sch_keyfield,
                    sch_keyword: this.sch_keyword
                };
            }

            axiosInstance.get("/api/site/site-sugi", {
                    params: param,
                    withCredentials: true})
                .then(response => {
                    this.SuccessStories = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}
</script>