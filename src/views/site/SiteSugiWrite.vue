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
                >{{ sugi_year }}학년도 합격 수기
              </td>
              <td align="right">
&nbsp;
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
        <td height="20">
&nbsp;
        </td>
      </tr>
      <tr>
        <td>
          <table
            width="940"
            border="0"
            cellspacing="0"
            cellpadding="0"
          >
            <tr>
              <td width="8">
                <img :src="IMAGE_URL+'/dot_icon04.png'">
              </td>
              <td
                width="212"
                class="sub_tit"
              >
                <b>합격 수기 등록</b>
              </td>
              <td width="720">
&nbsp;
              </td>
            </tr>
            <tr>
              <td
                height="10px"
                colspan="3"
              />
            </tr>
            <tr>
              <td colspan="3">
                <form
                  ref="sugiForm"
                  @submit.prevent="submitX"
                >
                  <table
                    width="940"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    class="type02"
                  >              
                    <tr>
                      <th width="100">
                        제목<span><b style="color:#F00" /></span>
                      </th>
                      <td>
                        <input
                          id="sugi_title"
                          v-model="successStoryHead.sugiTitle"
                          name="sugiTitle"
                          type="text"
                          size="30"
                          tabindex="1"
                          class="input_search"
                          maxlength="50"
                        ><br>
                        <span style="color:#F00">(예시 : 정세호 선배(가톨릭대 의예과 합격))</span>
                      </td>
                      <th width="100">
                        인터뷰 영상<br>
                        (선택)
                      </th>
                      <td
                        class="brn"
                        width="350"
                      >
                        <input
                          id="interview_mov"
                          v-model="successStoryHead.interviewMov"
                          name="interviewMov"
                          type="text"
                          size="30"
                          tabindex="1"
                          class="input_search"
                          maxlength="250"
                        ><br>
                        <span style="color:#F00">(영상코드만 입력하거나, 전체 URL 입력) </span>
                      </td>
                    </tr>
                    <tr>
                      <th>상단 이미지<span><b style="color:#F00" /></span></th>
                      <td>
                        <input
                          v-model="successStoryHead.sugiTitleImg"
                          type="text"
                          size="45"
                          tabindex="1"
                          class="input_search"
                          data-id="30"
                        >
                        <label
                          for="30"
                          class="btn_01"
                          style="color: #666666"
                        >찾아보기</label>
                        <input
                          id="30"
                          type="file"
                          name=""
                          style="display: none;"
                          @change="changeFile($event, '3', info)"
                        >
                      </td>
                      <th>썸네일 이미지</th>
                      <td class="brn">
                        <input
                          v-model="successStoryHead.thumbnailImg"
                          type="text"
                          size="45"
                          tabindex="1"
                          class="input_search"
                          data-id="40"
                        >
                        <label
                          for="40"
                          class="btn_01"
                          style="color: #666666"
                        >찾아보기</label>
                        <input
                          id="40"
                          type="file"
                          name=""
                          style="display: none;"
                          @change="changeFile($event, '4', info)"
                        >
                      </td>
                    </tr>
                    <tr>
                      <th>학번<span><b style="color:#F00" /></span></th>
                      <td>
                        <input
                          id="ams_mem_cd"
                          v-model="successStoryHead.amsMemCd"
                          name="amsMemCd"
                          value=""
                          maxlength="6"
                          type="text"
                          size="30"
                          tabindex="1"
                          class="input_search"
                        >
                        <a
                          class="btn_01"
                          @click="getAmsInfo"
                        >확인</a>
                        <span id="show_ams_info" /><br>
                        <span style="color:#F00">(학번 입력 후, 버튼 클릭)</span>
                      </td>
                      <th>합격 대학</th>
                      <td class="brn">
                        <span id="show_pass_univ_info" />
                      </td>
                    </tr>
                    <tr>
                      <th>대학별 구분<span><b style="color:#F00" /></span></th>
                      <td>
                        <select
                          id="sel_univ_ord"
                          name=""
                        >
                          <option value="">
                            선택
                          </option>
                          <option value="1">
                            1. 서울
                          </option>
                          <option value="2">
                            2. 의예
                          </option>
                          <option value="3">
                            3. 치의예
                          </option>
                          <option value="4">
                            4. 한의예
                          </option>
                          <option value="5">
                            5. 연세
                          </option>
                          <option value="6">
                            6. 고려
                          </option>
                          <option value="7">
                            7. 서강
                          </option>
                          <option value="8">
                            8. 성균관
                          </option>
                          <option value="9">
                            9. 한양
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
                          <option value="19">
                            19. 특수
                          </option>
                        </select>
                      </td>
                      <th>개별 순서</th>
                      <td class="brn">
                        <input
                          id="txt_ord_no"
                          v-model="successStoryHead.ordNo"
                          type="text"
                          size="15"
                          tabindex="1"
                          class="input_search"
                          name="txt_ord_no"
                          style="ime-mode:disabled"
                          maxlength="2"
                        >
                      </td>
                    </tr>
                    <tr>
                      <th>
                        수기 <br>
                        요약문구
                      </th>
                      <td
                        colspan="3"
                        class="brn"
                      >
                        <textarea
                          id="sugi_summary"
                          v-model="successStoryHead.sugiSummary"
                          name="sugiSummary"
                          cols="129"
                          rows="5"
                        />
                      </td>
                    </tr>              
                    <tr>
                      <th>
                        수기<br>
                        상세내용<br><br>
                        <a
                          href="javascript:;"
                          class="btn_01"
                          Onfocus="this.blur()"
                          @click="addTrSugiContentRow"
                        >추가</a><br>
                        <a
                          href="javascript:;"
                          class="btn_01"
                          Onfocus="this.blur()"
                          @click="delTrSugiContentRow"
                        >삭제</a>
                      </th>
                      <td
                        colspan="3"
                        class="brn"
                      >
                        <table
                          id="tb_sugi_content"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                        >
                          <tr
                            v-for="body in successStoryBodies"
                            :key="body.sugiSubject"
                          >
                            <td class="brn">
                              <table
                                width="100%"
                                border="1"
                                cellpadding="0"
                                cellspacing="0"
                                class="type05"
                              >
                                <tr>
                                  <th width="40">
                                    제목
                                  </th>
                                  <td class="brn">
                                    &nbsp;<input
                                      id="sugi_content_subject_<%=nLoopCnt+1%>"
                                      v-model="body.sugiSubject"
                                      type="text"
                                      name=""
                                      class="input"
                                      size="105"
                                      maxlength="100"
                                    >
                                  </td>
                                </tr>
                                <tr>
                                  <th width="40">
                                    내용
                                  </th>
                                  <td class="brn">
                                    <textarea
                                      id="sugi_content_desc_<%=nLoopCnt+1%>"
                                      v-model="body.sugiContent"
                                      name=""
                                      style="width:100%;height:150px;"
                                    />
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
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
    <table
      width="940px"
      border="0"
      cellspacing="0"
      cellpadding="0"
    >
      <tr>
        <td>
          <a
            class="btn_01"
            @click="delContentX"
          >삭제</a>
        </td>
        <td
          align="right"
          class="num_page"
        >
          <a
            href="#"
            class="btn_01"
            @click="submitX"
          >확인</a>
          <a
            class="btn_01"
            @click="cancel"
          >취소</a>
        </td>
      </tr> 
      <tr>
        <td
          colspan="2"
          align="center"
          class="num_page"
        >
