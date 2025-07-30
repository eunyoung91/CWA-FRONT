<template>
  <ul class="paging-box">
    <li :class="{ disabled: !hasPreviousPageSet }">
      <a
        v-if="hasPreviousPageSet"
        href="#"
        @click.prevent="changePage(previousPageSetEnd)"
      >&lt; 이전</a>
      <span v-else>&lt; 이전</span>
    </li>

    <li
      v-for="pageNum in pageNumbers"
      :key="pageNum"
    >
      <a
        v-if="pageNum !== currentPage"
        href="#"
        @click.prevent="changePage(pageNum)"
      >{{ pageNum }}</a>
      <span
        v-else
        class="current"
      >{{ pageNum }}</span>
    </li>

    <li :class="{ disabled: !hasNextPageSet }">
      <a
        v-if="hasNextPageSet"
        href="#"
        @click.prevent="changePage(nextPageSetStart)"
      >다음 &gt;</a>
      <span v-else>다음 &gt;</span>
    </li>
  </ul>
</template>
  
  <script>
  export default {
    props: {
      currentUrl: {
        type: String,
        // required: true,
      },
      currentPage: {
        type: Number,
        required: true,
      },
      pageNumbers: {
        type: Array,
        required: true,
      },
      hasPreviousPageSet: {
        type: Boolean,
        required: true,
      },
      hasNextPageSet: {
        type: Boolean,
        required: true,
      },
      previousPageSetEnd: {
        type: Number,
        required: false,
      },
      nextPageSetStart: {
        type: Number,
        required: false,
      },
    },
    methods: {
      changePage(pageNumber) {
        this.$emit('page-changed', pageNumber);
      },
    },
  };
  </script>
