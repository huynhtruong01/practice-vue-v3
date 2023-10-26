<template>
    <FieldContainer
        :label="props.label"
        :name="props.name"
        :maxCharacters="props.maxCharacters"
        :isRequired="props.isRequired"
        :errorMsg="errorMessage || ''"
    >
        <template #input>
            <textarea
                v-model="value"
                name="description"
                :id="props.name"
                rows="6"
                :class="
                    twMerge(
                        'p-2 pr-8 border rounded outline-none',
                        false ? 'border-red-500' : 'border-slate-200',
                    )
                "
            ></textarea>
        </template>
        <template #character>{{ value.length }}</template>
    </FieldContainer>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { twMerge } from "tailwind-merge"
import { useField } from "vee-validate"
import FieldContainer from "./FieldContainer.vue"

const props = defineProps<{
    label: string
    name: string
    maxCharacters?: number
    isRequired?: boolean
}>()

const { value, errorMessage } = useField<string>(props.name)
</script>

<style scoped></style>