&nbsp;
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
            c: this.$route.query.c || '',
            sugi_year: this.$route.query.sugi_year || '',
            successStoryHead: {},
            successStoryBodies: [],
            campusCode: "",
            campusDetailCode: ""
        };
    },
    watch: {
        '$route.query.c': 'fetchData'
    },
    created() {
        if (this.c){
            this.fetchData();
        }
    },
    methods: {
        fetchData(){
            const c = this.c;

            axiosInstance.get('/api/site/site-sugi-write', {
                params: {c},
                withCredentials: true})
            .then(response => {
                this.successStoryHead = response.data.successStoryHead;
                this.successStoryBodies = response.data.successStoryBodies;
            })
            .catch(error => {
                console.error(error);
            });
        },
        formatDate(dateTime) {
            return dateTime.substring(0, 10);
        },

        changeFile(event, num){
            var fileName = event.target.files[0].name;

            if (num === '3'){
                this.successStoryHead.sugiTitleImg = fileName;
            }

            else if (num === '4'){
                this.successStoryHead.thumbnailImg = fileName;
            }
        }, 

        addTrSugiContentRow(){
            this.successStoryBodies.push({"sugiSubject": "", "sugiContent": ""});
        },

        delTrSugiContentRow(){
            this.successStoryBodies.pop();
        },

        submitX() {
            const cnt = this.successStoryBodies.length;

            if (cnt == 0){
                alert("수기 내용이 없습니다.");
                console.log(this.successStoryHead.sugiTitle);
            }
            else if (this.successStoryHead.sugiTitle === "" || this.successStoryHead.sugiTitle === undefined){
                alert("제목이 없습니다.");
            }
            else if (this.successStoryHead.amsMemCd === "" || this.successStoryHead.amsMemCd === undefined){
                alert("학번이 없습니다.");
            }
            else{
                const formData = new FormData(this.$refs.sugiForm);

                if (this.successStoryHead.sugiTitleImg === "" || this.successStoryHead.sugiTitleImg === undefined){
                    this.successStoryHead.sugiTitleImg = "";
                }

                if (this.successStoryHead.thumbnailImg === "" || this.successStoryHead.thumbnailImg === undefined){
                    this.successStoryHead.thumbnailImg = "";
                }

                formData.append('sugiYear', this.sugi_year);
                formData.append('sugiTitleImg', this.successStoryHead.sugiTitleImg);
                formData.append('thumbnailImg', this.successStoryHead.thumbnailImg);
                if (this.c){
                    formData.append('code', this.c);
                }
                formData.append('campusCode', this.campusCode);
                formData.append('campusDetailCode', this.campusDetailCode);

                axiosInstance.post("/api/site/site-sugi-regx", formData, {
                    headers: {
                        'Content-Type': 'application/json'
                        },
                        withCredentials: true
                })
                .then(response => {
                    alert(response.data);
                    this.saveSugis(response.data);
                })
            }
        },
        getAmsInfo(){
            const amsMemCd = this.successStoryHead.amsMemCd;

            axiosInstance.get('/api/site/amsinfo', {
                params: {amsMemCd},
                withCredentials: true})
            .then(response => {
                this.campusCode = response.data.campusCode;
                this.campusDetailCode = response.data.campusDetailCode;
            })
            .catch(error => {
                console.error(error);
            });
        },
        delContentX(){
            const confirmDelete = confirm("삭제하시겠습니까?");

            if (confirmDelete){
                axiosInstance.delete('/api/site/site-sugi', {
                    params: {c: this.c},
                    withCredentials: true
                })
                .then(response => {
                    alert(response.data);

                    this.$router.push('/site/site-sugi');
                })
                .catch(error => {
                    console.error(error);
                })
            }   
        },
        saveSugis(code){
            const cnt = this.successStoryBodies.length;

            const req = this.successStoryBodies.map((item, index) => ({
                cnt: cnt,
                code: code,
                index: index+1,
                value: item
            }));

            axiosInstance.post('/api/site/site-sugi-regx/body', req, {withCredentials: true})
            .then(response => {
                alert(response.data);
                this.$router.push('/site/site-sugi');
            })
            .catch(error => {
                console.error(error);
            })
        },
        cancel(){
            this.$router.push('/site/site-sugi');
        }
    }
};
</script>