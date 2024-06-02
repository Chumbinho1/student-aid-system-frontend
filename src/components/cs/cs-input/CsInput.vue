<script setup lang="ts">
import { computed, reactive, type Ref, ref, watch } from "vue";

const props = withDefaults(
     defineProps<{
          type:
               | "text"
               | "password"
               | "email"
               | "number"
               | "tel"
               | "date"
               | "time";
          placeholder?: string;
          label?: string;
          disabled?: boolean;
          readonly?: boolean;
          customClass?: string;
          error?: {
               show: boolean;
               message: string;
          };
     }>(),
     {
          type: "text",
     },
);

const modelValue = defineModel();
const showPassword = ref(false);

const showPasswordIcon = computed(() => {
     return showPassword.value ? "bi-eye-slash" : "bi-eye";
});
const passwordInputType = computed(() => {
     return showPassword.value ? "text" : "password";
});
</script>

<template>
     <div class="cs-input">
          <label v-if="label" class="form-label">
               {{ label }}
               <template v-if="type === 'password'">
                    <div class="password-input-wrapper">
                         <input
                              class="form-control"
                              :class="[
                                   { 'is-invalid': error?.show },
                                   customClass,
                              ]"
                              :type="passwordInputType"
                              :placeholder="placeholder"
                              :disabled="disabled"
                              :readonly="readonly"
                              v-model="modelValue"
                         />
                         <i
                              class="icon bi"
                              :class="showPasswordIcon"
                              @click="showPassword = !showPassword"
                         />
                    </div>
               </template>

               <template v-else>
                    <input
                         class="form-control"
                         :class="[
                              {
                                   'is-invalid': error?.show,
                              },
                              customClass,
                         ]"
                         :type="type"
                         :placeholder="placeholder"
                         :disabled="disabled"
                         :readonly="readonly"
                         v-model="modelValue"
                    />
               </template>
          </label>
          <p v-if="error && error.show" class="text-danger pb-0 mb-0">
               {{ error?.message }}
          </p>
     </div>
</template>

<style scoped lang="scss">
.cs-input {
     .form-label {
          width: 100%;

          .password-input-wrapper {
               position: relative;
               .form-control[type="password"],
               .form-control[type="text"] {
                    padding-right: 30px;
                    &.is-valid:valid {
                         background-image: none;
                    }

                    .was-validated .form-control:invalid,
                    &.is-invalid {
                         background-image: none !important;
                    }
               }
               .icon {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
               }
          }
     }
}
</style>
