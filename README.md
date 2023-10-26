### Vue Form (`Vee Validate + Yup`)

1. `Install`

```sh
yarn add vee-validate yup
# or
npm i vee-validate yup
```

2. `Validate by useForm + schema yup`

-   You need to import `yup` and `useForm`, then you can use it.

```vue
<script setup lang='ts'>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object().shape({
    name: yup.string().required('Please enter name'),
    age: yup.number().required('Please enter age'),
    bio: yup.string()
})

const { handleReset, handleSubmit, meta, errors, isSubmitting } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
        age: 0,
        bio: ''
    }
})

const handleSubmit = handleSubmit((values: any) => {
    console.log(values)
    handleReset()
})
</script>

<template>
    <form>
        <div>
            <input type='text' name='name' />
            <p>{{ errors.value.name || '' }}</p>   
        </div>
        <div>
            <input type='text' name='age' />
            <p>{{ errors.value.age || '' }}</p>   
        </div> 
        <div>
            <input type='text' name='bio' />
            <p>{{ errors.value.bio || '' }}</p>   
        </div>
        <button type="submit" :disabled="isSubmitting || !meta.valid">Submit</button>
    </form>
</template>
```

- `Set field value`: `setFieldValue(key, value)`

```vue
<script>
const { setFieldValue } = useForm()

watch(undefined, () => {
    setFieldValue('name', ...)
    setFieldValue('age', ...)
    setFieldValue('bio', ...)
})
</script>
```

- You can set multiple values: `setValues({ key1: value1, key2: value2 })`

```vue
<script>
const { setValues } = useForm()

setValues({
    name: ...,
    age: ...,
    bio: ...
})
</script>
```

- `meta`: touched, dirty, valid, pending, initialValues

3. `Divide each field component by useField()`

```vue
<script setup lang='ts'>
import { useField } from 'vee-validate'
import { defineProps } from 'vue'

const { name } = defineProps<{
    name: string
}>()
const { value, errorMessage } = useField<string>(name)
</script>

<template>
    <div>
        <input v-model="value" type='text' :name="name" />
        <p>{{ errorMessage }}</p>
    </div>
</template>
```

4. `Hooks`

- `<Form />`: is a simple HTML form but with a few adjustments, by default `form` HTML.

```vue
<script setup lang='ts'>
import { Form } from 'vee-validate'
</script>

<template>
    <Form v-slot="{ errors, isSubmitting, meta, values, setFieldValue, handleSubmit, handleReset, ... }"></Form>
</template>
```

- `props`: as, validationSchema, initialValues, initialTouched, validateOnMount, keepValues, initialErrors.

> [https://vee-validate.logaretm.com/v4/api/form](https://vee-validate.logaretm.com/v4/api/form)

- `<Field />`: it is extremely flexible component that makes rendering input field easy and intuitive.

```vue
<template>
    <Field name="name" as="select">
        <option>VN</option>
        <option>US</option>
        <option>EN</option>
    </Field>
</template>
```

- Use `v-model` in `Field`

```vue
<Field v-model="name" type="text" name="name" v-slot="{ field }">
  <input v-bind="field">
</Field>
```

> [https://vee-validate.logaretm.com/v4/api/field](https://vee-validate.logaretm.com/v4/api/field)

---

### Vue Select Form (Multiselect)

1. `Install`

```sh
yarn add @vueform/multiselect
# or
npm install @vueform/multiselect
```

2. `Setup`

```vue
<script setup lang='ts'>
    import { Multiselect } from '@vueform/multiselect'
    import { ref, Ref } from 'vue'

    const value: Ref<string> = ref('')
    const options: Ref<string[]> = ref([
        'VN',
        'EN',
        'US'
    ])
</script>
<template>
    <Multiselect
        mode="tags"
        v-model="value"
        :options="options"
        :searchable="true"
    />
</template>
```

- `mode`: single, multiple, tags; `default: single`

> [https://github.com/vueform/multiselect#readme](https://github.com/vueform/multiselect#readme)