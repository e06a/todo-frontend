<script setup>
import {ref, onMounted, defineExpose, reactive} from 'vue';
import {Modal} from 'bootstrap';

defineProps(['title'])

const todoModal = ref(null);

let thisModalObj = null;

onMounted(() => {
  thisModalObj = new Modal(todoModal.value);
})

function show() {
  thisModalObj.show();
}

function hide() {
  thisModalObj.hide();
}

defineExpose({
  show: show,
  hide: hide
})
</script>

<template>
  <div class="modal fade" id="todoModal" tabindex="-1" aria-labelledby=""
       aria-hidden="true" ref="todoModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="col modal-title">{{ title }}</h5>
        </div>
        <div class="modal-body">
          <slot name="body"/>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>