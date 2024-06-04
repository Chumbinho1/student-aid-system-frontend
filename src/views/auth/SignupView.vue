<script setup lang="ts">
import CsInput from "@/components/cs/cs-input/CsInput.vue";
import { computed, reactive, ref } from "vue";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import csSwal from "@/utils/cs-swal";
import $http from "@/http-common";
import { error } from "console";
import router from "@/router";

const form = reactive({
     email: "",
     password: "",
     passwordConfirmation: "",
     name: "",
});

const rules = computed(() => {
     return {
          name: {
               required: helpers.withMessage("Nome é obrigatório", required),
          },
          email: {
               required: helpers.withMessage("Email é obrigatório", required),
               email: helpers.withMessage("Email inválido", email),
          },
          password: {
               required: helpers.withMessage("Senha é obrigatória", required),
               minLength: helpers.withMessage(
                    "Senha deve ter pelo menos 6 caracteres",
                    minLength(6),
               ),
          },
          passwordConfirmation: {
               required: helpers.withMessage(
                    "Confirme a Senha é obrigatória",
                    required,
               ),
               sameAs: helpers.withMessage(
                    "As senhas devem ser iguais",
                    (value) => value === form.password,
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

     $http.api
          .post("user", {
               ...form,
          })
          .then((response) => {
               csSwal.fireSuccess().then(() => {
                    router.push({ name: "login" });
               });
          })
          .catch((error) => {
               console.log(error);
          });
};
</script>

<template>
     <section class="signup-view">
          <div class="card rounded-3 bg-white">
               <div class="card-header border-0 rounded-3 pt-4">
                    <h1 class="card-title h3 mb-0">Criar Conta</h1>
               </div>
               <div class="card-body">
                    <form
                         class="form-container"
                         id="signup-form"
                         @submit.prevent="onSubmit"
                    >
                         <CsInput
                              label="Nome"
                              placeholder="Nome"
                              type="text"
                              v-model="$v.name.$model"
                              :error="{
                                   show: $v.name.$error && submitted,
                                   message: $v.name.$errors[0]?.$message.toString(),
                              }"
                         />
                         <CsInput
                              label="Email"
                              placeholder="Email"
                              type="email"
                              v-model="$v.email.$model"
                              :error="{
                                   show: $v.email.$error && submitted,
                                   message: $v.email.$errors[0]?.$message.toString(),
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
                         <CsInput
                              label="Confirme a Senha"
                              placeholder="Confirme a Senha"
                              type="password"
                              v-model="$v.passwordConfirmation.$model"
                              :error="{
                                   show:
                                        $v.passwordConfirmation.$error &&
                                        submitted,
                                   message: $v.passwordConfirmation.$errors[0]?.$message.toString(),
                              }"
                         />
                    </form>
               </div>
               <div class="card-footer bg-white border-0 rounded-3 pb-3">
                    <button
                         class="btn btn-primary"
                         type="submit"
                         form="signup-form"
                    >
                         Salvar
                    </button>
                    <hr />

                    <RouterLink
                         class="text-center link"
                         :to="{ name: 'login' }"
                    >
                         Já possui uma conta?
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
