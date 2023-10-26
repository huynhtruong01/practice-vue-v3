<template>
  <Transition appear>
    <div
      class="max-w-[320px] mx-auto mt-20 bg-[#f5f5f5] overflow-hidden rounded-md shadow-[0px_16px_60px_15px_rgba(0,0,0,0.2)]"
    >
      <form @submit.prevent="calcResult">
        <input
          type="text"
          class="w-full p-6 text-2xl font-medium bg-gradient-to-r from-orange-300 to-orange-400 text-white outline-none border-b border-slate-200 text-right"
          v-model="inputCalc"
        />
      </form>
      <div class="digits grid grid-cols-4">
        <div
          v-for="digit in digits"
          :key="digit.character"
          class="group flex justify-center items-center p-4 cursor-pointer text-lg font-normal hover:bg-slate-200 border-r border-slate-200 border-b last:border-r-none last:border-b-none last:col-span-full last:bg-gradient-to-r last:from-red-400 last:to-red-500 !last:text-white ease-in-out duration-200"
          @click="clickDigit(digit.name)"
        >
          <span class="text-slate-700 group-last:text-white">{{
            digit.name
          }}</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Ref, ref, Transition } from "vue"
import { convertCalc } from "../../utils"
import { useChangeDocTitle } from "../../hooks"

useChangeDocTitle("Calculator")

const inputCalc = ref("")
const digits: Ref<
  {
    name: string
    character: string
  }[]
> = ref([
  {
    name: "C",
    character: "C",
  },
  {
    name: "(",
    character: "(",
  },
  {
    name: ")",
    character: ")",
  },
  {
    name: "\u2190",
    character: "\u2190",
  },
  {
    name: "7",
    character: "7",
  },
  {
    name: "8",
    character: "8",
  },
  {
    name: "9",
    character: "9",
  },
  {
    name: "\u00F7",
    character: "/",
  },
  {
    name: "4",
    character: "4",
  },
  {
    name: "5",
    character: "5",
  },
  {
    name: "6",
    character: "6",
  },
  {
    name: "\u00D7",
    character: "*",
  },
  {
    name: "1",
    character: "1",
  },
  {
    name: "2",
    character: "2",
  },
  {
    name: "3",
    character: "3",
  },
  {
    name: "-",
    character: "-",
  },
  {
    name: "0",
    character: "0",
  },
  {
    name: ".",
    character: ".",
  },

  {
    name: "+",
    character: "+",
  },
  {
    name: "=",
    character: "=",
  },
])

const calcResult = () => {
  const result = convertCalc(inputCalc.value)
  inputCalc.value = eval(result)
}

const clickDigit = (digit: string) => {
  switch (digit) {
    case "=": {
      calcResult()
      break
    }
    case "C": {
      inputCalc.value = ""
      break
    }
    case "\u2190": {
      inputCalc.value = inputCalc.value.slice(0, inputCalc.value.length - 1)
      break
    }
    default: {
      inputCalc.value += digit
    }
  }
}
</script>

<style scoped>
.digits :is(div:nth-child(4n + 4), div:nth-child(19)) {
  border-right: none !important;
}

.digits div:nth-child(17) {
  grid-column: span 2;
  background-color: #5f5e70;
  border-bottom: none;
}

.digits div:nth-child(17) span {
  color: #fff !important;
}
</style>
