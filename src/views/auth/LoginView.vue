<script setup lang="ts">
import CsInput from "@/components/cs/cs-input/CsInput.vue";
import { computed, reactive, ref } from "vue";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import csSwal from "@/utils/cs-swal";
import $http from "@/http-common";

const form = reactive({
     username: "",
     password: "",
});

const rules = computed(() => {
     return {
          username: {
               required: helpers.withMessage("Email é obrigatório", required),
               username: helpers.withMessage("Email inválido", email),
          },
          password: {
               required: helpers.withMessage("Senha é obrigatória", required),
               minLength: helpers.withMessage(
                    "Senha deve ter pelo menos 6 caracteres",
                    minLength(6),
               ),
          },
     };
});

const $v = useVuelidate(rules, form);

const submitted = ref(false);

const onSubmit = () => {
     csSwal.fireLoading();

     submitted.value = true;
     $v.value.$touch();
     if ($v.value.$invalid) {
          csSwal.close();
          return;
     }

     $http.authApi
          .post("auth-token", {
               ...form,
          })
          .then((response) => {
               csSwal.fireSuccess().then(() => {
                    localStorage.setItem("auth-token", response.data.token);
               });
          })
          .catch(() => {
               csSwal.fireError();
          });
};
</script>

<template>
     <section class="login-view">
          <div class="card rounded-3 bg-white">
               <div class="card-header border-0 rounded-3 pt-4">
                    <h1 class="card-title h3 mb-0">
                         Sistema Auxilio Estudante
                    </h1>
               </div>
               <div class="card-body">
                    <form
                         class="form-container"
                         id="login-form"
                         @submit.prevent="onSubmit"
                    >
                         <CsInput
                              label="Email"
                              placeholder="Email"
                              type="email"
                              v-model="$v.username.$model"
                              :error="{
                                   show: $v.username.$error && submitted,
                                   message: $v.username.$errors[0]?.$message.toString(),
                              }"
                         />
                         <CsInput
                              label="Senha"
                              placeholder="Senha"
                              type="password"
                              v-model="$v.password.$model"
                              :error="{
                                   show: $v.password.$error && submitted,
                                   message: $v.password.$errors[0]?.$message.toString(),
                              }"
                         />
                    </form>
               </div>
               <div class="card-footer bg-white border-0 rounded-3 pb-3">
                    <button
                         class="btn btn-primary"
                         type="submit"
                         form="login-form"
                    >
                         Entrar
                    </button>
                    <hr />
                    <RouterLink class="text-center link" :to="{ name: 'auth' }">
                         Esqueceu sua senha?
                    </RouterLink>
                    <RouterLink
                         class="text-center link"
                         :to="{ name: 'signup' }"
                    >
                         Crie uma conta
                    </RouterLink>
               </div>
          </div>
     </section>
</template>

<style scoped lang="scss">
.card-footer {
     display: flex;
     flex-direction: column;
     .btn {
          width: 100%;
     }
     .link {
          cursor: pointer;
     }
}

.form-container {
     display: flex;
     flex-direction: column;
     gap: 1rem;
     min-width: 350px;
}

.card-header {
     background: inherit;
}
</style>
